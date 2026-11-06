# Construction batches 2 and 3: research plan

Written 5 Nov 2026 for batches 2–3 of [the content roadmap](../content-roadmap.md). Every source URL below was opened
on 5 Nov 2026; the text read is saved in the shared notes folder
(`side-session-notes/local_3971fe70-…/construction-sources-2026-11-05/`, 34 files). Copy the ones a page quotes into
`~/Developer/FOLDER SAMPLE - FOR APP/Construction/sources` and add their keys to `DOCS` in
`scripts/check-construction-quotes.mjs` (new keys are listed per source as `doc:`). Quotes below are copied from those
texts; the existing keys (`far-52.232-5`, `far-52.232-27`, `far-52.243-4`, `cpwd`, `gst-wc`, `it-act-2025`) already
work.

Rules carried from the roadmap: every H2 a buyer's question answered in its first sentence; facts only from the
sources cited; improve the existing page before adding one; 3–5 `related:` paths, at least two outside the page's
section (checked by `src/lib/related.ts`). Demo claims follow `structonova-ops` as it is on 5 Nov 2026 (main and
`demo-us`); the construction client is **built, not yet live** (`NOT_LIVE` in `src/lib/work.ts`). Anything the demo
lacks is offered as "we'd build it", never shown as done.

Where questions came from: Google "People also ask" phrasing for each term, Levelset's payment-help Q&A (retainage,
verbal change orders), contractor-accounting articles on WIP and surety review, and CA Club India / TaxTMI threads
(TDS on RA bills, GST on security deposit and retention, mobilisation advance). Reddit didn't come up in search for
these topics; the questions below are the ones those threads ask most often, reworded as H2s.

---

## Sources (opened 5 Nov 2026)

### United States

