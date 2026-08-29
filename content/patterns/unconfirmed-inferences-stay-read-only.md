---
kind: pattern
slug: unconfirmed-inferences-stay-read-only
title: Mark inferred rules unconfirmed, and keep them read-only until a person confirms them
answer: >
  A system can infer relationships from existing data — implicit orderings
  baked into config — that look plausible but were never confirmed by a
  domain expert. Mark such inferences explicitly unconfirmed and keep any
  automation that would act on them read-only until a domain expert
  actually confirms them, rather than letting the inference stand in.
domain: [reliability, data-modeling]
published: 2026-08-29
updated: 2026-08-29
---

## Context

A system can infer relationships or rules from existing data — implicit orderings baked into configuration, patterns that look consistent across records — without those relationships ever having been confirmed by someone who actually knows the business.

## Decision

Explicitly mark such inferences as unconfirmed, and keep any automation that would act on them in a read-only or advisory state until a domain expert actually confirms them. Building the enforcing version of that automation is deliberately deferred.

## Why

An inferred rule that turns out wrong, and is already gating real users' actions, is worse than having no rule at all — it fails confidently instead of failing obviously.

## Trade-off

Slower to get automated enforcement live, and it requires someone to actually do the confirmation step rather than letting the inference quietly stand in for it indefinitely.
