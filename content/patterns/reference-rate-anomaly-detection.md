---
kind: pattern
slug: reference-rate-anomaly-detection
title: Flag deviations from a known reference rate, don't manually audit every charge
answer: >
  Incoming billed amounts can't all be manually audited line by line.
  Compare each charge against a known reference rate and automatically flag
  deviations, instead of trusting every incoming number or requiring full
  manual review. Catches overcharges without a person checking every line —
  only as good as how current the reference data stays.
domain: [reliability, finance]
systems: [savistar-ops]
published: 2026-08-29
updated: 2026-08-29
---

## Context

Vendor and freight charges arrive as numbers a system has no independent way to verify — trusting them outright risks paying overcharges; auditing every line manually doesn't scale.

## Decision

Maintain a reference rate card for the relevant charge type, and compare each incoming charge against it automatically, flagging anything that deviates.

## Why

This catches overcharges without requiring a person to check every line, while still surfacing exactly the cases that need a human look — the ones that don't match what's expected.

## Trade-off

The check is only as good as the reference data. A stale rate card either produces false flags or misses real overcharges — someone has to keep it current for the pattern to keep working.
