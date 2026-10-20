---
kind: note
slug: reels-boxes-and-two-stores
title: Reels, boxes and two stores — stock you can scan and set aside for each order
description: How LS Technologies tracks every component reel by QR across two stores, and reserves stock for each customer order before it ships.
answer: >
  For LS Technologies, an electronic components trader, Ahrom Labs built an
  inventory system where every reel and box carries a QR label, stock moves by
  scanning from a phone, and staff entries wait for a manager's approval. Stock is
  held in two stores, the second at a partner's site, and whole reels are reserved
  against each customer order line before they ship. 5,256 live reels moved to the
  two-store model with none lost.
domain: [inventory, trading, workflow]
patterns: [derive-balances-dont-store-them]
evidence:
  - metric: unit of stock
    value: the reel (and the box it sits in), each with its own number and QR label, not a count per item
  - metric: how stock moves
    value: scan with a phone camera or scanner into a cart; inward, outward and store-to-store transfer
  - metric: staff entries
    value: queued for a manager to approve, edit or reject; managers' own entries go through at once
  - metric: live reels moved to two stores
    value: 5,256, every one checked after the change
  - metric: reservations
    value: whole reels set aside for a customer PO line, oldest stock first; a reserved reel can't ship to anyone else without a manager's override
  - metric: still to buy
    value: open order lines' shortfall pooled into a procurement order; goods received against it are reserved to waiting orders, earliest dispatch date first
published: 2026-10-20
updated: 2026-10-20
---

An electronics trader's stock isn't "500 of part X". It's reels, each holding a different quantity of one part, packed in boxes, sitting on shelves in more than one place. LS Technologies used to know roughly what it had. The system Ahrom Labs built for them knows each reel.

## Why track reels, not quantities?

Because customers order quantities, but the store ships reels. Two reels of the same part, one of 5,000 and one of 1,200, aren't interchangeable when an order needs 5,000. So each reel gets its own number and QR label when it's received, printed on the spot, and reels are grouped into boxes with their own labels. The quantity in stock is worked out from the reels, never kept as a separate number that could drift.

## How does stock move?

By scanning. On the Outward screen, a store hand scans reels or whole boxes with a phone camera or a scanner into a cart, picks the customer and their purchase order, and submits. The packing list prints from the same cart. Receiving and moving stock between stores work the same way. Part of a reel can ship and the rest stays in stock with its new quantity.

Staff entries don't change stock directly. They go to a manager, who approves, edits or rejects them; managers' own entries go through at once. Every entry can be undone by a manager, and an undo restores exactly that reel.

## What changed with a second store?

LS keeps stock at a partner's site too. Each reel now records which store it's in, every store-to-store move is logged reel by reel, and the screens filter by store. The change was made on the live database: 5,256 reels moved to the two-store model, every one checked afterwards.

The partner's own staff see only their store. Before they can record anything each day, their manager approves the previous day's outgoing summary, so the partner's movements are reviewed daily instead of line by line. Shipments from the partner store get a tax invoice in the same number series LS uses in Tally.

One real incident shaped the rules. A shipment was once recorded against the wrong store because a dropdown had been left on the other store. Now a shipment always takes the store the reel is actually in; the screen can't override it.

## How is stock kept for a customer?

A customer's purchase order line can reserve whole reels, oldest stock first, until the line is covered. A reserved reel shows as reserved when scanned, and shipping it to anyone else needs a manager's override. When stock doesn't cover the open orders, the shortfall is pooled by part into a procurement order, including imports, tracked through its own stages to Received. Reels received against it are reserved to the waiting orders automatically, earliest dispatch date first.

Customers see each line of their order as reserved, in procurement or dispatched, with a progress bar, through their own login, without seeing stock figures, suppliers or costs. A boiler manufacturer's [customer portal](/notes/customer-portal-one-order-every-department) works the same way, from its own records.

## Boundary

Reservations hold whole reels, so the last reel can cover more than the line needs. Stock in the partner store never counts as free stock for LS's own orders.
