---
title: Inventory software for electronic component distributors
metaTitle: Electronic component inventory software for distributors
audience: Electronic component distributors, brokers and importers in the US and Canada
answer: >
  Ahrom Labs builds the stock and order system a component distributor runs on: every reel and box numbered with a
  QR label, stock held in two stores, whole reels reserved for each customer's purchase order line, shipments scanned
  and checked against that PO before they can leave, staff entries approved by a manager, a customer portal, and
  invoices, payments and vendor bills sent to QuickBooks Online. It was built for an electronic components importer
  in India; the US version runs as a live demo on a sample company.
description: >
  Reel-level inventory for electronic component distributors: QR labels, two stores, PO-checked dispatch,
  reservations, a customer portal and QuickBooks Online.
demo:
  url: https://electronics-erp-us.ahromlabs.com/demo
  label: Try the live demo
services: [inventory-and-reservations, custom-erp-crm, sales-crm, customer-portal, document-extraction, custom-ai-assistant]
notes:
  - reels-boxes-and-two-stores
  - customer-portal-one-order-every-department
patterns:
  - failures-flagged-not-lost
  - replay-queued-payload-through-existing-handler
  - self-healing-sequence-counters
  - derive-balances-dont-store-them
flow:
  - step: Customer PO
    detail: The customer's purchase order is entered against the customer, line by line, with its expected dispatch dates.
  - step: Reserve
    detail: Whole reels in the main store are set aside for each PO line, oldest stock first.
  - step: Shortfall
    detail: What the open lines still need is pooled by item on a "To procure" list; staff turn it into a procurement order.
  - step: Receive and label
    detail: Reels arrive into boxes at the item's standard pack quantity, each reel and box with its own QR label; reels received against a procurement order go to the waiting PO lines first.
  - step: Move between stores
    detail: A reel or a whole box transfers between the main store and the partner store; reserved reels can't be moved.
  - step: Dispatch
    detail: Reels are scanned into a shipment and compared with the customer's PO line by line before it can be submitted.
  - step: Approve
    detail: Staff receipts, dispatches and transfers wait for a manager; the partner store signs off each day's dispatches.
  - step: Invoice and QuickBooks
    detail: Sales invoices, receipts, vendor bills and bill payments go to QuickBooks Online, which works out the sales tax.
evidence:
  - metric: Demo logins
    value: 6 (owner, manager, store staff, partner store manager and worker, customer)
  - metric: Shipments checked against the customer's PO
    value: Every line, before the shipment can be submitted
  - metric: QuickBooks Online (sandbox company)
    value: Sales invoices, receipts, vendor bills and bill payments
  - metric: Reels moved to the two-store model at the client in India
    value: 5,256, none lost
updated: 2026-11-07
---

## Can I try it before talking to anyone?

Yes. A live demo runs at [electronics-erp-us.ahromlabs.com](https://electronics-erp-us.ahromlabs.com/demo) with a
made-up distributor, Acme Components, its Main Store and a Partner Store, customers such as Brightline Appliances and
Voltix Motors, and about four months of history: purchase orders complete, part-shipped and in procurement, requests
waiting for approval, and invoices in QuickBooks. Leave a name and email, pick one of six logins (owner, manager, store
staff, partner store manager or worker, or the customer portal) and use the real screens in dollars and US dates.
Uploads and settings changes are switched off, the assistant Ohm AI takes two questions per visitor, and the data
resets every night.

## Why track reels instead of quantities?

Because customers order pieces and stores ship reels. Knowing each reel tells you which ones fill an order and what is
left on a part-used one. Receiving an item creates its reels at the item's standard pack quantity (2,500 for an
LM358DR op-amp in the demo) and spreads them across boxes; a reel ships whole or in part, and a part shipment reduces
that reel's quantity and leaves it in stock.

## How is every reel labelled and found again?

With a QR label on every reel and every box, printed when the stock is received: reel labels carry the item, quantity
and batch, box labels list the reels inside. One search box finds a reel by its number, item, box, customer or
invoice, with its dispatch history, and exports to CSV exactly as filtered. Reel and box numbers are rechecked against
the data before each one is issued, so a manual edit can't make two reels share a number.

