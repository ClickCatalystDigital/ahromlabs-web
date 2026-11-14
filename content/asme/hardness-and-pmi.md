---
kind: asme
slug: hardness-and-pmi
group: quality
title: "Hardness testing and PMI on pressure vessels"
related:
  - /asme/pwht
  - /asme/mtr
  - /systems/nonconformance-report
  - /industries/boiler-pressure-vessel-manufacturing
  - /services/material-traceability
question: "When is hardness testing or PMI required on a pressure vessel?"
answer: >
  Mostly when the purchaser's specification asks for it, not the ASME Code: hardness limits on welds and heat
  affected zones for sour, caustic or hydrogen service, and positive material identification (PMI) of alloy parts and
  welds so the wrong alloy never goes in. The shop records each reading with its location, unit and limit, and a
  reading over the limit is a nonconformance.
description: "Hardness testing and PMI for pressure vessels and exchangers: who requires them, scales and units, where readings are taken, limits and records."
domain: [asme, quality, inspection]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Division 1)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
  - title: "API RP 578, Guidelines for a Material Verification Program (MVP) for New and Existing Assets"
    publisher: American Petroleum Institute
    url: https://www.api.org/products-and-services/standards
    date: 2026-11-14
  - title: "ISO 15156-1:2020 (NACE MR0175), materials for use in H2S-containing environments, Part 1; hardness limits for carbon steels are in Part 2"
    publisher: ISO
    url: https://www.iso.org/standard/79658.html
    date: 2026-11-14
---

## Does the ASME Code require hardness testing?

Generally not for ordinary carbon steel vessels in Section VIII Division 1. Hardness limits come from the purchaser's
specification or the service: sour service (wet H2S), caustic, amine and hydrogen service, and many refinery and
chemical company standards. Some Code rules for particular materials and procedures do involve hardness, and a
welding procedure qualified with hardness requirements carries them; check your edition and the job specification.
Where the job's [inspection and test plan](/asme/inspection-and-test-plan) lists a hardness test, it is a
contract requirement like any other.

## Why are hardness limits set?

Hard, brittle zones in welds and heat affected zones crack in certain services. The best-known limit is for sour
service: NACE MR0175/ISO 15156 limits carbon steel to 22 HRC (about 250 HV), and refinery specifications often set
200 HB or similar on welds of carbon steel in wet H2S or caustic service. [Post-weld heat treatment](/asme/pwht)
is the usual way to bring a weld under the limit, which is why the hardness check normally comes after PWHT.

## Which hardness scales are used?

| Scale | How it is measured | Where it is used |
|---|---|---|
| Brinell (HB, HBW) | A ball pressed into the surface; portable versions on site | Production welds and base metal |
| Vickers (HV) | A diamond pyramid; laboratory, small loads | Procedure qualification hardness traverses |
| Rockwell (HRC, HRB) | Depth of indentation | Specifications such as NACE; bolting |
| Portable (Leeb, UCI) | Rebound or ultrasonic, converted to a scale | Field checks; conversions need care |

Record the scale and the method with every reading: a number without its unit can't be accepted or rejected, and
conversions between scales are approximate. Customer specifications are sometimes written in an unusual unit; confirm
the scale and the test method before work starts rather than at final inspection.

## Where are hardness readings taken?

Where the specification says: typically weld metal, heat affected zone and base metal on each side, on each weld
or a sample of welds by type and welder, after PWHT. The record should identify the weld (by its weld map number),
the location on it, the reading, the scale, the instrument and its calibration, and the limit it was compared with.

## What is PMI and when is it required?

Positive material identification (PMI) checks that an alloy part or weld is the alloy it is supposed to be, by
portable X-ray fluorescence (XRF) or optical emission spectroscopy (OES). It catches the stainless fitting that is
really 304 instead of 316, or the chrome-moly weld made with carbon steel filler. ASME doesn't require it for
ordinary construction; refinery and petrochemical purchasers usually do for alloy pressure parts, often following
API RP 578. The [MTR](/asme/mtr) says what the mill certified; PMI checks the piece in your shop.

A typical PMI scope: every alloy pressure part, a sample or all of the alloy welds, and every alloy bolt; each
result recorded against the part's heat number and the weld map, with the instrument and its check standard.

## What happens when a reading fails?

It becomes a [nonconformance report](/asme/nonconformance-report): the weld or part is held, the cause found (no
PWHT, wrong filler, wrong material), the disposition decided (re-PWHT, repair, replace), and the area retested. The
failed reading stays on the record next to the retest.

## Can you show a hardness record?

A record for one weld, after PWHT (made-up readings, limit 200 HB maximum):

| Weld | Location | Reading | Scale | Instrument | Result |
|---|---|---|---|---|---|
| L1 | Weld metal, 12 o'clock | 178 | HBW (portable) | Unit 2, verified 3 March | Pass |
| L1 | HAZ, left | 186 | HBW | Unit 2 | Pass |
| L1 | HAZ, right | 207 | HBW | Unit 2 | Fail, NCR 041 |
| L1 | Base metal, left | 152 | HBW | Unit 2 | Pass |

The failed reading leads to an NCR; after re-PWHT the retest is a new row, and the failed row stays.

## How are portable hardness testers checked?

Against a certified reference block before use, at the hardness range being tested, with the result recorded on the
day's sheet. Portable readings depend on surface preparation, so grind and polish the spot as the instrument's method
requires; a rough surface reads low or scatters. When results are close to the limit, take more readings or confirm
with a different method, and agree with the purchaser in advance which method decides.

## How should results be recorded?

As numbers, not ticks. Each reading with its location, scale, instrument and limit, so the pass or fail is worked
out from the limit rather than typed in. Our US boiler demo does this with acceptance rules: a hardness limit is
entered once with its source (for example 200 HBW maximum), and an inspection value above it is failed automatically
and offers an NCR. See [ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
PMI is recorded as an inspection with its result; the demo doesn't read analyser files.
