---
kind: asme
slug: section-viii
group: code
title: "ASME Section VIII: Division 1 vs 2 vs 3"
related:
  - /asme/bpvc-sections
  - /asme/data-reports
  - /asme/state-boiler-laws
  - /industries/boiler-pressure-vessel-manufacturing
  - /services/material-traceability
question: "What is the difference between ASME Section VIII Division 1 and Division 2?"
answer: >
  Section VIII sets the rules for pressure vessels in three Divisions. Division 1 designs by rule with a design
  factor of 3.5 on tensile strength and covers most vessels. Division 2 uses a factor of 2.4, so walls are thinner,
  in return for more analysis, a User's Design Specification and a certified design report. Division 3 is for very
  high pressures. Each needs its own certificate: U, U2 or U3.
description: "ASME Section VIII Divisions 1, 2 and 3 compared: design factor, analysis, U vs U2 stamps, data reports, and when a vessel needs the U stamp at all."
domain: [asme, pressure-vessels, design]
published: 2026-11-01
updated: 2026-11-05
checked: 2026-11-05
sources:
  - title: "Boiler and Pressure Vessel Certification (certificates offered)"
    publisher: ASME
    url: https://www.asme.org/certification-accreditation/Boiler-and-Pressure-Vessel-Certification
    date: 2026-11-05
  - title: "ASME Data Report Forms"
    publisher: ASME
    url: https://www.asme.org/codes-standards/publications-information/asme-data-report-forms
    date: 2026-11-05
  - title: "Required Code Books"
    publisher: ASME
    url: https://www.asme.org/certification-accreditation/ASME-Certification-Process/Required-Code-Books
    date: 2026-11-05
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Divisions 1, 2 and 3)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
  - title: "NB-370 Synopsis: Stamping Requirements by Jurisdiction"
    publisher: The National Board of Boiler and Pressure Vessel Inspectors
    url: https://www.nationalboard.org/SiteDocuments/Synopsis/asme_requirements.pdf
    date: 2024-06-14
checks:
  - reg: ASME certification page, Section VIII Division 2
    doc: asme-bpv-cert
    quote: "U2 - Pressure Vessels (Alternative Rules for Pressure Vessels)"
  - reg: ASME certification page, Section VIII Division 3
    doc: asme-bpv-cert
    quote: "U3 - High Pressure Vessels"
  - reg: ASME Data Report Forms, Section VIII Division 1
    doc: asme-forms
    quote: "Manufacturer's Data Report for Pressure Vessels (Alternative Form for Single Chamber, Completely Shop- or Field-Fabricated Vessels Only)"
  - reg: ASME Data Report Forms, Section VIII Division 1
    doc: asme-forms
    quote: "User's Design Requirements for Single Chamber Pressure Vessels"
  - reg: ASME Data Report Forms, Section VIII Division 3
    doc: asme-forms
    quote: "Manufacturer's Data Report for High Pressure Vessels"
  - reg: ASME Required Code Books, U and UM certificates
    doc: asme-books
    quote: "BPVC Section VIII-Rules for Construction of Pressure Vessels Division 1"
---

## What does ASME Section VIII cover?

Section VIII is the Code's pressure vessel section: tanks, columns, reactors, heat exchangers, receivers and other
vessels that hold internal or external pressure, in three Divisions. Fired equipment that generates steam belongs to
[Section I](/asme/section-i-vs-iv) instead. Division 1's scope paragraph (U-1 in the 2025 Edition) excludes some
equipment outright, among them vessels for 15 psi (1 bar) or less and vessels of 6 in (152 mm) inside diameter or
less, which is why many low-pressure tanks are built to other standards. The Code text is ASME's and paid; this
guide cites paragraphs and explains them, and your copy of the [2025 Edition](https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025) is the authority.

## What is the difference between Division 1 and Division 2?

The difference is the design margin and the engineering that pays for a smaller one. Division 1 sets allowable
stresses with a design factor of 3.5 on tensile strength and designs mostly by formula; Division 2 uses 2.4 and
designs by rule or by analysis, with stricter material and examination rules and more paperwork.

