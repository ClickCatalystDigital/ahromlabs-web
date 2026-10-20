// Ahrom AI's router (docs/ahrom-ai-router-plan.md): the site's own answers as
// entries, a word-match shortlist, and the questions put to Jev. Pure functions
// only; the network calls live in src/app/api/ahrom-ai/route.ts. The design is
// SB Ops' help assistant (shanti-ops/lib/assistant-help.mjs), with the website's
// content as the guide.
import { getContent } from "./content";
import { engagementAnswers } from "./engagement";
import { services, families, serviceUrl, familyUrl } from "./services";
import { engagements } from "./work";
import { chatPresets } from "./ai-chat-presets";

const site = "https://ahromlabs.com";

export type Entry = {
  id: string;
  // What the entry is about, in the words a visitor would use: a question where we have one.
  title: string;
  // Answer-first text, shown as it is on the fast path. Our own published words.
  answer: string;
  url: string;
  sourceTitle: string;
  // Always on the shortlist: the questions business owners ask most.
  core?: boolean;
  // Only shortlisted on an IBR word, so 34 forms don't crowd out business questions.
  ibr?: boolean;
};

export function buildEntries(): Entry[] {
  const out: Entry[] = [];
  // What Ahrom Labs is, in the About page's words.
  out.push({
    id: "overview/about",
    title: "What does Ahrom Labs do, and who runs it?",
    answer:
      "Ahrom Labs is an industrial systems engineering practice: we map how a factory or trading house actually runs, then build the systems it runs on, from sales and stores to accounts and payroll. It is run by Pujan Motiwala, Principal, who does the modeling, writes the code and answers your first message, from Ahmedabad, with clients across India.",
    url: `${site}/about`,
    sourceTitle: "About",
    core: true,
  });
  // The suggested questions' fixed answers: what we build, the demos, cost, how soon.
  chatPresets.forEach((p, i) =>
    out.push({ id: `preset/${i}`, title: p.question, answer: p.answer, url: p.sources[0].url, sourceTitle: p.sources[0].title, core: true }),
  );
  for (const a of engagementAnswers) {
    // The details too: "who pays for the server?" is answered in the hosting answer's detail.
    const answer = [a.answer, ...(a.detail ?? [])].join(" ");
    out.push({ id: `faq/${a.id}`, title: a.question, answer, url: `${site}/engagement#${a.id}`, sourceTitle: "Pricing, licensing and support", core: true });
  }
  for (const f of families) {
    out.push({ id: `family/${f.slug}`, title: `${f.plainName} (${f.shortName})`, answer: f.summary, url: `${site}${familyUrl(f)}`, sourceTitle: f.shortName, core: true });
  }
  for (const s of services) {
    const url = `${site}${serviceUrl(s)}`;
    out.push({ id: `service/${s.slug}`, title: `${s.plainName}: ${s.name}`, answer: s.answer, url, sourceTitle: s.name });
    s.questions.forEach((q, i) => out.push({ id: `service/${s.slug}#${i}`, title: q.q, answer: q.a, url, sourceTitle: s.name }));
  }
  for (const e of engagements) {
    // An anonymous client's `client` is a description, never a name, so it is safe to show.
    out.push({ id: `client/${e.slug}`, title: `${e.client} (${e.industry})`, answer: `${e.client}: ${e.built}`, url: `${site}/work#${e.slug}`, sourceTitle: "Work", core: true });
  }
  // One entry for "which industries / who have you worked with?": no single page says it in a sentence.
  out.push({
    id: "overview/industries",
    title: "Which industries and businesses have you worked with?",
    answer:
      "We've built systems in " +
      engagements
        .map((e) => `${e.industry.split(" — ")[0].replace(/^./, (c) => c.toLowerCase())} (${e.anonymous ? "a client we don't name" : e.client})`)
        .join(", ")
        .replace(/, ([^,]*)$/, ", and $1") +
      `. The industry pages show what each system does: ${site}/industries`,
    url: `${site}/industries`,
    sourceTitle: "Industries",
    core: true,
  });
  const segment = { note: "notes", pattern: "patterns", industry: "industries", guide: "ibr" } as const;
  for (const kind of ["industry", "note", "pattern", "guide"] as const) {
    for (const c of getContent(kind)) {
      out.push({
        id: `${kind}/${c.slug}`, title: c.title, answer: c.answer, url: `${site}/${segment[kind]}/${c.slug}`, sourceTitle: c.title,
        core: kind === "industry", ibr: kind === "guide",
      });
    }
  }
  return out;
}

// ---------- shortlist ----------

const STOP = new Set("a an and are as at be by can do does for from have how i in is it me my of on or our so that the their them this to us we what when where which who why will with you your".split(" "));

// Hinglish and buyer words -> the words the pages use, so "kharcha" finds the cost answer.
const SYNONYMS: Record<string, string[]> = {
  kharcha: ["cost", "price"], kitna: ["cost"], kimat: ["price", "cost"], keemat: ["price", "cost"], price: ["cost"], rate: ["cost", "price"], budget: ["cost"], charge: ["cost", "price"], fees: ["cost", "price"],
  karigar: ["worker", "wage", "daily"], mazdoor: ["worker", "wage", "labour"], labour: ["wage", "worker"], labor: ["labour", "wage"], hajri: ["attendance"], pagar: ["payroll", "wage"], salary: ["payroll", "wage"],
  hisaab: ["accounts", "ledger"], hisab: ["accounts", "ledger"], khata: ["ledger", "accounts"], bahi: ["ledger", "accounts"],
  maal: ["stock", "inventory"], godown: ["stores", "stock", "warehouse"], warehouse: ["stores", "stock"],
  bill: ["invoice"], bills: ["invoice"], challan: ["dispatch", "delivery"], tally: ["tallyprime"], tallyprime: ["tally"],
  boiler: ["ibr"], demo: ["demo", "live"], owns: ["own", "ownership", "code"], source: ["code"], live: ["live", "go"],
};

