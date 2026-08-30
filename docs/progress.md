# Knowledge Layer — Progress Log

Tracks what's been built against `docs/knowledge-layer-plan.md`, the decisions made along the way, and what's still open. Update this at the end of each phase.

## Phase tally: 7 phases total (0-6)

| Phase | Status | What it is |
|---|---|---|
| 0 — Foundation | **Partial** | JSON-LD entity graph, crawler-hit logging, robots verified. Two manual items still open (below). |
| 1 — Corpus scaffolding + first note | **Done** | `content/` stood up, `/systems` ported to `content/terms/`, first note written. |
| 2 — Fill the corpus | **Done** | 2 more notes, 5 patterns. |
| 3 — Publish | **Done** | Wired `content/` into live routes + `/knowledge.json`. |
| 4 — Close the loop | **Done** | Sibling repos wired to the corpus; internal skill created. |
| 5 — Two moat artifacts | **5.1 done** (public, cross-linked, deployed); 5.2 methodology documented, deferred | OSS Tally library or the extraction-accuracy benchmark. |
| 6 — WebMCP | **Not started** — checked 2026-08-30, gate still closed | Trigger-based, not scheduled. |

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

**Production bug found and fixed same day:** despite `npm run dev` and the local `npm run build` working, and even despite an earlier `npm run preview` check passing for the routes tested at the time, `/notes` and `/patterns` failed in the real deployed Worker with `ENOENT: no such file or directory, readdir '/bundle/content/patterns'`. Root cause: `content.ts` had top-level (module-load-time) code — the cross-reference validation ran `getContent()` as a side effect outside any function — combined with a dynamic `fs.readdirSync`/`readFileSync` pattern that Next's/OpenNext's bundler can't statically trace, so `content/` never made it into the Worker bundle. Cloudflare evaluates the whole bundled server module graph on cold start, so that top-level code ran inside the Worker, where the directory didn't exist.

**Fix:** moved all filesystem access into a standalone build script (`scripts/build-content.mjs`, plain Node, never bundled) that pre-compiles `content/**/*.md` into `src/lib/content-data.generated.json` (gitignored, regenerated by a `content:build` step wired into `dev`/`build`/`preview`/`deploy`). `content.ts` now does a plain `import` of that JSON — a static import is something every bundler resolves and includes automatically, so there's no dynamic fs call left to fail to trace. Validation (required fields, slug-matches-filename, cross-references) moved into the build script, still fails the build loudly on a real break (re-tested). `js-yaml` moved from `dependencies` to `devDependencies` since it's now build-tool-only, never bundled into the Worker.

Verified against the actual failure mode, not just re-running the old checks: `npm run preview`'s local observability query log showed the exact stale `ENOENT`/`readdir '/bundle/content/patterns'` errors from before the fix (three different past `wrangler dev` sessions), then zero errors — all `info` level — across `/notes`, `/patterns`, both `[slug]` detail pages, both OG image routes, `/knowledge.json`, and `/systems` in the current session.

## Phase 4 — Close the loop

**4.4 done (this repo):** 4 background investigations (`ls_crm`, `savistar-ops`, `ls-inventory`, `shanti-ops`) found 9 new transferable-decision candidates beyond the original 5, all verified non-duplicate against the existing pattern files before extraction — `reconcile-against-source-of-truth` (ls-crm), `seeded-credentials-forced-rotation`/`reference-rate-anomaly-detection`/`derive-balances-dont-store-them` (savistar-ops), `self-healing-sequence-counters`/`replay-queued-payload-through-existing-handler` (pcb-inventory), `separate-machine-from-human-identity`/`fail-closed-preserve-visibility`/`unconfirmed-inferences-stay-read-only` (shanti-ops, anonymized — no `systems:` field, no client-identifying specifics). Two more candidates were found and deliberately excluded as too thin for a real ADR (one from `ls_crm`, one from `shanti-ops`) — not overlooked. Corpus is now 28 files (11 terms, 3 notes, 14 patterns). `llms.txt` and this repo's docs updated to match. Verified in production: `https://ahromlabs.com/knowledge.json` was already live (confirmed 19 entries matching Phase 3 before this work; the site had been deployed independently of this session at some point after Phase 3).

