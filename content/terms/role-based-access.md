---
kind: term
slug: role-based-access
title: "Role-based access"
answer: >
  Controlling what each person can see and do by their role, enforced by the system itself rather than by hiding things on screen.
domain: [operations]
order: 11
published: 2026-10-25
updated: 2026-11-07
---

It matters because hiding a button isn't security: if the system's own routes don't refuse a request, anyone who finds the address can read the data. It is also how a business meets the duty to keep personal data safe under India's DPDP Act, 2023, which requires reasonable security safeguards; an AI assistant on the system should run with the same limits as the person asking.

In the Savistar & Saag system, staff see only their own cash entries and every bank route refuses staff at the API. See the [access requirement](/erp/requirements#nonfunctional-role-access), the pattern [role-scoped finance views](/patterns/role-scoped-finance-views) and [what an AI assistant sends out](/ai-assistant/data-safety).
