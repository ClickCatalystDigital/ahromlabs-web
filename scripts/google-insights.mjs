#!/usr/bin/env node
// Google insights for ahromlabs.com and client sites (SITES) — Search Console, Analytics (GA4) and PageSpeed —
// as a local MCP connector (registered in .mcp.json, so Claude Code in this folder
// loads it) and as a terminal command. Each tool is defined once in TOOLS; both
// surfaces read the same table. Setup: SYSTEM.md, "Google insights connector".
//
//   npm run google                              list the tools
//   npm run google -- gsc_queries '{"days":7}'  run one, arguments as JSON
//   node scripts/google-insights.mjs --mcp      the connector (stdio)
//
// Credentials stay outside the repo, in ~/.config/ahrom-labs/:
//   service-account.json  Google service-account key; the account is a Full user on
//                         the Search Console property and an Editor on the GA4 property
//   pagespeed-key         PageSpeed Insights API key (optional; without it Google's
//                         small shared quota applies)
//   savistar-service-account.json  same, for savistar.in (GOOGLE_SITE=savistar)
// Overrides: GOOGLE_SITE, GOOGLE_KEY_FILE, PAGESPEED_KEY_FILE, GSC_SITE, GA4_PROPERTY.
//
// Writes are marked `write: true` and announced to the MCP client as such, so Claude
// Code asks before running them: resubmitting the sitemap, and GA4 key events, custom
// dimensions and data retention. "Request indexing" has no API (Google keeps it in the
// web UI); the Indexing API is for job postings and livestreams only, so it is
// deliberately absent.
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { z } from "zod";

const CONFIG_DIR = path.join(os.homedir(), ".config/ahrom-labs");
// One script, one service account per site: GOOGLE_SITE picks the row (default ahromlabs).
export const SITES = {
  ahromlabs: { domain: "ahromlabs.com", ga4: /ahrom/i, key: "service-account.json" },
  savistar: { domain: "savistar.in", ga4: /savistar/i, key: "savistar-service-account.json" },
};
const SITE_NAME = process.env.GOOGLE_SITE ?? "ahromlabs";
const SITE = SITES[SITE_NAME];
if (!SITE) throw new Error(`Unknown GOOGLE_SITE "${SITE_NAME}"; one of: ${Object.keys(SITES).join(", ")}`);
const KEY_FILE = process.env.GOOGLE_KEY_FILE ?? path.join(CONFIG_DIR, SITE.key);
const PAGESPEED_KEY_FILE = process.env.PAGESPEED_KEY_FILE ?? path.join(CONFIG_DIR, "pagespeed-key");
const ORIGIN = `https://${SITE.domain}`;
const SITEMAP = `${ORIGIN}/sitemap.xml`;
// analytics.edit lets the GA4 write tools work; it does nothing beyond the role the
// service account holds on the property (Editor), so it can't reach other properties.
const SCOPES = [
  "https://www.googleapis.com/auth/webmasters",
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/analytics.edit",
];
const SETUP = 'Setup steps: SYSTEM.md, "Google insights connector".';

// ---------- auth

const b64url = (s) => Buffer.from(s).toString("base64url");

// Service-account JWT exchanged for a one-hour access token (RFC 7523), signed with
// node:crypto — no Google client library needed for a handful of endpoints.
export function signedJwt(key, scope, now = Math.floor(Date.now() / 1000)) {
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({ iss: key.client_email, scope, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }),
  );
  const sig = crypto.createSign("RSA-SHA256").update(`${head}.${claims}`).sign(key.private_key, "base64url");
  return `${head}.${claims}.${sig}`;
}

