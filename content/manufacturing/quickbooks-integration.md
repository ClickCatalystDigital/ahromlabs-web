---
kind: manufacturing
slug: quickbooks-integration
group: quickbooks
title: "Connecting QuickBooks Online to a shop or ERP system"
question: "How should a custom shop system connect to QuickBooks Online?"
answer: >
  Decide which system owns each record first: usually the shop system owns jobs, items and stock, and QuickBooks
  owns the ledger, payments and bank. Then sync customers, items, invoices, bills and payments through Intuit's API
  with OAuth 2.0, use webhooks for changes and change data capture (30 days back) as the safety net, and log every
  failed sync for a person to fix.
description: "How a custom system connects to QuickBooks Online: what syncs, which side owns each record, webhooks and change data capture, and Intuit's app review."
domain: [manufacturing, quickbooks, integration]
published: 2026-11-03
updated: 2026-11-03
checked: 2026-11-03
sources:
  - title: Webhooks and configure webhooks
    publisher: Intuit Developer
    url: https://developer.intuit.com/app/developer/qbo/docs/develop/webhooks/configure-webhooks
    date: "2026-11-03"
  - title: Change data capture operation
    publisher: Intuit Developer
    url: https://developer.intuit.com/app/developer/qbo/docs/learn/explore-the-quickbooks-online-api/change-data-capture
    date: "2026-11-03"
  - title: Publish your app
    publisher: Intuit Developer
    url: https://developer.intuit.com/app/developer/qbo/docs/go-live/publish-app
    date: "2026-11-03"
  - title: What to expect during the app review process
    publisher: Intuit Developer
    url: https://developer.intuit.com/app/developer/qbo/docs/go-live/list-on-the-app-store/what-to-expect-during-the-review
    date: "2026-11-03"
checks:
  - reg: Intuit Developer, configure webhooks
    doc: intuit-dev
    quote: "Even if webhooks are active, you'll only receive change notifications for QuickBooks Online companies that are connected and authorized via OAuth 2.0."
  - reg: Intuit Developer, configure webhooks
    doc: intuit-dev
    quote: "Use verifier tokens to validate the webhook notifications from the callback are from Intuit."
  - reg: Intuit Developer, change data capture
    doc: intuit-dev
    quote: "CDC operations can track changes within the last 30 days."
  - reg: Intuit Developer, change data capture
    doc: intuit-dev
    quote: "Server responses can handle a maximum of 1,000 objects."
  - reg: Intuit Developer, publish your app
    doc: intuit-dev
    quote: "The Show Credentials switch appears only after the App Assessment Questionnaire is approved."
  - reg: Intuit Developer, publish your app
    doc: intuit-dev
    quote: "If you want to use your app privately, it's now live and functional."
  - reg: Intuit Developer, app review
    doc: intuit-dev
    quote: "When you list your app on the QuickBooks App Store, it needs to pass a three-part review."
  - reg: Intuit Developer, app review
    doc: intuit-dev
    quote: "Intuit reviews all published apps on an annual basis, or more frequently at Intuit's discretion."
---

## First: which system owns each record?

Most failed integrations fail here: both systems let people edit the same thing, and the sync can't tell which
change wins. Decide the owner of every record before writing any code:

| Record | Usual owner | Direction |
|---|---|---|
| Customers and vendors | Shop system (sales and purchasing create them) | Shop → QuickBooks |
| Items | Shop system (it knows stock, routings, lots) | Shop → QuickBooks |
| Invoices | Shop system (shipped against the order) | Shop → QuickBooks |
| Vendor bills | Either; usually entered where the purchase order lives | Shop → QuickBooks |
| Customer payments, deposits | QuickBooks (they arrive through the bank) | QuickBooks → shop |
| Chart of accounts, tax codes | QuickBooks (your accountant's) | Read by the shop system |

The owner is where people edit; the other side shows it read-only. A customer's address changed in QuickBooks is
then either sent back or overwritten, by a rule, not by chance.

## How the sync works

Intuit's API is used by an app that the company connects with OAuth 2.0. For changes made in QuickBooks:

- **Webhooks** notify your system when entities change, for companies connected and authorized through OAuth 2.0.
  Each notification should be checked against the verifier token Intuit gives, so a forged call is rejected.
- **Change data capture (CDC)** returns everything that changed since a time, up to 30 days back and up to 1,000
  objects a response. Run it on a schedule as the safety net for any webhook that was missed.

For changes made in the shop system, it writes to QuickBooks when the event happens (an invoice is approved, a bill
is posted) and records QuickBooks' ID for the record, so a retry updates instead of duplicating.

## What goes wrong, and how to catch it

- **A post fails** (a closed period, a missing tax code, an item renamed in QuickBooks). It must be logged and shown
  to a person, never dropped silently. The pattern: [failures flagged, not lost](/patterns/failures-flagged-not-lost).
- **Totals drift.** Compare open invoices and item counts on both sides every night; a difference is a ticket.
- **Someone edits on the wrong side.** Make the non-owner side read-only where you can, and alert where you can't.

## Does a private connection need Intuit's review?

Two levels, from Intuit's developer docs. To get production credentials, an app's App Assessment Questionnaire must
be approved; after that, an app used privately is live. Listing on the QuickBooks App Store adds a three-part review
(technical, a third-party security review, and marketing), and Intuit reviews listed apps at least once a year.

Our own QuickBooks connector isn't live yet: we're planning one for a client's system. These pages describe how such a
connector should work, from Intuit's documentation. See also [QuickBooks vs ERP](/manufacturing/quickbooks-vs-erp)
and [QuickBooks Online inventory](/manufacturing/quickbooks-online-inventory).
