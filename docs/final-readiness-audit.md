# Final readiness audit (7 Nov 2026)

What was finished in code for ahromlabs.com and Datum AI's construction look-ups, what was checked and how, and what
still needs a person. Earlier content batches (ASME 31 guides, construction 19, US manufacturing 15 and sales tax 8,
India ERP/BOQ/IBR/AI, glossary) were already live and were not redone.

## 1. Completed tasks

| # | Task | Result |
|---|---|---|
| 1 | Related links on industry, service and glossary pages | Done. All 48 glossary pages and each industry's India and US version have a "Related" / "Guides for this business" list; all 16 services have a guides list. Links to one market's pages are hidden from the other market's visitors, and the whole list when none would show. `scripts/related.check.ts` (in `npm run content:build`) fails on a path that isn't a page or a page left without links. Checked at 375 px: no horizontal scroll, India and US lists correct. |
| 2 | ASME verification ledger | Done: `docs/asme-verification-ledger.md`, 40 claims from the 19 Code-check items. 1 VERIFIED_OFFICIAL, 3 CORRECTED, 18 PARTIALLY_VERIFIED, 17 LICENSED_SOURCE_REVIEW_REQUIRED, 1 UNRESOLVED. Evidence is ASME's published Code interpretations (free, official) and ASME's/National Board's own pages; no Code copies, no third-party sites. Corrections: GMAW-S may be qualified by UT (IX-16-28) and can't be renewed by radiography (IX-04-13) on welder-qualification and section-v; the UG-99 bolting exclusion now carries its 90%-of-yield condition (VIII-1-16-71), and the 30 °F hydro-test margin is a recommendation (VIII-1-89-211). Every row still says a competent reviewer is required. |
| 3 | Lien-waiver states | Partly done. Massachusetts (G.L. c.254 §32) and Michigan (MCL 570.1115) read from the legislatures' own sites on 7 Nov, saved as source texts, added to `/construction/lien-waivers` (table, answer, description) and the glossary term, with 5 checked quotes (construction quotes 265/265). Georgia, Mississippi, Missouri, Nevada and Utah: blocked (below). Verification table and open questions in `docs/batch-plans/construction.md` ("Lien-waiver states"). Source verification only; no legal approval claimed; forms and workflows flagged for a lawyer. |
| 4 | Datum AI change orders and retainage | Done: built, tested locally, deployed to the US demo, and checked live with the real model on 7 Nov. "Which change orders are still pending?" answered from the change_orders look-up ("$6,504 approved; none pending.", the Halvorsen Tower change order); "What is a construction change directive?" answered from the change-orders guide with "Read the full guide" linking https://ahromlabs.com/construction/change-orders. `construction.change-orders` is now `live` on the site. |
| 5 | US demo videos | Done for the construction demo: two captioned tours recorded with `scripts/demo/record-us-tours.py` from a local run of the US build on its seed data: `us-construction-demo-pay-application-retainage-lien-waivers.mp4` (27 s, 4 captions) and `us-construction-demo-change-orders.mp4` (18 s, 2 captions), each with a .vtt. Not recorded on the public demos, because their entry form saves a lead, emails it to Pujan and fires a GA key event. Not done: the boiler US demo (shanti-ops-us), which needs its own tour list in that repo; the same script pattern applies. Tours leave out Datum AI (no model key locally) and two screens with US-build bugs (section 6). |
| 6 | Testimonials | Searched both repos: the one approved quote (Savistar & Saag owners) is already live on /work and the two-companies note. No other quote with evidence of permission exists; nothing published. |
| 7 | Checks and release | Content build, type check, ESLint, production build with prerender, deploy and live checks: see sections 4 and 5. |

## 2. Files changed

ahrom-labs (commits 9ff9fd9, b82cc6e, abf2435, plus this audit):
- `src/lib/related.ts` (map for glossary and industry pages, `relatedFor`), `src/components/RelatedNav.tsx` (new),
  `src/components/GuidePage.tsx`, `src/app/systems/[slug]/page.tsx`, `src/app/industries/[slug]/page.tsx`,
  `src/app/services/[slug]/page.tsx`, `src/lib/services.ts` (guides per service), `scripts/related.check.ts` (new),
  `package.json` (check added to `content:build`)
- `content/asme/welder-qualification.md`, `content/asme/section-v.md`, `content/asme/hydrostatic-test.md`
- `content/construction/lien-waivers.md`, `content/terms/lien-waiver.md`, `scripts/check-construction-quotes.mjs`
- `src/lib/ai-assistant.ts` (change-orders status), `scripts/check-chatbot.mjs` (two sites that refuse scripts)
- `docs/asme-verification-ledger.md` (new), `docs/batch-plans/asme-code-check.md`, `docs/batch-plans/construction.md`,
  `docs/final-readiness-audit.md` (new)

