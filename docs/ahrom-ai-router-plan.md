# Ahrom AI with Jev: plan

**Built 20 Oct 2026** (results at the end). `src/lib/ahrom-ai.ts`, `src/app/api/ahrom-ai/route.ts`,
`scripts/check-chat-answers.mjs` (`npm run chat:check`), `scripts/ahrom-ai.check.ts`.

20 Oct 2026. How the site chat should answer typed questions: fast when we already have the answer,
written by Gemma when we don't, and never wrong about our own terms.

## Why change

Today the chat is Cloudflare AI Search: retrieval plus a Workers AI model. Measured on 20 Oct 2026:

| Model | Problem |
|---|---|
| Llama 3.3 70B (live) | Says "not covered" to questions the site answers ("Who owns the code?", industries, go-live), even with the right passage ranked first |
| Mistral Small 3.1 | Said "You own the code", the opposite of the top passage |
| gpt-oss-120b | Printed its own reasoning; invented a 4–6 month go-live |
| Gemma 4 on Workers AI | 22–100 s to the first word |

About 7 s of every reply is retrieval, whatever the model. The four suggested questions already have
fixed answers (`src/lib/ai-chat-presets.ts`) and are right every time; typed questions are the problem.

## The design: the SB Ops pattern, for a website

SB Ops' help assistant (`shanti-ops/server/api/assistant/chat/route.js`) already does this in
production: a word-match shortlist, **one Jev call** that picks the section and says whether the
question is plain enough to answer with that section's text as it is, and Gemma only when writing is
needed. Same here, with `/knowledge.json` as the guide.

```
visitor question
  │
  ├─ exact suggested question ──────────────────────────► fixed answer (today, ~0.5 s)
  │
  ├─ shortlist (no network): core nodes + word matches, ~30 options
  │
  ├─ Jev (typesafe/jev-1.13, one call) picks:
  │     kind:    about_us | small_talk | out_of_scope | contact_me
  │     node:    which shortlisted entry answers it, with a probability
  │     as_is:   can that entry's answer be shown as it is?
  │
  ├─ kind = small_talk ──────────► one-line canned reply in character (no writer)
  ├─ kind = contact_me ──────────► canned reply + contact link (no writer)
  ├─ node sure (≥ 0.75) and as_is ► the entry's own answer + its link   (fast path, ~1–2 s)
  ├─ node unsure (0.3–0.75) ─────► Gemma writes from the top 1–3 entries' text (streamed)
  └─ node none / < 0.3 ──────────► "The site doesn't cover that" + contact link, and the
                                    question is logged as a miss
```

What each piece is for:

- **Jev decides, never writes.** It returns a choice and a probability, so it can't invent a figure
  or flip "ours" into "yours". Every fast-path answer is our own published sentence.
