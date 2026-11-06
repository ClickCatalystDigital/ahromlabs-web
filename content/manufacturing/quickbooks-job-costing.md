---
kind: manufacturing
slug: quickbooks-job-costing
group: quickbooks
title: "Job costing in QuickBooks for manufacturers: estimated vs actual"
metaTitle: "QuickBooks job costing for manufacturers: estimate vs actual"
related:
  - /systems/job-costing
  - /industries/boiler-pressure-vessel-manufacturing
  - /construction/wip-schedule
  - /manufacturing/wip-tracking
  - /manufacturing/quickbooks-online-inventory
question: "Can QuickBooks do job costing for a manufacturer?"
answer: >
  QuickBooks Online Plus ($140 a month list), Advanced ($340) and Intuit Enterprise Suite do job costing through projects: each customer
  job collects its invoices, bills, expenses and timesheets, and shows profit. That works for a contractor.
  A machine shop also needs setup and run hours, machine time, scrap and rework per job, compared with what was
  quoted while the job is still open. QuickBooks doesn't split cost that way, so shops either keep a job-cost
  sheet beside it or track it in a shop system.
description: "Can QuickBooks job cost a machine shop? What projects track, what they miss (machine time, setup, scrap), and one job costed both ways, with a calculator."
domain: [manufacturing, quickbooks, job-costing]
tool: jobcost
published: 2026-11-02
updated: 2026-11-07
checked: 2026-11-06
sources:
  - title: QuickBooks Online pricing
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/pricing/
    date: "2026-11-06"
  - title: Create projects in QuickBooks Online or Intuit Enterprise Suite
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/manage-projects/set-create-projects-quickbooks-online/L9GAdLMyT_US_en_US
    date: 2026-10-06
  - title: Track hourly labor costs and profitability by project in QuickBooks Online
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/regular-payroll/track-hourly-labor-costs-profitability-project/L9ZxBA4sn_US_en_US
    date: 2026-08-05
  - title: How many shops track actual hours vs the bid price? (forum discussion)
    publisher: Practical Machinist
    url: https://www.practicalmachinist.com/forum/threads/how-many-shops-track-actual-hours-vs-the-bid-price.446887/
    date: 2026-11-02
checks:
  - reg: Intuit help, create projects
    doc: intuit-qbo
    quote: "If you have QuickBooks Online Plus, QuickBooks Online Advanced, or Intuit Enterprise Suite, you can use projects to track income and costs for specific projects."
  - reg: Intuit help, track hourly labor costs by project
    doc: intuit-qbo
    quote: "Estimated hourly costs multiplies the hours worked by a fixed per-employee rate"
  - reg: Intuit help, track hourly labor costs by project
    doc: intuit-qbo
    quote: "Hourly cost rates only apply to time that is tracked after the hourly cost rate is set."
  - reg: Intuit help, track hourly labor costs by project
    doc: intuit-qbo
    quote: "This report only uses data from payroll expenses, so if you only track hourly time costs, this report won't give you accurate information."
  - reg: Intuit help, create projects
    doc: intuit-qbo
    quote: "If you pick Detailed, you can't switch back to Basic."
  - reg: Intuit, QuickBooks Online pricing (Plus plan features)
    doc: intuit-pricing-1106
    quote: "Track project profitability"
---

## Can QuickBooks do job costing for a manufacturer?

