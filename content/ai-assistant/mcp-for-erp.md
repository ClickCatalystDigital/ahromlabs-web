---
kind: ai-assistant
slug: mcp-for-erp
title: "MCP for ERP: let ChatGPT and Claude use your business system"
metaTitle: "MCP server for ERP: ChatGPT and Claude on your data"
related:
  - /ai-assistant/connect-claude-to-erp
  - /ai-assistant/connect-chatgpt-to-erp
  - /ai-assistant/actions-and-approvals
  - /ai-assistant/security-checklist
  - /systems/model-context-protocol
  - /services/custom-ai-assistant
question: "What is an MCP connector for an ERP, and what can it do?"
answer: >
  An MCP (Model Context Protocol) connector lets an AI app such as ChatGPT or Claude sign in to your ERP as you and
  use it: ask questions in plain words and get the same answers the in-app assistant gives, and prepare changes that
  you approve before anything is written. In our systems it has three tools (ask, prepare a change, make the
  approved change), works only for the person who signed in, with that person's permissions, and is switched off in
  the public demos.
description: "What an MCP connector to your ERP does: ChatGPT or Claude signs in as you, asks business questions and prepares changes you approve. Tools, sign-in, limits."
domain: [ai, mcp, integration]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
image:
  src: /ai/ai-mcp-for-erp.webp
  alt: "A brass plug and its wall socket on a wooden board, a key tag on the plug: connecting an AI app to your business system."
  width: 1086
  height: 362
---

## What is MCP?

The [Model Context Protocol](/systems/model-context-protocol) is an open standard for connecting AI apps to other
software. The software runs an MCP server that lists a few tools, each with a name, a description and the inputs it
takes; the AI app reads the list and decides which tool to call while it talks to you. Claude, ChatGPT and a growing
list of other AI apps can add an MCP server as a connector, so one connector works across them. You are not tied to one AI
company: if a better AI app arrives next year and supports MCP, the same connector works with it.

For a business system this means the AI app you already use every day can reach your stock, orders, projects and
dues, instead of you exporting a spreadsheet and pasting it into a chat.

## What does our MCP connector expose?

Every system we build has the same three tools, generated from the same registries as its in-app assistant, so the AI
app does exactly what the in-app assistant does and nothing more:

| Tool | What it does | Writes anything? |
|---|---|---|
| ask | Sends your question to the in-app assistant (Ember AI, Ohm AI, Atelier AI or Datum AI) and returns its answer: rows from a fixed look-up, how-to steps, or a refusal | No |
| propose_action | Prepares one change (a new enquiry, a task, a payment entry) and returns a preview, anything missing, and a confirm token valid for 10 minutes | No |
| confirm_action | Makes the change you approved, through the same route the screen uses, as you | Yes, only with a valid token |

The `ask` tool returns data as plain rows (capped at 50 per table) with the look-up's name and filters, so the AI app
reads the figures from your records rather than working them out. That keeps the
[no-invented-numbers design](/ai-assistant/how-it-works) intact even when a general chatbot is the one asking.

## Who can use it?

Only someone with a login. The AI app signs in with OAuth, the same "Connect" flow you see for Google Drive or
GitHub: the AI app opens our sign-in page, you log in, approve, and the AI app gets a token tied to your account. An
AI app key made in Settings works the same way for apps that don't do OAuth. Every call runs as you, so your role
decides what comes back, and each system sets who may connect at all: owners and admins in Designer Ops and
SiteBook, managers and admins in SB Ops, the admin who connects it in Inventory Ops. A login that can't see customer
money on screen can't see it through Claude either.

Requests from web pages on other sites are refused, as the MCP specification requires, so a page you happen to have
open can't drive the connector.

## What can I ask through it?

Anything the in-app assistant answers: the questions in the [question library](/ai-assistant/questions) for your
industry. Some examples that work today:

- "Which purchase orders are confirmed but not dispatched?" (Ohm AI, electronic component trading)
- "Is a site using more material than the BOQ allows?" (Datum AI, construction)
- "Which milestones are overdue?" (Atelier AI, interior design and furniture)
- "How do I release the BOM?" (Ember AI, boiler manufacturing)

Because the AI app is a general assistant, you can also ask it to combine an answer with what it already knows: "list
the overdue milestones and draft a polite update to each client". The figures come from the `ask` tool; the
wording is the AI app's.

## How do changes work?

Nothing is written without two steps. The AI app calls `propose_action`, shows you the preview, and only after you
agree calls `confirm_action` with the token. The token expires in 10 minutes and belongs to the person who proposed
it, and the change runs through the app's own route, so every validation and permission check on the screen applies.
Deletes, payments and approvals always ask, whatever your settings. See
[actions and approvals](/ai-assistant/actions-and-approvals).

## How is this different from giving ChatGPT a database login?

Very. A database login lets the model write any query and read any table; a wrong join gives a confident wrong total,
and nothing stops a query from reading salaries. Our connector exposes three tools, each running code we wrote and
tested: fixed look-ups for figures, checked actions for changes, and the same role rules as the screens. See
[ChatGPT vs an ERP assistant](/ai-assistant/chatgpt-vs-erp-assistant) and
[text-to-SQL](/systems/text-to-sql).

## Can I try it on the demo?

Not yet. The connector is switched off in the public demos, because a demo login is shared and anyone could connect
it. The in-app assistant on each demo answers the same questions; the connector is enabled on a client's own system
once the client approves it. To see it on your data, [book a call](/#contact).

## What should I check before connecting any ERP to an AI app?

- Which tools the server lists, and whether any of them writes without a confirm step.
- Whether it signs in as you (OAuth or a personal key) or uses one shared service account.
- Whether figures come from fixed look-ups or from the model writing queries.
- Whether you can revoke the connection, and see when it was last used.
- What the AI app's provider does with the data it receives; see [data safety](/ai-assistant/data-safety).

The full list is in the [security checklist](/ai-assistant/security-checklist).
