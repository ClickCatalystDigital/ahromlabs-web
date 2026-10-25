---
kind: ai-assistant
slug: data-safety
title: "Is it safe to give an AI assistant your business data?"
answer: >
  It can be, if you know what leaves your systems with each question. In the assistants Ahrom Labs builds, the
  decision model is sent the question, not your ledger; the figures come from read-only look-ups in your own
  system; a staff login can't ask what its screens hide; and the AI account is the business's own, with a daily
  limit. Ask any vendor the same four things in writing.
description: "Is it safe to connect an AI assistant to your ERP or books? What is sent with each question, read-only look-ups, role limits, your own key, what to ask."
domain: [ai, data-safety, selection]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
sources:
  - title: Digital Personal Data Protection Act, 2023, section 8
    publisher: Ministry of Law and Justice, Gazette of India
    url: https://egazette.gov.in/WriteReadData/2023/248045.pdf
    date: 2023-08-11
checks:
  - reg: Digital Personal Data Protection Act, 2023, section 8(5)
    doc: dpdp-act-2023
    quote: reasonable security safeguards to prevent personal data breach
  - reg: Digital Personal Data Protection Act, 2023, section 8(2)
    doc: dpdp-act-2023
    quote: A Data Fiduciary may engage, appoint, use or otherwise involve a Data Processor to process personal data on its behalf for any activity related to offering of goods or services to Data Principals only under a valid contract
---

"Is it safe?" has no yes-or-no answer. It has four smaller questions, and a vendor should answer each one in writing: what is sent, what the assistant can touch, who can ask what, and whose account it runs on.

## What is sent to the AI provider with each question?

Ask for the exact list. There are three common answers, and they are very different:

- **Only the question** (and the one before it, for follow-ups). The model reads it and picks a look-up and a period; your system runs the look-up and builds the table. The ledger never leaves. This is how [Atelier AI](/notes/assistant-that-answers-from-your-ledger) and Ohm answer by default: tables only.
- **The question and the rows of the answer.** Some assistants send the table to a writing model so it can phrase a sentence. That is a few rows, not the database, but it is your data, and you should be able to switch it off. In Atelier AI it only happens when a person picks a voice for the assistant; in Ohm, only in the "write" answer mode.
- **Your records, to search through.** An assistant that loads documents or tables into the model to "understand your business" sends far more. Ask what, how often, and where it is stored.

At the boiler manufacturer, Ember answers how-to questions from the system's help guide: the question and the guide sections it picked are sent, and no business data. Live-data answers are built but switched off; switching them on needs the client's approver recorded by name in Settings, because in that mode the rows of the answer go to the writing model.

## Can the assistant change anything?

It shouldn't be able to. The look-ups should be read-only queries, so the worst a wrong choice can do is show the wrong table. "Remind me to call them on Friday" should draft a task that a person saves. Test it: ask the assistant to mark an invoice paid or delete an order, and check nothing changed. This is test 6 of the [vendor test](/ai-assistant/vendor-test#read-only).

## Can a junior staff member ask what they can't see?

Only if the assistant ignores the screens' rules. Each look-up should run as the signed-in person, with the same limits as the screens: in Atelier AI staff see only their own tasks and cash entries, and payroll and bank statements are refused; Ohm answers the admin only; Ember answers each person from the guides of their own departments. Test it with a junior login.

## Whose account does it run on?

The business's own. The assistants Ahrom Labs builds use the client's own key with the AI provider (OpenRouter), set in the system's Settings, so the client pays the provider directly and can switch it off at any time. A daily question limit caps the cost: at LS Technologies the cost is about a hundredth of a rupee per question. Ask a vendor whose key it is, what the limit is, and what happens when the credit runs out.

## What happens when the AI provider is down?

The screens should carry on as before, and the assistant should get simpler, not wrong. In Savistar's system a keyword router takes over, so answers get less clever but the figures still come from the same look-ups.

## What does the law ask?

If the assistant handles personal data of staff, customers or contacts, the business is responsible for reasonable security safeguards (Digital Personal Data Protection Act, 2023, section 8(5)), and an AI provider processing personal data for you does so under a valid contract (section 8(2)). In practice: know what is sent, keep it to what the answer needs, and have the vendor's terms in writing. How the Act applies to your business is a question for your lawyer; the same lines are in the [ERP compliance guide](/erp/compliance).
