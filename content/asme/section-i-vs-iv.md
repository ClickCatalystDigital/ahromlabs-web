---
kind: asme
slug: section-i-vs-iv
group: code
title: "ASME Section I vs IV: power vs heating boilers"
related:
  - /asme/bpvc-sections
  - /asme/hydrostatic-test
  - /ibr/small-industrial-boilers
  - /industries/boiler-pressure-vessel-manufacturing
  - /services/material-traceability
question: "What is the difference between ASME Section I and Section IV boilers?"
answer: >
  Section IV covers heating boilers: steam boilers up to 15 psi (1 bar), and hot water boilers up to 160 psi (11 bar) and 250 °F (121 °C).
  Anything above those limits is a power boiler under Section I, which has stricter design, material, examination
  and inspection rules. The certificates differ too: S (with A, E, M and PP) for Section I, H and HLW for
  Section IV.
description: "ASME Section I power boilers vs Section IV heating boilers: pressure and temperature limits, S and H certificates, data reports, code books and hydro test."
domain: [asme, boilers]
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
  - title: "Boiler and Pressure Vessel Certificates of Authorization and the Certification Mark: Informational Handbook (BPV-GUI-03)"
    publisher: ASME
    url: https://www.asme.org/getmedia/cb8f63c5-3aa2-45ee-a2d1-b999d37733f7/bpv-gui-03-informational-handbook_1.pdf
    date: 2023-05-12
  - title: "2025 ASME Boiler and Pressure Vessel Code (Sections I and IV)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
checks:
  - reg: ASME certification page, Section I certificates
    doc: asme-bpv-cert
    quote: "PP - Pressure Piping"
  - reg: ASME certification page, Section IV certificates
    doc: asme-bpv-cert
    quote: "H - Heating Boilers/Cast Iron Sectional Heating Boiler"
  - reg: ASME Data Report Forms, Section I
    doc: asme-forms
    quote: "Manufacturers' Data Report for All Types of Boilers Except Watertube and Electric"
  - reg: ASME Data Report Forms, Section I
    doc: asme-forms
    quote: "Manufacturers' Data Report for Watertube Boilers, Superheaters, Waterwalls, and Economizers"
  - reg: ASME Data Report Forms, Section IV
    doc: asme-forms
    quote: "Manufacturer's Data Report for All types of Boilers Except Watertube and those Made of Cast Iron"
  - reg: ASME BPV-GUI-03, section 2
    doc: asme-handbook
    quote: "The H (Cast Iron and/or Cast Aluminum) Certificate of Authorization is issued for 1 year."
  - reg: ASME BPV-GUI-03, section 2
    doc: asme-handbook
    quote: "The Joint Review is conducted by an ASME Designee appointed by ASME (No Authorized Inspection Agency involvement is required)."
  - reg: ASME Required Code Books, PP and S certificates
    doc: asme-books
    quote: "Pressure Piping and Power Boilers Code Books Required BPVC Section I-Rules for Construction of Power Boilers"
---

## Where is the line between a Section I and a Section IV boiler?

The line is pressure and temperature: Section IV covers steam boilers up to 15 psi (1 bar) and hot water boilers up
to 160 psi (11 bar) and 250 °F (121 °C); anything above either limit is a power boiler under Section I. Section IV
states its limits in its scope paragraph (HG-101 in the 2025 Edition).

| | Section IV (heating boilers) | Section I (power boilers) |
|---|---|---|
| Steam boilers | Up to 15 psi (1 bar) | Above 15 psi (1 bar) |
| Hot water boilers | Up to 160 psi (11 bar) and 250 °F (121 °C) | Above 160 psi (11 bar) or above 250 °F (121 °C) |
| Typical use | Space heating, domestic hot water | Process steam, power generation, high-temperature hot water |
| ASME certificates | H; HLW for lined potable water heaters | S, plus A (assembly), E (electric), M (miniature), PP (pressure piping) |
| Main data reports | H-2, H-3; H-5 and H-5A for cast iron and cast aluminum | P-2, P-3, P-4 family |

