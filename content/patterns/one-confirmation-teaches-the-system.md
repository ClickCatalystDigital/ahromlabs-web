---
kind: pattern
slug: one-confirmation-teaches-the-system
title: Let one deliberate human correction teach the system — but only for narrowly trusted error shapes
answer: >
  When imported data carries typos — TINNER for THINNER, PALTE for PLATE —
  suggest a correction only for two trusted shapes, one-character edits and
  adjacent swaps, and remember the answer after a single human confirmation. A
  looser "edit distance ≤ 2" rule matched PALTE to VALVE as readily as to
  PLATE, and was rejected.
domain: [human-in-the-loop, data-quality, manufacturing]
evidence:
  - metric: trusted typo shapes
    value: edit distance exactly 1, or a single adjacent transposition
  - metric: confirmations needed to learn a word
    value: 1
  - metric: false positive caught before shipping
    value: PALTE ≈ VALVE at the same plain edit distance as PALTE ≈ PLATE
published: 2026-09-24
updated: 2026-09-24
---

## Context

Bills of materials arrive as spreadsheets typed by people, and the system categorises each line from its description. Misspellings — a missing letter, two letters swapped — land lines in the wrong category or none. Hand-adding each known misspelling as a rule fixes yesterday's typos, never tomorrow's.

## Decision

During the import review a person already does, the system suggests a spelling correction next to the category dropdown — never instead of it. It trusts only two typo shapes against a short, curated list of real keywords: a single inserted, deleted or substituted character, or a genuine swap of two adjacent letters. When a person confirms a suggestion, that word is stored and applied automatically on every future import. One confirmation is enough, because this is a direct yes-or-no answer from someone looking at the line, not an inference that needs repeated evidence.

## Why

A looser rule looked simpler: accept anything within an edit distance of two, which a transposition costs. Checked before shipping, it matched PALTE to VALVE exactly as closely as to PLATE — two unrelated substitutions scoring the same as one swap — which would have made the right suggestion ambiguous. Narrow shapes keep suggestions rare and right, which is what makes a single confirmation safe to learn from.

## Trade-off

Typos outside the two shapes — two unrelated wrong letters, a missing syllable — get no suggestion and still need a person to pick the category by hand. The system learns less per import, in exchange for almost never proposing a wrong word.