- **Gemma writes only when the question needs combining or rephrasing** ("can you do payroll and
  Tally together?", Hinglish), from the 1–3 entries Jev picked, with the SB Ops rules: answer from
  the text, copy figures exactly, link the page.
- **The miss list** shows what visitors ask that the site doesn't answer. That is the content
  backlog, not a guess.

### The shortlist (no network, instant)

`/knowledge.json` has 125 entries, each with a title, an answer-first `answer` and a `body`. Jev
picks well from about 30 options, not 125, so:

- **Always in (about 25):** the 14 buyer questions in `engagement.ts`, the 5 service families, the 3
  industries, the 3 named clients. Most business-owner questions land here.
- **Plus word matches (up to about 15)** on title and answer, with simple stemming. Add a small
  synonym map: karigar → worker wage, kharcha/price/rate → cost, hajri → attendance, so Hinglish
  reaches the right entry.
- The 34 IBR forms only come in on a word match (an "IBR" or "form" word), so they don't crowd
  out business questions.

### Where it runs

A new route `src/app/api/ahrom-ai/route.ts` in this Next app (already on Cloudflare Workers, like
`/api/contact`). The chat panel calls it instead of the AI Search endpoint. The answer streams as
plain text, with the sources in a header, which is how SB Ops does it.

- **Secret:** `OPENROUTER_KEY`, the same OpenRouter key the CRM uses for Jev (Pujan's decision,
  20 Oct 2026: one account, about ₹500 of credit, few visitors yet). The CRM and the site share
  that credit, so the rate limits below are what stop the site from using it up.
- **Abuse limits:** a new rate-limit binding (like `FORM_LIMITER`): about 10 questions a minute and
  60 a day per visitor IP. Questions capped at 500 characters, history at the last 6 turns.
- **Fallback:** if Jev or OpenRouter is down or out of credit, the route answers from the shortlist's
  best word match as it is. If even that fails, the chat falls back to AI Search (today's path),
  so it never goes silent.
- **Logging:** each question's decision (kind, node, probability, path taken, latency) goes to a
  `chat_questions` table in the CRM D1 database, which the site already binds. Misses then show in
  the CRM. The question text is visitor input, so the privacy page gets one sentence saying site chat
  questions are kept to improve answers.

### What it costs

Per question: one Jev call, plus a Gemma call only on the writing path. Both are OpenRouter
pay-per-use, small at this traffic. To be confirmed in step 0 with real numbers; the key's spend limit
caps it either way.

## Steps

0. **Measure before building (needs the new key).** Time Jev and Gemma 4 on OpenRouter for 10
   questions: Jev's decision time, and Gemma's time to first word with its thinking switched off.
   Go/no-go: Jev under about 1.5 s, and Gemma's first word under about 3 s. If Gemma can't get there,
   the writing path uses a faster OpenRouter model and Gemma stays for the CRM.
1. **The answer check first** (`scripts/check-chat-answers.mjs`): about 30 business-owner questions,
   each run twice, with must-say and must-not-say patterns ("Who owns the code?" must not say the client
   owns it; go-live must say days or weeks; leaked reasoning fails). Run it on today's AI Search chat
   for a baseline. The new route has to beat it.
2. **The shortlist and Jev decision**, as pure functions with a small self-check, plus a `dry` mode
   that returns the decision without an answer (as SB Ops has) for testing.
3. **The route:** fast path, Gemma path, canned replies, fallback, rate limit, logging.
4. **The panel:** call the route; keep streaming, source chips and faces. Faces map to the path: fast
   path → happy or idea, miss → sorry, small talk → wink.
5. **Run the check** against the route on localhost (the dev server can read the key from
   `.dev.vars`), then deploy, run it live, and write the scores into `docs/site-architecture.md`.

Steps 1 and 2 don't depend on each other and can run in parallel; 3 needs 2; 4 needs 3.

## Decisions for Pujan

1. ~~New key~~ Decided: reuse the CRM's key. Pujan sets it with `npx wrangler secret put OPENROUTER_KEY`
   here, and adds it to `.dev.vars` for local testing.
2. **Log visitor questions to the CRM?** Recommended yes (the miss list is how answers improve),
   with the privacy-page sentence.
3. **Keep AI Search as the fallback?** Recommended yes: it costs nothing when unused and keeps the
   chat answering if OpenRouter is down.

## Results (20 Oct 2026, localhost against the live OpenRouter key)

| | AI Search chat (before) | Jev route (now) |
|---|---|---|
| `npm run chat:check`, 29 questions × 2 runs | 19/29 | **29/29** |
| Typical reply | 5–25 s | 0.5 s (our own answer), 2–4 s (Gemma writing) |
| Jev decision | | 0.5–0.9 s |
| Gemma 4 via OpenRouter, thinking off | | first word 1.7–2.2 s |
| Cost per question | | about US$0.00011 (₹0.01), measured on the key's usage |

Built beyond the plan: pure greetings, thanks and "who are you" are answered before Jev (no paid
call on the commonest openers); an industries overview entry and an About entry; the suggested
questions' fixed answers are entries too; FAQ entries include their details. Not built yet: the
question log (decision 2).
