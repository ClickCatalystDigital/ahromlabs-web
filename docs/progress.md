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

## Ad-hoc research pass — 2026-08-31 (not a numbered phase)

Not part of the Phase 0-6 sequence above — a follow-up question ("are the four `SYSTEM.md`s hiding more publishable material, and does any of it match what buyers actually search for?") that turned into three linked research passes plus two shipped content changes. Recorded here so a future session doesn't re-run the same ground from scratch.

**Pass 1 — mined all 4 client repos for new candidates**, via 4 parallel background agents (one per repo: `ls_crm`, `ls-inventory`, `shanti-ops`, `savistar-ops`), each given the full existing-corpus list to avoid duplicates and a hard no-fabrication rule. Found ~22 verified candidates total (file:line cited), ranked into a top-7 tier by how hard each is to imitate:
1. `ls_crm` — bank-statement debit/credit direction inferred from running-balance delta, not keywords, with 3 hand-coded overdraft-account exceptions (`routes/invoices.js:188`).
2. `ls-inventory` — compare-and-swap reel transfer, no row locks, live-verified via a forced concurrent-transfer race (`utils/inventory.js:87`).
3. `shanti-ops` — QC hold-point gate derived from the job's process route instead of a separate inspection-plan entity; Production cannot self-clear it server-side.
4. `shanti-ops` — geometry-derived remnant weight (`L×W×T×density`), live-verified conservation test: 157.00 kg → 127.17 kg used + 15.70 kg remnant + 14.13 kg scrap.
5. `savistar-ops` — PO status that never reverts once complete; a later vendor return only changes a derived display badge (`lib/po.js:5`).
6. `savistar-ops` — app-level cascade delete (`CASCADE_MAP`, `lib/db.js:369`) because libsql leaves the FK pragma off, so schema-declared `ON DELETE CASCADE` never actually fires.
7. `shanti-ops` — Laplace-smoothed match-confidence threshold (`lib/tc-match.js:34`, 0.75 / min 3 approvals) that promotes a suggestion but never auto-applies it on a statutory document, vs. an analogous matcher elsewhere in the same app (`lib/remnant-match.js`) that does auto-apply at the same math.
Full ranked list + "needs founder confirmation" items (OpenRouter quota string, QR-batch throughput, current reel count) live only in that session's transcript, not re-copied here — re-run the same 4-agent pass if this list is needed again in full.

**Pass 2 — checked market demand for those 7**, not just phrasing. Distinguished "how do people talk about this" from "do people actually want this specific thing." Via `agent-reach` (Exa-backed search over Reddit/CAclubindia/LinkedIn/Quora): only **#7 (confidence-never-auto-applies) and #5 (PO status stickiness)** have real organic demand evidence matching the specific mechanism — #7 almost verbatim matches a CA's published stance ("AI processes & flags — CA judges & authorises. Always," caclubindia.com). #1/#2/#4 have real but only *adjacent* complaints (bank-import direction errors, concurrent-count lockouts, weight-based stock mismatches) — not the precise mechanism. #3 and #6 have no organic buyer voice at all — vendor content only for #3, generic developer discourse (not an SME-buyer concern) for #6. Conclusion reached: this doesn't disqualify #3/#6 — the site's own `patterns/` vs `notes/` split means only buyer-facing notes need demand alignment; patterns exist for cross-project/agent reuse regardless of search volume.

**Pass 3 — checked a third-party competitive analysis** (an external Gemini research doc on Indian custom-software-vendor marketing, supplied by the user). Verdict: mostly doesn't apply and would hurt positioning if copied — badge walls, client-logo strips, tiered-CTA funnels, and price-guide content blogging are built for firms with actual enterprise certs/scale and directly contradict `docs/knowledge-layer-plan.md`'s existing "explicitly not doing" list. Two things did apply: (a) the analysis's manufacturing-vertical pain-point language ("shop-floor silos," "manual quality checks") independently corroborates the `shanti-ops` candidates above; (b) it surfaced one real, unrelated gap — the site has no page addressing engagement scope/pricing/risk-to-the-buyer ("low-risk onboarding" step), separate from the knowledge-layer track, not acted on yet.

