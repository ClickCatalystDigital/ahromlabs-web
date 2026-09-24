# Site architecture — one knowledge graph, two audiences

How ahromlabs.com is put together, and the rules that keep it coherent. Read this before adding
a route, a node type, or a field. The *process* for adding content is `docs/corpus-playbook.md`;
this file is the *structure* that process fills.

## Principle: agents first, humans in the same pass

Every fact on the site exists **once**, as a node in a graph. The same node is rendered three
ways — never written three times:

1. **For people** — an HTML page, designed for a buyer deciding.
2. **For crawlers and answer engines** — JSON-LD on that page, linked by stable `@id`s.
3. **For agents** — `/knowledge.json` (every node and edge), `/llms.txt` (a summary with links).

If a claim appears in one surface and not the others, something bypassed the graph.

## Node types

| Kind | Source of truth | Human route | Machine representation |
|---|---|---|---|
| `term` | `content/terms/*.md` | `/systems#slug` (page at `/systems/slug` once it has a body) | `DefinedTerm` in `DefinedTermSet`; knowledge.json |
| `note` | `content/notes/*.md` | `/notes/slug` | `TechArticle` (`about` services, `mentions` clients); knowledge.json |
| `pattern` | `content/patterns/*.md` | `/patterns/slug` | `TechArticle`; knowledge.json |
| `industry` | `content/industries/*.md` | `/industries/slug` | `WebPage` (`audience`, `about`, `mentions`, `hasPart`); knowledge.json; llms.txt |
| `service` | `src/lib/services.ts` | `/services#slug` | `Service` in the `OfferCatalog` on every page; knowledge.json; llms.txt |
| `client` | `src/lib/work.ts` | `/work#slug` | `Organization` in `mentions`; knowledge.json; llms.txt |
| `question` | `src/lib/engagement.ts` | `/engagement#id` | knowledge.json; llms.txt (plain Q&A — no FAQPage schema, see progress log) |
| organization, founder, website | `src/lib/schema.ts` `orgGraph` | `/`, `/about` | `@graph` on every page |

Prose-heavy nodes are markdown with frontmatter; structured, short nodes are typed TypeScript.

## Edges — all explicit, all build-checked

| Edge | Declared in | Checked by |
|---|---|---|
| note → pattern | note `patterns:` | `scripts/build-content.mjs` |
| industry → note, pattern | industry `notes:`, `patterns:` | `scripts/build-content.mjs` |
| industry → client, service | industry `clients:`, `services:` | `resolveIndustryEdges()` at prerender |
| service → note/pattern | `services.ts` `proof` | `resolveProof()` at prerender |
| client → note/pattern | `work.ts` `proof` | `resolveProof()` at prerender |
| client → service | `work.ts` `services` | TypeScript (`Service["slug"]`) |

**Reverse edges are derived, never declared**: a note's "Part of" list (services, industries,
clients), a pattern's "Seen in practice" and "Part of", a client's industry link, TechArticle
`about`/`mentions`. Declaring a reverse edge by hand is how the graph drifts.

## Machine surfaces

- **`/knowledge.json`** — every node with its full fields, a public `url`, and its edges.
  Consumed by the client repos' agents (they filter `kind === "pattern"`), so new kinds are safe
  to add; changing an existing field's shape is not.
- **`/llms.txt`** — generated. Summary, fit statement, then Industries, Services, Clients,
  Working with us, Notes, Patterns, Vocabulary. Every line links to its node.
- **JSON-LD** — `orgGraph` on every page (organization, founder, service + offer catalog,
  website); one page-specific node per page, linked by `@id`.
- **`/sitemap.xml`** — every HTML node; `lastModified` only where a real `updated` date exists.
- **Discoverability** — the footer links `llms.txt` and `knowledge.json` on every page; the
  homepage declares `knowledge.json` as `<link rel="alternate" type="application/json">`.
- **Markdown negotiation** — any page requested with `Accept: text/markdown` returns markdown
  from the same URL. `scripts/build-markdown.mjs` converts each prerendered page's `<main>` into
  `public/md/<route>.md` after `next build`; `src/proxy.ts` serves it from the ASSETS binding.
  Browsers never see it; `/md/*` is `noindex`.
