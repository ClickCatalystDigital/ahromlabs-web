#!/usr/bin/env node
// Google Search Console for ahromlabs.com, from the terminal — so an agent can read
// what Google sees and act on it. Setup and the full command list: SYSTEM.md
// ("Search Console API").
//
//   npm run gsc -- queries [days]       top search queries: clicks, impressions, CTR, position
//   npm run gsc -- pages [days]         the same, per page
//   npm run gsc -- page-queries <path>  queries one page ranks for
//   npm run gsc -- inspect [path...]    is it indexed, and if not why (default: every sitemap URL)
//   npm run gsc -- sitemaps             submitted sitemaps and their errors
//   npm run gsc -- submit-sitemap       resubmit https://ahromlabs.com/sitemap.xml
//   npm run gsc -- sites                properties the account can see
//
// Auth: a Google service account added as a user on the property. Its JSON key
// stays outside the repo (GSC_KEY_FILE, default ~/.config/ahrom-labs/search-console.json).
// "Request indexing" has no API (Google keeps it in the web UI); the Indexing API is
// for job postings and livestreams only, so it is deliberately not used here.
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const KEY_FILE = process.env.GSC_KEY_FILE ?? path.join(os.homedir(), ".config/ahrom-labs/search-console.json");
const SITEMAP = "https://ahromlabs.com/sitemap.xml";
const ORIGIN = "https://ahromlabs.com";

const b64url = (s) => Buffer.from(s).toString("base64url");

// Service-account JWT exchanged for a one-hour access token (RFC 7523), signed with
// node:crypto — no Google client library needed for four endpoints.
export function signedJwt(key, scope, now = Math.floor(Date.now() / 1000)) {
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({ iss: key.client_email, scope, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }),
  );
  const sig = crypto.createSign("RSA-SHA256").update(`${head}.${claims}`).sign(key.private_key, "base64url");
  return `${head}.${claims}.${sig}`;
}

async function token() {
  if (!fs.existsSync(KEY_FILE)) {
    throw new Error(`No service-account key at ${KEY_FILE}. Setup steps: SYSTEM.md, "Search Console API".`);
  }
  const key = JSON.parse(fs.readFileSync(KEY_FILE, "utf-8"));
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedJwt(key, "https://www.googleapis.com/auth/webmasters"),
    }),
  });
  const body = await r.json();
  if (!body.access_token) throw new Error(`Token refused: ${JSON.stringify(body)}`);
  return body.access_token;
}

let accessToken;
async function api(url, { method = "GET", body } = {}) {
  accessToken ??= await token();
  const r = await fetch(url, {
    method,
    headers: { authorization: `Bearer ${accessToken}`, ...(body && { "content-type": "application/json" }) },
    body: body && JSON.stringify(body),
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`${method} ${url} → ${r.status}: ${text.slice(0, 400)}`);
  return text ? JSON.parse(text) : {};
}

// The property: a Domain property (sc-domain:) if the account has one, else the URL prefix.
let site;
async function siteUrl() {
  if (site) return site;
  if (process.env.GSC_SITE) return (site = process.env.GSC_SITE);
  const { siteEntry = [] } = await api("https://www.googleapis.com/webmasters/v3/sites");
  const ours = siteEntry.map((s) => s.siteUrl).filter((u) => u.includes("ahromlabs.com"));
  site = ours.find((u) => u.startsWith("sc-domain:")) ?? ours[0];
  if (!site) throw new Error("The service account can't see ahromlabs.com. Add its email under Search Console → Settings → Users and permissions.");
  return site;
}
const sitePath = async () => encodeURIComponent(await siteUrl());

// Search data lags about two days; end the window there so the last days aren't falsely low.
function range(days) {
  const day = (offset) => new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10);
  return { startDate: day(Number(days) + 2), endDate: day(2) };
}

async function analytics(dimensions, days = 28, filters) {
  const { rows = [] } = await api(`https://www.googleapis.com/webmasters/v3/sites/${await sitePath()}/searchAnalytics/query`, {
    method: "POST",
    body: { ...range(days), dimensions, rowLimit: 100, ...(filters && { dimensionFilterGroups: [{ filters }] }) },
  });
  return rows.map((r) => ({
    [dimensions[0]]: r.keys[0].replace(ORIGIN, "") || "/",
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: `${(r.ctr * 100).toFixed(1)}%`,
    position: r.position.toFixed(1),
  }));
}

async function inspect(paths) {
  if (paths.length === 0) {
    const xml = await (await fetch(SITEMAP)).text();
    paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  }
  const out = [];
  for (const p of paths) {
    const url = p.startsWith("http") ? p : `${ORIGIN}${p}`;
    const { inspectionResult: r = {} } = await api("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
      method: "POST",
      body: { inspectionUrl: url, siteUrl: await siteUrl() },
    });
    const idx = r.indexStatusResult ?? {};
    out.push({
      url: url.replace(ORIGIN, "") || "/",
      verdict: idx.verdict,
      coverage: idx.coverageState,
      lastCrawl: idx.lastCrawlTime?.slice(0, 10) ?? "never",
      googleCanonical: idx.googleCanonical && idx.googleCanonical !== url ? idx.googleCanonical : "",
    });
  }
  return out;
}

const COMMANDS = {
  sites: async () => (await api("https://www.googleapis.com/webmasters/v3/sites")).siteEntry ?? [],
  queries: (days) => analytics(["query"], days),
  pages: (days) => analytics(["page"], days),
  "page-queries": (p, days) =>
    analytics(["query"], days, [{ dimension: "page", operator: "equals", expression: p?.startsWith("http") ? p : `${ORIGIN}${p ?? "/"}` }]),
  inspect: (...paths) => inspect(paths),
  sitemaps: async () => (await api(`https://www.googleapis.com/webmasters/v3/sites/${await sitePath()}/sitemaps`)).sitemap ?? [],
  "submit-sitemap": async () => {
    await api(`https://www.googleapis.com/webmasters/v3/sites/${await sitePath()}/sitemaps/${encodeURIComponent(SITEMAP)}`, { method: "PUT" });
    return `Submitted ${SITEMAP}`;
  },
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, ...args] = process.argv.slice(2);
  if (!COMMANDS[cmd]) {
    console.log(`Commands: ${Object.keys(COMMANDS).join(", ")}  (see the top of scripts/search-console.mjs)`);
    process.exit(cmd ? 1 : 0);
  }
  try {
    const result = await COMMANDS[cmd](...args);
    if (Array.isArray(result) && result.length && typeof result[0] === "object") console.table(result);
    else console.log(typeof result === "string" ? result : JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
