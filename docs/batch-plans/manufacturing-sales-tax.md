# Batches 10–14: QuickBooks, choosing an ERP, shop floor, electronics US, sales tax

Plan written 5 Nov 2026 for `docs/content-roadmap.md` batches 10–14. Research only: no page in the repo was changed.
Every URL in this file was opened on 5 Nov 2026 (in the in-app browser, or with `curl` for the one PDF) unless
it is marked **not opened**. `quickbooks-for-manufacturing.md` is batch 1 and is not planned here.

Rules carried from the roadmap: improve the existing page; facts only from cited primary sources; every H2 a buyer's
question answered in its first sentence; `related:` 3–5 paths, at least two outside the page's own section;
`metaTitle` ≤ 60 characters where the title is longer; description ≤ 160.

## How to use this plan

1. **Quotes.** Each "Quotes" block is an exact sentence from the source, for the page's `checks:` front matter. The
   checkers (`scripts/check-manufacturing-quotes.mjs`, `scripts/check-sales-tax-quotes.mjs`) only know the documents in
   their `DOCS` maps, read from the saved browser text in `~/Developer/FOLDER SAMPLE - FOR APP/{Manufacturing,Sales tax}/sources`.
   Quotes marked **existing doc** are in a file already saved (2–3 Nov). Quotes marked **new doc `key`** need the page's
   text saved there first (browser text, `<Publisher> - <Title> 2026-11-05.txt`) and the key added to the checker's
   `DOCS` map. Hidden accordion text (Texas Comptroller pages) only appears in `document.body.textContent`, not in
   `innerText`; save from `textContent` or open the accordions first.
2. **Linking out.** Pujan wants the source sites referenced in the text too (for readers, trust and search). Each page
   below has an **Outbound links** line: link the primary source inline at the sentence that uses it, with the
   publisher's own page title or a plain description as anchor text ("the Texas Comptroller's manufacturing
   exemptions guide", not "here"). Keep them as normal links (no `nofollow`) for government, Intuit and the Governing
   Board; forum threads are cited as "what owners ask", linked the same way. These are in addition to the front-matter
   `sources:` list, not instead of it.
3. **Demos.** Only claim what the "What the demos really do" section says. Real clients run the India builds; the US
   builds run on sample companies and an Intuit sandbox.
4. **Buyer questions.** Taken from Intuit's QuickBooks Community, Practical Machinist, Reddit (r/QuickBooks,
   r/Bookkeeping, via the last30days tool; Reddit itself refuses automated reading, so threads are cited from that
   tool's saved results) and the agencies' own FAQs. Google's People Also Ask boxes can't be read automatically; check
   2–3 of the planned H2s against a live search by hand before writing.

---

## Facts that have changed or are missing on the current pages

| Page(s) | What the page says now | What the source says on 5 Nov 2026 | Source |
|---|---|---|---|
| `sales-tax/economic-nexus-thresholds` + `src/lib/sales-tax-calc.ts` (KY rule) | Kentucky: "$100,000 or more or 200 or more sales" (quoted from the Board's chart) | **Changed, confirmed.** Kentucky's 2026 HB 757 (Acts Ch. 161, vetoed in part and overridden, delivered to the Secretary of State 14 Apr 2026) amends KRS 139.340 to "redefine the sales and use tax nexus standard for remote retailers". The bill page's index reads "Effective Dates, Delayed - Marketplace provider and remote retailer, taxation thresholds, August 1, 2026", and the subject index reads "Remote retailer, transaction threshold nexus standard, deletion". The Department of Revenue's SSUTA recertification letter (29 Jul 2026) says the bill "removed the economic nexus standard of 200 or more sales transactions as a registration requirement for remote retailers (KRS 139.340) and marketplace providers (KRS 139.450)". So from **1 Aug 2026** Kentucky is $100,000 of gross receipts only. The Board's chart still shows the old rule (it calls itself a summary "as of January 11, 2023"), and so do the DOR's own Sales & Use Tax page and TAXANSWERS FAQ. **Highest-priority fix:** change the checker rule and the "transaction thresholds going away" paragraph. | S17–S20; SST chart |
| `sales-tax/economic-nexus-thresholds` | "dropped the transaction count: … Illinois from January 1, 2026" | Still true. Add Kentucky (2026). Iowa and Wisconsin "Jan 2026" claims on some vendor blogs are wrong: the Board's chart shows Iowa with no count and Wisconsin's removed in 2021. | SST chart |
| `sales-tax/streamlined-sales-tax` | CSPs "Avalara, TaxCloud, Sovos, AccurateTax and Avior" | Same five, plus "Exactor (a subsidiary of Intuit)" certified but not offering free services. **Missing:** a CSP may charge "to process non-taxable transactions if the non-taxable transactions exceed 30%" in a state, which hits distributors whose sales are mostly for resale. | streamlinedsalestax.org/certified-service-providers/freeservices |
| `manufacturing/quickbooks-online-vs-desktop` | Users "By plan"; Desktop Enterprise "Up to 40" | QBO: Simple Start 1 user, Essentials 3, Plus 5, Advanced 25. Desktop Enterprise: Gold and Platinum "1-10 or up to 30 users", Diamond "1-10 or up to 40 users". No prices on the page today. | quickbooks.intuit.com/pricing/; /desktop/enterprise/pricing/ |
| QuickBooks pages (all) | No prices | QBO list prices a month: Simple Start $38, Essentials $85, Plus $140, Advanced $340 (50% off for 3 months shown as $19 / $42.50 / $70 / $170). New **QuickBooks Free** plan ($0). Desktop Enterprise "Starting at" Gold $2,210/yr, Platinum $2,717/yr (both "Annual subscription"), Diamond $5,363/yr ("Monthly subscription"), custom pricing by users. Confirmed on a screenshot of the page on 5 Nov; the "$38/$19 on every tier" the batch-1 session saw was probably the QBO promo banner. Write "starting at … a year" and quote the custom-pricing caveat. | same |
| `manufacturing/quickbooks-online-inventory` | QBO inventory has no manufacturing angle | Intuit's pricing page now carries a "Right for your industry" block: "Manufacturing inventory … Know what's on hand and what it's worth, with FIFO costing and reorder points." marked NEW (not in the 3 Nov saved text). BOMs and manufacturing orders are still Intuit Enterprise Suite only. | quickbooks.intuit.com/pricing/ |
| `manufacturing/quickbooks-integration` | Webhooks + CDC presented as how the sync works | Our two US connectors **push only**; neither uses webhooks or CDC. **Missing:** Intuit App Partner Program (US since 28 Jul 2025): every app is in the free Builder tier, capped at 500,000 metered "CorePlus" (read) calls a month, and calls above it are blocked; writes ("Core") are unmetered. Webhook payloads now use the CloudEvents format. CDC doesn't cover TimeActivity, TaxCode, TaxRate. Marketplace listing needs a paid tier. | developer.intuit.com partner FAQ; webhooks; CDC |
| `manufacturing/quickbooks-desktop-end-of-support` | Framed around the May 31, 2026 date as news | That date is now 5 months past. **Missing:** what's next. Intuit has **not** published a discontinuation date for Desktop 2024 on its policy page (still the 2023 article, updated 5 Aug 2026); third-party sites disagree (May 31, 2027 vs Sept 30, 2027). Say that no date is published and link the policy page; don't state a 2024 date. | policy page |
| `services/inventory-and-reservations` (US name "Manufacturing inventory management software") | "the shortfall becomes a procurement order" | In the US electronics build the shortfall is pooled on a "To procure" list and staff pick items into a **draft** procurement order; it isn't automatic. Neither US build has bins, lots by field, or BOM-driven production in the electronics build. | ls-inventory `demo-us-market` SYSTEM.md §6h |
| `sales-tax/manufacturing-sales-tax-exemption` | California "partial exemption" without the rate | CDTFA: partial exemption rate **3.9375 percent**; purchases under it capped at **$200 million** per calendar year, no carry-over, no proration; certificate CDTFA-230-M; no application needed. Texas divergent use has a published formula (below). | cdtfa.ca.gov …/purchasers.htm; Texas 94-124 |

Facts checked and unchanged since 3 Nov: Texas $500,000 safe harbor and the fourth-month start rule, the 1.75% single
local use tax rate, four-year marketplace records, Texas 94-124 quotes, CDTFA Pub 103 and Wayfair-guide quotes,
the Board's 23 full members + Tennessee associate, every QBO help article quoted on the current pages (inventory,
FIFO/MAC, projects, manufacturing orders), the Desktop and Online solutions page ("Coming soon" BOM line still there),
CDC 30 days / 1,000 objects, webhook verifier tokens.

---

## Source register (all opened 5 Nov 2026)

Intuit

