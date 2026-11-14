---
kind: construction
slug: cost-codes
group: us
title: "Construction cost codes: setting them up for job costing"
metaTitle: "Construction cost codes: how to set them up for job costing"
related:
  - /construction/wip-schedule
  - /construction/pay-applications
  - /construction/change-orders
  - /systems/job-costing
  - /systems/schedule-of-values
question: "How should a contractor set up cost codes?"
answer: >
  Use a short list of cost codes for the work you actually do, each split by cost type (labor, material, equipment,
  subcontract, other), and use the same codes on the estimate, the budget, timesheets, purchase orders and bills.
  Many contractors base the list on CSI MasterFormat divisions. The test is whether each code can answer "are we over
  or under on this part of the job?" while it is still running.
description: "Construction cost codes for job costing: code vs cost type, building a list on MasterFormat, matching the estimate and schedule of values."
domain: [construction, job-costing, us]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
---

## What is a cost code?

A label that says which part of the work a cost belongs to: 03-300 cast-in-place concrete, 26-050 electrical rough-in,
01-500 temporary facilities. Every hour on a timesheet, every purchase order line and every bill carries one, so the
job's costs can be compared with the estimate part by part. Without them, a job only has one number, and you find out
it lost money after it is finished.

## What is the difference between a cost code and a cost type?

The cost code says **what** work; the cost type says **what kind** of cost:

| Cost type | Examples |
|---|---|
| L, labor | Field wages and burden |
| M, material | Concrete, conduit, drywall |
| E, equipment | Owned equipment rates, rentals |
| S, subcontract | Subcontractor invoices |
| O, other | Permits, dumpsters, testing |

A cost is coded to both: 03-300-L is concrete labor. Two dimensions keep the code list short, and they let you see
that concrete is over because labor ran long, not because concrete cost more.

## How should the code list be built?

- **Start from your estimate.** The codes should be the lines you estimate by, so the budget is the estimate.
- **Use a standard backbone.** CSI MasterFormat divisions (03 concrete, 05 metals, 09 finishes, 22 plumbing, 26
  electrical) are widely used and match how specifications are organized; a specialty contractor uses the few
  divisions it works in and adds detail inside them.
- **Keep it short.** Field crews code their own time; a 400-line list gets coded to whatever is first. Fifty to a
  hundred codes is plenty for most specialty contractors.
- **Add phases only if you bill or schedule by them**, such as a building or floor prefix.
- **Never reuse a code for different work** across jobs, or the history becomes useless for the next estimate.

## How do cost codes relate to the schedule of values?

The [schedule of values](/systems/schedule-of-values) is what you bill the owner by; cost codes are what you track
cost by. They don't have to match one to one, but each schedule line should map to a group of cost codes, so the
percent complete you bill can be checked against the cost spent. That comparison is what the
[WIP schedule](/construction/wip-schedule) needs: costs to date against estimated cost, line by line.

## How are change orders coded?

Each approved change order gets its own code or a suffix (03-300-CO04), with its own budget from the change order's
estimate. That keeps the original budget clean and shows whether change order work made money. See
[change orders](/construction/change-orders).

## What does a starter cost code list look like?

An example for an electrical subcontractor, using MasterFormat division 26 as the backbone and keeping general
conditions separate:

| Code | Description |
|---|---|
| 01-310 | Project management and supervision |
| 01-500 | Temporary power, lighting and facilities |
| 01-740 | Cleanup and closeout |
| 26-050 | Rough-in: conduit, boxes, supports |
| 26-051 | Wire and cable pulling |
| 26-240 | Switchgear and panelboards |
| 26-270 | Low-voltage distribution, feeders |
| 26-500 | Lighting fixtures and controls |
| 27-000 | Low-voltage and data (if self-performed) |
| 28-310 | Fire alarm (if self-performed) |
| 99-000 | Change orders (with a suffix per change order) |

Each line carries the cost types L, M, E, S and O, so 26-050-L is rough-in labor. A concrete or framing contractor
uses the same pattern with its own divisions.

## How do cost codes feed the job cost report?

The report puts budget, committed and actual side by side for each code and type:

| Code | Budget | Committed (open POs, subcontracts) | Actual to date | Estimate to complete | Projected | Over/under |
|---|---|---|---|---|---|---|
| 26-050-L | 48,000 | 0 | 31,200 | 19,500 | 50,700 | −2,700 |
| 26-050-M | 22,000 | 4,100 | 15,300 | 2,000 | 21,400 | +600 |

The estimate to complete is the project manager's judgement, updated monthly; projected cost is actual plus
committed plus estimate to complete. The over/under column is the early warning, and its total feeds the
[WIP schedule](/construction/wip-schedule).

## What mistakes make cost codes useless?

- Too many codes, so field staff guess.
- Codes that differ between the estimate and the job, so nothing can be compared.
- One code for all labor on a job, which hides the part of the work that is losing money.
- Change order work coded to the original lines, which makes the base scope look worse than it is.
- Codes changed mid-job without moving the budget with them.

## How do costs get coded in practice?

At the source: the foreman picks the code on the daily report or timesheet, the buyer puts it on the purchase order
line, and the bill inherits it when matched to the PO. Coding bills in the office weeks later, from memory, is where
job cost reports go wrong. In our US construction demo, crews report quantities against schedule-of-values lines on
the daily report, labor by trade is filled from attendance, and material is issued from the job's stock, so every
cost lands on a job and a line as it happens. See [job costing](/systems/job-costing) and
[software for subcontractors and specialty contractors](/industries/construction-company).
