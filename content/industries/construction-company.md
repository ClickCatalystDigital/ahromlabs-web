---
kind: industry
slug: construction-company
title: ERP software for construction contractors in India
audience: Civil, waterproofing and repair contractors in India
answer: >
  Ahrom Labs builds the operations system a construction contractor runs on: daily
  site reports from the phone, attendance, the contract BOQ, measurements and
  running-account bills with GST, stores for the godown and every site, site cash,
  workforce KYC and payroll with PF and ESIC, receivables, and each site's margin
  against its estimate, with Datum AI answering from the same records. Built for a
  waterproofing and repair contractor; not yet live there.
description: >
  Construction ERP for Indian contractors: daily site reports, BOQ and RA bills
  with GST, stores per site, site cash, PF/ESIC payroll and Datum AI.
domain: [construction, billing, site-operations]
clients: [construction-company]
services: [custom-erp-crm, operational-intelligence, custom-ai-assistant, daily-wage-payroll, compliance-accounting, tally-integration]
notes:
  - assistant-that-answers-from-your-ledger
  - statutory-rates-across-systems
  - tally-voucher-posting
patterns:
  - derive-balances-dont-store-them
  - role-scoped-finance-views
  - graceful-degradation-by-env-var
flow:
  - step: Enquiry and quotation
    detail: Client, site visit and a quotation built from the rate library, with a GST PDF.
  - step: Site BOQ
    detail: The accepted quotation becomes the site's contract BOQ, with a material norm per unit.
  - step: Daily report
    detail: The site engineer marks attendance, then reports work done against BOQ lines, material used from site stock, machine hours and photos.
  - step: PM approval
    detail: Only approved reports count toward the site's progress.
  - step: Measurement
    detail: Quantities measured against the BOQ, or filled from approved work.
  - step: RA bill
    detail: Previous, this bill and up-to-date quantities per line, CGST and SGST or IGST, amount in words, as a PDF.
  - step: Certified and paid
    detail: Draft, submitted, certified and paid; paid lands in the cash book.
  - step: Receivables and Tally
    detail: Ageing with weekly follow-ups, the month's GST checklist, and a Tally import file with the site as cost centre.
demo:
  url: https://construction-erp.ahromlabs.com/demo
  label: Try the live demo
video:
  id: HhpkIdZf1X4
  name: "Construction Contractor ERP: a 90-Second Tour (SiteBook live demo, sample company)"
  description: "A tour of SiteBook with a made-up waterproofing and repair contractor: the contract BOQ with work reported done, daily site reports, site cash, workforce attendance, stores across godown and sites, material trading and one combined finance book."
  duration: PT1M23S
  uploaded: "2026-11-04"
evidence:
  - metric: Sample sites in the demo
    value: "4, from basement waterproofing to a pool epoxy lining, one losing money"
  - metric: RA bill
    value: Previous, this bill and up to date per BOQ line, GST split, amount in words, PDF
  - metric: Daily stock sheet
    value: Opening, receipt, dispatch and closing per material, per location
  - metric: Datum AI
    value: Answers from the live records with the same figures as the screens
published: 2026-11-05
updated: 2026-11-06
---

## Can I try it before talking to anyone?

