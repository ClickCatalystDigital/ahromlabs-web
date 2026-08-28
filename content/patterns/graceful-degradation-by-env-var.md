---
kind: pattern
slug: graceful-degradation-by-env-var
title: Optional integrations should degrade the specific feature, not the app
answer: >
  Optional integrations shouldn't be a hard requirement at startup — check
  each one's config where it's actually used, and decide what happens per
  feature. Here that means three different behaviors for three integrations:
  a full local fallback, a silent skip, and a hard reject. The trade-off is
  holding three separate rules in mind instead of one simple story.
domain: [reliability, configuration]
systems: [savistar-ops]
evidence:
  - metric: behavior when the database URL is missing
    value: falls back fully to a local database file
  - metric: behavior when object-storage vars are missing
    value: inconsistent by design — one endpoint skips the upload silently, another rejects the request
  - metric: behavior when the AI extraction key is missing
    value: always rejects just the extraction call
published: 2026-08-29
updated: 2026-08-29
---

## Context

Three integrations — a hosted database, object storage, and an LLM API — each unlock a feature, but none of them are required for the app to run at all.

## Decision

Each integration's configuration is checked independently, right where it's used, rather than as one hard requirement at startup. What happens when it's missing is decided per feature rather than by one shared rule: the database falls back to a local file entirely; object storage either skips the upload silently or rejects just that request, depending on which endpoint; the AI integration always rejects just the extraction call.

## Why

A single hard requirement on every optional integration at boot would make local development and partial deployments unnecessarily brittle — the whole app would refuse to start over a feature nobody's using yet.

## Trade-off

This is deliberately inconsistent, not one uniform mechanism — three integrations, three different behaviors when missing. That's a real cost to hold in your head; it's not something you can describe as "the app degrades gracefully" and leave at that. Each integration point needs its own specific answer.
