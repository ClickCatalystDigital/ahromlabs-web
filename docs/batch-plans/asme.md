# ASME batches 4–9: research-backed plan

Written 5 Nov 2026 for batches 4–9 of `docs/content-roadmap.md`: the 29 ASME guides other than `u-stamp` and `mtr`
(batch 1), and the `/asme` hub. Audience: US and Canadian boiler and pressure vessel shops, plant engineers and
buyers. Rules as agreed: every H2 a buyer's question answered in its first sentence; facts only from cited primary
sources; 5 pages per batch, then review. The batch 1 pages (`u-stamp.md`, `mtr.md`, uncommitted as of today) set the
house style: question H2s, a `checks:` list, ASME public pages in `sources:`.

## 0. How to use this plan

### 0.1 What can be quoted, and what is cited by paragraph only

| Source | Free to read? | How pages use it |
|---|---|---|
| ASME BPVC text (UG-27, UG-99, UW-12, UCS-56, UCS-66, QW-322, QW-451, QW-461.9, PG-99 …) | No, paid and copyrighted | **Paragraph number and edition only** ("Section VIII Div. 1, UG-99(b), 2025 Edition"), explained in our own words. Formulas may be written out (a formula is not prose); tables are never reproduced in full (stress values, full P-number lists, Figure UCS-66 curves). |
| ASME public pages (certification, data report forms list, price guide, FAQ, code cases, AIA accreditation, required code books) | Yes | Short exact quotes allowed. |
| ASME BPV-GUI-03 handbook (PDF, 12 May 2023) | Yes | Quotes; already in the checker as `asme-handbook`. Careful: its own text still says "the current edition being the 2017 edition"; never cite it for the current edition. |
| National Board (nbbi / nationalboard.org) pages and the NB-370 Synopsis PDFs | Yes | Short exact quotes; Synopsis tables summarised, always with its own caveat. |
| State statutes and rules (e.g. 34 Pa. Code ch. 3a) | Yes | Exact quotes. |
| AWS Welding Journal (Sperko, Section IX changes) | Lead paragraph free; body behind membership | Only the free lead may be quoted. |

### 0.2 The quote checker today, and what it needs

`scripts/check-asme-quotes.mjs` checks a page's `checks:` quotes word for word against two local text files only:
`asme-handbook` (BPV-GUI-03) and `ibr-2026`. Every quote below is marked:

- **[handbook]**: verifiable now, `doc: asme-handbook`.
- **[new doc: key]**: verifiable once a text snapshot of that page is saved in
  `/Users/pujan/Developer/FOLDER SAMPLE - FOR APP/ASME/sources/` and the key is added to `DOCS` in the checker
  (a change outside this plan's file, flagged for whoever writes batch 4). Proposed keys and files:

| Key | Source (opened 5 Nov 2026) | Snapshot file name |
|---|---|---|
| `asme-bpv-cert` | https://www.asme.org/certification-accreditation/Boiler-and-Pressure-Vessel-Certification | `ASME BPV Certification page 2026-11-05.txt` |
| `asme-forms` | https://www.asme.org/codes-standards/publications-information/asme-data-report-forms | `ASME Data Report Forms page 2026-11-05.txt` |
| `asme-aia` | https://www.asme.org/certification-accreditation/Authorized-Inspection-Agency-Accreditation | `ASME AIA Accreditation page 2026-11-05.txt` |
| `asme-price` | https://www.asme.org/certification-accreditation/ASME-Certification-Process/Price-Guide | `ASME Price Guide 2026-11-05.txt` |
| `asme-books` | https://www.asme.org/certification-accreditation/ASME-Certification-Process/Required-Code-Books | `ASME Required Code Books 2026-11-05.txt` |
| `asme-faq` | https://www.asme.org/certification-accreditation/resources-and-events/frequently-asked-questions | `ASME CA FAQ 2026-11-05.txt` |
| `asme-code-cases` | https://www.asme.org/codes-standards/publications-information/code-cases | `ASME Code Cases page 2026-11-05.txt` |
| `nb-registration` | https://www.nationalboard.org/Index.aspx?pageID=9 | `NBBI Data Report Registration 2026-11-05.txt` |
| `nb-about` | https://www.nationalboard.org/Index.aspx?pageID=102 | `NBBI About Us 2026-11-05.txt` |
| `nb-nbic` | https://www.nationalboard.org/Index.aspx?pageID=4 | `NBBI NBIC 2026-11-05.txt` |
| `nb-nbic-2025` | https://www.nationalboard.org/Index.aspx?pageID=4&ID=493 | `NBBI NBIC 2025 changes 2026-11-05.txt` |
| `nb-accreditation` | https://www.nationalboard.org/Index.aspx?pageID=115 | `NBBI Accreditation 2026-11-05.txt` |
| `nb-r-stamp` | https://www.nationalboard.org/Index.aspx?pageID=115&ID=160 | `NBBI R Certificate 2026-11-05.txt` |
| `nb-commission` | https://www.nationalboard.org/Index.aspx?pageID=392 | `NBBI Commissioned Inspectors 2026-11-05.txt` |
| `nb-synopsis` | https://www.nationalboard.org/ViewAllSynopses.aspx | `NBBI NB-370 Synopsis page 2026-11-05.txt` |
| `nb-editions` | https://www.nationalboard.org/SiteDocuments/Synopsis/code_edition.pdf (2026 Synopsis, file dated 13 Jan 2026) | `NBBI code_edition 2026.txt` (`pdftotext -layout`) |
| `nb-stamping` | https://www.nationalboard.org/SiteDocuments/Synopsis/asme_requirements.pdf (2024 Synopsis) | `NBBI stamping requirements 2024.txt` |
| `nb-tabulation` | https://www.nationalboard.org/SiteDocuments/Synopsis/asme_tab.pdf (2025 Synopsis) | `NBBI ASME tabulation 2025.txt` |
| `pa-3a` | https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/034/chapter3a/chap3atoc.html | `34 Pa Code ch 3a 2026-11-05.txt` |
| `aws-sperko-2025` | https://www.aws.org/magazines-and-media/welding-journal/2025/july/wj-july-25-feature-05-sperko/ | `AWS WJ July 2025 Sperko lead.txt` |
| `nb-264` | https://www.nationalboard.org/SiteDocuments/Registration/NB-264.pdf (Revision 19, approved 5/10/25) | `NBBI NB-264 Rev 19.txt` (`pdftotext`) |
| `nb-forms` | https://www.nationalboard.org/Index.aspx?pageID=113&ID=171 | `NBBI NBIC report forms 2026-11-05.txt` |
| `oh-4101-4-3-01` | https://www.law.cornell.edu/regulations/ohio/Ohio-Admin-Code-4101-4-3-01 (LII copy; official codes.ohio.gov refused the connection) | `OAC 4101-4-3-01 eff 2024-07-01.txt` |
| `mi-339-5204` | https://law.cornell.edu/regulations/michigan/Mich-Admin-Code-R-339-5204 (LII copy) | `Mich R 339.5204 eff 2023-05-03.txt` |
| `tx-65-2` | https://www.law.cornell.edu/regulations/texas/16-Tex-Admin-Code-SS-65-2 (LII copy) | `16 TAC 65.2 eff 2024-12-01.txt` |
| `ca-453-454` | https://www.dir.ca.gov/title8/453.html and https://www.dir.ca.gov/title8/454.html | `8 CCR 453-454 2026-11-05.txt` |

The checker normalises curly quotes, dashes and whitespace, so a pasted snapshot will match the quotes below. Where
a quote has a tab or table layout in the original (the forms list), quote only the text inside one cell.

### 0.3 Every URL in this plan was opened on 5 Nov 2026

Opened and read in a browser or by fetch: all URLs in the table above, plus
https://www.asme.org/getmedia/cb8f63c5-3aa2-45ee-a2d1-b999d37733f7/bpv-gui-03-informational-handbook_1.pdf (read from the local text copy the checker uses),
https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025,
https://www.asme.org/codes-standards/find-codes-standards/bpvc-xiii-bpvc-section-xiii-rules-overpressure-protection (2021, 2023, 2025 editions listed),
https://www.asme.org/codes-standards/find-codes-standards/bpvc-ix-bpvc-section-ix-welding-brazing-fusing-qualifications (2025),
https://www.asme.org/codes-standards/find-codes-standards/b31-1-power-piping (**2026 edition now listed**),
https://www.asme.org/codes-standards/find-codes-standards/b31-3-process-piping (2024 latest),
https://access.asme.org/caconnect/certified-companies (Certificate Holder Search),
https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/034/chapter3a/s3a.4.html,
https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/034/chapter3a/s3a.21.html.

Second pass (same day): the National Board's NBIC report forms page and NB-264 (Rev. 19), and state rules for Ohio
(OAC 4101:4-3-01), Michigan (R 339.5204), Texas (16 TAC §65.2) and California (8 CCR §§450, 453, 454, 455, 462). The
official Ohio (codes.ohio.gov) and Michigan (legislature.mi.gov, LARA) sites refused connections and TDLR's rules page
404s, so those three are read from Cornell LII's copies, which show the rule's effective date. Re-open the official
text before publishing. Still not reached: NB-406 (text is a blank form, nothing to cite). Reddit refuses automated
search, so r/Welding and r/engineering questions below come from the long-standing question patterns, not from
fetched threads; Eng-Tips and Practical Machinist threads were searched (§0.4).

### 0.4 Where the buyer questions come from

Eng-Tips threads searched 5 Nov 2026 (titles only are used, as question wording):
"Is U-stamping required based on ASME Sec.VIII?", "ASME Section VIII, Div 1 compliance without U Stamp",
"Is an ASME stamp requried?", "ASME U2 Stamp", "Dual ASME VIII U Stamp", "B31.1 vs B31.3".
Practical Machinist: "At what pressure does a vessel need a rating", "Exemption from ASME pressure rating",
"Data on air receiver tag and what all of it means". These, plus Google's People Also Ask patterns for each
page's head term, set the H2s below. Forum replies are never a source of fact on the pages.

### 0.5 What the US boiler demo really does (shanti-ops, branch `demo-us`)

Checked from `DEMO.md`, `SYSTEM.md` §5fk–5fl, `lib/qc-asme.mjs`, `lib/qc-asme-pdf.js`, `lib/calc-engine.js` and
`scripts/demo/seed-acme-us.mjs` on 5 Nov 2026. Pages may say only this:

- **Live at** https://boiler-erp-us.ahromlabs.com/demo: fictional Acme Boilers Inc., Cleveland, Ohio. Five jobs:
  four firetube boilers (Section I, S stamp, Form P-2) and AB-1003, a 1,500 gal deaerator tank (Section VIII Div. 1,
  U stamp, Form U-1A). Data is seeded and reset nightly.
- **ASME record package** from the QC folder, Letter size, in the order an AI reviews it: index; data report
  (P-2 or U-1A); weld map with seam IDs, joint category (A/B/D), joint type, WPS and welder stamps per seam, NDE method
  and report; WPS/PQR list (process, PQR, P-No., thickness range, PWHT basis); welder continuity under QW-322 per welder
  per process (last weld, lapse date, Current/Lapsed); MTRs by heat number; NDE records; PWHT and hydro test records.
- **Honest limits**: the data report is **our own layout carrying the form's fields, not a facsimile of the ASME
  form**; the ASME data (edition, stamp, inspector, welds, WPS, welders) is seeded, with no screen to enter it yet;
  there is no file storage in the demo, so no MTR scans or drawings; no NB Electronic Data Transfer; Division 1 vessel
  and Section I boiler only (no U2, no Div. 2).
- **Imperial units**: values stored metric, shown and entered in US customary (Units setting, Imperial default).
- **Calculation sheets**: UG-27(c)(1) shell and PG-27.2.2 boiler shell formulas with an illustrative SA-516 Gr 70
  stress excerpt.
- **QuickBooks Online** (Intuit sandbox): connect and map accounts; invoices and payments go over when issued or
  recorded, vendor bills on approval and bill payments when recorded, with retry and no duplicates. Not yet: credit
  and debit notes; edits after sending are not re-sent.
- **The real client runs the India (IBR) build.** Never write that a US shop uses this.

Use on pages as the closing "What we build" paragraph, one per page, tied to that page's record (weld map on
WPS/PQR, continuity on QW-322, hydro record on the hydro page), linking the industry page. Never claim more than the
list above; if a page needs something the demo lacks (NB EDT upload, Div. 2 A-1), say "we'd build it".