let cached = { token: "", expires: 0 };
async function accessToken() {
  if (cached.expires > Date.now() + 60_000) return cached.token;
  if (!fs.existsSync(KEY_FILE)) throw new Error(`No service-account key at ${KEY_FILE}. ${SETUP}`);
  const key = JSON.parse(fs.readFileSync(KEY_FILE, "utf-8"));
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: signedJwt(key, SCOPES.join(" ")) }),
  });
  const body = await r.json();
  if (!body.access_token) throw new Error(`Google refused the service account: ${JSON.stringify(body)}`);
  cached = { token: body.access_token, expires: Date.now() + body.expires_in * 1000 };
  return cached.token;
}

async function api(url, { method = "GET", body } = {}) {
  const r = await fetch(url, {
    method,
    headers: { authorization: `Bearer ${await accessToken()}`, ...(body && { "content-type": "application/json" }) },
    body: body && JSON.stringify(body),
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`${method} ${url.split("?")[0]} → ${r.status}: ${text.slice(0, 500)}`);
  return text ? JSON.parse(text) : {};
}

// Search data lags about two days; the window ends there so recent days aren't falsely low.
function range(days = 28) {
  const day = (offset) => new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10);
  return { startDate: day(Number(days) + 2), endDate: day(2) };
}
const toUrl = (p) => (p.startsWith("http") ? p : `${ORIGIN}${p.startsWith("/") ? p : `/${p}`}`);
const short = (u) => u.replace(ORIGIN, "") || "/";

// ---------- Search Console

let gscSite = process.env.GSC_SITE;
async function site() {
  if (gscSite) return gscSite;
  const { siteEntry = [] } = await api("https://www.googleapis.com/webmasters/v3/sites");
  const ours = siteEntry.map((s) => s.siteUrl).filter((u) => u.includes(SITE.domain));
  gscSite = ours.find((u) => u.startsWith("sc-domain:")) ?? ours[0];
  if (!gscSite) throw new Error(`The service account can't see ${SITE.domain} in Search Console. ${SETUP}`);
  return gscSite;
}
const siteApi = async (rest) => `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(await site())}${rest}`;

async function searchAnalytics(dimension, days, filters) {
  const { rows = [] } = await api(await siteApi("/searchAnalytics/query"), {
    method: "POST",
    body: { ...range(days), dimensions: [dimension], rowLimit: 100, ...(filters && { dimensionFilterGroups: [{ filters }] }) },
  });
  return rows.map((r) => ({
    [dimension]: dimension === "page" ? short(r.keys[0]) : r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: `${(r.ctr * 100).toFixed(1)}%`,
    position: Number(r.position.toFixed(1)),
  }));
}

async function inspect(paths) {
  if (!paths?.length) {
    const xml = await (await fetch(SITEMAP)).text();
    paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  }
  const out = [];
  for (const p of paths) {
    const url = toUrl(p);
    const { inspectionResult: r = {} } = await api("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
      method: "POST",
      body: { inspectionUrl: url, siteUrl: await site() },
    });
    const idx = r.indexStatusResult ?? {};
    out.push({
      url: short(url),
      verdict: idx.verdict,
      coverage: idx.coverageState,
      lastCrawl: idx.lastCrawlTime?.slice(0, 10) ?? "never",
      googleCanonical: idx.googleCanonical && idx.googleCanonical !== url ? idx.googleCanonical : "",
    });
  }
  return out;
}

// ---------- Analytics (GA4 Data API)

let ga4 = process.env.GA4_PROPERTY;
async function property() {
  if (ga4) return ga4;
  const { accountSummaries = [] } = await api("https://analyticsadmin.googleapis.com/v1beta/accountSummaries");
  const props = accountSummaries.flatMap((a) => a.propertySummaries ?? []);
  const ours = props.find((p) => SITE.ga4.test(p.displayName)) ?? (props.length === 1 ? props[0] : undefined);
  if (!ours) throw new Error(`The service account can't see the ${SITE.domain} GA4 property (sees ${props.length}). ${SETUP}`);
  return (ga4 = ours.property); // "properties/123456789"
}

