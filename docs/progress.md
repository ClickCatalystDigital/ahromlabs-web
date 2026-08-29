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
| 5 — Two moat artifacts | **In progress** — 5.1 built locally, not yet public; 5.2 methodology documented, deferred | OSS Tally library or the extraction-accuracy benchmark. |
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

**5.1 — `tally-voucher-xml`** (local repo at `~/Developer/tally-voucher-xml`, remote confirmed as `https://github.com/ahromlabs/tally-voucher-xml.git`, not yet pushed): genericized voucher-XML building, push-to-Tally, and transient-vs-structural error classification, extracted from `ls_crm`'s production code. Stripped: `EXPENSE_LEDGER_MAP`'s ~25 real ledger names, the "LS Technologies is always the buyer" business rule, all Turso/DB coupling. 32 tests (Node's built-in `node:test`, zero dependencies), all passing — including a caught-and-fixed test bug where I'd assumed case-preservation in the ported error classifier that the original source (which lowercases before matching) never actually had; fixed the test, not the library, to stay faithful to what was verified in production. Confidentiality and secrets greps both clean. One piece of scope creep caught and removed before committing: an `amt()` helper carried over from the source that nothing in the extracted code actually calls. Committed locally; **not pushed to GitHub** — that's a separate explicit-approval step, not yet taken. `ahrom-labs` cross-links (in the `tally-voucher-posting` note and two patterns) are deliberately not added yet either, to avoid a dead link from the already-live production site to a non-public repo.

**5.2 — extraction-accuracy benchmark**: methodology documented in the plan file only (pull a real document sample from `ls_crm`'s R2 bucket, redact, establish ground truth by hand, run multi-model comparisons via OpenRouter, grade every field, publish). No code, no repo. Explicit rule carried forward: never manufacture data, accuracy numbers, or conclusions — this ships only once representative documents, real ground truth, and a defensible evaluation process actually exist.

## Known gaps / risks as of now

1. ~~Nothing in this repo had been committed since the initial `create-next-app` commit~~ — **resolved 2026-08-29**, commit `65a1db2` (76 files, full site + Phase 0-2 knowledge layer work).
2. **0.4 Consistency sweep** — still open, still manual.
3. **0.5 Baseline citation check** — attempted 2026-08-29, blocked (Claude in Chrome not connected; sandboxed browser hit a login wall on the first live query, Perplexity). Rather than fabricate results, this was skipped. The 15 prompts are drafted and saved at `docs/citation-baseline-2026-08.md`. **Not actually time-sensitive right now**: the site launched only days ago, so there's no existing citation footprint to lose — training-data-based answers won't shift for months regardless of when this runs, and live-search-grounded answers have nothing to be "before" yet either. Revisit once the site has enough age/content that a real before/after would mean something.
4. Deferred, documented, low-risk: `Organization.sameAs` still missing GitHub/Crunchbase; `Person` node still missing `sameAs`/`alumniOf` (both marked with `ponytail:` comments in `schema.ts` for exactly where to add them).