Two demo issues found while checking (for the shanti-ops session, not for these pages):
1. The U-1A title in `lib/qc-asme.mjs` reads "Completely Shop-Fabricated Vessels Only"; ASME's 2025 form is now
   "Alternative Form for Single Chamber, Completely Shop- or Field-Fabricated Vessels Only".
2. The deaerator's hydro record uses a 0–600 psi gauge for a 130 psi test. UG-102 caps the dial at 4 × test
   pressure (520 psi); the boiler's 225 psi test is fine. Calc library sources say "2023 Edition" while the package
   says 2025.

### 0.6 Link targets that exist (checked against `src/lib/related.ts` rules)

Outside `/asme`: `/industries/boiler-pressure-vessel-manufacturing` (US visitors get the US version at the same
URL), `/services/material-traceability`, `/services/document-extraction`, `/services/custom-erp-crm`,
`/services/operational-intelligence`, `/notes/plate-remnants-back-into-stock`, `/notes/ibr-statutory-folder-from-bom`,
`/notes/customer-portal-one-order-every-department`, `/manufacturing/quickbooks-for-manufacturing`,
`/manufacturing/job-shop-erp`, `/manufacturing/wip-tracking`, `/ibr/registration-documents`, `/ibr/2026-changes`,
`/ibr/small-industrial-boilers`, and glossary pages `/systems/<term>` for terms with a body: `heat-number`,
`welder-continuity`, `mawp`, `mdmt`, `joint-efficiency`, `hydrostatic-test`, `p-number`,
`procedure-qualification-record`, `welding-procedure-specification`, `welder-performance-qualification`,
`manufacturers-data-report`, `authorized-inspector`, `asme-certification-mark`, `nbic`, `material-test-certificate`,
`material-traceability`. Do not use `/asme/items` or `/asme/questions` (not in the related-title map; the build
would throw). Three pages already got `related:` from the linking session (section-viii, section-i-vs-iv,
asme-vs-ibr); the lists below replace them only where noted.

All current titles are ≤ 60 characters, so no `metaTitle` is needed unless a title changes; where this plan changes
a title it gives a `metaTitle`.

---

## Batch 4: code basics

### asme/section-viii

**Questions (H2 → first sentence)**
1. What does ASME Section VIII cover? → Pressure vessels for internal or external pressure above 15 psi, in three Divisions; Division 1 excludes some small and low-pressure vessels (U-1(c)).
2. What is the difference between Division 1 and Division 2? → Division 1 designs by rule with a design factor of 3.5 on tensile strength; Division 2 uses 2.4 with more analysis, a User's Design Specification and a certified design report.
3. When is Division 3 used? → For very high pressure, generally above 10,000 psi, with design by analysis and fracture mechanics.
4. Does a vessel under 15 psi need a U stamp? → Not under Section VIII: Division 1 excludes vessels for 15 psi or less, but a state or the buyer may still ask for it (Eng-Tips "Is U-stamping required").
5. Can a vessel be built to Section VIII without the U stamp? → It can be designed to the rules, but it isn't a Code vessel without the certificate holder, Inspector, data report and stamp; most US jurisdictions require the stamp (see state-boiler-laws).
6. Can a U certificate holder build Division 2 vessels? → No: Division 2 needs the U2 certificate (ASME certification page lists U and U2 separately).
7. What paperwork does a Division 1 vessel need? → Calculations, MTRs, WPS/PQR/WPQ, NDE, hydro record and Form U-1 or U-1A signed by the manufacturer and the AI; owners may supply design conditions on U-DR-1/U-DR-2.

**Sources** (opened): ASME BPV certification page; ASME data report forms page; ASME 2025 BPVC page.
Paragraph refs (2025 Edition, cite only): VIII-1 U-1(c)(2) scope exclusions; UG-23 (design factor via Section II-D);
VIII-2 Part 2 (User's Design Specification, Manufacturer's Design Report); VIII-3 KG-.

**Quotes**
- [new doc: asme-forms] "Alternative Form for Single Chamber, Completely Shop- or Field-Fabricated Vessels Only"
- [new doc: asme-forms] "User's Design Requirements for Single Chamber Pressure Vessels"
- [new doc: asme-bpv-cert] "U2 - Pressure Vessels (Alternative Rules for Pressure Vessels)"

