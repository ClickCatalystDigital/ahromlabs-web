---
kind: erp
slug: contract-checklist
title: "ERP contract checklist: code ownership, licence, AMC and your data"
answer: >
  Before a custom ERP is built, settle in writing who owns the code, what the licence covers and for how long,
  what the annual maintenance contract includes and costs, how changes are priced, how fast support answers, and
  how your data comes out at any time. Both ownership models are fair if they are stated.
description: "ERP contract checklist for India: code ownership, licence term, AMC scope and cost, change pricing, support time, data export and DPDP terms."
domain: [erp, contracts, selection]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
image:
  src: /erp/erp-contract-ownership.webp
  alt: "A signed document with ticked lines, a fountain pen and a key resting on it."
  width: 1086
  height: 362
sources:
  - title: Digital Personal Data Protection Act, 2023
    publisher: Ministry of Law and Justice, Gazette of India
    url: https://egazette.gov.in/WriteReadData/2023/248045.pdf
    date: 2023-08-11
checks:
  - reg: Digital Personal Data Protection Act, 2023, section 8(2)
    doc: dpdp-act-2023
    quote: A Data Fiduciary may engage, appoint, use or otherwise involve a Data Processor to process personal data on its behalf for any activity related to offering of goods or services to Data Principals only under a valid contract
---

## Two ownership models, both fair if stated

Custom software in India is sold in one of two ways, and buyers often don't find out which until they try to leave.

| | You own the code | The vendor licenses it |
|---|---|---|
| What you pay for | The build, and the code is handed over | A working system and a licence to use it |
| After the build | You can take it to any developer | The licence runs with the maintenance contract |
| Usually costs | More up front, plus whoever maintains it | Less up front, plus the annual contract |
| Risk to watch | Code nobody else can maintain without documentation | Losing the licence if the contract ends |

Neither is wrong. What is wrong is not knowing which one you signed.

## Clauses to settle before the build

1. **Ownership.** Who owns the source code and the software. If it's licensed, what the licence covers and for how long. ([requirement](/erp/requirements#contract-ownership))
2. **Your data.** That you can export all your business data, in standard formats, at any time, including at the end. Data you can't take out ties you tighter than any clause. ([requirement](/erp/requirements#nonfunctional-data-export))
3. **Pricing.** Fixed price per phase, quoted before each phase starts, or time and materials, with a cap. ([requirement](/erp/requirements#contract-fixed-phases))
4. **Changes.** How a change is written down, priced and agreed before it is built. ([requirement](/erp/requirements#contract-changes))
5. **The maintenance contract.** What it covers (licence, hosting, fixes, small changes), what it costs per year, and what is quoted separately. ([requirement](/erp/requirements#contract-amc-scope))
6. **Support.** Response time in writing, and documentation that lets another developer take the system over. ([requirement](/erp/requirements#nonfunctional-support))
7. **Hosting and storage.** Who pays for the server and the storage, and whether storage costs are passed on at the provider's price.
8. **Personal data.** If the vendor processes personal data on your behalf (staff, customers, contacts), the Digital Personal Data Protection Act, 2023 requires a valid contract for that: section 8(2). Name the vendor's duties for safeguards and breach intimation in it.

## How Ahrom Labs does it

Stated plainly, as on the [engagement page](/engagement):

- **Ahrom Labs owns the code.** You get a working system and a licence to use it for as long as the annual maintenance contract runs; the source code stays with Ahrom Labs. If the contract stops, the licence ends with it.
- **Your data is yours** and can be exported at any time.
- **Fixed price per phase**, after a short fixed-fee modeling phase; a change is priced and agreed before it is built.
- **The AMC is 15–21% of the project value per year**, covering the licence, the server, fixes and small changes; a new module is its own phase.
- **Support** requests are answered within 48 hours at most, and every system ships with a system document any developer or agent can pick it up from.

If you need to own the code outright, say so before the build; it changes the price and the hand-over, and it is better settled first than discovered later.
