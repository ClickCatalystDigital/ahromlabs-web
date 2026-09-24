# Corpus playbook — how engagement work becomes public knowledge

The one process every addition to `content/`, `src/lib/services.ts` and `src/lib/work.ts`
follows. If a change to what the site claims didn't go through these steps, it shouldn't ship.
Strategy and evidence live in `docs/knowledge-layer-plan.md`; this file is the operating
procedure.

## The strategy in one paragraph

The site is a knowledge graph, not a brochure. Nodes are **terms** (vocabulary), **patterns**
(reusable decisions), **notes** (engagement stories with numbers), **services** (what we sell)
and **clients** (who it was built for). Edges are explicit and build-checked: a note cites its
patterns; a service and a client cite the notes and patterns that prove them; every page's
JSON-LD links back to the organization, founder and services by `@id`; `/knowledge.json`
publishes every node and edge for machines; `/llms.txt` summarises it for models. Growth means
adding nodes **and** edges from real engagements — never pages without evidence behind them.

```
engagement repo SYSTEM.md ──mine──▶ candidates ──gates──▶ content/*.md ──build──▶ pages
      ▲                                                        │                   JSON-LD graph
      └───── agents check /knowledge.json before designing ◀───┘                   knowledge.json
                                                                                   llms.txt, sitemap
```

## Cadence

- **Every engagement milestone** (a dated as-built section landing in a client repo's
  `SYSTEM.md`): run steps 1–3 on that section only. Most sections produce nothing — that's fine.
- **Monthly**: steps 7–8 (measure), and one mining pass over any client `SYSTEM.md` that grew.
- **Floor**: every engagement ends with at least one pattern and one note (plan, Phase 4.3).

## 1. Mine

Source is only the **as-built** record: dated sections of a client repo's `SYSTEM.md` that say
built/verified, or the code itself. Never mine a section marked planned, deferred, "documentation
only", "not built", or "not yet live-tested" — publish those only after they ship.

For each candidate, write down: source section (e.g. `shanti-ops SYSTEM.md §5k`), the decision
or result in one sentence, and every number with where it came from.

## 2. Gate — a candidate must pass all five

1. **Verified.** Every fact traces to an as-built section or code. Numbers are measured, not
   estimated. If a number needs the founder to confirm it, it waits.
2. **Publishable.** No credentials or demo logins, no internal hostnames or file paths, no job /
   project / order numbers, no customer names of the client's customers, no GSTIN/PAN, no
   financial figures beyond what the client approved. Client *names* are cleared for the four
   businesses listed in `docs/plans-to-upgrade.md` ("Settled"); a new client needs permission first.
3. **Not a duplicate.** Check `/knowledge.json` and `content/`. If it refines an existing entry,
   update that entry (bump `updated`) instead of adding a near-copy.
4. **Right type** (below).
5. **Buyer or builder value.** Notes need a buyer who would search for it (industry language —
   "IBR form", "GSTR-3B", "offcut"). Patterns need to be reusable on a different engagement. If
   neither, it stays in the client repo.

## 3. Pick the type

| It is… | Write a | Where | Shape |
|---|---|---|---|
| A story from one client, with results a buyer would recognise | **note** | `content/notes/` | Answer-first sections, headings are buyer questions, numbers, a Boundary section |
| A decision that would be made the same way elsewhere | **pattern** | `content/patterns/` | Context → Decision → Why → Trade-off (→ As code) |
| A word we use with a specific meaning | **term** | `content/terms/` | Definition in `answer`; body only when there's more than one sentence to say |
| A new capability we now sell | **service** | `src/lib/services.ts` | Must cite ≥1 note or pattern in `proof`, or say plainly there's no client deployment yet |
| A new client, or new work for one | **client** | `src/lib/work.ts` | Highlights restate published notes; `proof` links them |

## 4. Write — the rules from Appendix B of the plan

- `answer` is 40–60 words, flat, with a number in it. It's what a retrieval system lifts.
- First 1–2 sentences of every section answer its heading. Sections survive being read alone.
- Numbers or delete it. No adjectives about ourselves.
- State the boundary: what it doesn't do, what's still open.
- Name the client in notes when cleared; patterns stay client-neutral.

## 5. Connect — every new node gets edges

- Note → `patterns:` in frontmatter (build fails on an unknown slug).
- Note/pattern → the right service's `proof` in `services.ts` and the client's `proof` in
  `work.ts` (build fails on an unknown slug). The reverse links on each page, the TechArticle
  `about`/`mentions` JSON-LD and the `/knowledge.json` edges all derive from these — never
  hand-write them.
- First mention of a glossary term in prose → link `/systems#<term>` if it adds meaning.

## 6. Validate and ship

```
npm run content:build     # frontmatter + note→pattern references
npm run build             # services/work proof references, every page prerenders
npm run lint
npm run deploy            # populates the page cache — don't deploy another way
```

Then: Search Console → URL Inspection → request indexing for each new URL; add a dated entry to
`docs/progress.md` listing what was added and from which source section.

## 7. Measure (monthly)

The four numbers from the plan's Measurement section: AI crawler hits by path (Workers logs,
`ai_crawler_hit`), AI referral sessions, the 15 citation prompts in
`docs/citation-baseline-2026-08.md`, and corpus size/freshness. Plus Search Console: indexed vs
not-indexed, and which pages get impressions.

## 8. Decide what's next from what was measured

Write more of what gets fetched and cited; update what's stale; leave alone what nobody reads.
Record the decision in `docs/progress.md` so the next session doesn't re-derive it.
