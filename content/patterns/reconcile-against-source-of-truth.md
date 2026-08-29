---
kind: pattern
slug: reconcile-against-source-of-truth
title: After writing to an external system, verify against it — don't trust your own write
answer: >
  After writing to an external system of record, don't trust your own write
  as fact — read back from the authoritative system and update your own
  copy to match what's actually there. The external system stays the real
  source of truth; your copy is a cache of it, verified after every write.
domain: [reliability, accounting-integration]
systems: [ls-crm]
published: 2026-08-29
updated: 2026-08-29
---

## Context

A write to an external system of record can succeed on the wire but still not mean what you think — the request could be accepted and then rejected downstream, or applied differently than expected.

## Decision

After posting, read back from the authoritative system and update your own copy to match what's actually there, not what you believe you sent.

## Why

The external system is the real source of truth. Your own record of "what happened" is only correct once it's been checked against that system, not the moment the write request returns success.

## Trade-off

Adds a read-back step, and a window where your copy is provisionally "pending confirmation" rather than settled — cheaper than the alternative of silently drifting from what the source of truth actually holds.
