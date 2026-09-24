---
kind: pattern
slug: human-verified-statutory-rates
title: Keep statutory rates in one human-approved registry that deployments pull from — don't scrape them
answer: >
  GST, TDS, PF, ESI, income-tax and professional-tax rates change a few times
  a year and must be right. Keep them in one central registry where a person
  enters and approves each change, and have every deployment pull approved
  changes daily through the same validation as a hand-entered rate. No scraping
  of government sites.
domain: [compliance, architecture, reliability]
evidence:
  - metric: rate categories
    value: GST, TDS, PF, ESI, income-tax slabs, professional-tax slabs
  - metric: update path
    value: draft → approved in the registry → pulled by each deployment on a daily cron
  - metric: automated scraping
    value: none — no reliable official rates API exists
published: 2026-09-24
updated: 2026-09-24
---

## Context

Every Indian business system that computes tax needs current statutory rates, and they change on known occasions — the Union Budget, GST Council meetings, state notifications. Typing them into each client's system separately means the same change is made several times, with several chances to get it wrong. Automating it by scraping government websites fails silently when a page changes shape.

## Decision

Run one registry of statutory rates, separate from any client system. A change is entered as a draft and becomes visible only once a person approves it, with its effective dates. Each deployment pulls approved changes on a daily schedule using a cursor, and applies them through exactly the same insert and validation functions its own admin screens use — a pulled rate and a hand-typed rate cannot behave differently. The registry is multi-tenant from the start, with a key per deployment.

## Why

A compliance rate is the kind of number where being wrong unattended costs more than being late. A person checking around known trigger dates is cheap and reliable; a scraper is cheap until the day it quietly isn't. Centralising the approval means that person does the work once for every client, and routing the pull through the existing validation means the sync adds no second set of rules to trust.

## Trade-off

Rates are only as current as the person maintaining the registry. The design relies on the change dates being predictable — which they mostly are — and accepts a short lag after an unscheduled notification in exchange for never applying an unverified rate.