**Shipped from this pass:**
- `content/notes/two-companies-one-book.md` — reworded to match validated market language: "sister companies" → also names it a "sister concern arrangement" (the term actually used on CAclubindia/LinkedIn), and "registration details" on the cross-entity invoice PDF now names the GSTIN explicitly. No new facts added, just precision on existing ones.
- `content/notes/same-confidence-different-autonomy.md` — new note for candidate #7 above (the highest-demand, best-evidenced item). Anonymized per the same rule as the other `shanti-ops`-sourced entries: no `systems:` field, no client name, no boiler/pressure-vessel specifics — described generically as "a manufacturing operation." Cross-links to the existing `human-confirmed-extraction` and `unconfirmed-inferences-stay-read-only` patterns. `content:build` + `next build` both verified clean (29 entries: 11 terms, 4 notes, 14 patterns; new note's page and OG image both prerender static).

**Queued, not yet written** (by priority): candidate #5 as a note next (moderate demand, evidence indirect — NetSuite-context practitioner discourse, not Tally-context); candidates #1, #2, #4 as `patterns/` (real, verified, no demand bar to clear — that's not what patterns are for); candidates #3, #6 last (zero buyer-search relevance, pure engineering-credibility/agent-reuse value, still legitimate but lowest urgency). The "needs founder confirmation" items from Pass 1 must be resolved before any of #1/#2 get written, since both lean on numbers that weren't independently verifiable from the repos alone.

## Discoverability / trust pass — 2026-09-05 (not a numbered phase)

Triggered by a production incident, then widened. Recorded here because most of the work was
verification, and the verification is the part worth not repeating.

**The incident first.** `ahromlabs.com` was returning **Error 1102 (Worker exceeded resource
limits)** — a spike of 38 errors concentrated on `GET /patterns`, with a companion Workers log
warning that `waitUntil()` tasks were cancelled after invocation end. Two AI diagnoses were
offered and both were wrong in the same way: they prescribed `export const dynamic =
'force-static'` and `output: 'export'`. `force-static` was a no-op (the prerender manifest
already showed `/patterns` as `"compute": "static"`), and `output: 'export'` would have broken
the build outright — it is mutually exclusive with the `opennextjs-cloudflare build/deploy`
pipeline this repo uses.

The actual mechanism, traced through the build output: **no page request in this deployment
avoids booting the full Next.js server inside the Worker.** `.open-next/worker.js` has no
static-asset short-circuit for HTML — every non-image request goes through `middlewareHandler`
then `server-functions/default/handler.mjs`. `.open-next/assets/` contains zero page HTML (not
even the homepage); prerendered pages live as `.cache` files only the Worker's cache reader can
reach. With no R2/KV/D1 incremental-cache binding, those reads miss, so a "static" page is
re-rendered per request. On the Workers **Free** plan (10ms CPU/request) that trips 1102 under
any real traffic; the `waitUntil()` warning was the isolate being killed mid-request, not a
separate bug. **Fix: upgraded to Workers Paid** (10ms → 30s CPU). Errors stopped. No code change
was involved, and none would have helped. An R2-backed incremental cache remains optional — it
would cut CPU per request, not prevent a crash that no longer happens.

**Then: an external AI audit of the site was handed over.** Verified claim-by-claim against the
repo before anything was acted on. **Roughly half of it was false** — it was produced by a tool
that cannot fetch `/robots.txt`, `/sitemap.xml`, or `/llms.txt` and that strips `<script>` tags,
so it reported existing infrastructure as missing: "no structured data" (the `orgGraph` has been
site-wide for weeks), "no author attribution" (the `Person` node names the founder on every
page), "notes pages ship no description" (field-identical to patterns), "no robots.txt /
sitemap / llms.txt" (all three existed), "no LinkedIn/GitHub" (both in `sameAs`). It also
recommended several things `docs/knowledge-layer-plan.md:190-196` had already explicitly
rejected — `llms-full.txt`, markdown mirrors, a public MCP server, `FAQPage` schema.

The lesson worth keeping: **an audit that cannot see `<script>` tags cannot assess a site whose
structured data lives in one.** Verify before acting; the cost of acting on it unverified would
have been rebuilding what already ships and breaking what already works.

