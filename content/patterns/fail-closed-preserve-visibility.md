---
kind: pattern
slug: fail-closed-preserve-visibility
title: Fail-closed doesn't have to mean fail-invisible — pick the blocking mechanism deliberately
answer: >
  A security-critical control needs default-deny, but the naive way to
  enforce "blocked" — disabling the underlying service entirely — can also
  destroy the ability to detect the thing being blocked. Default to
  blocked, but enforce it through a mechanism that blocks use without
  blocking detection, so a blocked resource can still be found and requested.
domain: [reliability, access-control]
published: 2026-08-29
updated: 2026-08-29
---

## Context

A security-critical control needs a default-deny posture. The obvious way to enforce "blocked" is to disable the underlying service or device entirely — but that can also destroy the ability to even detect or discover the thing being blocked.

## Decision

Default to blocked, but enforce it through a mechanism that blocks *use* of the resource without blocking *detection* of it — so a blocked resource can still be found and its access requested, rather than disappearing entirely.

## Why

Fail-closed doesn't have to mean fail-invisible. Picking the specific blocking mechanism — not just deciding "blocked vs. not" — is the actual decision that determines whether a legitimate access request can even happen afterward.

## Trade-off

Requires a more specific, less obvious enforcement mechanism than the blunt "turn it off" option, and more care to confirm it genuinely blocks use while it does.
