# ASME hub: plan

Status: **deferred** (1 Nov 2026, Pujan): revisit once client work pays for the Code, a reviewer and a US fabricator decision (section 8). Proposal written 1 Nov 2026. A reference hub at **ahromlabs.com/asme** on the ASME Boiler and Pressure Vessel Code
(BPVC), built like `/ibr`, `/boq` and `/erp`, for two audiences at the same URLs (markets: `src/lib/markets.ts`):

- **North America**: fabricators and shops holding (or getting) an ASME certificate, plant engineers, buyers.
- **India**: fabricators who build to ASME for export or alongside IBR, and buyers comparing the two.

## 1. Why this hub can win

The top results for ASME searches belong to ASME itself, the National Board and engineering-reference sites. We
won't beat them on "what is ASME". We can win on three things they don't do:

1. **India ↔ US bridge.** Nobody explains ASME and IBR 2026 side by side, with the Gazette quoted. IBR 2026 itself
   names ASME several times (see section 5), and our `/ibr` hub already ranks on page one for IBR form searches.
2. **The records side.** Shops search for WPS/PQR, welder continuity, MTRs and data reports because the paperwork is
   the pain. That is exactly what we build (material traceability, document extraction, the boiler system's
   statutory folder). Every page has a natural next step into a service or demo.
3. **Tools that show their working.** Calculators and checkers that cite the paragraph for each step, which AI
   answers and Google both lift.

## 2. Rules (different from the IBR hub)

- **The Code is copyrighted and paid; the Gazette is not.** We cite paragraph numbers (UG-27, QW-322) and explain in
  our own words. No copied paragraphs, no reproduced tables (stress values, P-number lists in full, charts). Short
  quotes only where the wording matters. Calculators ask the user for the allowable stress instead of shipping it.
- **Every page names the edition** (2025 Edition; confirm publication and mandatory dates before writing) and has a
  "check against your copy of the Code and your Authorized Inspector" note, like the IBR not-legal-advice note.
- **A named reviewer** with ASME shop experience (an AI, or a QA/QC head) reads each page before it goes live. Their
  name and role on the page is the trust signal these engineering pages need.
- **IBR facts keep the existing rule**: quoted word for word from the Gazette and checked by `check-ibr-quotes.mjs`.
- **AEO format**, same as the other hubs: answer-first lead (40–60 words), question-shaped headings in the words
  people search, a table wherever there's a comparison, `TechArticle` + `BreadcrumbList` JSON-LD, glossary terms as
  `DefinedTerm`, markdown twins, `llms.txt` and `knowledge.json`. No FAQPage markup (retired; see `engagement.ts`).

## 3. The pages

Priority is our estimate of search demand × fit with what we sell; check volumes in Keyword Planner or Search
Console before fixing the order. Market: **both** unless marked.

### Hub

| URL | Title | Answers |
|---|---|---|
| `/asme` | ASME Boiler and Pressure Vessel Code: a plain guide | What the BPVC is, the sections, stamps, who inspects, links to everything below |

### A. The Code and its sections

| URL | Page | Searches it targets | Phase |
|---|---|---|---|
| `/asme/bpvc-sections` | ASME BPVC sections I to XIII explained | "asme bpvc sections", "asme section list" | 1 |
| `/asme/section-viii` | Section VIII: Division 1 vs 2 vs 3 | "asme section viii division 1 vs 2", "asme sec 8" | 1 |
| `/asme/section-ix` | Section IX: welding and brazing qualifications | "asme section ix", "asme sec 9" | 1 |
| `/asme/section-i-vs-iv` | Section I (power boilers) vs Section IV (heating boilers) | "section i vs section iv" | 2 |
| `/asme/section-ii` | Section II materials: Parts A to D, SA vs A specifications | "sa-516 vs a516", "asme section ii part d" | 2 |
| `/asme/editions` | ASME 2025 Edition: what changed and when it applies | "asme 2025 edition changes", "code cases" | 2 |
| `/asme/section-v` | Section V: nondestructive examination | "asme section v" | 3 |
| `/asme/section-xiii` | Section XIII: relief valves and overpressure protection | "asme section xiii", "ug-125" | 3 |

### B. Certification and paperwork (highest buying intent)

