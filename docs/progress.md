# Knowledge Layer — Progress Log

Tracks what's been built against `docs/knowledge-layer-plan.md`, the decisions made along the way, and what's still open. Update this at the end of each phase.

## Phase tally: 7 phases total (0-6)

| Phase | Status | What it is |
|---|---|---|
| 0 — Foundation | **Partial** | JSON-LD entity graph, crawler-hit logging, robots verified. Two manual items still open (below). |
| 1 — Corpus scaffolding + first note | **Done** | `content/` stood up, `/systems` ported to `content/terms/`, first note written. |
| 2 — Fill the corpus | **Done** | 2 more notes, 5 patterns. |
| 3 — Publish | **Done** | Wired `content/` into live routes + `/knowledge.json`. |
| 4 — Close the loop | Not started | Point sibling repos at the corpus; internal skill. |
| 5 — Two moat artifacts | Not started | OSS Tally library or the extraction-accuracy benchmark. |
| 6 — WebMCP | Not started | Trigger-based, not scheduled. |

## Phase 0 — Foundation

**Built:**
- `src/lib/schema.ts` — JSON-LD `Organization` + `Person` (founder) + `ProfessionalService` + `WebSite` graph, `Organization.sameAs` includes the new LinkedIn company page.
- `src/proxy.ts` — logs AI-crawler hits (`GPTBot`, `ClaudeBot`, `PerplexityBot`, etc.) as structured JSON, captured by Cloudflare Workers Logs. Verified under both `npm run dev` and the real Workers runtime (`npm run preview`) — confirmed static assets bypass it entirely via the `ASSETS` binding, confirmed a plain browser UA logs nothing.
- `src/app/robots.ts` — already permitted every crawler; no change needed.

**Still open (manual, not code):**
- **0.4 Consistency sweep** — matching the Organization description string across LinkedIn/GitHub/Crunchbase. LinkedIn page exists and is in `sameAs`, but the sweep itself (confirming the description text matches) hasn't been done.
- **0.5 Baseline citation check** — asking ChatGPT/Claude/Perplexity/Gemini the ~15 buyer prompts and saving dated answers, *before* any of this content goes live. **This is time-sensitive**: the plan doc calls it "the only clean before/after this plan will ever get." Phase 1/2 content exists in the repo but nothing is wired into live routes yet (confirmed — `content/` isn't imported anywhere), so the baseline window is still open. It closes the moment Phase 3 ships and this gets crawled/indexed.

## Phase 1 — Corpus scaffolding + first note

- `content/terms/*.md` (11 files) — ported from `src/app/systems/page.tsx`, programmatically diffed byte-identical (title casing + definition text) against the source.
- `content/notes/tally-voucher-posting.md` — LS Technologies, Tally integration mechanics (30s/15m/24h cadence, ledger-missing handling, transient-vs-structural error taxonomy, reconciliation loop), all verified against `ls_crm` source code, not guessed.
- **Correction made along the way:** `docs/knowledge-layer-plan.md` originally misattributed `ls-crm`'s client as Shanti Boilers & Pressure Vessels Pvt. Ltd. Corrected to LS Technologies (confirmed the actual client) in all 3 places the doc had it wrong, plus a footnote distinguishing it from the real Shanti Boilers system (`shanti-ops`, project name Shanti Boiler-Ops / SB-Ops — a separate, unrelated client).

## Phase 2 — Fill the corpus

- `content/patterns/*.md` (5 files): `local-agent-cloud-db`, `human-confirmed-extraction`, `role-scoped-finance-views`, `failures-flagged-not-lost`, `graceful-degradation-by-env-var` — all ADR-shaped (context → decision → why → trade-off), sourced from verified `ls_crm`/`savistar-ops` code, not invented.
- `content/notes/two-companies-one-book.md` — Savistar/Saag, role-scoped finance visibility, closes with a real quote from Sachi & Haripriya (owners).
- `content/notes/ai-extraction-human-in-the-loop.md` — LS Technologies, real zero-correction rates you supplied (Purchase order 95%, Purchase invoice 94%, Bank statement 89%, Freight invoice 91%, Bill of entry 88%).
- **Declined to fabricate a quote** attributed to a real named person during planning — you supplied a real one instead, used verbatim.
- Verified: Phase 1's forward-referenced pattern slugs (written before those files existed) now resolve exactly; no confidentiality leaks (no GSTINs, internal file/function names, or specific financial figures beyond what you explicitly approved).

## Phase 3 — Publish

- New routes: `/notes`, `/notes/[slug]` (×3), `/patterns`, `/patterns/[slug]` (×5), `/knowledge.json` (all 19 content files as JSON). `/systems` regenerated from `content/terms/` instead of a hardcoded array — verified pixel-identical (text, group order, term order, anchor IDs all unchanged).
- `src/lib/content.ts`: one loader function, `getContent(kind)`, with build-time frontmatter validation (required fields, slug-matches-filename) and cross-reference validation (every note's `patterns:` must resolve to a real pattern). Both tested against a real induced failure, not just a clean pass — confirmed the build actually fails loudly when broken.
- Went through a second, more skeptical review pass before implementing (external critique of the first draft) — caught and fixed real over-abstraction (`content.ts` went from 3 functions to 1), a missing validation layer, and confirmed via empirical testing (not just docs) that `opengraph-image.tsx` under `[slug]` actually needs its own `generateStaticParams` in this build pipeline, contradicting what the docs implied — caught because the build output showed `ƒ Dynamic` instead of the expected static, not because it was assumed correct.
- Also caught mid-build: `/knowledge.json`, like `sitemap.xml`, is served through the Worker function rather than the `ASSETS` binding, so the planned `public/_headers` cache rule would have been a silent no-op — moved `Cache-Control` onto the response object directly instead, which is what actually reaches the client.
- Added "Notes" and "Patterns" to `SiteNav`/`SiteFooter`, dynamically extended `sitemap.ts`, hand-added an `## Engineering notes` section to `llms.txt` (kept static, not auto-generated — explicit trade-off, see plan file).
- `js-yaml` and `react-markdown` added as dependencies (react-markdown used bare, no `remark-gfm` — current content doesn't need tables/strikethrough).

## Known gaps / risks as of now

1. ~~Nothing in this repo had been committed since the initial `create-next-app` commit~~ — **resolved 2026-08-29**, commit `65a1db2` (76 files, full site + Phase 0-2 knowledge layer work).
2. **0.4 Consistency sweep** — still open, still manual.
3. **0.5 Baseline citation check** — attempted 2026-08-29, blocked (Claude in Chrome not connected; sandboxed browser hit a login wall on the first live query, Perplexity). Rather than fabricate results, this was skipped. The 15 prompts are drafted and saved at `docs/citation-baseline-2026-08.md`. **Not actually time-sensitive right now**: the site launched only days ago, so there's no existing citation footprint to lose — training-data-based answers won't shift for months regardless of when this runs, and live-search-grounded answers have nothing to be "before" yet either. Revisit once the site has enough age/content that a real before/after would mean something.
4. Deferred, documented, low-risk: `Organization.sameAs` still missing GitHub/Crunchbase; `Person` node still missing `sameAs`/`alumniOf` (both marked with `ponytail:` comments in `schema.ts` for exactly where to add them).
