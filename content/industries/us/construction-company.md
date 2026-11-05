---
title: Construction software for subcontractors and specialty contractors
metaTitle: Construction ERP for specialty contractors
audience: Specialty contractors and subcontractors in the US and Canada
answer: >
  Ahrom Labs builds the operations system a specialty contractor runs on: daily
  reports from the field, crew attendance, the schedule of values, change orders,
  pay applications with retainage and lien waivers, yard and job stock, site cash,
  crew pay and each job's margin against its estimate, with Datum AI answering from
  the same records and pay applications going to QuickBooks Online. Built for a
  waterproofing and repair contractor; not yet live there.
description: >
  Software for US specialty contractors: daily reports, schedule of values, pay
  apps with retainage, change orders, lien waivers, crews and job cost.
demo:
  url: https://construction-erp-us.ahromlabs.com/demo
  label: Try the live demo
services: [custom-erp-crm, operational-intelligence, custom-ai-assistant]
notes:
  - assistant-that-answers-from-your-ledger
flow:
  - step: Inquiry and estimate
    detail: Client, site visit and an estimate built from the rate library, as a PDF.
  - step: Schedule of values
    detail: The accepted estimate becomes the job's schedule of values, with a material norm per unit.
  - step: Daily report
    detail: The superintendent marks attendance, then reports work done against each line, material used from job stock, equipment hours and photos.
  - step: PM approval
    detail: Only approved reports count toward the job's progress.
  - step: Change orders
    detail: A change order is its own estimate; once accepted, its lines join the schedule of values and are billed apart.
  - step: Pay application
    detail: Previous, this period and stored materials per line, retainage, current payment due, as a G702/G703-style PDF.
  - step: Lien waivers and payment
    detail: Conditional or unconditional waivers ticked off per pay app; certified and paid lands in the cash book.
  - step: QuickBooks Online
    detail: Issued invoices, pay applications and payments sent with each project as a job under its client.
evidence:
  - metric: Sample jobs in the demo
    value: "4, from a garage waterproofing job to a pool epoxy lining, one losing money"
  - metric: Pay application
    value: Original sum, net change by change orders, stored materials, retainage, current payment due
  - metric: Lien waivers
    value: Ours, our subs' and suppliers', conditional or unconditional, per pay app
  - metric: QuickBooks Online
    value: Invoices, pay applications and payments, against an Intuit sandbox company in the demo
updated: 2026-11-05
---

## Can I try it before talking to anyone?

