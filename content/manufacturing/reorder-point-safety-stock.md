---
kind: manufacturing
slug: reorder-point-safety-stock
group: inventory
title: "Reorder point and safety stock: formulas with examples"
related:
  - /manufacturing/distributor-inventory-control
  - /manufacturing/quickbooks-online-inventory
  - /services/inventory-and-reservations
  - /systems/mrp
  - /systems/stock-reservation
question: "How do you calculate a reorder point and safety stock?"
answer: >
  Reorder point = average daily usage × lead time in days + safety stock. A simple safety stock is (maximum daily
  usage × maximum lead time) − (average daily usage × average lead time); a statistical one is a service-level factor
  (z) × the standard deviation of demand × √lead time. Use available stock (on hand plus on order minus reserved) to
  decide when to reorder.
description: "Reorder point and safety stock formulas with worked numbers: max-minus-average, the service-level method, and reordering on available stock."
domain: [manufacturing, inventory, distribution]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
---

## What is a reorder point?

The stock level at which you place the next purchase order, so the new stock arrives before you run out. It covers
what you will use while you wait for the order, plus a cushion (safety stock) for the days when use is higher or the
supplier is late:

**Reorder point = average daily usage × lead time (days) + safety stock**

## How do you calculate safety stock?

Two common methods. The first needs only your history's highs:

**Safety stock = (maximum daily usage × maximum lead time) − (average daily usage × average lead time)**

The second sets a service level, the share of order cycles you want to get through without a stockout, and uses
the variation in demand:

**Safety stock = z × σ(daily demand) × √(lead time in days)**

| Service level | z |
|---|---|
| 90% | 1.28 |
| 95% | 1.65 |
| 98% | 2.05 |
| 99% | 2.33 |

When lead time varies too, a fuller version adds it:
**z × √(lead time × σ(demand)² + average demand² × σ(lead time)²)**.

## Can you show a worked example?

A distributor sells a connector:

| Input | Value |
|---|---|
| Average daily usage | 40 pieces |
| Maximum daily usage | 60 pieces |
| Average lead time | 10 days |
| Maximum lead time | 14 days |
| Standard deviation of daily demand | 12 pieces |

Max-minus-average safety stock: 60 × 14 − 40 × 10 = 840 − 400 = **440 pieces**. Reorder point: 40 × 10 + 440 =
**840 pieces**.

Service-level safety stock at 95%: 1.65 × 12 × √10 = 1.65 × 12 × 3.162 = **62.6, so 63 pieces**. Reorder point:
400 + 63 = **463 pieces**.

The gap between 440 and 63 is the point: the max-minus-average method assumes the worst day and the worst lead time
happen together, which ties up a lot of cash. Use it for parts where a stockout stops a line; use the service-level
method for the rest, with a higher service level for your A items.

## What stock level should the reorder point be compared with?

Available stock, not on-hand: **on hand + on order − reserved for customer orders**. A bin with 900 pieces looks safe
against an 840 reorder point, but if 500 are already reserved for an order shipping Friday, only 400 are available
and you are late ordering. A system that reserves stock against orders gets this right automatically; see
[stock reservation](/systems/stock-reservation).

## Which items should get which service level?

Rank items by annual value (usage × cost), the ABC method, and give each class a target:

| Class | Typical share | Service level | Why |
|---|---|---|---|
| A | The top 10 to 20% of items, most of the value | 95% to 98%, reviewed monthly | Stockouts cost sales; cash tied up is large, so watch closely |
| B | The next 30% | 95% | Steady items, reviewed quarterly |
| C | The long tail | 90% or a simple min-max | Little value; don't spend time on them |

Override the class for items that stop a line or a key customer's order, whatever their value.

## What is a min-max system?

A simpler cousin of the reorder point: when stock falls to the minimum, order up to the maximum. The minimum is the
reorder point; the maximum is the minimum plus the order quantity. It suits C items and bins replenished by sight,
and it is what most small shops already do on paper.

## What breaks reorder points in practice?

- Stock records that are wrong, so the system thinks there are 900 when there are 400; fix counts first, with
  [cycle counting](/manufacturing/distributor-inventory-control).
- Lead times that are quoted, not measured; use the dates on your own receipts.
- Reservations not subtracted, so promised stock looks available.
- Points set once and never recalculated after demand changes.
- One supplier with a long minimum order, which overrides every calculation; treat that item separately.

## How much should you order when you hit the reorder point?

Enough to cover demand until the next order cycle, rounded to the supplier's minimum and pack size (a full reel, a
case). The economic order quantity, √(2 × annual demand × cost per order ÷ annual holding cost per unit), is a
starting point when ordering costs are real; for most distributors the supplier's price breaks and pack sizes
decide it.

## How often should reorder points be recalculated?

Monthly or quarterly for fast movers, from the last 3 to 12 months of usage, and whenever a supplier's lead time
changes. Seasonal items need the season's usage, not the annual average. Items with lumpy demand (a few large
orders) are better ordered against open sales orders and forecasts than a reorder point; that is what
[MRP](/systems/mrp) is for.

## Can QuickBooks do this?

QuickBooks keeps a reorder point per item and lists items below it, but it compares on-hand quantity with a number
you type in; it doesn't compute safety stock or subtract reservations. See
[QuickBooks Online inventory](/manufacturing/quickbooks-online-inventory). A stock system that reserves against
orders and keeps usage history can calculate the reorder point per item and show what to buy each morning. See
[distributor inventory control](/manufacturing/distributor-inventory-control) and
[inventory and reservations](/services/inventory-and-reservations).
