---
kind: manufacturing
slug: electronic-component-inventory
group: inventory
title: "Electronic component inventory: reels, date codes and MSL"
related:
  - /industries/electronics-component-trading
  - /services/inventory-and-reservations
  - /notes/reels-boxes-and-two-stores
  - /systems/stock-reservation
  - /manufacturing/distributor-inventory-control
  - /manufacturing/excess-and-obsolete-inventory
question: "How should a distributor or contract manufacturer track electronic component inventory?"
answer: >
  By the package it ships in, not just a part number and a count: each reel, tray, tube or cut tape with its own
  label, quantity, manufacturer lot and date code, moisture sensitivity level and open time, and location. Stock is
  reserved per customer order, partial reels go back with their real count, and every reel traces to the supplier
  it came from.
description: "Tracking electronic components by reel, tray and cut tape: date codes, lots, MSL floor life, partial reels, reservations, kitting and traceability."
domain: [manufacturing, inventory, electronics]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
sources:
  - title: "IPC/JEDEC J-STD-033, Handling, Packing, Shipping and Use of Moisture/Reflow Sensitive Surface Mount Devices"
    publisher: IPC and JEDEC (JEDEC's announcement of the standard; the standard itself is a free download with a JEDEC login)
    url: https://www.jedec.org/news/pressreleases/non-ic-electronic-components-covered-latest-update-jedec-and-ipc-quality-and-reli
    date: 2026-11-14
  - title: "DFARS 252.246-7008, Sources of Electronic Parts"
    publisher: eCFR, Title 48
    url: https://www.ecfr.gov/current/title-48/chapter-2/subchapter-H/part-252/subpart-252.2/section-252.246-7008
    date: 2026-11-14
checks:
  - reg: DFARS 252.246-7008(c)(1)
    doc: dfars-7008
    quote: "Have risk-based processes (taking into consideration the consequences of failure of an electronic part) that enable tracking of electronic parts from the original manufacturer to product acceptance by the Government"
---

## Why track reels instead of quantities?

Because a part number with a total quantity can't tell you which physical package to pick, how many parts are really
on it, or whether it is still usable. A component distributor or contract manufacturer holds the same part as full
reels, partial reels, cut tape, trays and tubes, often from several manufacturer lots and date codes. Each package is
a unit of stock with its own label, quantity and history. Track at that level, and the total is just the sum.

| What to record per package | Why |
|---|---|
| Package ID (your label) and type: reel, cut tape, tray, tube, bulk | The thing scanned at every move |
| Manufacturer part number and manufacturer | The same part number from two makers is two items for many customers |
| Quantity, updated on every issue | Partial reels are where counts go wrong |
| Manufacturer lot and date code | Customers set date code limits; recalls are by lot |
| Supplier and purchase order | Traceability back to the source |
| Moisture sensitivity level and when the bag was opened | Floor life (below) |
| Country of origin, RoHS and export data where needed | Customer and customs paperwork |
| Location: store, rack, bin | Found in one scan |

## What are date codes and why do customers limit them?

A date code is the manufacturer's code for when the part was made, usually year and week (for example 2547 for week
47 of 2025). Many buyers accept only parts within a set age, often two or three years, because solderability and
moisture exposure get worse in storage. The system should store the date code per package, warn when a pick would
break a customer's date code rule, and pick the oldest acceptable stock first.

## What is MSL and floor life?

Moisture sensitivity level (MSL) says how long a plastic surface-mount part may be out of its dry pack before it
absorbs enough moisture to crack during reflow soldering. The levels are defined in IPC/JEDEC J-STD-033: MSL 1 is
not moisture sensitive at normal shop conditions, and the floor life shortens as the level rises (MSL 3 is one week,
168 hours, at 30 °C and 60% relative humidity), up to MSL 6, which must be baked before use. Track per reel:

- the MSL from the label on the moisture barrier bag;
- when the bag was opened, and the hours used since;
- dry cabinet or re-bag time, which pauses or resets the clock as J-STD-033 allows;
- a block on issuing a reel past its floor life until it is baked, with the bake recorded.

## How are partial reels and cut tape handled?

When a reel goes to the line or a cut is sold, issue the real quantity and return the remainder with its new count,
on the same package ID. Counting a partial reel by weight or with a reel counter is faster than trusting the
issue history. Cut tape cut from a reel inherits the reel's lot, date code and MSL clock; give it its own label.

## How is stock reserved for customer orders?

Against the order line, down to the package: a reservation holds a specific reel or quantity, so the same parts
can't be promised twice, and shortages show as soon as an order is entered. When a reel is short, the system should
suggest a combination of partial reels or a backorder, and keep the customer's date code and lot rules while doing
it. See [stock reservation](/systems/stock-reservation).

## What is kitting?

Picking every component for one build (a kit) against the bill of materials before the job goes to the line. The
kit list comes from the BOM times the build quantity plus attrition (spare parts for the pick-and-place machine's
losses); each package issued to the kit is scanned, and leftovers come back as partial reels with their counts. Kits
short of a part should be visible before the build date, not on the line.

## How do you prove where a part came from?

Keep the supplier and purchase order on every package, with the supplier's certificate of conformance and the
manufacturer's lot. Defense work makes this a contract requirement: DFARS 252.246-7008 requires contractors that are
not the original manufacturer or its authorized supplier to have risk-based processes "that enable tracking of
electronic parts from the original manufacturer to product acceptance by the Government". Commercial customers
increasingly ask for the same. See [counterfeit electronic parts](/manufacturing/counterfeit-electronic-parts).

## How do you count reels without unreeling them?

By weight or by a reel counter. Weighing works when the empty reel weight and the weight per part are known for that
part number; an X-ray reel counter counts the parts directly and is accurate for small parts where weight is
unreliable. Either way, record the count on the package ID with the date, and treat a count that differs from the
system by more than a set tolerance as a variance to investigate, not a number to overwrite.

## What should electronic component inventory software do?

Label every package and scan every move; keep lot, date code and MSL per package; reserve against orders; track
partial reels; kit against a BOM; and answer "which customers got parts from this lot" in one search. Our electronics
inventory system does this for a component trading company (reel-level labels, reservations, scanning across two
stores and approvals for stock movements), and a US demo runs on sample data. See
[inventory software for electronic component distributors](/industries/electronics-component-trading) and
[distributor inventory control](/manufacturing/distributor-inventory-control).