| Key (`doc:`) | Source | URL | Used on |
|---|---|---|---|
| `far-52.232-5` (exists) | FAR 52.232-5, Payments under fixed-price construction contracts | https://www.acquisition.gov/far/52.232-5 | retainage |
| `far-52.232-27` (exists) | FAR 52.232-27, Prompt payment for construction contracts | https://www.acquisition.gov/far/52.232-27 | retainage |
| `far-32.103` | FAR 32.103, Progress payments under construction contracts (FAC 2026-01, eff. 13 Mar 2026) | https://www.acquisition.gov/far/32.103 | retainage |
| `far-52.243-4` (exists) | FAR 52.243-4, Changes | https://www.acquisition.gov/far/52.243-4 | change orders |
| `far-52.236-2` | FAR 52.236-2, Differing site conditions | https://www.acquisition.gov/far/52.236-2 | change orders |
| `usc-31-3905` | 31 U.S.C. 3905 (Prompt Payment Act, construction) | https://www.law.cornell.edu/uscode/text/31/3905 | retainage |
| `usc-26-460` | 26 U.S.C. 460, long-term contracts | https://www.law.cornell.edu/uscode/text/26/460 | WIP |
| `irs-rp-2025-32` | IRS Rev. Proc. 2025-32 (2026 inflation adjustments) | https://www.irs.gov/pub/irs-drop/rp-25-32.pdf | WIP |
| `sba-994f` | SBA Form 994F, Schedule of Work in Process | https://www.sba.gov/document/sba-form-994f-schedule-work-process | WIP |
| `tx-pr-28` | Texas Property Code ch. 28 (prompt pay, private) | https://statutes.capitol.texas.gov/Docs/PR/htm/PR.28.htm | retainage, change orders |
| `tx-pr-53` | Texas Property Code 53.101 (owner's 10% reserve) | https://statutes.capitol.texas.gov/Docs/PR/htm/PR.53.htm | retainage |
| `tx-gv-2252` | Texas Government Code 2252.032 (public retainage) and 2251.022 | https://statutes.capitol.texas.gov/Docs/GV/htm/GV.2252.htm , https://statutes.capitol.texas.gov/Docs/GV/htm/GV.2251.htm | retainage |
| `ca-civ-8800` | California Civil Code 8800 (private progress payments) | https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=8800. | retainage |
| `ca-civ-8811` | California Civil Code 8811 (private retention cap, SB 61, from 1 Jan 2026) | https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=8811. | retainage |
| `ca-civ-8812` | California Civil Code 8812 (release within 45 days) | https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=8812. | retainage |
| `ca-pcc-7201` | California Public Contract Code 7201 (public retention cap) | https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PCC&sectionNum=7201. | retainage |
| `ny-gbs-756` | New York General Business Law 756, 756-a | https://www.nysenate.gov/legislation/laws/GBS/756 , https://www.nysenate.gov/legislation/laws/GBS/756-A | retainage |
| `ny-gbs-756-c` | New York GBL 756-c, Retention | https://www.nysenate.gov/legislation/laws/GBS/756-C | retainage |
| `ny-gbs-757` | New York GBL 757, Void provisions (revision of 26 Dec 2025) | https://www.nysenate.gov/legislation/laws/GBS/757 | retainage |
| `fl-255.078` | Florida Statutes 255.078, Public construction retainage | http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0200-0299/0255/Sections/0255.078.html | retainage |
| `fl-715.12` | Florida Statutes 715.12, Construction Contract Prompt Payment Law | http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0715/Sections/0715.12.html | retainage |
| `aia-g701` | AIA, G701 Change Order (product page) | https://aiacontracts.com/documents/g701-2017 | change orders |
| `aia-g714` | AIA, G714 Construction Change Directive (product page) | https://aiacontracts.com/documents/g714-2017 | change orders |
| `aia-g714sum` | AIA help centre, Summary: G714–2017 | https://help.aiacontracts.com/hc/en-us/articles/1500009448081 | change orders |
| `aia-covccd` | AIA Learn, Change orders vs construction change directives | https://learn.aiacontracts.com/articles/6449229-changes-to-the-contract-differences-between-change-orders-and-construction-change-directives/ | change orders |
| `aia-g702` | AIA, G702 Payment Application (product page) | https://aiacontracts.com/documents/g702-1992 | retainage, hub |
| `aia-a201` | AIA, A201 General Conditions (product page) | https://aiacontracts.com/documents/a201-2017 | change orders |

**States: which and why.** Texas (the US demo's home state), California, New York and Florida: each has a statute
covering retainage and prompt pay, read from the official site. Massachusetts (G.L. c.149 §29E) and Illinois
(815 ILCS 603) were planned but malegislature.gov and ilga.gov refused the browser and fetches, as Massachusetts did for
batch 1's lien waivers; leave them out until read. AIA documents are paid: explain them, never reproduce them (the
existing rule in `src/lib/construction.ts`); quote only AIA's own free pages.

### India

| Key (`doc:`) | Source | URL | Used on |
|---|---|---|---|
| `cpwd` (exists) | CPWD Works Manual 2022 (NDMC copy) | https://www.ndmc.gov.in/departments/Departments/Finance/nodal_cell/CPWD%20Works%20Manual%202022.pdf | ra-bills, measurement-book |
| `cpwd-gcc-2023` | CPWD General Conditions of Contract 2023, Construction Works (copy with DG CPWD's OM of 22.09.2023, hosted by IIT Kanpur). Point the key at `cpwd-gcc-2023-construction-works-raw.txt` (plain `pdftotext`): the `-layout` text breaks Clause 7's sentences with margin labels | https://iitk.ac.in/iwd/file/2026/18-Civil-D2-2026-27/GCC-2023.pdf | ra-bills, measurement-book |
| `cpwd-circulars` | CPWD circulars, General Conditions of Contract (amendments to GCC 2023 up to 22.10.2026) | https://cpwd.gov.in/AllCirculars.aspx?Type=24 | ra-bills |
| `gst-wc` (exists) | GST Council, Works Contracts in GST | https://gstcouncil.gov.in/sites/default/files/e-version-gst-flyers/Work%20Contracts%20in%20GST.pdf | gst |
| `cgst-act` | CGST Act, 2017 as updated to 30.09.2020 (CBIC) | https://cbic-gst.gov.in/pdf/CGST-Act-Updated-30092020.pdf | gst |
| `cgst-rate-15-2025` | Notification 15/2025-Central Tax (Rate), 17 Sep 2025 (Gazette G.S.R. 663(E); copy hosted by BCAS) | https://bcasonline.org/wp-content/uploads/2025/09/No.15-2025-Central-Tax-Rate.pdf | gst |
| `it-act-2025` (exists) | Income-tax Act, 2025 | https://egazette.gov.in/WriteReadData/2025/265620.pdf | tds |
| `msmed` | MSMED Act, 2006 (already in `ERP/sources/msmed-act-2006.txt`) | as cited on `/systems/msme-payment-rule` | ra-bills |

**"GCC 2026" doesn't exist as a CPWD edition.** CPWD's circulars page lists GCC 2023 Construction Works as current,
amended by circulars up to 22.10.2026 (latest: Conditions of Contract, Clause 19, 20, model rules and Appendix A–G;
27.02.2026: General Rules and Directions, **Clause 1** and Schedule E; 18.11.2025: advisory on release of security
deposit). The "General Conditions of Contract … April 2026" PDF in search results is IIT Hyderabad's own version
(PDF author "IITH", file name `GCC _Construction_23`), not CPWD's. Pages should cite GCC 2023 "as amended". The
27.02.2026 and 18.11.2025 circulars are ASP.NET postbacks I couldn't download: **Pujan to save both** before the
ra-bills page quotes Clause 1 figures (the Clause 1A security deposit text below is from the 2023 book).

**Not usable:** CBDT Circular 23/2017 (TDS on the amount excluding GST) is not at its official URL any more
(incometaxindia.gov.in returns 404); the page keeps "confirm with your adviser" and doesn't quote it. The CBIC copy of
the CGST Act is the 30.09.2020 consolidation; later amendments (Finance Acts 2021–2026) aren't in it, so quote only
the provisions below and re-save a current copy before claiming any section is unchanged. The full consolidated text
of rate notification 11/2017 wasn't found at an official URL, so the GST page names the three entries changed in
September 2025 by notification and item number, not by description.

---

## Batch 2

### 1. `/construction/retainage`

Currently 82 lines, 2 sources (FAR only), "private and state jobs" is one paragraph with no state named. Biggest win:
the state rules, and the release step.

**Front matter.** `title: "Retainage in construction: rates, state caps and release"` (58 chars, no metaTitle needed).
`description: "Retainage explained: typical rates, federal rules, state caps in CA, NY, TX and FL, when it must be released, and how to track it per job."` (138).

**Buyer questions → H2s, first sentence answers**

1. **What is retainage in construction?** A share of each progress payment the owner holds back until the work is
   complete, as security that the contractor finishes and fixes defects; the GC usually holds the same from its subs.
2. **How much retainage is normal?** Usually 5% or 10% of each payment; several states now cap it at 5% (California
   private and public, New York private over $150,000, Florida public, Texas public over $5 million).
3. **What are the federal rules?** FAR 52.232-5 pays in full when progress is satisfactory and allows up to 10% only
   when it isn't; FAR 32.103 says retainage "should not be used as a substitute for good contract management".
4. **Which states cap retainage, and at what?** Table: TX, CA, NY, FL, private vs public, cap, release deadline,
   interest. (Sources below.) Other states: "check your state's statute"; don't list unread states.
5. **When must retainage be released?** When the contract says, within the state's deadline: California private
   within 45 days of completion, New York within 30 days of final approval, federal within 30 days of the officer
   approving release (FAR 52.232-27) when the contract is silent.
6. **Can the GC hold more retainage from a sub than the owner holds from the GC?** Not in California or New York: the
   sub's percentage can't exceed the owner's.
7. **Can the owner keep retainage for punch-list items or a dispute?** Only a limited amount: in California, up to
   150% of the disputed amount.
8. **Does retainage apply to stored materials?** It does on the AIA-style pay application (column F is in "completed
   and stored"), and Texas public jobs cap the rate per line "including materials and equipment delivered on site".
9. **How do I track retainage receivable and payable?** Per job and per sub, from the pay application, never as one
   figure; it is billed revenue not yet collectable, and it sits on the WIP schedule inside "billed to date".
10. **What happens to retainage on a Texas private job?** The owner must reserve 10% for 30 days after completion
    (Property Code 53.101) to protect lien claimants, separate from what the contract retains.

**Quotes for `checks`**

- `far-32.103` · FAR 32.103 — "Retainage should not be used as a substitute for good contract management, and the contracting officer should not withhold funds without cause."
- `far-32.103` · FAR 32.103 — "Upon completion of all contract requirements, retained amounts shall be paid promptly."
- `far-52.232-5` · FAR 52.232-5(e) — keep the three existing quotes.
- `far-52.232-27` · keep the two existing quotes.
- `usc-31-3905` · 31 U.S.C. 3905(b)(1) — "a payment clause which obligates the prime contractor to pay the subcontractor for satisfactory performance under its subcontract within 7 days out of such amounts as are paid to the prime contractor by the agency under such contract"
- `ca-civ-8811` · Cal. Civ. Code 8811(b)(1)(A) — "shall not exceed 5 percent of the payment."
- `ca-civ-8811` · 8811(b)(1)(B) — "In no event shall the total retention proceeds withheld exceed 5 percent of the contract price."
- `ca-civ-8811` · 8811(a) — "This section is applicable to a contract relating to a private work of improvement entered into on or after January 1, 2026."
- `ca-civ-8811` · 8811(b)(3) — "Paragraph (1) does not apply to an owner, direct contractor, or subcontractor on a residential project if the project is not mixed-use and does not exceed four stories."
- `ca-civ-8812` · 8812(a) — "the owner shall, within 45 days after completion of the work of improvement, pay the retention to the contractor."
- `ca-civ-8812` · 8812(c) — "the owner may withhold from final payment an amount not in excess of 150 percent of the disputed amount."
- `ca-civ-8800` · 8800(c) — "An owner that violates this section is liable to the direct contractor for a penalty of 2 percent per month on the amount wrongfully withheld"
- `ca-pcc-7201` · Pub. Contract Code 7201(b)(1) — "In no event shall the total retention proceeds withheld exceed 5 percent of the contract price."
- `ny-gbs-756-c` · GBL 756-c — "an owner may retain no more than five per centum of the contract sum as retainage."
- `ny-gbs-756-c` · 756-c — "Retainage shall be released by the owner to the contractor no later than thirty days after the final approval of the work under a construction contract."
- `ny-gbs-756-c` · 756-c — "in no case shall retainage exceed the actual percentage retained by the owner."
- `ny-gbs-757` · GBL 757(5) — "in an amount exceeding five percent of the contract sum."
- `ny-gbs-756` · GBL 756(1) — "equals or exceeds one hundred fifty thousand dollars."
- `tx-pr-53` · Tex. Prop. Code 53.101(a) — "for 30 days after the work under the contract is completed, the owner shall reserve:"
- `tx-pr-28` · Tex. Prop. Code 28.002(a) — "not later than the 35th day after the date the owner receives the request."
- `tx-pr-28` · 28.004(b) — "An unpaid amount bears interest at the rate of 1-1/2 percent each month."
- `tx-gv-2252` · Tex. Gov't Code 2252.032(b)(2) — "if the total value of a public works contract is $5 million or more, a governmental entity may not withhold retainage in an amount that exceeds five percent of the contract price"
- `fl-255.078` · Fla. Stat. 255.078(1) — "a public entity may withhold from each progress payment made to the contractor an amount not exceeding 5 percent of the payment as retainage."
- `fl-255.078` · 255.078(6) — "if the total cost of the construction services purchased as identified in the contract is $200,000 or less."

The state table (paraphrase, from the quotes above):

| State | Private jobs | Public jobs | Release |
|---|---|---|---|
| California | ≤5% of each payment and of the contract price, contracts from 1 Jan 2026 (not residential ≤4 stories) | ≤5% (PCC 7201) | Owner pays within 45 days of completion (Civ. 8812) |
| New York | ≤5% of the contract sum, projects ≥$150,000 (GBL 756, 756-c, 757) | not covered by art. 35-E | 30 days after final approval; 1%/month interest if late |
| Texas | Owner reserves 10% for 30 days after completion (Prop. 53.101); payment due 35 days after request, subs within 7 days, 1.5%/month interest (ch. 28) | ≤10% under $5M, ≤5% at $5M+ (Gov't 2252.032); subs within 10 days (2251.022) | Contract terms |
| Florida | Contract terms; withheld amounts bear interest 14 days after due (715.12) | ≤5% of each payment, contracts over $200,000 (255.078) | Same payment-request limits as other payments (255.078(4)) |

**Worked examples**

1. Pay application #3 on a $400,000 job at 10%: completed to date $160,000 + stored $8,000 = $168,000; retainage
   $16,800; earned less retainage $151,200; less previous certificates $108,000; **current payment due $43,200**.
   (Reuses the pay-applications page's layout.)
2. The same job in California under a contract signed in 2026: retainage capped at 5%, so $8,400 held, not $16,800,
   and never more than $20,000 over the job.
3. Release with a dispute (California private): $20,000 retained, $3,000 of punch-list work disputed. The owner may
   hold up to $4,500 (150%) and must pay **$15,500** within 45 days of completion.
4. Late payment in Texas: the $43,200 due 35 days after the request is paid a month late: interest at 1.5% is **$648**.
5. Sub flow-down: the GC holds 10% from a $60,000 sub in New York: not allowed, both the owner's and the GC's
   retainage are capped at 5% ($3,000), and the GC can't hold a higher percentage than the owner holds.

**What the demo really does** (US build, `lib/ra-math.js` `payApp`, `scripts/demo/seed-us.mjs`)

- Holds retainage per pay application at a percentage (default 10%, carried from the previous application, editable
  per application, so a reduction at 50% can be entered), on work completed **and** stored materials, shown as 5a/5b.
- Line 7 (previous certificates) is recomputed from each earlier application, so retainage never drifts.
- Seed: Northstone Builders (made up, Garland, Texas), four jobs at 10% retainage; one job (Lakeview pool) is complete
  with pay app #3 submitted.
- **Lacks:** a retainage release step or a "retainage billing" application; retainage held from subs as a payable;
  state caps. Offer as "we'd build it": a release application that bills the retainage balance, per-sub retainage
  payable released when the owner pays.

**related:** `/construction/pay-applications`, `/construction/lien-waivers`, `/manufacturing/quickbooks-integration`,
`/construction/wip-schedule`, `/industries/construction-company`.

**Datum AI must be able to answer from this page alone**

- "How much retainage can the owner hold on our California job?" / "…in New York?" / "…in Texas?"
- "When does the owner have to release retainage?"
- "Can the GC hold 10% from us when the owner only holds 5%?"
- "Does retainage apply to stored materials?"
- "What's retainage on a federal job?"
- "How is the current payment due worked out with retainage?" (with the $43,200 example)
- Live-data questions it answers from the demo instead: "How much retainage is held on Halvorsen Tower?" — the
  pay-application figures exist (`payApp.retainage`), and the US RA-bills look-up now shows "retainage to date" (added 5 Nov).

---

### 2. `/construction/change-orders`

Currently 77 lines, 1 source (FAR 52.243-4). Missing: the construction change directive, AIA's forms, Texas's 2023
unsigned-change-order law, differing site conditions, and a priced example.

**Front matter.** Title stays (55 chars). `description: "Change orders: getting them in writing, change directives, pricing with backup, federal and Texas rules, and billing approved changes on the pay app."` (149).

**Buyer questions → H2s**

1. **What is a change order in construction?** A written agreement between owner and contractor changing the work,
   the contract price, the contract time, or all three; AIA's form is G701.
2. **What's the difference between a change order and a construction change directive?** A change order is agreed
   and signed by both; a directive (AIA G714) orders the work to proceed before price or time is agreed, and the
   contractor must proceed.
3. **Do I have to do extra work without a signed change order?** Depends on the contract and state: on a Texas
   private job you may refuse once unsigned owner-directed work passes 10% of the original contract (Prop. Code
   28.0091, since 1 Sep 2023); federally, a written or oral order counts only if you give written notice.
4. **Will I get paid for work done on a verbal OK?** Often not, or only after a fight: courts differ, so get the scope
   and price in writing (even an email) before the work. (Levelset threads; say it as practice, not law.)
5. **How do I price a change order?** Quantities, labor hours at your rates, material quotes, equipment, then overhead
   and profit as the contract allows, with the backup attached.
6. **How long do I have to submit a change order claim?** As the contract says; on federal jobs, assert within 30
   days, costs more than 20 days before your notice aren't adjusted, and nothing after final payment.
7. **What about hidden or different site conditions?** On federal jobs FAR 52.236-2 requires prompt written notice
   "before the conditions are disturbed"; then an equitable adjustment is made if they differ materially.
8. **Can I bill a pending change order?** No: bill only approved changes, as their own lines on the schedule of
   values; track pending ones as exposure on the WIP schedule.
9. **Does signing a lien waiver give up pending change orders?** It can: read whether the waiver covers claims or only
   the payment amount (link lien-waivers).

**Quotes for `checks`**

- `far-52.243-4` · keep the five existing quotes; add 52.243-4(b): "Any other written or oral order (which, as used in this paragraph (b), includes direction, instruction, interpretation, or determination) from the Contracting Officer that causes a change shall be treated as a change order under this clause; Provided, that the Contractor gives the Contracting Officer written notice stating-"
- `far-52.236-2` · FAR 52.236-2(a) — "The Contractor shall promptly, and before the conditions are disturbed, give a written notice to the Contracting Officer of-"
- `far-52.236-2` · 52.236-2(d) — "No request by the Contractor for an equitable adjustment to the contract for differing site conditions shall be allowed if made after final payment under this contract."
- `tx-pr-28` · Tex. Prop. Code 28.0091(a)(2) — "exceeds 10 percent of the contractor's or subcontractor's original contract amount."
- `tx-pr-28` · 28.0091(b) — "A contractor or subcontractor who elects not to proceed with additional work as provided by this section is not responsible for damages associated with the election not to proceed."
- `aia-g714sum` · AIA, G714 summary — "G714–2017 is a directive for changes in the Work for use where the owner and contractor have not agreed on proposed changes in the contract sum or contract time."
- `aia-covccd` · AIA Learn — "the owner can issue a construction change directive without the contractor’s signature."

(28.0091 doesn't apply to single-family to quadruplex homes or public jobs? **Not stated in 28.0091**; 28.009(e)'s
exclusion is for the suspension right only. Don't claim an exclusion.)

**Worked examples**

1. Priced change: 40 labor hours × $65 = $2,600; material $3,400; equipment $500; subtotal $6,500; overhead and
   profit 15% = $975; **change order $7,475**, 3 days added. Backup: the quote, the timesheet estimate, the markup
   clause.
2. Contract sum after changes: original $400,000; CO 1 approved $12,000; CO 2 pending $8,500; CO 3 rejected $4,000.
   Revised contract sum **$412,000**; pending exposure $8,500 (WIP only, not billed).
3. Texas 10% rule: original $400,000, so the line is $40,000. Unsigned owner-directed work so far $36,000; a new
   $6,000 directive takes it to $42,000, so the contractor may decline it without liability for the delay.
4. Federal 20-day rule: written notice given 1 Mar 2026; costs incurred before 9 Feb 2026 aren't adjusted.
5. Demo figures (US seed): Halvorsen Tower original schedule of values $245,856; change order 1 (elevator pit
   injection 40 ea × $51, drainage board 2,400 sq ft × $1.86) $6,504; revised $252,360.

**What the demo really does** (US: `lib/quotations.js` change order = a new estimate against the accepted contract
estimate, `variation_of_id`; `lib/ra.js` `siteLines`)

- A change order is drafted as its own estimate (draft → sent → accepted or declined); accepted, its lines join the
  schedule of values labelled CO 1, CO 2 and are summed apart, so the pay app shows original sum, net change and
  revised sum.
- Sent-but-not-accepted change orders are the pending list.
- **Lacks:** a change log with notice dates, days added to the contract time, directives (G714-style) that are billed
  before price agreement, and pending exposure on a dashboard. India build: the quote terms say variations are quoted
  separately, but India sites don't link a variation to the BOQ (`siteLines` uses `variation_of_id` only for NA);
  measured quantity beyond the BOQ is flagged `over_boq` for the client's OK.

**related:** `/construction/pay-applications`, `/construction/wip-schedule`, `/boq/variation-orders`,
`/systems/variation-order`, `/industries/construction-company`.

**Datum AI must answer**

- "What's the difference between a change order and a change directive?"
- "Do we have to keep working without a signed change order in Texas?"
- "How long do we have to claim a change on a federal job?"
- "Can we bill the pending change order on this month's pay app?"
- "How do I price a change order?"
- From data: "Which change orders are still pending on Halvorsen Tower?" — answered by the US `change_orders` look-up (added 5 Nov).

---

### 3. `/construction/wip-schedule`

Currently 72 lines, **no sources**. The maths is right; it needs the tax law (percentage of completion is the cost
comparison in 26 U.S.C. 460), the small-contractor exemption, the surety form, and the WIP's place on the balance
sheet. Keep "your accountant decides" for GAAP (ASC 606 not read: FASB's codification is paid; don't cite it).

**Front matter.** Title stays (51). `description: "The construction WIP schedule: cost-to-cost percent complete, earned revenue, over and under billing, a worked example, the tax rule, and what sureties check."` (158).

**Buyer questions → H2s**

1. **What is a WIP schedule?** A monthly list of every open job with contract value, estimated total cost, cost to
   date, percent complete, earned revenue and billed to date, showing whether each job is over- or under-billed.
2. **How do you calculate percent complete?** Cost to date ÷ estimated total cost (cost-to-cost); the same comparison
   the tax law uses for the percentage of completion method.
3. **What is overbilling, and is it bad?** Billing ahead of earned revenue: cash is ahead, the work is still owed;
   moderate overbilling is normal, large overbilling without the cash to match is a warning.
4. **What is underbilling?** Work earned but not billed: slow billing, unapproved changes, or cost that will never be
   billed.
5. **Where do over- and underbillings go on the balance sheet?** Overbillings are a liability ("billings in excess of
   costs and estimated earnings"), underbillings an asset; your accountant sets the presentation.
6. **What is profit fade?** Estimated gross profit on a job falling month after month as the estimate to complete
   grows.
7. **Why do sureties and banks ask for it?** It shows job by job whether the company is making the margin it bid; SBA's
   surety program asks for it on Form 994F, the Schedule of Work in Process.
8. **Do small contractors have to use percentage of completion for tax?** Not for contracts expected to finish within
   2 years if average gross receipts are within the §448(c) limit ($32 million for tax years beginning in 2026).
9. **Does retainage count as billed?** Yes: billed to date includes retainage; cash collected doesn't.
10. **How often should a WIP schedule be updated?** Monthly, with the project manager's re-estimate to complete.

**Quotes for `checks`**

- `usc-26-460` · 26 U.S.C. 460(b)(1)(A) — "the percentage of completion shall be determined by comparing costs allocated to the contract under subsection (c) and incurred before the close of the taxable year with the estimated total contract costs"
- `usc-26-460` · 460(e)(1)(B)(i) — "who estimates (at the time such contract is entered into) that such contract will be completed within the 2-year period beginning on the contract commencement date of such contract"
- `irs-rp-2025-32` · Rev. Proc. 2025-32 §.30 — "does not exceed $32,000,000." (the PDF breaks lines: check the joined sentence "average annual gross receipts of such entity for the 3-taxable-year period ending with the taxable year which precedes such taxable year does not exceed $32,000,000")
- `sba-994f` · SBA — "Small businesses seeking a surety bond use this form to list any work they’re currently performing."

**Worked examples**

1. Keep the two-job table (Job A $30,000 over, Job B $30,000 under) and the stale-estimate case (Job A at $380,000:
   44.7% complete, earned $178,947, overbilled $51,053).
2. Add profit fade: Job A estimated gross profit $60,000 last month ($400,000 − $340,000); this month's estimate to
   complete raises total cost to $360,000: gross profit $40,000, a $20,000 fade, and earned revenue to date drops with
   it.
3. Add the tie-out: total overbillings $30,000 (liability) and underbillings $30,000 (asset) are the figures that must
   match the balance sheet.
4. Small-contractor test: a contractor with average gross receipts of $18 million and a 14-month job may use another
   method (completed contract) for tax; one with $40 million may not.

**What the demo really does** — **no WIP schedule.** The director dashboard (`lib/mis.js`) shows per site: contract
value, value of approved work, billed, cost to date (material used, labour from attendance, site cash, machine days)
and margin so far, projected to the whole contract against the estimate; sites marked on track, over budget or losing
money. That is progress by approved work value, not cost-to-cost, and there is no estimate-to-complete field and no
over/under billing column. Say: "the demo has the inputs; a WIP schedule from them is something we'd build". Don't
show a demo screenshot on this page.

**related:** `/manufacturing/wip-tracking`, `/manufacturing/quickbooks-job-costing`, `/systems/work-in-progress`,
`/construction/change-orders`, `/industries/construction-company`.

**Datum AI must answer**

- "Is Job A over- or underbilled, and by how much?" (with the formula, from the page)
- "What does a surety look for in our WIP?"
- "What's profit fade?"
- "Do we have to use percentage of completion for taxes?"
- From data it answers today: "Is the Halvorsen site making money?" (site margin look-up). It can't answer "show me
  the WIP schedule" — say so in its guide.

---

### 4. The `/construction` hub (`src/app/construction/page.tsx`, `src/components/ConstructionPage.tsx`, `src/lib/construction.ts`)

**Now:** title 58 chars (`Construction billing guides: pay apps, retainage, RA bills`), description 156, lead
paragraph, two market groups, a demo paragraph. No link to an industry page (none exists), no question H2s, and the
demo paragraph names "bills" in both markets without saying which build has what.

**Changes**

- Add question H2s above the lists, each answered in a sentence that links to the guide:
  - **How does a contractor get paid on a US job?** Monthly pay applications against a schedule of values, less
    retainage, with lien waivers exchanged for payment and changes billed only once approved.
  - **How does a contractor get paid in India?** Running account bills from the measurement book, less security
    deposit, TDS and any advances being recovered, with GST on top, and a final bill that closes the contract.
  - **What software do contractors use for billing and job cost?** Link the new industry page.
- Closing block (roadmap rule "every hub points at what we sell"): name `/industries/construction-company` and
  `/services/custom-erp-crm`; North America gets `/us/industries/construction-company` once it exists.
- Demo paragraph per market (use `only([...])`): India "RA bills with GST, measurement, stores, site cash, PF/ESIC
  payroll"; US "pay applications with retainage, change orders and lien waivers". Add "built for a client, not yet
  live" (or `NOT_LIVE`).
- `CON_GROUPS` intros: US intro adds "and what each state allows"; India intro adds "security deposit, advances,
  price escalation and the final bill".
- `CON_CHECKED`/`CON_PUBLISHED` move to the batch date. Hub `metadata.description` stays ≤160.

**Datum AI angle:** the hub is the router: "Which guide explains X?" should be answerable from the H2s.

**related:** hubs don't take `related:`; the closing block does the cross-section linking.

---

### 5. NEW: construction industry page, India and US

Files: `content/industries/construction-company.md` (India) and `content/industries/us/construction-company.md`
(US), same front matter and section pattern as the boiler pair. Also: add `/industries/construction-company` to
`ADAPTIVE.NA` in `src/lib/markets.ts` (otherwise the US file is never served), and the engagement slug
`construction-company` in `src/lib/work.ts` already exists with `live: false`.

**India front matter**

- `title: ERP software for construction contractors in India` (50)
- `audience: Civil, waterproofing and repair contractors in India`
- `description: "Construction ERP for Indian contractors: daily site reports, BOQ and RA bills with GST, stores per site, site cash, PF/ESIC payroll and Datum AI."` (145)
- `clients: [construction-company]`, `services: [custom-erp-crm, operational-intelligence, custom-ai-assistant, daily-wage-payroll, compliance-accounting, tally-integration]`
- `demo.url: https://construction-erp.ahromlabs.com/demo`
- `guides`/notes: `assistant-that-answers-from-your-ledger`, `tally-voucher-posting`, `statutory-rates-across-systems`
- `flow`: enquiry and site visit → quotation (BOQ) → site BOQ from the accepted quote → daily report (work, labour from
  attendance, material from site stock, photos) → PM approval → measurement → RA bill (previous / this / up to date,
  GST PDF) → submitted → certified → paid into the cash book → receivables ageing and follow-ups → Tally import file.
- `evidence`: 4 sample sites, one losing money; RA bill PDF with CGST/SGST or IGST and amount in words; daily stock
  sheet (opening / receipt / dispatch / closing); Datum AI answers from the live records.

**US front matter**

- `title: Construction software for subcontractors and specialty contractors` (66) → `metaTitle: Construction ERP for specialty contractors` (42)
- `description: "Software for US specialty contractors: daily reports, schedule of values, pay apps with retainage, change orders, lien waivers, crews and job cost."` (147)
- `demo.url: https://construction-erp-us.ahromlabs.com/demo`
- `services: [custom-erp-crm, operational-intelligence, custom-ai-assistant]` (not daily-wage-payroll, compliance-accounting or tally-integration: India-only pages)

**Buyer questions → H2s (both, worded per market)**

1. **Can I try it before talking to anyone?** Yes: the demo with a made-up contractor (India: four sites, Mehta Delta
   Towers etc.; US: Northstone Builders, Garland, Texas, four jobs), sample logins per role, nightly reset.
2. **What does a contractor need that generic accounting doesn't give?** Work measured against the BOQ / schedule of
   values, cost per site, bills built from measurements, stock at each site, labour from the site.
3. **Can site engineers report from a phone?** Yes: one daily report per site, work against BOQ lines, labour
   pre-filled from attendance, material from the site's stock, up to six photos; the PM approves.
4. **How are RA bills / pay applications made?** India: measurements against the BOQ, previous / this bill / up to
   date, GST split, PDF, draft → submitted → certified → paid. US: SOV, previous / this period / stored, retainage,
   G702/G703-style PDF, lien waivers per pay app.
5. **Is each site making money?** Cost to date (material used, labour, site cash, machine days) against the value of
   approved work, projected to the contract against the estimate.
6. **How is material controlled across the godown and sites?** Receipts, transfers, use from the daily report; nothing
   sent or used that isn't there; daily stock sheet.
7. **How is site cash handled?** A float per site, spends with receipt photos, weekly claim, approval, bank upload file
   (India).
8. **How are workers paid?** India: KYC, wage register from attendance with PF/ESIC and TDS for subcontractors, gate
   passes. US: onboarding documents, W-2 crews and 1099 subs, monthly pay register; payroll taxes stay with the
   payroll provider.
9. **Does it work with Tally / QuickBooks?** India: Tally import file (sales, RA bills, purchases, site cash, site as
   cost centre). US: **only if confirmed** — the QuickBooks Online sync (customers and jobs, invoices, pay apps as
   invoices, payments, supplier bills, bill payments) is on branch `demo-us` and its demo-features text doesn't
   mention it; check the deployed US demo before claiming it, otherwise say "we'd connect it".
10. **What does Datum AI answer?** Site margin, missing daily reports, stock, site cash, RA bills / pay apps,
    receivables by age, machines, material vs norm, KYC and gate passes, GST and TDS (India), supplier rates; site
    staff don't get money questions.
11. **What should a contractor ask any software vendor?** Bills from measurements or typed totals? Cost per site from
    real issues and attendance? Retainage / security deposit tracked per bill? Pending changes kept apart? Works on a
    phone at site?
12. **Boundary.** "Built for a waterproofing and repair contractor that also trades construction chemicals; built,
    not yet live at the client. Shown on sample data." US: "the same code with US terms; not yet used by a US
    contractor." Gaps named plainly: no WIP schedule; India RA bills don't yet deduct security deposit, TDS or advance
    recoveries; no price escalation.

**related** (industry pages show guides via front matter; use these): India `/construction/ra-bills`,
`/construction/measurement-book`, `/ai-assistant/construction-contractors`, `/services/daily-wage-payroll`,
`/boq/what-is-a-boq`. US `/construction/pay-applications`, `/construction/retainage`, `/construction/lien-waivers`,
`/manufacturing/quickbooks-integration`, `/sales-tax/use-tax`.

**Datum AI angle:** the industry page is what a prospect reads; Datum answers "what can this system do?" from it, so
every module claim must match `lib/demo-features.js`.

---

## Batch 3 (India billing)

Folding decision: **mobilisation advance, secured advance, security deposit (retention money), price escalation and
the final bill go into `ra-bills`**, because each is a line on, or the last of, the running bills. GST on advances and
on security deposit goes into `gst-on-works-contracts`; TDS on advances into `tds-on-contractor-payments`. No new
pages.

### 6. `/construction/ra-bills`

Currently 82 lines, 1 source (Works Manual), deductions named without amounts. The GCC 2023 supplies every figure.

**Front matter.** `title: "RA bills: running bills, deductions, advances and final bill"` (60).
`description: "RA bills in Indian construction: drawn from the MB, security deposit, mobilisation and secured advance, TDS, GST, price escalation and the final bill."` (150).

**Buyer questions → H2s**

1. **What is an RA bill?** A running account bill: an interim bill for work measured so far, paid as an advance against
   the final bill while work continues.
2. **How is an RA bill calculated?** Value of work done to date at agreement rates, plus approved extra and deviated
   items, less the gross of earlier bills, then the deductions.
3. **Who can be paid by RA bills on CPWD works?** Works estimated over ₹20 lakh; smaller works are paid after
   completion (GCC Clause 7).
4. **How soon must an RA bill be paid?** CPWD: at least 75% of the net bill within 10 working days, the rest within 28
   working days, 5% simple interest if delayed beyond 45 days.
5. **What is security deposit and how much is deducted?** On CPWD works, 2.5% of the gross amount of each running and
   final bill until 2.5% of the tendered amount is held (Clause 1A); private contracts set their own rate
   ("retention money").
6. **When is security deposit refunded?** After the defect liability period — 12 months after completion (6 months for
   works up to ₹10 lakh, except roads) — or once the final bill is passed, whichever is later (Clause 17). Can be
   released earlier against a bank guarantee once ₹5 lakh has built up.
7. **What is a mobilisation advance and how is it recovered?** Up to 10% of the tendered amount, at 8% simple interest,
   recovered pro rata from bills after the first 10% of work so it's all back by 80% (Clause 10B(ii)–(iii)).
8. **What is a secured advance?** Up to 75% of the assessed value of non-perishable materials brought to site and not
   yet built in, recovered from the next bill once they're used (Clause 10B(i)); not on glass, sand, petrol, diesel.
9. **What is price escalation (10CC) and how is it worked out?** A quarterly adjustment on 85% of the work done in the
   quarter, by each component's share in Schedule F and the change in its index since the tender date.
10. **What is the difference between 10C and 10CC?** 10C pays (or recovers) price changes caused by a new law or
    statutory order; 10CC is the index formula; where 10CC applies, 10C doesn't.
11. **When must the final bill be submitted and paid?** Within 3 months of physical completion or 1 month of the final
    completion certificate, whichever is earlier; paid within 3 months; no claims after it.
12. **Can a private client hold my bill for 90 days?** If you're a registered micro or small enterprise, the MSMED Act
    caps the agreed credit period at 45 days (link `/systems/msme-payment-rule`).

**Quotes for `checks`** (`cpwd-gcc-2023`; keep the 4 existing `cpwd` quotes)

- Clause 1A — "to deduct a sum at the rate of 2.5% of the gross amount of each running and final bill till the sum deducted will amount to security deposit of 2.5% of the tendered amount of the work."
- Clause 1A — "The security deposit as deducted above can be released against bank guarantee issued by a scheduled bank, on its accumulations to a minimum of Rs. 5 lac"
- Clause 7 — "No payment shall be made for work, estimated to cost Rs. twenty lacs or less till after the whole of the work shall have been completed and certificate of completion given."
- Clause 7 — "An amount of ad-hoc payment not less than 75% of the net amount of the bill under check, shall be made within 10 working days of submission of the bill"
- Clause 7 — "a simple interest @ 5% (five percent) per annum shall be paid to the contractor from the date of expiry of prescribed time limit."
- Clause 7 — "All such interim payments shall be regarded as payment by way of advances against final payment only"
- Clause 9 — "within three months of physical completion of the work or within one month of the date of the final certificate of completion furnished by the Engineer-in-Charge whichever is earlier."
- Clause 9 — "No further claims shall be made by the contractor after submission of the final bill and these shall be deemed to have been waived and extinguished."
- Clause 10B(i) — "up to 75% of the assessed value of any materials, which are in the opinion of the Engineer-in- charge non-perishable, non-fragile and non-combustible" (the source has "Engineer-in- charge" with a space; quote it as is)
- Clause 10B(i) — "No secured advance, shall however, be paid on high-risk materials such as ordinary glass, sand, petrol, diesel."
- Clause 10B(ii) — "Mobilization advances not exceeding 10% of the tendered amount may be given, if requested by the contractor in writing within six months of the order to commence the work."
- Clause 10B(iii) — "The mobilization advance in (ii) above bear simple interest at the rate of 8 percent per annum"
- Clause 10B(iii) — "the entire advance is recovered by the time eighty percent of the gross value of the contract is executed and paid"
- Clause 10CC(ii) — "Cost of work for which escalation is applicable (W) = 0.85M"
- Clause 10CC(iii)(a) — "The compensation for escalation shall be worked out at quarterly intervals"
- Clause 10C proviso — "Where provisions of clause 10CC are applicable, provisions of clause 10C will not be applicable."
- Clause 17 — "The security deposit of the contractor shall not be refunded before the expiry of twelve months (six months in the case of work costing Rs. Ten lacs and below except road work) after the issue of the certificate final or otherwise, of completion of work, or till the final bill has been prepared and passed whichever is later."
- `cpwd` · Works Manual 5.2(2) — "PG shall be 5% of the contract amount or as prescribed from time to time" (**hold** until the 27.02.2026 Clause 1 circular is read)
- `cpwd` · Works Manual 5.18.4 — "Under Section 194C of the Income Tax Act, 1961, deduction of income tax is required to be made at source by disbursing officers from payments made to contractors." (use only to say the 2022 manual predates the 2025 Act)
- `msmed` · MSMED Act s.15 proviso — "Provided that in no case the period agreed upon between the supplier and the buyer in writing shall exceed forty-five days from the day of acceptance or the day of deemed acceptance."

**Worked examples** (one CPWD-style work, tendered amount ₹2,00,00,000; made-up figures)

1. **Caps:** security deposit held up to ₹5,00,000 (2.5%); mobilisation advance up to ₹20,00,000 (10%), paid in
   instalments of at most ₹10,00,000 (5%).
2. **RA bill #3**, gross value this bill ₹18,50,000 (to date ₹49,50,000 less previous ₹31,00,000):

   | Line | ₹ |
   |---|---|
   | Gross value of this bill | 18,50,000 |
   | Add GST 18% (contractor's invoice) | 3,33,000 |
   | **Invoice value** | **21,83,000** |
   | Less security deposit 2.5% of gross | 46,250 |
   | Less mobilisation advance recovery (₹20 lakh ÷ ₹1.4 crore of work between 10% and 80% = 14.2857% of gross) | 2,64,286 |
   | Less interest on the advance outstanding (₹18,42,857 × 8% × 31/365) | 12,521 |
   | Less income-tax TDS 2% (company), on the value excluding GST | 37,000 |
   | Less GST TDS 1% CGST + 1% SGST (government deductor) | 37,000 |
   | **Net payable** | **17,85,943** |
   | Ad-hoc payment within 10 working days (≥75%) | 13,39,457 |

   (Recovery started on bill #2: previous gross ₹31 lakh, of which ₹11 lakh is past the ₹20 lakh threshold, so
   ₹1,57,143 already recovered and ₹18,42,857 outstanding. Days of interest are illustrative.)
3. **Secured advance:** cement and steel on site, assessed ₹4,00,000 → advance ₹3,00,000 (75%) paid with the bill,
   recovered in full from the next bill once built in.
4. **Escalation (10CC), one quarter:** work done in the quarter ₹50,00,000, no secured advance, advances or deviation
   items → M = ₹50,00,000, W = ₹42,50,000. Schedule F: cement 10%, labour 25%, steel 15%. Indices: cement 140→147
   (+5%), unskilled wage ₹700→₹735 (+5%), steel 150→144 (−4%). VW = 42,50,000 × (10×5% + 25×5% − 15×4%) ÷ 100 =
   **₹48,875** payable. (Formula: Clause 10CC(v)(a)(i), `VW = W*(1/100)*[CP*(CI-CO)/CO + LP*(LI-LO)/LO + …]`.)
5. **Final bill:** physical completion 15 Jan 2027, final certificate 10 Mar 2027: the bill is due by 10 Apr 2027
   (one month after the certificate is earlier than three months after completion, 15 Apr); payable within three
   months of receipt; security deposit ₹5,00,000 refunded after 12 months from completion or when the final bill is
   passed, whichever is later.

**What the demo really does** (India: `lib/ra.js`, `lib/ra-math.js` `raAbstract`, `scripts/check-ra.mjs`)

- RA bill = every unbilled measurement; per line previous / this bill / up to date qty and amount; GST on this bill
  (CGST+SGST or IGST by place of supply, default 18%); amount in words; PDF; draft → submitted → certified → paid,
  paid books the receipt in the cash book. Measured beyond the BOQ quantity is flagged `over_boq`.
- Receivables ageing with weekly follow-ups and escalation to the director past 30 days ("escalation" there means
  chasing payment, **not** price escalation).
- **Lacks:** security deposit / retention deduction, TDS and GST-TDS deducted by the client, mobilisation and secured
  advances and their recovery, price escalation, final bill as a distinct bill, ad-hoc 75% payment. These are the
  "we'd build it" list, and the industry page's boundary.

**related:** `/construction/measurement-book`, `/construction/tds-on-contractor-payments`,
`/construction/gst-on-works-contracts`, `/systems/msme-payment-rule`, `/services/compliance-accounting`,
`/industries/construction-company`. (Pick 5.)

**Datum AI must answer (self-contained)**

- "How much security deposit will CPWD deduct from this bill?" / "When do we get our security deposit back?"
- "How is the mobilisation advance recovered, and what interest is charged?"
- "Can we get an advance on cement and steel lying at site?"
- "How is 10CC escalation calculated this quarter?"
- "When must we submit the final bill?"
- "The department hasn't paid our RA bill for 50 days: is interest due?"
- From data (today): "Which RA bills are not certified?", "How much is unbilled on Mehta?", "Who owes us past 60
  days?" — all existing look-ups. Not today: anything about deductions.

---

### 7. `/construction/measurement-book`

Currently 82 lines, 6 Works Manual quotes; solid. Add GCC links (Clause 7 "recorded measurements", Clause 12
deviation), the abstract-to-bill step, and the e-MB / dimensions gap in software.

**Front matter.** Title stays (54). `description: "The measurement book in Indian construction: what it records, test checks, e-MB, deviation and extra items under GCC Clause 12, and how it feeds RA bills."` (154).

**Buyer questions → H2s**

1. **What is a measurement book (MB)?** The record of every quantity of work measured on site, item by item, from which
   each running bill and the final bill is paid.
2. **What details go in an MB entry?** Date, location, item, number and dimensions (L × B × D), quantity, who measured
   and who accepted for the contractor.
3. **Who records and test-checks measurements?** Site engineers record; officers named in CPWD's SOP 5/24 test-check;
   whoever records or checks is responsible for quality and quantity.
4. **What is an e-MB?** CPWD's electronic measurement book on PFMS, through which measurements and payments are
   entered.
5. **How does the MB become an RA bill?** The abstract totals each item to date, × agreement rate, less the previous
   bill; GCC Clause 7 says bills are on "recorded measurements".
6. **What are extra and deviated items?** Extra: not in the agreement but needed; deviated: an agreement item's quantity
   changed; beyond the Schedule F limit, rates are fixed under Clause 12. CPWD's manual sets 30 days for an Engineer-
   in-Charge decision.
7. **What happens to items the department won't pay?** Measured and recorded as inadmissible, for record.
8. **What rules decide how an item is measured?** The contract's mode of measurement, usually an IS 1200 part (link
   `/boq/measurement-rules`).

**Quotes for `checks`** — keep the 6 `cpwd` quotes; add:

- `cpwd` · Works Manual 5.11 — "The rates for deviated items beyond the limit specified in schedule F of the agreement as well as those of extra items shall be worked out in the manner prescribed in clause 12 of GCC."
- `cpwd-gcc-2023` · Clause 7 — "the interim or running account bills shall be submitted by the contractor for the work executed on the basis of such recorded measurements on the format of the Department"
- `cpwd-gcc-2023` · Clause 12.2 — "In the case of extra item(s) (items which are not available in the contract), the contractor" (start of 12.2; quote further only after reading the full clause text on its page)

**Worked examples**

1. Keep the two-row MB table (RCC columns 3.456 m³, brickwork 12.696 m³).
2. Add MB → abstract → bill: item "PU membrane", BOQ 500 m², rate ₹850: previous 300 m², this bill 180 m², up to date
   480 m² → this bill ₹1,53,000.
3. Deviation: same item up to date 640 m² against 500 m² in the BOQ = 28% over; if Schedule F's limit for the work is
   below 28%, the excess beyond the limit is paid at a rate fixed under Clause 12.

**What the demo really does** — measurements per BOQ line with date, quantity, note and who measured, entered by hand
or filled from approved daily reports; the BOQ line's quantity is locked once work is reported against it;
`over_boq` flag. **Lacks:** dimension columns (No. × L × B × D), test-check record, contractor's acceptance, e-MB
export. Offer as "we'd build it".

**related:** `/construction/ra-bills`, `/boq/measurement-rules`, `/systems/bill-of-quantities`,
`/systems/measurement-basis`, `/industries/construction-company`.

**Datum AI must answer**

- "What should an MB entry contain?" · "Who checks our measurements?" · "Can we bill quantity beyond the BOQ?" ·
  "What's an e-MB?"
- From data: "How much work is done but not yet billed on Mehta?" (RA-bills look-up shows unbilled work).

---

### 8. `/construction/gst-on-works-contracts`

Currently 77 lines, 1 source (GST Council flyer), and "take the rate from the current notification" with no rate.
Biggest gaps: the September 2025 change, GST TDS under section 51, time of supply for RA bills and advances, ITC on
own-account construction (17(5)(d)).

**Front matter.** Title stays (57). `description: "GST on works contracts in India: the 2(119) definition, 18% from 22 Sep 2025, ITC blocks under 17(5), GST TDS under section 51, and GST on RA bills."` (148).

**Buyer questions → H2s**

1. **What is a works contract under GST?** A contract for building, construction, repair and similar work on immovable
   property where goods pass in the course of the work (section 2(119)); it is a supply of services.
2. **What is the GST rate on works contracts?** 18% for most works contracts; from 22 September 2025, notification
   15/2025-Central Tax (Rate) moved items (vii), (viii) and (x) of serial 3 (heading 9954) to 9% CGST, i.e. 18%; check
   the current notification for government, affordable housing and other special entries.
3. **Can the client claim input tax credit on my bill?** Not for building its own immovable property (17(5)(c)),
   except plant and machinery; a main contractor can, when it uses a sub's works contract for its own.
4. **Can a contractor claim ITC on cement and steel?** Yes when they go into a works contract you supply; 17(5)(d)
   blocks goods and services for construction **on your own account** (your own office or shed).
5. **What is TDS under GST and when does the client deduct it?** Government departments, local authorities, government
   agencies and notified persons deduct 1% CGST + 1% SGST (or 2% IGST) when the contract's taxable value exceeds
   ₹2.5 lakh, on the value excluding tax; not when supplier location and place of supply are in a state other than the
   recipient's registration.
6. **When is GST due on an RA bill?** At the time of supply: the earlier of the invoice date (if issued in time) and
   receipt of payment.
7. **Is GST payable on a mobilisation advance?** Ask your adviser: for services, time of supply can be the date
   payment is received, but whether an interest-bearing advance is a payment for the supply is debated.
8. **Is GST charged on security deposit or retention deducted from my bill?** The bill's value is invoiced before the
   deduction; how a forfeited deposit is taxed is a question for your adviser (CA Club India threads disagree).
9. **Which state's GST applies?** The place of supply for work on immovable property is where the property is.
   (**Not quoted:** IGST Act s.12(3) wasn't opened in this research; quote it or drop the claim.)

**Quotes for `checks`** — keep the 4 `gst-wc` quotes; add:

- `cgst-act` · s.17(5)(d) — "goods or services or both received by a taxable person for construction of an immovable property (other than plant or machinery) on his own account including when such goods or services or both are used in the course or furtherance of business."
- `cgst-act` · s.51(1) — "to deduct tax at the rate of one per cent. from the payment made or credited to the supplier"
- `cgst-act` · s.51(1) — "where the total value of such supply, under a contract, exceeds two lakh and fifty thousand rupees:"
- `cgst-act` · s.51(1) Explanation — "the value of supply shall be taken as the amount excluding the central tax, State tax, Union territory tax, integrated tax and cess indicated in the invoice."
- `cgst-act` · s.13(2)(a) — "the date of issue of invoice by the supplier, if the invoice is issued within the period prescribed under"
- `cgst-rate-15-2025` · Notification 15/2025-CT(Rate) — "with effect from the 22nd day of September, 2025"
- `cgst-rate-15-2025` · — "against item (vii), for the entry in column (4), the entry “9” shall be substituted;"

(17(5)(d) is from the 2020 consolidation: the Finance Act 2025 amendment to "plant or machinery" reported after the
Safari Retreats judgment was not read here. Re-save a current CGST Act before quoting 17(5)(d).)

**Worked examples**

1. RA bill with GST: ₹18,50,000 + CGST 9% ₹1,66,500 + SGST 9% ₹1,66,500 = ₹21,83,000 (same bill as ra-bills).
2. GST TDS on that bill from a state PWD: 1% CGST ₹18,500 + 1% SGST ₹18,500 = ₹37,000 on ₹18,50,000 (excluding GST);
   credited to the contractor's electronic cash ledger once filed by the deductor (**cite GSTR-7 only if a source is
   read**).
3. ITC table: own office building (blocked), plant and machinery foundation (allowed), main contractor buying a
   sub's works contract (allowed).

**What the demo really does** — RA bills and trading invoices with HSN/SAC and the GST split; GST checklist for the
month (output tax, GSTR-1 summary by customer and HSN, missing HSN/GSTIN, site bills without the shop's GSTIN, due
dates); Tally import file. **Lacks:** GST TDS received (section 51) against each RA bill, GST on advances, ITC
eligibility tagging. Datum's GST/TDS look-up answers "GST this month" and due dates.

**related:** `/construction/ra-bills`, `/construction/tds-on-contractor-payments`, `/systems/reverse-charge`,
`/notes/statutory-rates-across-systems`, `/services/compliance-accounting`.

**Datum AI must answer**

- "What GST rate do we charge on this works contract?" · "Will the PWD deduct GST TDS, and how much?" · "Can we take
  ITC on the cement for the Mehta site?" · "Can the client claim ITC on our bill?" · "When is GST due on RA bill #3?"
- From data: "GST this month", "When is GSTR-3B due?" (existing look-up).

---

### 9. `/construction/tds-on-contractor-payments`

Currently 73 lines, 4 IT Act quotes, correct. Add: who must deduct (designated person), the work definition's
edges, a threshold worked example, subcontractors, TDS vs GST TDS side by side, and the Finance Act 2026 check.

**Front matter.** Title stays (47). `description: "TDS on contractor payments under the Income-tax Act, 2025 (section 393, serial 6): who deducts, 1% or 2%, the ₹30,000 and ₹1 lakh limits, and RA bills."` (151).

**Buyer questions → H2s**

1. **What replaced section 194C?** Section 393(1), Table serial 6, of the Income-tax Act, 2025, in force from
   1 April 2026.
2. **What is the TDS rate on contractor payments?** 1% if the contractor is an individual or HUF, 2% for anyone else.
3. **When does TDS apply?** When a single payment exceeds ₹30,000 or the year's total exceeds ₹1,00,000.
4. **Who has to deduct?** A "designated person": governments, local authorities, statutory corporations, companies,
   co-operatives, societies, trusts, universities, firms, and individuals/HUFs with turnover over ₹1 crore (business)
   or ₹50 lakh (profession) in the previous year; other individuals deduct 2% only above ₹50 lakh a year.
5. **What counts as "work"?** Any work under a contract, including supplying labour; also advertising, broadcasting,
   carriage other than by rail, catering, and making a product to the customer's specification from material bought
   from that customer.
6. **Is TDS deducted on the GST part of the bill?** Under the old Act CBDT's practice excluded GST shown separately;
   confirm under the 2025 Act with your adviser.
7. **Is TDS deducted from a mobilisation advance?** Ask your adviser: TDS applies on credit or payment, whichever is
   earlier, under the old Act; check the 2025 Act's wording before saying so. (**Not verified**; keep as a question.)
8. **Does a main contractor deduct TDS from subcontractors?** Yes, the same way, if it is a designated person.
9. **How is income-tax TDS different from GST TDS?** Different law, rate, threshold and return; both can come off the
   same RA bill.
10. **Did the Finance Act 2026 change the rates?** Commentaries say no; **read the Finance Act 2026 before writing this
    H2** (one source claims "supply of manpower" was added to "work").

**Quotes for `checks`** (`it-act-2025`; keep the 4 existing)

- Table serial 6(i) — the row is laid out in columns, so the full sentence doesn't survive extraction; quote the
  phrases that do: "carrying out any work", "(including supply of", "Rate: (a) 1%, if" (existing). The page text
  paraphrases the row: any sum for carrying out any work, including supply of labour, under a contract between the
  contractor and a designated person.
- s.402(11) definitions — "“designated person”, for the purposes of section 393(1) [Table: Sl. No. 6 (i)], means—"
- s.402(11)(l)(ii) — "has total sales, gross receipts or turnover from business or profession carried on by him exceeding one crore rupees in case of business or fifty lakh rupees in case of profession"
- (47)(e) — "manufacturing or supplying a product according to the requirement or specification of a customer by using material purchased from––"
- Serial 6(ii) threshold — "Fifty lakh rupees."

(Section number for the definitions: the text sits in the definitions list "for the purposes of section 393";
confirm the section number from the Act's arrangement before writing "s.402".)

**Worked examples**

1. Thresholds across a year (subcontractor, individual): payments ₹25,000, ₹28,000, ₹32,000, ₹20,000 → running total
   ₹25,000, ₹53,000, ₹85,000, ₹1,05,000. The third (₹32,000) is over ₹30,000 on its own; the fourth takes the year past
   ₹1,00,000. How earlier payments are treated once the total crosses: confirm with the adviser.
2. RA bill #3 (company contractor): ₹18,50,000 × 2% = ₹37,000; GST TDS separately ₹37,000 (government client).
3. Rate by status: same ₹5,00,000 bill to a proprietor (₹5,000) and to a private limited company (₹10,000).

**What the demo really does** — the wage register deducts 1% TDS for subcontractors past the limits; the TDS register
lists deductions by quarter with deposit and return dates (24Q stays in Tally); Datum's GST/TDS look-up answers "TDS
this month". **Gap:** the demo labels everything "194C" (`lib/payroll-calc.js`, `lib/compliance.js`): rename to
"section 393, serial 6" before the page points at it. **Lacks:** TDS deducted **by clients** from our RA bills
(receivable side) and Form 26AS/AIS reconciliation.

**related:** `/construction/ra-bills`, `/systems/tds-on-purchases`, `/services/daily-wage-payroll`,
`/notes/statutory-rates-across-systems`, `/construction/gst-on-works-contracts`.

**Datum AI must answer**

- "How much TDS do we deduct from Salim's gang this month?" (data: wage register) · "Is TDS 1% or 2% for this
  subcontractor?" · "We paid this contractor ₹85,000 so far this year: do we deduct on the next ₹20,000?" · "Which
  section replaced 194C?" · "Does TDS apply to GST on the bill?"

---

## Cross-cutting

- **Glossary first mentions** (auto-linking pass): retainage → no term page (add one in batch 19–21: "retainage" and
  "running account bill" are missing terms); change order → `/systems/variation-order`; BOQ →
  `/systems/bill-of-quantities`; job costing → `/systems/job-costing`; WIP → `/systems/work-in-progress`; MSME →
  `/systems/msme-payment-rule`; e-way bill and e-invoice where the industry page mentions them.
- **Orphans:** each new or changed page gets ≥2 text links from other pages: the industry page from the hub, all
  9 guides and `/ai-assistant/construction-contractors`; `/construction/wip-schedule` from
  `/manufacturing/wip-tracking`.
- **Market lists:** new India facts stay on IN_ONLY pages; US pages must not link IN_ONLY services
  (`daily-wage-payroll`, `compliance-accounting`, `tally-integration`).
- **Quote checker:** done 5 Nov: every new source key above is in `DOCS` (`scripts/check-construction-quotes.mjs`), the texts copied to `FOLDER SAMPLE - FOR APP/Construction/sources/… 2026-11-05.txt` (GCC from the plain extraction). `aia-g701`, `aia-g702`, `aia-a201`, `fl-715.12` and `cpwd-circulars` have no key: nothing quotes them.
- **Datum AI** (`structonova-ops/lib/assistantTools.js`): done 5 Nov (uncommitted): US `change_orders` look-up
  (approved / pending / declined per job) and "retainage to date" on the US RA-bills look-up. Still to do: deductions
  per RA bill (India, once the demo has deductions) and a "where to read more" link per look-up after the pages ship.
- **`ADAPTIVE.NA`:** add `/industries/construction-company` in the same change as the US industry page; before the
  page exists it would send North American visitors to a 404.

## Biggest gaps found

1. **India RA bills in the demo have no deductions**: no security deposit, client TDS, GST TDS, advances or escalation.
   The pages can explain them fully; the demo can't show them. This is the main "we'd build it" for Indian
   contractors and the first thing a CPWD contractor will look for.
2. **No WIP schedule in the demo, and the WIP page had no sources.** Now sourced (26 U.S.C. 460, Rev. Proc. 2025-32,
   SBA 994F); the demo has the inputs (cost to date, approved work, billed, estimate) but no estimate-to-complete or
   over/under billing.
3. **State law was missing from the US pages.** California (5% private cap from 1 Jan 2026), New York (5% cap,
   amended 26 Dec 2025) and Texas (10% owner's reserve; the 2023 unsigned change order rule) change what a contractor
   can do; Massachusetts and Illinois couldn't be read.
4. **"GCC 2026" isn't a CPWD document**; GCC 2023 as amended is current, and two 2025–26 circulars that touch
   security deposit and Clause 1 still need saving by hand.
5. **GST rate**: the page gave none; 18% is now the rate for the entries moved in September 2025, but the CGST Act copy
   is a 2020 consolidation and the consolidated rate notification wasn't found officially.
6. **Demo labels TDS as 194C** after the 2025 Act replaced it; US QuickBooks sync exists on `demo-us` but isn't in the
   demo's own feature text, so don't claim it until checked live.

---

## Batch 4: construction after billing (planned 6 Nov 2026)

The roadmap's "Later" row: material vs BOQ norms, site control from the phone, and job cost and margin per site.
Checked against the existing pages first. Nothing covers material consumption or daily site records, and the WIP
schedule is US-only (it doesn't cover an Indian contractor's per-site cost), so three new India guides are needed. The
rest is folded into existing pages. That makes one batch of 5:

| # | Page | New or folded | Primary sources | What the demo really does (structonova-ops) |
|---|---|---|---|---|
| 1 | `construction/material-consumption-vs-boq` (India) | New | CPWD GCC 2023 Clause 38 (theoretical consumption: steel +3% wastage, pipes and cables +5%, sheets +10%, variation per Schedule F); CPWD Works Manual 5.7 (cement register) | `lib/material-recon.js`: norm per BOQ line, expected = approved work × norm, actual = issues on daily reports, flagged beyond ±10% |
| 2 | `construction/daily-progress-reports` (India) | New | CPWD Works Manual 5.7 (site order book, cement register, online inspection register), 5.15 (hindrances written in the site order book; physical hindrance register dropped for NITs from 19.2.2019); GCC 2023 (contractor's representative signs the site order book) | `lib/dpr.js`, `lib/site-attendance.js`, `lib/geo.js`, `lib/wpr.js`: one report per site per day from the phone, PM approval, photos, attendance flagged away from the site pin, weekly client report |
| 3 | `construction/job-cost-per-site` (India) | New | ICAI AS 7 (contract costs: direct, attributable, chargeable; excluded costs; stage of completion; expected loss recognised at once) | `lib/mis-math.js`: cost = material + labour + site cash + machine days; margin to date = approved work − cost; projected cost = cost ÷ progress once 5% is done |
| 4 | `construction/wip-schedule` (US) | Folded: one H2 on building job cost per job | (existing sources) | Same dashboard maths in the US build |
| 5 | `industries/construction-company.md` (India) | Folded: link the three new guides from the sections they belong to | — | — |

No US daily report page: no US statute governs daily reports, and the US industry page already describes them.
Images for pages 1–3 go into `docs/construction-image-prompts.md`; each page shows its image once the file exists.
