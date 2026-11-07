---
kind: asme
slug: section-v
group: code
title: "ASME Section V: nondestructive examination"
related:
  - /asme/joint-efficiency
  - /asme/welder-qualification
  - /services/document-extraction
  - /industries/boiler-pressure-vessel-manufacturing
  - /services/material-traceability
question: "What is ASME Section V?"
answer: >
  ASME Section V sets how nondestructive examinations are done: radiography, ultrasonic, magnetic particle,
  liquid penetrant, visual and leak testing, each in its own Article. It covers the method, not the verdict:
  which welds are examined, how much, and what counts as a rejectable flaw come from the construction section, such
  as Section VIII or Section I.
description: "ASME Section V explained: its Articles for RT, UT, MT, PT, VT and leak testing, who sets acceptance, how NDE personnel are qualified, and the NDE report."
domain: [asme, nde]
published: 2026-11-01
updated: 2026-11-07
checked: 2026-11-06
sources:
  - title: "BPVC Section V: Nondestructive Examination (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-v-bpvc-section-v-nondestructive-examination
    date: 2025-07-01
  - title: "Required Code Books"
    publisher: ASME
    url: https://www.asme.org/certification-accreditation/ASME-Certification-Process/Required-Code-Books
    date: 2026-11-05
  - title: "Indian Boiler Regulations, 2026 (Gazette of India, Extraordinary, No. 596)"
    publisher: Central Boilers Board, Department for Promotion of Industry and Internal Trade
    url: https://egazette.gov.in/WriteReadData/2026/276813.pdf
    date: 2026-10-01
checks:
  - reg: ASME Section V product page, description
    doc: asme-v
    quote: "Explore ASME BPVC Section V for clear NDE standards and specifications."
  - reg: ASME Required Code Books, U and UM certificates
    doc: asme-books
    quote: "BPVC Section V-Nondestructive Examination"
  - reg: IBR 2026, regulation 7
    doc: ibr-2026
    quote: "Level-III NDT Certificates from Indian Society for Non-destructive Testing(I.S.N.T.) or American Society for Non-destructive Testing( A.S.N.T.)"
---

## What is ASME Section V?

Section V is the Code's book of nondestructive examination methods: how radiography, ultrasonic, magnetic particle,
liquid penetrant, visual and leak testing are performed, written so that every construction section can point to one
set of methods. ASME describes it as its "NDE standards and specifications". The Code text is ASME's and paid; this
guide cites its Articles, and your 2025 Section V is the authority.

## Does Section V say whether a weld passes?

No. Section V covers the method; the verdict comes from the construction section. A radiograph is taken as Section V
says (film or digital, source and geometry, image quality indicators, density), but whether an indication on it is
acceptable is judged by, for example, Section VIII Division 1's UW-51 for full radiography or UW-52 for spot
radiography. That split is why an NDE procedure cites Section V and the NDE report cites Section VIII.

## Which Article covers which method?

| Article | Method |
|---|---|
| 1 | General requirements |
| 2 | Radiographic examination (RT), film and digital |
| 4 | Ultrasonic examination (UT) of welds, including phased array and time-of-flight diffraction |
| 5 | Ultrasonic examination of materials |
| 6 | Liquid penetrant examination (PT) |
| 7 | Magnetic particle examination (MT) |
| 9 | Visual examination (VT) |
| 10 | Leak testing |

Section V has further Articles for other methods (eddy current, acoustic emission and more) and a second subsection
that adopts ASTM standards for NDE.

## Who decides how much of a vessel is examined?

The construction section and the designer. Division 1 makes full radiography mandatory in some cases (UW-11) and
otherwise lets the designer choose, and the choice sets the [joint efficiency](/asme/joint-efficiency) and so the
wall thickness. Section I sets its own examination for boilers.

## How are NDE personnel qualified?

To a written practice, as the construction section requires. In US and Canadian shops that is usually the employer's
written practice to ASNT's SNT-TC-1A, with Level I, II and III personnel; the construction section names the standards
it accepts. India's IBR 2026 accepts Level III certificates from the Indian Society for Non-destructive Testing or the
American Society for Non-destructive Testing; see [ASME vs IBR 2026](/asme/asme-vs-ibr).

## Does a shop need Section V for an ASME certificate?

Yes, if it welds. ASME lists Section V among the required code books for the U and S certificates, and allows it to be
left out only if welding, brazing and fusing aren't in the shop's scope. See [BPVC sections](/asme/bpvc-sections).

## Can a welder be qualified by radiography?

Yes, for most processes: Section IX allows radiography or ultrasonic examination of the test coupon in place of bend
tests, with Section V setting the method. GMAW short-circuit welders can't be qualified by radiography; ASME
interpretation IX-16-28 (2015 Edition) allows ultrasonic examination for them. See
[welder qualification](/asme/welder-qualification).

## What should an NDE report show?

The method and procedure, the Section V and construction-code references, the welds or areas examined, the extent
(full, spot), the technique, the examiner and their level, the date, the results with any indications, and the
acceptance decision. NDE reports go in the vessel's file and the [data report](/asme/data-reports) records the extent
of radiography.

## What does our software keep for NDE?

Our US boiler demo records each NDE report (method, extent, welds covered, examiner and level, date, result), links
it to the seams on the weld map, and prints both in the job's ASME record package. The demo has no film or image
storage. See [ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