Yes. A live demo runs at [construction-erp-us.ahromlabs.com](https://construction-erp-us.ahromlabs.com/demo) with a made-up contractor, Northstone Builders of Garland, Texas, a waterproofing and concrete restoration contractor with a supply division. It has four jobs: a garage waterproofing job at Halvorsen Tower with an approved change order, a hotel roof deck, a podium deck repair with column jacketing, and a club pool lining that's finished, one of them losing money. Leave your name and email, pick a login (director, project manager, site engineer, storekeeper or accountant) and use the real screens in dollars, imperial units and US dates. The data resets every night, so nothing you do reaches anyone.

## What does a specialty contractor need that QuickBooks alone doesn't give?

Work measured against the schedule of values, cost per job and pay applications built from that work. QuickBooks keeps the books, but it doesn't know which line of the schedule was done today, what material went to which job, or whether a job is spending more than its estimate. A contractor's records start in the field, so the system starts there: daily reports, attendance and material used, which feed the pay applications, the job's cost and the books.

## Can crews report from the field on a phone?

Yes: one daily report per job per day, built for a phone. Attendance comes first (present, half day or absent, one tap per person), then the report: quantity done against each line of the schedule of values, labor by trade (filled from attendance), material used from the job's own stock, weather, issues and up to six photos. The project manager approves it or sends it back with a note, and only approved work counts toward the job's progress.

## How are pay applications made?

From work measured against the schedule of values. A job's schedule of values is copied from the owner's accepted estimate or entered line by line. Work is measured against each line, or filled from approved daily reports, and stored materials are added per line. The [pay application](/construction/pay-applications) shows scheduled value, previous, this period, stored materials, % complete and balance to finish, holds [retainage](/construction/retainage), works out the current payment due and downloads as a G702/G703-style PDF with the architect's certificate. Line 7, less previous certificates, is recomputed from each earlier application, so certified amounts never drift.

## How are change orders handled?

A change order is raised as its own estimate against the accepted contract estimate; once accepted, its lines join the schedule of values labeled CO 1, CO 2 and are billed apart, so the pay application shows the original contract sum, the net change by change orders and the revised sum. Draft and sent change orders stay pending and are never billed. On the sample tower job, change order 1 adds $6,504 to a $245,856 schedule of values. See [change orders](/construction/change-orders).

## Are lien waivers tracked?

Yes, per pay application: ours to the owner, and each sub's and supplier's for the money they were paid, conditional on progress until paid and then unconditional, with the date each came in. See [lien waivers](/construction/lien-waivers) for the four types and the states with statutory forms.

## Is each job making money?

The director dashboard shows it per job: contract value, value of approved work, billed, cost to date and margin. Cost to date is material used, labor from attendance and pay, site cash spent and equipment days. Against the value of approved work it gives the margin so far; scaled to the whole contract, it projects where the job will finish against its estimate. Jobs are marked on track, over budget or losing money, next to what needs attention today.

## Does it work with QuickBooks Online?

Yes. QuickBooks Online stays the books: issued invoices, pay applications and payments go across with each project as a job under its client, supplier bills for goods received at the yard and the payments against them go too, and every record shows whether it is in QuickBooks. QuickBooks works out the sales tax on supply invoices. In the demo it is connected to an Intuit sandbox company. See [connecting QuickBooks Online to an operations system](/manufacturing/quickbooks-integration).

## How are crews paid?

Each worker's onboarding is captured on a phone: photo, photo ID, I-9, W-4 (or W-9 for a 1099 subcontractor) and direct deposit, with photos of the documents. The monthly pay register works out days from attendance at each person's rate, less advances, with totals per crew, and each worker is paid once a month. Payroll taxes stay with your payroll provider. Gate passes need complete onboarding and print as an ID badge.

## What does Datum AI answer?

Datum AI sits in the corner of every screen and answers with the same figures the screens show: which jobs are over budget, who hasn't sent today's report, what's in the yard, who owes us past 60 days, which equipment is idle. The model only picks which look-up to run; the numbers come from the system's own queries. Field staff never see money, margins or payroll through it. The demo gives two free questions; see [Datum AI for contractors](/ai-assistant/construction-contractors).

## What else is in it?

Yard and job stock with receipts, transfers and a daily stock sheet per location; site cash per job with receipt photos and a weekly claim; equipment with QR labels and idle days; receivables by age with weekly follow-ups and escalation to the director after 30 days; a weekly progress report for the owner built from the approved daily reports; and a supply desk that quotes from a rate card with backup suppliers, holds shipping until terms are met, and invoices with sales tax.

## What should a contractor ask any software vendor?

1. **Are pay applications built from measured work on the schedule of values**, or typed in?
2. **Are change orders kept apart until approved**, and billed as their own lines?
3. **Is retainage held per application, on stored materials too**, and recomputed, not carried by hand?
4. **Does job cost come from real material, labor and site cash**, or from estimates?
5. **Does it work beside QuickBooks Online**, without double entry?

## Boundary

The system was built for a waterproofing and repair contractor in India that also trades construction chemicals; it is built, not yet live at the client. This North American version is the same code with US terms, pay applications, change orders, lien waivers, onboarding and QuickBooks Online, shown here on a sample company, and it has not yet been used by a US or Canadian contractor. It doesn't yet produce a WIP schedule, bill a retainage release, track retainage held from subcontractors or keep a change log with notice dates; those are parts we'd build.