**Shipped** (commit `381ef33`, deployed and verified live): `jsonLd()` escaper · OG cards for
`/notes` + `/patterns` (the only two content pages lacking one) · visible `<time>` dates on 18
detail pages and both index cards · `article:published_time`/`modified_time`/`author` ·
`TechArticle` JSON-LD on all 18 detail pages with `@id` refs into `orgGraph` · `DefinedTermSet`
on `/systems` · `Organization` completed with `logo`/`email`/`address`/`areaServed` · `llms.txt`
converted from a hand-maintained static file to a generated route · `/knowledge.json` made
discoverable · 8 first-occurrence glossary links into the previously-unlinked `/systems#`
anchors · footer `mailto` + location · founder named in visible `/about` copy.

A second round after a gap audit: honest sitemap `lastModified` · `og:locale` · reverse
pattern→note links ("Seen in practice").

**Decisions taken:** publish `hello@ahromlabs.com` (verified live — receives via Cloudflare Email
Routing, SPF-authorized to send); city + region only, no street address (Ahmedabad, Gujarat);
name the founder visibly on `/about` and byline all 18 content pages.

**Two verification techniques worth reusing:**
1. **Timezone pin test.** Content dates are date-only strings, parsed as UTC midnight. Built
   under `TZ=UTC` and `TZ=Pacific/Honolulu` and diffed the rendered `<time>` output — without
   `timeZone: "UTC"` in the formatter, a build machine west of Greenwich bakes the *previous
   day* into static HTML. Silent, and invisible on any machine east of UTC.
2. **Drift test for generated schema.** Corrupted one term's `domain:` frontmatter, rebuilt, and
   confirmed `/systems` rendered 10 terms *and* the `DefinedTermSet` emitted 10 — proving the
   schema cannot claim a term the page doesn't show. This works only because `termSetGraph` is
   fed the rendered array rather than re-querying `getContent("term")`.

**Deliberately not done, with reasoning:** `Review` schema on the testimonial (first-party
self-review, ineligible for rich results, five-file optional-field pipeline for one quote —
revisit at testimonial #2); RSS (`/knowledge.json` already is the machine feed, and this is a
corpus, not a feed); `BreadcrumbList`; per-crawler `robots.txt` allow rules (a no-op against the
existing `userAgent: "*", allow: "/"`).

**Fixed in passing, unrelated:** `npm run lint` had been crashing with a V8 out-of-memory —
eslint had no ignore for `.open-next/**` or `.wrangler/**` and was walking ~69MB of bundled
output. Two lines in `eslint.config.mjs`.

**Third round — edge cases + typography (same day).** Glossary term pages built but *gated* on
`termHasPage()`: all 11 terms have empty bodies, so zero pages ship rather than 11 thin
single-sentence pages — the route, schema `url`, sitemap entry, `llms.txt` line and `/systems`
link all appear together the moment a body is written. `DefinedTerm` nodes gained dates;
`llms.txt` gained a `## Vocabulary` section. `ProfessionalService` and `Person` completed
(`address`/`areaServed`/`email`/`image`/`url`), with the address/email constants defined once so
the three nodes can't drift. `SystemDiagram` no longer serializes as a run-on string —
whitespace text nodes as siblings of `<text>`, which SVG does not render, verified by comparing
`getBBox()` on all 11 labels before and after with fonts loaded (**byte-identical**), with
`aria-hidden`/`sr-only`/`figcaption` untouched.

**Typography changed deliberately:** Instrument Serif for hero headlines and major section
headings (27 elements), Geist Sans for body/nav/buttons/labels/cards/UI, Geist Mono unchanged
for technical text. Replaced Pilcrow Rounded. Instrument Serif has a single weight, so the new
`.display` class sets `font-weight: 400` explicitly and drops `tracking-tight` — a
`font-semibold` utility on it would make the browser synthesise a bold. **Open consequence:** OG
social cards still render in Pilcrow, which `src/lib/og-assets.ts` embeds as base64.

**Client naming: closed permanently.** Permission was confirmed for every client — LS
Technologies, Shanti Boilers, Savistar, Saag. Recorded in `SYSTEM.md`,
`docs/knowledge-layer-plan.md` (Phase 2.4), `docs/plans-to-upgrade.md` and here so no future
audit re-raises it.

