---
kind: pattern
slug: auto-match-only-when-mutually-unique
title: Auto-apply a match only when it's mutually unique — everything else goes to a person
answer: >
  When matching two lists — bank statement lines to ledger entries — apply a
  match automatically only if exactly one candidate exists on each side within
  tolerance (exact amount, ±3 days). Any ambiguity becomes a suggestion for a
  person, and an unmatched line gets a one-click fix. Fewer auto-matches, but
  none of them are guesses.
domain: [reliability, finance, human-in-the-loop]
evidence:
  - metric: tolerance
    value: exact amount, ±3 days for clearing lag
  - metric: auto-applied when
    value: exactly one eligible candidate on each side
  - metric: self-check assertions
    value: 8, including "ambiguous candidates stay low confidence"
published: 2026-09-24
updated: 2026-09-24
---

## Context

Bank reconciliation pairs each bank statement line with the ledger entry it corresponds to. Most pairs are obvious. Some aren't: two payments of the same amount a day apart, or a cheque that cleared three days after it was booked. A matcher that picks "the closest" in those cases will sometimes pick wrong — and a wrong reconciliation is harder to find than an unreconciled line.

## Decision

A match is applied automatically only when it is mutually unique: the statement line has exactly one eligible ledger candidate within tolerance, and that ledger entry has exactly one eligible statement line. Tolerance is the exact amount within a few days either side. Anything else is shown as a low-confidence suggestion — closest by date — for a person to confirm. Only unreconciled entries are ever candidates. A statement line with no ledger entry at all (a bank charge, interest) offers a one-click journal entry.

## Why

Mutual uniqueness is a condition the matcher can prove, not a score it has to trust. When it holds, there is no second interpretation to get wrong. When it doesn't, the ambiguity is real information a person should see, not noise to be resolved by a tie-break rule.

## Trade-off

A month with many identical amounts — standing instructions, equal instalments — auto-matches less and leaves more for a person to click through. That's the intended cost: the manual queue grows exactly where a guess would have been riskiest.
