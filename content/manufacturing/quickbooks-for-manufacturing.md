---
kind: manufacturing
slug: quickbooks-for-manufacturing
group: quickbooks
title: "Does QuickBooks work for manufacturing? Edition by edition"
question: "Does QuickBooks work for manufacturing?"
answer: >
  Partly, and it depends on the edition. QuickBooks Online Plus and Advanced track inventory and job costs but
  have no bills of materials or manufacturing orders; Intuit says its manufacturing features are only in Intuit
  Enterprise Suite, which still doesn't support multi-level bills of materials. QuickBooks Desktop Enterprise
  (Manufacturing & Wholesale) goes furthest. None of them, by Intuit's own pages, schedules machines or tracks time by operation, so
  most job shops keep QuickBooks for the books and run the shop in a separate system.
description: "What QuickBooks Online, Intuit Enterprise Suite and Desktop Enterprise do for manufacturers: BOMs, assemblies, work orders, costing, and where each stops."
domain: [manufacturing, quickbooks, accounting]
published: 2026-11-02
updated: 2026-11-03
checked: 2026-11-03
sources:
  - title: Get started with manufacturing orders and assemblies
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/sales-orders/learn-manufacturing-orders-assemblies/L7ffspckB_US_en_US
    date: 2026-08-03
  - title: Set up and track your inventory in QuickBooks Online
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-management/set-track-inventory-quickbooks-online/L22FZLBGN_US_en_US
    date: 2026-06-17
  - title: Manufacturing accounting software (QuickBooks Desktop Enterprise)
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/desktop/enterprise/industry-solutions/manufacturing/
    date: 2026-11-02
  - title: Advanced Inventory management software (QuickBooks Desktop Enterprise)
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/desktop/enterprise/advanced-inventory/
    date: 2026-11-02
checks:
  - reg: Intuit help, manufacturing orders and assemblies (plan downgrades)
    doc: intuit-mo
    quote: "Manufacturing features are currently available in Intuit Enterprise Suite."
  - reg: Intuit help, manufacturing orders and assemblies
    doc: intuit-mo
    quote: "Multi level bill of materials with sub assemblies aren't supported in Intuit Enterprise Suite."
  - reg: Intuit help, manufacturing orders and assemblies (step 1)
    doc: intuit-mo
    quote: "You cannot start a manufacturing order without a bill of materials."
  - reg: Intuit help, manufacturing orders and assemblies (plan downgrades)
    doc: intuit-mo
    quote: "Bill of materials: Retained as view-only; cannot be edited or created."
  - reg: Intuit help, set up and track inventory in QuickBooks Online
    doc: intuit-qbo
    quote: "Inventory features are available only for QuickBooks Online Plus and Advanced."
  - reg: QuickBooks Desktop Enterprise manufacturing page
    doc: intuit-desktop
    quote: "Track costs from raw materials to finished goods, including labor and shipping with landed cost and bill of materials."
  - reg: QuickBooks Desktop Enterprise Advanced Inventory page (product information)
    doc: intuit-desktop
    quote: "Advanced Inventory is included in the Platinum and Diamond subscriptions only."
---

## The short answer, by edition

Checked against Intuit's own pages on 2 November 2026. Intuit changes plans often; check yours before relying on this.

| | QuickBooks Online Plus / Advanced | Intuit Enterprise Suite | QuickBooks Desktop Enterprise (Manufacturing & Wholesale) |
|---|---|---|---|
| Inventory quantities and value | Yes | Yes | Yes |
| Bill of materials and assemblies | No | Yes, single level only | Yes, including subassemblies |
| Manufacturing (build) orders | No | Yes: planned, in progress, completed | Yes: build orders |
| Component shortages | No | Yes, a shortage report | Yes: how many you can build from stock |
| Labor in product cost | Through projects, not per unit | As a service line on the bill of materials | Yes |
| Multiple warehouses, bins, lots, serials | Not described in Intuit's inventory setup article | Not described in Intuit's manufacturing help | Advanced Inventory, Platinum and Diamond only |
| Routings, machines, operations | No | Not described in Intuit's help | Not described on Intuit's product page |
| Machine scheduling, shop-floor time by operation | No | Not described | Not described (production forecasts and labor planning are) |

"Not described" means the Intuit page we checked doesn't mention it; ask Intuit or a ProAdvisor if it matters to you.

## Three different things called "manufacturing"

Most confusion comes from mixing up three things a shop needs:

1. **What a part is made of**: the [bill of materials](/systems#bill-of-materials). QuickBooks' assembly items cover this, in the editions that have them.
2. **How it is made**: the [routing](/systems/routing), the operations in order (cut, bend, weld, inspect), on which machine, with setup and run times. No QuickBooks edition models this.
3. **When it is made**: the schedule, which puts each operation on a machine with real capacity. See [production scheduling software](/manufacturing/production-scheduling-software).

A shop that buys and assembles kits mostly needs the first. A job shop that machines, cuts or welds to order needs all three, which is why job shops outgrow QuickBooks sooner than assemblers do.

## QuickBooks Online Plus and Advanced

Inventory is included in Plus and Advanced: quantity on hand, reorder points, purchase orders, and either FIFO or moving average cost, chosen once (see [QuickBooks Online inventory for manufacturers](/manufacturing/quickbooks-online-inventory)). What's missing for a manufacturer:

- **No bills of materials or builds.** Intuit's manufacturing help says these features are in Intuit Enterprise Suite; if you downgrade from it, bills of materials become view-only.
- **Bundles are not assemblies.** A bundle groups items so they go on an invoice together; no finished part sits in stock and no labor goes into its cost.
- **Job costing is by project.** Plus and Advanced group a customer's income, expenses and timesheets into a project. That gives job profit, but not setup and run hours per operation (see [job costing in QuickBooks](/manufacturing/quickbooks-job-costing)).

A common workaround is to keep raw material as non-inventory items and adjust finished goods by hand. It keeps the books roughly right but hides what each job really used.

## Intuit Enterprise Suite

Intuit Enterprise Suite is Intuit's cloud plan above QuickBooks Online Advanced. Its manufacturing feature works like this:

- An **inventory assembly item** carries a bill of materials: components, raw materials and services such as labor for one unit. A manufacturing order can't start without one.
- A **manufacturing order** starts as Planned and reserves its components; a shortage column counts what other open orders need from the same stock.
- Completing the order creates a **build assembly** that moves components into finished stock and computes the actual cost. Estimated cost comes from each component's default purchase cost.

The limits that matter to a job shop: bills of materials are single level (no subassemblies), edits to a bill apply only to new orders, and Intuit's help doesn't describe routings, work centers or scheduling. It suits a shop that assembles from bought parts more than one that machines from bar stock.

## QuickBooks Desktop Enterprise, Manufacturing & Wholesale

Desktop Enterprise has the deepest manufacturing features of the three: bills of materials with subassemblies, automated builds and purchase orders for the components a final assembly needs, and costs from raw material to finished goods including labor and landed cost. Its **Advanced Inventory** (multiple locations down to bin, lot and serial numbers, barcode scanning, cycle counts) is in the Platinum and Diamond subscriptions only; landed cost and sales order fulfillment are too.

It is Windows software (hosted versions exist), sold by subscription, and Intuit's page doesn't describe routing by machine or shop-floor time by operation.

## Signs the shop has outgrown QuickBooks

From what shop owners describe on forums such as Practical Machinist, and what we see in our own work:

- Quotes live in a spreadsheet and the job is set up again from scratch when the order arrives.
- The schedule is a whiteboard or a sheet with one column per machine, and only one person trusts it.
- You find out a job lost money weeks after it shipped, when the bills arrive.
- Stock in QuickBooks and stock on the shelf disagree, because material used on the floor is entered later, or never.
- Two people keep "the real list" of open jobs, and they differ.

None of these is a QuickBooks bug. QuickBooks is an accounting system; these are operations problems.

## Keep QuickBooks, add a shop system

For most small manufacturers the cheapest sound setup is QuickBooks for the books and a shop system for the work, with one owner for each record:

| Record | Owned by | Goes to the other system as |
|---|---|---|
| Customers and vendors | Either, but only one | A copy, kept in step |
| Quotes, jobs, routings, schedule | Shop system | Nothing (stays in operations) |
| Shop-floor hours, scrap, material used | Shop system | Job cost, and the inventory value at month-end |
| Customer invoices | Shop system (from the shipped job) | An invoice, posted once |
| Vendor bills and payments | Either, but only one: usually the shop system, which holds the PO and the receipt | A bill, then its payment |
| Chart of accounts, tax, payroll | QuickBooks | Nothing |

"Owned by" means people change that record in one place only. Everything that breaks between two systems starts with a record two people can edit in both.

## Connecting the two without duplicates

Our QuickBooks Online connector runs in our four US demos against a QuickBooks sandbox company ([what it sends](/manufacturing/quickbooks-integration)). It follows the rules our [TallyPrime connection](/notes/connecting-tallyprime-four-ways) already runs on:

- **Post once, by our own number.** Each invoice carries the shop system's document number; before posting, the connector checks whether that number already exists, so a retry can't create a second copy.
- **Read back, don't assume.** After posting, read the record from the accounting system and store its ID and totals ([reconcile against the source of truth](/patterns/reconcile-against-source-of-truth)).
- **Fail loudly.** A rejected entry (a missing account, a closed period) waits for a person with the reason shown, instead of retrying forever or being dropped ([failures flagged, not lost](/patterns/failures-flagged-not-lost)).
- **Nobody re-keys.** On Intuit's community, many "duplicate" problems come from someone entering by hand what an integration had already posted, which also takes the stock out twice.

## Is QuickBooks an ERP?

No. An ERP covers operations (orders, production, stock, purchasing) as well as accounting, on one database. QuickBooks is accounting software with some inventory; Intuit Enterprise Suite and Desktop Enterprise add manufacturing pieces but not shop-floor control. That's fine: many good shop systems are built to sit beside QuickBooks rather than replace it. See [ERP for job shops](/manufacturing/job-shop-erp) for what the shop side needs.
