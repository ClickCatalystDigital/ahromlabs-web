---
kind: note
slug: ibr-statutory-folder-from-bom
title: Generating a boiler's IBR statutory folder from its BOM and test certificates
answer: >
  Shanti Boilers ships every boiler with an IBR statutory folder for the
  Directorate of Boilers. The system builds it — cover letter, Forms II(1), III, III A and
  IV A — from the project's bill-of-materials tree and a bank of material test
  certificates, each unique on cert, cast and plate number and reused across
  about 3.2 boilers in the sample.
domain: [compliance, manufacturing, quality-control]
patterns: [unconfirmed-inferences-stay-read-only, human-confirmed-extraction]
evidence:
  - metric: test certificate identity
    value: cert no. + cast no. + plate no. together — one cert number covered 4 casts in the sample
  - metric: certificate reuse
    value: about 3.2 boilers per certificate in the real sample
  - metric: form set
    value: chosen by boiler model — 8 models, each with its own set
  - metric: Form IV A sections
    value: derived from the BOM tree, no hardcoded section names
  - metric: certificate-to-part linking
    value: suggested by confidence, never applied without a person
published: 2026-09-24
updated: 2026-09-24
---

Shanti Boilers & Pressure Vessels manufactures boilers, pressure-reducing stations and steam headers. Every unit it ships needs a statutory folder for the Directorate of Boilers, under the Indian Boiler Regulations (IBR): the forms that prove each plate, tube and forging came from certified material. Ahrom Labs built the operations system that now assembles that folder from data the plant already records.

## What goes into the folder?

A complete folder is filed in a fixed order: a covering letter listing its contents, a documentation label, the forms, the list of mountings and fittings, a stage-wise inspection report, and copies of the material test certificates themselves. Which forms are needed depends on the boiler model — a standard shell boiler needs Form II(1), III, III A and IV A; a small industrial boiler swaps II(1) and III for Form XVII; a pressure-reducing station or steam header needs only III and IV A. The system picks the form set from the model set on the project, not from a person remembering which applies.

## Why is a test certificate harder to key than it looks?

A certificate number alone isn't unique — in the client's own sample, one certificate number covered four different casts. So each certificate in the bank is identified by certificate number, cast number and plate number together. And one certificate isn't used once: a single plate gets cut into parts for several boilers, and the sample showed each certificate reused across about 3.2 of them. Certificates and projects are therefore many-to-many — a certificate can be uploaded before any project claims it, and using it on a project's folder is what allocates it.

## How does the BOM become Form IV A?

Form IV A lists every material part with its certificate, grouped into lettered sections — A. Shell, B. Water Wall Assembly, and so on. The system doesn't store those section names. It walks the project's bill-of-materials tree, takes each part's ancestor one level below the root as its section, and letters only the sections that actually contain parts. A boiler with a different structure gets different sections automatically; anything not yet placed in the tree lands on a clearly labelled "Ungrouped Materials" page rather than disappearing.

## Where does AI help, and where does it stop?

Certificate PDFs are read by AI on upload, so the certificate's fields don't have to be typed. Matching a certificate to the BOM line it belongs to is suggested by a confidence score learned from past approvals — but on this document, a suggestion never links itself. A person clicks to use it, because a wrong link here ends up in paperwork a boiler inspector relies on. The [same-confidence note](/notes/same-confidence-different-autonomy) explains why the identical score is allowed to act on its own elsewhere in the same system.

## Boundary

The generated folder has been compared against real filed documents the client provided. That comparison found formatting gaps in individual forms — wording and field-layout differences — which are tracked and being closed form by form. Bulk import of historical certificates from spreadsheets isn't built yet; certificates are added one at a time, with AI filling the fields.
