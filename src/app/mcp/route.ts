import { AI_SEARCH_MCP_URL } from "@/lib/ai-search";

// https://ahromlabs.com/mcp: the site's MCP server at a branded address, as listed in the official MCP registry
// (server.json). It passes MCP traffic (streamable HTTP: POST, GET for the event stream, DELETE to end a
// session) straight through to Cloudflare AI Search, so the registry and clients keep one stable URL even if
// the search instance changes. Read-only search over public content; no auth to forward.
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
  const hasBody = req.method === "POST";
  const upstream = await fetch(AI_SEARCH_MCP_URL, { method: req.method, headers, body: hasBody ? await req.arrayBuffer() : undefined });
  const out = new Headers(CORS);
  for (const h of ["content-type", "mcp-session-id", "cache-control"]) {
    const v = upstream.headers.get(h);
    if (v) out.set(h, v);
  }
  // Streamed through as-is, so server-sent events reach the client as they arrive.
  return new Response(upstream.body, { status: upstream.status, headers: out });
}

export const POST = forward;
export const GET = forward;
export const DELETE = forward;
export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
