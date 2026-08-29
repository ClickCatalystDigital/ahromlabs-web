---
kind: pattern
slug: derive-balances-dont-store-them
title: Compute a balance from source transactions at read time, don't store a running total
answer: >
  An outstanding balance — partial deliveries, payroll advances — can be
  tracked as a running total updated on each transaction, or computed fresh
  from source records every time. Compute it at read time instead of
  storing it separately, trading recomputation cost for avoiding drift
  between the stored total and the transactions that actually produced it.
domain: [architecture, finance]
systems: [savistar-ops]
published: 2026-08-29
updated: 2026-08-29
---

## Context

A figure like "outstanding balance" or "amount still owed" can be maintained two ways: as a stored value updated whenever a related transaction happens, or computed from those transactions whenever it's needed.

## Decision

Compute it at read time from the underlying transactions — orders, deliveries, returns, advances — rather than maintaining a separately-updated stored total.

## Why

A stored running total can drift from the transactions that produced it the moment an update is missed, applied twice, or applied out of order. A derived value can't drift, because it's recalculated from the same source every time.

## Trade-off

Recomputation cost on every read instead of an O(1) stored read. Fine at the transaction volumes this was built for; a system with a much higher read rate on this figure would need to revisit the trade.
