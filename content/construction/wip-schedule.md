---
kind: construction
slug: wip-schedule
group: us
title: "The WIP schedule: over and under billing, explained"
related:
  - /manufacturing/wip-tracking
  - /manufacturing/quickbooks-job-costing
  - /systems/work-in-progress
  - /construction/change-orders
  - /industries/construction-company
question: "What is a WIP schedule in construction, and how is over or under billing worked out?"
answer: >
  A WIP (work-in-progress) schedule lists every open job with its contract value, estimated total cost, cost to
  date, percent complete and billings to date. Percent complete is cost to date over estimated total cost; earned
  revenue is that share of the contract value. Billed more than earned is overbilling, less is underbilling. Banks and
  surety companies read it to judge a contractor's jobs, and it's the earliest warning of a job losing money.
description: "The construction WIP schedule: cost-to-cost percent complete, earned revenue, over and under billing, profit fade, the tax rule, and what sureties check."
domain: [construction, job-cost]
published: 2026-11-03
updated: 2026-11-07
checked: 2026-11-05
sources:
  - title: "26 U.S.C. 460, Special rules for long-term contracts"
    publisher: Legal Information Institute, Cornell Law School
    url: https://www.law.cornell.edu/uscode/text/26/460
    date: "2026-11-05"
  - title: "Revenue Procedure 2025-32 (inflation adjustments for 2026)"
    publisher: Internal Revenue Service
    url: https://www.irs.gov/pub/irs-drop/rp-25-32.pdf
    date: "2026-11-05"
  - title: "SBA Form 994F, Schedule of Work in Process"
    publisher: U.S. Small Business Administration
    url: https://www.sba.gov/document/sba-form-994f-schedule-work-process
    date: "2026-11-05"
checks:
  - reg: 26 U.S.C. 460(b)(1)(A), percentage of completion
    doc: usc-26-460
    quote: "the percentage of completion shall be determined by comparing costs allocated to the contract under subsection (c) and incurred before the close of the taxable year with the estimated total contract costs"
  - reg: 26 U.S.C. 460(e)(1)(B)(i), exception for small construction contracts
    doc: usc-26-460
    quote: "who estimates (at the time such contract is entered into) that such contract will be completed within the 2-year period beginning on the contract commencement date of such contract"
  - reg: Rev. Proc. 2025-32, section 448(c) gross receipts test for 2026
    doc: irs-rp-2025-32
    quote: "does not exceed $32,000,000."
  - reg: SBA Form 994F
    doc: sba-994f
    quote: "Small businesses seeking a surety bond use this form to list any work they’re currently performing."
---

## What is a WIP schedule?

A WIP (work-in-progress) schedule is a monthly list of every open job showing what each has earned against what it
has billed. One row per job:

| Column | Where it comes from |
|---|---|
| Contract value | Original contract plus approved [change orders](/construction/change-orders) |
| Estimated total cost | The current estimate to complete the job, reviewed by the project manager |
| Estimated gross profit | Contract value less estimated total cost |
| Cost to date | Job cost posted so far: labor, material, subcontractors, equipment |
| Percent complete | Cost to date ÷ estimated total cost |
| Earned revenue | Contract value × percent complete |
| Billed to date | Total of the [pay applications](/construction/pay-applications), including [retainage](/construction/retainage) |
| Over or under billing | Billed to date less earned revenue |

## How do you calculate percent complete?

Divide cost to date by the estimated total cost: the cost-to-cost method. It is the same comparison the federal tax
law uses for the percentage of completion method, which compares costs incurred before the end of the year "with the
estimated total contract costs" (26 U.S.C. 460). A job with $170,000 spent of an estimated $340,000 is 50% complete.

## How do you work out over and under billing?

Earned revenue is contract value times percent complete; billed to date less earned revenue is the over or under
billing. Two made-up jobs at the end of a month:

| | Job A | Job B |
|---|---|---|
| Contract value | $400,000 | $250,000 |
| Estimated total cost | $340,000 | $215,000 |
| Cost to date | $170,000 | $129,000 |
| Percent complete | 50% | 60% |
| Earned revenue | $200,000 | $150,000 |
| Billed to date | $230,000 | $120,000 |
| **Over (under) billing** | **$30,000 over** | **$30,000 under** |

## What is overbilling, and is it bad?

