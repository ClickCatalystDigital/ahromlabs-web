import { getCloudflareContext } from "@opennextjs/cloudflare";

// Keeps AI Search ("ahromlabs-search") inside Cloudflare's free tier: 1,000 semantic queries a month (billing
// from Dec 2026). Every query the site sends (site search via /api/search, MCP tool calls via /mcp, the chat
// fallback in api/ahrom-ai) goes through search() or chat() below, which count first; once the month's count
// reaches CAP, search stops until the 1st (UTC). AI Search is reached only through the Worker binding SEARCH
// (wrangler.jsonc): its public endpoint is switched off, so nothing can query it without passing this count.
// CAP sits below 1,000 to leave room for queries made outside the site (dashboard, `cf ai-search search`).
// Counter: table ai_search_usage in the CRM D1 database (migration 0028 in ~/Developer/ahrom-crm).
// ponytail: one row per month, one UPDATE per query; fine at ~1,000 queries a month.
export const CAP = 900;

type D1 = { prepare(q: string): { bind(...v: unknown[]): { first<T>(): Promise<T | null> } } };
type RateLimit = { limit(options: { key: string }): Promise<{ success: boolean }> };
type Msg = { role: string; content: string };
export type SearchInput = { query?: string; messages?: Msg[]; ai_search_options?: Record<string, unknown> };
type Binding = {
  search(input: SearchInput): Promise<unknown>;
  chatCompletions(input: SearchInput & { stream?: boolean }): Promise<unknown>;
};
type Env = { CRM?: D1; SEARCH?: Binding; SEARCH_LIMITER?: RateLimit; MCP_LIMITER?: RateLimit };

// Thrown when the month's allowance is used up (or the counter can't be read).
export class OverQuota extends Error {}

// The only ways to query AI Search. Each counts one query first.
export async function search(input: SearchInput): Promise<unknown> {
  const { SEARCH } = await searchEnv();
  if (!SEARCH) throw new Error("SEARCH binding is not configured");
  if (!(await take())) throw new OverQuota();
  return SEARCH.search(input);
}

// stream: true gives the SSE ReadableStream (an `event: chunks` line, then OpenAI-style deltas, then [DONE]).
export async function chat(messages: Msg[], stream: boolean): Promise<unknown> {
  const { SEARCH } = await searchEnv();
  if (!SEARCH) throw new Error("SEARCH binding is not configured");
  if (!(await take())) throw new OverQuota();
  return SEARCH.chatCompletions({ messages, stream });
}

export async function searchEnv(): Promise<Env> {
  return (await getCloudflareContext({ async: true })).env as unknown as Env;
}

// Counts n queries against this month and says whether they're allowed. Fails closed: no counter, no search.
async function take(n = 1): Promise<boolean> {
  if (n <= 0) return true;
  const { CRM } = await searchEnv();
  if (!CRM) return false;
  const month = new Date().toISOString().slice(0, 7);
  const row = await CRM.prepare(
    "INSERT INTO ai_search_usage (month, n) VALUES (?1, ?2) ON CONFLICT(month) DO UPDATE SET n = n + ?2 WHERE n + ?2 <= ?3 RETURNING n",
  )
    .bind(month, n, CAP)
    .first<{ n: number }>()
    .catch(() => null);
  return row !== null;
}

// Per-visitor limit; true when allowed. No binding (local `next dev`) or no IP: allowed.
export async function underRate(limiter: "SEARCH_LIMITER" | "MCP_LIMITER", req: Request): Promise<boolean> {
  const ip = req.headers.get("cf-connecting-ip");
  const rl = (await searchEnv())[limiter];
  return !ip || !rl || (await rl.limit({ key: ip })).success;
}
