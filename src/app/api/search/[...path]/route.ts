import { AI_SEARCH_URL } from "@/lib/ai-search";
import { take, underRate } from "@/lib/search-quota";

// The site search widget's api-url (SiteSearch.tsx). Passes /api/search/<path> through to AI Search so every
// query is counted against the monthly free-tier cap (src/lib/search-quota.ts) and a per-visitor limit.
// Only POST /search and /chat/completions are queries; anything else the widget calls (stats) passes uncounted.
export const dynamic = "force-dynamic";

const QUERY = /^\/(search|chat\/completions)$/;
const json = (error: string, status: number) =>
  new Response(JSON.stringify({ success: false, error }), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

async function forward(req: Request) {
  const path = new URL(req.url).pathname.replace(/^\/api\/search/, "");
  // Only what the widget uses; anything else (e.g. /mcp) would skip the counting done at /mcp.
  if (!QUERY.test(path) && !/^\/stats(\/|$)/.test(path)) return json("Not found.", 404);
  if (req.method === "POST" && QUERY.test(path)) {
    if (!(await underRate("SEARCH_LIMITER", req))) return json("Too many searches. Try again in a minute.", 429);
    if (!(await take())) return json("Site search is resting until next month. Write to us at https://ahromlabs.com/#contact.", 503);
  }
  const upstream = await fetch(`${AI_SEARCH_URL}${path}`, {
    method: req.method,
    headers: { "content-type": req.headers.get("content-type") ?? "application/json", accept: req.headers.get("accept") ?? "*/*", origin: "https://ahromlabs.com" },
    body: req.method === "POST" ? await req.arrayBuffer() : undefined,
  });
  const out = new Headers({ "cache-control": "no-store" });
  const type = upstream.headers.get("content-type");
  if (type) out.set("content-type", type);
  return new Response(upstream.body, { status: upstream.status, headers: out });
}

export const GET = forward;
export const POST = forward;