async function gaReport({ dimensions, metrics, days = 28, filter, limit = 50, orderBy }) {
  const { rows = [] } = await api(`https://analyticsdata.googleapis.com/v1beta/${await property()}:runReport`, {
    method: "POST",
    body: {
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: "yesterday" }],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      limit,
      orderBys: [{ metric: { metricName: orderBy ?? metrics[0] }, desc: true }],
      ...(filter && { dimensionFilter: filter }),
    },
  });
  return rows.map((r) =>
    Object.fromEntries([
      ...dimensions.map((d, i) => [d, r.dimensionValues[i].value]),
      ...metrics.map((m, i) => [m, Number(r.metricValues[i].value)]),
    ]),
  );
}

const admin = async (rest, opts) => api(`https://analyticsadmin.googleapis.com/v1beta/${await property()}${rest}`, opts);

// Assistants that send visitors with a referrer. Many AI answers send none, so this
// is a floor, not the whole of AI traffic.
const AI_SOURCES = "chatgpt|openai|perplexity|claude|anthropic|gemini|bard|copilot|you\\.com|phind|deepseek|meta\\.ai|grok";

// ---------- PageSpeed Insights

async function pagespeed(url, strategy) {
  const key = process.env.PAGESPEED_API_KEY ?? (fs.existsSync(PAGESPEED_KEY_FILE) ? fs.readFileSync(PAGESPEED_KEY_FILE, "utf-8").trim() : "");
  const q = new URLSearchParams({ url: toUrl(url), strategy, ...(key && { key }) });
  for (const c of ["performance", "seo", "accessibility", "best-practices"]) q.append("category", c);
  const r = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${q}`);
  const d = await r.json();
  if (d.error) throw new Error(`PageSpeed: ${d.error.message}${key ? "" : ` (no API key; ${SETUP})`}`);
  const lh = d.lighthouseResult;
  const a = lh.audits;
  // Field data: real Chrome users over 28 days, when Google has enough of them.
  const field = (exp) =>
    exp?.metrics && Object.fromEntries(Object.entries(exp.metrics).map(([k, v]) => [k, `${v.percentile} (${v.category})`]));
  return {
    url: lh.finalDisplayedUrl,
    strategy,
    scores: Object.fromEntries(Object.entries(lh.categories).map(([k, v]) => [k, Math.round(v.score * 100)])),
    lab: {
      LCP: a["largest-contentful-paint"].displayValue,
      CLS: a["cumulative-layout-shift"].displayValue,
      TBT: a["total-blocking-time"].displayValue,
      TTFB: a["server-response-time"].displayValue,
    },
    fieldThisPage: field(d.loadingExperience) ?? "not enough Chrome users yet",
    fieldWholeSite: field(d.originLoadingExperience) ?? "not enough Chrome users yet",
    toFix: Object.values(a)
      .filter((x) => x.score !== null && x.score < 0.9 && ["binary", "numeric", "metricSavings"].includes(x.scoreDisplayMode))
      .map((x) => x.title),
  };
}

// ---------- tools: one table for the connector and the terminal

const days = z.number().int().min(1).max(480).default(28).describe("How many days back (Search data ends two days ago)");

export const TOOLS = {
  setup_status: {
    description: "Which Google credentials are in place and which properties they can see. Run this first.",
    params: {},
    run: async () => {
      const status = { site: SITE_NAME, serviceAccountKey: fs.existsSync(KEY_FILE) ? KEY_FILE : `missing (${KEY_FILE})` };
      status.pagespeedKey = process.env.PAGESPEED_API_KEY || fs.existsSync(PAGESPEED_KEY_FILE) ? "present" : "missing (shared quota)";
      if (fs.existsSync(KEY_FILE)) {
        status.serviceAccount = JSON.parse(fs.readFileSync(KEY_FILE, "utf-8")).client_email;
        status.searchConsole = await site().catch((e) => `no access: ${e.message}`);
        status.analytics = await property().catch((e) => `no access: ${e.message}`);
      }
      return status;
    },
  },
  gsc_queries: {
    description: `Search Console: top Google search queries for ${SITE.domain}, with clicks, impressions, CTR and average position.`,
    params: { days },
    run: ({ days }) => searchAnalytics("query", days),
  },
  gsc_pages: {
    description: "Search Console: pages by Google search clicks and impressions, with CTR and average position.",
    params: { days },
    run: ({ days }) => searchAnalytics("page", days),
  },
  gsc_page_queries: {
    description: "Search Console: the queries one page shows up for. Use to see what a page is really ranking on.",
    params: { page: z.string().describe("Path such as /ibr/forms, or a full URL"), days },
    run: ({ page, days }) => searchAnalytics("query", days, [{ dimension: "page", operator: "equals", expression: toUrl(page) }]),
  },
  gsc_inspect: {
    description:
      "Search Console URL Inspection: is each URL indexed, coverage state, last crawl, and Google's chosen canonical. No paths = every URL in the sitemap (about 65; quota is about 2,000 a day).",
    params: { paths: z.array(z.string()).default([]).describe("Paths or URLs; empty for the whole sitemap") },
    run: ({ paths }) => inspect(paths),
  },
  gsc_sitemaps: {
    description: "Search Console: submitted sitemaps, when Google last read them, and their errors and warnings.",
    params: {},
    run: async () => (await api(await siteApi("/sitemaps"))).sitemap ?? [],
  },
  gsc_submit_sitemap: {
    description: `Search Console: resubmit ${SITEMAP} so Google rereads it.`,
    write: true,
    params: {},
    run: async () => {
      await api(await siteApi(`/sitemaps/${encodeURIComponent(SITEMAP)}`), { method: "PUT" });
      return `Submitted ${SITEMAP}`;
    },
  },
  ga_pages: {
    description: "Analytics: pages by views, users and engagement rate.",
    params: { days },
    run: ({ days }) => gaReport({ dimensions: ["pagePath"], metrics: ["screenPageViews", "activeUsers", "engagementRate"], days }),
  },
  ga_sources: {
    description: "Analytics: where sessions come from (source / medium), with engaged sessions and key events such as form sends.",
    params: { days },
    run: ({ days }) => gaReport({ dimensions: ["sessionSourceMedium"], metrics: ["sessions", "engagedSessions", "keyEvents"], days }),
  },
  ga_ai_referrals: {
    description:
      "Analytics: sessions referred by AI assistants (ChatGPT, Perplexity, Claude, Gemini, Copilot…), by source and landing page. A floor: many AI answers send no referrer.",
    params: { days },
    run: ({ days }) =>
      gaReport({
        dimensions: ["sessionSource", "landingPage"],
        metrics: ["sessions", "engagedSessions", "keyEvents"],
        days,
        filter: { filter: { fieldName: "sessionSource", stringFilter: { matchType: "PARTIAL_REGEXP", value: AI_SOURCES, caseSensitive: false } } },
      }),
  },
  ga_events: {
    description: "Analytics: event counts, including the site's form events (contact_form_sent, *_demo_form_sent).",
    params: { days },
    run: ({ days }) => gaReport({ dimensions: ["eventName"], metrics: ["eventCount", "totalUsers"], days }),
  },
  ga_report: {
    description:
      "Analytics: any GA4 report. Names from the GA4 Data API schema, e.g. dimensions pagePath, landingPage, sessionSourceMedium, country, deviceCategory; metrics sessions, activeUsers, screenPageViews, engagementRate, keyEvents.",
    params: {
      dimensions: z.array(z.string()).min(1),
      metrics: z.array(z.string()).min(1),
      days,
      limit: z.number().int().min(1).max(1000).default(50),
    },
    run: (args) => gaReport(args),
  },
  ga_key_events: {
    description: "Analytics: the events marked as key events (GA4's conversions).",
    params: {},
    run: async () => (await admin("/keyEvents")).keyEvents ?? [],
  },
  ga_create_key_event: {
    description:
      "Analytics: mark an event as a key event, e.g. contact_form_sent or boiler_demo_form_sent. GA4 counts it as a key event from then on, not retroactively.",
    write: true,
    params: { eventName: z.string().min(1) },
    run: ({ eventName }) => admin("/keyEvents", { method: "POST", body: { eventName, countingMethod: "ONCE_PER_EVENT" } }),
  },
  ga_custom_dimensions: {
    description: "Analytics: the custom dimensions defined on the property.",
    params: {},
    run: async () => (await admin("/customDimensions")).customDimensions ?? [],
  },
  ga_create_custom_dimension: {
    description:
      "Analytics: register an event (or user) parameter as a custom dimension so reports can break down by it. Only parameters the site actually sends are useful.",
    write: true,
    params: {
      parameterName: z.string().min(1).describe("The event parameter the site sends, e.g. demo"),
      displayName: z.string().min(1),
      scope: z.enum(["EVENT", "USER"]).default("EVENT"),
      description: z.string().default(""),
    },
    run: (dimension) => admin("/customDimensions", { method: "POST", body: dimension }),
  },
  ga_data_retention: {
    description: "Analytics: how long event-level data is kept (affects how far back explorations reach).",
    params: {},
    run: () => admin("/dataRetentionSettings"),
  },
  ga_set_data_retention: {
    description: "Analytics: set event-data retention. FOURTEEN_MONTHS is the longest on the free tier.",
    write: true,
    params: { eventDataRetention: z.enum(["TWO_MONTHS", "FOURTEEN_MONTHS"]) },
    run: async ({ eventDataRetention }) =>
      api(`https://analyticsadmin.googleapis.com/v1beta/${await property()}/dataRetentionSettings?updateMask=eventDataRetention`, {
        method: "PATCH",
        body: { eventDataRetention },
      }),
  },
  pagespeed: {
    description:
      "PageSpeed Insights (Lighthouse plus real-user Core Web Vitals) for one page: scores, lab timings, field data, and what to fix.",
    params: {
      url: z.string().default("/").describe("Path such as /ibr/forms, or a full URL"),
      strategy: z.enum(["mobile", "desktop"]).default("mobile"),
    },
    run: ({ url, strategy }) => pagespeed(url, strategy),
  },
};