structonova-ops (commits f68fb9f, 03055db; not pushed):
- `lib/assistantTools.js` (change_orders look-up, retainage to date and held), `lib/assistantChat.js` (rules answers,
  fallback routing), `lib/assistantKnowledge.js` (new), `lib/site-guides.json` (new), `scripts/sync-site-guides.mjs`
  (new), `components/assistant/assistant-widget.jsx` (guide links), `package.json` (sync before each cf:build),
  `scripts/check-assistant-tools.mjs` (regression checks), `scripts/demo/record-us-tours.py` (new)

Outside the repos: `FOLDER SAMPLE - FOR APP/Construction/sources/` (Massachusetts and Michigan statute texts) and
`FOLDER SAMPLE - FOR APP/Construction/demo-videos/` (the two tours, .mp4 and .vtt).

## 3. Sources

- ASME Interpretations Database, https://cstools.asme.org/Interpretation/SearchInterpretation.cfm (31 searches; each
  interpretation used is linked in the ledger by tracking number).
- ASME product pages for Section VIII Div. 1 and B31.1, and the Required Code Books page (saved 5–6 Nov, already in
  `scripts/check-asme-quotes.mjs`).
- Massachusetts G.L. c.254 §32, https://malegislature.gov/Laws/GeneralLaws/PartIII/TitleIV/Chapter254/Section32 (7 Nov).
- Michigan MCL 570.1115, https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-570-1115 (7 Nov).
- ahromlabs.com construction guides (for Datum's rules answers, copied by `scripts/sync-site-guides.mjs`).

## 4. Tests run, with real results

| Check | Result |
|---|---|
| `npm run content:build` (ahrom-labs) | Pass: 203 entries; quotes IBR, BOQ, ASME 197/197, manufacturing 73/73, sales tax 135/135, construction 265/265; related.check "57 pages and 16 services resolve" |
| `npx tsc --noEmit` | Pass (0 errors), after `npx next typegen` regenerated the route types |
| `npx eslint` | 0 errors, 3 warnings, all in the untracked `design/hairline/works.js` (not part of the site) |
| Browser, 375 px (dev server) | `/systems/retainage`, `/services/material-traceability`, `/industries/construction-company`, `/us/industries/construction-company`: lists render, page width 375 = scroll width, India list on the India page and US list on the US page |
| `scripts/check-assistant-tools.mjs`, India build (structonova-ops-local.db) | Pass: 66 look-up runs; turn routing and guide answers OK |
| Same, US build (us-local.db, MARKET=NA) | Pass: 66 runs; change orders "$6,504 approved; none pending"; retainage held $24,840 matches the pay applications; turn checks OK |
| Same, US build with CO_FIXTURES=1 on a copy | Pass: draft, sent, declined and superseded change orders added; "$6,504 approved; $4,601 pending on 2 change orders"; optional lines and the superseded revision not counted |
| Datum AI in the browser (local US build, model endpoint closed so the keyword router answers) | "pending change orders" → Change orders table; "what is a construction change directive" → answer from the change-orders guide with "Read the full guide" linking https://ahromlabs.com/construction/change-orders |
| `npm run ask -- --library` (structonova-ops, added after the release) | The 38 construction questions from the site's question library through the real pipeline, model offline: India 38/38, US 38/38 as the library promises, $0. It first found 6–7 misses, all in the keyword router used when the model is down (a records question answered from a TDS guide section; missing look-up keywords), fixed in structonova-ops 3 commits after f68fb9f; a site engineer asking about margin is refused. `--model` runs the same through the real model for a fraction of a cent per question |
| structonova-ops lint | Not run: the repo has no ESLint config (`next lint` asks to create one) |
| Production build and prerender (ahrom-labs) | See section 5 |

A check bug found and fixed on the way: a zsh loop meant to run the three configurations ran the India one three
times (zsh doesn't split `$e`); each configuration was re-run separately and the results above are those runs.

## 5. Deploy status and URLs

- **US construction demo**: deployed with `npm run cf:deploy:us` (demo databases migrated, no schema change;
  Worker version 3968a05d-9c21-479d-97c8-4158b1e7c0e0). https://construction-erp-us.ahromlabs.com/demo answers 200;
  the new widget code (guide links) is in the served bundle. The first request after deploy took 68 s, later ones
  1–2 s.
- **India construction demo**: not redeployed. It has the same assistant code changes (rules answers from the India
  guides) waiting; deploy with `npm run cf:deploy` when wanted.
- **ahromlabs.com**: deployed from the clean worktree at commit abf2435 with `npm run deploy` (content build, OpenNext
  production build with every page prerendered, so an unknown related path would have failed it; Cloudflare Worker
  version 234f3271-ecaf-4751-bba8-53eda0f132d9). Confirmed live with curl on 7 Nov: `/`, `/systems/retainage`,
  `/industries/construction-company`, `/services/custom-erp-crm`, `/asme/hydrostatic-test` and
  `/construction/lien-waivers` answer 200; the Related nav is on `/systems/retainage`; the service guides list on
  `/services/material-traceability` links `/asme/mtr`, `/systems/heat-number` and `/ibr/record-keeping`;
  "Guides for this business" is on `/industries/construction-company` and `/us/industries/construction-company`
  (with `/construction/retainage`); `/construction/lien-waivers` names Massachusetts and Michigan; the ASME pages
  cite IX-16-28 and VIII-1-16-71. In the browser pane (an India visitor) `/systems/lien-waiver` shows only "Pay
  application" under Related at 375 px and on desktop, because the two US-law guides are hidden from India by design.
  Post-deploy checks: IndexNow sent; AI Search sync job created; chatbot check 61/61 found the right passage. The
  source-link check reported the two new statute links DEAD ("no answer"): this machine can't connect to
  malegislature.gov or legislature.mi.gov at all. Both pages were read on 7 Nov through a cloud browser and are real,
  so they joined the checker's list of sites that refuse scripts (`scripts/check-chatbot.mjs`).
- **ahromlabs.com, second deploy (status flip)**: Worker version 390ecc0f-9702-4cc4-8cab-2a284253dc8b, `npm run deploy` exit 0: chatbot check 61/61, source links 172 ok, 20 skipped (sites that refuse scripts), none dead. Live: /ai-assistant/questions shows "Which change orders are still pending?" as "Answered today". Deployed as abf2435 plus the flip commit only
  (cherry-picked in the worktree), so another session's unfinished interiors guides, committed on main after
  abf2435, were not shipped.

## 6. Remaining risks

- Datum's live check covered two questions. Pujan approved submitting the demo form once; it wasn't needed, because
  the browser pane already carried Pujan's owner pass, so the two questions were asked under it and are logged in the
  golden demo database's question log (two rows; no business data changed). The model's routing across more phrasings
  is covered by `scripts/assistant-eval.mjs`, which needs a running server and login.
- ASME: 17 claims rest on the paid 2025 Code alone; the pages say they aren't yet reviewed by an Authorized
  Inspector, and that must stay until a reviewer signs off.
- Lien waivers: five commonly listed statutory-form states are not on the page; a reader in Georgia, Mississippi,
  Missouri, Nevada or Utah gets the generic advice ("check the statute in your state").
- US construction demo rough edges seen while recording (not fixed here, listed as follow-ups): the director dashboard
  shows money in lakhs ("$7.8L", `app/dashboard/page.js:16`); estimate pages show dd/mm dates and "lines need
  attention" / "stages add up to 0%" warnings on accepted change orders. The videos avoid both screens.
- The demo entry gate (`/api/demo/enter`) only checks that a `demo_lead` cookie exists, not that it is a real lead;
  AI questions do check the token, so the exposure is read access to sample data.
- Disk: about 1–4 GB free during this work (swap moves it); builds were run after clearing regenerable build output.

## 7. Human inputs still needed

1. **Done 7 Nov:** Datum change orders checked live and flipped to live. Left: deploy the India construction demo
   (`npm run cf:deploy` in structonova-ops) when you want its guide answers live too, and push structonova-ops.
2. **Five lien-waiver states**: open each official page in a normal browser and save the section text into
   `FOLDER SAMPLE - FOR APP/Construction/sources`: Georgia O.C.G.A. 44-14-366 (current version, after 2020 HB 153),
   Mississippi Code 85-7-433, Missouri RSMo ch. 429 (only if it has a waiver form), Nevada NRS 108.2457, Utah Code
   38-1a-802. Claude then adds rows, quote checks and the page change.
3. **A lawyer** for any lien-waiver form or waiver-collection workflow before it is built into a client system
   (Michigan's residential verification rule in 570.1115(7) especially).
4. **ASME reviewer** with the 2025 books for the 17 LICENSED_SOURCE_REVIEW_REQUIRED rows and the QW-304 and
   Appendix 10 points (`docs/asme-verification-ledger.md`); then the reviewer's name on `/asme`.
5. **Testimonials**: written permission for any new quote (Pujan collects them).
6. **Videos**: decide where the two tours go (site, YouTube, LinkedIn). They are in
   `FOLDER SAMPLE - FOR APP/Construction/demo-videos/`.

## 8. Release recommendation

Released. Everything in this audit that is live was checked live, and nothing shipped depends on an open item: the
ASME pages keep their not-yet-reviewed notice, the lien-waiver page names only states read from their own statutes,
and Datum's change orders were flipped to live only after a live answer. Next, in order: the US demo's lakh and date
fixes before the tours are published; the five lien-waiver states once their texts are saved; the ASME reviewer.

Note for the next deploy: `npm run content:build` on the main checkout currently fails on another session's
untracked `content/interiors/1099s-for-installers-and-workrooms.md` (description 163 characters, limit 160). That
work isn't committed or live; its session should fix it before deploying.
