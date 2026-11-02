---
kind: construction
slug: wip-schedule
group: us
title: "The WIP schedule: over and under billing, explained"
question: "What is a WIP schedule in construction, and how is over or under billing worked out?"
answer: >
  A WIP (work-in-progress) schedule lists every open job with its contract value, estimated total cost, cost to
  date, percent complete and billings to date. From those it shows what each job has earned against what was billed:
  billed ahead is overbilling, behind is underbilling. Banks and surety companies read it to judge a contractor's
  jobs, and it's the earliest warning of a job losing money.
description: "The construction WIP schedule: percent complete by cost, earned revenue, over and under billing, a worked example, and what bonding companies look for."
domain: [construction, job-cost]
published: 2026-11-03
updated: 2026-11-03
checked: 2026-11-03
---

## What is on a WIP schedule?

One row per open job, usually monthly:

| Column | Where it comes from |
|---|---|
| Contract value | Original contract plus approved [change orders](/construction/change-orders) |
| Estimated total cost | The current estimate to complete the job, reviewed by the project manager |
| Estimated gross profit | Contract value less estimated total cost |
| Cost to date | Job cost posted so far: labor, material, subcontractors, equipment |
| Percent complete | Cost to date ÷ estimated total cost (the "cost-to-cost" method) |
| Earned revenue | Contract value × percent complete |
| Billed to date | Total of the [pay applications](/construction/pay-applications), including [retainage](/construction/retainage) |
| Over or under billing | Billed to date less earned revenue |

## A worked example

Two made-up jobs at the end of a month:

| | Job A | Job B |
|---|---|---|
| Contract value | $400,000 | $250,000 |
| Estimated total cost | $340,000 | $215,000 |
| Cost to date | $170,000 | $129,000 |
| Percent complete | 50% | 60% |
| Earned revenue | $200,000 | $150,000 |
| Billed to date | $230,000 | $120,000 |
| **Over (under) billing** | **$30,000 over** | **$30,000 under** |

Job A has billed $30,000 more than it has earned: cash is ahead, and that money is owed back in work. Job B has done
$30,000 more work than it has billed: earned but unbilled, often a sign of slow billing or unapproved changes.

## Why the estimate to complete matters most

Percent complete depends on the estimated total cost. If Job A's estimate is stale and the real figure is $380,000,
it is about 45% complete, has earned $178,947 and is overbilled by $51,053, with less profit left than the schedule
said. A WIP schedule is only as good as the monthly re-estimate on each job, which is why sureties ask who makes it
and how.

## What lenders and sureties look for

- Jobs whose estimated gross profit fell since last month ("profit fade").
- Large underbillings, which may be costs that will never be billed.
- Large overbillings without the cash to match, which may mean the cash was spent elsewhere.
- Whether the schedule ties to the financial statements.

This page describes the usual practice; your accountant decides how revenue is recognized under the accounting
standard and the tax method you use.

## What your system should do

Post every cost to a job and cost code as it happens (time from the field, material receipts, subcontractor bills),
keep the estimate to complete per job up to date, and produce the WIP schedule from the same records as the pay
applications. Then the month-end WIP is a report, not a spreadsheet assembled from four places.
