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

// The widget code itself is the npm package @cloudflare/ai-search-snippet
// (pinned in package.json), bundled with the site — see SiteSearch.tsx.

// Cloudflare's own MCP address. Only src/app/mcp/route.ts uses it: everything public names MCP_URL below.
export const AI_SEARCH_MCP_URL = `${AI_SEARCH_URL}/mcp`;

// The site's MCP server as the world sees it: ahromlabs.com/mcp, which passes through to AI_SEARCH_MCP_URL.
// The one public address, used by the server card, the API catalog, llms.txt and /agents. Also listed, by
// hand, in server.json (official MCP registry); the GitHub server (Ahrom-Labs/ahromlabs-mcp) reads it from the
// server card. If the search instance changes, edit AI_SEARCH_URL only; nothing outside this repo changes.
export const MCP_URL = "https://ahromlabs.com/mcp";
export const MCP_REPO_URL = "https://github.com/Ahrom-Labs/ahromlabs-mcp";
