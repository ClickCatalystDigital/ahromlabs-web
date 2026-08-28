---
kind: note
slug: two-companies-one-book
title: Two companies, one book
answer: >
  Savistar and Saag — sister companies, same owners — share one client list
  and one combined finance ledger in a single app, not a multi-tenant
  system. The real structure is in who can see what: staff see only their
  own cash entries, and bank data is rejected outright for any staff
  request, enforced at the API, not just hidden in the UI.
domain: [access-control, finance]
systems: [savistar-ops]
patterns: [role-scoped-finance-views, graceful-degradation-by-env-var]
evidence:
  - metric: shared structure
    value: one client list, one combined finance ledger, no tenant/company table
  - metric: staff cash visibility
    value: own entries only
  - metric: staff bank visibility
    value: none, every bank route rejects staff
published: 2026-08-29
updated: 2026-08-29
---

## Why one book?

Savistar (interior design) and Saag (furniture manufacturing) are sister companies under the same owners, sharing a single client list. Rather than running two separate systems that need to be kept in sync, both businesses operate out of one app with one combined finance ledger.

## How "two companies" actually works

There's no tenant or company table underneath this — it's a single shared database with one client table. What distinguishes a Savistar job from a Saag order is mostly a matter of which tab it lives in (Projects for Savistar's design work, Orders for Saag's furniture orders), plus a single field on each invoice that picks the right letterhead, logo, and registration details when a PDF is generated. It's a shared single-tenant app modeling two business lines, not a multi-tenant system — simpler than "two companies, one book" might suggest, and that simplicity is the point: nobody has to maintain a heavier structure than the business actually needs.

## Where the real structure is: who can see what

The part that isn't simple is financial visibility. Staff log day-to-day cash transactions, but their view of the cash ledger is scoped to only the entries they personally created — enforced at the point the data is fetched, not just hidden in the interface. Bank data goes further: it isn't scoped, it's excluded entirely. Every request touching bank information from a staff account is rejected before any query even runs. Owners see everything; staff see their own cash activity and nothing from the bank side.

## Why it's built this way

None of this depends on every integration being perfectly configured. The database, file storage, and AI extraction the app uses elsewhere are each optional at the infrastructure level — the app runs regardless, and each feature behaves according to whether its own configuration is present, rather than the whole system depending on all of them being wired up.

---

> "They really took the time to understand our concerns and requirements, and the system was built the way we had envisioned it. It has brought much more structure, visibility, and control to the way we operate."
>
> — Sachi & Haripriya, owners of Savistar and Saag
