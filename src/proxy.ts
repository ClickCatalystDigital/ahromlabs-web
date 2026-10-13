import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { GA_ID } from "@/lib/analytics";

// Cross-checked against the ai-robots-txt project's live list, not guessed.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "Bytespider",
  "CCBot",
  "Diffbot",
];

const SITE = "https://ahromlabs.com";

// RFC 8288 Link headers: an agent reading only the HTTP response (not the
// HTML) still finds the machine-readable surfaces in one hop.
const DISCOVERY_LINKS = [
  `<${SITE}/llms.txt>; rel="describedby"; type="text/plain"`,
  `<${SITE}/knowledge.json>; rel="alternate"; type="application/json"`,
  `<${SITE}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
  `<${SITE}/.well-known/api-catalog>; rel="api-catalog"`,
];

// AI agents don't run JavaScript, so the GA tag never sees them. Each hit is also sent to
// the same GA4 property as a server-side `agent_visit` event (docs/analytics-strategy.md).
// Skipped quietly until the GA_API_SECRET Worker secret exists.
async function recordAgent(agent: string, path: string) {
  try {
    const { env, ctx } = await getCloudflareContext({ async: true });
    const secret = (env as { GA_API_SECRET?: string }).GA_API_SECRET;
    if (!secret) return;
    ctx.waitUntil(
      fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${GA_ID}&api_secret=${secret}`, {
        method: "POST",
        // One client per agent name: GA then counts agents, not requests, as users.
        body: JSON.stringify({ client_id: `agent.${agent}`, events: [{ name: "agent_visit", params: { agent, path } }] }),
      }).catch(() => {}),
    );
  } catch {
    // next dev without the Cloudflare context: nothing to send.
  }
}

// True when the client ranks text/markdown at least as high as text/html.
// Browsers never send text/markdown, so they always get HTML.
function prefersMarkdown(accept: string): boolean {
  const q = (type: string) => {
    const entry = accept
      .split(",")
      .map((part) => part.trim().toLowerCase())
      .find((part) => part === type || part.startsWith(`${type};`));
    if (!entry) return 0;
    const match = entry.match(/;\s*q=([0-9.]+)/);
    return match ? Number(match[1]) : 1;
  };
  const markdown = q("text/markdown");
  return markdown > 0 && markdown >= q("text/html");
}

// Page routes only — files, API routes and machine surfaces have one form.
const isPage = (pathname: string) =>
  !pathname.startsWith("/api/") && !pathname.startsWith("/md/") && !/\.[a-z0-9]+$/i.test(pathname);

export async function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  const bot = AI_CRAWLERS.find((name) => ua.includes(name));
  const { pathname } = request.nextUrl;

  if (!isPage(pathname)) {
    if (bot) {
      console.log(JSON.stringify({ event: "ai_crawler_hit", bot, path: pathname, ua }));
      await recordAgent(bot, pathname);
    }
    return NextResponse.next();
  }

  const markdown = prefersMarkdown(request.headers.get("accept") ?? "");
  if (bot || markdown) {
    console.log(JSON.stringify({ event: "ai_crawler_hit", bot: bot ?? "markdown-agent", path: pathname, ua, markdown }));
    await recordAgent(bot ?? "markdown-agent", pathname);
  }

  // Canonical matches each page's own <link rel="canonical"> (no trailing slash on /).
  const route = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  const link = [...DISCOVERY_LINKS, `<${SITE}${route}>; rel="canonical"`].join(", ");

  // Same URL, markdown representation: public/md/<route>.md, built at deploy
  // time by scripts/build-markdown.mjs. Read straight from the Workers assets
  // binding — a NextResponse.rewrite() to a public file 404s under OpenNext.
  // No twin (next dev, or a route that doesn't exist) falls through to HTML.
  if (markdown) {
    const { env } = await getCloudflareContext({ async: true });
    const twin = await env.ASSETS?.fetch(new URL(`/md${route || "/index"}.md`, request.url));
    if (twin?.ok) {
      return new Response(twin.body, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          Link: link,
          Vary: "Accept",
        },
      });
    }
  }

  const response = NextResponse.next();
  response.headers.set("Link", link);
  // The same URL has two representations; caches must key on Accept.
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)",
};