- **Link headers (RFC 8288)** — every page response carries `Link` to llms.txt, knowledge.json,
  the sitemap, the API catalog and its own canonical, plus `Vary: Accept`.
- **`/robots.txt`** — static file (`src/app/robots.txt`) with `Content-Signal: search=yes,
  ai-input=yes, ai-train=yes` — all yes, deliberately: the site exists to be learned from.
- **`/.well-known/api-catalog`** (RFC 9727) — lists knowledge.json, llms.txt and the sitemap.
- **`/auth.md`** — states plainly that no authentication exists and everything is public.
  Cloudflare's Auth.md check will keep failing, correctly: it requires an OAuth agent-registration
  system (`/.well-known/oauth-protected-resource` with `agent_auth`), which this site doesn't have.
- **Not built, deliberately** (Cloudflare Agent Readiness Level 3 and Commerce): OAuth
  discovery/protected resource, A2A agent card, skills index, MCP server card, Web Bot Auth,
  WebMCP, DNS-AID, and all commerce protocols. There is no login, no API, no agent and nothing
  for sale; publishing descriptors for things that don't exist would be false signals. Revisit
  WebMCP on the triggers in `docs/knowledge-layer-plan.md` Phase 6.

## Cloudflare dashboard settings that must agree with the code

The code can declare intent; Cloudflare's edge can silently override it. Found 2026-09-24:
AI Crawl Control was **blocking** ClaudeBot, GPTBot, Amazonbot, CCBot and others at the edge
(108 refused requests in 7 days) while robots.txt said `ai-train=yes`. Expected state:

- **AI Crawl Control → Security:** AI crawlers, AI search and AI assistants **allowed**
  (ClaudeBot, Claude-SearchBot, Claude-User, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot,
  Perplexity-User, Amazonbot, Applebot, CCBot, meta-externalagent, DuckAssistBot, archivers).
  Bytespider may stay blocked — aggressive crawler, negligible value for Indian B2B buyers.
- **Security → Settings → "Block AI bots": off.** Otherwise it re-blocks the list above.
- **Bot Preference Sync:** may stay on only if the live robots.txt still carries this repo's
  `Content-Signal: search=yes, ai-input=yes, ai-train=yes` and no `Disallow` for the bots above.
  Check with `curl -s https://ahromlabs.com/robots.txt`.
- **Markdown for Agents (Pro):** leave off — the site already negotiates markdown itself.
- **SSL/TLS → Always Use HTTPS: on.**

## Human structure

Navigation follows how a buyer decides:
**Services → Industries → Work → Pricing (`/engagement`) → Notes → About**, with a
"Start a conversation" CTA. Approach, Systems (glossary) and Patterns are in the footer. Every
page ends with the closing CTA, which also links `/engagement`.

Depth for a reader landing from search: industry page → notes → patterns, and back up through
"Part of" links at the end of every note and pattern.

## Rules

1. **One fact, one node.** Commercial terms live only in `engagement.ts`; client facts only in
   notes (restated in `work.ts` highlights with a `proof` link).
2. **No node without evidence.** Industries exist only where a real system was built; services
   without a client deployment say so.
3. **Third-party figures carry sources** (`sources` on a question, outbound links in notes) and
   are never presented as Ahrom Labs' own.
4. **Every dynamic route sets `dynamicParams = false`** — unknown slugs 404, never 500.
5. **Every page sets its own canonical.** The root layout deliberately sets none.
6. **Prerendered everything.** No runtime data; the Worker serves pages from the static-assets
   cache (`open-next.config.ts`). Deploy only with `npm run deploy`.
7. **Plain Q&A, no FAQPage schema.** Retired rich result, no measured citation lift.

## Adding a new node type

Only when an existing kind genuinely can't hold it. Then, in one change: source of truth + route
(with `dynamicParams = false`, canonical, OG image) + JSON-LD node + knowledge.json + llms.txt +
sitemap + edge validation + a row in both tables above.