Overbilling is billing ahead of the work earned: Job A has billed $30,000 more than it has earned, so its cash is
ahead and that money is owed back in work. Some overbilling is normal, since a schedule of values often bills set-up
and early items ahead. A large overbilling without the cash to match it can mean the cash was spent elsewhere, which is
what a surety looks for.

## What is underbilling?

Underbilling is work earned but not yet billed: Job B has done $30,000 more work than it has billed. It is often slow
billing or [change orders](/construction/change-orders) not yet approved, and sometimes cost that will never be billed
because the job is losing money.

## Where do over and under billings go on the balance sheet?

Overbillings are usually shown as a liability (billings in excess of costs and estimated earnings) and underbillings
as an asset (costs and estimated earnings in excess of billings). The totals on the WIP schedule, $30,000 each in the
example, should tie to the balance sheet; your accountant decides the presentation under the accounting standard you
report under.

## Why does the estimate to complete matter most?

Because percent complete depends on it. If Job A's estimate is stale and the real figure is $380,000, the job is about
45% complete, has earned $178,947 and is overbilled by $51,053, with less profit left than the schedule said. A WIP
schedule is only as good as the monthly re-estimate on each job, which is why sureties ask who makes it and how.

## What is profit fade?

Profit fade is a job's estimated gross profit falling from month to month as the estimate to complete grows. Job A
showed $60,000 of gross profit last month ($400,000 less $340,000). This month the project manager raises the estimated
total cost to $360,000: gross profit is now $40,000, a $20,000 fade, and the same $170,000 of cost makes the job 47%
complete, so earned revenue drops to $188,889 and the overbilling grows to $41,111.

## Why do sureties and banks ask for a WIP schedule?

It shows, job by job, whether the company is making the margin it bid and whether its billing is ahead of or behind
the work. The SBA's surety bond program asks for it on its own form: "Small businesses seeking a surety bond use this
form to list any work they're currently performing" (SBA Form 994F, Schedule of Work in Process). Lenders and sureties
look for:

- Jobs whose estimated gross profit fell since last month.
- Large underbillings, which may be costs that will never be billed.
- Large overbillings without the cash to match.
- Whether the schedule ties to the financial statements.

## Do small contractors have to use percentage of completion for taxes?

Not for every job. The federal rule exempts a construction contract the contractor expects to finish within 2 years,
if its average annual gross receipts for the 3 prior years pass the section 448(c) test: $32 million for tax years
beginning in 2026 (Revenue Procedure 2025-32). Residential construction contracts have their own exception. A
contractor with $18 million of average receipts and a 14-month job may use another method for that job; one with $40
million may not. Your tax adviser decides the method.

## Does retainage count as billed?

Yes. Billed to date includes the retainage held on each pay application; cash collected doesn't. A job can be
underbilled on the WIP schedule and still short of cash, because part of what it billed is retainage waiting for the
end of the job.

## How is the cost of each job built up?

From every cost posted to the job as it happens: labor from the field's time records at each person's cost rate,
material issued to the job at its purchase price, subcontractor bills, equipment (owned equipment at a day or hour
rate, rented equipment at its invoice) and job-site expenses. Head office costs stay out unless the contract
reimburses them. The WIP schedule's cost to date is this total, so a cost posted to the wrong job moves two rows at
once: one job looks more complete and the other less.

In the [construction demo](/industries/construction-company)'s US build, each job's cost to date on the director
dashboard is material used, labor from attendance and pay, site cash spent and equipment days, set against the value
of approved work; once 5% of the work is done it projects the final cost at the same cost rate and marks the job on
track, over budget or losing money. Subcontractor bills aren't added to a job's cost yet.

## How often should a WIP schedule be updated?

Monthly, at the same close as the books, with a fresh estimate to complete from each project manager. Post every cost
to a job and cost code as it happens (time from the field, material receipts, subcontractor bills) and produce the WIP
schedule from the same records as the pay applications, so the month-end WIP is a report, not a spreadsheet
assembled from four places.

The [construction demo](/industries/construction-company) shows the inputs per site (contract value, value of
approved work, billed, cost to date and margin against the estimate) but has no WIP schedule: no estimate to complete
and no over and under billing column. A WIP schedule built from those records is something we'd build for a
contractor. See also [WIP tracking for job shops](/manufacturing/wip-tracking) for the manufacturing side.

This page describes the usual practice; your accountant decides how revenue is recognized under the accounting
standard and the tax method you use.
