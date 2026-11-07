---
kind: manufacturing
slug: quickbooks-integration
group: quickbooks
title: "Connecting QuickBooks Online to a shop or ERP system"
metaTitle: "QuickBooks Online integration for a shop or ERP system"
related:
  - /patterns/failures-flagged-not-lost
  - /sales-tax/sales-tax-in-erp
  - /industries/boiler-pressure-vessel-manufacturing
  - /construction/pay-applications
  - /manufacturing/quickbooks-vs-erp
question: "How should a custom shop system connect to QuickBooks Online?"
answer: >
  Decide which system owns each record first: usually the shop system owns jobs, items and stock, and QuickBooks
  owns the ledger, payments and bank. Then sync customers, items, invoices, bills and payments through Intuit's API
  with OAuth 2.0, use webhooks for changes and change data capture (30 days back) as the safety net, log every
  failed sync for a person to fix, and plan around Intuit's read limits: writing is free, reading is metered.
description: "How a shop system connects to QuickBooks Online: who owns each record, what syncs, Intuit's API read limits and fees since 2025, sales tax, and what we send."
domain: [manufacturing, quickbooks, integration]
published: 2026-11-03
updated: 2026-11-07
checked: 2026-11-06
sources:
  - title: Webhooks and configure webhooks
    publisher: Intuit Developer
    url: https://developer.intuit.com/app/developer/qbo/docs/develop/webhooks/configure-webhooks
    date: "2026-11-05"
  - title: Change data capture operation
    publisher: Intuit Developer
    url: https://developer.intuit.com/app/developer/qbo/docs/learn/explore-the-quickbooks-online-api/change-data-capture
    date: "2026-11-05"
  - title: Intuit App Partner Program FAQ
    publisher: Intuit Developer
    url: https://developer.intuit.com/app/developer/qbo/docs/get-started/partner-faq
    date: "2026-11-06"
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
  - reg: Intuit Developer, App Partner Program FAQ
    doc: intuit-partner
    quote: "The program launched in the US on July 28, 2025."
  - reg: Intuit Developer, App Partner Program FAQ
    doc: intuit-partner
    quote: "All apps are automatically enrolled in the Intuit App Partner Program at the Builder tier."
  - reg: Intuit Developer, App Partner Program FAQ
    doc: intuit-partner
    quote: "Core API calls are unmetered and uncharged."
  - reg: Intuit Developer, App Partner Program FAQ
    doc: intuit-partner
    quote: "the Builder tier will be limited to 500,000 CorePlus API credits per month. Any CorePlus API calls made above the included monthly credit will be blocked entirely."
  - reg: Intuit Developer, App Partner Program FAQ (App Marketplace listing)
    doc: intuit-partner
    quote: "To avoid a delisting, you must subscribe to Silver."
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

## Which system should own each record, QuickBooks or the shop system?

The shop system should own jobs, items and stock, and QuickBooks should own the ledger, the bank and the tax codes;
decide every record's owner before writing any code. Most failed integrations fail here: both systems let people
edit the same thing, and the sync can't tell which change wins.

