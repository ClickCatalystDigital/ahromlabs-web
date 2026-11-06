---
kind: asme
slug: essential-variables
group: welding
title: "Essential and nonessential variables in ASME Section IX"
related:
  - /asme/wps-pqr-wpq
  - /asme/p-numbers
  - /asme/pwht
  - /services/material-traceability
  - /industries/boiler-pressure-vessel-manufacturing
question: "What are essential variables in ASME welding?"
answer: >
  ASME Section IX classifies each welding variable. Changing an essential variable, such as the base metal
  P-number, filler F-number, thickness range or post-weld heat treatment, needs a new PQR. Supplementary essential
  variables count only when impact testing is required. Nonessential variables, such as groove design, can change
  by revising the WPS.
description: "ASME Section IX essential, supplementary essential and nonessential variables explained, with common examples for procedures and for welders, and a worked case."
domain: [asme, welding]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
sources:
  - title: "BPVC Section IX: Welding, Brazing, and Fusing Qualifications (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-ix-bpvc-section-ix-welding-brazing-fusing-qualifications
    date: 2025-07-01
  - title: "ASME Data Report Forms (Section IX suggested formats)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/publications-information/asme-data-report-forms
    date: 2026-11-05
  - title: "Summary of Changes to ASME Boiler and Pressure Vessel Code Section IX (Welding Journal, July 2025)"
    publisher: American Welding Society
    url: https://www.aws.org/magazines-and-media/welding-journal/2025/july/wj-july-25-feature-05-sperko/
    date: 2025-07-01
checks:
  - reg: ASME Section IX product page, description
    doc: asme-ix
    quote: "Section IX of the BPVC contains rules relating to the qualification of welding, brazing, and fusing procedures as required by other BPVC sections."
  - reg: ASME Data Report Forms, QW-483
    doc: asme-forms
    quote: "Suggested Format for Procedure Qualification Records (PQR)"
  - reg: AWS Welding Journal, July 2025 (Sperko)
    doc: aws-sperko-2025
    quote: "These changes will become mandatory for new qualifications on January 1, 2026."
---

## What are essential variables in ASME welding?

Essential variables are the welding conditions that affect a weld's mechanical properties, so changing one beyond
what a PQR covers needs a new PQR. Section IX classifies every variable for every process in its variable tables
(QW-250 onwards for procedures, QW-350 onwards for welders) as essential, supplementary essential or nonessential. A
procedure test proves one set of conditions; the tables say how far you can move from it before you test again.
The Code text is ASME's and paid; this guide gives common examples, and your 2025 tables are the authority.

## What are the three kinds of procedure variable?

| Kind | If you change it beyond the PQR | Typical examples |
|---|---|---|
| Essential | Qualify a new PQR | Base metal P-number; filler F-number and A-number; thickness beyond the qualified range; adding or removing post-weld heat treatment; a decrease in preheat of more than 100 °F (56 °C); a change of process; adding or removing shielding or backing gas in some processes |
| Supplementary essential | New PQR only if the construction code requires impact testing | Group number within a P-number; an increase in heat input; single to multi-pass in some processes |
| Nonessential | Revise the WPS; no new test | Groove design, backing type, technique details, cleaning methods |

The exact list differs by process (SMAW, GTAW, GMAW, SAW, FCAW), so read the table for the process on your WPS.

## When do supplementary essential variables apply?

Only when the construction code requires toughness (impact) testing of the weld. Then a change in, for example, the
base metal Group number or an increase in heat input needs a PQR with impact tests in that condition. Impact-tested
work is where supplementary essentials catch shops out; see [MDMT and impact testing](/asme/impact-testing).

## What thickness range does a PQR qualify?

A groove-weld PQR qualifies a range of base metal thickness and of deposited weld metal thickness from the coupon's
thickness (QW-451). As a general picture, a coupon of moderate thickness qualifies from a minimum up to twice its
thickness, and a coupon 1½ in (38 mm) or thicker qualifies up to 8 in (203 mm); impact-tested work changes the lower
limit. Check QW-451 for the coupon you weld.

## Can you show a worked example?

A shop holds a PQR on ¾ in (19 mm) P-No. 1 plate, SMAW with E7018 (F-4, A-1), no PWHT. It can write a WPS for P-No. 1
from about 3/16 in up to 1½ in, as-welded. A new job needs a 2 in shell with PWHT: that is outside the thickness range
and adds PWHT, two essential variables, so the shop welds a new coupon (for example 1½ in thick, heat treated) before
issuing the WPS. Changing the groove angle on the same job needs only a WPS revision.

## What are a welder's essential variables?

QW-350 onwards: the process, position, backing (welding without backing when qualified only with it), the filler
F-number, and the diameter and deposited thickness ranges. Changing one beyond the WPQ means a new welder test. See
[welder qualification](/asme/welder-qualification).

## Does PWHT count as an essential variable?

Yes. Adding or removing post-weld heat treatment, or changing its temperature and time range, is a procedure
essential variable (QW-407), so the PQR must have been heat treated the way the job will be. See [PWHT](/asme/pwht).

## Can one WPS cite two PQRs?

Yes, for example to cover two thickness ranges, provided every essential variable on the WPS is covered by at least
one of the PQRs. Keep a PQR register with each PQR's qualified ranges worked out once: most WPS errors are ranges
copied wrong. ASME's suggested PQR format (QW-483) lays the variables out in the order of the tables.

## Did the 2025 Edition change the variables?

Section IX changes in every edition, and the 2025 changes apply to new qualifications from 1 January 2026, as the
American Welding Society's summary notes. Check the "Summary of Changes" at the front of your 2025 Section IX before
relying on any list here, including this one.

## What does our software keep for it?

Our US boiler demo prints each WPS with its PQR, P-numbers, thickness range and PWHT condition in the job's ASME record
package, next to the weld map that shows which WPS each seam used, so a reviewer can see each seam's thickness against
the WPS range. See [ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