- I1 QuickBooks Online pricing: https://quickbooks.intuit.com/pricing/ (existing doc `intuit-pricing`, re-save for the "Manufacturing inventory" block)
- I2 Desktop Enterprise pricing: https://quickbooks.intuit.com/desktop/enterprise/pricing/ (new doc `intuit-ent-pricing`)
- I3 Desktop and Online solutions: https://quickbooks.intuit.com/desktop/ (existing doc `intuit-plans`)
- I4 Desktop 2023 service discontinuation policy: https://quickbooks.intuit.com/learn-support/en-us/help-article/feature-preferences/quickbooks-desktop-service-discontinuation-policy/L17cXxlie_US_en_US (existing doc `intuit-sunset`)
- I5 Set up and track inventory in QBO: https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-management/set-track-inventory-quickbooks-online/L22FZLBGN_US_en_US (existing `intuit-qbo`)
- I6 Inventory valuation methods: https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-management/fifo-used-inventory-cost-accounting/L1x3hkunE_US_en_US (existing `intuit-qbo`)
- I7 Get started with manufacturing orders and assemblies: https://quickbooks.intuit.com/learn-support/en-us/help-article/sales-orders/learn-manufacturing-orders-assemblies/L7ffspckB_US_en_US (existing `intuit-mo`, saved copy is partial: re-save whole)
- I8 Plan and track production with manufacturing orders and build assemblies: https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-account/understand-production-costs-using-manufacturing/L4FBrL1Ip_US_en_US (new doc `intuit-mo-track`)
- I9 Create projects: https://quickbooks.intuit.com/learn-support/en-us/help-article/manage-projects/set-create-projects-quickbooks-online/L9GAdLMyT_US_en_US (existing `intuit-qbo`)
- I10 Use serial or lot numbers (Desktop Enterprise): https://quickbooks.intuit.com/learn-support/en-us/help-article/product-preferences/use-serial-lot-numbers/L7pICcele_US_en_US (new doc `intuit-lots`)
- I11 Desktop Enterprise Advanced Inventory: https://quickbooks.intuit.com/desktop/enterprise/advanced-inventory/ (new doc `intuit-adv-inv`)
- I12 Intuit App Partner Program FAQ: https://developer.intuit.com/app/developer/qbo/docs/get-started/partner-faq (new doc `intuit-partner`; the page renders after ~4 s)
- I13 Configure webhooks: https://developer.intuit.com/app/developer/qbo/docs/develop/webhooks/configure-webhooks (existing `intuit-dev`, re-save: payload section changed)
- I14 Change data capture: https://developer.intuit.com/app/developer/qbo/docs/learn/explore-the-quickbooks-online-api/change-data-capture (existing `intuit-dev`)
- Intuit Community, "Track inventory location and serial numbers" (redirects to /community/reports-and-accounting-5/track-inventory-location-and-serial-numbers-38562): https://quickbooks.intuit.com/learn-support/en-us/reports-and-accounting/track-inventory-location-and-serial-numbers/00/133598 (opened; the accepted answer says QBO "does not have a notion of inventory locations" and suggests putting serials in item names, "extremly tedious". It is 9 years old, so cite it as a long-standing question and use I10/I11 for the current facts.)

States, Board, Court

- S1 SST Remote Seller State Guidance: https://www.streamlinedsalestax.org/for-businesses/remote-seller-faqs/remote-seller-state-guidance (existing `sst-chart`)
- S2 SST State Information (redirects to /Shared-Pages/State-Detail): https://www.streamlinedsalestax.org/about-us/state-information (existing `sst-states`)
- S3 SST Free services (redirects to /certified-service-providers/freeservices): https://www.streamlinedsalestax.org/for-businesses/free-sales-tax-services (existing `sst-free`)
- S4 SST Exemptions (redirects to /Shared-Pages/exemptions-): https://www.streamlinedsalestax.org/for-businesses/exemptions (existing `sst-exemptions`)
- S5 SST Certificate of Exemption (Form F0003) PDF: https://www.streamlinedsalestax.org/docs/default-source/forms/exemption-certificateb926a7ab4a0d43e1ad4fe8eb19e79cbb.pdf?sfvrsn=857843d_5 (fetched with curl; new doc `sst-f0003` from `pdftotext`)
- S6 Supreme Court docket 17-494: https://www.supremecourt.gov/docket/docketfiles/html/public/17-494.html (the Court's own opinion PDF URL `…/opinions/17pdf/17-494_j4el.pdf` now returns 404)
- S7 South Dakota v. Wayfair, opinion text (Cornell LII): https://www.law.cornell.edu/supremecourt/text/17-494 (new doc `wayfair-lii`)
- S8 Texas Comptroller, Remote Sellers: https://comptroller.texas.gov/taxes/sales/remote-sellers.php (existing `tx-remote`)
- S9 Texas Comptroller, Sales and Use Tax: https://comptroller.texas.gov/taxes/sales/ (new doc `tx-sales`)
- S10 Texas Comptroller, Manufacturing Exemptions 94-124: https://comptroller.texas.gov/taxes/publications/94-124.php (existing `tx-mfg`, re-save with the divergent-use formula)
- S11 Texas Comptroller, Use Tax: https://comptroller.texas.gov/taxes/sales/use-tax.php (existing `tx-use`)
- S12 CDTFA, Wayfair guide: https://cdtfa.ca.gov/industry/wayfair/ (existing `ca-wayfair`)
- S13 CDTFA, Manufacturing exemption guide: https://cdtfa.ca.gov/industry/manufacturing-and-research-and-development-equipment-exemption/ (existing `ca-mfg`)
- S14 CDTFA, Purchasers (rate, cap, certificate): https://cdtfa.ca.gov/industry/manufacturing-and-research-and-development-equipment-exemption/purchasers.htm (new doc `ca-mfg-buy`)
- S15 CDTFA, Publication 103: https://cdtfa.ca.gov/formspubs/pub103/ (existing `ca-pub103`)
- S16 New York, registration for businesses with no physical presence: https://www.tax.ny.gov/pubs_and_bulls/publications/sales/nexus.htm (new doc `ny-nexus`)
- S17 Kentucky General Assembly, 2026 HB 757: https://apps.legislature.ky.gov/record/26rs/hb757.html (new doc `ky-hb757`; the effective-date line is in the page's index headings)
- S18 Kentucky General Assembly, 2026 subject index "Taxation, Sales And Use": https://apps.legislature.ky.gov/record/26RS/8105.html
- S19 Kentucky Department of Revenue, SSUTA recertification letter, 29 Jul 2026 (PDF): https://revenue.ky.gov/Business/Sales-Use-Tax/Documents/KY%20SSUTA%20Recertification%20-%207-29-26.pdf (opened in the browser; its text is in an embedded font that couldn't be extracted, and the site blocks scripted downloads, so the quote above comes from the search index of this PDF. Read it by eye and save the text by hand before using it in `checks`.) - S20 Kentucky Acts 2026, Chapter 161 (HB 757 as enacted), PDF: https://apps.legislature.ky.gov/law/acts/26RS/documents/0161.pdf (downloaded with curl, text from `pdftotext`; new doc `ky-ch161`). Section 16 amends KRS 139.340 (remote retailers) and Section 1 KRS 139.450 (marketplace providers); Section 135: "Sections 1, 11 to 17, 45, 95 to 97, and 116 of this Act take effect August 1, 2026." Also new from that date: services delivered into Kentucky count toward the $100,000, and a remote retailer must register and collect "no later than the first day of the calendar month that is at the most sixty (60) days after the" threshold is reached.
- The DOR's still-outdated pages are https://revenue.ky.gov/Business/Sales-Use-Tax/pages/default.aspx and https://taxanswers.ky.gov/Sales-and-Excise-Taxes/Pages/Remote-Retailers-Marketplace-Providers-FAQs.aspx (from search, **not opened**).

Forums (questions, not facts)

