---
kind: note
slug: tally-voucher-posting
title: Posting vouchers into TallyPrime from a cloud app
answer: >
  A local agent, running on the same PC as TallyPrime, polls a cloud app's
  database every 30 seconds and posts approved invoices into Tally's local
  XML gateway, syncing voucher status every 15 minutes and master data
  nightly. Missing ledgers and real rejections are held for a person;
  connection failures retry automatically until Tally is reachable again.
domain: [accounting-integration, trading]
systems: [ls-crm]
patterns: [local-agent-cloud-db, human-confirmed-extraction]
evidence:
  - metric: push poll cadence
    value: 30 seconds
  - metric: voucher/outstanding sync
    value: 15 minutes (30 cycles x 30s)
  - metric: master data sync (ledgers, stock, voucher types)
    value: 24 hours
  - metric: ledger-missing handling
    value: flagged for manual review, not auto-created; retries stop until fixed
published: 2026-08-29
updated: 2026-08-29
---

Ahrom Labs built the CRM and Tally-accounting layer running underneath LS Technologies, an electronics-components import/export trading business. Every purchase invoice, freight bill, and customs document gets extracted, reviewed, and — once approved — has to land as a real voucher inside TallyPrime. Here's how that actually works.

## Why doesn't the app talk to Tally directly?

TallyPrime's own integration surface is a local HTTP XML gateway that only listens on the machine running Tally itself — there's no cloud endpoint to call. A small agent runs on that same PC and bridges the two systems: the cloud app writes an approved invoice to its own database, and the local agent reads from there and posts it into Tally's gateway.

## How fast does data move between the two systems?

Three different cadences, not one. The agent polls for newly approved invoices every 30 seconds and pushes them into Tally immediately. It syncs voucher status and outstanding-bill data back to the cloud app every 15 minutes. Ledger, stock-item, and voucher-type master data — the slower-moving reference data — syncs once every 24 hours.

## What happens when a ledger doesn't exist yet?

Before an invoice is even approved, the system checks every ledger name its Tally posting would need against a locally cached snapshot of Tally's own ledgers, and flags anything unrecognized for the reviewer. Nothing gets auto-created in Tally on the system's own authority — a missing ledger is a decision for a person, not the software.

## How are Tally-offline errors handled differently from real rejections?

Every push failure gets classified before anything else happens. A connection failure — Tally is offline, the network hiccups — is transient: the invoice stays queued, and the same 30-second poll picks it back up automatically on the next cycle. A rejection from Tally itself — a ledger that truly doesn't exist, a duplicate voucher — is structural: the invoice is held with the exact reason attached, and the automatic retry stops until a person fixes it.

## How does the system know a voucher actually landed in Tally?

Posting isn't the end of the story. Each 15-minute sync compares what the app believes it posted against what Tally's own data currently shows. A voucher is marked confirmed only once it's actually visible inside Tally; if a confirmed voucher is later deleted inside Tally itself, the next sync notices and rolls the record back to unconfirmed.

## Boundary

None of this works as a cloud-to-cloud integration, because it isn't one — it depends on TallyPrime and its local gateway being reachable on the same machine as the agent. If that PC is off, nothing posts until it's back on; the 30-second retry picks up wherever it left off, with no manual restart needed.

## Reference implementation

The XML-building and error-classification logic described above is open-sourced as [`tally-voucher-xml`](https://github.com/ahromlabs/tally-voucher-xml) — the protocol-correct parts, stripped of this business's ledger names and database coupling.
