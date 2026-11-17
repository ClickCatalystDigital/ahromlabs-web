// Cloudflare AI Search instance "ahromlabs-search": a crawl of this site, used by site search (/api/search), the
// MCP server (/mcp) and the chat fallback. Reached only through the Worker binding SEARCH; the public endpoint is
// switched off and every query is counted (src/lib/search-quota.ts). The widget is the npm package
// @cloudflare/ai-search-snippet (SiteSearch.tsx), pointed at /api/search.

// The site's MCP server as the world sees it: ahromlabs.com/mcp, answered by src/app/mcp/route.ts.
// The one public address, used by the server card, the API catalog, llms.txt and /agents. Also listed, by
// hand, in server.json (official MCP registry); the GitHub server (Ahrom-Labs/ahromlabs-mcp) reads it from the
// server card. If the search instance changes, edit the SEARCH binding in wrangler.jsonc only.
export const MCP_URL = "https://ahromlabs.com/mcp";
export const MCP_REPO_URL = "https://github.com/Ahrom-Labs/ahromlabs-mcp";