// ---------- surfaces

async function serveMcp() {
  const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");
  const { StdioServerTransport } = await import("@modelcontextprotocol/sdk/server/stdio.js");
  const server = new McpServer({ name: `google-insights-${SITE_NAME}`, version: "1.0.0" });
  for (const [name, tool] of Object.entries(TOOLS)) {
    const annotations = tool.write
      ? { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true }
      : { readOnlyHint: true, openWorldHint: true };
    server.registerTool(name, { description: tool.description, inputSchema: tool.params, annotations }, async (args) => {
      try {
        return { content: [{ type: "text", text: JSON.stringify(await tool.run(args), null, 2) }] };
      } catch (e) {
        return { isError: true, content: [{ type: "text", text: e.message }] };
      }
    });
  }
  await server.connect(new StdioServerTransport());
}

async function cli(name, json) {
  const tool = TOOLS[name];
  if (!tool) {
    console.log("Tools (run: npm run google -- <tool> '<json args>'):\n");
    for (const [n, t] of Object.entries(TOOLS)) console.log(`  ${n.padEnd(27)} ${t.write ? "[write] " : ""}${t.description}`);
    process.exit(name ? 1 : 0);
  }
  const args = z.object(tool.params).parse(json ? JSON.parse(json) : {});
  const result = await tool.run(args);
  if (Array.isArray(result) && result.length && typeof result[0] === "object") console.table(result);
  else console.log(typeof result === "string" ? result : JSON.stringify(result, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.includes("--mcp")) await serveMcp();
  else
    await cli(process.argv[2], process.argv[3]).catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
}
