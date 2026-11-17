import { AI_SEARCH_MCP_URL } from "@/lib/ai-search";
import { take, underRate } from "@/lib/search-quota";

// https://ahromlabs.com/mcp: the site's MCP server at a branded address, as listed in the official MCP registry
// (server.json). It passes MCP traffic (streamable HTTP: POST, GET for the event stream, DELETE to end a
// session) straight through to Cloudflare AI Search, so the registry and clients keep one stable URL even if
// the search instance changes. Read-only search over public content; no auth to forward.
// Limits (src/lib/search-quota.ts): each tools/call is a paid AI Search query, so it counts against the monthly
// free-tier cap, and each IP gets MCP_LIMITER (wrangler.jsonc). initialize, tools/list and pings are free and pass.
export const dynamic = "force-dynamic";

// Headers that matter to MCP over streamable HTTP; everything else (cookies, Cloudflare's own) stays here.
const PASS = ["content-type", "accept", "mcp-session-id", "mcp-protocol-version", "last-event-id"];
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, accept, mcp-session-id, mcp-protocol-version, last-event-id",
  "Access-Control-Expose-Headers": "mcp-session-id",
};

async function forward(req: Request) {
  const headers = new Headers();
  for (const h of PASS) {
    const v = req.headers.get(h);
    if (v) headers.set(h, v);
  }
  const body = req.method === "POST" ? await req.arrayBuffer() : undefined;
  const calls = body ? toolCalls(body) : [];
  if (calls.length) {
    if (!(await underRate("MCP_LIMITER", req))) return refuse(calls, "Too many searches from this address. Try again in a minute.");
    if (!(await take(calls.length))) return refuse(calls, "Ahrom Labs search has used this month's allowance. It resets on the 1st (UTC); until then, read the pages at https://ahromlabs.com or write to https://ahromlabs.com/#contact.");
  }
  const upstream = await fetch(AI_SEARCH_MCP_URL, { method: req.method, headers, body });
  const out = new Headers(CORS);
  for (const h of ["content-type", "mcp-session-id", "cache-control"]) {
    const v = upstream.headers.get(h);
    if (v) out.set(h, v);
  }
  // Streamed through as-is, so server-sent events reach the client as they arrive.
  return new Response(upstream.body, { status: upstream.status, headers: out });
}

type Rpc = { method?: string; id?: string | number | null };
// The JSON-RPC requests in a POST body (one message or a batch) that are tool calls.
function toolCalls(body: ArrayBuffer): Rpc[] {
  try {
    const msg = JSON.parse(new TextDecoder().decode(body)) as Rpc | Rpc[];
    return (Array.isArray(msg) ? msg : [msg]).filter((m) => m?.method === "tools/call");
  } catch {
    return [];
  }
}

// A tool result marked isError, so the client's model reads the reason instead of a transport failure.
function refuse(calls: Rpc[], reason: string) {
  const out = calls.map((c) => ({ jsonrpc: "2.0", id: c.id ?? null, result: { isError: true, content: [{ type: "text", text: reason }] } }));
  return new Response(JSON.stringify(out.length === 1 ? out[0] : out), { status: 200, headers: { ...CORS, "content-type": "application/json" } });
}

export const POST = forward;
export const GET = forward;
export const DELETE = forward;
export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
