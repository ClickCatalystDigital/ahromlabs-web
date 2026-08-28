---
kind: pattern
slug: role-scoped-finance-views
title: Scope financial visibility by role at the query layer, not just the UI
answer: >
  Don't rely on hiding UI elements to protect financial data from the wrong
  role — enforce the boundary where the data is fetched. Staff cash
  visibility is filtered to their own entries at the query level; bank data
  is rejected outright for staff before any query runs. The trade-off: it's
  a per-endpoint discipline, not one central gate.
domain: [access-control, finance]
systems: [savistar-ops]
evidence:
  - metric: cash visibility scope for staff
    value: own entries only, enforced in the API query
  - metric: bank visibility for staff
    value: none — every bank API route rejects staff requests
published: 2026-08-29
updated: 2026-08-29
---

## Context

Staff need to log day-to-day cash transactions, but shouldn't see the business's full financial picture. Bank data is for owners only.

## Decision

The boundary is enforced where the data is fetched, not just in what the interface shows. A staff member's view of cash entries is filtered to only the entries they created, at the point the data is queried. Bank data isn't filtered at all — every bank-related request from a staff account is rejected outright, before any query runs.

## Why

Hiding a UI element doesn't stop someone from calling the underlying endpoint directly. Enforcing the boundary at the point requests reach the server means the restriction holds regardless of what client is asking.

## Trade-off

There's no single central gate doing this for the whole app — no row-level security at the database, just a rule applied at each relevant endpoint. Every new finance-adjacent feature has to remember to apply the same check. It's a discipline the team has to keep, not a guarantee the system enforces on its own.
