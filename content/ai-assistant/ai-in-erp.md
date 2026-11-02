---
kind: ai-assistant
slug: ai-in-erp
title: "AI in ERP: what it can safely do today"
answer: >
  AI in an ERP is safe and useful today in three jobs: answering questions from your own records through fixed,
  read-only look-ups; reading documents such as invoices and purchase orders into drafts a person checks; and
  drafting suggestions a person approves. It isn't safe yet letting a model post entries, set prices or commit
  dates by itself, because a model can be confidently wrong. Judge any "AI ERP" by what it may change without a
  person, and how it proves its numbers.
description: "AI in ERP explained for owners: the three safe uses today, what not to let it do alone, AI-native claims, and how to test any ERP's AI before buying."
domain: [ai, erp, selection]
published: 2026-11-02
updated: 2026-11-02
checked: 2026-11-02
---

## Three jobs AI does well in an ERP

| Job | What it looks like | What keeps it safe |
|---|---|---|
| **Answering questions** | "Who owes us money?", "Which orders are late?" in plain words | The model only picks the question; code runs a [fixed look-up](/systems/fixed-look-up) and a [grounding check](/systems/grounding-check) drops any sentence with a number not in the result ([how it works](/ai-assistant/how-it-works)) |
| **Reading documents** | Supplier invoices, purchase orders, freight bills and bank statements turned into draft entries | Every draft goes through a person before it is posted |
| **Drafting suggestions** | A likely match, a reorder list, a draft reply, a task | The suggestion is read-only until someone accepts it |

These are not hypothetical. Our assistants Atelier AI, Ohm AI and Ember AI answer from live business records this way ([the question library](/ai-assistant/questions) lists every question and whether it's live), and in LS Technologies' system, an electronic components trader's, 88–95% of extracted documents need no correction depending on the type, and every one is still reviewed before it is posted ([AI extraction with a person in the loop](/notes/ai-extraction-human-in-the-loop)).

## What not to let it do alone

- **Post accounting entries.** An entry that's 99% right is a wrong ledger. Extraction drafts; a person approves.
- **Set prices or quote.** Pricing rules belong in code you can read; AI can draft the inputs, such as quantities read from a drawing.
- **Commit dates or schedule machines.** A schedule has hard limits (machine hours, routing order, material on hand) that a rule or solver can guarantee and a language model can't ([where AI fits in scheduling](/manufacturing/production-scheduling-software)).
- **Decide on documents that carry your name to a customer or inspector.** Even a very accurate suggestion should wait for a person there. We run two matchers with the same scoring, one that auto-applies and one that never does, for exactly that reason ([same confidence, different autonomy](/notes/same-confidence-different-autonomy)).

The rule of thumb: AI drafts and explains; code and people decide anything that changes a record.

## "AI-native ERP" and other claims

Vendors now describe ERPs as AI-native, AI-first or agentic. The label tells you little. Three questions tell you a lot:

1. **What can the AI change without a person?** Listing, drafting and answering are low risk. Posting, ordering and emailing customers are not.
2. **Where do its numbers come from?** A model writing its own database queries, or summarising rows, will occasionally produce a figure that's nearly right ([AI hallucination](/systems/ai-hallucination)). A fixed look-up gives the same figure as the report every time.
3. **What happens when it doesn't know?** A good assistant says "the data doesn't have that". A weak one answers anyway.

## How to test it before you buy

Bring your own questions and your own documents to the demo:

- Ask five questions you already know the answers to from your reports, and compare every number. The [number check](/ai-assistant/number-check) flags any figure in an answer that isn't in the source data.
- Ask it to mark an invoice paid or delete an order. Nothing should change without a person pressing save.
- Give it a supplier invoice it hasn't seen and look at what it gets wrong, not what it gets right.
- Ask something the system can't know, like next month's demand from a customer who hasn't ordered.

The full list, with what passing and failing looks like, is in [how to test an AI assistant before you buy it](/ai-assistant/vendor-test). For choosing the ERP underneath, see [ERP for job shops](/manufacturing/job-shop-erp).
