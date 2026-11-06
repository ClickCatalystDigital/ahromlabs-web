---
kind: manufacturing
slug: erp-requirements-checklist
group: choosing
title: "ERP requirements checklist for US manufacturers (Excel)"
related:
  - /manufacturing/job-shop-erp
  - /sales-tax/resale-certificates
  - /services/custom-erp-crm
  - /systems/three-way-match
  - /manufacturing/quickbooks-integration
question: "What should an ERP requirements checklist for a US manufacturer or distributor include?"
answer: >
  Testable requirements, not feature names: for each area (quoting, purchasing, inventory, production, shipping,
  QuickBooks, sales tax, access, data ownership), what the system must do and what the vendor must show in the demo
  to prove it. Our free checklist has 28, 19 of them must-haves, as a spreadsheet you can send to every vendor and
  score side by side.
description: "A free ERP requirements checklist for US manufacturers and distributors: 28 testable requirements with what each vendor must show, as a CSV for Excel."
domain: [manufacturing, erp, choosing]
published: 2026-11-03
updated: 2026-11-07
checked: 2026-11-07
sources:
  - title: Intuit App Partner Program FAQ
    publisher: Intuit Developer
    url: https://developer.intuit.com/app/developer/qbo/docs/get-started/partner-faq
    date: "2026-11-06"
  - title: Set up and track your inventory in QuickBooks Online
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/learn-support/en-us/help-article/inventory-management/set-track-inventory-quickbooks-online/L22FZLBGN_US_en_US
    date: 2026-06-17
  - title: Exemptions
    publisher: Streamlined Sales Tax Governing Board
    url: https://www.streamlinedsalestax.org/for-businesses/exemptions
    date: "2026-11-05"
  - title: Remote Sellers
    publisher: Texas Comptroller of Public Accounts
    url: https://comptroller.texas.gov/taxes/sales/remote-sellers.php
    date: "2026-11-05"
checks:
  - reg: Intuit Developer, App Partner Program FAQ
    doc: intuit-partner
    quote: "Core API calls are unmetered and uncharged."
  - reg: Intuit Developer, App Partner Program FAQ
    doc: intuit-partner
    quote: "CorePlus API calls are metered and charges may apply."
  - reg: Intuit help, set up and track inventory in QuickBooks Online
    doc: intuit-qbo
    quote: "Inventory features are available only for QuickBooks Online Plus and Advanced."
  - reg: Streamlined Sales Tax Governing Board, Exemptions
    doc: sst-exemptions
    quote: "Purchasers should provide the completed exemption certificate to their supplier and keep a copy for their records."
  - reg: Texas Comptroller, Remote Sellers
    doc: tx-remote
    quote: "However, all sellers must keep required records of all marketplace sales for at least four years."
---

## Why should a checklist list tests instead of features?

Because every vendor says yes to "inventory management". The question that separates them is whether the system does what
your business needs, shown on your own data. So each line in the checklist has two parts: the requirement, in plain
words, and the test the vendor must run in the demo. A vendor that can't show it in the demo doesn't have it yet.

[Download the checklist for Excel (CSV)](/manufacturing/erp-requirements-checklist-us.csv). It opens in Excel or
Google Sheets; add a column per vendor and score Yes, Partly or No. Free to use under CC BY 4.0.

## What do the 28 requirements cover?

Ten areas, from quoting to leaving the vendor:

| Area | Requirements | Must-haves | What they test |
|---|---|---|---|
| Quoting and sales | 3 | 2 | Estimate revisions to order without retyping; order status for sales |
| Purchasing | 3 | 2 | Approved purchase requests; three-way match before paying a bill |
| Inventory | 5 | 3 | Stock by location and state; reservations; lots; cycle counts; valuation |
| Production | 4 | 3 | Routings on real capacity; time from the floor; scrap; job cost while open |
| Shipping | 2 | 1 | Ship only what's ready; partial shipments; documents and tracking |
| Accounting and QuickBooks | 2 | 2 | Posting once, with failures shown; which side owns each record |
| Sales tax | 3 | 2 | Rates from the ship-to address; certificates by state; sales by state |
| Access and audit | 2 | 2 | Roles that hide money; a change log that can't be turned off |
| Reporting | 1 | 0 | One owner's screen, each figure opening to its records |
| Data and ownership | 3 | 2 | Full export now; ownership and exit terms in writing; checked migration |

Each area has its own guide: [job shop ERP](/manufacturing/job-shop-erp) for the shop floor,
[inventory control for distributors](/manufacturing/distributor-inventory-control) for stock,
[connecting QuickBooks to a shop system](/manufacturing/quickbooks-integration) for the accounting link, and
[how an ERP should handle sales tax](/sales-tax/sales-tax-in-erp) for sales tax.

## How do you use the checklist with vendors?

Send it before the demo and score during it:

1. Delete the lines that don't apply to you, and mark which "Should" lines are must-haves for your business.
2. Send it to each vendor before the demo, and ask them to run the tests on a copy of your items and one real order.
3. Score during the demo, not after: Yes only if you saw it work.
4. Put the scores side by side, with price and the contract terms; see
   [choosing an ERP](/manufacturing/small-business-erp-options) and
   [custom vs off-the-shelf ERP](/manufacturing/custom-vs-off-the-shelf-erp).

## How do you score vendors with it?

Must-haves are pass or fail; the "should" lines break ties. A made-up example with 19 must-haves and 9 shoulds:

| Vendor | Must-haves passed | Shoulds passed | Result |
|---|---:|---:|---|
| A | 17 of 19 | 7 of 9 | Out: a missed must-have is a no, whatever the rest |
| B | 19 of 19 | 4 of 9 | In, weaker on reporting |
| C | 19 of 19 | 8 of 9 | In; compare with B on price and exit terms |

## Where do the QuickBooks and sales tax requirements come from?

From the rules your system has to live with. Intuit's
[App Partner Program](https://developer.intuit.com/app/developer/qbo/docs/get-started/partner-faq) makes writing to
QuickBooks Online free and reading from it metered, so a system that polls QuickBooks record by record can hit Intuit's
limits; ask how the vendor's link reads changes. QuickBooks Online tracks inventory only on Plus and Advanced. On sales
tax, the [Streamlined Sales Tax Governing Board](https://www.streamlinedsalestax.org/for-businesses/exemptions) has
buyers hand exemption certificates to the seller, who keeps them, so the certificate belongs on the customer record;
and Texas asks sellers to keep [marketplace sales records](https://comptroller.texas.gov/taxes/sales/remote-sellers.php)
for at least four years, so the export test matters for tax as well as for leaving.

## Which five tests rule out most systems?

These five, because most systems fail at least one:

- Reserve the last units of an item for one order, then try to issue them to another.
- Add a rush job and show which jobs go late.
- Make a QuickBooks post fail and show where the failure appears.
- Ship to a state where the customer has no exemption certificate.
- Export all open orders and the item list, now, without the vendor's help.

Indian manufacturers and traders: the [ERP requirements builder](/erp/check) covers GST, e-invoicing, Tally and the
other Indian rules.
