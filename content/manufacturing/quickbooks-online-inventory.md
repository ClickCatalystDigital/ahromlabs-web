---
kind: manufacturing
slug: quickbooks-online-inventory
group: quickbooks
title: "QuickBooks Online inventory: what it tracks and where manufacturers outgrow it"
question: "Is QuickBooks Online inventory management enough for a manufacturer?"
answer: >
  QuickBooks Online Plus and Advanced track how many of each item you have, what it's worth (FIFO or moving
  average cost, chosen once), what's on order and when to reorder. That covers a reseller. A manufacturer
  usually also needs raw material, work in progress and finished parts kept apart, material set aside for each
  job, and stock by location or lot, which QuickBooks Online's inventory doesn't describe. That is the point to
  add a stock layer beside it.
description: "QuickBooks Online inventory for manufacturers: plans, FIFO or average cost, reorder points, and the gaps: WIP, job reservations, locations, lots and BOMs."
domain: [manufacturing, quickbooks, inventory]
published: 2026-11-02
updated: 2026-11-02
checked: 2026-11-02
sources:
  - title: Set up and track your inventory in QuickBooks Online
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-management/set-track-inventory-quickbooks-online/L22FZLBGN_US_en_US
    date: 2026-06-17
  - title: Inventory valuation methods for cost accounting
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-management/fifo-used-inventory-cost-accounting/L1x3hkunE_US_en_US
    date: 2026-08-14
  - title: Get started with manufacturing orders and assemblies
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/sales-orders/learn-manufacturing-orders-assemblies/L7ffspckB_US_en_US
    date: 2026-08-03
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
  - reg: Intuit help, manufacturing orders and assemblies (plan downgrades)
    doc: intuit-mo
    quote: "Manufacturing features are currently available in Intuit Enterprise Suite."
---

## What QuickBooks Online inventory does

From Intuit's help pages, checked on 2 November 2026:

| Feature | QuickBooks Online |
|---|---|
| Plans | Plus and Advanced; Simple Start and Essentials can buy an inventory add-on or upgrade |
| Quantity on hand | Goes down with each invoice or sales receipt, up with each receipt from a vendor |
| Reordering | Reorder points and low-stock alerts; purchase orders and what's still on order |
| Valuation | FIFO or moving average cost (MAC), chosen once: it can't be changed later, and an item created before choosing defaults to FIFO |
| Item types | Inventory, non-inventory (tracked as cost, not quantity), service, and bundles that group items on a sales form |
| Reports | Stock on hand, best sellers, cost of goods sold |

For a business that buys finished products and sells them, that is a complete inventory system.

## Where a manufacturer runs out of room

A manufacturer's stock moves through stages QuickBooks Online doesn't model:

- **No raw, in-progress and finished stages.** Material issued to a job isn't stock on the shelf any more, but it isn't a finished part yet either. QuickBooks Online has no [work in progress](/systems/work-in-progress); material sits in stock until someone adjusts it.
- **No bills of materials or builds.** Turning components into a finished part is an Intuit Enterprise Suite feature, not a QuickBooks Online one. See [does QuickBooks work for manufacturing](/manufacturing/quickbooks-for-manufacturing).
- **No material set aside per job.** Quantity on hand tells you what's on the shelf, not what is already promised. Without a [stock reservation](/systems/stock-reservation), two jobs can plan on the same bar stock and the second finds out on the floor.
- **One pool of stock.** Intuit's inventory setup article doesn't describe warehouses, bins, lots or serial numbers. On Intuit's community the usual workarounds are a separate item per location or location codes in item names, which multiplies the item list.
- **Counts arrive late.** Stock changes when someone enters a transaction. Material taken on the floor and entered at week's end means the number is wrong all week.

## What changes when you add a stock layer

The usual fix is not to leave QuickBooks but to keep stock movements in an operations system and send QuickBooks the accounting result:

| In the stock layer | In QuickBooks |
|---|---|
| Every receipt, issue to a job, return, transfer and count, scanned as it happens | Purchase bills and the inventory asset value |
| Raw, in-progress and finished quantities per item and location | Cost of goods sold when invoiced |
| Material reserved against each job, oldest stock first | Nothing: reservations aren't accounting |
| Lots, heat numbers or serials, and which job used them | Nothing |

The [QR inventory and order reservations](/services/inventory-and-reservations) system we built for an electronic components trader works this way: whole reels reserved per customer order line, two stores, scanning in and out, with a manager's override needed to ship reserved stock elsewhere ([how the reels and boxes work](/notes/reels-boxes-and-two-stores)). The US build of that system is open as a live demo with sample logins.

## When to stay, when to move

Stay on QuickBooks Online inventory if you resell more than you make, have one location, and can count everything in an afternoon. Add a stock layer when material is issued to jobs, when two jobs compete for the same stock, when you need lot or heat traceability, or when the shelf and the books disagree every month. For costing those jobs, see [job costing in QuickBooks](/manufacturing/quickbooks-job-costing).