**Found along the way, handled separately:** two real security issues in `ls-inventory` (hardcoded `admin123` password gating destructive undo/delete actions; near-absent per-route role enforcement) — flagged as background task `task_e20367ab`, not corpus material, not fixed here.

**Done:** deployed `ahrom-labs` to production (`https://ahromlabs.com/knowledge.json` confirmed live with all 28 entries, 14 patterns), then wired all 4 repos (`ls_crm`, `savistar-ops`, `ls-inventory`, `shanti-ops`) — each got a new `CLAUDE.md` (`@SYSTEM.md`) and an appended `SYSTEM.md` section stating both halves of the discipline (check before designing, contribute back after). Caught and fixed a real bug mid-execution in `savistar-ops` and `ls-inventory`: an off-by-one in reading each file's true last line caused the new section to insert before a trailing orphaned line instead of at the actual end — fixed by re-reading with `tail` and repositioning correctly, then re-verified across all 4 repos. None of the 4 external repos were committed — left for manual review, per the "only commit when asked" rule. Created `~/.claude/skills/ahrom-pattern-check/SKILL.md` (global, confirmed valid — the harness picked it up as an available skill immediately after creation), scoped to avoid misfiring across the user's many unrelated projects, with concrete contribute-back instructions (exact paths, schema, validation command) rather than a vague reminder.

**Not verified**: whether the `@SYSTEM.md` import in each new `CLAUDE.md` actually auto-loads — needs a fresh session opened in one of those repos to confirm, not yet done.

Also fixed along the way: `.DS_Store` files (`public/.DS_Store`, `public/logo/.DS_Store`) had been deployed as public static assets — gitignore never protected them since Wrangler/OpenNext uploads whatever's physically in `public/` on disk, not what git tracks. Deleted and redeployed; confirmed both now 404 in production.

## Phase 5 — Two moat artifacts

Phase 5's own gate ("only start once Phase 0's crawler log has told you what's actually being read") couldn't be satisfied — `proxy.ts` was only committed and first deployed today; there's no meaningful log history yet. Feasibility investigation found a stark gap instead: 5.1's protocol logic already exists in `ls_crm`, working and secret-free (days of packaging work); 5.2 has zero seed data anywhere (no local document corpus, no accuracy data in the schema) and would need a genuine multi-week from-scratch data collection and grading effort. Per your direction, both were planned; only 5.1 was executed.

