---
kind: sales-tax
slug: use-tax
group: exemptions
title: "Use tax for businesses: when you owe it yourself"
question: "When does a business owe use tax on its purchases?"
answer: >
  Use tax is the other half of sales tax: when you buy something taxable for your own use and the seller doesn't
  charge your state's tax, you owe the same tax yourself. It catches untaxed purchases from out-of-state suppliers,
  and goods bought tax-free for resale or manufacturing that you then use another way. A registered business usually
  reports it on its regular sales tax return.
description: "Use tax for US businesses: what it is, when you owe it on purchases, goods bought exempt and then used, how it's reported, and credit for tax paid elsewhere."
domain: [sales-tax, use-tax]
published: 2026-11-03
updated: 2026-11-03
checked: 2026-11-03
sources:
  - title: Use Tax
    publisher: Texas Comptroller of Public Accounts
    url: https://comptroller.texas.gov/taxes/sales/use-tax.php
    date: "2026-11-03"
  - title: Exemptions
    publisher: Streamlined Sales Tax Governing Board
    url: https://www.streamlinedsalestax.org/for-businesses/exemptions
    date: "2026-11-03"
  - title: Publication 103, Sales for Resale
    publisher: California Department of Tax and Fee Administration
    url: https://cdtfa.ca.gov/formspubs/pub103/
    date: "2026-11-03"
  - title: Manufacturing Exemptions (publication 94-124)
    publisher: Texas Comptroller of Public Accounts
    url: https://comptroller.texas.gov/taxes/publications/94-124.php
    date: "2026-11-03"
checks:
  - reg: Texas Comptroller, Use Tax
    doc: tx-use
    quote: "Use tax is a nonrecurring tax that is complementary to sales tax and is imposed on the storage, use, or other consumption of tangible personal property or a taxable service in Texas."
  - reg: Texas Comptroller, Use Tax
    doc: tx-use
    quote: "If the seller does not have a permit or fails to charge sales and use tax, the purchaser must pay the use tax directly to our office unless an exemption applies."
  - reg: Texas Comptroller, Use Tax
    doc: tx-use
    quote: "Texas allows a credit for sales or use tax paid to other states."
  - reg: Streamlined Sales Tax Governing Board, Exemptions
    doc: sst-exemptions
    quote: "When the seller does not collect and remit the applicable sales tax due, the seller’s customer must remit use tax directly to the state unless the customer can claim a valid exemption."
  - reg: California CDTFA, Publication 103
    doc: ca-pub103
    quote: "If a purchaser paid sales tax to its supplier for items it purchased for business or personal use, but resold the items before any taxable use, the purchaser can take a deduction on their tax return when they report the sale."
  - reg: Texas Comptroller, Manufacturing Exemptions (divergent use)
    doc: tx-mfg
    quote: "The manufacturer must calculate and remit tax on the amount of divergent use of the equipment."
---

## What is use tax?

Sales tax is collected by the seller; use tax is paid by the buyer when the seller didn't collect. The rate is the
same, and the point is the same: a taxable item used in the state is taxed once, wherever it was bought. Texas
describes use tax as complementary to sales tax, on the storage, use or consumption of taxable items in the state.

For a household, use tax is mostly theory. For a business it's an audit finding waiting to happen, because
auditors read your purchase ledger, not just your sales.

## When does a business owe it?

| Situation | Example | You owe use tax on |
|---|---|---|
| An out-of-state supplier didn't charge your state's tax | Shop supplies from a supplier not registered in your state | The price of the supplies |
| You bought for resale, then used it yourself | A distributor takes a drill from stock for its own warehouse | The cost of the drill |
| You bought exempt for manufacturing, then used it another way | Steel bought exempt, used to build a rack for your own plant | The cost of the steel |
| Exempt equipment used partly for other purposes | A machine also used for your own maintenance parts | The divergent share (Texas) |
| The supplier charged a lower rate than your location's | Bought at a counter in an area with no local tax | The local tax not charged |

The Streamlined Sales Tax Governing Board puts the rule in one line: when the seller doesn't collect the tax due,
the customer must pay use tax directly to the state unless it can claim an exemption.

## How do you report it?

A business with a sales tax permit reports use tax on its regular sales and use tax return, as taxable purchases;
Texas has a line for it. A business without a permit files a separate use tax return. If you paid another state's
tax on the item first, Texas allows a credit for it; check your own state's rule.

The reverse also works: California lets a buyer that paid sales tax on an item, then resold it before using it,
take a deduction when it reports the sale.

## How does a system catch it?

Use tax is missed when nobody looks at the tax line of a vendor bill. The checks are mechanical:

- **Vendor bills with no tax** on taxable items, from vendors not registered in your state: flag for accrual.
- **Stock issued to internal use**: an issue from resale or exempt stock to maintenance, samples or your own
  buildings creates a use tax line at cost.
- **Exempt purchases** carry the reason they were exempt, so a later use that doesn't match it shows up. See
  [the manufacturing exemption](/sales-tax/manufacturing-sales-tax-exemption) and
  [resale and exemption certificates](/sales-tax/resale-certificates).
- **A monthly accrual report** by state and rate, which goes onto the return.

For how these fit with the rest of sales tax in an order system, see
[how an ERP should handle sales tax](/sales-tax/sales-tax-in-erp).
