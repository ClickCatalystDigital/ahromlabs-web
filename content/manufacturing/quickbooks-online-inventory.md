---
kind: manufacturing
slug: quickbooks-online-inventory
group: quickbooks
title: "QuickBooks Online inventory: what it tracks and where manufacturers outgrow it"
metaTitle: "QuickBooks Online inventory: limits for manufacturers"
related:
  - /services/inventory-and-reservations
  - /systems/stock-reservation
  - /notes/reels-boxes-and-two-stores
  - /industries/electronics-component-trading
  - /manufacturing/distributor-inventory-control
question: "Is QuickBooks Online inventory management enough for a manufacturer?"
answer: >
  QuickBooks Online Plus and Advanced track how many of each item you have, what it's worth (FIFO or moving
  average cost, chosen once), what's on order and when to reorder. That covers a reseller. A manufacturer
  usually also needs raw material, work in progress and finished parts kept apart, material set aside for each
  job, and stock by location or lot, which QuickBooks Online doesn't do. That is the point to add a stock layer
  beside it.
description: "QuickBooks Online inventory for manufacturers: plans, FIFO or average cost, reorder points, and the gaps: WIP, job reservations, locations, lots and BOMs."
domain: [manufacturing, quickbooks, inventory]
published: 2026-11-02
updated: 2026-11-07
checked: 2026-11-06
sources:
  - title: Set up and track your inventory in QuickBooks Online
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-management/set-track-inventory-quickbooks-online/L22FZLBGN_US_en_US
    date: 2026-06-17
  - title: Inventory valuation methods for cost accounting
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-management/fifo-used-inventory-cost-accounting/L1x3hkunE_US_en_US
    date: 2026-08-14
  - title: QuickBooks Online pricing
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/pricing/
    date: "2026-11-06"
  - title: Plan and track production with manufacturing orders and build assemblies
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-account/understand-production-costs-using-manufacturing/L4FBrL1Ip_US_en_US
    date: 2026-08-05
  - title: Use serial or lot numbers and expiration date
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/product-preferences/use-serial-lot-numbers/L7pICcele_US_en_US
    date: 2026-08-04
  - title: Advanced Inventory (QuickBooks Desktop Enterprise)
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/desktop/enterprise/advanced-inventory/
    date: "2026-11-06"
checks:
  - reg: Intuit help, set up and track inventory in QuickBooks Online
    doc: intuit-qbo
    quote: "Inventory features are available only for QuickBooks Online Plus and Advanced."
  - reg: Intuit help, set up and track inventory in QuickBooks Online
    doc: intuit-qbo
    quote: "If you use QuickBooks Online Simple Start or Essentials and would like to start using inventory tracking, you can buy the inventory add-on or upgrade your QuickBooks subscription."
  - reg: Intuit help, inventory valuation methods
    doc: intuit-qbo
    quote: "Choose your costing method carefully because it can't be changed later."
  - reg: Intuit, QuickBooks Online pricing ("Right for your industry")
    doc: intuit-pricing-1106
    quote: "Know what's on hand and what it's worth, with FIFO costing and reorder points."
  - reg: Intuit help, manufacturing orders and assemblies (plan downgrades)
    doc: intuit-mo
    quote: "Manufacturing features are currently available in Intuit Enterprise Suite."
  - reg: Intuit help, plan and track production with manufacturing orders
    doc: intuit-mo-track
    quote: "The initial stage where components are reserved."
  - reg: Intuit help, serial or lot numbers (QuickBooks Desktop Enterprise)
    doc: intuit-lots
    quote: "QuickBooks Desktop Enterprise lets you track inventory with serial numbers, lot numbers, with expiration dates when you turn on Advanced Inventory"
  - reg: Intuit, Desktop Enterprise Advanced Inventory
    doc: intuit-adv-inv
    quote: "Track inventory your way with three levels of location tracking (e.g., row, shelf, and bin; section, area, pallet)."
---

## Which QuickBooks Online plans track inventory?

Plus ($140 a month list, November 2026) and Advanced ($340); Simple Start ($38) and Essentials ($85) need Intuit's
inventory add-on or an upgrade, per Intuit's [inventory setup help](https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-management/set-track-inventory-quickbooks-online/L22FZLBGN_US_en_US).
On those plans QuickBooks Online does this:

| Feature | QuickBooks Online |
|---|---|
| Quantity on hand | Goes down with each invoice or sales receipt, up with each receipt from a vendor |
| Reordering | Reorder points and low-stock alerts; purchase orders and what's still on order |
| Valuation | FIFO or moving average cost (MAC), chosen once |
| Item types | Inventory, non-inventory (tracked as cost, not quantity), service, and bundles that group items on a sales form |
| Reports | Stock on hand, best sellers, cost of goods sold |

For a business that buys finished products and sells them, that is a complete inventory system.

## Does QuickBooks Online now have manufacturing inventory?

Not in the sense of building products. Intuit's [pricing page](https://quickbooks.intuit.com/pricing/) now lists
"Manufacturing inventory" as an industry fit, described as knowing "what's on hand and what it's worth, with FIFO
costing and reorder points": the same quantity and valuation features above. Bills of materials, builds and
manufacturing orders are Intuit Enterprise Suite features, not QuickBooks Online ones (see
[does QuickBooks work for manufacturing](/manufacturing/quickbooks-for-manufacturing)).

## FIFO or average cost: which should you choose, and can you change it later?

Choose once, with your accountant: Intuit's [valuation help](https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-management/fifo-used-inventory-cost-accounting/L1x3hkunE_US_en_US)
says the method can't be changed later, and an item created before you choose defaults to FIFO. With made-up
figures: buy 100 bars at $4.20, then 100 at $4.55, and sell 120.

| | FIFO | Moving average |
|---|---:|---:|
| Cost of goods sold | $511.00 (100 × $4.20 + 20 × $4.55) | $525.00 (120 × $4.375) |
| Stock left (80 bars) | $364.00 | $350.00 |

When prices rise, FIFO shows lower cost and higher stock value; the difference reverses as old stock runs out.

## Can QuickBooks Online track stock by warehouse, bin, lot or serial number?

No. Intuit documents lot and serial numbers, expiry dates and bin locations for QuickBooks Desktop Enterprise with
[Advanced Inventory](https://quickbooks.intuit.com/desktop/enterprise/advanced-inventory/) (three levels of location,
such as row, shelf and bin), not for Online. QuickBooks Online's "locations" are for splitting the accounts, not the
stock. On Intuit's community the usual workarounds are a separate item per location, or serials in item names,
which one Intuit community answer calls tedious.

## Can QuickBooks Online set stock aside for a job or an order?

No: quantity on hand tells you what's on the shelf, not what is already promised. Without a
[stock reservation](/systems/stock-reservation), two jobs can plan on the same bar stock and the second finds out on
the floor. With made-up figures: 500 ft of bar on hand, job A needs 300 ft, job B needs 300 ft. QuickBooks shows 500
available to both, and job B is 100 ft short the day it reaches the saw. (Intuit Enterprise Suite does reserve
components once a manufacturing order is planned.)

## Where does work in progress go in QuickBooks Online?

Nowhere as a stage of its own. Material issued to a job isn't stock on the shelf any more, but it isn't a finished
part yet either; QuickBooks Online has no [work in progress](/systems/work-in-progress), so material sits in stock
until someone adjusts it. Counts also arrive late: stock changes when someone enters a transaction, so material taken
on the floor and entered at week's end leaves the number wrong all week.

## What changes when you add a stock layer beside QuickBooks?

You keep QuickBooks for the books and keep stock movements in an operations system, which sends QuickBooks the
accounting result:

| In the stock layer | In QuickBooks |
|---|---|
| Every receipt, issue to a job, return, transfer and count, scanned as it happens | Purchase bills and the inventory asset value |
| Raw, in-progress and finished quantities per item and location | Cost of goods sold when invoiced |
| Material reserved against each job, oldest stock first | Nothing: reservations aren't accounting |
| Lots, heat numbers or serials, and which job used them | Nothing |

The [QR inventory and order reservations](/services/inventory-and-reservations) system we built for an electronic
components trader works this way: whole reels reserved per customer order line, two stores, scanning in and out, with
a manager's override needed to ship reserved stock elsewhere ([how the reels and boxes work](/notes/reels-boxes-and-two-stores)).
The US build of that system is open as a live demo with sample logins. It tracks stock by store, not by bin, and a
batch is a free-text label rather than a lot field.

## When should a manufacturer stay on QuickBooks Online inventory?

When you resell more than you make, have one location, and can count everything in an afternoon. Add a stock layer
when material is issued to jobs, when two jobs compete for the same stock, when you need lot or heat traceability, or
when the shelf and the books disagree every month. For costing those jobs, see
[job costing in QuickBooks](/manufacturing/quickbooks-job-costing); for counting and lots in a warehouse,
[inventory control for distributors](/manufacturing/distributor-inventory-control).
