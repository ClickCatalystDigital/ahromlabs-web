---
kind: pattern
slug: failures-flagged-not-lost
title: Classify failures before retrying — transient errors retry, real rejections wait for a person
answer: >
  A voucher push can fail because the target system is briefly unreachable,
  or because the voucher is genuinely invalid — two different problems
  needing different responses. Classify the failure first: transient errors
  retry automatically, structural ones are held with the reason attached for
  a person to fix.
domain: [reliability, accounting-integration]
systems: [ls-crm]
evidence:
  - metric: retry behavior for transient errors
    value: automatic, next 30-second poll cycle
  - metric: retry behavior for structural errors
    value: none — held with reason attached until a person resolves it
published: 2026-08-29
updated: 2026-08-29
---

## Context

A voucher push into Tally can fail for two very different reasons: Tally being briefly unreachable, or the voucher itself being genuinely invalid — a ledger that doesn't exist, a duplicate entry.

## Decision

Classify every failure before deciding what happens next. A connection problem is transient — the invoice stays queued and gets picked up automatically on the next poll cycle. A rejection from Tally itself is structural — the invoice is held, with the exact reason attached, and the automatic retry stops until a person fixes the underlying issue.

## Why

Treating every failure the same way breaks in one of two directions: retry forever on a voucher that will never succeed, or give up on a connection blip that would have resolved itself on its own thirty seconds later.

## Trade-off

The classification depends on parsing the target system's own error messages, which is simple to reason about but brittle if that wording ever changes — a workaround built against one system's specific quirks, not a general error-handling framework.
