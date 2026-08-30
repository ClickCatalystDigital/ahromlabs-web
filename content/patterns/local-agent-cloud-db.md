---
kind: pattern
slug: local-agent-cloud-db
title: Route through a local agent, not a direct API, when the target system is local-only
answer: >
  When the system you need to integrate with only exposes a local interface —
  like TallyPrime's local-only XML gateway — route through a small agent
  running on the same machine instead of building toward a cloud API that
  doesn't exist. The cost is lag: minutes to a day, depending on how fast
  that data actually needs to move.
domain: [architecture, accounting-integration]
systems: [ls-crm]
evidence:
  - metric: push poll cadence
    value: 30 seconds
  - metric: voucher/outstanding sync
    value: 15 minutes
  - metric: master data sync
    value: 24 hours
published: 2026-08-29
updated: 2026-08-29
---

## Context

TallyPrime's own integration surface is a local HTTP XML gateway — it only listens on the machine running Tally itself. There's no cloud-reachable endpoint to call from a hosted web app.

## Decision

Run a small agent on the same machine as Tally. The cloud app never talks to Tally directly — it writes to its own database, and the local agent reads from there and posts into Tally's gateway.

## Why

This isolates everything Tally-specific — the local-only connection, Tally's own XML quirks, the possibility that the PC is simply switched off — inside one small, replaceable process. The cloud app stays a normal web app that only ever talks to its own database.

## Trade-off

The integration only works while that PC and its agent are running. Data isn't instantly consistent between the two systems — pushes go out every 30 seconds, voucher status syncs back every 15 minutes, and slower-moving reference data (ledgers, stock items, voucher types) syncs once every 24 hours. That lag is the cost of not needing the target system to expose anything it doesn't already have.

## As code

The Tally-facing half of this agent — building and posting voucher XML against the local gateway — is open-sourced as [`tally-voucher-xml`](https://github.com/ahromlabs/tally-voucher-xml).
