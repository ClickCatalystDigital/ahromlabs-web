---
kind: ai-assistant
slug: voice
title: "Asking your business by voice through ChatGPT or Claude"
metaTitle: "Voice AI for your ERP: ask your business out loud"
related:
  - /ai-assistant/mcp-for-erp
  - /ai-assistant/connect-chatgpt-to-erp
  - /ai-assistant/connect-claude-to-erp
  - /ai-assistant/how-it-works
  - /ai-assistant/questions
  - /ai-assistant/datum-ai
question: "Can I ask my ERP questions by voice?"
answer: >
  Yes, through the AI app you already use. Our systems don't have a voice feature of their own; their MCP connector
  plugs into ChatGPT or Claude, and where that app's voice mode can use connectors you can ask out loud: "which
  sites didn't send a daily report today?" The figures still come from fixed look-ups on your records. Voice support
  for connectors depends on the AI app, its version and your plan, so test one read-only question first.
description: "Ask your ERP out loud through ChatGPT or Claude voice mode via an MCP connector: what works, what to ask, how answers stay accurate, and what to test first."
domain: [ai, voice, mcp]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
---

## How does voice reach the ERP?

In three hops. You speak to the AI app on your phone or computer; the app turns your words into a question and,
when the question is about your business, calls the ERP's MCP connector; the connector runs the in-app assistant's
fixed look-up as you and returns the rows; the app reads the answer back. The ERP never hears your voice, only the
text question, and the AI app never works out a figure itself: it reads what the look-up returned.

| Hop | Who does it | What it handles |
|---|---|---|
| Speech to text and back | The AI app (ChatGPT, Claude) | Your words, the spoken reply |
| Choosing the tool | The AI app | Decides that "who owes us money" is a question for the ERP |
| The answer | The ERP's assistant, through the connector | A fixed look-up, with your permissions |

## What works by voice today?

Whatever the in-app assistant answers in text, as long as the AI app's voice mode can call connectors on your plan.
Voice suits short questions with short answers:

- "What happened at the store today?" (Ohm AI)
- "How do I release the BOM?" (Ember AI, where live data is switched off)
- "Which sites haven't sent their daily report?" (Datum AI)
- "Which quotations are still waiting for a reply?" (Atelier AI)
- "Remind me to call the transporter on Friday." (a draft you confirm on screen)

Long tables don't read well aloud. Ask for the top three, or ask the AI app to summarise and send the full table to
the chat.

## Is voice support guaranteed?

No, and we say so plainly. Our systems don't include a voice feature; voice comes from the AI app. Whether a given
app version's voice mode can call custom connectors, and on which plans, is decided by its maker and has changed
more than once. We haven't certified any voice setup. Before relying on it, try this:

1. Connect the ERP in the AI app as text first: see [Claude](/ai-assistant/connect-claude-to-erp) or
   [ChatGPT](/ai-assistant/connect-chatgpt-to-erp).
2. Start a voice conversation and ask one read-only question you can check on a screen.
3. Compare the spoken answer with the screen the [question library](/ai-assistant/questions) names for it.
4. If the voice mode answers from general knowledge instead of calling the connector, ask in text for that app.

## Why do numbers stay right when you speak?

Because the design keeps the model away from the figures. The in-app assistant only chooses which fixed look-up
answers the question; code runs it with the same maths as the screens; a sentence with a number that isn't in the
result is dropped. The AI app on top reads the rows it is given. The risk that remains is mishearing: "order fifteen"
heard as "order fifty". Name the customer or site as well as the number, and glance at the screen before acting on a
figure. See [how it works](/ai-assistant/how-it-works).

## Can I make changes by voice?

You can ask, but the change still waits for your yes. The connector prepares a preview and the AI app has to show
it and get your confirmation before anything is saved; deletes, payments and approvals always ask. For anything
involving money, confirm on screen, where you can read the preview. See
[actions and approvals](/ai-assistant/actions-and-approvals).

## Who is voice useful for?

- **Owners and directors** between meetings or on the road: today's dispatches, overdue milestones, who owes money.
- **Site and project managers** walking a site: material against the BOQ, which reports are missing.
- **Store and production heads** at the shop floor: what is below minimum, which purchase orders haven't arrived.

## What about privacy when speaking?

Your question and the answer pass through the AI app's provider, the same as typed text. Voice adds the audio, which
that provider handles under its own terms. Treat it like any business call in a public place, and see
[data safety](/ai-assistant/data-safety) for what an assistant sends out.