The certificates are as ASME's [certification page](https://www.asme.org/certification-accreditation/Boiler-and-Pressure-Vessel-Certification) lists them. Section IV allows cast iron and cast
aluminum sectional boilers, which Section I does not, and its rules are simpler throughout because far less energy
is stored at low pressure.

## Which certificate does each kind of boiler need?

A power boiler is built and stamped by an S certificate holder; a heating boiler by an H holder. Section I also has
A for assembling power boilers, E for electric boilers, M for miniature boilers and PP for boiler external piping;
Section IV has HLW for lined potable water heaters. Parts makers without design responsibility can hold PRT in both
sections. Each is a separate certificate with its own joint review, though ASME's FAQ says an S holder can add A or PP
without a full new review. See [ASME stamps](/asme/stamps).

## Which data report does each use?

A Section I boiler is reported on Form P-2 (all types except watertube and electric), P-2A (electric) or P-3
(watertube boilers, superheaters, waterwalls and economizers), with P-4 for parts and P-4A for fabricated piping. A
Section IV boiler uses H-2 (all types except watertube and cast iron), H-3 (watertube) or the H-5 and H-5A master
data reports for cast iron and cast aluminum. All are free fillable PDFs on ASME's
[data report forms page](https://www.asme.org/codes-standards/publications-information/asme-data-report-forms); see [data reports](/asme/data-reports).

## Does a Section IV boiler need an Authorized Inspector?

Yes, except a cast iron or cast aluminum boiler. The H certificate for cast iron and cast aluminum boilers needs no
inspection agency agreement: ASME's handbook says it is issued for one year, renewed by an annual joint review led by
an ASME Designee with no Authorized Inspection Agency involved. Every other Section IV and Section I certificate needs
an agreement with an ASME-accredited agency, whose [Authorized Inspector](/asme/authorized-inspector) inspects the
boiler and signs its data report.

## What changes for the shop between Section I and Section IV?

Section I is stricter at every step:

- **Design**: Section I has its own formulas in Part PG (PG-27 for cylindrical shells and tubes) and sets thicknesses
  for drums, headers and tubes; Section IV's rules are simpler and include minimum thicknesses.
- **Examination**: more volumetric examination of welds under Section I.
- **Testing**: a Section I boiler is hydrostatically tested to at least 1.5 times its maximum allowable working
  pressure (PG-99); Section IV sets its own, lower test.
- **Code books**: ASME's [required list](https://www.asme.org/certification-accreditation/ASME-Certification-Process/Required-Code-Books) for an S certificate is Section I, Section II Parts A to D,
  Section V, Section IX, B31.1 Power Piping and CA-1; for H and HLW (except cast iron) it is Section II Parts A, B and
  C, Section IV, Section IX and CA-1; for cast iron H, Section IV and CA-1.

## What hydrostatic test does a Section I boiler need?

At least 1.5 times its MAWP (PG-99): a firetube boiler with an MAWP of 150 psi is tested to at least 225 psi, with
the Authorized Inspector present. The [hydrostatic test guide](/asme/hydrostatic-test) has a calculator for Section I
and Section VIII.

## Who builds the boiler external piping?

A holder of a Section I certificate that covers it: S, A or PP. Boiler external piping runs from the boiler to the
first stop valve and beyond, as Section I defines it; it is designed to [B31.1](/asme/b31-1-vs-b31-3) but is part of
the Section I boiler, inspected by the Authorized Inspector. That is why B31.1 is on the required code book list for
those certificates.

## How does this work in India?

Boilers in India are registered under the Indian Boiler Regulations, 2026, whichever ASME section they were designed
to; IBR draws its own lines for small industrial boilers. How the two fit together is in
[ASME vs IBR 2026](/asme/asme-vs-ibr).

## What does our software keep for a Section I boiler?

Our US boiler demo prints the ASME record package for a firetube boiler from the job's records: a Form P-2 layout
(our own, carrying the form's fields, not a copy of ASME's form), the weld map, WPS and PQR, QW-322 welder continuity,
MTRs by heat number, NDE, PWHT and the hydro test at 1.5 × MAWP. There are no Section IV jobs in the demo. See
[ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