// Lower-case words, stop words out, a light plural/ending trim, synonyms added.
export function words(text: string): string[] {
  const out: string[] = [];
  for (const raw of text.toLowerCase().match(/[a-z0-9]{2,}/g) ?? []) {
    if (STOP.has(raw)) continue;
    const w = raw.length > 4 ? raw.replace(/(ies|es|s|ing|ed)$/, "") : raw;
    out.push(w, ...(SYNONYMS[raw] ?? []), ...(SYNONYMS[w] ?? []));
  }
  return [...new Set(out)];
}

const IBR_WORD = /\b(ibr|boiler|form|regulation|inspector|cbb)/i;

// The core entries plus the best word matches, at most `limit` in all.
export function shortlist(entries: Entry[], question: string, limit = 40): Entry[] {
  const q = words(question);
  const ibrQuestion = IBR_WORD.test(question);
  const scored = entries
    .filter((e) => !e.core && (!e.ibr || ibrQuestion))
    .map((e) => {
      const t = new Set(words(e.title));
      const a = new Set(words(e.answer));
      let score = 0;
      for (const w of q) score += (t.has(w) ? 3 : 0) + (a.has(w) ? 1 : 0);
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score);
  const core = entries.filter((e) => e.core);
  return [...core, ...scored.slice(0, Math.max(0, limit - core.length)).map((x) => x.e)];
}

// ---------- Jev ----------

export const JEV_MODEL = "typesafe/jev-1.13"; // pinned, as in the CRM: a newer version could choose differently

export const KINDS = {
  about_us: "A question about Ahrom Labs or the systems it builds: what it builds, for whom, prices, timelines, terms, support, demos, Tally, IBR, any feature or industry.",
  small_talk: "A greeting, thanks, a compliment, a joke, or chat that isn't a question about the business.",
  contact_me: "They want to talk to a person, book a call or meeting, get a quote for their project, or hire Ahrom Labs.",
  out_of_scope: "A question about something unrelated to Ahrom Labs and business systems, such as the weather, general coding help or another company.",
} as const;
export type Kind = keyof typeof KINDS;

// Options are keyed e0, e1, … so an entry's title can hold any characters.
export function jevQuestions(list: Entry[]) {
  return {
    kind: { type: "choice", instructions: "What kind of message is the latest message?", criteria: KINDS },
    entry: {
      type: "choice",
      instructions: "Which entry from Ahrom Labs' website answers the latest message?",
      criteria: {
        ...Object.fromEntries(list.map((e, i) => [`e${i}`, `${e.title}: ${e.answer.replace(/\s+/g, " ").slice(0, 160)}`])),
        none: "None of these entries is about what the latest message asks",
      },
    },
    as_is: {
      type: "noul",
      instructions:
        "Is the latest message a plain question in English that the best-matching entry's answer answers as written: one topic, no comparison or combination of topics, no follow-up that depends on an earlier message?",
    },
  };
}

// A choice answer -> its options, most likely first.
export function ranked(answer: { choice?: string; probabilities?: Record<string, number> } | undefined) {
  const probs = answer?.probabilities ?? (answer?.choice ? { [answer.choice]: 1 } : {});
  return Object.entries(probs)
    .map(([key, p]) => ({ key, p: Number(p) || 0 }))
    .sort((a, b) => b.p - a.p);
}

export type Route =
  | { path: "entry"; entry: Entry; p: number } // shown as it is
  | { path: "write"; entries: Entry[]; p: number } // Gemma writes from these
  | { path: "small_talk" | "contact" | "miss" };

// Jev's answers -> what to do. Thresholds as in SB Ops: sure at 0.75, guessing under 0.3.
export function route(list: Entry[], answers: Record<string, { choice?: string; probabilities?: Record<string, number>; noul?: number } | undefined>): Route {
  const kind = ranked(answers.kind)[0];
  const entries = ranked(answers.entry);
  const best = entries[0];
  const pick = (key: string) => list[Number(key.slice(1))];
  // When Jev is fairly sure an entry fits (60%+), small talk and "unrelated" need 90% to win:
  // "hey, do you do payroll?" is a question, not a greeting.
  const entryFits = best && best.key !== "none" && best.p >= 0.6;
  if (kind?.key === "contact_me" && !entryFits) return { path: "contact" };
  if (kind?.key === "small_talk" && !(entryFits && kind.p < 0.9)) return { path: "small_talk" };
  if (!best || best.key === "none" || best.p < 0.3) return { path: "miss" };
  if (kind?.key === "out_of_scope" && kind.p >= 0.9) return { path: "miss" };
  const asIs = Number(answers.as_is?.noul ?? 0);
  if (best.p >= 0.75 && asIs >= 0.6) return { path: "entry", entry: pick(best.key), p: best.p };
  const top = entries.filter((x) => x.key !== "none").filter((x, i) => i === 0 || (best.p < 0.75 && i < 3 && x.p > 0.1));
  return { path: "write", entries: top.map((x) => pick(x.key)).filter(Boolean), p: best.p };
}

export const sourcesOf = (list: Entry[]) => {
  const seen = new Map<string, { url: string; title: string }>();
  for (const e of list) {
    const url = e.url.split("#")[0];
    if (!seen.has(url)) seen.set(url, { url, title: e.sourceTitle });
  }
  return [...seen.values()].slice(0, 3);
};