- F1 r/Bookkeeping, "QuickBooks Free for solo businesses. Anyone using it?" (29 Oct 2026): https://www.reddit.com/r/Bookkeeping/comments/1xi7jmy/quickbooks_free_for_solo_businesses_anyone_using/
- F2 r/QuickBooks, "Finally understand why everyone hates QuickBooks" (21 Oct 2026; top advice: don't migrate years of history): https://www.reddit.com/r/QuickBooks/comments/1xbs9kl/finally_understand_why_everyone_hates_quickbooks/
- F3 r/QuickBooks, "QuickBooks 2013" (still running an old Desktop offline, 11 Oct 2026): https://www.reddit.com/r/QuickBooks/comments/1x3hm08/quickbooks_2013/
- F4 r/QuickBooks, "Vibe code Quickbooks" (integration builders, 2026): https://www.reddit.com/r/QuickBooks/comments/1x396c0/vibe_code_quickbooks/
- F5 Practical Machinist threads already cited on the pages (machine scheduling 393367 and 386668, ERP 400718 / 411796 / 395119 / 394704, paperless tracking 327437, tablets 322887, actual vs bid 446887). Two more threads from search, "small manual machine shop ERP" (438078) and "How do you manage projects/jobs for the shop" (441826), couldn't be opened: on 5 Nov the site showed a bot-check page to the browser. **Don't cite them** unless someone opens them by hand.

Reddit in the last 90 days had almost nothing from manufacturers on these subjects (r/manufacturing threads were about
sourcing, not systems); r/QuickBooks is mostly Desktop break-fix and Intuit complaints. So the buyer questions below
lean on Intuit Community and Practical Machinist, which is where shop owners ask them.

---

## What the demos really do (US builds)

**US electronics build** (`ls-inventory`, branch `demo-us-market`, electronics-erp-us.ahromlabs.com; read from
`SYSTEM.md` §2–6j, `utils/market.js`, `frontend/lib/market.ts`, `scripts/demo/seed.mjs`):

- Items → reels → boxes, each reel and box numbered with a QR label; receiving at the item's standard pack quantity.
- Two stores (Main store, Partner Store); transfers by reel or whole box (all or nothing); partner staff locked to their store on the server, with a daily sign-off of yesterday's dispatch before they can record.
- Dispatch by scanning reels/boxes into a shipment, checked line by line against the customer PO; a reel ships whole or in part.
- Reservations: whole reels at the main store set aside per customer PO line, oldest first (the last reel may overshoot); dispatching a reel reserved for another PO needs a manager's override; transfers refuse reserved reels.
- Procurement: open PO lines' shortfall pooled on "To procure"; staff pick items into a draft procurement order; receiving against it reserves the new reels to waiting PO lines, earliest dispatch date first.
- Approvals: staff entries wait for a manager; approved requests replay through the same code as direct ones.
- Customer portal: a customer sees its own orders' line status and progress (no stock figures, suppliers or costs), plus a read-only stock view.
- Reports: stock summary by date and store, analytics, dead and low stock, daily report PDF.
- QuickBooks Online (Intuit sandbox): connect in Settings → Integrations, map seven ledgers; partner-store sales invoices and bank receipts go to QuickBooks (receipts with Send), approved purchase invoices go as bills, linked bank payments as bill payments. Lines `TAX`/`NON`, QuickBooks works out the tax. No credit or debit notes; edits after sending aren't re-sent.
- US words: dollars, US date style, Central Time, Letter paper, "Customs Entry" for the import document type, Tally wording replaced by "the books".
- **Does not have:** bins, manufacturer part numbers, date codes or MSL as fields (batch is free text), landed cost spread into items, exemption certificates, sales by ship-to state, multi-rate sales tax (the seed uses one 8.25% rate), webhooks or reads back from QuickBooks. Uploads, AI beyond two questions, and settings changes are off in the public demo. The 88–95% extraction rates and 5,256 reels are **LS Technologies' India figures**; use them only labelled as such.

**US boiler build** (`shanti-ops`, branch `demo-us`, boiler-erp-us.ahromlabs.com; `SYSTEM.md` §5g, §5dn, item 29, §5fk–5fl):

- Job costing: labor = minutes logged on job cards × each employee's cost rate (today's rate, not frozen); material = issued purchase orders for the job; margin = order value minus both. Work orders carry a planned cost: planned material (entered unit costs) and route steps' planned minutes × the work center's machine-hour rate. **No overhead or subcontract cost field**: outside job cards are listed, not costed. Consumables carry no price.
- Planning: Material Plan (coverage per BOM line from stock, remnants, open POs), Capacity per work center (shifts per day, hours per shift, working days), a read-only Schedule of work orders as bars, daily alerts. **No automatic rescheduling**; dates move through a change note.
- Rework cards linked to a failed QC or hydro test.
- QuickBooks Online (sandbox): issued invoices and recorded payments with their customer; approved vendor bills and vendor payments with their vendor; one request id per call; status label and Retry on each row. Sales tax left to QuickBooks' automated sales tax; QuickBooks' total stored beside ours. No credit/debit notes; edits after sending aren't re-sent.
- **Does not have:** exemption certificates, use-tax accrual, sales by state, webhooks/CDC.

The finite-schedule demo and the job cost calculator on `/manufacturing/...` are the site's own tools, not the builds.

---

# Batch 10: QuickBooks cluster

## 10.1 `manufacturing/quickbooks-integration`

metaTitle: "QuickBooks Online integration for a shop or ERP system"
description: "How a shop system connects to QuickBooks Online: who owns each record, what syncs, API limits and fees since 2025, sales tax, and what our connector sends."

H2s (question, then the one-line answer the section opens with):

1. **Which system should own each record, QuickBooks or the shop system?** The shop system owns jobs, items and stock; QuickBooks owns the ledger, bank and tax codes; decide each record before any code.
2. **What does the QuickBooks Online API let a shop system sync?** Customers, vendors, items, invoices, payments, bills and bill payments through an app the company connects once with OAuth 2.0.
3. **How does the shop system find out about changes made in QuickBooks?** Webhooks notify it (now in CloudEvents format, first notice can take up to five minutes) and change data capture re-reads up to 30 days, 1,000 objects a response, as the safety net.
4. **Does the QuickBooks API cost anything?** Writing data is free; reading is metered since Intuit's App Partner Program launched in the US on July 28, 2025, and the free Builder tier blocks reads above 500,000 a month.
5. **Who calculates sales tax, QuickBooks or the shop system?** With automated sales tax, QuickBooks does, from the ship-to address and each line's taxable flag; send lines, not a tax amount (keep the $21,959 vs $21,200 sandbox story).
6. **What goes wrong in a QuickBooks sync, and how do you catch it?** Failed posts, drifting totals and edits on the wrong side; log every failure, compare totals nightly, make the non-owner read-only.
7. **Does a private connection need Intuit's app review?** Production keys need an approved App Assessment Questionnaire; App Store listing adds a three-part review and, under the Partner Program, a paid tier.
8. **What does the Ahrom Labs connector send to QuickBooks?** Invoices, payments, bills and bill payments from two US demos on an Intuit sandbox; it pushes only and doesn't yet read changes back.

Quotes (new doc `intuit-partner`): "The program launched in the US on July 28, 2025." · "All apps are automatically enrolled in the Intuit App Partner Program at the Builder tier." · "Core API calls cover most data-in operations such as creating or updating invoices, bills, customers, vendors, etc. Core API calls are unmetered and uncharged." · "Any CorePlus API calls made above the included monthly credit will be blocked entirely." · "To avoid a delisting, you must subscribe to Silver." Existing `intuit-dev`: keep the eight current quotes; add (re-saved) "It may take up to five minutes to get your first webhook notification." and "You can use the CDC operation for all API entities except the following:" (list: JournalCode, TaxAgency, TimeActivity, TaxCode, TaxRate).

Worked example: a shop sends 1,200 invoices, 900 payments, 600 bills and 500 bill payments a month: 3,200 writes, all Core, free. If it also reads each record back after posting (3,200 CorePlus), runs CDC every 15 minutes (2,880 a month) and a nightly total check of 4 queries (120), that's 6,200 CorePlus calls, 1.2% of the Builder cap. Polling every record every 5 minutes instead (3,200 × 8,640) would pass the cap in hours: poll by CDC, not by record. Keep the sandbox tax gap: $21,959 − $21,200 = $759 of tax QuickBooks didn't charge because the state wasn't set up.

Demo claims: as listed under "What the demos really do"; remove "four US demos" unless construction and interiors are checked by that session (only electronics and boiler were read here). State plainly that changes made in QuickBooks don't flow back yet.

related: `/patterns/failures-flagged-not-lost`, `/sales-tax/sales-tax-in-erp`, `/industries/boiler-pressure-vessel-manufacturing`, `/construction/pay-applications`, `/manufacturing/quickbooks-vs-erp`

Outbound links: I12 at H2 4, I13 and I14 at H2 3, Intuit's publish-app and app-review pages (already in `sources:`) at H2 7, F4 as "what integration builders say".

## 10.2 `manufacturing/quickbooks-job-costing`

metaTitle: keep "QuickBooks job costing for manufacturers: estimate vs actual" (59)
description: "Can QuickBooks do job costing for a machine shop? What projects track, what they miss (machine time, setup, scrap), and one job costed both ways, with numbers."

H2s:

1. **Can QuickBooks do job costing for a manufacturer?** Yes, through projects in Online Plus ($140/mo list), Advanced ($340) and Intuit Enterprise Suite, which group a job's invoices, bills, expenses and timesheets.
2. **How does labor get into a QuickBooks project?** Two ways: payroll expenses after each run, or estimated hourly costs (hours × a fixed rate per employee, only for time after the rate was set).
3. **Why doesn't the project profitability report match my labor estimate?** It uses payroll expenses only; estimated hourly costs don't feed it.
4. **What does a machine shop need that QuickBooks projects don't split?** Setup vs run, machine time at a shop rate, scrap, rework and quoted hours per operation (keep the table).
5. **What does the same job look like in QuickBooks and in a shop system?** (new worked example below)
6. **How do you job cost with QuickBooks and a spreadsheet?** Keep the five steps and the workbook link.
7. **When should job costing move into a shop system?** When the comparison arrives after the job ships; keep the paragraph, add the boiler demo's planned-vs-actual.

Quotes: keep the five existing `intuit-qbo` quotes. Price line from I1 (re-saved `intuit-pricing`): the page's plan blocks; quote "Track project profitability" (Plus feature list).

Worked example (extends the existing bracket job, every figure made up): QuickBooks project view: income $3,700; costs = material bills $946.40 (200 + 8 remade at $4.55) + outside processing $300 + estimated labor 31 h × $32 = $992 → cost $2,238.40, profit **+$1,461.60 (39.5%)**. Shop view: same plus machine time 31 h × $65 = $2,015 → cost $4,253.40, margin **−$553.40 (−15.0%)**. The $2,015 gap is the machine and overhead rate a per-employee rate can't hold.