| URL | Page | Searches it targets | Phase |
|---|---|---|---|
| `/asme/stamps` | ASME certification marks: U, U2, S, H, PP, UV, R and the NB mark | "asme stamps list", "u stamp vs u2" | 1 |
| `/asme/u-stamp` | How to get the ASME U stamp: steps, joint review, cost, timeline (US and India) | "how to get asme u stamp", "asme certification cost india" | 1 |
| `/asme/data-reports` | Manufacturer's Data Reports: U-1, U-1A, P-2, H-2, who signs, what goes in the package | "asme u-1a form", "manufacturer's data report" | 1 |
| `/asme/quality-control-manual` | The ASME quality control manual: what it must cover | "asme quality control manual" | 2 |
| `/asme/authorized-inspector` | Authorized Inspector and AIA: who they are, what they sign | "asme authorized inspector" | 2 |
| `/asme/national-board-registration` | National Board registration, the NB mark and the R stamp (NBIC) | "national board registration", "r stamp" | 3 |

### C. Welding (Section IX): the most searched part

| URL | Page | Searches it targets | Phase |
|---|---|---|---|
| `/asme/wps-pqr-wpq` | WPS vs PQR vs WPQ: what each proves and how they link | "wps vs pqr", "what is pqr in welding" | 1 |
| `/asme/welder-continuity` | Welder continuity (QW-322): the six-month rule and how to log it, **with a free log template and checker** | "welder continuity asme", "qw-322" | 1 |
| `/asme/essential-variables` | Essential, supplementary essential and nonessential variables | "essential variables welding asme" | 2 |
| `/asme/welder-qualification` | Welder qualification: test positions 1G to 6G and what each qualifies | "6g welding position", "welder qualification asme" | 2 |
| `/asme/p-numbers` | P-numbers, F-numbers and A-numbers: how grouping works (common materials only) | "p number asme", "f number welding" | 2 |

### D. Design basics, with calculators

| URL | Page | Searches it targets | Phase |
|---|---|---|---|
| `/asme/hydrostatic-test` | Hydrostatic and pneumatic test pressure (UG-99, UG-100, PG-99), **with a calculator** | "asme hydrostatic test pressure", "hydrotest pressure calculation" | 1 |
| `/asme/mawp` | MAWP, design pressure, operating pressure and MDMT | "mawp vs design pressure" | 2 |
| `/asme/shell-thickness` | Shell thickness and MAWP for cylinders and spheres (UG-27), **with a calculator** | "ug-27 calculation", "pressure vessel thickness calculation" | 2 |
| `/asme/heads` | Ellipsoidal, torispherical and hemispherical heads (UG-32) | "2:1 ellipsoidal head", "torispherical head" | 2 |
| `/asme/joint-efficiency` | Joint categories, joint efficiency and radiography: full vs spot (UW-11, UW-12) | "joint efficiency asme", "full vs spot radiography" | 2 |
| `/asme/impact-testing` | MDMT and impact test exemptions (UCS-66) | "ucs-66", "impact test exemption" | 2 |
| `/asme/pwht` | Post-weld heat treatment requirements (UCS-56) | "pwht requirements asme" | 2 |

### E. Materials and traceability (the product tie)

| URL | Page | Searches it targets | Phase |
|---|---|---|---|
| `/asme/mtr` | Material test reports and heat numbers: what an MTR must show and how marking is carried through fabrication | "mtr asme", "material traceability pressure vessel" | 1 |

India says "test certificate", the US says "mill test report": the NA dictionary in `markets.ts` already swaps them.

### F. India ↔ US bridge

| URL | Page | Market | Phase |
|---|---|---|---|
| `/asme/asme-vs-ibr` | ASME vs IBR 2026: who approves, inspects and stamps, forms side by side, and where IBR accepts ASME (Gazette quoted) | India (hidden from NA menus, URL open) | 1 |
| `/asme/buying-from-india` | Buying ASME-stamped vessels and boilers from India: stamps, NB registration, IBR export inspection, what to ask a shop | both | 2 |
| `/asme/state-boiler-laws` | Which US states and Canadian provinces adopt which sections, and who inspects | North America | 3 |
| `/asme/b31-1-vs-b31-3` | B31.1 vs B31.3 piping (not BPVC, but searched alongside it) | both | 3 |

### Glossary terms (`/systems`, `content/terms/`)

MAWP, MDMT, Authorized Inspector, WPS, PQR, WPQ, P-number, joint efficiency, hydrostatic test, mill test report,
heat number, U stamp, Manufacturer's Data Report, NBIC. Each gets its own page once its body is written.

### Free tools and data (link magnets, as with the BOQ checker and the ERP builder)

