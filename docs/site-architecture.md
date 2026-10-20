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
| `industry` | `content/industries/*.md` | `/industries/slug` | `WebPage` (`audience`, `about`, `mentions`, `hasPart`, `primaryImageOfPage` when a photo exists); knowledge.json; llms.txt. Optional `flow` (rendered by `FlowFigure` as real text) and `image` (a real, client-cleared photo under `public/`, alt text required — build fails otherwise) |
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
- **Security → Settings → "Block AI bots": off / "Do not block".** Otherwise it re-blocks the
  list above. It shows in Security → Events as *Managed rules → Cloudflare Bot Management rules
  for all plans → "Block AI bots on ad pages"* — seen blocking ClaudeBot on `/sitemap.xml` on
  2026-09-24 after the AI Crawl Control toggles were already off. It likely also broke AI
  Search's sitemap fetch.
- **Bot Preference Sync:** may stay on only if the live robots.txt still carries this repo's
  `Content-Signal: search=yes, ai-input=yes, ai-train=yes` and no `Disallow` for the bots above.
  Check with `curl -s https://ahromlabs.com/robots.txt`.
- **Markdown for Agents (Pro):** leave off — the site already negotiates markdown itself.
- **SSL/TLS → Always Use HTTPS: on.**

## AI Search (on-site search, chat and MCP)

Cloudflare AI Search instance `ahromlabs-search` crawls the site (sitemap
`https://ahromlabs.com/sitemap.xml`, crawler UA `Cloudflare-AI-Search`, parse type **Static** —
**Rendered** times out) and serves search,
chat completions and an MCP server from its public endpoint. All URLs live in
`src/lib/ai-search.ts`.

- **Humans:** `<search-modal-snippet>` on every page (Cmd/Ctrl+K and a nav "Search" item) and
  the search modal in `src/components/SiteSearch.tsx`, from the pinned npm package
  `@cloudflare/ai-search-snippet`, loaded at browser idle, themed with the site's CSS tokens.
- **Ahrom AI (chat):** our own panel, `src/components/AhromChat.tsx`, on the same public
  endpoint's `/chat/completions` (streamed; `event: chunks` gives the source pages shown under
  each answer). Header: logo, minimise (keeps the conversation) and close (clears it). After
  10 s on the site a one-line hello by the visitor's clock appears beside the launcher, once per
  visit. The suggested questions are business-owner questions with fixed answers built from the
  page data (`src/lib/ai-chat-presets.ts`): instant, and right every time, which no model was. The mascot's face changes with the conversation (`public/ahrom-ai/*.webp`,
  cropped from one sheet), picked in code from typing, waiting and the reply's wording, not by
  a model. The endpoint only answers ahromlabs.com, so the chat can't answer on localhost (it
  shows its error face).
- **Agents:** `/.well-known/mcp/server-card.json` (SEP-1649 draft; no tool list — Cloudflare
  defines the tools), an MCP entry in the API catalog, and a line in llms.txt.
- **Cost guard (dashboard, not code):** public endpoint rate limit ~20/min, authorized host
  `ahromlabs.com`, and an AI Gateway rate limit + spend alert.
- **Freshness:** a sync re-reads only pages whose sitemap `lastmod` moved. Every page gets it
  from the exact time of the last commit touching its sources — its content file and the code
  that renders it (`PAGE_SOURCES`/`RENDERERS` in `scripts/build-content.mjs`) — or its
  `updated:` day if later. (Until 17 Oct 2026 content pages used `updated:` alone, a day: a
  same-day edit never moved it, and the chatbot named the boiler client after the site had
  stopped.) There is no "re-index everything" command; moving `lastmod` is the lever. To check
  freshness, search the index for the old text (`POST /search`) and look at which pages return it. `npm run deploy` starts a sync
  (`npm run search:sync`), and the instance also syncs every 6 hours.
- **Retrieval settings (17 Oct 2026, measured with `npm run search:check`):** hybrid search
  with reranking, keyword match mode `and`, score threshold 0.3, chunk size **256**. Answer cache
  **off** since 20 Oct 2026: at "close enough" it served stale answers to the chat's own suggested
  questions. Answer model `@cf/mistralai/mistral-small-3.1-24b-instruct` (20 Oct 2026): the default Llama
  3.3 70B said "not covered" to questions the passages answered; `@cf/openai/gpt-oss-120b` sometimes
  printed its own reasoning ("We need to search the site…") and once invented a 4–6 month go-live; `@cf/google/gemma-4-26b-a4b-it` wrote the best
  answers (Hinglish too) but took 22–100 s to its first word, as it reasons first. About 7 s of
  every reply is retrieval, whatever the model. Chunk size decided it: at 1024 a chunk held five FAQ answers and only the first
  ranked, 8/17 checks passed; at 512, 11/17; at 256, 12/17. Keyword `and` vs `or` made no difference (8/17
  both). A chunk change can take 15 minutes to reach every page, and the first sync after it may
  skip pages: wait until `wrangler ai-search stats` shows nothing queued or running. Any
  setting change starts a re-index by itself; re-indexing 44 pages takes 10 to 20 minutes.
- **Checking it:** `scripts/check-chatbot.mjs` asks buyer questions and checks the right passage
  comes back; `npm run deploy` runs it after the sync. Remaining misses are paraphrases that
  share few words with the page; fix them with wording, then add the question to the check.
  The gate is the reranker (`@cf/baai/bge-reranker-base`, default), not keyword `and`: on
  20 Oct 2026 "daily wage payroll for contract labour" had 50 vector candidates, the right page
  first with reranking off, and 0 results with it on, because the 0.3 threshold applies to a
  rerank score near 0 when the chunk lacks the buyer's words (Hinglish too: "kharcha kitna"
  scores only against a chunk containing those words). To test wording before a deploy, score
  the draft chunk with that model through Workers AI (`/ai/run/@cf/baai/bge-reranker-base`).
  Also ask the real chat (`POST /chat/completions`): retrieval passing is not the same as the
  answer being right.
- **System prompt:** the text lives in `docs/chatbot-system-prompt.md` (Ahrom AI persona, 20 Oct
  2026); set the live one from it. First version (17 Oct 2026): answer only from the retrieved pages, first sentence
  first, name the page; when nothing matches, say the site doesn't cover it and point to
  `/#contact`; never general knowledge, never invented prices, terms, clients or regulation
  details, never a client the pages don't name. Before it, a no-match question got a generic
  answer ("software is typically licensed…"). Wrangler can't set the prompt or the keyword match
  mode: use the dashboard, or `PUT /accounts/{id}/ai-search/namespaces/default/instances/ahromlabs-search`
  with only the changed field (`system_prompt_ai_search`), with the token from
  `wrangler auth token` — partial bodies merge, as Wrangler's own `update` sends them.
- **Official links:** the check fetches each with `curl`, not Node `fetch`: egazette.gov.in
  refuses HEAD and omits its intermediate certificate, which macOS curl fetches and Node (even
  with `--use-system-ca`) does not.

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