Demo claims: boiler demo's labor = logged minutes × employee rate, planned labor = planned minutes × machine-hour rate; it does **not** cost overhead or outside processing (listed only) — say so if the page points readers to the demo.

related: `/systems/job-costing`, `/industries/boiler-pressure-vessel-manufacturing`, `/construction/wip-schedule`, `/manufacturing/wip-tracking`, `/manufacturing/quickbooks-online-inventory`

Outbound links: I9 at H2 1, Intuit's hourly labor article (already in sources) at H2 2–3, Practical Machinist 446887 at the hours-factor paragraph.

## 10.3 `manufacturing/quickbooks-online-inventory`

metaTitle: keep "QuickBooks Online inventory: limits for manufacturers" (52)
description: "What QuickBooks Online inventory tracks (plans, FIFO or average cost, reorder points) and where a manufacturer outgrows it: WIP, reservations, locations, lots."

H2s:

1. **Which QuickBooks Online plans track inventory?** Plus ($140/mo list) and Advanced ($340); Simple Start and Essentials need the inventory add-on or an upgrade; the new free plan doesn't.
2. **Does QuickBooks Online now have manufacturing inventory?** Intuit's pricing page lists "Manufacturing inventory" as FIFO costing and reorder points; bills of materials and manufacturing orders are still Intuit Enterprise Suite features.
3. **FIFO or average cost: which should I choose, and can I change it later?** Choose once with your accountant: it can't be changed, and an item created before choosing defaults to FIFO (worked example).
4. **Can QuickBooks Online track stock by warehouse, bin, lot or serial number?** Not in Online: lots, serials, expiry and bins are Desktop Enterprise Advanced Inventory (Platinum and Diamond); QBO's "locations" are for accounting, not stock.
5. **Can QuickBooks Online set stock aside for a job or order?** No; quantity on hand shows the shelf, not what's promised (in Enterprise Suite, a planned manufacturing order reserves its components).
6. **Where does work in progress go in QuickBooks Online?** Nowhere as a stage of its own; material sits in stock until someone adjusts it.
7. **What changes when you add a stock layer beside QuickBooks?** Keep the table; then the electronics demo paragraph.
8. **When should a manufacturer stay on QuickBooks Online inventory?** Keep "when to stay, when to move".

Quotes: keep the four existing. Add new doc `intuit-mo-track`: "Planned: The initial stage where components are reserved." and "Planned or In Progress: Deleting the order permanently removes the transaction and releases reserved inventory." New doc `intuit-lots`: "QuickBooks Desktop Enterprise lets you track inventory with serial numbers, lot numbers, with expiration dates when you turn on Advanced Inventory." New doc `intuit-adv-inv`: "Track inventory your way with three levels of location tracking (e.g., row, shelf, and bin; section, area, pallet)." Re-saved `intuit-pricing`: "Know what's on hand and what it's worth, with FIFO costing and reorder points." and "Track classes and locations (40)".

Worked example: buy 100 bars at $4.20, then 100 at $4.55; sell 120. FIFO: cost of goods $511.00 (100 × 4.20 + 20 × 4.55), stock left $364.00. Moving average: $4.375 each, cost of goods $525.00, stock left $350.00. Reservation: 500 ft of bar on hand, job A needs 300, job B 300; QuickBooks shows 500 available to both, and the second job is 100 ft short on the floor.

Demo claims: electronics US demo reserves whole reels per PO line, two stores, scan in/out, manager override; it has **no bins or lot fields** (batch is a free-text label), so don't offer it as the answer to H2 4 beyond "stock by store".

related: `/services/inventory-and-reservations`, `/systems/stock-reservation`, `/notes/reels-boxes-and-two-stores`, `/industries/electronics-component-trading`, `/manufacturing/distributor-inventory-control`

Outbound links: I5, I6, I7/I8 (Enterprise Suite), I10/I11 (Desktop lots and bins), I1 (manufacturing inventory block).

## 10.4 `manufacturing/quickbooks-online-vs-desktop`

metaTitle: "QuickBooks Online vs Desktop Enterprise for manufacturers" (56)
description: "QuickBooks Online vs Desktop Enterprise for manufacturers and distributors: prices, users, inventory, assemblies and bins, from Intuit's own pages."

H2s:

1. **Is QuickBooks Online or Desktop better for a manufacturer?** For assemblies, bins and lots, Desktop Enterprise still does more; Online wins on access from anywhere and nobody minding a server.
2. **How much do QuickBooks Online and Desktop Enterprise cost in 2026?** Online $38–$340 a month list by plan; Desktop Enterprise from $2,210 (Gold), $2,717 (Platinum) or $5,363 (Diamond) a year, priced up by users.
3. **How many users does each allow?** Online: 1, 3, 5 or 25 by plan; Enterprise: up to 30 on Gold and Platinum, 40 on Diamond.
4. **Can QuickBooks Online build assemblies from a bill of materials?** Not in Online; Intuit lists BOM management for Advanced as "coming soon", and manufacturing orders are in Intuit Enterprise Suite.
5. **Which version tracks inventory by location, bin or lot?** Desktop Enterprise with Advanced Inventory (Platinum and Diamond): three levels of location, serial or lot numbers, expiry.
6. **Can I still buy or keep using Desktop?** Enterprise is sold by subscription; Desktop 2023 lost services after May 31, 2026; Intuit hasn't published a date for 2024.
7. **What is Intuit Enterprise Suite, and does it replace both?** Intuit's multi-entity cloud ERP, where its manufacturing orders live (single-level BOMs only).
8. **Do I need QuickBooks to do inventory at all?** Keep "the third option".

Quotes: keep the six existing. New doc `intuit-ent-pricing`: "Available in 1-10 or up to 30 users" and "Available in 1-10 or up to 40 users" (prices confirmed on screen; in saved text they appear as "$ 2210 /yr", so quote the user lines, not the prices). Existing `intuit-mo`: "Multi level bill of materials with sub assemblies aren't supported in Intuit Enterprise Suite."

Worked example (list prices, 12 users, made-up shop): QBO Advanced covers 25 users at $340/mo = $4,080/yr; a Desktop migrator gets 50% off the first year, so year one $2,040, three years $10,200. Desktop Enterprise Platinum starts at $2,717/yr for the smallest user band; three years from $8,151, before more users, hosting and payroll. Compare only after getting a quote for your user count.

Demo claims: none needed; point to 10.1 for the connector.

related: `/manufacturing/quickbooks-desktop-end-of-support`, `/manufacturing/quickbooks-online-inventory`, `/services/inventory-and-reservations`, `/industries/interior-design-and-furniture`, `/notes/accounting-inside-the-manufacturing-erp`

Outbound links: I1, I2, I3, I7, I11.

## 10.5 `manufacturing/quickbooks-desktop-end-of-support`

metaTitle: "QuickBooks Desktop end of support: 2023, 2024 and next steps" (59)
description: "QuickBooks Desktop 2023 lost support after May 31, 2026. What stopped, what Desktop 2024 users should know, and a manufacturer's options with real prices."

Title change suggested: "QuickBooks Desktop end of support: what manufacturers should do now" (the 2023 date has passed; the slug stays).

H2s:

1. **What happened when QuickBooks Desktop 2023 support ended?** After May 31, 2026 it lost live support, security updates, payroll tax updates, bank feeds, payments and emailed forms; the file still opens.
2. **Can I keep using an old QuickBooks Desktop version offline?** It opens, but without security updates or connected services, and reinstalling an old copy needs its registration file (F3 is the real-world version of this).
3. **When does QuickBooks Desktop 2024 lose support?** Intuit hasn't published a date on its discontinuation page as of 5 Nov 2026; watch that page, not third-party sites, which disagree.
4. **What are the options for a manufacturer still on Desktop?** Keep the options table, with prices from 10.4.
5. **How much does moving to QuickBooks Online Advanced cost?** $340 a month list; Desktop migrators get 50% off the first year and an implementation consultant at no cost for simple migrations.
6. **Should I move all my Desktop history to QuickBooks Online?** Usually not: bookkeepers advise moving lists, open items and balances and keeping the old file read-only for history (F2's top comment).
7. **How do you plan the move?** Keep the four steps.

Quotes: keep the five existing. Add existing `intuit-sunset`: "Because of this, older versions such as QuickBooks Desktop 2023 will stop getting support after May 31, 2026." Existing `intuit-plans` (I3): "Included at no cost for simple migrations." (check exact punctuation in the saved text; the page has "**").

Worked example: a 14-person shop on Premier Plus 2023: Advanced at $340 × 12 = $4,080, first year with the migration offer $2,040, saving $2,040. Parallel run: close October in both, compare the trial balance and stock value; a $1,250 stock difference found then is one count, found in March it's a year-end adjustment.

Demo claims: none; link 10.1 for keeping QuickBooks beside a shop system.

related: `/manufacturing/quickbooks-online-vs-desktop`, `/systems/data-migration`, `/notes/sales-history-moved-without-guessing`, `/services/custom-erp-crm`, `/manufacturing/quickbooks-integration`

Outbound links: I4, I3, I1, F2, F3.

---

# Batch 11: Choosing an ERP (US)

## 11.1 `manufacturing/quickbooks-vs-erp`

metaTitle: "QuickBooks vs ERP: signs you've outgrown QuickBooks" (51)
description: "Signs a manufacturer or distributor has outgrown QuickBooks, what to keep in QuickBooks, when an ERP should replace it, and what double entry really costs."

H2s:

1. **How do you know you've outgrown QuickBooks?** When the work happens outside it: quotes and travelers in spreadsheets, stock wrong between counts, jobs costed after they ship (keep the seven signs).
2. **What does QuickBooks still do well for a manufacturer?** Invoices, bills, bank, payroll, sales tax and the reports the accountant reads.
3. **Does Intuit sell anything for manufacturers beyond QuickBooks Online?** Desktop Enterprise (assemblies, Advanced Inventory) and Intuit Enterprise Suite (manufacturing orders, single-level BOMs).
4. **Should you add a system beside QuickBooks or replace it with an ERP?** Keep the table.
5. **What does running the business outside QuickBooks cost?** (worked example)
6. **What breaks first when you connect an ERP to QuickBooks?** The record-ownership rules and failure handling; link 10.1.

Quotes: keep the three; add `intuit-ent-pricing` / `intuit-mo` lines as in 10.4.

Worked example (made up): 40 orders a week typed three times (quote sheet, QuickBooks estimate, traveler) at 4 minutes each = 8 h/week, 416 h/year; at $28/h loaded, $11,648 a year before any error is fixed. One order shipped short because stock was wrong: freight $180 + a day's rework.

related: `/manufacturing/small-business-erp-options`, `/notes/outgrown-tally-signs`, `/industries/boiler-pressure-vessel-manufacturing`, `/services/custom-erp-crm`, `/ai-assistant/ai-in-erp`

Outbound links: I3, I7, I11.

## 11.2 `manufacturing/job-shop-erp`

metaTitle: "Job shop ERP: what a small manufacturer should look for" (55)
description: "Job shop ERP for small manufacturers: the quote-to-invoice flow, what to buy first, ten tests to run in a vendor demo, and what shop owners warn about."

H2s:

1. **What should a job shop look for in ERP software?** One record per job from quote to invoice: routing, reserved material, finite schedule, floor time and cost vs quote.
2. **What does a job shop ERP do, step by step?** Keep the nine steps.
3. **What should a 10–50 person shop buy first?** Keep the table.
4. **What do shop owners warn about before buying an ERP?** Keep the four warnings; add the small-shop thread (open F5 first).
5. **How do you test an ERP vendor in a demo?** Keep the ten tests, with the scoring example.
6. **Packaged, configurable or built for you: which fits a job shop?** Keep the three routes.
7. **What have we built that shows "fits the workflow"?** Keep the remnant and portal notes (India client), and say the US boiler demo shows job cost vs plan and capacity per work center.

Quotes: none required (forum paraphrase only). Optional `intuit-mo` line if QuickBooks' BOM limits are mentioned.

Worked example: score two vendors on the ten tests, 2 points each (2 shown live, 1 partly, 0 not): A = 15/20 but fails test 3 (reservation) and 9 (duplicate post); B = 13/20, passes both. Must-fail tests outweigh the total: pick B or make A fix them in the contract.

Demo claims: boiler US: job cards with time logs, rework cards, capacity per work center, read-only schedule bars, material plan; **no automatic rescheduling, no phone scanning claim** (not checked), no overhead costing.

related: `/manufacturing/production-scheduling-software`, `/systems/routing`, `/systems/job-traveler`, `/industries/boiler-pressure-vessel-manufacturing`, `/asme/u-stamp`

Outbound links: Practical Machinist 400718, 411796, 438078 (once opened).

## 11.3 `manufacturing/small-business-erp-options`

metaTitle: "Small business ERP for US manufacturers: 5 options compared" (59)
description: "NetSuite, Acumatica, Odoo, Fishbowl and Katana compared from their own pages for US manufacturers and distributors, plus Intuit's options and custom."

H2s:

1. **Which ERP should a small US manufacturer or distributor choose?** First decide whether accounting stays in QuickBooks; then test each on one of your real orders.
2. **Which systems sit beside QuickBooks and which replace it?** Keep the table.
3. **What does each vendor say it does?** Keep the vendor table (re-check each page; dates say 3 Nov).
4. **What does Intuit itself offer before you leave QuickBooks?** Desktop Enterprise, QBO Advanced and Intuit Enterprise Suite, with prices from 10.4.
5. **How much does a small business ERP cost?** Most quote per user and module; compare five-year cost on the same terms (worked example).
6. **When does a custom system fit better?** Keep.
7. **How do you choose in two weeks?** Keep the five steps.

Quotes: keep the seven; add `intuit-ent-pricing` if Intuit prices are given.

Worked example (illustrative, replace with real quotes): 15 users × $120/user/mo = $21,600/yr + $30,000 implementation → $138,000 over five years; a beside-QuickBooks inventory app at 6 users × $90 = $6,480/yr + $8,000 setup → $40,400 plus the QuickBooks subscription you already pay ($4,080/yr Advanced). Same sheet, same five lines, for every option.

related: `/manufacturing/custom-vs-off-the-shelf-erp`, `/manufacturing/erp-requirements-checklist`, `/services/inventory-and-reservations`, `/notes/tally-vs-erpnext-vs-custom-erp`, `/sales-tax/sales-tax-in-erp`

Outbound links: the four vendor pages already in `sources:`, I3.

## 11.4 `manufacturing/custom-vs-off-the-shelf-erp`

metaTitle: "Custom vs off-the-shelf ERP for small manufacturers" (50)
description: "Custom vs off-the-shelf ERP for small manufacturers: when each wins, five-year costs side by side, the one-builder risk, and what to get in writing."

H2s:

1. **Should a small manufacturer build a custom ERP or buy one?** Buy when your work fits a package; build in phases when your workflow is the advantage and you can get data, code and scope terms in writing.
2. **When does off-the-shelf win, and when does custom?** Keep the table.
3. **What do shop owners who've done both say?** Keep.
4. **What does each cost over five years?** Keep the table, add the worked example.
5. **How do you reduce the risk of a custom build?** Keep the six protections.
6. **What should you ask a builder before signing?** Keep.

Quotes: none (forum paraphrase).

Worked example (illustrative): package 15 users × $150/mo = $27,000/yr + $25,000 implementation = $160,000 over five years; custom: a phased build priced from Ahrom Labs' published US prototype price (pull the figure from `/us/services`, don't invent one) plus a yearly care plan. Then add the hidden lines: the spreadsheet person on the package side (5 h/week × $35 = $9,100/yr), and on the custom side the cost of moving if the builder disappears.

related: `/manufacturing/job-shop-erp`, `/notes/tally-vs-erpnext-vs-custom-erp`, `/services/custom-erp-crm`, `/patterns/derive-balances-dont-store-them`, `/manufacturing/small-business-erp-options`

Outbound links: Practical Machinist 395119, 394704.

## 11.5 `manufacturing/erp-requirements-checklist` (no sources today)

metaTitle: "ERP requirements checklist for US manufacturers (Excel)" (55, same as title)
description: "A free ERP requirements checklist for US manufacturers and distributors: 28 testable requirements and what each vendor must show, with a worked scoring example."

H2s:

1. **What should an ERP requirements checklist include?** Testable requirements by area, each with what the vendor must show in the demo.
2. **Why list tests instead of features?** Keep.
3. **What do the 28 requirements cover?** Keep the table.
4. **How do you score vendors with it?** (worked example)
5. **Which five tests rule out most systems?** Keep.
6. **Where do the QuickBooks and sales tax requirements come from?** From Intuit's API rules and the states' certificate and nexus rules: cite them here (this is how the page gets sources).

Sources to add: I12 (posting and limits), I5 (what QuickBooks covers), S1 (nexus by state), S4 (certificates on file), S8 (records kept four years). Quotes: `sst-exemptions` "Purchasers should provide the completed exemption certificate to their supplier and keep a copy for their records."; `intuit-partner` "Core API calls are unmetered and uncharged."; `tx-remote` "However, all sellers must keep required records of all marketplace sales for at least four years."

Worked example: 19 must-haves, 9 shoulds. Vendor A: 17 musts, 7 shoulds → fails (a missed must is a no). Vendor B: 19 musts, 4 shoulds → passes, weaker on reporting. Vendor C: 19, 8 → passes; compare B and C on price and exit terms.

related: `/manufacturing/job-shop-erp`, `/sales-tax/resale-certificates`, `/services/custom-erp-crm`, `/erp/check`, `/manufacturing/quickbooks-integration`

(Note `/erp/check` is India-only in `markets.ts`; if the related checker refuses market-mismatched links, use `/systems/three-way-match` instead.)

Outbound links: I12, S1, S4.

---

# Batch 12: Shop floor and inventory

## 12.1 `manufacturing/production-scheduling-software`

metaTitle: keep "Production scheduling software for job shops" (44)
description: "How production scheduling software works in a job shop: finite capacity, routings, shifts, due dates, dispatch rules vs optimizers, and a live demo."

H2s:

1. **What does production scheduling software do in a job shop?** Places each operation on a machine that can run it, in routing order, within staffed hours, and shows late jobs before they're late.
2. **What does a schedule need to know?** Keep the four-input table.
3. **What is the difference between finite and infinite capacity scheduling?** Keep, then the worked example.
4. **How does the software decide which job goes first?** Keep dispatch rules / APS / people with a tool.
5. **Where does AI help with scheduling, and where shouldn't it decide?** Keep.
6. **Why does a spreadsheet or whiteboard schedule stop working?** Keep; cite the whiteboard → Excel story (F5).
7. **What should you ask a scheduling software vendor?** Keep.

Quotes: none (forum paraphrase).

Worked example: weld cell 8 h a day, one shift. Wednesday holds J-103's 5 h weld plus the rush job's 8 h = 13 h: 5 h spill to Thursday, so J-103's later steps and ship date move a day. Two shifts give 16 h: everything fits. Weekly load 37 h of 40 h available = 92.5%: a shop is "full" well before 100% because one late operation pushes the chain.

Demo claims: the finite demo on this page is the site's tool. If the boiler demo is mentioned: capacity per work center and a read-only schedule; it doesn't reschedule by itself.

related: `/systems/finite-capacity-scheduling`, `/manufacturing/production-schedule-template`, `/industries/boiler-pressure-vessel-manufacturing`, `/ai-assistant/manufacturers`, `/notes/same-confidence-different-autonomy`

Outbound links: Practical Machinist 393367, 386668.

## 12.2 `manufacturing/production-schedule-template` (no sources today)

metaTitle: "Free job shop production schedule template (Excel)" (50, same as title)
description: "A free Excel production schedule template for job shops: routings by machine, planned days, due-date checks and daily machine load against shift hours."

H2s:

1. **Is there a free production schedule template for a job shop?** Yes: this Excel workbook, free under CC BY 4.0, no macros.
2. **What's in the template?** Keep the sheet table.
3. **How do you fill it in?** Keep the five steps.
4. **How do you read the Load sheet?** Keep the sample explanation, add the capacity formula.
5. **When does a spreadsheet schedule stop being enough?** Keep "its limits".

Sources to add (forum, the page has none): Practical Machinist 393367 (Excel grid of machines by day, one planner) and 386668. These support "one planner" and "owners say this is where spreadsheets break".

Worked example: capacity = machines × shifts × hours × days: 3 machines × 2 shifts × 8 h × 5 days = 240 h a week. The sample's welding Wednesday: 13 h booked on 8 → 162.5% load, red.

related: `/manufacturing/production-scheduling-software`, `/systems/routing`, `/systems/finite-capacity-scheduling`, `/construction/wip-schedule`, `/manufacturing/quickbooks-job-costing`

Outbound links: Practical Machinist 393367.

## 12.3 `manufacturing/wip-tracking`

metaTitle: "WIP tracking in a job shop with barcoded travelers" (49)
description: "How to track work in progress in a job shop: travelers, scan points, a work order and its WIP value, scan stations vs tablets, and getting operators to scan."

H2s:

1. **How do you track work in progress on a shop floor?** Barcode each job's traveler and have operators scan each operation's start and finish with good and scrapped quantities.
2. **Which events does WIP tracking record?** Keep the table.
3. **What does a job traveler with scan data look like?** Keep the work order table.
4. **What is the job's work in progress worth?** (worked example)
5. **Scan stations, tablets or phones: which works on a shop floor?** Keep.
6. **How do you get operators to scan?** Keep.
7. **When does WIP tracking pay off?** Keep, plus: QuickBooks Online has no WIP stage.

Quotes: optional `intuit-qbo` "Inventory features are available only for QuickBooks Online Plus and Advanced." for the QuickBooks sentence.

Worked example (traveler as of Wednesday 09:40, shop rate $97/h): material issued 208 blanks × $4.55 = $946.40; op 10 (0.5 h setup + 208 × 1.0 min = 3.97 h) and op 20 (1.0 h + 208 × 1.5 min = 6.2 h) done = 10.17 h × $97 = $986.17. WIP value $1,932.57, of which 8 bent blanks scrapped ($36.40 material + their share of time) is a loss to record now, not at month-end.

Demo claims: boiler demo: job cards with clock-time logs, quantity done/rejected, rework cards. **Don't claim barcode scanning in the boiler demo** (not checked). The electronics demo scans, but reels, not operations.

related: `/systems/work-in-progress`, `/systems/job-traveler`, `/systems/state-transition`, `/construction/wip-schedule`, `/manufacturing/quickbooks-job-costing`

Outbound links: Practical Machinist 327437, 322887.

## 12.4 `manufacturing/distributor-inventory-control`

metaTitle: keep "Distributor inventory control: counts, lots, FIFO, barcodes" (58)
description: "Inventory control for US distributors: cycle counts by ABC class, lot and serial traceability, FIFO valuation (IRS Pub 538), barcodes and GS1 numbers."

H2s:

1. **What inventory control does a small US distributor need?** Cycle counts, lot or serial numbers, one valuation method applied every year, and scanning at every movement.
2. **How does cycle counting replace the annual count?** Keep, then the worked example.
3. **What keeps cycle counts honest?** Keep the four rules.
4. **How do lot and serial traceability work in a recall?** Keep.
5. **Is FIFO valuation the same as picking the oldest stock first?** No: one is accounting, the other picking; a system should do both.
6. **Do you need GS1 barcodes?** Only for products sold to retailers; internal bin labels need none.
7. **Can QuickBooks do this, or do you need a stock system?** QBO has no bins or lots; Desktop Enterprise Advanced Inventory does (I10, I11).
8. **What should you look for in a system?** Keep.

Quotes: keep the three; add `intuit-lots` and `intuit-adv-inv` lines from 10.3.

Worked example: 1,200 items: A = 120 items counted monthly (1,440 counts a year), B = 360 quarterly (1,440), C = 720 twice a year (1,440): 4,320 counts ÷ 250 working days ≈ 17 bins a day, about 30 minutes for one person. Recall: lot 24-117 went to 6 customers; with lots captured at picking that's a filter, without it a week of invoices.

Demo claims: electronics demo: reel-level stock by store, cycle-count task in the demo seed, search across reel, item, box, customer and invoice; batch is free text, **no lot or serial field, no bins**.

related: `/services/inventory-and-reservations`, `/industries/electronics-component-trading`, `/notes/reels-boxes-and-two-stores`, `/systems/material-traceability`, `/manufacturing/quickbooks-online-inventory`

Outbound links: IRS Pub 538, GS1 US (already in sources), I10.

## 12.5 `/manufacturing` hub (`src/app/manufacturing/page.tsx`)

Current state: lead, "What it covers", Free tools, AI in the shop, then groups. No question headings, no link to a service or industry page.

Plan:

- H2s as questions: "What does production management software do?" (existing lead), "Which free tools can I use today?", "Where does AI help in the shop?", then each group's heading as a question ("How do I make QuickBooks work for a manufacturer?", "How do I choose an ERP?", "How do I plan and track the shop floor?", "How do I control inventory?") in `MFG_GROUPS`.
- Closing block (roadmap rule): "Want to see it on sample jobs?" → `/services/inventory-and-reservations` (US name "Manufacturing inventory management software"), `/industries/boiler-pressure-vessel-manufacturing`, the new `/industries/electronics-component-trading` US version, and `/sales-tax`.
- Add the US job-shop facts with numbers once: QBO $38–$340 a month; Desktop Enterprise from $2,210 a year (confirmed on screen 5 Nov).
- Description stays ≤160 (it's 151 now).

---

# Batch 13: Electronics US page + sales tax refresh

## 13.1 NEW `content/industries/us/electronics-component-trading.md`

Mechanism: copy the shape of `content/industries/us/boiler-pressure-vessel-manufacturing.md` (title, metaTitle, audience, answer, description, demo, services, notes, flow, evidence, then question H2s and a Boundary section). Add `"/industries/electronics-component-trading"` to `ADAPTIVE.NA` in `src/lib/markets.ts` so North American visitors get it at the shared URL and `/us/industries/electronics-component-trading` is built. Services must be ones shown in NA: not `tally-integration` or `receivables-from-tally` (IN_ONLY). Leave out `video` until a US tour exists (the current video is the India build).

title: "Inventory software for electronic component distributors"
metaTitle: "Electronic component inventory software for distributors" (56)
audience: "Electronic component distributors, brokers and importers in the US and Canada"
description: "Reel-level inventory for electronic component distributors: QR labels, two stores, dispatch checked against the customer PO, reservations and QuickBooks Online."
demo: `https://electronics-erp-us.ahromlabs.com/demo`
services: `[inventory-and-reservations, custom-erp-crm, sales-crm, customer-portal, document-extraction, custom-ai-assistant]`
notes: `reels-boxes-and-two-stores`, `customer-portal-one-order-every-department`, `ai-extraction-human-in-the-loop`, `assistant-that-answers-from-your-ledger`

H2s:

1. **Can I try it before talking to anyone?** Yes: the US demo with a made-up distributor, five logins (owner, manager, store staff, partner store, customer), reset nightly.
2. **Why track reels instead of quantities?** Customers order pieces, stores ship reels; knowing each reel says which ones fill an order and what's left on a part reel.
3. **How is every reel labelled and found again?** QR label per reel and box at receiving; one search across reel, item, box, customer and invoice.
4. **Can a shipment be checked against the customer's PO before it leaves?** Yes; scanned reels are compared line by line and it can't be submitted until they agree.
5. **How is stock reserved for a customer order?** Whole reels per PO line, oldest first; shipping one elsewhere needs a manager's override.
6. **What happens when stock is short?** Open lines' shortfall pools on a "To procure" list; staff turn it into a draft procurement order, and received reels go to waiting orders first.
7. **How is stock kept straight across two stores or a partner warehouse?** Transfers by reel or box, partner staff locked to their store, a daily sign-off.
8. **Does it work with QuickBooks Online?** Yes, in the demo against an Intuit sandbox: sales invoices, receipts, bills and bill payments; QuickBooks works out sales tax.
9. **Can customers see their own orders?** Yes, a portal with each line's status, no stock figures, suppliers or costs.
10. **What should a component distributor ask before choosing inventory software?** The five questions, rewritten for the US (reels vs totals, PO-checked dispatch, customs entries and freight reaching the books, QuickBooks, who sees what).
11. **Boundary.**

Remove from the India text (24 India-only terms per roadmap): TallyPrime, GST/IGST, bills of entry (use "customs entries"), HSN, rupees, Tally agent, CFS/THS/IGM ledgers, "Sundry Debtors".

Worked example: customer PO for 12,000 pcs of LM358DR; standard reel 2,500. Reserve 5 whole reels (12,500; the last overshoots). Ship 4 full reels + 2,000 from the fifth: the fifth stays in stock with 500, still reserved until the PO line closes. A scan of a reel reserved for another PO stops with "Reserved · PO …".

Evidence block (sample data only): "Logins in the demo: 5"; "PO lines checked before dispatch: every line"; "QuickBooks Online: invoices, receipts, bills, bill payments (sandbox)". Don't use the 88–95% or 5,256 reels unless written as "at LS Technologies in India".

Boundary text must say: same code as the system LS Technologies runs in India; not yet used by a US or Canadian distributor; one sales tax rate per line, no exemption certificates or sales-by-state report; no bins, MPN, date codes or MSL fields; uploads off in the demo; QuickBooks sends no credit notes and doesn't re-send edits.

related: `/services/inventory-and-reservations`, `/manufacturing/distributor-inventory-control`, `/manufacturing/quickbooks-online-inventory`, `/sales-tax/resale-certificates`, `/manufacturing/quickbooks-integration`

Outbound links: none required; optionally I5 at the QuickBooks question.

## 13.2 `sales-tax/sales-tax-in-erp`

metaTitle: "How an ERP should handle US sales tax: a buyer's checklist" (57)
description: "What an ERP or order system must record for US sales tax: ship-to rates, item taxability, certificates, sales by state for nexus, use tax, and QuickBooks' role."

H2 changes: "How to test a vendor's system" → **"How do you test a vendor's sales tax handling?"**. Add **"Can a remote seller use one Texas rate instead of every local rate?"** (yes: 1.75% local + 6.25% state). Others are already questions.

Quotes: keep the five. New doc `tx-sales`: "Texas imposes a 6.25 percent state sales and use tax on all retail sales, leases and rentals of most goods, as well as taxable services." and "Local taxing jurisdictions (cities, counties, special purpose districts and transit authorities) can also impose up to 2 percent". Existing `tx-remote`: "The single local use tax rate is an alternative local tax rate that remote sellers can use instead of collecting and remitting the total local tax in effect at the destination address."

Worked example: a $10,000 shipment into a Texas city with 2% local tax: destination rate 8.25% = $825; a remote seller using the single local rate: 6.25% + 1.75% = 8.00% = $800. Keep the QuickBooks $759 gap.

Demo claims: both US demos send taxable/non-taxable lines and let QuickBooks compute; the boiler demo taxes Ohio customers and 0% out of state; electronics uses one 8.25% rate. Neither holds certificates or a sales-by-state report: if the page says "our system does X", it must be "we'd build it".

related: `/manufacturing/quickbooks-integration`, `/services/custom-erp-crm`, `/industries/boiler-pressure-vessel-manufacturing`, `/manufacturing/erp-requirements-checklist`, `/sales-tax/use-tax`

Outbound links: S8, S9, S12, S3.

## 13.3 `sales-tax/sales-tax-nexus`

metaTitle: keep title "What is sales tax nexus? Physical and economic nexus" (51)
description: "What sales tax nexus is: physical presence, economic nexus after South Dakota v. Wayfair (2018), when a remote seller must register, and marketplace sales."

H2 changes: "What to do once you know where you have nexus" → **"What should you do once you have nexus in a state?"**. Add **"What did the Supreme Court actually decide in Wayfair?"**: Quill's physical-presence rule was "unsound and incorrect" and overruled; South Dakota's law covered sellers with more than $100,000 or 200 transactions a year.

Quotes: keep the eight. New doc `wayfair-lii`: "Because the physical presence rule of Quill is unsound and incorrect, Quill Corp. v. North Dakota, 504 U. S. 298, and National Bellas Hess, Inc. v. Department of Revenue of Ill., 386 U. S. 753, are overruled." and "deliver more than $100,000 of goods or services into the State or engage in 200 or more separate transactions for the delivery of goods or services into the State."

Worked example: a Texas remote seller's rolling 12 months pass $500,000 in July 2026: permit and collection by **November 1, 2026** (first day of the fourth month after July). A distributor with stock in a Pennsylvania 3PL has physical nexus there from the first pallet, whatever its sales.

related: `/sales-tax/economic-nexus-thresholds`, `/construction/lien-waivers` (out-of-state crews), `/services/custom-erp-crm`, `/industries/interior-design-and-furniture`, `/sales-tax/streamlined-sales-tax`

Outbound links: S6 + S7 (cite the docket as the Court's own record and LII for the text), S8, S12, S1.

## 13.4 `sales-tax/economic-nexus-thresholds` (+ `src/lib/sales-tax-calc.ts`)

metaTitle: "Economic nexus thresholds by state (2026), with a checker" (56)
description: "Economic nexus thresholds for every US state in 2026, which sales count (gross, retail or taxable), the period each uses, Kentucky's change, and a free checker."

H2 changes: "How to use the checker" → **"How do you check your own sales against each state?"**; "Thresholds by state" → **"What is each state's threshold?"**. Update **"Are transaction thresholds going away?"** with Kentucky: HB 757 (2026) dropped the 200-transaction test from August 1, 2026, leaving $100,000 of gross receipts, now counting services too, with registration due by the first of the month at most 60 days after the threshold is passed. Add the new Kentucky start rule to the nexus page's "When do you have to start collecting?" section as the second state example. Add **"Which states need both a dollar amount and a number of sales?"**: Connecticut ($100,000 and 200 retail transactions) and New York ($500,000 and more than 100 sales).

Quotes: keep the seven. New `ky-hb757`: "redefine the sales and use tax nexus standard for remote retailers and marketplace providers". New `ny-nexus`: "the cumulative total of the person's gross receipts from sales of tangible personal property delivered into the state exceeded $500,000, and such person made more than 100 sales of tangible personal property delivered in the state." Existing `sst-chart`: "This chart provides you a summary of the Remote Seller thresholds and compliance dates as of January 11, 2023." (so the page can say why it checks states' own pages).

Checker change: the KY rule must stop quoting the Board's chart (out of date). Set it to $100,000 with no order count, and quote the bill page's line "Marketplace provider and remote retailer, taxation thresholds, August 1, 2026" (doc `ky-hb757`), or better the act itself (doc `ky-ch161`): "Sections 1, 11 to 17, 45, 95 to 97, and 116 of this Act take effect August 1, 2026." `check-sales-tax-quotes.mjs` checks every checker rule against `sst-chart`, so it needs a per-state doc key (e.g. `doc:` on the KY entry) or the KY rule will fail the build.

Worked example: keep the Board's $400,000 example. Add: a spare-parts seller with 260 orders averaging $300 into Kentucky ($78,000) had nexus under the 200-order test until July 31, 2026, and doesn't from August 1; into New York, $520,000 across 90 orders is under (the AND test), the 101st order puts it over.

related: `/sales-tax/sales-tax-nexus`, `/sales-tax/streamlined-sales-tax`, `/manufacturing/distributor-inventory-control`, `/services/custom-erp-crm`, `/industries/electronics-component-trading`

Outbound links: S1, S16, S17, S8, S12 (each state's own page from the table where linked).

## 13.5 `sales-tax/manufacturing-sales-tax-exemption`

metaTitle: "Manufacturing sales tax exemption: what qualifies (TX, CA)" (57)
description: "The manufacturing sales tax exemption: what qualifies, what stays taxable, California's 3.9375% partial exemption and Texas divergent use, with numbers."

H2 additions: **"How much does California's partial exemption save?"** 3.9375 percentage points on qualified equipment, up to $200 million of purchases a year. **"How is tax on divergent use worked out in Texas?"** 1/48 of the price × the divergent share × the rate at purchase, each month, for four years. Others already questions.

Quotes: keep the ten. New `ca-mfg-buy`: "The law provides that a qualified person's or combined reporting unit's purchases subject to the partial exemption cannot exceed $200 million in any calendar year." · "You may not carry over any unused amount to a following year." · "When you make qualifying purchases, you must provide the seller with a timely partial exemption certificate." · "Partial — 3.9375 percent". Re-saved `tx-mfg`: "Tax due equals 1/48 of the purchase price of the exempt item times the percent of divergent use times the tax rate applicable at the time of purchase." and "If divergent use during a month is 5 percent or less of the total use of the equipment, no tax is due in that month." (existing).

Worked examples: California: a $250,000 CNC lathe: $250,000 × 3.9375% = $9,843.75 less tax. Texas: a $120,000 press brake bought exempt at 8.25%; in March it runs 200 h, 20 h making the plant's own racks = 10%: tax = $120,000 ÷ 48 × 10% × 8.25% = **$20.63** for March; in April 8 h of 200 = 4%, $0.

Demo claims: none hold exemption reasons on purchase lines; the boiler demo has machine-hour data (job card time logs per work center) that a divergent-use split would come from: "we'd build the report".

related: `/sales-tax/use-tax`, `/manufacturing/job-shop-erp`, `/industries/boiler-pressure-vessel-manufacturing`, `/asme/section-viii`, `/manufacturing/quickbooks-job-costing`

Outbound links: S10, S13, S14.

---

# Batch 14: Finishing the US guides

## 14.1 `sales-tax/resale-certificates`

metaTitle: "Resale and exemption certificates: what to collect" (50, same as title)
description: "Resale and exemption certificates for US sellers: when to accept one, what it must say, the Streamlined form F0003, drop shipments, and keeping them on file."

H2 additions: **"What is the Streamlined Certificate of Exemption (F0003), and who accepts it?"** The multistate form for the member states; not every state allows every exemption on it, and it's never sent to the Board. **"What happens if a customer's certificate doesn't cover a state you ship to?"** (worked example).

Quotes: keep the eight. New `sst-f0003`: "Do not send this form to the Streamlined Sales Tax Governing Board." · "Not all states allow all exemptions listed on this form."

Worked example: a distributor sells $180,000 a year to one dealer, $60,000 of it shipped to Texas, where no certificate is on file. At 8.25%, an audit bills $4,950 of tax for that year, plus interest, unless a certificate is obtained in time.

Demo claims: none store certificates; "we'd build it" only.

related: `/sales-tax/manufacturing-sales-tax-exemption`, `/industries/electronics-component-trading`, `/services/sales-crm`, `/manufacturing/erp-requirements-checklist`, `/sales-tax/sales-tax-in-erp`

Outbound links: S5, S4, S15, S10 (Form 01-339).

## 14.2 `sales-tax/use-tax`

metaTitle: "Use tax for businesses: when you owe it yourself" (48, same as title)
description: "Use tax for US businesses: when you owe it on purchases, goods bought exempt then used, how it's reported, credit for tax paid elsewhere, and a worked example."

H2 addition: **"How much use tax do you owe, and what if another state's tax was paid?"** (worked example). Others already questions.

Quotes: keep the six; add `tx-sales` 6.25% sentence.

Worked example: $4,000 of shop supplies from an out-of-state vendor that charged nothing, used at a Texas plant with 2% local tax: use tax 8.25% = $330. If the vendor had charged its own state's 6% ($240), Texas allows a credit: $90 owed. A $1,800 drill taken from resale stock for the warehouse: $148.50.

related: `/sales-tax/manufacturing-sales-tax-exemption`, `/systems/three-way-match`, `/services/custom-erp-crm`, `/manufacturing/distributor-inventory-control`, `/sales-tax/sales-tax-in-erp`

Outbound links: S11, S9, S4, S15.

## 14.3 `sales-tax/streamlined-sales-tax`

metaTitle: "Streamlined Sales Tax: member states and free filing" (51)
description: "Streamlined Sales Tax: the 24 member states, one free registration, one exemption certificate, and free certified-provider filing for remote sellers."

H2 additions: **"Can a certified provider charge a distributor that sells mostly for resale?"** Yes, for processing non-taxable transactions above 30% of all its transactions in a state. **"Is Intuit a certified service provider?"** Its subsidiary Exactor is certified but not offering the free service.

Quotes: keep the seven; add from `sst-free` (existing doc, check it's in the saved text): "To process non-taxable transactions if the non-taxable transactions exceed 30% of all transactions processed annually for a" and "Exactor (a subsidiary of Intuit)". Update the "on 3 November" dates to the check date.

Worked example: a remote seller over threshold in Ohio, Indiana, Michigan, Kentucky, Georgia and Washington, with no presence there: one free registration, a CSP files all six free. If 70% of its Ohio transactions are sales for resale, the CSP may charge for those in Ohio.

related: `/sales-tax/economic-nexus-thresholds`, `/sales-tax/resale-certificates`, `/manufacturing/quickbooks-integration`, `/services/custom-erp-crm`, `/industries/electronics-component-trading`

Outbound links: S2, S3, S4, S5, S7.

## 14.4 `/sales-tax` hub (`src/app/sales-tax/page.tsx`)

- Lead: unchanged (its $100,000 / $500,000 statement still holds); the Kentucky change goes on the thresholds page, not the hub.
- H2s to questions: "Free tool" → "Is there a free way to check where I have nexus?"; group names → questions in `ST_GROUPS` ("When do I have to collect in another state?", "Which sales and purchases are exempt?", "What should my system record?"); "Related guides" → "Where does sales tax meet job costing and inventory?".
- Closing block (roadmap rule: sales tax → custom ERP): "Need a system that holds certificates and reports sales by state?" → `/services/custom-erp-crm`, plus `/industries/boiler-pressure-vessel-manufacturing` and the electronics US page, saying plainly that today's demos leave the tax to QuickBooks.

## 14.5 `/us/services/inventory-and-reservations` (`src/lib/services.ts`, `na` + shared fields)

NA name today: "Manufacturing inventory management software"; NA description 156 chars (fine).

- Keep the NA name but make the page honest for manufacturers: the reel system is a distributor's; for manufacturers, reservations against BOM lines and remnants are in the boiler build (`material-traceability`). Add one question: **"Does it work for a manufacturer, not just a distributor?"** Yes: in the boiler build, stock and plate remnants are reserved against each job's BOM lines before anything is bought.
- Fix step 4 / answer: "the shortfall becomes a procurement order" → "the shortfall is listed for purchasing, and staff turn it into a procurement order".
- Questions (US words): "Why track each reel or plate instead of a quantity?", "Can we hold stock in more than one place?", "Can stock promised to one customer go to another?", "Does it work with QuickBooks Online?" (yes, sandbox, invoices/receipts/bills/bill payments), "Can I try it?" (both US demo links).
- Evidence for NA: replace "Built for LS Technologies (electronics trading)" with "First built for LS Technologies in India; US demo on sample data" so a US reader isn't misled.
- `guides`: keep the four; add `/manufacturing/distributor-inventory-control`.
- Worked example (from 13.1): 12,000 pcs, five 2,500 reels reserved, 500 left on the fifth.

---

## Summary: biggest gaps and outdated facts

1. **Kentucky's nexus rule changed on August 1, 2026** (HB 757; confirmed on the legislature's bill page and in the Department of Revenue's July 2026 letter): $100,000 only, no 200-transaction test. The Board's chart, which our nexus checker quotes word for word, still shows the old rule and calls itself a summary "as of January 11, 2023". Fix `sales-tax-calc.ts`, its quote check, and the thresholds page first.
2. **The QuickBooks integration page describes webhooks and CDC as our sync, but both US connectors only push.** It also misses Intuit's App Partner Program (since July 2025): reads are metered and the free tier blocks them above 500,000 a month, and Marketplace listing needs a paid tier.
3. **No prices anywhere in the QuickBooks cluster.** Intuit now lists QBO at $38 / $85 / $140 / $340 a month (plus a new free plan) and Desktop Enterprise from $2,210 / $2,717 / $5,363 a year (confirmed on a screenshot of Intuit's page; the batch-1 session's "$38/$19" was the QBO promo banner).
4. **The Desktop end-of-support page is out of date.** May 31, 2026 is five months past, and Intuit hasn't published a date for Desktop 2024. The page should say so rather than repeat third-party dates.
5. **The sales tax pages are missing worked numbers that the sources do give:** California's 3.9375% partial exemption and $200M cap, Texas's divergent-use formula (1/48 × share × rate), and the CSP charge for non-taxable transactions above 30%, which matters to distributors.
6. **North American visitors see India text on the electronics page.** The US version must lean on the reel, reservation, PO-check and QuickBooks features the US build really has. India-only figures (88–95% extraction, 5,256 reels) can only appear labelled as LS Technologies'.
7. **Two pages have no sources:** `erp-requirements-checklist` (cite Intuit's API rules and the Board's certificate rules) and `production-schedule-template` (cite Practical Machinist).
8. **Overclaims to remove:** "four US demos" (only two US builds were checked here), "shortfall becomes a procurement order" (it's a manual draft), and any hint that a demo holds exemption certificates, lots or bins.
