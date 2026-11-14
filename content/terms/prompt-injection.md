---
kind: term
slug: prompt-injection
title: "Prompt injection"
answer: >
  An attack in which text hidden in a document, email or web page tries to give instructions to an AI model that reads it, for example to ignore its rules or send data somewhere.
domain: [truth]
order: 23
published: 2026-11-14
updated: 2026-11-14
---

Any assistant that reads outside content is exposed. The defences are structural rather than clever wording: treat everything the assistant reads as data, not instructions; give it no way to send data out on its own; keep look-ups fixed so injected text can't change what is read; and require a person's approval for every change, so an injected instruction can at most propose something visible.

See the [AI assistant security checklist](/ai-assistant/security-checklist).
