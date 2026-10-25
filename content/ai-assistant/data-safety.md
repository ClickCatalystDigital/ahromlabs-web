---
kind: ai-assistant
slug: data-safety
title: "What an AI assistant sends out, under India's DPDP Act"
answer: >
  Ask what is sent to the AI provider with each question. It is one of three things: the question only, the
  question with the rows of the answer, or your records themselves. Ahrom Labs' assistants send the question
  only by default. Under India's DPDP Act the business stays responsible for safeguards, breach notice and
  erasure, including at its AI provider; the Rules putting those duties into effect start in May 2027.
description: "What an AI assistant sends to the AI provider with each question, and what India's DPDP Act and Rules require of the business, with start dates."
domain: [ai, data-safety, dpdp, selection]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
image:
  src: /ai/ai-data-safety.webp
  alt: "A closed steel lockbox with a key in the lock."
  width: 1086
  height: 362
sources:
  - title: Digital Personal Data Protection Act, 2023
    publisher: Ministry of Law and Justice, Gazette of India
    url: https://egazette.gov.in/WriteReadData/2023/248045.pdf
    date: 2023-08-11
  - title: Digital Personal Data Protection Rules, 2025 (G.S.R. 846(E))
    publisher: Ministry of Electronics and Information Technology, Gazette of India
    url: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf
    date: 2025-11-13
checks:
  - reg: Digital Personal Data Protection Act, 2023, section 8(5)
    doc: dpdp-act-2023
    quote: reasonable security safeguards to prevent personal data breach
  - reg: Digital Personal Data Protection Act, 2023, section 8(2)
    doc: dpdp-act-2023
    quote: A Data Fiduciary may engage, appoint, use or otherwise involve a Data Processor to process personal data on its behalf for any activity related to offering of goods or services to Data Principals only under a valid contract
  - reg: Digital Personal Data Protection Act, 2023, section 8(6)
    doc: dpdp-act-2023
    quote: the Data Fiduciary shall give the Board and each affected Data Principal, intimation of such breach in such form and manner as may be prescribed
  - reg: Digital Personal Data Protection Act, 2023, section 8(7)(a)
    doc: dpdp-act-2023
    quote: erase personal data, upon the Data Principal withdrawing her consent
  - reg: Digital Personal Data Protection Act, 2023, section 8(7)(b)
    doc: dpdp-act-2023
    quote: cause its Data Processor to erase any personal data that was made available by the Data Fiduciary for processing to such Data Processor
  - reg: Digital Personal Data Protection Rules, 2025, rule 1(4)
    doc: dpdp-rules-2025
    quote: Rules 3, 5 to 16, 22 and 23 shall come into force eighteen months after the date of publication
  - reg: Digital Personal Data Protection Rules, 2025, rule 6(1)(f)
    doc: dpdp-rules-2025
    quote: appropriate provision in the contract entered into between such Data Fiduciary and such a Data Processor, wherever applicable, for taking reasonable security safeguards
  - reg: Digital Personal Data Protection Rules, 2025, rule 7(2)(b)
    doc: dpdp-rules-2025
    quote: within seventy-two hours of becoming aware of the breach, or within such longer period as the Board may allow on a request made in writing in this behalf
  - reg: Digital Personal Data Protection Rules, 2025, rule 15
    doc: dpdp-rules-2025
    quote: Any personal data processed by a Data Fiduciary under the Act may be transferred outside the territory of India subject to the restriction that the Data Fiduciary shall meet such requirements as the Central Government may, by general or special order, specify
---

An AI assistant on your system sends something to an AI provider every time someone asks a question. Whether that is safe depends on exactly what is sent, so start there, and get the vendor's answer in writing.

## What is sent with each question?

There are three designs, and they send very different amounts:

