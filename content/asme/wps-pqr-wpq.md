---
kind: asme
slug: wps-pqr-wpq
group: welding
title: "WPS vs PQR vs WPQ: what each proves and how they link"
related:
  - /asme/essential-variables
  - /asme/welder-continuity
  - /services/material-traceability
  - /industries/boiler-pressure-vessel-manufacturing
  - /systems/heat-number
question: "What is the difference between a WPS and a PQR?"
answer: >
  A PQR records a test weld: the actual materials, settings and test results that prove a procedure makes sound
  welds. A WPS is the instruction a welder follows, written with ranges the PQR supports. A WPQ records that one
  welder passed their own test. In ASME Section IX the PQR comes first, the WPS cites it, and each welder needs a
  WPQ.
description: "WPS, PQR and WPQ in ASME Section IX: what each proves, the tests behind a PQR, the free QW-482 to QW-485 forms, AWS standard WPSs, and tracing a weld back."
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
checks:
  - reg: ASME Data Report Forms, QW-482
    doc: asme-forms
    quote: "Suggested Format for Welding Procedure Specifications (WPS)"
  - reg: ASME Data Report Forms, QW-483
    doc: asme-forms
    quote: "Suggested Format for Procedure Qualification Records (PQR)"
  - reg: ASME Data Report Forms, QW-484A
    doc: asme-forms
    quote: "Suggested Format A for Welder Performance Qualifications (WPQ)"
  - reg: ASME Data Report Forms, QW-484B
    doc: asme-forms
    quote: "Suggested Format B for Welding Operator Performance Qualifications (WOPQ)"
  - reg: ASME Data Report Forms, QW-485
    doc: asme-forms
    quote: "Suggested Format for Demonstration of Standard Welding Procedure Specifications (SWPS)"
---

## What is the difference between a WPS and a PQR?

A PQR is the record of a test weld that proves a procedure works; a WPS is the instruction written from it. The PQR
records what was actually used on one coupon (materials, filler, settings, preheat, heat treatment) and the test
results; the WPS gives the welder a range for each variable, within what the PQR supports. A PQR is never edited to
fit a job: if a job needs something the PQR doesn't support, a new coupon is welded.

| | PQR | WPS | WPQ |
|---|---|---|---|
| Full name | Procedure Qualification Record | Welding Procedure Specification | Welder (or Welding Operator) Performance Qualification |
| Proves | The procedure makes welds with the required strength and ductility | Nothing by itself; it's the instruction | This person can make a sound weld |
| Records | What was used on one test coupon, and the test results | Ranges for every variable, within what the PQR(s) support | The welder's test, results and what they're qualified for |
| Written | Once per test | From one or more PQRs | Once per welder per test |
| ASME's suggested form | QW-483 | QW-482 | QW-484A (welder), QW-484B (operator) |

## What is a WPQ?

A WPQ is the record that one welder (or welding operator) passed a performance test, and of the process, positions,
thicknesses, diameters and filler it qualifies them for. It belongs to the person, not the procedure: a welder
qualified on one WPS may weld to other WPSs within their qualified ranges. What a test covers is in
[welder qualification](/asme/welder-qualification).

## In what order does a shop build them?

1. **Draft a WPS** for the job (often called a pWPS until it's qualified).
2. **Weld a test coupon** to it and record every variable actually used.
3. **Test the coupon.** For a groove-weld procedure, Section IX requires tension tests for strength and guided bend tests for ductility (QW-451 sets how many; side bends replace face and root bends on thicker coupons). Toughness tests are added when the construction code requires impact testing.
4. **Write the PQR** from the coupon record and the test results, and certify it.
5. **Issue the WPS**, citing the PQR, with each variable's range set by what the PQR qualifies.
6. **Qualify each welder** and record it on a WPQ.

## What tests does a PQR need?

For a groove weld, tension tests and guided bend tests cut from the coupon, in the numbers Section IX's QW-451 tables
give for the coupon's thickness; for fillet welds, fillet weld tests. Charpy impact tests are added when the
construction code requires toughness, which also brings in Section IX's supplementary essential variables. The
results go on the PQR with the laboratory's report.

## Which changes need a new PQR?

Every variable in Section IX is classified. Change an **essential** variable beyond what the PQR covers (base metal
P-number, filler F-number, thickness range, post-weld heat treatment and others) and you need a new PQR; change a
**nonessential** one and you only revise the WPS. See [essential variables](/asme/essential-variables).

## Can one WPS cite more than one PQR?

Yes, as long as every essential variable on the WPS is covered by at least one of the PQRs: for example, two PQRs
that between them cover a wider thickness range. A PQR register with each PQR's qualified ranges worked out once
prevents most WPS errors, which are usually ranges copied wrong.

## Who signs the WPS and PQR?

The manufacturer or contractor that did the qualification certifies the PQR, and issues the WPS. The organization is
responsible for its own qualifications, so a shop can't use another company's PQR. The
[Authorized Inspector](/asme/authorized-inspector) reviews them before the procedure is used on Code work.

## Can I use an AWS prequalified WPS on ASME work?

Not an AWS D1.1 prequalified procedure: ASME work needs Section IX qualification. Section IX does accept AWS's
standard welding procedure specifications (SWPSs) listed in its Article V (QW-500), after the shop demonstrates one
with a test weld, recorded on ASME's QW-485 format.

## Where do I get the forms?

ASME publishes the suggested formats free on its [data report forms page](https://www.asme.org/codes-standards/publications-information/asme-data-report-forms): QW-482 (WPS), QW-483 (PQR),
QW-484A (welder WPQ), QW-484B (welding operator) and QW-485 (SWPS demonstration). A shop may use its own layout if it
records everything Section IX requires.

## How does a weld trace back through all three?

On a job's file, any weld should trace like this: weld number on the weld map → the welder's stamp → that welder's
WPQ and [continuity](/asme/welder-continuity) → the WPS used → the PQR behind it → the filler metal's certificate and
the base metal's [MTR](/asme/mtr) by heat number. An Authorized Inspector will pick a weld and walk it, and when the
links live in different binders this is where audits stall.

## What does our software keep for it?

Our US boiler demo keeps those links per job and prints them in the ASME record package: the weld map lists each
seam's joint category and type, WPS, welder stamps and NDE report; the welding page lists each WPS with its PQR,
P-numbers, thickness range and PWHT basis; welder continuity under QW-322 sits next to it. It records procedures the
shop has qualified; it doesn't write or qualify them. See [ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