## Can a shipment be checked against the customer's PO before it leaves?

Yes: it can't be submitted until the two agree. Reels are scanned into a shipment with a phone camera or a scanner;
scanning a box adds only the reels in it that can ship and lists the rest with the reason, and a reel scanned twice
is refused. Once the customer's PO is picked, the shipment is compared with it line by line (an item missing, short,
over, or not on the order), and the packing list is printed from the same shipment.

## How is stock reserved for a customer's order?

Whole reels in the main store are set aside for each PO line, oldest stock first, until the line is covered. A
reserved reel scanned for a different order shows "Reserved · PO …", and shipping it needs a manager's override. A
worked example with made-up quantities: a PO line for 12,000 LM358DR reserves five reels of 2,500 (12,500, so the last
reel overshoots). The shipment takes four full reels and 2,000 pieces from the fifth, which stays in stock with 500.

## What happens when stock is short?

The shortfall goes on a list for purchasing. What open PO lines still need is pooled by item under "To procure";
staff pick items into a draft procurement order and track it through its stages. When the reels arrive and are
received against that order, they are reserved to the waiting PO lines first, earliest dispatch date first, and the
order closes when everything has arrived.

## How is stock kept straight across two stores or a partner warehouse?

Every reel belongs to a store, and stock moves between stores only by transfer: one reel, or a whole box (all its
reels or none). Partner store staff are locked to their store on the server, and each day their manager signs off the
previous day's dispatches before anyone there can record new movements. A dispatch always records the store the reel
is actually in, not the one picked on screen.

## Who approves stock movements?

A manager. Store staff record receipts, dispatches and transfers, and those wait for approval; a manager can approve,
reject with a reason, or correct and approve in one step, and managers' own entries go through at once. An approved
request runs through exactly the same code as a direct entry, so it can't behave differently.

## Can customers see their own orders?

Yes, in a read-only portal. The customer login in the demo (Brightline) sees its own purchase orders, each line's
status (reserved, in procurement, shipped) and a progress bar, plus a stock view; it sees no other customer, no
supplier and no cost.

## Does it work with QuickBooks Online?

Yes, in the demo against an Intuit sandbox company. The owner connects QuickBooks once and maps seven accounts (bank,
receivables, payables, sales, inventory, purchases, freight). Sales invoices go to QuickBooks with their customer,
each line marked taxable or not, and QuickBooks' automated sales tax works the tax out; receipts, approved vendor
bills and bill payments go too. Each row shows whether it is in QuickBooks, failed with a Retry, or not sent. Credit
notes aren't sent yet, and an invoice edited after sending isn't sent again. More in
[connecting QuickBooks Online to a shop system](/manufacturing/quickbooks-integration).

## What should a component distributor ask before choosing inventory software?

1. **Does it track reels, or only item totals?** Part reels, boxes and labels are where component stock goes wrong.
2. **Is a shipment checked against the customer's PO before it leaves**, not after the complaint?
3. **Can stock be reserved for a customer's order**, so two orders can't count on the same reels?
4. **How does it work with QuickBooks**, and what happens when a post fails?
5. **Who can see and change what?** Staff, managers, a partner store, a customer, each enforced by the server, not
   just hidden on screen.

For counting, lots and FIFO in a warehouse, see [inventory control for distributors](/manufacturing/distributor-inventory-control).

## Boundary

The system was built for an electronic components importer in India and runs that business every day; this North
American version is the same code with dollars, US dates and QuickBooks Online, shown on a sample company. It has not
yet been used by a US or Canadian distributor. Stock is located by store, not by bin; manufacturer part numbers, date
codes and moisture-sensitivity floor life aren't separate fields, and a batch is a free-text label. Sales tax is one
rate per line, worked out by QuickBooks when connected; the system doesn't hold customers' resale certificates or
report sales by state (see [resale certificates](/sales-tax/resale-certificates)), and we'd build those for a
distributor that needs them. The figure of 5,256 reels is the client's in India.
