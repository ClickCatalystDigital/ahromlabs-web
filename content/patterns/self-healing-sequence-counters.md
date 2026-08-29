---
kind: pattern
slug: self-healing-sequence-counters
title: Re-derive a sequence counter from the data itself before trusting it
answer: >
  A sequential ID scheme backed by a mutable counter table can desync from
  manual edits or partial writes. Before incrementing, re-derive the
  counter as the max of its stored value and the highest numeric suffix
  already in the table — it heals itself from drift instead of needing a
  manual fix, at the cost of an extra scan on each allocation.
domain: [reliability, architecture]
systems: [pcb-inventory]
evidence:
  - metric: resync check before each allocation
    value: max(stored counter, highest numeric suffix already in the table)
published: 2026-08-29
updated: 2026-08-29
---

## Context

A sequential, human-readable ID scheme (like a reel or box number with an incrementing suffix) is usually backed by a counter stored separately from the records it numbers. Manual edits, partial writes, or a restored backup can leave that counter out of sync with what's actually in the table.

## Decision

Before incrementing the counter to allocate a new ID, re-derive it as the maximum of its currently stored value and the highest numeric suffix actually present in the table.

## Why

The scheme heals itself from drift automatically. Nobody has to notice a desync and manually reset a counter — the next allocation just corrects for it.

## Trade-off

Every allocation now does a scan to find the current maximum, instead of a pure increment. Worth it for the guarantee that IDs never collide even after the counter itself gets out of sync.
