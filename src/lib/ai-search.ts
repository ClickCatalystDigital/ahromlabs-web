// Cloudflare AI Search instance "ahromlabs-search" — a crawl of this site,
// exposed as search, chat and an MCP server. One place for its URLs: the
// on-site widgets (src/components/SiteSearch.tsx), the MCP server card
// (/.well-known/mcp/server-card.json), the API catalog and llms.txt all read
// from here.
//
// The public endpoint is rate-limited and host-restricted to ahromlabs.com in
// the Cloudflare dashboard (AI Search → Public endpoint → Security). Those
// limits, not this file, are what cap cost — keep them set.
export const AI_SEARCH_URL = "https://f4174b88-0589-496b-b82e-864b8a1a4501.search.ai.cloudflare.com";

// The web-component bundle the instance serves (github.com/cloudflare/ai-search-snippet).
// If the dashboard's "Browse components" snippet shows a different src, it wins:
// replace this one line.
export const AI_SEARCH_SNIPPET_SRC = `${AI_SEARCH_URL}/search-snippet.es.js`;

export const AI_SEARCH_MCP_URL = `${AI_SEARCH_URL}/mcp`;
