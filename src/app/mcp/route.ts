import { search, underRate, OverQuota } from "@/lib/search-quota";

// https://ahromlabs.com/mcp: the site's MCP server, as listed in the official MCP registry (server.json) and used by
// the npm server Ahrom-Labs/ahromlabs-mcp. Since 18 Nov 2026 it answers itself (streamable HTTP, stateless, JSON
// replies) with one tool, `search`, over the AI Search Worker binding, instead of passing through to Cloudflare's
// public endpoint, which is now switched off. Same tool name and arguments as before, so clients don't change.
// Limits (src/lib/search-quota.ts): each tools/call is one counted query against the monthly free-tier cap, and
// each IP gets MCP_LIMITER (wrangler.jsonc). initialize, tools/list and pings are free.
export const dynamic = "force-dynamic";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, accept, mcp-session-id, mcp-protocol-version, last-event-id",
  "Access-Control-Expose-Headers": "mcp-session-id",
};
const VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
const TOOL = {
  name: "search",
  title: "Search Ahrom Labs",
  description:
    "Searches Ahrom Labs' published pages (ERP for Indian manufacturers and traders, IBR 2026 boiler forms, ASME, interior BOQs, TallyPrime integration, construction, US sales tax, AI assistants over business data). Returns passages with the URL of their page; cite it.",
  inputSchema: {
    type: "object",
    properties: { query: { type: "string", description: "What to look for, in plain words." } },
    required: ["query"],
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
};

type Rpc = { jsonrpc?: string; id?: string | number | null; method?: string; params?: { protocolVersion?: string; name?: string; arguments?: { query?: unknown } } };

const toolText = (text: string, isError = false) => ({ content: [{ type: "text", text }], ...(isError ? { isError: true } : {}) });

async function answer(m: Rpc, req: Request): Promise<unknown> {
  switch (m.method) {
    case "initialize": {
      const asked = m.params?.protocolVersion;
      return {
        protocolVersion: asked && VERSIONS.includes(asked) ? asked : VERSIONS[0],
        capabilities: { tools: {} },
        serverInfo: { name: "ahromlabs-search", title: "Ahrom Labs knowledge search", version: "1.0.0" },
        instructions: "Search Ahrom Labs' published pages with the search tool. Each result carries its page URL; cite it.",
      };
    }
    case "ping":
      return {};
    case "tools/list":
      return { tools: [TOOL] };
    case "tools/call": {
      if (m.params?.name !== "search") throw Object.assign(new Error(`Unknown tool: ${m.params?.name}`), { code: -32602 });
      const query = m.params.arguments?.query;
      if (typeof query !== "string" || !query.trim()) return toolText("Give a query to search for.", true);
      if (!(await underRate("MCP_LIMITER", req))) return toolText("Too many searches from this address. Try again in a minute.", true);
      try {
        return toolText(JSON.stringify({ success: true, result: await search({ query: query.slice(0, 500) }) }));
      } catch (e) {
        if (e instanceof OverQuota)
          return toolText("Ahrom Labs search has used this month's allowance. It resets on the 1st (UTC); until then, read the pages at https://ahromlabs.com or write to https://ahromlabs.com/#contact.", true);
        return toolText("Ahrom Labs search is unavailable just now. Try again later.", true);
      }
    }
    default:
      throw Object.assign(new Error(`Method not found: ${m.method}`), { code: -32601 });
  }
}

async function reply(m: Rpc, req: Request) {
  try {
    return { jsonrpc: "2.0", id: m.id ?? null, result: await answer(m, req) };
  } catch (e) {
    const err = e as Error & { code?: number };
    return { jsonrpc: "2.0", id: m.id ?? null, error: { code: err.code ?? -32603, message: err.message } };
  }
}

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, "content-type": "application/json" } });

export async function POST(req: Request) {
  const body = (await req.json().catch(() => undefined)) as Rpc | Rpc[] | undefined;
  if (!body || typeof body !== "object") return json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, 400);
  const list = Array.isArray(body) ? body : [body];
  // Notifications and responses (no id or no method) get no reply.
  const requests = list.filter((m) => m && m.method && m.id !== undefined);
  if (!requests.length) return new Response(null, { status: 202, headers: CORS });
  const out = await Promise.all(requests.map((m) => reply(m, req)));
  return json(Array.isArray(body) ? out : out[0]);
}

// Stateless: no server-to-client event stream and no sessions to end.
export function GET() {
  return new Response(null, { status: 405, headers: { ...CORS, Allow: "POST, OPTIONS" } });
}
export const DELETE = GET;
export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
