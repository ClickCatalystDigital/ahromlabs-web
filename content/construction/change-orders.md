---
kind: construction
slug: change-orders
group: us
title: "Change orders in construction: pricing, approval, billing"
question: "How should a contractor handle change orders?"
answer: >
  A change order is a written agreement to change a construction contract's work, price or time. Get the change in
  writing before doing it, price it with backup, track each from request to approval, and only bill it once
  approved, as its own line on the schedule of values. On federal jobs, FAR 52.243-4 gives you 30 days to assert an
  adjustment.
description: "Change orders for contractors: written orders, pricing and backup, pending vs approved, federal rules under FAR 52.243-4, and billing them on pay apps."
domain: [construction, change-orders]
published: 2026-11-03
updated: 2026-11-03
checked: 2026-11-03
sources:
  - title: "FAR 52.243-4, Changes"
    publisher: Acquisition.gov (General Services Administration)
    url: https://www.acquisition.gov/far/52.243-4
    date: "2026-11-03"
checks:
  - reg: FAR 52.243-4(a)
    doc: far-52.243-4
    quote: "make changes in the work within the general scope of the contract, including changes-"
  - reg: FAR 52.243-4(c)
    doc: far-52.243-4
    quote: "Except as provided in this clause, no order, statement, or conduct of the Contracting Officer shall be treated as a change under this clause or entitle the Contractor to an equitable adjustment."
  - reg: FAR 52.243-4(d)
    doc: far-52.243-4
    quote: "no adjustment for any change under paragraph (b) of this clause shall be made for any costs incurred more than 20 days before the Contractor gives written notice as required."
  - reg: FAR 52.243-4(e)
    doc: far-52.243-4
    quote: "The Contractor must assert its right to an adjustment under this clause within 30 days after"
  - reg: FAR 52.243-4(f)
    doc: far-52.243-4
    quote: "No proposal by the Contractor for an equitable adjustment shall be allowed if asserted after final payment under this contract."
---

## Why change orders cost contractors money

Most disputes on a job are about changes: extra work done on a verbal OK, priced after the fact, argued about at
closeout. The fix is procedural: no change is real until it is written, priced and approved, and every one is
tracked until it's billed.

## The life of a change

| Stage | What happens | Billed? |
|---|---|---|
| Request or notice | The owner asks for a change, or you notify a changed condition (in writing) | No |
| Proposal | Your price and time, with backup: quantities, labor hours, material quotes, markup | No |
| Pending | Submitted, not yet approved; work may have started on a directive | No, but tracked |
| Approved change order | Signed by both sides, with the new price and time | Yes, as its own line |
| Rejected or disputed | Kept, with the record, for a claim | No |

## What do the federal rules say?

On federal fixed-price construction (FAR 52.243-4), the contracting officer may order changes within the general
scope by a written change order. Nothing else counts as a change under the clause except as it provides. If you
treat something as a change by notice, costs incurred more than 20 days before your written notice aren't adjusted
(except for defective specifications). You must assert your right to an adjustment within 30 days of the order or
notice, and nothing can be asserted after final payment. Private contracts, such as AIA's general conditions,
have their own procedures and deadlines: read the changes article before the job starts.

## How changes flow into billing

An approved change order is added to the schedule of values as its own line, so the [pay application](/construction/pay-applications)
shows original contract, approved changes and the revised contract sum. Pending changes are never billed, but they
belong on the [WIP schedule](/construction/wip-schedule): their costs are already in the job. Watch any
[lien waiver](/construction/lien-waivers) you sign that would waive claims for pending changes.

## What your system should keep

- A change log per job: number, description, who asked, date of notice, status, price, days.
- The backup for each price, linked to the job's cost codes so actual cost can be compared later.
- Approved changes posted to the contract value and the schedule of values, once.
- Pending exposure: the total value of unapproved changes per job, reviewed weekly.
