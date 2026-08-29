---
kind: pattern
slug: separate-machine-from-human-identity
title: Make a machine credential structurally unable to pass as a human one
answer: >
  A system with both human users and machine/service clients needs a
  leaked machine credential to be unable to impersonate a human. Machine
  identity is carried in a token claim that can only come from the token
  itself, never a request body, and the human-session check explicitly
  excludes that credential type — structurally impossible, not just policy.
domain: [access-control, architecture]
published: 2026-08-29
updated: 2026-08-29
---

## Context

A system that serves both human users and machine or service clients needs a way to tell the two apart — and a leaked machine credential shouldn't be usable to impersonate a human, even by accident.

## Decision

Machine identity is carried in a token claim that can only originate from the token itself — never accepted from a request body — and the code path that checks for a valid human session explicitly excludes that credential type, rather than treating "authenticated" as one undifferentiated bucket.

## Why

A leaked machine token literally cannot be pasted somewhere and pass as a human login. That's not a policy someone has to remember to enforce — it's structurally impossible given how the identity is carried and checked.

## Trade-off

Two distinct credential-checking code paths to maintain instead of one unified "is this request authenticated" check.
