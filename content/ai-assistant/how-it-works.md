---
kind: ai-assistant
slug: how-it-works
title: "How an AI assistant answers from your records without inventing numbers"
answer: >
  The design that keeps figures right has four parts: a small AI model only chooses which question is being
  asked; code runs a fixed, read-only look-up with the same maths as the app's screens; any written sentence with
  a number that isn't in the result is dropped; and questions the data can't answer get a plain "the data doesn't
  have that". The model never produces a figure.
description: "How the design works, for buyers: the model picks the question, code runs a fixed look-up, and sentences with numbers not in the data are dropped."
domain: [ai, design, selection]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
---

Most AI assistants on business data let the model produce the answer's figures, either by writing a database query ([text-to-SQL](/systems/text-to-sql)) or by reading rows and summarising them. Both work most of the time, and that is the problem: an owner can't tell the answer that is right from the one that is nearly right. The design below takes the figures away from the model altogether. It is how [Atelier AI, Ohm and Ember](/ai-assistant/questions) work.

## Step 1: the model only chooses

A small AI model reads the question and picks from fixed options: what kind of question it is (a figure, how to do something, a reminder, small talk, something the data can't answer), which look-up fits, which period, and whether it follows on from the last question. It returns a choice, not text. Names in the question (a client, an item, a reel number) are matched to real records by code; when two records could match, Ohm, for one, asks which one is meant.

## Step 2: code runs a fixed look-up

Each question type has a [fixed look-up](/systems/fixed-look-up): a read-only query written in advance, with only the values filled in. It uses the same maths as the app's own screens, so "who owes us money?" counts the same invoices, the same way, as the unpaid-invoices screen. The answer is shown as a table, with a link to that screen.

Because the look-ups only read, the assistant can't change anything. "Remind me to call them on Friday" drafts a task that is saved only when the person presses Save.

## Step 3: words are checked against the table

A sentence above the table is optional, in the voice the person picked. Before it is shown, a [grounding check](/systems/grounding-check) compares every number in it with the table. If any number isn't there, such as a total the writer added up, a percentage it worked out or a figure it rounded, the sentence is dropped and only the table is shown. You can run the same check on any assistant with the [number check](/ai-assistant/number-check).

## Step 4: it says what it can't answer

Advice ("should we raise prices?") and data the system doesn't hold get a plain "the data doesn't have that", with questions it can answer instead. Every question it couldn't answer, and every thumbs-down, is listed for the owner, so the next look-up to add comes from what people actually asked.

## How is it tested?

Each assistant has its own set of real questions, run through the real pipeline before it goes live: plain English, fragments, typos and Hinglish. Atelier AI routed 55 of 55 test questions and 57 unseen real phrasings correctly. The questions each assistant answers are in the [question library](/ai-assistant/questions).

## What does it cost to run?

Very little, because the model only makes a choice. At LS Technologies it is about a hundredth of a rupee per question, on the client's own AI account, with a daily question limit. What is sent to the AI provider is set out in [what leaves your server](/ai-assistant/data-safety).

## What it doesn't do

It doesn't answer questions nobody built a look-up for, and it doesn't search documents. Questions over drawings, certificates and past decisions are a different design, [retrieval and knowledge graphs](/services/rag-knowledge-graphs), where each answer shows the document it came from. The full engineering note is [an assistant that only answers from your own records](/notes/assistant-that-answers-from-your-ledger).