**5.1 — `tally-voucher-xml`** (public at `https://github.com/ahromlabs/tally-voucher-xml`): genericized voucher-XML building, push-to-Tally, and transient-vs-structural error classification, extracted from `ls_crm`'s production code. Stripped: `EXPENSE_LEDGER_MAP`'s ~25 real ledger names, the "LS Technologies is always the buyer" business rule, all Turso/DB coupling. 32 tests (Node's built-in `node:test`, zero dependencies), all passing — including a caught-and-fixed test bug where I'd assumed case-preservation in the ported error classifier that the original source (which lowercases before matching) never actually had; fixed the test, not the library, to stay faithful to what was verified in production. Confidentiality and secrets greps both clean. One piece of scope creep caught and removed before committing: an `amt()` helper carried over from the source that nothing in the extracted code actually calls.

**2026-08-30: pushed and cross-linked.** Pushed to `github.com/ahromlabs` (required connecting a second `gh` account with org write access — `clickcatalyst-digital`, the original authenticated account, lacked it). Added cross-links: the `tally-voucher-posting` note gets a "Reference implementation" section linking the repo; `local-agent-cloud-db` and `failures-flagged-not-lost` patterns each get an "As code" section linking the specific functions that implement them. Ran `content:build` (28 entries unchanged) + full `next build` (clean) + `npm run deploy` — verified live on `ahromlabs.com`: the note's HTML contains the GitHub link, and `/knowledge.json` shows all three cross-referencing entries.

**5.2 — extraction-accuracy benchmark**: methodology documented in the plan file only (pull a real document sample from `ls_crm`'s R2 bucket, redact, establish ground truth by hand, run multi-model comparisons via OpenRouter, grade every field, publish). No code, no repo. Explicit rule carried forward: never manufacture data, accuracy numbers, or conclusions — this ships only once representative documents, real ground truth, and a defensible evaluation process actually exist.

## Phase 6 — WebMCP

**Trigger check performed 2026-08-30 — gate still closed, nothing started.** The plan gates this phase on three triggers, none of which have fired:

1. **Gemini in Chrome tool support** — still an origin trial (Chrome 149) as of the current sources ([Chrome for Developers](https://developer.chrome.com/blog/chrome-at-io26), [Spronta, *State of WebMCP: July 2026*](https://www.spronta.com/blog/state-of-webmcp-july-2026/)); Gemini in Chrome "will soon support" WebMCP APIs, not shipped. As of the most recent independent audit (May 2026), no mainstream agent client (Claude, ChatGPT Agent, Perplexity, Gemini) actually calls `modelContext` tools yet.
2. **Lighthouse `webmcp-form-coverage`** — still informational, no warnings, per [Chrome for Developers docs](https://developer.chrome.com/docs/lighthouse/agentic-browsing/forms-missing-declarative-webmcp). Flagged as "the likeliest of the three WebMCP audits to tighten" but hasn't yet.
3. **Agent UAs in the crawler log** — checked `src/proxy.ts`: it matches against a hardcoded 16-entry allowlist of known AI crawlers (GPTBot, ClaudeBot, etc.). **Structural finding**: this can never detect the WebMCP trigger specifically — a WebMCP-calling agent like Gemini in Chrome runs inside a user's own Chrome session, calling `document.modelContext` client-side. The server never sees a distinguishing UA. Not a bug to fix; the other two triggers exist precisely because this one is unobservable server-side. No detection code was added for this — would be speculative infrastructure for a structurally unobservable signal, the exact kind of premature engineering the plan warns against elsewhere.

Re-check by revisiting the two external sources next time this comes up, rather than rebuilding this research from scratch.

## Known gaps / risks as of now

1. ~~Nothing in this repo had been committed since the initial `create-next-app` commit~~ — **resolved 2026-08-29**, commit `65a1db2` (76 files, full site + Phase 0-2 knowledge layer work).
2. ~~0.4 Consistency sweep~~ — see resolved item below (superseded, this line was stale).
3. **0.5 Baseline citation check** — attempted 2026-08-29, blocked (Claude in Chrome not connected; sandboxed browser hit a login wall on the first live query, Perplexity). Rather than fabricate results, this was skipped. The 15 prompts are drafted and saved at `docs/citation-baseline-2026-08.md`. **Not actually time-sensitive right now**: the site launched only days ago, so there's no existing citation footprint to lose — training-data-based answers won't shift for months regardless of when this runs, and live-search-grounded answers have nothing to be "before" yet either. Revisit once the site has enough age/content that a real before/after would mean something. Still open, deliberately deferred.
4. ~~`Organization.sameAs` still missing GitHub/Crunchbase; `Person` node still missing `sameAs`/`alumniOf`~~ — **resolved 2026-08-30**. `Organization.sameAs` now includes `https://github.com/ahromlabs` (Crunchbase deliberately skipped — no profile exists, not fabricated). `Person` node now has `sameAs` (LinkedIn, GitHub) and `alumniOf` (Stevens Institute of Technology). Both `ponytail:` comments removed. Verified in the rendered JSON-LD after `npm run build`.
5. **0.4 Consistency sweep — resolved 2026-08-30.** Compared `Organization.description` against the live LinkedIn company page and GitHub org page. Findings: LinkedIn's "About us" text carries the same meaning but different wording than the site (user's call: leave as-is, not reconciled — not a blocker). GitHub org bio was empty; user set it by hand to match the site's description verbatim, confirmed live on `github.com/ahromlabs`. Noticed in passing, not acted on: LinkedIn's HQ field reads "Ahmedavad, GJ" (likely a typo for Ahmedabad); a second public repo `test` exists under the `ahromlabs` org alongside `tally-voucher-xml`, purpose unclear.
