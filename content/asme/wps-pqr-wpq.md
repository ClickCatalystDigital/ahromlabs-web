---
kind: asme
slug: wps-pqr-wpq
group: welding
title: "WPS vs PQR vs WPQ: what each proves and how they link"
question: "What is the difference between a WPS and a PQR?"
answer: >
  A PQR records a test weld: the actual materials, settings and test results that prove a procedure makes sound
  welds. A WPS is the instruction a welder follows, written with ranges the PQR supports. A WPQ records that one
  welder passed their own test. In ASME Section IX the PQR comes first, the WPS cites it, and each welder needs a
  WPQ.
description: "WPS, PQR and WPQ in ASME Section IX: what each document is, what goes in it, the tests behind it, and how a weld traces back through all three."
domain: [asme, welding]
published: 2026-11-01
updated: 2026-11-01
checked: 2026-11-01
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section IX: Welding, Brazing, and Fusing Qualifications)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
---

## The three documents

| | PQR | WPS | WPQ |
|---|---|---|---|
| Full name | Procedure Qualification Record | Welding Procedure Specification | Welder (or Welding Operator) Performance Qualification |
| Proves | The procedure makes welds with the required strength and ductility | Nothing by itself; it's the instruction | This person can make a sound weld |
| Records | What was actually used on one test coupon, and the test results | Ranges for every variable, within what the PQR(s) support | The welder's test, results and what they're qualified for |
| Written | Once per test | From one or more PQRs | Once per welder per test |
| Signed by | The manufacturer, certifying the record is correct | The manufacturer | The manufacturer |

## The order a shop builds them

1. **Draft a WPS** for the job you want to weld (often called a pWPS until it's qualified).
2. **Weld a test coupon** to it and record every variable actually used.
3. **Test the coupon.** For a groove weld procedure, Section IX requires tension tests (for strength) and guided bend tests (for ductility): typically two tension and four bends, side bends for thicker coupons. Toughness tests are added when the construction code requires impact testing.
4. **Write the PQR** from the coupon record and the test results.
5. **Issue the WPS**, citing the PQR, with each variable's range set by what the PQR qualifies: thickness, materials, filler, position, preheat, heat treatment.
6. **Qualify each welder** on the WPS (or a test of their own), and record it on a WPQ.

Section IX doesn't allow a shop to use another company's PQR. The exception is AWS's Standard Welding Procedure Specifications, which Section IX accepts under conditions (in its QW-500 rules), with the shop demonstrating them first.

## Which changes need a new PQR

Every variable in Section IX is classified. Change an **essential** variable beyond what the PQR covers and you need a new PQR; change a **nonessential** one and you only revise the WPS. See [essential variables](/asme/essential-variables).

## Following one weld back

On a [data report](/asme/data-reports) package, any weld should trace like this: weld number on the weld map → welder's stamp → that welder's WPQ and [continuity](/asme/welder-continuity) → the WPS used → the PQR behind it → the filler metal's certificate and the base metal's [MTR](/asme/mtr). An Authorized Inspector will pick a weld and walk it. When those links live in different binders, this is where audits stall.

## Further reading

What a welder's test covers is in [welder qualification](/asme/welder-qualification); how materials are grouped so one test covers many is in [P-numbers](/asme/p-numbers); the whole of Section IX in outline is in [the Section IX guide](/asme/section-ix).
