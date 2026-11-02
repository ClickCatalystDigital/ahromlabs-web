---
kind: manufacturing
slug: distributor-inventory-control
group: inventory
title: "Inventory control for distributors: counts, lots, FIFO, barcodes"
question: "What inventory control does a small US distributor need?"
answer: >
  Four things: cycle counts that check a few bins every day instead of one shutdown count a year; lot or serial
  numbers on what you receive and ship, so a recall finds the customers in minutes; a valuation method, usually
  FIFO, applied the same way every year; and barcodes scanned at receiving, picking and counting, so stock changes
  when goods move, not when someone types.
description: "Inventory control for US distributors: cycle counting, lot and serial traceability, FIFO valuation (IRS Publication 538), barcodes and GS1 numbers."
domain: [manufacturing, inventory, distribution]
published: 2026-11-03
updated: 2026-11-03
checked: 2026-11-03
sources:
  - title: "Publication 538, Accounting Periods and Methods"
    publisher: Internal Revenue Service
    url: https://www.irs.gov/publications/p538
    date: "2026-11-03"
  - title: How to get a UPC barcode
    publisher: GS1 US
    url: https://www.gs1us.org/upcs-barcodes-prefixes/how-to-get-a-upc-barcode
    date: "2026-11-03"
checks:
  - reg: IRS Publication 538, inventories (FIFO)
    doc: irs-538
    quote: "The FIFO (first-in first-out) method assumes the items you purchased or produced first are the first items you sold, consumed, or otherwise disposed of."
  - reg: GS1 US, How to get a UPC barcode
    doc: gs1-upc
    quote: "A GS1 Company Prefix allows businesses to get multiple barcodes at a single time, as well as identify locations, mixed cases, create coupons, and create higher levels of packaging like a case or pallet."
  - reg: GS1 US, How to get a UPC barcode
    doc: gs1-upc
    quote: "Barcodes from GS1 identify your company as the brand owner of that product, which is a valuable piece of information that retailers look for!"
---

## Cycle counting instead of one annual count

An annual physical count shuts the warehouse for a day or two and is wrong again within a week. Cycle counting
counts a small set of locations every day, so every item is counted several times a year and errors are found while
someone still remembers why.

| Class | Share of items (typical) | Count | Why |
|---|---|---|---|
| A | The few items that are most of the dollar value | Monthly or more | Errors here cost the most |
| B | The middle | Quarterly | |
| C | The many cheap items | Once or twice a year | Errors cost little |

Rules that keep counts honest:

- **Blind counts.** The counter sees the bin, not the expected quantity.
- **Count, then compare, then recount.** A difference over a set tolerance gets a second count by someone else
  before anything is adjusted.
- **Freeze only the bin, not the warehouse.** Movements into or out of the bin wait until the count is posted.
- **Every adjustment has a reason** (damaged, miscount, mis-pick, receiving error), so the cause can be fixed.

## Lot and serial traceability

A lot number ties a quantity to a batch from a supplier or a production run; a serial number ties one unit to its
own history. Record them at receiving and again at shipping, and a recall, a warranty claim or a customer's quality
question becomes a lookup: which customers got lot 24-117, and what else came from that supplier's batch.

What it takes: the lot or serial captured at receiving (scanned from the supplier's label where there is one),
stock held by lot in each location, picking that records which lot went into each order, and returns that come back
to the same lot. Material reserved for one order should be reserved by lot too; see
[QuickBooks Online inventory](/manufacturing/quickbooks-online-inventory) for where an accounting system stops.

## FIFO and other valuation methods

The IRS describes FIFO (first-in first-out) as assuming the items you bought or produced first are the first sold
or used. When prices are rising, FIFO gives a lower cost of goods sold and a higher closing inventory than LIFO.
Publication 538 also covers average cost, LIFO (which has its own rules and an election) and changing methods,
which needs IRS consent. Pick a method with your accountant and apply it the same way every year.

FIFO as a valuation method is not the same as picking the oldest stock first. A system should do both: value stock
by the method you chose, and suggest the oldest lot (or the soonest to expire) when picking.

## Barcodes and GS1 numbers

Barcodes on your own bins and locations need no registration: any internal code works. Barcodes on products you
sell to retailers are different: retailers expect GS1 numbers, which identify your company as the brand owner. GS1
US licenses either a single GTIN for a product or a GS1 Company Prefix that numbers many products, cases and
pallets; its site gives the current prices.

Scan at the moments stock moves: receiving against the purchase order, putaway to a bin, picking against the order,
packing, and counting. A scan that doesn't match (wrong item, wrong lot, over the ordered quantity) should stop the
person there, not show up in next month's count.

## What to look for in a system

- Locations and bins, with stock by lot or serial in each.
- Cycle count plans by ABC class, blind counts and adjustment reasons.
- Lot capture at receiving and picking, and a trace report both ways (supplier to customer, customer to supplier).
- Valuation by your chosen method, posted to the books (see [QuickBooks for manufacturing](/manufacturing/quickbooks-for-manufacturing)).
- Scanning on phones or handhelds at every movement.

For how the systems that do this compare, see [choosing an ERP](/manufacturing/small-business-erp-options), and for
building one to fit, [custom vs off-the-shelf ERP](/manufacturing/custom-vs-off-the-shelf-erp).