| Design | What goes to the AI provider | Ahrom Labs' assistants |
|---|---|---|
| The model only chooses | The question, and the one before it for follow-ups | Atelier AI and Ohm AI by default; Ember AI for how-to answers (the question and the help-guide sections picked) |
| The model writes the answer | The question and the rows of the answer | Atelier AI when a person picks a voice for it; Ohm AI in its "write" answer mode; Ember AI's live-data answers, built and switched off at the client |
| The model reads your records | Documents or tables, loaded so it can "understand the business" | None |

In the first design the ledger never leaves: the model picks a look-up and a period, and your own system runs it and builds the table. [How it works](/ai-assistant/how-it-works) explains the design. The second design sends a few rows per answer: not the database, but your data, so you should be able to switch it off. The third sends the most: ask what, how often, and where it is kept.

Ember AI's live-data answers are switched on only when the client's approver is recorded by name in Settings, because in that mode the rows of each answer go to the writing model. On the public demo they are on, with a sample company.

## Can the assistant change anything?

It shouldn't be able to. Look-ups should be read-only queries, so the worst a wrong choice can do is show the wrong table. "Remind me to call them on Friday" should draft a task that a person saves. Ask it to mark an invoice paid or delete an order, and check nothing changed: test 6 of the [vendor test](/ai-assistant/vendor-test#read-only).

## Can a junior staff member ask what they can't see?

Only if the assistant ignores the screens' rules. Each look-up should run as the signed-in person, with the same limits as the screens:

- **Atelier AI:** staff see only their own tasks and cash entries; payroll, advances and bank statements are refused to them.
- **Ohm AI:** answers LS Technologies' own staff, never the partner store's logins or customers; its settings are for the admin.
- **Ember AI:** answers each person from the guides of their own departments, and each live-data look-up follows the same department limits as the screens.

Test it with a junior login.

## Whose account does it run on, and what does it cost?

The business's own. Ahrom Labs' assistants use the client's own key with the AI provider (OpenRouter), set in the system's Settings, so the client pays the provider directly and can switch it off at any time. A daily question limit caps the cost: at LS Technologies it is about a hundredth of a rupee per question. Ask a vendor whose key it is, what the limit is, and what happens when the credit runs out.

## What happens when the AI provider is down?

The screens carry on as before, and the assistant should get simpler, not wrong. In Savistar's system a keyword router takes over, so answers get less clever but the figures still come from the same look-ups.

## What does India's DPDP Act ask of the business?

If the assistant handles personal data (names and details of staff, customers or contacts), the business is the Data Fiduciary and the AI provider is its Data Processor. The duties stay with the business:

| Duty | Where it is | Starts |
|---|---|---|
| Reasonable security safeguards, including at the processor | Act section 8(5); rule 6 | May 2027 |
| A valid contract with the processor, with safeguards in it | Act section 8(2); rule 6(1)(f) | May 2027 |
| Breach notice to the Data Protection Board and each person affected, without delay, then a detailed report to the Board within 72 hours | Act section 8(6); rule 7 | May 2027 |
| Erase the data when consent is withdrawn or the purpose is served, and cause the processor to erase it | Act section 8(7) | With the rule on retention, rule 8: May 2027 |
| Transfer outside India allowed, subject to requirements the Government may set | Act section 16; rule 15 | May 2027 |

"May 2027" is rule 1(4): the rules that set out these duties come into force eighteen months after the Rules were published on 13 November 2025. Rules on the Data Protection Board itself are already in force. The Act's own sections are brought into force by separate notification, so check which are in force on the date you sign.

What it means for an assistant, in practice:

- **Know where the model runs.** A provider like OpenRouter routes to models run outside India. That is allowed under rule 15, but you should know which countries, and that the contract covers it.
- **Send only what the answer needs.** The question-only design sends no personal data unless the question itself contains some.
- **Put it in the contract.** Safeguards, breach notice to you, and erasure at the provider, as rule 6(1)(f) and section 8(7) expect.

How the Act applies to your business is a question for your lawyer. The same rules, for the system underneath, are in the [ERP compliance guide](/erp/compliance).
