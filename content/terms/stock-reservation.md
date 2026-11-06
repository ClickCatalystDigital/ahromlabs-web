---
kind: term
slug: stock-reservation
title: "Stock reservation"
answer: >
  Setting physical stock aside against a specific customer order line, so the same unit can't be promised to two customers.
domain: [operations]
order: 5
published: 2026-10-25
updated: 2026-11-07
---

It matters because without it the same unit is promised to two customers and the second finds out at dispatch. Reservations work at the level stock is shipped: a reel, a box, a plate, not a total. In the LS Technologies system, whole reels are reserved per customer PO line, oldest first, and shipping a reserved reel elsewhere needs a manager's override.

See the [reservation requirement](/erp/requirements#stores-reservations), [QR inventory and order reservations](/services/inventory-and-reservations) and [ERP for trading and distribution](/erp/trading-distribution). Accounting software usually has no reservations: see [QuickBooks Online inventory for manufacturers](/manufacturing/quickbooks-online-inventory).
