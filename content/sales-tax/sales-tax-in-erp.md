---
kind: sales-tax
slug: sales-tax-in-erp
group: systems
title: "How an ERP should handle US sales tax"
question: "What should an ERP or order system do about sales tax?"
answer: >
  It should work out the tax from the ship-to address and each item's taxability, hold every customer's exemption
  certificates with their states and dates, total sales and orders by state so you see a threshold coming, flag
  untaxed purchases for use tax, and give the figures for each return. The rates themselves are best taken from a
  rate service, not typed in.
description: "What an ERP or order system must record for US sales tax: ship-to sourcing, item taxability, certificates, sales by state for nexus, use tax and returns."
domain: [sales-tax, erp]
published: 2026-11-03
updated: 2026-11-03
checked: 2026-11-03
sources:
  - title: Remote Sellers
    publisher: Texas Comptroller of Public Accounts
    url: https://comptroller.texas.gov/taxes/sales/remote-sellers.php
    date: "2026-11-03"
  - title: Use Tax Collection Requirements Based on Sales into California Due to the Wayfair Decision
    publisher: California Department of Tax and Fee Administration
    url: https://cdtfa.ca.gov/industry/wayfair/
    date: "2026-11-03"
  - title: Remote Seller FAQs
    publisher: Streamlined Sales Tax Governing Board
    url: https://www.streamlinedsalestax.org/for-businesses/remote-seller-faqs
    date: "2026-11-03"
checks:
  - reg: Texas Comptroller, Remote Sellers
    doc: tx-remote
    quote: "Local use tax is due at the location in Texas where the order is shipped or delivered when the order is not received or fulfilled from a Texas place of business."
  - reg: Texas Comptroller, Remote Sellers
    doc: tx-remote
    quote: "The current single local use tax rate is 1.75 percent, and the rate is published in the Texas Register by Jan. 1 of each year."
  - reg: Texas Comptroller, Remote Sellers
    doc: tx-remote
    quote: "However, all sellers must keep required records of all marketplace sales for at least four years."
  - reg: California CDTFA, Wayfair guide
    doc: ca-wayfair
    quote: "the total combined sales of tangible personal property for delivery in California by the retailer and all persons related to the retailer exceed $500,000."
  - reg: Streamlined Sales Tax Governing Board, Remote Seller FAQs (what a certified provider does)
    doc: sst-faq
    quote: "Determine the appropriate sales or use tax rate and calculate the tax due at the time of the sale"
---

## What does sales tax ask of your system?

Five things, and only the first is the tax calculation most people think of:

| The system must | Because |
|---|---|
| Tax each invoice line by the ship-to address and the item's taxability | Rates and rules are set by the delivery location, down to city and district |
| Know which customers buy tax-free, in which states, and why | A missing certificate makes the sale taxable to you |
| Total sales and orders by ship-to state, split into resale, exempt and taxable | That's how you see an [economic nexus threshold](/sales-tax/economic-nexus-thresholds) coming |
| Flag purchases that owe use tax | Untaxed bills and stock taken for internal use |
| Give each state's return figures | Taxable sales, exempt sales by reason, tax by jurisdiction |

## Where does the rate come from?

From where the goods are delivered, in most cases. Texas, for example, puts local use tax at the location where the
order is shipped or delivered when it isn't fulfilled from a Texas place of business, and also offers remote
sellers a single local rate (1.75% when checked) in place of each destination's local tax. California adds district
taxes. A ZIP code is not precise enough, because district and city boundaries cut across ZIP codes.

So the system should not hold a rate table someone types in. It should send the ship-to address, item tax code and
amount to a rate service and store the answer on the invoice line: the jurisdictions, the rates and the tax. The
certified service providers in the [Streamlined Sales Tax](/sales-tax/streamlined-sales-tax) program do exactly
this, free in member states for remote sellers who qualify; commercial rate services do it everywhere.

## What has to be on the customer record?

- Each [resale or exemption certificate](/sales-tax/resale-certificates): the states it covers, the exemption, the
  date received and any renewal date, and the file itself.
- The customer's ship-to addresses, since one customer can be exempt in one state and taxable in another.
- A rule at order entry: an order shipping to a state with no certificate on file is taxed, and someone is told.

## How does it see nexus coming?

With one report that most small-business systems can't produce: sales and order count by ship-to state for any
12 months, with resale, exempt and taxable sales apart. Two details matter:

- **Related companies count together** in some states. California's $500,000 test counts combined sales by the
  retailer and all persons related to it, so a group with two companies needs the report across both.
- **Marketplace sales** need their own column: some states leave them out of your threshold, and Texas wants their
  records kept for at least four years.

Run it monthly against the thresholds. A spreadsheet export into the
[nexus checker](/sales-tax/economic-nexus-thresholds) is enough to start.

## What about use tax and manufacturing?

Purchases are the other half. Every vendor bill line should carry its tax treatment: taxed, exempt with a reason,
or untaxed and owing [use tax](/sales-tax/use-tax). A manufacturer claiming the
[manufacturing exemption](/sales-tax/manufacturing-sales-tax-exemption) also needs material issues and machine hours
by job, so exempt purchases can be shown to have been used as claimed.

## What if QuickBooks keeps the books?

Then decide which system calculates the tax. With QuickBooks Online's automated sales tax, QuickBooks works out the
tax itself from the ship-to address, and charges none for a state it isn't set up to collect in, even when your order
system did charge it. Set up the same states in both, and compare the two totals on every invoice. Details, from our
own sandbox tests: [connecting QuickBooks Online](/manufacturing/quickbooks-integration).

## How to test a vendor's system

Ask for these on your own data, in the demo:

1. An invoice to a ship-to address in a city with a district tax: are the jurisdictions shown?
2. The same customer shipping to a state where you hold their certificate, and one where you don't.
3. Sales by ship-to state for the last 12 months, resale, exempt and taxable apart.
4. A vendor bill with no tax from an out-of-state supplier: is it flagged?
5. Stock taken from inventory for your own use: does it create a use tax line?
6. The figures for one state's return, without a spreadsheet.

A system that fails 3 and 6 will have you rebuilding the numbers by hand at every return. For choosing between a
package and a system built to fit, see [custom vs off-the-shelf ERP](/manufacturing/custom-vs-off-the-shelf-erp).
