---
kind: pattern
slug: seeded-credentials-forced-rotation
title: Zero-config first run — seed default logins, force rotation through the UI
answer: >
  A new client instance needs to be usable immediately, not blocked on
  manual account provisioning. Auto-create the schema and seed default
  logins on first run, then force rotation through a UI visible to
  everyone, rather than leaving default credentials to quietly persist.
  Zero-friction setup, with a real but narrow exposure window.
domain: [reliability, configuration]
systems: [savistar-ops]
published: 2026-08-29
updated: 2026-08-29
---

## Context

A new client instance needs to be usable immediately. Requiring an admin to manually provision the first real account before anyone can log in adds friction to every new deployment.

## Decision

On first run, auto-create the schema and seed a small set of default logins. Rotation isn't optional or hidden — a "Change password" action is visible to everyone in the navigation, right after first login.

## Why

Zero manual setup gets a new instance usable the moment it's deployed, without leaving default credentials live indefinitely — the rotation path is impossible to overlook because it's not buried in a settings page.

## Trade-off

There's a real, if narrow, window where seeded credentials are live before someone actually rotates them. The trade is accepted deliberately: friction-free first run, in exchange for trusting that rotation actually happens promptly.
