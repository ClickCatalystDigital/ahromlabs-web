---
kind: construction
slug: submittals-and-rfis
group: us
title: "Submittals and RFIs: how they flow and what to log"
related:
  - /construction/change-orders
  - /construction/pay-applications
  - /systems/change-order
  - /industries/construction-company
  - /construction/wip-schedule
  - /construction/cost-codes
  - /construction/punch-list-closeout
question: "What is the difference between a submittal and an RFI in construction?"
answer: >
  A submittal is something the contractor sends for the design team's review before building or buying: shop
  drawings, product data, samples. An RFI (request for information) is a question about the contract documents, sent
  when the drawings or specifications are unclear or conflict. Both need a log with numbers, dates, ball-in-court and
  answers, because late or unanswered ones are a common source of delay and change order claims.
description: "Submittals and RFIs for US subcontractors: what each is, who reviews them, review stamps and turnaround, logging, and when an RFI answer becomes a change order."
domain: [construction, project-management, us]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
---

## What is a submittal?

A submittal is a document or sample the contractor sends to the architect or engineer, through the general
contractor, to show what it intends to install before it buys or fabricates it. The specifications list what each
trade must submit, usually in a "submittals" article of each section:

| Type | Examples |
|---|---|
| Shop drawings | Fabrication drawings for steel, ductwork, piping spools, millwork |
| Product data | Manufacturer cut sheets for valves, fixtures, equipment |
| Samples | Finishes, colors, materials |
| Mock-ups | A built sample of a wall or finish |
| Test reports and certificates | Mill certificates, welding qualifications, test results |
| Closeout submittals | Warranties, O&M manuals, as-builts, attic stock |

## How is a submittal reviewed?

The sub sends it to the general contractor, who checks it against the contract and stamps it; the GC forwards it to
the architect, who sends it to the engineer of record where needed; it comes back with a review action. Common
stamps:

| Action | Meaning | What the sub does |
|---|---|---|
| Approved, or No exceptions taken | Proceed | Release for fabrication |
| Approved as noted, or Make corrections noted | Proceed with the corrections | Fabricate with the notes; resubmit only if asked |
| Revise and resubmit | Not acceptable as is | Correct and submit again |
| Rejected | Doesn't meet the documents | Submit a different product or design |

The review confirms general conformance with the design intent; it doesn't move responsibility for dimensions and
coordination off the contractor, and an approved submittal doesn't change the contract unless the change is
processed as one.

## What is an RFI?

A request for information: a written question about the drawings or specifications, sent when they are unclear,
missing a detail, or conflict with each other or with site conditions. A good RFI asks one question, cites the sheet
and detail, proposes an answer, and says what it holds up and by when it is needed.

## When does an RFI become a change order?

When the answer adds work, changes work, or delays the job. An RFI answer that says "provide additional blocking" or
"relocate per sketch" is a change to the contract documents, and the contractor should give notice and price it
under the contract's changes clause before doing the work. Track the RFI number on the change order request so the
link is clear. See [change orders](/construction/change-orders).

## What should a submittal and RFI log contain?

| Column | Why |
|---|---|
| Number and revision (e.g. 23 05 00-003 rev 1) | Unique and tied to the spec section |
| Description and spec section | What it is |
| Dates: sent, required back, returned | Turnaround against the contract's review period |
| Ball in court | Who has it now |
| Status and review action | Open, approved, revise and resubmit |
| Lead time after approval | When material can arrive |
| Linked items | Change order requests, schedule activities, purchase orders |

The log is how a sub proves delay: if a submittal sat with the architect for six weeks against a two-week review
period, the dates show it. A log with no dates proves nothing.

## How do submittals affect the schedule?

Long-lead items (switchgear, air handlers, fabricated steel, elevators) can't be ordered until approved, so the
submittal date drives delivery. Work back from the install date: install date − delivery lead time − fabrication time
− review time (including one resubmittal) = the date the submittal must go in. Put those dates in the schedule.

## Can you show an RFI that gets answered quickly?

> **RFI 017, Level 3 corridor ceiling height.** Drawing A-301 detail 4 shows the corridor ceiling at 9'-0" AFF.
> Mechanical drawing M-203 shows the main supply duct with its bottom at 8'-10" in the same corridor between grid
> lines C and E. Proposed solution: lower the ceiling to 8'-6" between C and E only, keeping 9'-0" elsewhere.
> Please confirm or advise by 14 March; ceiling framing on Level 3 starts 18 March. Cost or time impact: none expected
> if the proposed solution is accepted.

One question, two sheet references, a proposed answer, a date it is needed by and why, and a statement on cost and
time. Compare "Please clarify ceiling heights on Level 3", which will come back with a question.

## What turnaround should you expect?

The contract usually sets it: review periods for submittals (often 10 to 14 days, longer for complex shop drawings or
when the engineer of record must review) and response times for RFIs (often 5 to 10 days). Put the contract's numbers
in your log so overdue items show automatically, and send a reminder before the date, not after the work has
stopped. When a late answer delays your work, note it at the time with the RFI number; that note is what supports a
time extension later.

## What is a submittal register?

The list, made at the start of the job, of every submittal the specifications require from your trade: spec
section, item, type, the date it is needed back to meet the schedule, and the lead time after approval. Building it
from the specifications in the first two weeks catches the long-lead items early and avoids the classic failure: a
required submittal nobody noticed until the inspector asks for it.

## Who is responsible if an approved submittal is wrong?

Usually the contractor. Review stamps typically say the review is for general conformance with the design intent and
doesn't relieve the contractor of responsibility for dimensions, quantities, coordination and compliance with the
contract documents. If you submit a product that deviates from the specification, say so clearly in the submittal;
a deviation buried in a cut sheet and approved without comment is still your deviation.

## Is there a free submittal log and RFI log?

Yes, both in Excel, free under CC BY 4.0: a [submittal log](/construction/submittal-log.xlsx) and an
[RFI log](/construction/rfi-log.xlsx). Each has the columns above and works out the days in review or days open from
the dates, which is the figure a delay claim rests on. The sample rows are made up.

## Does our construction software handle submittals and RFIs?

Not yet. Our US construction demo covers daily field reports, pay applications with retainage, change orders, lien
waivers, crews and payroll and job cost (see [software for subcontractors and specialty contractors](/industries/construction-company));
a submittal and RFI log with ball-in-court and links to change order requests is something we would build on the same
job records. See also [pay applications](/construction/pay-applications).
