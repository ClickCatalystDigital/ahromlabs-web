---
kind: note
slug: assistant-that-answers-from-your-ledger
title: An assistant that only answers from your own records, and never invents a number
description: How the assistants in Ahrom Labs' client systems pick a fixed look-up instead of writing SQL or guessing, so every figure matches the screens.
answer: >
  The assistants Ahrom Labs builds into client systems don't let a language model
  write the answer's numbers. A small decision model only chooses what kind of
  question it is, which look-up to run and for what period; ordinary code runs a
  fixed query using the same maths as the app's own screens. At Savistar and Saag
  it routed 55 of 55 test questions and 57 unseen real phrasings correctly,
  including Hinglish.
domain: [ai, human-in-the-loop, operational-intelligence]
evidence:
  - metric: who writes the numbers
    value: code — a fixed, parameterised look-up per question type, the same maths as the app's screens
  - metric: what the model decides
    value: the kind of question, the look-up, the company, the period, whether it's a follow-up
  - metric: read-only look-ups (Savistar & Saag)
    value: 29, over clients, projects, quotations, orders, vendors, people, tasks, cash, the bank and money
  - metric: routing test
    value: 55 of 55 test questions and 57 unseen real-world phrasings, with typos, fragments and Hinglish
  - metric: written answers with a number not in the data
    value: dropped, checked by a script on every persona
  - metric: what staff can ask
    value: only their own tasks and their own cash entries; payroll and bank statements refused
published: 2026-10-20
updated: 2026-10-25
---

An owner wants to ask "how did this month compare with last month?" and get the real answer, not a confident paragraph that's nearly right. A chatbot that writes SQL, or reads rows and summarises them, will sooner or later give a figure that doesn't match the accounts. In a business system, one wrong number is enough for nobody to trust it again. So the assistants in Ahrom Labs' client systems are built so the model never produces the number, the same rule as [AI document reading](/notes/ai-extraction-human-in-the-loop), where a person approves every document before it reaches the books.

## How does a question get answered?

In two steps, and only the first uses AI. A small decision model reads the question and picks from fixed options: what kind of question it is (data, how-to, a reminder, small talk, something it can't answer), which look-up fits, which company, which period, and whether it follows on from the last question. It returns a choice, not text. Then ordinary code matches names ("the Mehtas", "Shree Plywood") to real records and runs a fixed, parameterised query. The answer is a table built with the same maths as the app's own screens, so the assistant's revenue figure and the Finance tab's figure are the same figure.

At Savistar and Saag, an interior design studio and a furniture workshop sharing one system, there are 29 of these look-ups: projects due, late workshop orders, unpaid invoices, open quotations, who worked on what, vendor balances, attendance, bank balances, period comparisons and so on. Each one is listed, with the screen to check it against, in the [question library](/ai-assistant/interior-design-firms).

## Then where does the personality come from?

From an optional sentence above the table. Savistar's assistant, Atelier AI, lets each person pick a voice: plain, studio partner, site supervisor, finance desk or a gentler guide. The written line is checked before it's shown: if it contains any number that isn't in the table, it's dropped and only the table is shown. A script runs that check on every persona.

## What happens when it can't answer?

It says so. Questions about advice, or about data the system doesn't hold, get a plain "the data doesn't have that" and a few useful questions it can answer. Every miss and every thumbs-down is listed in Settings, so the next look-up to add comes from what people actually asked rather than a guess.

## Can it change anything?

No. Look-ups are read-only. "Remind me to call the Mehtas on Friday" drafts a task and "note that they prefer walnut" drafts a private note, but nothing is saved until the person presses Save. Staff can only ask about their own tasks and their own cash entries; payroll and bank statements are refused to them, the same way the screens refuse them.

## Is it the same assistant everywhere?

The design is the same; the assistant isn't. Each one is built on its own system's records and words. [Ohm](/ai-assistant/trading-distribution), LS Technologies' assistant, answers its own staff about reels, stores, customers and stock, with a daily question limit and a cost of about a hundredth of a rupee per question. [Ember](/ai-assistant/manufacturers), at the boiler manufacturer, starts with how-to questions from the help guide, without sending any business data out. Atelier AI, Savistar's, has the personas and notes. Each one is tested with its own question set, run through the real pipeline, before it goes live. To test any vendor's assistant the same way, there is a [question library](/ai-assistant/questions), a [vendor test](/ai-assistant/vendor-test) and a [check for made-up numbers](/ai-assistant/number-check); the design is laid out for buyers in [how it works](/ai-assistant/how-it-works), and what it sends out in [data safety](/ai-assistant/data-safety).

## Boundary

The decision model is a third-party model reached through OpenRouter, using the client's own key and a daily question limit. In Savistar's system, if it's unavailable a keyword router takes over: answers get less clever, but not wrong, because the numbers still come from the same look-ups.
