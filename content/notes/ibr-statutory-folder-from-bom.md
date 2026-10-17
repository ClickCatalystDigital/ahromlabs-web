---
kind: note
slug: ibr-statutory-folder-from-bom
title: Keeping test certificates for a boiler's IBR folder
answer: >
  A boiler manufacturer ships every boiler with an IBR statutory folder for the
  Directorate of Boilers. The system produces it — cover letter, Forms II(1), III,
  III A and IV A — from a bank of material test certificates, each unique on cert,
  cast and plate number and reused across about 3.2 boilers in the sample. The
  form set follows the boiler model; a person adds the parts, so a folder takes a
  few minutes instead of being typed up by hand.
domain: [compliance, manufacturing, quality-control]
patterns: [unconfirmed-inferences-stay-read-only, human-confirmed-extraction]
evidence:
  - metric: test certificate identity
    value: cert no. + cast no. + plate no. together — one cert number covered 4 casts in the sample
  - metric: certificate reuse
    value: about 3.2 boilers per certificate in the real sample
  - metric: form set
    value: chosen by boiler model — 8 models, each with its own set
  - metric: adding a boiler's parts to the folder
    value: a few minutes, by a person; the BOM alone doesn't fill the forms reliably
  - metric: certificate-to-part linking
    value: suggested by confidence, never applied without a person
published: 2026-09-24
updated: 2026-10-17
---

The manufacturer this was built for makes boilers, pressure-reducing stations and steam headers. Every unit it ships needs a statutory folder for the Directorate of Boilers, under the Indian Boiler Regulations (IBR): the forms that prove each plate, tube and forging came from certified material. Ahrom Labs built the operations system that now keeps the certificates and produces that folder.

## What goes into the folder?

The folder described here was filed under the Indian Boiler Regulations, 1950, so it uses their form names. IBR 2026 renumbered them on 1 October 2026: Form II(1) is now Form I Part B, Form III is Form IV Part A, Form III A is Form IV Part B, Form IV A is Form V Part B and Form XVII is Form XXII. See [the IBR 2026 forms list](/ibr/forms).

A complete folder is filed in a fixed order: a covering letter listing its contents, a documentation label, the forms, the list of mountings and fittings, a stage-wise inspection report, and copies of the material test certificates themselves. Which forms are needed depends on the boiler model — a standard shell boiler needs Form II(1), III, III A and IV A; a small industrial boiler swaps II(1) and III for Form XVII; a pressure-reducing station or steam header needs only III and IV A. The system picks the form set from the model set on the project, not from a person remembering which applies.

## Why is a test certificate harder to key than it looks?

A certificate number alone isn't unique — in the client's own sample, one certificate number covered four different casts. So each certificate in the bank is identified by certificate number, cast number and plate number together. And one certificate isn't used once: a single plate gets cut into parts for several boilers, and the sample showed each certificate reused across about 3.2 of them. Certificates and projects are therefore many-to-many — a certificate can be uploaded before any project claims it, and using it on a project's folder is what allocates it.

## Why does a person add the parts?

Form IV A lists every material part with its certificate, grouped into lettered sections — A. Shell, B. Water Wall Assembly, and so on. The bill of materials a plant keeps for buying and production isn't shaped like that form, and building the form from it alone wasn't reliable enough for paperwork an inspector relies on. So a person adds the parts to the folder and picks each one's certificate from the bank; for a boiler that takes a few minutes. Anything not yet placed lands on a clearly labelled "Ungrouped Materials" page rather than disappearing.

## Where does AI help, and where does it stop?

Certificate PDFs are read by AI on upload, so the certificate's fields don't have to be typed. Matching a certificate to the part it covers is suggested by a confidence score learned from past approvals — but on this document, a suggestion never links itself. A person clicks to use it, because a wrong link here ends up in paperwork a boiler inspector relies on. The [same-confidence note](/notes/same-confidence-different-autonomy) explains why the identical score is allowed to act on its own elsewhere in the same system.

## Boundary

The folder the system produces has been compared against real filed documents the client provided. That comparison found formatting gaps in individual forms — wording and field-layout differences — which are tracked and being closed form by form. Bulk import of historical certificates from spreadsheets isn't built yet; certificates are added one at a time, with AI filling the fields.
