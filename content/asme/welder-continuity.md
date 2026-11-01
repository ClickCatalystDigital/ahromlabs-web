---
kind: asme
slug: welder-continuity
group: welding
title: "Welder continuity (QW-322): the six-month rule, with a free checker"
question: "How long is an ASME welder qualification valid?"
answer: >
  An ASME Section IX welder qualification has no fixed expiry date. Under QW-322 it lapses when the welder hasn't
  welded with that process for six months or more, and it can be revoked sooner if there's a reason to doubt
  their work. Each welding job resets the clock for that process, so a shop needs a record of every welder's last
  weld per process.
description: "ASME welder continuity under QW-322: the six-month rule, renewing a lapsed qualification, the record to keep, and a free checker."
domain: [asme, welding, records]
published: 2026-11-01
updated: 2026-11-01
checked: 2026-11-01
tool: continuity
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section IX: Welding, Brazing, and Fusing Qualifications)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
---

## The rule

Section IX's QW-322 sets two ways a welder's (or welding operator's) qualification ends:

1. **Six months without the process.** If the welder hasn't welded with a process for six months or more, their qualifications for that process lapse.
2. **Specific reason to question.** If there's a reason to doubt their ability to make welds that meet the specification, the qualifications supporting that work are revoked; the rest stay.

The clock is **per process**, not per WPS or per position. A welder qualified for SMAW and GTAW who only welds SMAW for seven months keeps SMAW and loses GTAW.

## What keeps it alive

Welding with the process, recorded. The record has to show the welder, the process and the date. Most shops log continuity from production weld maps or from a monthly sign-off sheet.

The checker above takes that log (welder, process, last weld date, one line each) and lists who lapses when, soonest first, with anyone within 30 days flagged.

## Renewing a lapsed qualification

A lapsed qualification is renewed with a single test coupon in the process (QW-322.2), of any thickness, position and diameter, tested by bend tests or volumetric examination. Passing renews the welder's earlier qualifications for that process, with their original ranges. A revoked qualification is a different case: the welder retests for the work that was in question.

## The record an Inspector expects

| Field | Why |
|---|---|
| Welder ID (their stamp) | Links to their WPQ and to welds on the weld map |
| Process | Continuity is per process |
| Date welded | Sets the next lapse date |
| Job or weld number | Evidence that it was real welding |
| Signed off by | Who confirmed it |

Keep it next to the WPQs; the [Authorized Inspector](/asme/authorized-inspector) checks continuity on every welder whose stamp appears on a job. A lapse found after welding means those welds were made by an unqualified welder. In a system that records who welded what and when, the lapse date is simply computed, which is what the checker does.

## Related

What the welder's test covers is in [welder qualification](/asme/welder-qualification); how the WPQ relates to the WPS and PQR is in [WPS vs PQR vs WPQ](/asme/wps-pqr-wpq).
