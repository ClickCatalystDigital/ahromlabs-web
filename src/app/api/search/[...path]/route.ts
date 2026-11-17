import { chat, search, underRate, OverQuota, type SearchInput } from "@/lib/search-quota";

// The site search widget's api-url (SiteSearch.tsx), answered from the AI Search Worker binding in the same shape
// as the old public endpoint. Every query is counted against the monthly free-tier cap (src/lib/search-quota.ts)
// and a per-visitor limit. The widget's usage stats (/stats) are accepted and dropped.
export const dynamic = "force-dynamic";

const NO_STORE = { "cache-control": "no-store" };
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: NO_STORE });
const fail = (error: string, status: number) => json({ success: false, error }, status);

type Body = SearchInput & { stream?: boolean };

// Only what the binding takes: a query or string messages, and the retrieval options.
function input(b: Body | null): SearchInput | null {
  const messages = Array.isArray(b?.messages) ? b.messages.filter((m) => m && typeof m.content === "string").slice(-6) : undefined;
  const query = typeof b?.query === "string" ? b.query.slice(0, 500) : undefined;
  if (!query && !messages?.length) return null;
  return { ...(query ? { query } : { messages }), ...(b?.ai_search_options ? { ai_search_options: b.ai_search_options } : {}) };
}

export async function POST(req: Request) {
  const path = new URL(req.url).pathname.replace(/^\/api\/search/, "");
  if (/^\/stats(\/|$)/.test(path)) return new Response(null, { status: 204 });
  if (path !== "/search" && path !== "/chat/completions") return fail("Not found.", 404);
  const body = (await req.json().catch(() => null)) as Body | null;
  const q = input(body);
  if (!q) return fail("Send a query.", 400);
  if (!(await underRate("SEARCH_LIMITER", req))) return fail("Too many searches. Try again in a minute.", 429);
  try {
    if (path === "/search") return json({ success: true, result: await search(q) });
    const stream = !!body?.stream;
    const out = await chat(q.messages ?? [{ role: "user", content: q.query ?? "" }], stream);
    return stream ? new Response(out as ReadableStream, { headers: { ...NO_STORE, "content-type": "text/event-stream" } }) : json(out);
  } catch (e) {
    if (e instanceof OverQuota) return fail("Site search is resting until next month. Write to us at https://ahromlabs.com/#contact.", 503);
    return fail("Search is unavailable just now.", 502);
  }
}

export function GET() {
  return fail("Not found.", 404);
}
