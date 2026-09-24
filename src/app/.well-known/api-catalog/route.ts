// RFC 9727 API catalog. Ahrom Labs has no transactional API; what it does
// publish is a read-only, machine-readable corpus — the knowledge graph at
// /knowledge.json — plus the llms.txt summary and the sitemap. Listing them
// here lets an agent discover all three from one well-known URL instead of
// scraping pages. Add an entry only for something that actually exists.
import { AI_SEARCH_MCP_URL } from "@/lib/ai-search";

export const dynamic = "force-static";

const SITE = "https://ahromlabs.com";

const catalog = {
  linkset: [
    {
      anchor: `${SITE}/.well-known/api-catalog`,
      item: [
        { href: `${SITE}/knowledge.json`, type: "application/json", title: "Ahrom Labs knowledge graph (read-only)" },
        { href: `${SITE}/llms.txt`, type: "text/plain", title: "Site summary for language models" },
        { href: `${SITE}/sitemap.xml`, type: "application/xml", title: "Sitemap" },
        { href: AI_SEARCH_MCP_URL, title: "MCP server: search this site's content (read-only)" },
      ],
    },
    {
      anchor: AI_SEARCH_MCP_URL,
      "service-desc": [{ href: `${SITE}/.well-known/mcp/server-card.json`, type: "application/json" }],
      "service-doc": [{ href: `${SITE}/llms.txt`, type: "text/plain" }],
    },
    {
      anchor: `${SITE}/knowledge.json`,
      "service-doc": [{ href: `${SITE}/llms.txt`, type: "text/plain" }],
    },
  ],
};

export function GET() {
  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
