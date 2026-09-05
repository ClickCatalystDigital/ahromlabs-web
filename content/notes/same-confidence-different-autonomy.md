---
kind: note
slug: same-confidence-different-autonomy
title: The same confidence score, two different autonomy rules
answer: >
  Two match-suggestion systems in the same manufacturing app score
  candidates identically — a Laplace-smoothed approval ratio, promoted at
  75% confidence with at least 3 prior approvals. One auto-applies its top
  match. The other never does, no matter how confident the score, because
  it decides what goes on a statutory quality-control document.
domain: [ai-extraction, human-in-the-loop, manufacturing]
patterns: [human-confirmed-extraction, unconfirmed-inferences-stay-read-only]
evidence:
  - metric: promotion threshold
    value: "(approvals+1) / (approvals+rejections+2) ≥ 0.75, minimum 3 approvals"
  - metric: certificate-matcher autonomy
    value: never auto-applies — a person always clicks "use this certificate"
  - metric: stock-matcher autonomy
    value: auto-reserves its top match, same confidence math, same threshold
published: 2026-08-31
updated: 2026-08-31
---

## Two systems, the same scoring math

A manufacturing operation runs two independent match-suggestion systems that solve the same shape of problem: given a new record, rank the best existing candidates to link it to. Both score confidence the same way — a Laplace-smoothed approval ratio, `(approvals + 1) / (approvals + rejections + 2)`, promoted to "high confidence" once it clears 0.75 with at least 3 recorded approvals.

## What each one is actually matching

One system matches leftover cut material back to bill-of-materials lines still waiting on stock — reserving whichever offcut fits, rotation allowed, so usable material doesn't get set aside as scrap. The other matches incoming test certificates to the bill-of-materials line they belong to, the record that ends up inside a statutory quality-control document.

## Same score, different action

At the identical confidence threshold, the stock-matching system auto-reserves its top candidate the moment it clears the bar — a database write happens with no person involved. The certificate-matching system never does that. It always returns a ranked list; nothing gets linked until a person clicks "use this certificate." A promoted, high-confidence match just moves to the top of that list — it doesn't get to act on its own.

## Why the same math earns different trust

A wrong stock reservation is a wasted click — someone notices the piece doesn't fit and picks another from the list. A wrong match on a quality certificate becomes part of the paperwork proving a part meets its material specification. The statistics can't tell those two mistakes apart; the decision about which one gets to act unsupervised has to be made separately, by someone who understands what's actually at stake on each side.
