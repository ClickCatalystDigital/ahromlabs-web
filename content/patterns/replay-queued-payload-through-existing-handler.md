---
kind: pattern
slug: replay-queued-payload-through-existing-handler
title: Queue the original request, replay it through the same handler on approval
answer: >
  Some actions need approval before taking effect, but duplicating business
  logic for "pending" vs. "approved" versions of the same action doubles
  the surface area for bugs. Queue non-approved actions as the original
  request payload, and on approval, replay it through the exact same
  handler real-time requests use — one code path instead of two.
domain: [architecture, reliability]
systems: [pcb-inventory]
evidence:
  - metric: replay mechanism
    value: queued request payload replayed through the same handler function real-time requests use, not a separate approval-path implementation
published: 2026-08-29
updated: 2026-08-29
---

## Context

Some actions need a manager's approval before they take effect, but writing a separate "approved version" of that action's logic means every change to the real handler has to be mirrored in the approval path, or the two quietly drift apart.

## Decision

Store a non-approved action as a generic request record holding the original request payload as-is. On approval, replay that payload through the exact same handler function that processes real-time, non-gated requests.

## Why

There's one code path for the actual business logic, used whether the action happened immediately or after approval. Nothing to keep in sync between two implementations of the same operation.

## Trade-off

A queued payload is only as valid as it was at queue time — if something else changes state between queuing and approval, the replay can act on stale assumptions. That case needs its own handling; this pattern doesn't solve it by itself.
