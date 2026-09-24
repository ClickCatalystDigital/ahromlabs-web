---
kind: pattern
slug: compute-blockers-on-read
title: Compute "what's blocking this" on every read, and observe before you enforce
answer: >
  To show why a workflow step is blocked and by what, compute the blocker fresh
  on every read from the step's declared predecessor and live signals — never
  store it. Ship it read-only first: surface the signal everywhere the step
  appears, enforce nothing, and flag steps marked done while their predecessor
  isn't. Enforcement comes after the signal is trusted.
domain: [operational-intelligence, architecture, workflow]
evidence:
  - metric: blocker storage
    value: none — computed on every read, so it can't go stale
  - metric: v1 enforcement
    value: none — observational signal only
  - metric: consistency check
    value: flags a step marked done while its own predecessor isn't
published: 2026-09-24
updated: 2026-09-24
---

## Context

A manufacturing order moves through dozens of milestones across departments — design, procurement, production, QC, dispatch. When one stalls, the useful question is not "is it late" but "what is it waiting for, and who can unblock it". Answering that with a hand-written check inside each feature produces as many definitions of "blocked" as there are screens.

## Decision

Each milestone declares its structural predecessor, configurable system-wide. One pure function takes a milestone and returns whether it's ready and, if not, what it's blocked by — an unfinished predecessor, or a live signal such as materials not yet received. The result is computed on every read and attached to the milestone wherever it renders; it is never written to the database. The first version enforces nothing: it only shows the signal, alongside — not merged into — the existing late/at-risk status. It also flags the reverse inconsistency: a milestone marked done while the thing it depends on isn't.

## Why

A stored "blocked" flag is a second copy of facts that already exist, and it goes stale the moment one of them changes. Computing on read removes that failure mode entirely. Shipping read-only first means the signal is checked against how the plant actually works before it's allowed to stop anyone — an enforced rule that's wrong halts real work; an observed one that's wrong just gets corrected.

## Trade-off

Every read pays for the computation, and a signal nobody is forced to act on can be ignored. Both are accepted for the first version: the computation is small, and the point of observing first is to learn which blockers deserve enforcement before any of them get it.