Partly: QuickBooks Online Plus ($140 a month list, November 2026), Advanced ($340) and Intuit Enterprise Suite do job costing through **projects**, which group one customer job's invoices, estimates, bills, expenses and timesheets, with an income, cost and profit view. Intuit's own example in its [projects help](https://quickbooks.intuit.com/learn-support/en-us/help-article/manage-projects/set-create-projects-quickbooks-online/L9GAdLMyT_US_en_US) is an auto repair job that tracks every part and labor hour. That covers a contractor. What it doesn't split is the cost a machine shop runs on, below.

## How does labor get into a QuickBooks project?

Two ways, per Intuit's [labor costing help](https://quickbooks.intuit.com/learn-support/en-us/help-article/regular-payroll/track-hourly-labor-costs-profitability-project/L9ZxBA4sn_US_en_US):

- **Payroll expenses**: real wages, taxes and workers' comp, posted after each payroll run.
- **Estimated hourly costs**: hours on project timesheets times a fixed rate per employee, which can include overhead. Visible straight away, but only for time tracked after the rate was set.

Intuit Enterprise Suite, and Advanced with the construction add-on, also offer basic or detailed project costing; once you pick detailed you can't switch back.

## Why doesn't the project profitability report match my labor estimate?

Because that report uses payroll expenses only: estimated hourly costs don't feed it. If you track time at an estimated rate and run payroll elsewhere, the report shows the job without its labor.

## What does a machine shop need that QuickBooks projects don't split?

The reasons a job made or lost money, while it's still open:

| Cost a shop tracks | In a QuickBooks project |
|---|---|
| Material issued to the job | Only if bought for that job, or adjusted by hand |
| Setup hours vs run hours | One timesheet total per person |
| Machine time (the shop rate) separate from labor | No: an hourly rate per employee, not per machine |
| Scrapped parts and rework | Not separated from normal production |
| Outside processing (plating, heat treat) | Yes, as bills assigned to the project |
| Quoted hours per operation, to compare | No |

Machine time matters most. In a machine shop the machine and its overhead often cost more per hour than the operator, and one operator may run two machines. A rate per employee can't show that.

## What does one job look like, estimated against actual?

Every figure here is made up. A shop quotes 200 steel brackets at $18.50 each. Labor costs $32 an hour; the shop rate (machine plus overhead) is $65 per machine hour, so an hour of setup or run time costs $97.

| | Estimated | Actual |
|---|---:|---:|
| Material | $840.00 (200 × $4.20) | $910.00 (200 × $4.55) |
| Setup | $194.00 (2 h) | $339.50 (3.5 h) |
| Run time | $1,940.00 (6 min each) | $2,425.00 (7.5 min each) |
| Outside processing | $300.00 | $300.00 |
| Scrapped parts (8 made again) | $0.00 | $133.40 |
| Rework | $0.00 | $145.50 (1.5 h) |
| **Total cost** | **$3,274.00** | **$4,253.40** |
| Revenue | $3,700.00 | $3,700.00 |
| **Margin** | **$426.00 (11.5%)** | **−$553.40 (−15.0%)** |

The job was quoted at 22 hours and took 31: **1.41 hours used per hour quoted**. The largest part of the $979.40 miss is run time ($485.00, from a cycle 25% slower than quoted), not the scrap that people notice on the floor. The calculator above has the same job; change any figure.

## What would the same job look like in QuickBooks?

Profitable. The QuickBooks project sees income of $3,700.00 against material bills of $946.40 (the 200 brackets plus the 8 made again, at $4.55), outside processing of $300.00 and estimated labor of 31 hours × $32 = $992.00. Cost $2,238.40, profit **+$1,461.60 (39.5%)**. The shop view above shows **−$553.40**. The whole gap is the $2,015.00 of machine time (31 hours × $65) that a per-employee rate has nowhere to hold.

One owner on [Practical Machinist](https://www.practicalmachinist.com/forum/threads/how-many-shops-track-actual-hours-vs-the-bid-price.446887/) describes the habit that fixes quoting: log estimated and actual time side by side on every job, and when a few months of similar jobs show the same miss, raise the quoted time by that much. The hours factor is that number.

## How do you job cost with QuickBooks and a spreadsheet?

With projects for the money and a sheet for the hours:

1. Turn on projects and create one per job.
2. Assign material bills and outside processing to the project as they arrive.
3. Have operators record time per job daily, before they clock out; split setup from run if you can ([how shops get operators to scan](/manufacturing/wip-tracking)).
4. Keep the quoted hours and material per job in a sheet beside it. The free [job cost workbook](/manufacturing/job-cost-worked-example.xlsx) has the columns and formulas, with this example filled in.
5. Close each job by comparing the two, and feed the hours factor back into the next quote.

It works for a handful of jobs a week. It strains when material is issued from stock rather than bought per job, when one operator runs two machines, or when you want the answer before the job ships.

## When should job costing move into a shop system?

When the comparison arrives too late to matter. A shop system records material issued, setup and run time and scrap against each operation as they happen, compares them with the quoted routing while the job is open, and posts only the invoice and the inventory value to QuickBooks (see [keeping QuickBooks beside a shop system](/manufacturing/quickbooks-for-manufacturing)). Material reserved per job keeps the material line honest; see [QuickBooks Online inventory](/manufacturing/quickbooks-online-inventory). And costing depends on where the hours were planned: [production scheduling](/manufacturing/production-scheduling-software).

Our US [boiler demo](/industries/boiler-pressure-vessel-manufacturing) shows one version: each job's actual cost is the purchase orders issued for it plus the minutes logged on its job cards at each employee's cost rate, and work orders carry a planned cost from route steps' planned minutes at the work center's machine-hour rate. It doesn't yet allocate overhead or cost outside processing (outside work is listed, not priced); we'd build those for a shop that needs them.