Yes. A live demo runs at [construction-erp.ahromlabs.com](https://construction-erp.ahromlabs.com/demo) with a made-up contractor, Northstone Infra of Ahmedabad, which does waterproofing and repair work and trades construction chemicals. It has four sites with about two and a half months of history: a basement waterproofing job at Mehta Delta Towers, a hotel terrace, a podium slab repair with column jacketing, and a club's pool epoxy lining, one of them losing money. Leave your name and email, pick a login (director, project manager, site engineer, storekeeper or accountant) and use the real screens; each login sees what that role works with. The data resets every night, so nothing you do reaches anyone.

## What does a contractor need that Tally or a spreadsheet doesn't give?

Work measured against the BOQ, cost per site and bills built from the measurements. Tally keeps the books well, but it doesn't know which BOQ line was done today, what material went into which site, or whether a site is spending more than its estimate. A contractor's records start on site, so the system starts there: daily reports, attendance and material used, which then feed the RA bills, the site's cost and the accounts.

## Can site engineers report from the phone?

Yes: one daily report per site per day, built for a phone. The engineer marks attendance first (present, half day or absent, one tap per worker), then fills the report: quantity done against each BOQ line, labour by trade (filled from attendance), material used from the site's own stock, weather, issues and up to six photos. The project manager approves it or sends it back with a note, and only approved work counts toward the site's progress. See [daily progress reports](/construction/daily-progress-reports) for what a report should record and the site records CPWD works keep.

## How are RA bills made?

From measurements against the contract BOQ, never typed totals. A site's BOQ is copied from the client's accepted quotation; once work is reported against a line, only its quantity can change, so past bills keep their meaning. Measurements are recorded against the BOQ or filled from approved work, and the next [RA bill](/construction/ra-bills) takes everything not yet billed: previous, this bill and up-to-date quantities and amounts per line, CGST and SGST or IGST by place of supply, and the amount in words, as a PDF. Bills move from draft to submitted, certified and paid, and paid goes into the cash book. Quantities measured beyond the BOQ are flagged for the client's approval. See [the measurement book](/construction/measurement-book) for the record behind the bill.

## Is each site making money?

The director dashboard shows it per site: contract value, value of approved work, billed, cost to date and margin. Cost to date is material used on site, labour from attendance and wages, site cash spent and machine days. Against the value of approved work it gives the margin so far; scaled to the whole contract, it projects where the site will finish against its estimate. Sites are marked on track, over budget or losing money, next to what needs attention today: reports waiting for approval, sites low on cash, materials below minimum. See [job cost and margin per site](/construction/job-cost-per-site) for the method.

## How is material controlled across the godown and sites?

Material arrives into the godown from suppliers and is transferred to sites; each site holds its own stock, and material used is taken from it on the daily report. Nothing can be sent or used that isn't there. The daily stock report has the columns of a stores register kept in Excel: opening, receipt, dispatch and closing per material, for one location or all, as CSV or print. Material used is also compared with the BOQ norm, so over-consumption on a site shows up the same week; see [material consumption against BOQ](/construction/material-consumption-vs-boq).

## How is site cash (kharchi) accounted for?

Each site's in-charge holds a cash float and records spends from the phone with a photo of the receipt and, for a GST bill, the shop's GSTIN; anything entered three days late is flagged, and a site can't spend more cash than it holds. Every Thursday the site submits the week's spends as one claim; accounts approve or return it, approved claims go out in a bank upload file, and paying a claim tops the site's cash back up and lands in the finance book.

## How are workers on record and paid?

Each worker's KYC is captured on a phone: Aadhaar (only the last four digits are kept), PAN, bank, UAN and photos of the documents, and the same phone or Aadhaar can't be added twice. The monthly wage register works out days from attendance, PF and ESIC for workers on the company's rolls, TDS for subcontractors past the limits, advances and totals per gang, and each worker is paid once a month. Gate passes need complete KYC, record where the worker stays and print as an ID card. See [daily-wage payroll](/services/daily-wage-payroll).

## Does it work with Tally, GST and TDS?

Tally stays the statutory book; the system keeps project cost. Invoices, RA bills, supplier receipts and repaid site cash download as a Tally import file, with the site as the cost centre. The month's GST checklist shows output tax and the GSTR-1 summary by customer and HSN from the system's own bills, and what's missing (HSN, GSTIN, site bills without the shop's GSTIN). The TDS register lists deductions from subcontractor wages with deposit and return dates. See [GST on works contracts](/construction/gst-on-works-contracts) and [TDS on payments to contractors](/construction/tds-on-contractor-payments).

## What does Datum AI answer?

Datum AI sits in the corner of every screen and answers in plain words, in English or Hinglish, with the same figures the screens show: which sites are over budget, who hasn't sent today's report, how much PU membrane is in the godown, who owes us money past 60 days, whose KYC is pending, which machines are idle. The model only picks which look-up to run; the numbers come from the system's own queries. Site engineers never see money, margins or payroll through it. The demo gives two free questions; see [Datum AI for contractors](/ai-assistant/construction-contractors).

## What else is in it?

A trading desk for construction chemicals (rate card with backup suppliers, quotes with options, a credit gate before dispatch, part deliveries, GST invoices and an e-way bill task for accounts), machinery with QR labels and idle days, receivables ageing with weekly follow-ups and escalation to the director after 30 days, and a weekly progress report for the client built from the approved daily reports.

## What should a contractor ask any software vendor?

1. **Are RA bills built from measurements**, or does someone type the totals?
2. **Does each site's cost come from real material issues, attendance and site cash**, or from estimates?
3. **Does the site engineer's report work on a cheap phone on site**, with photos and attendance?
4. **Can site staff be kept away from company money and margins**, enforced on the server, not just hidden?
5. **Does it hand Tally what accounts needs**, without retyping, and keep project cost apart?

## Boundary

The system was built for a waterproofing and repair contractor that also trades construction chemicals; it is built, not yet live at the client. Everything above is shown on sample data in the demo. It doesn't yet deduct security deposit, TDS, GST TDS or mobilisation and secured advances on RA bills, work out price escalation, or produce a WIP schedule; those are parts we'd build for a contractor who needs them.
