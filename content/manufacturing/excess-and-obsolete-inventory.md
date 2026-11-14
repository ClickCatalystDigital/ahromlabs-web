---
kind: manufacturing
slug: excess-and-obsolete-inventory
group: inventory
title: "Excess and obsolete inventory: finding it and valuing it"
metaTitle: "Excess and obsolete inventory (E&O): find it, value it"
related:
  - /manufacturing/distributor-inventory-control
  - /manufacturing/reorder-point-safety-stock
  - /services/inventory-and-reservations
  - /systems/stock-reservation
  - /manufacturing/quickbooks-online-inventory
question: "How do you identify and value excess and obsolete inventory?"
answer: >
  Excess is stock beyond what demand will use in a set period (often 12 months); obsolete is stock with no expected
  use at all. Find both by comparing each item's quantity with its usage and open orders, then write it down: for tax,
  IRS Publication 538 values goods you can't sell at normal prices at their bona fide selling price minus the direct
  cost of disposing of them, never below scrap.
description: "Excess and obsolete (E&O) inventory: finding it from usage and orders, write-downs under IRS Publication 538, and stopping it building up."
domain: [manufacturing, inventory, distribution]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
sources:
  - title: "Publication 538, Accounting Periods and Methods"
    publisher: Internal Revenue Service
    url: https://www.irs.gov/publications/p538
    date: "2026-11-03"
checks:
  - reg: IRS Publication 538, subnormal goods
    doc: irs-538
    quote: "You should value these goods at their bona fide selling price minus direct cost of disposition, no matter which method you use to value the rest of your inventory."
  - reg: IRS Publication 538, subnormal goods
    doc: irs-538
    quote: "Do not value them for less than scrap value."
  - reg: IRS Publication 538, lower of cost or market
    doc: irs-538
    quote: "Under the lower of cost or market method, compare the market value of each item on hand on the inventory date with its cost and use the lower of the two as its inventory value."
---

## What is excess and obsolete inventory?

**Excess** stock is more than demand will use within the period you choose, often 12 months: 5,000 pieces of a part
you use 1,000 a year leaves 4,000 in excess. **Obsolete** stock has no expected use at all: a discontinued product,
a part replaced by a new revision, a customer-specific item for a customer who left. Both tie up cash and space, and
both are worth less than the books say.

## How do you find it?

Item by item, compare quantity on hand with what will use it:

| Column | Source |
|---|---|
| Quantity on hand and its cost | Stock records |
| Usage in the last 12 months | Issues and sales history |
| Open sales orders and reservations | Order book |
| Forecast or BOM demand | Planning, for manufacturers |
| Months of supply | On hand ÷ average monthly usage |
| Last movement date | The last receipt or issue |
| Excess quantity | On hand − (12 months of usage + open demand), if positive |

An item with no movement in 12 months and no open demand is a candidate for obsolete. Sort the list by value, not
quantity: a few high-value items usually make up most of the money.

## How is it valued for tax?

The IRS treats stock you can't sell normally as "subnormal goods": goods unsalable at normal prices "because of
damage, imperfections, shop wear, changes of style, odd or broken lots, or other similar causes". Publication 538
says: "You should value these goods at their bona fide selling price minus direct cost of disposition, no matter
which method you use to value the rest of your inventory", and "Do not value them for less than scrap value." A
business on lower of cost or market compares each item's market value with its cost and uses "the lower of the two
as its inventory value". Have your CPA confirm the method you use; the write-down needs evidence such as actual
offers or sales at the lower price.

## How is it handled in the books?

Many businesses keep an inventory reserve (an allowance) for excess and obsolete stock, reviewed each quarter,
instead of writing down items one at a time, and write the item off when it is scrapped or sold. Under US GAAP,
inventory measured on FIFO or average cost is carried at the lower of cost and net realizable value; your accountant
sets the policy. The stock system's job is to produce the list and the evidence.

## Can you show an excess and obsolete report?

Made-up figures for four items, 12 months' usage as the window:

| Item | On hand | Unit cost | Value | 12-month usage | Open demand | Months of supply | Excess qty | Excess value | Last move |
|---|---|---|---|---|---|---|---|---|---|
| Relay K-12 | 6,000 | $1.40 | $8,400 | 1,200 | 300 | 60 | 4,500 | $6,300 | 3 months |
| Sensor S-9 | 220 | $38.00 | $8,360 | 0 | 0 | none | 220 | $8,360 | 19 months |
| Bracket B-4 | 900 | $2.10 | $1,890 | 2,400 | 600 | 4.5 | 0 | $0 | 1 week |
| Cable C-77 | 1,500 | $4.80 | $7,200 | 600 | 0 | 30 | 900 | $4,320 | 2 months |

Sensor S-9 is the obsolete candidate: no use, no orders, 19 months still. Relay K-12 and cable C-77 are excess: they
are used, but far more is on hand than a year needs. The report's total excess value is where the reserve discussion
starts.

## How do you set an inventory reserve?

A common approach is a policy by age and movement, reviewed every quarter: for example a share of the excess value
for items with more than a year's supply, a larger share for items with no movement in a year, and full value for
items confirmed obsolete. The percentages are a judgement your accountant signs off, based on what similar stock
has actually sold for. Document the policy and apply it the same way each quarter, so the reserve moves for reasons,
not moods.

## What do you do with it?

In order of value recovered: return it to the supplier (some allow stock rotation for authorized distributors),
sell it to the customer it was bought for, use it in another product, sell it to an excess-inventory buyer or broker,
and scrap it. Record each disposal against the item, so the reserve and the count stay right.

## How do you stop it building up?

Buy against demand, not habit. Set [reorder points](/manufacturing/reorder-point-safety-stock) from current usage
and recalculate them; buy customer-specific items against the customer's order or a signed commitment; watch
minimum order quantities that buy a year of stock to save a few cents; and run the excess and obsolete report every
quarter so items are dealt with while they still sell. A system that knows reservations, usage and last movement
per item can produce that report on demand. See [distributor inventory control](/manufacturing/distributor-inventory-control)
and [inventory and reservations](/services/inventory-and-reservations).