**Worked example**: the same 48 in ID, 150 psi, SA-516-70 shell: Division 1 needs 0.214 in + CA (shell-thickness
page). Give Division 2 only as "thinner, because the allowable stress in Section II-D Table 5A is higher"; no number
(we can't publish the Div. 2 stress).

**Demo**: AB-1003 is a Division 1 U-stamped deaerator with Form U-1A in the record package. Not Division 2.

**related** (keep the existing four, add one): `/asme/bpvc-sections`, `/asme/data-reports`,
`/industries/boiler-pressure-vessel-manufacturing`, `/services/material-traceability`, `/asme/state-boiler-laws`.

**description** (156): "ASME Section VIII Divisions 1, 2 and 3 compared: design factor, analysis, examination, U vs U2 stamps, data reports, and when a vessel needs the stamp."

**Fix**: nothing wrong found. Add the 15 psi / unstamped questions (top forum questions) and U-DR forms.

### asme/section-i-vs-iv

**Questions**
1. Where is the line between a Section I and a Section IV boiler? → Steam above 15 psi, or water above 160 psi or 250 °F, is a Section I power boiler; below that, Section IV.
2. Which stamp goes on each? → S (with A, E, M, PP) for Section I; H (HLW for lined water heaters) for Section IV.
3. Which data report does each use? → P-2, P-3 and P-4 family for Section I; H-2, H-3, H-5/H-5A for Section IV.
4. Does a Section IV boiler need an Authorized Inspector? → Yes, except cast iron and cast aluminum boilers, whose H certificate has no AIA agreement and runs one year.
5. What is the hydro test for a Section I boiler? → At least 1.5 × MAWP (PG-99); Section IV has its own (HG-510).
6. Who builds boiler external piping? → A Section I certificate holder (S, A or PP), to B31.1 design rules, inspected by the AI.
7. Can one shop hold both S and H? → Yes; each is a separate certificate with its own required code books.

**Sources**: ASME BPV certification page; data report forms page; required code books page; handbook Exhibit A.

**Quotes**
- [handbook] "The H (Cast Iron and/or Cast Aluminum) Certificate of Authorization is issued for 1 year."
- [handbook] "The Joint Review is conducted by an ASME Designee appointed by ASME (No Authorized Inspection Agency involvement is required)."
- [new doc: asme-forms] "Manufacturer's Data Report for All types of Boilers Except Watertube and those Made of Cast Iron" (H-2)
- [new doc: asme-forms] "Manufacturers' Data Report for All Types of Boilers Except Watertube and Electric" (P-2)

**Worked example**: a 150 psi firetube steam boiler (the demo's AB-1001) is Section I: hydro ≥ 1.5 × 150 = 225 psi.
A 30 psi hot-water heating boiler at 200 °F is Section IV.

**Demo**: four firetube boilers on Form P-2, S stamp, hydro at 225 psi witnessed by the AI. No Section IV jobs.

**related**: keep `/asme/bpvc-sections`, `/ibr/small-industrial-boilers`, `/industries/boiler-pressure-vessel-manufacturing`; add `/asme/hydrostatic-test`, `/systems/hydrostatic-test`.

**description** (148): keep.

**Fix**: none found. Add Section IV hydro paragraph by number (HG-510) to verify against the Code before publishing.

### asme/stamps

**Questions**
1. What do the ASME stamp letters mean? → The Certification Mark plus a designator (U, U2, U3, S, A, E, M, PP, H, HLW, RP, T, PRT, and the Section XIII device letters) that says what the item is built to.
2. What is the difference between the U and U2 stamp? → U is Section VIII Division 1; U2 is Division 2, a separate certificate.
3. What is the R stamp? → The National Board's certificate for repairs and alterations under the NBIC, not an ASME stamp.
4. What does NB on a nameplate mean? → The data report is registered with the National Board.
5. How long is an ASME certificate valid? → Three years, except H (cast iron/aluminum) and UM, one year.
6. What is a PRT certificate? → For parts makers without design responsibility.
7. What happened to the old "Code Symbol Stamps"? → ASME replaced 28 separate marks with one Certification Mark used with a designator.
8. Which states require which stamps? → The National Board's stamping table lists them by jurisdiction; e.g. Florida and Louisiana list no U requirement, Wyoming only U, U2, U3, UV (2024 Synopsis).
9. How do I check a company really holds a stamp? → ASME's Certificate Holder Search.

**Sources**: ASME BPV certification page; handbook; ASME FAQ (single Certification Mark); NB accreditation page
(pageID=115) and R stamp page (ID=160); NB registration page; NB stamping requirements PDF; Certificate Holder Search.

**Quotes**
- [handbook] keep the two existing checks.
- [handbook] "Note that a UM Certificate can only be issued to Applicants during the period that a valid U or S Certificate is held."
- [new doc: asme-faq] "Instead of 28 separate Certification Marks, there will now be this single comprehensive mark."
- [new doc: asme-faq] "Visit the ASME Certificate Holder Search which will provide a list of ASME certified companies."
- [new doc: nb-accreditation] "Authorized repair organizations are issued an NBBI stamp that is applied to the equipment nameplate."
- [new doc: nb-registration] "The NB mark is used by manufacturers to identify items registered with the National Board."

**Worked example**: reading a nameplate: Certification Mark + "U" + "NB 51006" + MAWP 100 psi at 650 °F, MDMT −20 °F at
100 psi, year built, serial number (the demo's U-1A fields).

**Demo**: package index shows stamp, certificate number and expiry, NB number. Not a stamping system.

**related**: `/asme/u-stamp`, `/asme/national-board-registration`, `/systems/asme-certification-mark`, `/industries/boiler-pressure-vessel-manufacturing`, `/services/material-traceability`.

**description** (155): "ASME stamps explained: U, U2, U3, S, A, PP, H, HLW, PRT and the Section XIII valve letters, plus the National Board's NB, R, VR, NR and T/O marks."

**Fixes**
- Source titled "Accreditation programs for repairs, alterations and relief valve testing" points to pageID=102, which is NBBI's **About Us** page. Use https://www.nationalboard.org/Index.aspx?pageID=115.
- Add CA-1: ASME's required-code-books page now lists "CA-1 Conformity Assessment Requirements" for every BPV certificate.

### asme/data-reports

**Questions**
1. What is a Manufacturer's Data Report? → The signed record of what a stamped item is (design conditions, materials, thicknesses, joints, examinations, test pressure), signed by the manufacturer and the AI.
2. Which form do I use? → U-1/U-1A for Div. 1 vessels, U-2/U-2A for parts, A-1 for Div. 2, K-1 for Div. 3, P-2/P-3/P-4A for Section I, H-2/H-3 for Section IV.
3. What is the difference between U-1 and U-1A? → U-1A is the alternative form for single-chamber vessels, now shop- or field-fabricated.
4. Where do I get the forms? → Free fillable PDFs on ASME's data report forms page; the 2025 revisions are starred there.
5. Are metric forms still used? → ASME marks the metric forms (P-2M, P-3M …) "no longer included in Code".
6. Does the National Board accept any layout? → Paper reports must be in the exact Code format and content, with minimum font sizes; outdated forms are returned.
7. Who signs it? → The manufacturer's representative and the Authorized Inspector, who initials every page of a multi-page form.
8. How long must the shop keep it? → Division 1 sets a retention period unless the report is registered with the National Board, which keeps it permanently (cite UG-120, verify).

**Sources**: ASME forms page; NB registration page.

**Quotes**
- [new doc: asme-forms] "* Revised or new in the 2025 BPVC Edition."
- [new doc: asme-forms] "** Form no longer included in Code"
- [new doc: asme-forms] "Users of these forms should keep track of the font and field size when filling in data in order to meet regulatory or customer needs."
- [new doc: nb-registration] "The 2025 revisions to the ASME BPV Code and NBIC report forms became mandatory on January 1, 2026."
- [new doc: nb-registration] "All data report forms submitted to the National Board for registration on outdated forms will be returned for correction."
- [new doc: nb-registration] "Data report forms must be in the exact format and have the same content as those found in the ASME BPV Code and the NBIC."

**Worked example**: a U-1A filled for the demo's deaerator: MAWP 100 psi at 650 °F, hydro 130 psi, shell SA-516-70,
Type 1 joints spot RT (E = 0.85 Cat A), PWHT not required at ½ in nominal (P-No. 1).

**Demo**: prints P-2 or U-1A fields in our own layout; NB rule above means a shop still files on the official form or
via EDT. Say exactly that.

**related**: `/asme/national-board-registration`, `/systems/manufacturers-data-report`, `/services/document-extraction`, `/industries/boiler-pressure-vessel-manufacturing`, `/notes/ibr-statutory-folder-from-bom`.

**description** (157): "ASME Manufacturer's Data Reports: which form (U-1, U-1A, U-2, A-1, K-1, P-2, P-3, H-2), the 2025 forms, who signs, and National Board filing rules."

**Fixes**
- "the National Board asks for reports within 30 days of certification": correct, but the source is NB-264 (Rev. 19), not the registration page. Cite NB-264; quote [new doc: nb-264] "The timeframe in which registration forms will be submitted to NBBI following certification by the Inspector or CI shall not exceed 30 days."
- U-1A is no longer shop-only: say "shop- or field-fabricated".
- Add the metric-forms and font-size rules.

### asme/authorized-inspector

**Questions**
1. What does an Authorized Inspector do? → Independently checks a Code item's design, materials, welding, NDE and test, witnesses the pressure test and signs the data report.
2. Who employs the AI? → An Authorized Inspection Agency accredited by ASME under QAI-1: usually an insurer, sometimes a jurisdiction.
3. What commission does an AI hold? → The National Board Authorized Inspector Commission (AI), under NB-263 RCI-1, renewed annually.
4. Can a shop hire an AI directly? → No: it signs an inspection agreement with an AIA, which assigns the inspector.
5. Do AIAs work outside the US? → ASME's FAQ says most operate worldwide.
6. What is the difference between the AI and the shop's QC? → The AI verifies the shop's system worked; the shop runs it.
7. Who inspects repairs in service? → A National Board commissioned inspector, for an R-stamp holder under the NBIC.
8. What hold points does an AI usually set? → Those in the QC manual: material review, fit-up, NDE review, PWHT chart, hydro.

**Sources**: ASME AIA accreditation page; handbook; ASME FAQ; NB commissioned inspectors page; NB R stamp page.

**Quotes**
- [handbook] keep the existing check.
- [handbook] "The AIA representative, known as the Authorized Inspector is appointed by the Authorized Inspection Agency."
- [new doc: asme-aia] "Accredited Authorized Inspection Agencies (AIAs) are responsible for performing inspections of ASME pressure equipment during the manufacturing process."
- [new doc: nb-commission] "The National Board Authorized Inspector Commission (AI) is issued to individuals who have been qualified to perform inspections of boilers and pressure vessels as required by the American Society of Mechanical Engineers Boiler and Pressure Vessel Code (ASME BPV Code)."
- [new doc: nb-commission] "The Commission Card must be renewed annually."
- [new doc: asme-faq] "Most AIAs operate worldwide."

**Worked example**: one weld walked the way an AI picks it: seam C2 → welders W-07, W-12 → WPQ-07/12, continuity
current → WPS-101 → PQR-101 → RT-AB-1003-2 (the demo's weld map).

**Demo**: weld map + continuity page in the package; the inspector's name and agency on the index and data report.

**related**: `/systems/authorized-inspector`, `/asme/quality-control-manual`, `/asme/u-stamp`, `/industries/boiler-pressure-vessel-manufacturing`, `/services/material-traceability`.

**description** (148): "The ASME Authorized Inspector and Inspection Agency: QAI-1 accreditation, the National Board AI commission, what they check and sign, and hold points."

**Fixes**
- "National Board commission with the endorsement for new construction": NBBI now names it the **National Board Authorized Inspector Commission (AI)** (vs Inservice, IS); use that.
- Source pageID=102 mislabeled (see stamps).

---

## Batch 5: welding

General: the Section IX text is paid. Every table rule (QW-451, QW-452, QW-461.9, QW-433) is described in outline with
its paragraph number; numbers given are the well-known headline values and must be checked against the shop's
2025 Section IX before publishing (the reviewer step in `docs/asme-hub-plan.md` §2).

### asme/section-ix

**Questions**
1. What is ASME Section IX? → The Code section that qualifies welding, brazing and fusing procedures and the people who perform them.
2. What does Section IX not cover? → Where welds go, joint design, how much NDE and when to heat treat: the construction code decides those.
3. What are its parts? → QG general, QW welding, QB brazing, QF plastic fusing.
4. What changed in the 2025 Edition? → The changes apply to new qualifications from 1 January 2026; existing ones stay valid. List only what we can source; AWS's summary is behind membership beyond the lead.
5. Does B31.3 or B31.1 use Section IX? → Yes, both send welding qualification to Section IX.
6. Can a shop use another company's PQR? → No, except AWS Standard Welding Procedure Specifications after a demonstration (QW-500, form QW-485).
7. Where are the suggested forms? → QW-482 (WPS), QW-483 (PQR), QW-484A/B (WPQ/WOPQ), QW-485 (SWPS demonstration), free on ASME's forms page.

**Sources**: ASME Section IX product page (2025); ASME forms page; AWS Sperko article (production URL).

**Quotes**
- [new doc: aws-sperko-2025] "These changes will become mandatory for new qualifications on January 1, 2026."
- [new doc: asme-forms] "Suggested Format for Demonstration of Standard Welding Procedure Specifications (SWPS)"
- [new doc: asme-forms] "Suggested Format A for Welder Performance Qualifications (WPQ)"

**Demo**: WPS-101 (SAW) and WPS-102 (SMAW), P-No. 1 to P-No. 1, with PQRs, on the package's welding page.

**related**: `/asme/wps-pqr-wpq`, `/systems/welding-procedure-specification`, `/systems/procedure-qualification-record`, `/industries/boiler-pressure-vessel-manufacturing`, `/services/material-traceability`.

**description** (151): "ASME Section IX explained: what it covers and doesn't, QG/QW/QB/QF, WPS, PQR, WPQ, the free QW-48x forms and the 2025 Edition dates."

**Fix**: source URL `https://uatsitecore.aws.org/...` is AWS's **UAT (staging) host**. Use
https://www.aws.org/magazines-and-media/welding-journal/2025/july/wj-july-25-feature-05-sperko/ (opened; same article).

### asme/wps-pqr-wpq

**Questions**
1. What is the difference between a WPS and a PQR? → The PQR records a test weld and its results; the WPS is the instruction written within what the PQR supports.
2. What is a WPQ? → The record that one welder passed a test and what it qualifies them for.
3. Which comes first? → The PQR (from a draft WPS), then the WPS that cites it, then each welder's WPQ.
4. What tests does a groove-weld PQR need? → Two tension tests and four guided bends (side bends for thicker coupons), plus Charpy tests where the construction code requires toughness (QW-451).
5. Can one WPS cite several PQRs? → Yes, if every essential variable is covered by one of them.
6. Who signs them? → The manufacturer, certifying the record is correct; the AI reviews them.
7. Can I use an AWS prequalified WPS? → Not D1.1 prequalified procedures; only AWS SWPSs accepted in Section IX Article V, after demonstration.
8. How does a weld trace back? → Weld map number → welder stamp → WPQ and continuity → WPS → PQR → filler and base metal certificates.

**Sources**: ASME forms page (QW-482/483/484A); Section IX product page.

**Quotes**: [new doc: asme-forms] "Suggested Format for Procedure Qualification Records (PQR)"; "Suggested Format for Welding Procedure Specifications (WPS)".

**Worked example**: PQR coupon ¾ in P-No. 1 SA-516-70, SMAW E7018 (F-4, A-1): qualifies base metal 3/16 in to 1½ in
(QW-451.1, 2T); WPS-102 in the demo is written 1/16 to 1¼ in (within range). Mark "check QW-451.1".

**Demo**: the weld map lists WPS and welder stamps per seam, and the welding page lists WPS → PQR. Say that; not WPS
authoring.

**related**: `/systems/welding-procedure-specification`, `/systems/procedure-qualification-record`, `/systems/welder-performance-qualification`, `/services/material-traceability`, `/industries/boiler-pressure-vessel-manufacturing`.

**description**: keep (149).

**Fix**: none found.

### asme/welder-qualification

**Questions**
1. What does a 6G test qualify? → Groove welds in all positions on plate and pipe (QW-461.9), within its diameter and thickness ranges.
2. What do 1G to 6G mean? → Test positions: flat, horizontal, vertical, overhead on plate; 5G pipe fixed horizontal; 6G pipe fixed at 45°.
3. Does 2G plus 5G equal 6G? → Yes, the pair qualifies all positions.
4. Do plate tests qualify pipe? → Only above 24 in (610 mm) OD for the positions tested, and smaller pipe in limited positions: check QW-461.9.
5. What diameter does my coupon qualify? → Under 1 in qualifies the size welded and up; 1 to under 2⅞ in qualifies 1 in and up; 2⅞ in and over qualifies 2⅞ in and up (QW-452.3).
6. Bend test or radiography? → Either for most processes (QW-302, QW-304); GMAW short-circuit welders by bends only.
7. Welder vs welding operator? → A welder holds the torch; an operator runs machine or automatic equipment (QW-360 variables).
8. Does a WPQ expire? → No fixed date; it lapses after six months without the process (QW-322).
9. Is an ASME WPQ valid at another employer? → Not automatically: each organization certifies its own welders (QG-106).

**Sources**: Section IX product page; ASME forms page.

**Demo**: two welders (W-07, W-12) with WPQs and processes SAW and SMAW.

**related**: `/asme/welder-continuity`, `/systems/welder-performance-qualification`, `/systems/welder-continuity`, `/manufacturing/job-shop-erp`, `/industries/boiler-pressure-vessel-manufacturing`.

**description** (157): "ASME welder qualification: what 1G to 6G tests qualify, plate vs pipe, diameter limits (QW-452.3), bend vs RT, operators, and transferring a WPQ."

**Fixes**: "pipe only above a large diameter" → name 24 in (610 mm) after checking QW-461.9.

### asme/welder-continuity

**Questions**
1. How long is an ASME welder qualification valid? → It has no expiry date; it lapses when the welder hasn't used the process for six months (QW-322.1(a)).
2. Is continuity per process or per WPS? → Per process.
3. What counts as welding with the process? → Any recorded weld with that process; position, thickness and WPS don't matter for continuity.
4. How do you renew a lapsed qualification? → One test coupon with the process, any thickness, position or diameter, tested by bends or volumetric NDE, restores the old ranges (QW-322.2).
5. Can a qualification be revoked early? → Yes, when there's a specific reason to question the welder's ability; only the work in question is lost (QW-322.1(b)).
6. What record does an AI expect? → Welder stamp, process, date, job or weld number, signed off.
7. Does B31.3 use the same rule? → Yes, it uses Section IX qualification; the owner may ask for more.
8. What happens if a lapse is found after welding? → Those welds were made by an unqualified welder: an NCR, and usually removal or engineering disposition.

**Worked example** (from `continuityLapse` in `src/lib/asme-calc.ts`, same rule as the demo's `lib/qc-asme.mjs`):
last SMAW weld 31 Aug 2026 → lapses 28 Feb 2027 (end of month, not 3 Mar); last GTAW 15 Jan 2026 → lapsed 15 Jul 2026.
The checker's sample (W-12 GTAW 2026-01-15) shows as lapsed today; keep it as the teaching case.

**Demo**: the package's continuity table (Current / Lapsed per welder per process). That table is the closest match to
what this page sells; lead the "What we build" line with it.

**related**: `/systems/welder-continuity`, `/asme/welder-qualification`, `/services/material-traceability`, `/industries/boiler-pressure-vessel-manufacturing`, `/manufacturing/wip-tracking`.

**description** (148): "ASME welder continuity under QW-322: the six-month rule per process, renewal with one coupon, revocation, the record an AI checks, and a free checker."

**Fix**: none found. The tool and the demo share the same lapse rule (end-of-month clamp): good.

### asme/p-numbers

**Questions**
1. What is a P-number? → A group of base metals with similar weldability, so a qualification on one covers its group (QW/QB-422).
2. What P-number is SA-516 Grade 70? → P-No. 1, Group 2.
3. What is a Group number for? → Toughness: it matters when impact testing applies (supplementary essential).
4. What is an F-number? → A filler metal usability group: F-4 is low-hydrogen steel electrodes such as E7018.
5. Does an F-4 welder qualify for E6010? → Generally yes for F-1 to F-4 in the same process with backing; QW-433 sets the exact pairings.
6. What is an A-number? → The chemistry group of steel weld metal (A-1 carbon steel … A-8 austenitic).
7. Do I need a new PQR for P-1 to P-8? → Yes: a dissimilar combination needs a procedure qualified for it.
8. Where are P-numbers listed? → Section IX QW/QB-422 (and Section II Part D for allowable stresses, not the grouping).

**Sources**: Section IX product page. Table values: cite QW/QB-422, QW-432, QW-433, QW-442 by number.

**Demo**: WPS base metal shown as "P-No. 1 to P-No. 1".

**related**: `/systems/p-number`, `/asme/section-ii`, `/systems/heat-number`, `/notes/plate-remnants-back-into-stock`, `/services/material-traceability`.

**description** (139): "ASME Section IX P-numbers, Group numbers, F-numbers and A-numbers, with common materials and electrodes in each and what they mean for a PQR."

**Fix**: "The full assignments are in Section IX (QW/QB-422) and Section II Part D": Part D holds allowable stresses, not
the P-number list; reword. Check SA-516-70's Group number (2) in the 2025 QW/QB-422 before stating it.

---

## Batch 6: design and test (the calculator pages)

### Calculator review (`src/components/AsmeTools.tsx`, `src/lib/asme-calc.ts`) against the Code formulas

| Tool | Formula in code | Code formula (2025, by paragraph) | Verdict |
|---|---|---|---|
| Shell, cylinder | t = PR/(SE − 0.6P) and PR/(2SE + 0.4P), R corroded; limits P ≤ 0.385SE, t ≤ R/2 | UG-27(c)(1), (c)(2) | Correct. **Gap**: one E for both. The circumferential-stress formula takes the longitudinal (Cat A) joint's E; the longitudinal-stress formula takes the circumferential (Cat B) joint's E. With Cat A full RT (1.0) and Cat B spot (0.85) the tool can't show both. Add a second field "E, circumferential joints" defaulting to the first. |
| Shell, sphere | t = PR/(2SE − 0.2P), limit P ≤ 0.665SE | UG-27(d) | Correct; **missing** the t ≤ 0.356R limit in `inRange`. |
| Shell MAWP | P = SEt/(R + 0.6t), t and R corroded | UG-27(c)(1) rearranged | Correct for the hoop case; it omits the longitudinal check P = 2SEt/(R − 0.4t). Harmless with one E (hoop always governs), wrong once a second E exists: take the lower of the two. No MAWP for spheres (field hidden): fine. |
| Hydrotest | factor × MAWP × (S_test/S_design) | UG-99(b) 1.3 × LSR; UG-100 1.1 × LSR; PG-99 1.5 | Correct. Add to the stress hint: LSR excludes bolting materials (UG-99(b)). |
| Continuity | last weld + 6 months, month-end clamp | QW-322.1(a) | Correct. |

There is **no calculator on `mawp` or `joint-efficiency`** (the task assumed one). Skip new tools: put a UW-12
selector (joint type × RT extent → E) on the shell calculator's E field, and link both pages to it.

### asme/mawp

**Questions**
1. What is the difference between MAWP and design pressure? → Design pressure is what the vessel is designed for; MAWP is what the finished vessel can take at the top, at design temperature, from its actual thicknesses, and is at least the design pressure (UG-98, Mandatory Appendix 3).
2. Can MAWP be higher than design pressure? → Yes, when standard plate is thicker than required; owners often still stamp MAWP = design pressure.
3. Where is MAWP measured? → At the top of the vessel in its normal operating position.
4. What is MDMT? → The coldest metal temperature at which the vessel may see its MAWP; it decides impact testing.
5. Where should the relief valve be set? → At or below MAWP for a single device (cite Section XIII / UG-153 by number, verify).
6. How much can pressure rise while relieving? → Division 1: 10% or 3 psi over MAWP for one device, 16% or 4 psi with several, 21% for fire (verify paragraph in 2025 VIII-1).
7. What is a good margin between operating and design pressure? → Common practice is about 10% or 25 psi, whichever is more; not a Code rule.
8. Is MAP a Code term? → No; "maximum allowable pressure, new and cold" is an owner's specification term.

**Worked examples**
- The shell-thickness case: ⅜ in plate, CA 0.125 in, R = 24 in, S = 20,000 psi, E = 0.85 → corroded t = 0.250, R = 24.125 →
  MAWP = 17,000 × 0.25 / (24.125 + 0.15) = **175.1 psi** (matches `shellMawp`). With the plate under-tolerance of 0.01 in
  allowed by UG-16(c): t = 0.240 → **168.1 psi**.
- Static head: 20 ft of water below the top adds 20 × 0.433 = 8.7 psi, so the bottom course is designed for 158.7 psi
  when MAWP at the top is 150 psi.
- Relief: MAWP 150 psi, single valve set at 150 → accumulation to 165 psi allowed; fire case 181.5 psi.

**Demo**: data report shows MAWP at temperature and MDMT; calc sheets carry UG-27(c)(1).

**related**: `/systems/mawp`, `/systems/mdmt`, `/asme/shell-thickness`, `/asme/section-xiii`, `/industries/boiler-pressure-vessel-manufacturing`.

**description** (151): "MAWP vs design pressure vs operating pressure in ASME Section VIII, worked from plate thickness, with static head, relief set pressure and MDMT."

**Fix**: overpressure limits should cite the 2021+ paragraph (Division 1 moved overpressure protection into UG-150 to
UG-156 when Section XIII arrived): verify UG-153 in the 2025 book and cite it.

### asme/shell-thickness

**Questions**
1. How do you calculate pressure vessel shell thickness? → t = PR/(SE − 0.6P) for the hoop stress (UG-27(c)(1)); check PR/(2SE + 0.4P) and take the larger, plus corrosion.
2. Which joint efficiency goes in which formula? → The longitudinal joints' E in the hoop formula; the circumferential joints' E in the longitudinal formula.
3. Why use the corroded radius? → Thickness must hold at the end of the corrosion allowance.
4. Where does S come from? → Section II Part D, Table 1A, for the material and design temperature (SA-516-70 is 20,000 psi up to 650 °F in customary units: check the 2025 table).
5. What if the shell is thick? → Beyond t = R/2 or P = 0.385SE, use Mandatory Appendix 1-2.
6. What about outside radius? → Mandatory Appendix 1-1 gives formulas on outside dimensions.
7. Does the formula cover vacuum? → No: external pressure is UG-28 with Section II-D charts.
8. What minimum thickness applies? → UG-16: 1/16 in (1.5 mm) for shells and heads, with exceptions.

**Worked examples** (all checked by hand and against `asme-calc.ts`)
- Existing 48 in / 150 psi / 20,000 psi / E 0.85 / CA ⅛: hoop 0.2140 in, longitudinal 0.1062 in, + CA = **0.339 in** → ⅜ in plate.
- With Cat A full RT (E = 1.0) and Cat B spot (0.85): hoop 3,618.75 / (20,000 − 90) = 0.1818 in; longitudinal
  3,618.75 / (34,000 + 60) = 0.1062 in; + CA = **0.307 in**: still ⅜ in after under-tolerance, but 5/16 in now passes a
  bare check; shows why E matters.
- Sphere, same numbers: 3,618.75 / (34,000 − 30) = 0.1065 in + CA = 0.232 in.
- Metric: existing (5.4 mm + 3 = 8.4 mm → 10 mm plate) is correct.
- MAWP back-calculation: 175.1 psi (see mawp).

**Demo**: calculation sheets with UG-27(c)(1) and Section I PG-27.2.2 and an illustrative SA-516-70 stress excerpt.

**related**: `/asme/joint-efficiency`, `/asme/mawp`, `/systems/joint-efficiency`, `/notes/plate-remnants-back-into-stock`, `/industries/boiler-pressure-vessel-manufacturing`.

**description**: keep (135).

**Fixes**: calculator items in the table above (two E values, sphere limit, MAWP takes the lower case).

### asme/hydrostatic-test

**Questions**
1. What is the ASME hydrostatic test pressure? → For Division 1, at least 1.3 × MAWP × the lowest stress ratio (UG-99(b)); Section I boilers at least 1.5 × MAWP (PG-99).
2. What is the stress ratio (LSR)? → Allowable stress at test temperature over allowable at design temperature, the lowest among the pressure parts, bolting excluded.
3. At what pressure is the vessel inspected? → At no less than test pressure ÷ 1.3, held while every joint is examined (UG-99(g)).
4. How hot or cold should the test water be? → Metal at least 30 °F above MDMT; Division 1 recommends not above 120 °F (UG-99(h)).
5. What gauge do I need? → Range about twice the test pressure, never under 1.5× or over 4× (UG-102), calibrated.
6. When is a pneumatic test allowed and at what pressure? → Only where water can't be used; 1.1 × MAWP × LSR (UG-100), inspected at test ÷ 1.1.
7. Must the Authorized Inspector witness it? → Yes, it's a Code hold point.
8. Where does the test pressure go on paper? → The data report and the test record.

**Worked examples**
- Demo deaerator: MAWP 100 psi, LSR 1 → **130 psi** (examined at ≥ 100 psi). Demo boiler: MAWP 150 psi → **225 psi**.
- Gauge at the bottom of a 10 ft vessel: add 10 × 0.433 = 4.3 psi → read 134.3 psi.
- Gauge range for 130 psi: 195 to 520 psi, ideally ~260 psi (a 0–300 psi gauge).
- Hot vessel (existing): 1.3 × 100 × 20,000/16,000 = 162.5 psi.

**Demo**: hydro record per job (pressure, temperature, hold, gauge and calibration date, AI witness). Note to fix the
demo's 0–600 psi gauge (§0.5).

**related**: `/systems/hydrostatic-test`, `/asme/mawp`, `/asme/section-i-vs-iv`, `/ibr/registration-documents`, `/industries/boiler-pressure-vessel-manufacturing`.

**description**: keep (160).

**Fix**: none in text; calculator hint for bolting exclusion.

### asme/joint-efficiency

**Questions**
1. What is joint efficiency? → The factor E for a welded joint in the thickness formulas, set by joint type and radiography (Table UW-12).
2. What are the E values for a double-welded butt joint? → 1.00 full RT, 0.85 spot, 0.70 none.
3. What is the difference between joint type and joint category? → Type is the weld's form (1 to 8); category (A–D) is where it sits.
4. When is full radiography mandatory? → Lethal service, butt welds thicker than UCS-57's limit (1¼ in for P-No. 1), unfired steam boilers over 50 psi, and wherever E = 1.0 is taken (UW-11(a)).
5. What E does a seamless shell or head get? → 1.0 with Cat B joints spot radiographed per UW-11(a)(5)(b), otherwise 0.85 (UW-12(d)).
6. Is full RT worth it? → A cost question: examination cost vs steel saved.
7. Can UT replace RT? → Division 1 allows UT in place of RT under conditions (cite UW-11(a)(7) / Code Case 2235 history, verify 2025 wording).

**Worked example**: 48 in, 150 psi, S 20,000, CA ⅛: E 1.0 → 0.307 in; 0.85 → 0.339 in; 0.70 → 0.385 in
(3,618.75 / (14,000 − 90) = 0.2602 + 0.125). Plate steps ⅜ → 7/16 in when RT is dropped.

**Demo**: weld map records category and type per seam and the RT extent (spot for the vessel, full for the boiler).

**related**: `/systems/joint-efficiency`, `/asme/shell-thickness`, `/asme/section-v`, `/services/material-traceability`, `/industries/boiler-pressure-vessel-manufacturing`.

**description**: keep (157).

**Fix**: add the UT-for-RT question only once the 2025 paragraph is confirmed.

### asme/pwht

**Questions**
1. When is PWHT required by ASME? → By P-number and thickness under Table UCS-56-1; for P-No. 1 it is not mandatory up to 1¼ in, or 1½ in with 200 °F preheat (Note (2)(a), verify), and is required above.
2. What temperature and time for carbon steel? → 1,100 °F minimum; 1 h per inch up to 2 in (15 min minimum), longer above.
3. When does service require PWHT regardless of thickness? → Lethal service (UW-2), and owners' specs for caustic, amine and wet H₂S.
4. What heating and cooling rates are allowed? → Above 800 °F, heating ≤ 400 °F/h ÷ thickness in inches and cooling ≤ 500 °F/h ÷ thickness (UCS-56(d)).
5. Can a vessel be PWHT'd in sections or locally? → Yes under UW-40 rules.
6. Does PWHT change the WPS? → Yes, it's an essential variable (QW-407.1): a PQR in the same condition is needed.
7. Does PWHT help with impact testing? → It can earn a temperature credit (UCS-68(c), verify).
8. What is the boiler rule? → Section I's Table PW-39 (the demo cites PW-39 exemptions).

**Worked example**: 1½ in P-No. 1 shell: hold 1.5 h at ≥ 1,100 °F; max heating rate above 800 °F = 400/1.5 = 267 °F/h;
cooling 500/1.5 = 333 °F/h.

**Demo**: PWHT record with basis ("P-No. 1 at ½ in nominal thickness, below 1½ in") and, where done, temperature,
hold, rate and chart.

**related**: `/asme/essential-variables`, `/asme/impact-testing`, `/systems/procedure-qualification-record`, `/industries/boiler-pressure-vessel-manufacturing`, `/ibr/registration-documents`.

**description** (156): "ASME PWHT under UCS-56-1: P-No. 1 temperature, hold time and thickness exemption, service-driven PWHT, heating and cooling rates, WPS effects."

**Fix**: the answer says "Table UCS-56"; the body says "UCS-56-1". Use **UCS-56-1** throughout. State the 1¼/1½ in rule
exactly once checked.

---

## Batch 7: materials and code changes

### asme/section-ii

**Questions**
1. What is the difference between SA-516 and A516? → SA-516 is ASME's adoption of ASTM A516 in Section II Part A; a Code part must be certified to SA (or an identical ASTM edition the Code accepts).
2. What are Parts A, B, C and D? → Ferrous specs, nonferrous specs, filler metals (SFA), properties.
3. Where do allowable stresses come from? → Part D Table 1A (ferrous) and 1B (nonferrous) for Div. 1 and Section I; Tables 5A/5B for Div. 2.
4. Is a dual-certified MTR acceptable? → Yes, "SA-516/A516" meets both.
5. Which Part D volume do I buy? → Customary or Metric (ASME sells both, BPVC.II.D.C and BPVC.II.D.M).
6. What if the MTR shows only the ASTM number? → See the MTR guide; the AI decides (UG-10 routes).
7. What are SFA specifications? → Part C's filler metal specifications (SFA-5.1, 5.18 …), mirrored from AWS A5.

**Sources**: ASME 2025 BPVC page (Parts A, B, C, D customary and metric listed); required code books page.

**Demo**: MTRs by heat number in the package; illustrative SA-516-70 stress table in calc sheets.

**related**: `/asme/mtr`, `/systems/heat-number`, `/systems/material-test-certificate`, `/notes/plate-remnants-back-into-stock`, `/services/material-traceability`.

**description**: keep (142).

**Fix**: none found.

### asme/impact-testing

**Questions**
1. When is impact testing required for an ASME vessel? → When a carbon or low-alloy steel part's MDMT is colder than its UCS-66 exemption allows.
2. What are curves A to D? → Material toughness groups in Figure UCS-66; D is best (e.g. normalized fine-grain plate).
3. What is governing thickness? → The thickness used on the curve, per UCS-66(a), e.g. the thicker member at a butt joint.
4. Can lower stress reduce the requirement? → Yes, Figure UCS-66.1 lowers the exemption temperature by the stress ratio.
5. What is the UG-20(f) exemption? → P-No. 1 Group 1 or 2 material, limited thickness, hydro tested per UG-99(b) or (c), −20 °F to 650 °F, no shock or cyclic loading.
6. What energy must Charpy tests meet? → Figure UG-84.1 by strength and thickness.
7. Do welds need testing too? → Yes, and the WPS brings in supplementary essential variables.
8. Does PWHT help? → UCS-68(c) credit when PWHT isn't otherwise required (verify).

**Worked example**: keep qualitative; one numeric case only after checking the 2025 Figure UCS-66 by hand: e.g. ½ in
SA-516-70 normalized (Curve D) is exempt to about −55 °F; as-rolled (Curve B) to about +7 °F. **Verify both values
against the 2025 figure before use** (from memory, not opened).

**Demo**: MDMT on U-1A. No impact-test records in the demo; don't claim.

**related**: `/systems/mdmt`, `/asme/mawp`, `/asme/pwht`, `/systems/material-test-certificate`, `/industries/boiler-pressure-vessel-manufacturing`.

**description**: keep (157).

**Fix**: none found.

### asme/heads

**Questions**
1. What is a 2:1 ellipsoidal head? → A head whose depth is a quarter of the diameter; it needs about the shell's thickness: t = PD/(2SE − 0.2P) (UG-32(d)).
2. What is a torispherical (F&D) head? → A spherical crown with a knuckle; the standard ASME F&D (L = D, r = 6% L) uses t = 0.885PL/(SE − 0.1P) (UG-32(e)).
3. What is an 80:10 head? → Crown 80% of D, knuckle 10%: designed with Mandatory Appendix 1-4's factor M, not the 0.885 formula.
4. Hemispherical head thickness? → t = PL/(2SE − 0.2P), about half the shell's (UG-32(f)).
5. Which head is cheapest? → Usually the 2:1 ellipsoidal overall; F&D is cheapest to form but thickest.
6. What thickness do I order? → Minimum thickness after forming ≥ required + corrosion.
7. What E for a seamless head? → Depends on the head-to-shell joint's RT (see joint efficiency).
8. Flat heads? → UG-34, far thicker.

**Worked example**: 48 in ID, 150 psi, S 20,000, E 1.0 (seamless): 2:1 → 7,200 / 39,970 = **0.180 in**; F&D (L = 48) →
6,372 / 19,985 = **0.319 in**; hemi (L = 24) → 3,600 / 39,970 = **0.090 in**; each + CA 0.125. 80:10: L = 38.4,
r = 4.8, M = ¼(3 + √8) = 1.457, t = PLM/(2SE − 0.2P) = 150 × 38.4 × 1.457 / 39,970 = **0.210 in** (Appendix 1-4(d),
verify formula form in 2025).

**Demo**: none specific; skip the demo paragraph or point to calc sheets.

**related**: `/asme/shell-thickness`, `/asme/joint-efficiency`, `/notes/plate-remnants-back-into-stock`, `/industries/boiler-pressure-vessel-manufacturing`.

**description** (152): "ASME UG-32 heads compared: 2:1 ellipsoidal, F&D and 80:10 torispherical, hemispherical, with formulas, a worked 48 in example and how to order."

**Fix**: the current description names "ASME 80-10" but the body never covers it. Add question 3 or drop it.

### asme/essential-variables

**Questions**
1. What are essential variables in ASME welding? → Conditions whose change beyond the PQR needs a new PQR (QW-250 tables).
2. Which changes need a new PQR? → P-number, F-number, A-number, thickness out of range, adding or removing PWHT, preheat down >100 °F, process change.
3. What are supplementary essential variables? → Variables that count only when toughness testing is required: Group number, heat input increase, etc.
4. What can change by revising the WPS only? → Nonessentials: groove design, technique, cleaning.
5. What thickness range does a PQR qualify? → Per QW-451.1 by coupon thickness, typically up to 2T; 1½ in and over to 8 in.
6. What are welder essential variables? → QW-350: process, position, backing, F-number, diameter and deposit thickness.
7. How do I keep WPS ranges right? → A PQR register with ranges worked once.

**Worked example**: PQR on ¾ in P-1 with no PWHT: WPS may cover 3/16–1½ in, no PWHT; adding PWHT for a 2 in job needs a
new PQR (thickness and PWHT both).

**Demo**: WPS list shows thickness range and PWHT per WPS.

**related**: `/asme/wps-pqr-wpq`, `/systems/procedure-qualification-record`, `/asme/pwht`, `/services/material-traceability`, `/industries/boiler-pressure-vessel-manufacturing`.

**description**: keep (141).

**Fix**: verify supplementary-essential examples against the 2025 Section IX: the Sperko article indicates QG and QW
changes we couldn't read; don't claim the list is current until checked.

### asme/editions

**Questions**
1. When does the ASME 2025 Edition become mandatory? → It was published 1 July 2025 and became mandatory 1 January 2026, six months later.
2. When is the next edition? → 2027 (odd years); NBIC on the same July odd-year cycle.
3. Which edition applies to my vessel? → The one agreed for the job, normally mandatory at contract, unless the jurisdiction fixes one.
4. Do states require a specific edition? → Some do: NBBI's 2026 Synopsis lists e.g. Ohio 2023, Illinois 2023, Michigan 2019, Texas "Current"; Pennsylvania's regulation still names 2004.
5. Do I have to buy new books each edition? → Yes for certificate holders; ASME's FAQ says the latest edition becomes mandatory six months after publication.
6. What is a code case? → An approved alternative, effective on approval and without expiry, published in supplements.
7. Do code cases need the jurisdiction's acceptance? → Often: the Synopsis tabulation has a Code Cases column by state.
8. What is an interpretation? → ASME's answer on what the Code says, not a change.
9. Do welding qualifications expire with an edition? → No.

**Sources**: ASME 2025 BPVC page; ASME FAQ; ASME code cases page; NB registration page; NB NBIC page; NB editions PDF;
34 Pa. Code ch. 3a; handbook.

**Quotes**
- [handbook] keep both existing checks.
- [new doc: asme-faq] "Yes, the latest edition/addenda becomes mandatory six months after publication."
- [new doc: asme-code-cases] "Code cases are effective immediately upon ASME approval and do not expire."
- [new doc: nb-nbic] "The NBIC is published as a new edition in July of odd numbered years (2021, 2023, 2025, 2027)."
- [new doc: pa-3a] "‘‘The Boiler and Pressure Vessel Code,’’ 2004 edition and its published cases and interpretations issued by ASME."

**Code case supplement dates** (ASME page): 2025 cycle supplements 1–7 from 9/20/2025 to 12/12/2026.

**related**: `/asme/state-boiler-laws`, `/asme/data-reports`, `/industries/boiler-pressure-vessel-manufacturing`, `/services/custom-erp-crm`.

**description** (156): "ASME Code editions: 2025 dates, the 2027 cycle, which edition a job uses, state edition rules, code cases, interpretations and new books."

**Fixes**
- "Many are later written into the Code itself; some are annulled": ASME says code cases "do not expire". Keep "may be
  annulled by ASME" only if sourced; otherwise say they stay usable until annulled or incorporated (cite the page).
- Edition table: add NBIC 2025 and B31 editions are separate (B31.1 now 2026).

---

## Batch 8: certification and jurisdiction

### asme/quality-control-manual

**Questions**
1. What should an ASME quality control manual include? → Every QCS element the Code lists for the scope (authority, organization, drawings and calcs, material control, examination program, nonconformities, welding, NDE, heat treatment, calibration, records, forms, AI access).
2. Does it have to follow ASME's format? → No: the handbook says the manual need not follow the guide's format.
3. Must it be in English? → Yes, the written description and supporting documents.
4. What is the review checklist? → ASME's "Guide for ASME Review Teams" checklist; the applicant cross-references each element to the manual.
5. Can I buy a template? → You can, but it must describe your shop; ASME doesn't consult on QC systems.
6. Do I need to send the manual in advance? → Answered in ASME's FAQ scheduling section (open and quote before use).
7. What is CA-1? → ASME's Conformity Assessment Requirements, now a required book for every BPV certificate; check where the 2025 Edition puts QC system requirements (Div. 1 Mandatory Appendix 10 vs CA-1) before writing.
8. Do I need a product in process for the review? → No, a mock-up or current work, but implementation must be shown.

**Quotes**
- [handbook] keep both existing checks.
- [handbook] "The written description and documentation which support understanding of the program must be in English."
- [handbook] "The Applicant is required to complete the “Guide for ASME Review Teams for Review of Applicants\" checklist applicable to the requested Certificate(s)." (normalised quotes match)
- [new doc: asme-faq] "ASME does not provide consulting services to develop a Quality Control System that will meet the requirements of the ASME Boiler and Pressure Vessel Code."
- [new doc: asme-books] "CA-1 Conformity Assessment Requirements"

**Demo**: NCR workflow with QC verification before close, hold points, heat-lot holds, incoming inspection (failed stay
tube lot + NCR on AB-1005): the evidence a manual's "nonconformities" and "examination" elements point to.

**related**: `/asme/u-stamp`, `/asme/authorized-inspector`, `/services/material-traceability`, `/services/operational-intelligence`, `/industries/boiler-pressure-vessel-manufacturing`.

**description** (151): "What an ASME quality control manual must cover for a U or S certificate, the review checklist, English-only rule, CA-1, and how the joint review tests it."

**Fix**: "Mandatory Appendix 10 in recent editions": verify against the 2025 VIII-1 now that CA-1 is a required book.

### asme/national-board-registration

**Questions**
1. What is National Board registration? → Filing a stamped item's data report with NBBI, which keeps it permanently; the nameplate carries the NB mark.
2. Is registration required? → By many jurisdictions; e.g. Pennsylvania's rules require the NB registration number on the stamping (34 Pa. Code §3a.21(b)).
3. How does a manufacturer become authorized to register? → Meet NB-264; authorization is free, each item has a fee.
4. Paper or electronic? → Either: originals on paper or EDT.
5. Which forms must I use? → The 2025 forms since 1 January 2026; outdated forms are returned.
6. What is the NBIC? → The National Board Inspection Code, four Parts: installation, inspection, repairs and alterations, pressure relief devices; adopted into law by most US and Canadian jurisdictions.
7. What is an R stamp and what does it cost? → NBBI's certificate for repairs and alterations; it needs an AIA agreement and current NBIC; $1,150 per three years plus $150 stamp loan for new holders.
8. What changed in the 2025 NBIC? → Among others, "Quality System" became "Quality Management System" throughout, and new supplements on classifying repairs and engineered repairs.
9. Can a vessel be registered after it's built? → NB-406 covers registration after fabrication (listed on the NB page; open before detailing).

**Quotes**
- [handbook] keep existing check.
- [new doc: nb-registration] "There is no charge to become authorized to register, but there is a fee for each item registered."
- [new doc: nb-registration] "Registration represents the culmination of a three-step process: the design and construction of an item in accordance with the ASME Code, inspection by an NBBI Commissioned Inspector, and final documentation certifying compliance with the ASME Code."
- [new doc: nb-nbic] "The NBIC is adopted into law by most US and Canadian jurisdictions."
- [new doc: nb-nbic-2025] "“Quality System” has been changed to “Quality Management System” throughout."
- [new doc: nb-r-stamp] "The certificate fee for the R Certificate of Authorization is $1150 USD for a three-year period."
- [new doc: pa-3a] "A boiler or unfired pressure vessel built to the ASME Code must be stamped with the appropriate ASME symbol, the manufacturer’s information in accordance with stamping requirements of the code of construction, and its National Board registration number."

**Demo**: NB number on the package and data report. No EDT filing.

**related**: `/systems/nbic`, `/asme/data-reports`, `/asme/state-boiler-laws`, `/industries/boiler-pressure-vessel-manufacturing`, `/services/document-extraction`.

**description** (157): "National Board registration and the NB mark, NB-264, EDT, 2025 forms, the NBIC's four Parts and the R, VR, NR and T/O programs with R stamp fees."

**Fixes**
- "within 30 days of certification": keep, cited to NB-264 Rev. 19 (quote under data-reports).
- pageID=102 source mislabeled; add pageID=115, ID=160, pageID=4.
- R-1/R-2: confirmed on the NBIC report forms page: R-1 "Report of Repair" (NB-66), R-2 "Report of Alteration" (NB-229), both filable through EDT; R-3 parts fabricated by welding, R-4 supplementary sheet. Quote [new doc: nb-forms] "The NBIC R-1 and R-2 forms are available through EDT."

### asme/section-v

**Questions**
1. What is ASME Section V? → The methods for nondestructive examination; acceptance comes from the construction code.
2. Which Article covers which method? → Art. 2 RT, 4 UT (incl. PAUT, TOFD), 6 PT, 7 MT, 9 VT, 10 leak testing.
3. Who decides if a weld passes? → The construction section: UW-51 (full RT), UW-52 (spot) in Div. 1.
4. How are NDE personnel qualified? → To the employer's written practice, usually ASNT SNT-TC-1A (or the code's required standard).
5. Is digital radiography allowed? → Yes, Article 2 covers film and digital.
6. Does Section V cover welder RT qualification? → The method, yes; Section IX QW-191 sets acceptance.

**Sources**: ASME Section V product page (2025, linked from the 2025 BPVC page).

**Demo**: NDE records (method, extent, welds, examiner, level, date, result) and the weld map's NDE column.

**related**: `/asme/joint-efficiency`, `/asme/welder-qualification`, `/services/document-extraction`, `/industries/boiler-pressure-vessel-manufacturing`.

**description**: keep (146).

**Fix**: none found.

### asme/section-xiii

**Questions**
1. What is ASME Section XIII? → The Code's rules for overpressure protection devices, first published 2021; current edition 2025.
2. Why did relief valve rules move? → So device makers work to one book; construction sections keep the requirement to protect.
3. Where is UG-125 now? → Division 1 replaced UG-125–UG-137 with UG-150–UG-156 pointing to Section XIII (verify numbers in 2025).
4. Which stamps does Section XIII use? → V, HV, UV, UD, UV3, UD3, TV, TD.
5. Who reviews a valve maker? → An ASME Designee appointed by the National Board; no AIA agreement.
6. How fast must capacity tests happen? → Scheduled within 90 days of the review, completed within six months.
7. Where are relief valves tested? → At ASME-accepted testing laboratories (ASME publishes the list).
8. Who repairs relief valves in service? → VR stamp holders under NBIC Part 4.

**Quotes**
- [handbook] keep existing check.
- [handbook] "For Pressure Relief Devices (V, HV, UV, UV3, UD, TV and TD) Certificates" (heading line) and "ASME will notify the ASME Designated Organization, The National Board of Boiler and Pressure Vessel Inspectors, to appoint an ASME Designee to conduct the review."
- [new doc: asme-bpv-cert] "UV - Pressure Vessel Pressure Relief Valves"

**Sources**: ASME Section XIII product page (2021/2023/2025 editions); ASME BPV certification page; handbook; NB NBIC page.
Replace the 2021 BPVC page source with the Section XIII product page.

**Demo**: safety valve size, set pressure and capacity on the P-2 record. Nothing more.

**related**: `/asme/mawp`, `/asme/stamps`, `/systems/nbic`, `/industries/boiler-pressure-vessel-manufacturing`.

**description**: keep (158).

**Fix**: cite the Division 1 paragraph range now in force (UG-150+), not only "UG-125" history.

### asme/state-boiler-laws

**Questions**
1. Is the ASME Code required by law in the US? → Not federally; states, some cities and Canadian provinces make it law, each for its own scope.
2. Which edition does each state require? → NBBI's 2026 Synopsis table (below), with its caveat to confirm with the chief inspector.
3. Which states don't require the U stamp? → NBBI's 2024 stamping table lists no ASME stamp for Idaho, Miami and Miami-Dade, and no U among required stamps for Florida, Louisiana, Montana, New Mexico, South Dakota and West Virginia; Wyoming lists only U, U2, U3, UV.
4. Do pressure vessels need National Board registration? → Often; NBBI's stamping table lists NB for e.g. Arizona, North Dakota, Washington, West Virginia; Pennsylvania requires the NB number on the stamping.
5. Who leads a shop's joint review in my state? → The jurisdiction in AK, DE, HI, LA, MN, NE, OK, TX, WA; ASME in ID, WY, PR, VI and Canada; the National Board elsewhere.
6. How does Canada work? → Each province registers designs (CRN) under its own act, generally via CSA B51 (cite the province before keeping "every province").
7. How do I check a jurisdiction? → NB-370 Synopsis page per jurisdiction, then the chief inspector.

**Edition table to publish** (from `code_edition.pdf`, "2026 National Board Synopsis", ASME edition column; NBIC in brackets):
Alabama Current (Current); Alaska 2013 (Current); Arizona 2007 (2019); California 2023 (Current; 2004 for refineries);
Colorado 2023 (2023); Delaware 2019 (Current); Florida 2017 (2017); Georgia 2019 (2021); Illinois 2023 (2023);
Indiana 2015 (2019); Iowa 2021 (2021); Kansas 2007 (2007); Louisiana 2004 (2004); Maryland 2019 (2019);
Massachusetts 2021 (2021); Michigan 2019 (2019); Minnesota Current (Current); Missouri 2019 (2019); New Jersey 2015
(Current); New York Current (—); North Carolina Current (Current); North Dakota 2025 (2025); Ohio 2023 (2023);
Oklahoma Current (Current); Oregon 2023 (2023); Pennsylvania 2010 (2011); Rhode Island 2025 (2025); Texas Current
(Current); Washington Current (Current); Wisconsin 2010 (2011); Wyoming 1968 (—). Note in text: Pennsylvania's own
rule (34 Pa. Code §3a.1) still defines the ASME Code as the 2004 edition, so the Synopsis and the regulation disagree:
the regulation wins; ask the Department. Most of these laws govern installation and inspection; a new item built to
the current edition is normally accepted, but confirm.

**Quotes**
- [handbook] keep both existing checks; add "(2) Canada: All provinces." only with the ASME line it belongs to.
- [new doc: nb-synopsis] "Synopsis data is subject to change. Users are advised to consult the jurisdiction’s chief inspection officer to avoid misinterpretation and ensure compliance with regulatory requirements."
- [new doc: pa-3a] "The Department adopts and incorporates by reference the following codes:"
- [new doc: pa-3a] §3a.21(b) sentence (as in national-board-registration).
- [new doc: nb-about] "The National Board members are the chief boiler inspectors representing most U.S. states and provinces/territories of Canada, as well as many major cities in the United States."

**State rules read (5 Nov 2026), one short section each on the page**
- **Ohio**: OAC **4101:4-3-01** (effective 1 Jul 2024; the boiler rules are chapters 4101:4-1 to 4101:4-10, not the
  1301:7 Fire Code) adopts BPVC Sections I–XI and Code Cases at the **2023** edition, B31.1 2022, NBIC 2023, NB-263
  2023. Quote [new doc: oh-4101-4-3-01] "The board of building standards adopts existing published standards by year of issue as shown in \"Table 4-3-01\" of the Administrative Code as well as amendments, supplements, and addenda subsequently published prior to issuance of the next edition by the same authority in accordance with section 4104.02 of the Revised Code."
- **Michigan**: R **339.5204** (effective 3 May 2023) applies to "A boiler, blow down vessel, and expansion tank" and
  adopts BPVC Sections I, II, III, IV, V, VIII, IX, X, XI at the **2019** edition and B31.1 2018. Quote [new doc: mi-339-5204] "ASME boiler and pressure vessel code, section I, II, III, IV, V, VIII, IX, X, XI, 2019 edition". Note: the rule's scope names boilers, blowdown vessels and expansion tanks, not pressure vessels in general.
- **Texas**: 16 TAC **§65.2(4)** defines ASME with no year, i.e. as adopted by ASME (Synopsis: "Current"). Quote [new doc: tx-65-2] "ASME--The American Society of Mechanical Engineers Boiler and Pressure Vessel Code, code cases, and interpretations adopted by the council of the society." Texas's program is the Board of Boiler Rules (§65.100: boilers and appurtenances); don't claim Texas regulates unfired vessels without a source.
- **California**: 8 CCR **§453** defines the ASME Code with no edition; **§454(a)** requires new air tanks to be ASME-stamped and, except UM vessels, National Board registered (§455(a) the same for CNG/LNG tanks over 15 psig). Quote [new doc: ca-453-454] "all air tanks for new installations shall be constructed, inspected and stamped in compliance with the ASME Code". The Synopsis lists California at 2023: say "per NBBI" and not as the regulation's own words.
- **Pennsylvania**: as above (2004 edition in §3a.1; NB number in §3a.21(b)).
- Remove the old suggestion to cite §65.100 (it is the Board's purpose clause) and OAC 1301:7-7 (Fire Code).

**Demo**: the demo company is in Ohio, whose rule adopts the 2023 edition plus later supplements; the demo files its
package as 2025. Say "confirm the edition with Ohio's Division of Industrial Compliance", not that 2025 is accepted.

**related**: `/asme/national-board-registration`, `/asme/editions`, `/asme/buying-from-india`, `/industries/boiler-pressure-vessel-manufacturing`, `/manufacturing/erp-requirements-checklist`.

**title** stays; **description** (156): "Which US states and Canadian provinces require the ASME Code, which edition each names (2026 NB Synopsis), stamps, NB registration and joint reviews."

**Fixes**
- "every Canadian province" adopts the Code: NBBI's tabulation shows Québec marked "N" for most sections; reword.
- "This page doesn't list each state's rules": now it can, from the Synopsis, with the caveat.

---

## Batch 9: bridge pages and the hub

### asme/bpvc-sections

**Questions**
1. What are the sections of the ASME BPVC? → Thirteen: construction sections I, III, IV, VIII, X, XII; reference II, V, IX, XIII; recommended practice VI, VII; in-service XI.
2. Which sections does a pressure vessel shop need? → VIII-1, II (A, B, C, D), V, IX, plus CA-1 for certification (ASME's required code books).
3. Which sections does a boiler shop need? → I, II, V, IX, B31.1 and CA-1 for an S certificate.
4. Are photocopies accepted? → No: reproduced or unauthorized copies aren't accepted for certification.
5. What do UG, UW, UCS, PG, QW mean? → Part prefixes inside each section.
6. How often is the Code published? → Every two years, mandatory six months later.
7. What does each book cost? → ASME lists e.g. VIII-1 at $775–$1,050 and Section I at $540–$675 for the 2025 print books.

**Quotes**
- [handbook] keep existing check.
- [handbook] "Reproduced/unauthorized documents from any source are not accepted for ASME Certification"
- [new doc: asme-books] "Later editions of referenced standards will be required if and when referenced as \"Latest Edition\"."

**related**: `/asme/section-viii`, `/asme/editions`, `/industries/boiler-pressure-vessel-manufacturing`, `/services/custom-erp-crm`.

**description**: keep (156).

**Fix**: add CA-1 and B31.1 to "which sections a shop needs" (S, PP, A, E, M certificates require B31.1 per ASME).

### asme/b31-1-vs-b31-3

**Questions**
1. What is the difference between B31.1 and B31.3? → B31.1 power piping (power plants, boiler external piping); B31.3 process piping (refineries, chemical, pharma) with fluid service categories.
2. What are the current editions? → B31.1-2026 and B31.3-2024 (ASME store, 5 Nov 2026).
3. What is boiler external piping? → Piping from the boiler to the first stop valve and beyond as Section I defines it; designed to B31.1, built by an S, A or PP holder.
4. What test pressure does each use? → B31.1: 1.5 × design (para. 137); B31.3: 1.5 × design × stress ratio (para. 345.4.2), verify paragraph numbers in current editions.
5. Do both use Section IX? → Yes.
6. Is there a B31.1 data report? → Yes: ASME publishes CC-1 and CC-2 certificates of compliance for B31.1 (forms page); B31.3 has none.
7. Who picks the B31.3 fluid category? → The owner.
8. Can one WPS serve vessels and piping? → Yes where the variables fit both codes.

**Quotes**
- [new doc: asme-forms] "Certificate of Compliance for the Complete Piping System"
- [new doc: asme-books] "B31.1 Power Piping" (listed for S/PP certificates)

**Sources**: B31.1 and B31.3 product pages; forms page; required code books page.

**related**: `/asme/section-i-vs-iv`, `/asme/hydrostatic-test`, `/asme/section-ix`, `/industries/boiler-pressure-vessel-manufacturing`, `/manufacturing/job-shop-erp`.

**description** (153): "ASME B31.1 power piping vs B31.3 process piping: 2026/2024 editions, boiler external piping, fluid categories, hydrotest, CC-1 forms and welding."

**Fixes**: state the editions; add CC-1/CC-2. No evidence found that BEP moved out of B31.1 (search 5 Nov 2026).

### asme/asme-vs-ibr

India page; IBR quotes already checked. Batch 9 work: question H2s, the US side corrected.

**Questions**
1. Does IBR accept ASME boilers and materials? → In defined ways (regulations 3(4), 3(5), 4, 5, 30, 71, 7), quoted from the Gazette.
2. Is an ASME-stamped boiler legal in India? → It must still be registered under IBR 2026.
3. Are pressure vessels under IBR? → No; unfired vessels for compressed gas fall under PESO's SMPV(U) Rules.
4. Can an Indian shop hold both ASME and IBR approvals? → Yes, with two welder qualifications and two report sets over the same records.
5. Who inspects in each? → AI from an ASME-accredited AIA vs IBR Inspecting Authority / Competent Person.
6. Which US rules apply to an IBR boiler shipped to the US? → The state's law and ASME stamping; IBR certification doesn't replace it.

**related** (keep existing three, add): `/asme/buying-from-india`, `/notes/ibr-statutory-folder-from-bom`.

**Fix**: none on the US side; the "U.S. state law" row should link `/asme/state-boiler-laws`.

### asme/buying-from-india

**Questions**
1. Can an Indian manufacturer build an ASME U-stamped vessel? → Yes, with a U certificate and an AIA; ASME has certified companies in 74 countries.
2. How do I check an Indian shop's certificate? → ASME's Certificate Holder Search (filters by country and certificate).
3. Who is the Authorized Inspector for an Indian shop? → An AIA employee; most AIAs work worldwide.
4. Can the shop register with the National Board? → If authorized under NB-264; check before ordering if your state requires NB.
5. What does IBR add for a boiler? → Regulation 4: export inspection to a foreign code, Form I Part A.
6. Which documents should arrive with the vessel? → Data report, calcs, drawings, MTRs, WPS/PQR/WPQ, continuity, NDE, PWHT, hydro, in English.
7. Who leads the joint review for a shop outside the US? → Not stated for India in the handbook; ask ASME (ca@asme.org).
8. What does a state with its own edition mean for an import? → Put the state's edition and NB requirement in the PO.

**Quotes**
- [new doc: asme-faq] "Most AIAs operate worldwide."
- [new doc: asme-faq] "there are now 74 countries in which companies have been certified" (FAQ text; check exact apostrophe/casing in the snapshot).
- [ibr-2026] keep existing check.

**Demo**: the US build prints the same record package an Indian exporter would send (and the India build prints the IBR
folder). The real client runs the India build; say so plainly.

**related**: `/asme/state-boiler-laws`, `/asme/national-board-registration`, `/asme/asme-vs-ibr`, `/industries/boiler-pressure-vessel-manufacturing`, `/notes/customer-portal-one-order-every-department` (the demo's Customer role shows live order progress).

**description**: keep (142).

**Fix**: none found.

### `/asme` hub (`src/app/asme/page.tsx`)

- Closing block (roadmap rule): link `/industries/boiler-pressure-vessel-manufacturing` (US version shown to North
  America) and `/services/material-traceability`, one sentence each, plus the demo link.
- Lead: keep; add the edition line already driven by `ASME_EDITION` (2025, mandatory 1 Jan 2026) and "next edition 2027".
- Group pages by the new sibling groups (code basics, welding, design and test, materials and changes, certification
  and jurisdiction, bridge) so the end-of-guide sibling list (roadmap "Sibling list by group") matches the batches.
- Tools block: add the UW-12 selector inside the shell tool, not a fourth tool.
- Description (current 151) fine; title absolute "ASME BPVC guide: sections, stamps, welding and calculators" (57).
- Orphan check: `/asme/bpvc-sections` is an orphan today; the related lists above give it links from section-viii,
  section-i-vs-iv (existing) and editions.

---

## Summary: biggest gaps and errors found

**Biggest gaps**
1. **State law is empty.** `state-boiler-laws` lists no state; NBBI's 2026 Synopsis gives the ASME and NBIC edition
   for every jurisdiction and the 2024 table gives the required stamps. That is the page's main buyer question.
2. **Only one checkable source.** The quote checker knows only the 2023 handbook, so most new facts (price guide, FAQ,
   NB registration, code cases, R stamp, PA rules) can't be checked until 20 text snapshots are added (§0.2).
3. **No worked numbers** on mawp, heads, joint-efficiency, pwht, hydro gauges; the examples above are checked against
   `asme-calc.ts`.
4. **CA-1 is missing everywhere.** ASME now lists "CA-1 Conformity Assessment Requirements" as a required book for
   every BPV certificate; no page mentions it.
5. **Calculator gaps**: one joint efficiency for both shell formulas, MAWP ignores the longitudinal case, sphere
   limit t ≤ 0.356R missing; mawp and joint-efficiency have no tool at all.
6. **Questions forums ask most** are missing: "does a vessel under 15 psi need a U stamp", "can I build to Section
   VIII without the stamp", "how do I check a supplier's stamp", "what edition does my state need".

**Factual errors and out-of-date items**
1. `section-ix`: source URL is AWS's **UAT staging host** (`uatsitecore.aws.org`); use `www.aws.org/.../2025/july/...`.
2. `stamps`, `authorized-inspector`, `national-board-registration`: source titled "Accreditation programs …" points to
   NBBI's **About Us** page (pageID=102); accreditation is pageID=115.
3. `data-reports`, `national-board-registration`: "within 30 days of certification" is right but cites the wrong
   page; the rule is in NB-264 Rev. 19.
4. `data-reports` and the demo: U-1A is now for single-chamber vessels **shop- or field-fabricated**; metric forms are
   "no longer included in Code".
5. `editions`: code cases "some are annulled" conflicts with ASME's "effective immediately … and do not expire".
6. `authorized-inspector`: the commission is now named the National Board **Authorized Inspector Commission (AI)**,
   card renewed annually.
7. `state-boiler-laws`: "every Canadian province" adopts the Code; NBBI marks Québec "N" for most sections.
8. `b31-1-vs-b31-3`: no edition named; **B31.1-2026** is now current, B31.3-2024.
9. `heads`: description promises 80-10 heads the body doesn't cover.
10. `pwht`: "Table UCS-56" vs "UCS-56-1" in the same page.
11. `p-numbers`: P-numbers aren't listed in Section II Part D.
12. `mawp`/`section-xiii`: overpressure limits cited without the post-2021 Division 1 paragraph (UG-150 series).
13. `welder-qualification`: "pipe only above a large diameter" should say 24 in (610 mm) once checked.
14. Pennsylvania: its regulation still adopts the **2004** Code while NBBI's Synopsis reports 2010/2011; flag both.
15. Demo (shanti-ops, not these pages): U-1A title outdated; 0–600 psi gauge on a 130 psi hydro exceeds UG-102's 4×.

## Deferred (not doable in a plan; owner and trigger named)

1. **Source snapshots and checker keys** (§0.2): save the 26 text snapshots in the ASME sources folder and add their
   keys to `DOCS` in `scripts/check-asme-quotes.mjs`. Owner: whoever starts batch 4, as its first step (it edits the
   checker, which this plan may not touch).
2. **Code paragraph checks** marked "verify" below: need the 2025 Section VIII-1, IX and I books or the named
   reviewer (`docs/asme-hub-plan.md` §2). Owner: Pujan / reviewer, before each batch goes live.
3. **Calculator changes** (second E, sphere limit, MAWP lower of two cases, UW-12 selector, bolting hint): code work
   in `src/lib/asme-calc.ts` and `AsmeTools.tsx` with `scripts/asme.check.ts`. Owner: batch 6.
4. **Official text for Ohio, Michigan, Texas**: re-open on the state sites (they refused automated access today) and
   confirm the LII copies. Owner: batch 8.
5. **Reddit questions** (r/Welding, r/engineering): Reddit blocks automated search; check by hand if wanted. Low value
   given Eng-Tips and PAA cover the same questions.
6. **Demo fixes** (§0.5: U-1A title, hydro gauge range, 2023 vs 2025 labels): shanti-ops `demo-us`, not this repo.

Code-paragraph values quoted from memory in this plan (UCS-66 curve temperatures, QW-461.9 24 in, UG-150 numbering,
UCS-68(c), App. 1-4 80:10 form, UT-for-RT paragraph) are marked "verify": check each against the shop's 2025 books
or the named reviewer before publishing.
