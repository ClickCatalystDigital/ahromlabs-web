---
kind: construction
slug: pay-applications
group: us
title: "Pay applications (AIA G702 and G703), explained"
question: "How does a construction pay application work?"
answer: >
  A pay application is a contractor's monthly bill on a construction job: each line of the schedule of values with
  the work completed this period and before, materials stored on site, the retainage held back, and the amount now
  due. AIA's G702 is the summary page and G703 the line-by-line continuation sheet; the architect or owner certifies
  it before payment.
description: "How a construction pay application works: schedule of values, work completed and stored, retainage and the amount due, with a worked example and federal rules."
domain: [construction, billing]
published: 2026-11-03
updated: 2026-11-03
checked: 2026-11-03
sources:
  - title: "FAR 52.232-5, Payments Under Fixed-Price Construction Contracts"
    publisher: Acquisition.gov (General Services Administration)
    url: https://www.acquisition.gov/far/52.232-5
    date: "2026-11-03"
  - title: "FAR 52.232-27, Prompt Payment for Construction Contracts"
    publisher: Acquisition.gov (General Services Administration)
    url: https://www.acquisition.gov/far/52.232-27
    date: "2026-11-03"
checks:
  - reg: FAR 52.232-5(b), progress payments
    doc: far-52.232-5
    quote: "The Government shall make progress payments monthly as the work proceeds"
  - reg: FAR 52.232-5(c)(2), contractor certification
    doc: far-52.232-5
    quote: "All payments due to subcontractors and suppliers from previous payments received under the contract have been made, and timely payments will be made from the proceeds of the payment covered by this certification"
  - reg: FAR 52.232-5(c)(4), contractor certification
    doc: far-52.232-5
    quote: "This certification is not to be construed as final acceptance of a subcontractor’s performance."
  - reg: FAR 52.232-27, prompt payment (improper invoices)
    doc: far-52.232-27
    quote: "If the invoice does not comply with these requirements, the designated billing office must return it within 7 days after receipt"
---

## What goes into a pay application?

A US construction contract is usually paid monthly against progress, not on milestones. The contractor bills by
filling in the **schedule of values**: the contract sum broken into lines (site work, concrete, steel, electrical
and so on), agreed at the start. Each month, for every line:

| Column | What it holds |
|---|---|
| Scheduled value | The line's share of the contract sum, plus approved [change orders](/construction/change-orders) |
| Work completed, previous periods | What was billed on earlier applications |
| Work completed, this period | What was put in place this month |
| Materials presently stored | Delivered but not yet installed |
| Total completed and stored | The three above, and its % of the scheduled value |
| Balance to finish | Scheduled value less total completed and stored |
| [Retainage](/construction/retainage) | The share held back |

The American Institute of Architects (AIA) publishes the most used forms: G702 (the application and certificate
for payment, one page of totals) and G703 (the continuation sheet, one row per line). They are paid, copyrighted
documents; many owners and general contractors use their own form with the same columns.

## A worked example

A made-up job with a contract sum of $400,000 and 10% retainage. By the end of month three:

| | Amount |
|---|---|
| Work completed, previous periods | $90,000 |
| Work completed, this period | $60,000 |
| Materials stored on site | $10,000 |
| Total completed and stored | $160,000 |
| Retainage (10%) | $16,000 |
| Total earned less retainage | $144,000 |
| Less previous certificates ($90,000 less $9,000 retained) | $81,000 |
| **Current payment due** | **$63,000** |
| Balance to finish, including retainage | $256,000 |

The check: this month's $60,000 of work plus $10,000 stored, less 10%, is $63,000.

## Who signs it?

The contractor certifies the application. The architect (or the
owner's representative) checks it against the work on site and certifies the amount, which may be less than asked.
Lenders often want [lien waivers](/construction/lien-waivers) from the contractor and the subcontractors paid from
the previous application before releasing money.

On federal jobs, FAR 52.232-5 sets the rules: progress payments monthly on estimates of work accomplished, approved
by the contracting officer, and a certification with every request, including that subcontractors and suppliers
have been paid from previous payments. An invoice missing required items is returned within 7 days.

## What your system should do

- Hold the schedule of values per job, with change orders added as their own lines once approved.
- Take quantities or percentages from site progress, not typed in at month-end.
- Carry previous applications forward automatically, so "previous" always matches what was certified.
- Compute retainage per line, at the rate the contract sets, and its release.
- Produce the pay application in the owner's format and keep each certified version.
- Feed the same figures to the [WIP schedule](/construction/wip-schedule), so billing and cost are compared per job.

## Can pay applications go to QuickBooks?

Yes, if the system posts each one as an invoice on the right job. In our construction demo, connected to a
QuickBooks Online sandbox company, each project becomes a job under its client in QuickBooks, and each pay
application goes there as an invoice on that job when it is issued; payments follow when marked paid. Job reports
in QuickBooks then match the project. How the connection works, and who calculates the sales tax, is in
[connecting QuickBooks Online](/manufacturing/quickbooks-integration).
