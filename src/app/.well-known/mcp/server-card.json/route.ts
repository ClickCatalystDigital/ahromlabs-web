import { AI_SEARCH_MCP_URL } from "@/lib/ai-search";

// MCP Server Card (SEP-1649 draft) for the one MCP server this site really
// has: Cloudflare AI Search over the site's own published content. Tool names
// are deliberately not listed — they're defined by Cloudflare, not here, and a
// client discovers them on connect. Published only because the server exists;
// see docs/site-architecture.md before adding capabilities that don't.
export const dynamic = "force-static";

const card = {
  version: "1.0",
  serverInfo: {
    name: "ahromlabs-search",
    title: "Ahrom Labs knowledge search",
    version: "1.0.0",
  },
  description:
    "Search Ahrom Labs' published engineering notes, patterns, industry pages, services and pricing answers. Returns passages with the URL of the page they came from. Read-only; public content only.",
  documentationUrl: "https://ahromlabs.com/llms.txt",
  transport: { type: "streamable-http", endpoint: AI_SEARCH_MCP_URL },
  capabilities: { tools: {} },
  authentication: { required: false },
};

export function GET() {
  return Response.json(card, { headers: { "Cache-Control": "public, max-age=3600" } });
}
