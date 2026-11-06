---
kind: manufacturing
slug: job-shop-erp
group: choosing
title: "ERP for job shops and small manufacturers: what to look for"
metaTitle: "Job shop ERP: what a small manufacturer should look for"
related:
  - /manufacturing/erp-requirements-checklist
  - /manufacturing/production-scheduling-software
  - /systems/routing
  - /industries/boiler-pressure-vessel-manufacturing
  - /services/custom-erp-crm
question: "What should a job shop look for in ERP software?"
answer: >
  A job shop ERP should carry each job from quote to invoice on one record: the quoted routing becomes the job,
  material is reserved for it, operations are scheduled on real machine capacity, the floor records time and
  scrap per operation, and actual cost is compared with the quote while the job is open. For a shop of 10 to
  50 people, start with quoting, jobs, scheduling and job cost; keep QuickBooks for accounting; and test every
  vendor on two of your own jobs, not their sample data.
description: "Job shop ERP for small manufacturers: the quote-to-invoice flow, what to buy first, ten tests to run in a vendor demo, and what shop owners warn about."
domain: [manufacturing, erp, job-shop]
published: 2026-11-02
updated: 2026-11-07
checked: 2026-11-07
sources:
  - title: Machine shop ERP recommendations (forum discussion)
    publisher: Practical Machinist
    url: https://www.practicalmachinist.com/forum/threads/machine-shop-erp-recommendations.400718/
    date: 2026-11-02
  - title: "ERP: JobBOSS2 vs ProShop vs something actually good (forum discussion)"
    publisher: Practical Machinist
    url: https://www.practicalmachinist.com/forum/threads/erp-jobboss-2-vs-proshop-vs-something-actually-good.411796/
    date: 2026-11-02
---

## What should a job shop look for in ERP software?

One record that carries each job from quote to invoice. A job shop makes to order, so the unit of work is the job, not the product. An ERP for one follows a job through every department on the same record:

1. **Quote**: material, operations, setup and run times, outside processing, price.
2. **Order**: the customer's PO turns the quote into a job with nothing typed again.
3. **Job and routing**: the quoted operations become the job's [routing](/systems/routing) and its traveler.
4. **Material**: stock is reserved for the job, or bought for it, with heat or lot numbers where they matter.
5. **Schedule**: operations placed on machines with real capacity ([how scheduling works](/manufacturing/production-scheduling-software)).
6. **Shop floor**: operators record start, finish, quantity and scrap for each operation ([WIP tracking](/manufacturing/wip-tracking)).
7. **Quality**: inspection results and certificates attached to the job.
8. **Ship and invoice**: packing list, invoice from what shipped, posted to the accounting system.
9. **Job cost**: actual against quoted, per operation ([a worked example](/manufacturing/quickbooks-job-costing)).

If two of these steps live in different files, that's where errors and lost hours collect.

## What should a 10 to 50 person shop buy first?

Quoting, jobs, one shared schedule, floor time and job cost; the rest can follow:

| First | Next | Usually later |
|---|---|---|
| Quoting from operations and times | Material reservation per job | Maintenance scheduling |
| Jobs and travelers from the quote | Purchasing from job shortages | Advanced planning (optimizers) |
| One shared schedule | Quality records and certificates | Customer portal |
| Shop-floor time per operation | Heat, lot or serial traceability | EDI with large customers |
| Job cost vs quote | Inventory by location | Multi-plant |

Accounting stays where it is. Most small manufacturers already run QuickBooks, and replacing it buys nothing; the ERP should post invoices and inventory value to it ([what QuickBooks covers](/manufacturing/quickbooks-for-manufacturing)).

## What do shop owners warn about before buying an ERP?

Four things. Owners discussing ERP on forums such as Practical Machinist raise the same few points, and they are worth taking seriously:

- **Someone has to run it.** One experienced poster puts it plainly: a full ERP needs an administrator, which is real overhead for a 3 to 10 person shop.
- **Paying for what you don't use.** Large packages carry modules a small shop never touches, and the setup effort that comes with them.
- **Weak scheduling.** Several owners say the scheduling module was the weak part: not good enough to plan the floor day to day.
- **The workflow bends to the software.** If the system can't model how your jobs move, people keep the old spreadsheets, and now there are two sources of truth.

## How do you test an ERP vendor in a demo?

Run ten tests live, on your own data. Each takes about an hour. A vendor that can't show one live is telling you something.

1. Turn one of your recent quotes into a job without retyping the operations.
2. Show the job's traveler with each operation, machine and quoted time.
3. Reserve stock for the job, then show that a second job can't plan on the same material.
4. Schedule five jobs on your machines and shifts, then add a rush order and show what moves.
5. Record an operation's time and scrap from a phone or a shop-floor screen.
6. Show estimated vs actual cost for a job before it ships.
7. Find which jobs used a given heat or lot number, and the reverse.
8. Ship part of a job and invoice only what shipped.
9. Post that invoice to QuickBooks once, retry the post, and show there's still one invoice.
10. Export every record (jobs, routings, stock, costs) to files you can open without the vendor.

The last one matters more than it looks: it's what makes leaving possible.

Score as you go. A made-up example with 2 points a test (2 shown live, 1 partly, 0 not): vendor A scores 15 of 20 but
fails test 3 (reservation) and test 9 (a duplicate QuickBooks invoice); vendor B scores 13 of 20 and passes both.
Pick B, or make A fix those two in the contract: a failed must-have outweighs a higher total. If a vendor leads with AI, add the tests in [AI in ERP: what it can safely do today](/ai-assistant/ai-in-erp).

## Packaged, configurable or built for you: which fits a job shop?

Packaged fits when your jobs move the way the package expects; built for you fits when your workflow is the reason customers choose you. Three routes, each right for some shops (compared in more depth in [custom vs off-the-shelf ERP](/manufacturing/custom-vs-off-the-shelf-erp)):

- **Packaged job shop ERP.** Fastest to start if your work fits its model. You adapt to the software, pay per user, and live with its scheduling and reports.
- **Configurable platform.** A general ERP or low-code base set up for you. More flexible, but someone keeps the configuration working.
- **Built for your workflow.** Fits exactly and can change as you do. It costs more up front and depends on the builder staying around, so get in writing that you can export all your data at any time, what happens to the code and the licence if you stop paying for support, and a fixed scope per phase.

Ahrom Labs builds the third kind: operations systems for manufacturers and distributors, in phases, beside the accounting software you already use. Two things we've built show what "fits the workflow" means in practice: a cutting record where every plate cut puts its usable remnant back into stock, with weights that always add up ([remnants back into stock](/notes/plate-remnants-back-into-stock)), and a customer portal that shows each order's stage from the records departments already keep ([one order, every department](/notes/customer-portal-one-order-every-department)). Both run at a manufacturer in India. Our US [boiler demo](/industries/boiler-pressure-vessel-manufacturing) shows the same system on a sample company: job cards with time logs and rework cards, capacity per work center, a read-only schedule of work orders, and each job's actual cost against its plan. It doesn't reschedule jobs by itself; dates move through a change note. Our US offer starts with a fixed-price prototype of one workflow, shown below.

## What should you bring to every ERP demo?

Two of your own jobs, whatever you choose, plus the [QuickBooks Online inventory](/manufacturing/quickbooks-online-inventory) questions if stock is your pain, and the ten tests above.
