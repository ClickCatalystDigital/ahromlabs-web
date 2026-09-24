---
kind: note
slug: accounting-inside-the-manufacturing-erp
title: GST, TDS and the general ledger inside a manufacturing ERP, with Tally optional
answer: >
  Shanti Boilers' operations system is also its book of record: chart of
  accounts, journal posting, GSTR-1, GSTR-3B, ITC reconciliation, TDS, reverse
  charge, fixed assets and bank reconciliation, with 23 reports and documents
  generated from the same data. Tally is an optional sync target, not the books.
  Statutory rates arrive daily from a human-verified registry.
domain: [accounting-integration, compliance, manufacturing]
patterns: [auto-match-only-when-mutually-unique, human-verified-statutory-rates, compute-once-render-many, derive-balances-dont-store-them]
evidence:
  - metric: reports and documents
    value: 23 — 19 catalog reports plus 4 per-record PDFs
  - metric: GST returns
    value: GSTR-1 (B2B and HSN, matching the GST portal's split) and GSTR-3B
  - metric: bank reconciliation auto-match
    value: exact amount within ±3 days, and only when the match is mutually unique
  - metric: statutory rate updates
    value: pulled daily from a human-approved registry; no scraping
  - metric: books lock
    value: enforced at the single point every journal posting passes through
published: 2026-09-24
updated: 2026-09-24
---

Most Indian manufacturers run operations in one place and accounts in Tally, and spend the month reconciling the two. At Shanti Boilers & Pressure Vessels, the original plan was the same: operations in the new system, accounting left to a separate package. That was reversed in August 2026. Here's what the system does now, and the case for building it this way.

## Why put the ledger inside the operations system?

Every accounting entry in a manufacturer starts as an operational event: a purchase order, a goods receipt, a vendor bill, a dispatch, a sales invoice. When operations and accounts live in different systems, each event is entered twice and the two copies drift. With the ledger in the same system, a vendor bill posts its own journal entry from the purchase it belongs to, and a dispatch carries its freight cost and invoice link into the books directly. Tally remains available as a sync target for the accountant who wants it — it just isn't where the truth lives.

## What compliance is covered?

Per legal entity: a chart of accounts and a posting engine; sales invoices, credit notes, vendor bills and debit notes; GSTR-1 (split into B2B and HSN tables the way the GST portal expects) and GSTR-3B; input-tax-credit reconciliation; TDS deduction with a TDS register; reverse charge on both the purchase and sales side; a fixed-asset register with depreciation; payroll exported into accounting; and trial balance, profit and loss, balance sheet and cash flow. Changes are written to an audit log with a searchable viewer, and a books lock stops postings into a closed period at the one function every journal entry passes through — so no document type can slip around it.

## Where do GST and TDS rates come from?

From a separate registry of Indian statutory rates — GST, TDS, PF, ESI, income-tax and professional-tax slabs — where a person enters and approves each change, and every deployment pulls approved changes on a daily schedule. Nothing scrapes government websites: no reliable official rates API exists, and a wrong compliance rate applied unattended costs more than a person checking around Budget day and GST Council meetings.

## How does bank reconciliation decide what to match?

A bank statement is imported from the bank's own export, and each line is matched against unreconciled ledger entries by exact amount within three days either side. A match is applied automatically only when it's mutually unique — exactly one candidate on each side. Anything ambiguous is shown as a suggestion for a person to confirm, and a statement line with no ledger entry at all — a bank charge, interest — becomes a one-click journal entry instead of a dead end.

## How was it tested?

With real transactions, not only unit tests. A reverse-charge test that posted real documents through the ledger found and fixed two posting bugs. A single order was then run through every department end to end, which found that sales invoices weren't carrying their project link — fixed before any real invoice depended on it.

## Boundary

E-invoicing has been researched and deliberately deferred. The system keeps one set of books per legal entity; consolidation across entities isn't built.
