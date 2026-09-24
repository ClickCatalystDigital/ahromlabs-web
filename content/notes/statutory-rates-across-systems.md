---
kind: note
slug: statutory-rates-across-systems
title: Keeping GST, TDS and income-tax rates current across every system
answer: >
  Ahrom Labs keeps statutory rates — GST by HSN code, vendor TDS, income-tax and
  professional-tax slabs, PF and ESI — in one registry built to serve every
  system it builds, with Shanti Boilers' system the first connected. A person
  checks each change against the actual CBIC or CBDT notification, a change
  goes live only once approved, installs pull approved rates daily, and a wrong
  rate is retracted rather than edited.
domain: [compliance, accounting-integration]
systems: [shanti-ops]
patterns: [human-verified-statutory-rates]
evidence:
  - metric: Rate categories
    value: GST by HSN, vendor TDS, income-tax slabs, professional-tax slabs, PF/ESI
  - metric: Change to live
    value: Draft, then approved by a person; never applied unapproved
  - metric: Sync to installs
    value: Daily, 02:00 IST
  - metric: A wrong approved rate
    value: Retracted with a reason; the original and its approval kept
published: 2026-09-24
updated: 2026-09-24
---

## Why not fetch tax rates automatically?

Because there is nothing reliable to fetch from. When this registry was built, the sources were checked one by one: no government API publishes GST, TDS or income-tax rates in a machine-readable, effective-dated form, and the commercial compliance APIs checked offered filing, calculators and GSTIN lookup — not a rate feed. Scraping notification pages works until the day a page changes shape, and then it fails silently. For a number that ends up on invoices and in returns, being wrong unattended costs more than being a few days late. Rates change on mostly predictable occasions — the Union Budget, GST Council meetings, state notifications — so a person checking a few times a year is cheap and reliable.

## How does a rate change reach every system?

1. Someone reads the actual CBIC or CBDT notification and records the change in the registry's dataset.
2. A daily job compares the dataset against every version already recorded. Unchanged data does nothing; a new or changed rate becomes a draft; a conflicting value for the same effective date is rejected rather than drafted. An approved rate is never overwritten.
3. A person reviews the drafts and approves them — one at a time or in bulk.
4. Each connected system pulls approved changes on its own daily schedule, using a cursor so nothing is missed or pulled twice, and applies them through the same insert and validation it uses when someone types a rate in by hand.

Each system has its own key, so the registry knows who is pulling and a new installation is one key away from receiving every verified rate.

## What happens when an approved rate turns out to be wrong?

It's retracted, not edited. The original row and the record of who approved it stay in the registry permanently, a reason is required, a corrected replacement is drafted and approved separately, and the retracted row is never served again. The history of what a system believed, and when, survives the correction — which matters when someone later asks why an invoice carried the rate it did.

## How do you know the sync is still running?

The registry's daily refresh runs at 02:00 IST, half an hour before the connected systems pull, so they always pull after it has finished. Every run records a heartbeat — running, then success or failure — visible at the top of the registry's admin screen. The scheduled trigger also reports to an external check that sends an email if the schedule itself stops firing, because a job that never runs can't report its own failure.

## What else sits in the compliance core?

The rates registry is one part of the accounting and compliance layer that Ahrom Labs builds systems on:

- **GSTIN verification** — a live lookup of a customer's or vendor's GSTIN before it's saved.
- **GST returns** — GSTR-1 and GSTR-3B from the system's own ledger, and the government's GSTR-2B imported from the portal's download, with each line's Invoice Management System status — accepted, rejected, pending or deemed accepted — recorded against it. See [GST, TDS and the general ledger inside a manufacturing ERP](/notes/accounting-inside-the-manufacturing-erp).
- **E-way bills** — a client that talks directly to the government's NIC e-way bill system, with no intermediary, built to the official v1.03 specification to generate and cancel e-way bills from the invoice's own line items. It is built and checked locally; it goes live once the company's NIC account is set up.
- **TallyPrime** — connected four ways, or made optional. See [Four ways to connect a business system to TallyPrime](/notes/connecting-tallyprime-four-ways).

## Boundary

Rates are only as current as the person maintaining the registry, so an unscheduled notification can take a short while to arrive — accepted in exchange for never applying an unverified rate. The registry stores rates; it doesn't decide which rate applies to a transaction or give tax advice, and a business's own CA remains the authority on its filings. Shanti Boilers' system is the first connected; others connect as they need it.
