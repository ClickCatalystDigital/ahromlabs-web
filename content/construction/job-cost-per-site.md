---
kind: construction
slug: job-cost-per-site
group: india
title: "Job cost and margin per site for construction contractors"
metaTitle: "Job cost and margin per site for contractors"
related:
  - /construction/material-consumption-vs-boq
  - /construction/ra-bills
  - /systems/job-costing
  - /notes/accounting-inside-the-manufacturing-erp
  - /industries/construction-company
question: "How does a contractor work out the cost and margin of each site, and spot a site losing money?"
answer: >
  Add up every cost that belongs to the site (material used, site labour, plant and machines, site cash and
  subcontractors) and set it against the value of work done to date: the difference is the margin so far. Divide cost
  to date by progress to project the final cost, and compare it with the estimate. ICAI's AS 7 defines which costs
  belong to a contract, and says a loss expected on a contract is recognised at once, not when the job ends.
description: "Job cost and margin per site: which costs belong to a construction contract under AS 7, margin to date, projected cost, losing sites, and a worked example."
domain: [construction, job-cost, india]
published: 2026-11-06
updated: 2026-11-07
checked: 2026-11-06
sources:
  - title: "Accounting Standard (AS) 7, Construction Contracts (revised 2002)"
    publisher: The Institute of Chartered Accountants of India
    url: https://indasaccess.icai.org/Volume-III/AS/asb.html?a=109
    date: "2026-11-06"
checks:
  - reg: AS 7, contract costs
    doc: icai-as7
    quote: "costs that relate directly to the specific contract;"
  - reg: AS 7, contract costs
    doc: icai-as7
    quote: "costs that are attributable to contract activity in general and can be allocated to the contract; and"
  - reg: AS 7, direct costs
    doc: icai-as7
    quote: "site labour costs, including site supervision;"
  - reg: AS 7, direct costs
    doc: icai-as7
    quote: "costs of materials used in construction;"
  - reg: AS 7, direct costs
    doc: icai-as7
    quote: "costs of moving plant, equipment and materials to and from the contract site;"
  - reg: AS 7, direct costs
    doc: icai-as7
    quote: "the estimated costs of rectification and guarantee work, including expected warranty costs;"
  - reg: AS 7, costs excluded
    doc: icai-as7
    quote: "general administration costs for which reimbursement is not specified in the contract;"
  - reg: AS 7, costs excluded
    doc: icai-as7
    quote: "depreciation of idle plant and equipment that is not used on a particular contract."
  - reg: AS 7, stage of completion
    doc: icai-as7
    quote: "the proportion that contract costs incurred for work performed upto the reporting date bear to the estimated total contract costs; or"
  - reg: AS 7, stage of completion
    doc: icai-as7
    quote: "Progress payments and advances received from customers may not necessarily reflect the work performed."
  - reg: AS 7, expected losses
    doc: icai-as7
    quote: "When it is probable that total contract costs will exceed total contract revenue, the expected loss should be recognised as an expense immediately."
---

## What is job cost per site?

It's the total of every cost that belongs to one site or contract, kept separately from every other site. A
contractor running several sites at once can be profitable overall while one site loses money; job cost per site
shows which one, while there's still time to act. It also tells you whether the estimate you bid was right, which is
what the next bid depends on.

## Which costs belong to a construction contract?

ICAI's Accounting Standard 7 (Construction Contracts) says contract costs comprise costs that relate directly to the
contract, costs attributable to contract activity in general that can be allocated to it, and other costs the
contract makes chargeable to the customer. Direct costs include:

- Site labour, including site supervision.
- Materials used in construction.
- Depreciation of plant and equipment used on the contract, and hire of plant and equipment.
- Moving plant, equipment and materials to and from the site.
- Design and technical assistance directly related to the contract.
- Estimated rectification and guarantee work, including expected warranty costs, and claims from third parties.

## Which costs should not be charged to a site?

General administration costs the contract doesn't reimburse, selling costs, research and development the contract
doesn't pay for, and depreciation of idle plant and equipment not used on that contract, under AS 7. Head office rent
and salaries stay in the company's overheads; an idle mixer in the godown isn't a cost of the site it isn't on.

## How do you work out the margin so far on a site?

Subtract cost to date from the value of work done to date. The value of work is the approved quantity of each BOQ
item times its rate, not what has been billed or received: AS 7 notes that progress payments and advances may not
reflect the work performed.

A made-up site with a contract value of ₹40,00,000 and an estimated cost of ₹28,00,000:

| | ₹ |
|---|---|
| Value of approved work to date (60% of the contract) | 24,00,000 |
| Material used on site | 9,60,000 |
| Site labour, from attendance and wages | 6,40,000 |
| Site cash (kharchi) spent | 1,20,000 |
| Machine days on site | 80,000 |
| **Cost to date** | **18,00,000** |
| **Margin to date** | **6,00,000 (25%)** |

## How do you project a site's final cost?

Divide cost to date by progress, so the rest of the job is assumed to cost at the same rate. The site above is 60%
done for ₹18,00,000, so it projects to ₹30,00,000 against an estimate of ₹28,00,000: a projected margin of
₹10,00,000 instead of the ₹12,00,000 planned, and ₹2,00,000 over budget. The projection is rough early in a job, so
wait until some of the work is done (the demo waits for 5%) and check it against a fresh estimate to complete.

## How do you know when a site is losing money?

When its projected cost is above its contract value, or its margin to date has turned negative. AS 7 is strict about
it: when it's probable that total contract costs will exceed total contract revenue, the expected loss is recognised
as an expense immediately, whatever stage the work is at. A site that is merely over its estimate is over budget; one
projected to cost more than it earns is losing money, and needs attention now.

## How does percentage of completion relate to job cost?

AS 7 allows the stage of completion to be measured by the cost incurred for work done against the estimated total
cost, by surveys of work performed, or by the physical proportion of the work completed. A contractor that measures
progress by approved BOQ quantities is using the physical method; the cost-to-cost method needs a regular estimate to
complete. Your accountant decides which applies in your accounts.

## What records does job cost per site need?

One record per cost, tagged with its site at the moment it happens:

- Material issued to each site, valued at its purchase rate, from the stores records.
- Attendance per worker per site per day, and each worker's wage.
- Site cash spends, with receipts, per site.
- Machine days per site, with a day rate for owned machines.
- Subcontractor bills against the site.
- The approved quantity of each BOQ item, from daily reports or measurements, and the contract rates.

See [material consumption against BOQ](/construction/material-consumption-vs-boq) for the check that explains the
material line, and [RA bills](/construction/ra-bills) for what's billed against the same work.

## What does the construction demo do?

In the [construction demo](/industries/construction-company), the director dashboard shows each site's contract, work
done (approved work at BOQ rates), billed, received, cost to date and margin. Cost to date is material used on site
at its rate, labour from attendance and wages, site cash spent, and machine days at each machine's day rate. Margin
to date is work done less cost; once 5% of the work is done, projected cost is cost to date divided by progress, and
projected margin is the contract less that, set against the planned margin from the estimate. Sites are marked on
track, over budget or losing money, and Datum AI answers "is the Bhatt site making money?" with the same figures. It
doesn't add subcontractor bills or head office allocations to a site's cost, or take a fresh estimate to complete;
those are parts we'd build.
