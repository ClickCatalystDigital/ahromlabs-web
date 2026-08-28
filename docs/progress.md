# Knowledge Layer — Progress Log

Tracks what's been built against `docs/knowledge-layer-plan.md`, the decisions made along the way, and what's still open. Update this at the end of each phase.

## Phase tally: 7 phases total (0-6)

| Phase | Status | What it is |
|---|---|---|
| 0 — Foundation | **Partial** | JSON-LD entity graph, crawler-hit logging, robots verified. Two manual items still open (below). |
| 1 — Corpus scaffolding + first note | **Done** | `content/` stood up, `/systems` ported to `content/terms/`, first note written. |
| 2 — Fill the corpus | **Done** | 2 more notes, 5 patterns. |
| 3 — Publish | Not started | Wire `content/` into live routes + `/knowledge.json`. |
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

## Known gaps / risks as of now

1. **Nothing in this repo has been committed since the initial `create-next-app` commit** — not just this session's work, the entire site. Every file from Phase 0/1/2 (18 content files + `schema.ts` + `proxy.ts` + `layout.tsx` edits + both doc files) exists only in the working tree. Recommend committing before doing anything with wider blast radius (Phase 3 wires routes; a bad `git` operation before that has real loss potential).
2. **0.4 and 0.5 above** — both manual, both still open, 0.5 specifically time-sensitive.
3. Deferred, documented, low-risk: `Organization.sameAs` still missing GitHub/Crunchbase; `Person` node still missing `sameAs`/`alumniOf` (both marked with `ponytail:` comments in `schema.ts` for exactly where to add them).