**Environment note:** the machine hit 100% disk (302Mi free of 228Gi) mid-session and builds
started failing with `ENOSPC`. Cleared `~/.npm` (3.2G, regenerable) to unblock. Not a repo
problem — the disk needs attention.

Full detail, including what was rejected and what remains open: `docs/plans-to-upgrade.md`.

## Known gaps / risks as of now

1. ~~Nothing in this repo had been committed since the initial `create-next-app` commit~~ — **resolved 2026-08-29**, commit `65a1db2` (76 files, full site + Phase 0-2 knowledge layer work).
2. ~~0.4 Consistency sweep~~ — see resolved item below (superseded, this line was stale).
3. **0.5 Baseline citation check** — attempted 2026-08-29, blocked (Claude in Chrome not connected; sandboxed browser hit a login wall on the first live query, Perplexity). Rather than fabricate results, this was skipped. The 15 prompts are drafted and saved at `docs/citation-baseline-2026-08.md`. **Not actually time-sensitive right now**: the site launched only days ago, so there's no existing citation footprint to lose — training-data-based answers won't shift for months regardless of when this runs, and live-search-grounded answers have nothing to be "before" yet either. Revisit once the site has enough age/content that a real before/after would mean something. Still open, deliberately deferred.
4. ~~`Organization.sameAs` still missing GitHub/Crunchbase; `Person` node still missing `sameAs`/`alumniOf`~~ — **resolved 2026-08-30**. `Organization.sameAs` now includes `https://github.com/ahromlabs` (Crunchbase deliberately skipped — no profile exists, not fabricated). `Person` node now has `sameAs` (LinkedIn, GitHub) and `alumniOf` (Stevens Institute of Technology). Both `ponytail:` comments removed. Verified in the rendered JSON-LD after `npm run build`.
5. **0.4 Consistency sweep — resolved 2026-08-30.** Compared `Organization.description` against the live LinkedIn company page and GitHub org page. Findings: LinkedIn's "About us" text carries the same meaning but different wording than the site (user's call: leave as-is, not reconciled — not a blocker). GitHub org bio was empty; user set it by hand to match the site's description verbatim, confirmed live on `github.com/ahromlabs`. Noticed in passing, not acted on: LinkedIn's HQ field reads "Ahmedavad, GJ" (likely a typo for Ahmedabad); a second public repo `test` exists under the `ahromlabs` org alongside `tally-voucher-xml`, purpose unclear.
6. **`systems:` frontmatter is dead data, and already public.** 14 entries carry it
   (`ls-crm`, `savistar-ops`, `pcb-inventory`); nothing in `src/` reads it, but
   `/knowledge.json` serializes whole entries, so those internal repo identifiers are live on
   the public endpoint. Decide deliberately: render it, strip it from the JSON, or leave it.
   It is currently public by accident rather than by choice.
7. ~~`LS Technologies` named without a record of permission~~ — **RESOLVED 2026-09-05, and
   permanently closed.** Permission was in fact obtained; it had simply never been logged.

   > **Client naming permission: RESOLVED, and settled for all clients.** The founder has
   > obtained naming permission from every client whose work appears in this corpus — LS
   > Technologies, Shanti Boilers, Savistar, and Saag. Named attribution is authorized. This is
   > not an open question, and it is not to be re-raised as a risk in any future audit or
   > review pass. If a new client's work enters the corpus, get permission for that client and
   > add them to this list; the existing four are settled.

   The 2026-09-05 gap audit raised this because the permission was real but unrecorded — the
   record now exists so no future pass repeats the flag.
8. **Glossary terms are second-class.** All 11 carry `published`/`updated` that `/systems`
   discards, there are no per-term pages, and the `DefinedTerm` nodes carry no dates. Fine as
   long as the glossary stays a single reference page; revisit if terms need to be citable
   individually.
9. **LinkedIn HQ field still reads "Ahmedavad, GJ"** (typo). The site's schema now says
   Ahmedabad — cross-source corroboration is the entire point of the `sameAs` link.
10. **`foundingDate` omitted** from `Organization` — never established. Year-only is valid.
11. **Google Business Profile** — never considered in any prior pass. Now viable since a
    city-level address exists; would be a third corroborating `sameAs` node.