1. **Hydrotest pressure calculator**: MAWP, test and design-temperature stresses in → test pressure out, every step
   cited. Phase 1.
2. **Welder continuity log**: Excel template plus a web checker (paste welders and last weld dates → who lapses
   when). Phase 1. The same thing our software does automatically.
3. **Shell thickness / MAWP calculator** (UG-27), the user enters the allowable stress. Phase 2.
4. **ASME question library**: the questions shops and buyers ask, in our words, CC BY, JSON and CSV. Phase 2.
5. MCP tools on `ahromlabs.com/mcp` for the calculators, so AI agents can call them. Phase 2.

## 4. Interlinking

- **Every page**: up to `/asme`, sideways to 2–3 pages in its cluster, its glossary terms, one service, one CTA.
- **Services**: welding and MTR pages → material traceability and document extraction; data reports and QC manual
  → custom ERP (the statutory folder); hub → custom ERP.
- **Demos and CTAs by market**: India → the boiler demo; North America → contact / booking (no US boiler demo yet).
- **Both ways with `/ibr`**: IBR forms ↔ ASME data reports, IBR welder certificates ↔ welder qualification, IBR
  registration documents ↔ U stamp. Note `ibr-statutory-folder-from-bom` ↔ `/asme/data-reports`.
- **Footer and FreeGuides**: add the ASME guide to both, shown in both markets (unlike IBR, BOQ and ERP).

## 5. India: what IBR 2026 says about ASME (Gazette, to quote on the pages)

Found in the IBR 2026 Gazette (No. 596, 1 Oct 2026); confirm the regulation numbers when writing:

- Where IBR has no provision for a pressure part, the Inspecting Authority may permit design, manufacture,
  inspection and certification to codes including the ASME BPVC (Chapter 1, general provisions).
- **Inspection of boilers to a foreign code**: an Inspecting Authority may inspect a boiler meant for export
  against any foreign code and grant a Form-I Part-A certificate. The core of `/asme/buying-from-india`.
- **Exemption** of a boiler or component built to an international code including ASME, subject to conditions.
- **Materials**: materials to IS or to international codes including ASME may be used.
- **Welding consumables**: electrodes classified per ASME Section II Part C (SFA) or AWS.
- **NDT personnel**: ASNT Level II/III certificates accepted alongside ISNT.
- **Allowable stresses**: creep testing for alloy steels checks against ASME, BS or EN values.

## 6. Build (when we start)

- `src/lib/asme.ts` (pages, terms, clause references), `content/asme/*.md` for guides, `src/components/AsmePage.tsx`
  on the shared `GuidePage` frame, sitemap entries, `PAGE_SOURCES` in `build-content.mjs`, a `scripts/asme.check.ts`
  (every page has an edition, a reviewer, clause refs that exist in our index, no table longer than N rows from the
  Code).
- **Markets**: add `/asme/asme-vs-ibr` to `IN_ONLY`; add an `NA_ONLY` list next to it for `/asme/state-boiler-laws`
  (`markets.ts` only has India-only today).
- One page image per guide, like the BOQ and AI hubs (no India-specific motifs).

## 7. Rollout and measurement

| Phase | Pages | Effort |
|---|---|---|
| **1** | Hub, BPVC sections, Section VIII, Section IX, stamps, U stamp, data reports, WPS/PQR/WPQ, welder continuity + log, hydrotest + calculator, MTR, ASME vs IBR (12) | ~1 week + review |
| **2** | The remaining phase-2 pages, shell thickness calculator, question library, MCP tools (17) | ~1–2 weeks |
| **3** | Section V, Section XIII, NB/R stamp, state laws, B31 (5) | as demand shows |

Request indexing for each batch (Search Console quota ~10 a day). After 4–6 weeks, read the hub's queries and
impressions per page with the google-insights connector, and write the next pages from what people actually searched.

## 8. Needed from Pujan

1. **Access to the 2025 BPVC** (at least VIII-1, IX, II-D, I) to check every clause reference. Purchase or a
   client's/reviewer's copy.
2. **A reviewer**: an Authorized Inspector or an experienced ASME QA/QC engineer, willing to be named on the pages.
   (The boiler client's QA team could review; the client itself stays unnamed.)
3. **Decide the US angle**: ASME shops are fabricators, a second US vertical beside distribution/inventory. Fine
   for the content; decide whether the US site should also sell to them (would need a US version of the boiler demo).
4. Optional: an anonymised WPS, PQR and data report from the boiler system, for real examples.