| Record | Usual owner | Direction |
|---|---|---|
| Customers and vendors | Shop system (sales and purchasing create them) | Shop → QuickBooks |
| Items | Shop system (it knows stock, routings, lots) | Shop → QuickBooks |
| Invoices | Shop system (shipped against the order) | Shop → QuickBooks |
| Vendor bills | Either; usually entered where the purchase order lives | Shop → QuickBooks |
| Vendor payments | Wherever they are recorded against the bill | Shop → QuickBooks, or the reverse |
| Customer payments, deposits | Wherever they are recorded: QuickBooks if they come in through its bank feed, the shop system if staff mark invoices paid there | One direction only, never both |
| Chart of accounts, tax codes | QuickBooks (your accountant's) | Read by the shop system |

The owner is where people edit; the other side shows it read-only. A customer's address changed in QuickBooks is
then either sent back or overwritten, by a rule, not by chance.

## What can a shop system sync with QuickBooks Online?

Customers, vendors, items, invoices, payments, bills and bill payments, through an app that the company connects
once with OAuth 2.0. For changes made in the shop system, it writes to QuickBooks when the event happens (an invoice
is approved, a bill is posted) and records QuickBooks' ID for the record, so a retry updates instead of duplicating.

## How does the shop system find out about changes made in QuickBooks?

Through webhooks, with change data capture as the safety net, both described in Intuit's developer docs:

- **[Webhooks](https://developer.intuit.com/app/developer/qbo/docs/develop/webhooks/configure-webhooks)** notify your
  system when entities change, only for companies connected and authorized through OAuth 2.0. Each notification
  should be checked against the verifier token Intuit gives, so a forged call is rejected. Intuit says the first
  notification can take up to five minutes to arrive.
- **[Change data capture (CDC)](https://developer.intuit.com/app/developer/qbo/docs/learn/explore-the-quickbooks-online-api/change-data-capture)**
  returns everything that changed since a time, up to 30 days back and up to 1,000 objects a response. Run it on a
  schedule for any webhook that was missed. It doesn't cover every entity: time activities and tax codes and rates
  are among those left out, so timesheets entered in QuickBooks need a query of their own.

## Does the QuickBooks API cost anything?

Writing to QuickBooks is free; reading from it is metered. Under Intuit's
[App Partner Program](https://developer.intuit.com/app/developer/qbo/docs/get-started/partner-faq), which launched in
the US on July 28, 2025, every app starts in the free Builder tier. "Core" calls, which create or update invoices,
bills, customers and vendors, are unmetered. "CorePlus" calls, which read data (accounts, company information,
reports), are counted, and the Builder tier allows 500,000 of them a month; calls above that are blocked, not
billed. Paid tiers raise the allowance and charge for calls above it, and an app listed on Intuit's App Marketplace
must subscribe to the paid Silver tier to stay listed.

A worked example, with made-up volumes: a shop sends 1,200 invoices, 900 payments, 600 bills and 500 bill payments
a month. That's 3,200 writes, all free. If it also reads each record back after posting (3,200 reads), runs change
data capture every 15 minutes (2,880 a month) and a nightly totals check of four queries (120), it uses 6,200 metered
reads: 1.2% of the free allowance. Polling all 3,200 records every five minutes instead would be 3,200 × 8,640 =
27.6 million reads a month, and the app would be blocked within the first day or two. Poll by change data capture,
never record by record.

## Who calculates sales tax, the shop system or QuickBooks?

With QuickBooks Online's automated sales tax, QuickBooks does: it works out the tax on each invoice from the ship-to
address and whether each line is taxable, and posts it to its own liability account for each tax agency. So the shop
system sends the lines, their taxable flags and the ship-to address, not a tax amount. Decide this as deliberately as
record ownership.

What we saw testing our connector against a QuickBooks Online sandbox company (November 2026): the company was set up
to collect tax only in Arizona and California, so QuickBooks charged $0 tax to customers in other states. One invoice
came to $21,959 in our system and $21,200 in QuickBooks: the same lines, without $759 of tax. Nothing errored; the
totals simply differed. The lessons:

- **Set up every state where you collect** in QuickBooks' sales tax settings, not only in the shop system. QuickBooks
  can't charge tax for a state it doesn't know you collect in.
- **Store both totals** (yours and QuickBooks') on each invoice and flag any difference, so a gap is seen the day
  it happens, not at the return.
- **Don't post tax twice.** If QuickBooks calculates the tax, leave the shop system's own sales tax payable account
  out of the account mapping.

For what the shop system itself must track, see [sales tax in an ERP](/sales-tax/sales-tax-in-erp).

## What goes wrong in a QuickBooks sync, and how do you catch it?

Three things, and each has a check:

- **A post fails** (a closed period, a missing tax code, an item renamed in QuickBooks). It must be logged and shown
  to a person, never dropped silently. The pattern: [failures flagged, not lost](/patterns/failures-flagged-not-lost).
- **Totals drift.** Compare open invoices and item counts on both sides every night; a difference is a ticket.
- **Someone edits on the wrong side.** Make the non-owner side read-only where you can, and alert where you can't.

## Does a private connection need Intuit's app review?

Only the first level of it. To get production credentials, an app's App Assessment Questionnaire must be approved;
after that, an app used privately is live. Listing on Intuit's App Marketplace adds a three-part review (technical, a
third-party security review, and marketing), Intuit reviews listed apps at least once a year, and the listing now
needs a paid partner tier.

## What does the Ahrom Labs connector send to QuickBooks?

Invoices, payments, vendor bills and bill payments, from our US demos connected to a QuickBooks sandbox company
(November 2026); it isn't yet running on a client's live books. In the boiler and electronics distribution demos:

- **Connecting:** the owner connects QuickBooks once in Settings, reviews the suggested account matches and saves
  them. Visitors can see the connection but not change it.
- **Sales:** issued invoices and recorded customer payments go to QuickBooks with their customer. Each line goes as
  taxable or not, and QuickBooks works out the tax.
- **Purchases:** approved vendor bills go with their vendor; vendor payments go when they name the bill they pay.
- **Payments with no invoice named:** where the cash book records who paid but not which invoice, the payment
  arrives in QuickBooks unapplied, for the accountant to match there.
- **Status on every row:** "In QuickBooks", "QuickBooks failed · Retry" or "Not in QuickBooks · Send". Every call
  carries a request ID, so a retry can't create a second copy.

What it doesn't do yet: it only sends; changes made in QuickBooks don't come back (no webhooks or change data capture
yet), credit and debit notes aren't sent, and a document edited after it was sent isn't sent again. We'd build the
read-back side with change data capture when a client's books need it.

Try it in the [boiler](https://boiler-erp-us.ahromlabs.com/demo) or
[electronics distribution](https://electronics-erp-us.ahromlabs.com/demo) demo. See also
[QuickBooks vs ERP](/manufacturing/quickbooks-vs-erp) and
[QuickBooks Online inventory](/manufacturing/quickbooks-online-inventory).

The [design studio demo](https://interiors-erp-us.ahromlabs.com/demo) uses the same approach for an interior design
firm: invoices when they leave draft, client payments unapplied, and completed vendor purchase orders as bills; it
doesn't send vendor payments yet. [QuickBooks for interior designers](/interiors/quickbooks-for-interior-designers)
covers what a design firm needs on top of QuickBooks.
