---
kind: asme
slug: welder-continuity
group: welding
title: "Welder continuity (QW-322): six-month rule and checker"
related:
  - /asme/welder-qualification
  - /asme/wps-pqr-wpq
  - /services/material-traceability
  - /industries/boiler-pressure-vessel-manufacturing
  - /manufacturing/wip-tracking
question: "How long is an ASME welder qualification valid?"
answer: >
  An ASME Section IX welder qualification has no fixed expiry date. Under QW-322 it lapses when the welder hasn't
  welded with that process for six months or more, and it can be revoked sooner if there's a specific reason to
  doubt their work. Each weld with the process restarts the six months for that process, so a shop needs a record of
  every welder's last weld per process.
description: "ASME welder continuity under QW-322: the six-month rule per process, renewing with one coupon, revocation, the record an Inspector checks, and a free checker."
domain: [asme, welding, records]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
tool: continuity
sources:
  - title: "BPVC Section IX: Welding, Brazing, and Fusing Qualifications (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-ix-bpvc-section-ix-welding-brazing-fusing-qualifications
    date: 2025-07-01
  - title: "ASME Data Report Forms (Section IX suggested formats)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/publications-information/asme-data-report-forms
    date: 2026-11-05
checks:
  - reg: ASME Data Report Forms, QW-484A
    doc: asme-forms
    quote: "Suggested Format A for Welder Performance Qualifications (WPQ)"
  - reg: ASME Data Report Forms, QW-484B
    doc: asme-forms
    quote: "Suggested Format B for Welding Operator Performance Qualifications (WOPQ)"
---

## How long is an ASME welder qualification valid?

An ASME welder qualification has no expiry date: it stays valid as long as the welder keeps welding with the process,
and lapses after six months or more without it (QW-322.1(a) in the 2025 Section IX). The same rule applies to welding
operators. Section IX is ASME's paid Code; this guide cites its paragraphs, and your copy of the 2025 Edition is the
authority.

## What are the two ways a qualification ends?

Section IX's QW-322 ends a welder's or welding operator's qualification in two ways:

1. **Six months without the process** (QW-322.1(a)). If the welder hasn't welded with a process for six months or more, their qualifications for that process expire.
2. **A specific reason to question their ability** (QW-322.1(b)). If there is a reason to doubt their ability to make welds that meet the specification, the qualifications supporting the welding in question are revoked; the others stay.

## Is continuity per process or per WPS?

Per process. The clock runs separately for SMAW, GTAW, GMAW, SAW and so on, not per WPS, position, thickness or
material. A welder qualified for SMAW and GTAW who only welds SMAW for seven months keeps SMAW and loses GTAW, and any
weld with a process, to any WPS, keeps all of that welder's qualifications in that process alive.

## How do I work out a welder's lapse date?

Add six months to the date of their last weld with the process; on that date the qualification has lapsed. Some
examples:

| Welder | Process | Last weld | Lapses on | Status on 6 Nov 2026 |
|---|---|---|---|---|
| W-12 | SMAW | 2 May 2026 | 2 Nov 2026 | Lapsed: requalify |
| W-12 | GTAW | 15 Jan 2026 | 15 Jul 2026 | Lapsed: requalify |
| W-31 | GMAW | 28 Sep 2026 | 28 Mar 2027 | Current |
| W-07 | SAW | 31 Aug 2026 | 28 Feb 2027 | Current |

Where the month six months on is shorter, the lapse date is its last day: 31 August plus six months is 28 February
(29 in a leap year), not 3 March. The checker above and the Excel log both work this way.

## How does the free checker work?

Paste one line per welder and process (stamp, process, last weld date) and the checker lists who lapses when,
soonest first. A row reads "Lapsed: requalify" from the lapse date on, and anyone within 30 days is flagged with how
many days are left to weld. It runs in your browser and sends nothing anywhere. To keep the log itself, download the
free [welder continuity log for Excel](/asme/welder-continuity-log.xlsx): one row per welder and process, with the
lapse date (EDATE, six months after the last weld), days left and status worked out, and lapsed or nearly lapsed
rows coloured.

## What counts as welding with the process?

Any recorded weld with that process: production welds, repair welds or another test, on any WPS. The record must show
the welder, the process and the date, and should point to the job or weld number so it is evidence of real welding.
Most shops log continuity from production weld maps or a monthly sign-off sheet.

## How do you renew a lapsed qualification?

With one test coupon in the process (QW-322.2), of any thickness, position and diameter, tested by bend tests or by
volumetric examination. Passing it restores the welder's earlier qualifications for that process with their original
ranges, so a welder who held 6G pipe doesn't need to retest 6G. A revoked qualification is different: the welder
requalifies for the work that was in question.

## What record does an Authorized Inspector expect?

| Field | Why |
|---|---|
| Welder ID (their stamp) | Links to their WPQ and to welds on the weld map |
| Process | Continuity is per process |
| Date welded | Sets the next lapse date |
| Job or weld number | Evidence that it was real welding |
| Signed off by | Who confirmed it |

Keep it next to the WPQs (ASME's suggested formats are QW-484A for welders and QW-484B for welding operators). The
[Authorized Inspector](/asme/authorized-inspector) checks continuity for every welder whose stamp appears on a job.

## What happens if a lapse is found after welding?

Those welds were made by an unqualified welder. It is a nonconformity: the shop records it, and the welds are
removed and rewelded, or dispositioned as the construction code and the Inspector allow, after the welder
requalifies. Checking the lapse date before assigning a welder to a seam is much cheaper.

## Does B31.3 piping use the same rule?

Yes: the B31 piping codes qualify welders to Section IX, so QW-322 applies, and an owner's specification may add
stricter rules. See [B31.1 vs B31.3](/asme/b31-1-vs-b31-3).

## What does our software keep for continuity?

Our US boiler demo keeps each welder's qualified processes with their last weld date per process and prints a QW-322
continuity table (welder, WPQ, process, last weld, lapse date, current or lapsed) in each job's ASME record package,
beside the weld map that shows whose stamp is on each seam. See
[ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