| | Division 1 | Division 2 | Division 3 |
|---|---|---|---|
| Approach | Design by rule: formulas and charts | Design by rule or by analysis (stress analysis, finite elements) | Design by analysis, with fracture mechanics |
| Design factor on tensile strength | 3.5 | 2.4 | Based on yield, with further checks |
| Typical use | Most vessels | Large, thick or alloy vessels where steel is the bigger cost | Very high pressure, generally above 10,000 psi (690 bar) |
| Owner's input | Design conditions on the order, or ASME's U-DR-1 / U-DR-2 forms | A User's Design Specification | A User's Design Specification |
| Design certification | The manufacturer | A Manufacturer's Design Report, certified as the Division requires | As Division 2, and more |
| ASME certificate | U (UM for miniature vessels) | U2 | U3 |
| Data report | U-1 or U-1A | A-1 | K-1 |

The certificate names and forms are from ASME's [certification page](https://www.asme.org/certification-accreditation/Boiler-and-Pressure-Vessel-Certification) and [data report forms list](https://www.asme.org/codes-standards/publications-information/asme-data-report-forms). The same vessel needs less steel
under Division 2, so it pays mainly on large, thick or expensive-alloy vessels; elsewhere the extra analysis and
examination cost more than the steel saved.

## When is Division 3 used?

Division 3 is for very high pressure, generally above 10,000 psi (690 bar): isostatic presses, high-pressure
reactors, some hydrogen storage. It designs by analysis with fracture mechanics, needs the U3 certificate, and is
reported on Form K-1 (K-2 for parts). It is a specialist field, and few shops hold the certificate.

## How do I choose between Division 1 and Division 2?

Start with Division 1 unless the vessel gives a reason not to. More shops hold the U certificate, more inspectors
know it, and the owner's paperwork is lighter. Consider Division 2 when:

- the wall gets thick (a rough sign: shells over about 2 in, 50 mm);
- the material is expensive (stainless, nickel alloys, clad plate), so thinner walls save real money;
- the vessel is cyclic and needs a fatigue assessment anyway.

The Division also decides who can build it: a fabricator with only a U certificate can't build or stamp a Division 2
vessel.

## Can a shop with a U certificate build Division 2 vessels?

No. Division 2 vessels need the U2 certificate, which ASME lists separately from U, with its own required code books
(Section VIII Division 2 instead of Division 1). A U holder that wants Division 2 work applies for U2 and goes through a
joint review for it. See [ASME stamps](/asme/stamps) and [how to get the U stamp](/asme/u-stamp).

## Does a vessel under 15 psi need a U stamp?

Not under Section VIII: Division 1's scope excludes vessels for 15 psi (1 bar) or less, so there is nothing to stamp
them to. A buyer can still ask for Code construction in the order, and the law where the vessel is installed sets
its own scope. Check the jurisdiction's rules before assuming a small or low-pressure vessel is exempt; see
[US and Canadian boiler laws](/asme/state-boiler-laws).

## Can a vessel be built to Section VIII without the U stamp?

A shop can design to the Section VIII formulas without a certificate, but the vessel isn't a Code vessel: there is no
Authorized Inspector, no Manufacturer's Data Report and no Certification Mark, and it can't be registered with the
National Board. Whether that is acceptable is a legal question for the place of installation. The National Board's
[stamping table](https://www.nationalboard.org/SiteDocuments/Synopsis/asme_requirements.pdf) (2024 Synopsis) lists the ASME stamps each jurisdiction requires: most list
U, while some do not include it (Florida, Louisiana, Montana, New Mexico, South Dakota and West Virginia among them),
and Idaho lists none.

## What paperwork does a Division 1 vessel need?

A Division 1 vessel's file holds:

- the design calculations: [shell thickness](/asme/shell-thickness), [heads](/asme/heads), nozzles and openings, flanges, supports;
- material certificates ([MTRs](/asme/mtr)) traced to each part by heat number;
- welding procedures and welder qualifications ([WPS, PQR and WPQ](/asme/wps-pqr-wpq)), with each welder's [continuity](/asme/welder-continuity);
- NDE reports, heat treatment charts and the [hydrostatic test](/asme/hydrostatic-test) record;
- the [Manufacturer's Data Report](/asme/data-reports), U-1 or U-1A, signed by the manufacturer and the [Authorized Inspector](/asme/authorized-inspector).

ASME also publishes User's Design Requirements forms, U-DR-1 for single-chamber and U-DR-2 for multi-chamber
vessels, for the owner to state design conditions.

## What does our software keep for a Section VIII vessel?

Our US boiler demo builds the record package for a Division 1 vessel from the job's own records: a Form U-1A layout
(our own, carrying the form's fields, not a copy of ASME's form), the weld map with welder stamps, WPS and PQR,
QW-322 continuity, MTRs by heat number, NDE, PWHT and the hydro test record. It covers Division 1 vessels and
Section I boilers, not Division 2. See [ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
