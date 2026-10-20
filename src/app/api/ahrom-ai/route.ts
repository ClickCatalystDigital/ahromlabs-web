import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { AI_SEARCH_URL } from "@/lib/ai-search";
import { buildEntries, shortlist, jevQuestions, route, sourcesOf, JEV_MODEL, type Entry, type Route } from "@/lib/ahrom-ai";

// Ahrom AI's answers (docs/ahrom-ai-router-plan.md). One Jev call decides; our own published
// answer is shown as it is when Jev is sure, Gemma writes only when the question needs it, and a
// miss says so. POST { messages: [{ role, content }], dry? } -> the answer as a plain-text stream,
// with headers x-path (entry | write | small_talk | contact | miss | fallback) and x-sources
// (URL-encoded JSON [{ url, title }]). { dry: true } returns the decision as JSON, for testing.

type RateLimit = { limit(options: { key: string }): Promise<{ success: boolean }> };
type Env = { OPENROUTER_KEY?: string; CHAT_LIMITER?: RateLimit };

const OPENROUTER = "https://openrouter.ai/api";
const WRITER_MODEL = "google/gemma-4-26b-a4b-it"; // the model SB Ops and Savistar's assistants use
const ENTRIES = buildEntries();
const CONTACT = "https://ahromlabs.com/#contact";
const MAX_QUESTION = 500;

const CANNED = {
  miss: `The site doesn't cover that yet. Ask Pujan directly at ${CONTACT}, where every message gets a personal reply.`,
  contact: `Happy to. Tell Pujan about your business and what you'd like to fix at ${CONTACT}. Every message gets a personal reply.`,
  busy: `I'm getting a lot of questions just now. Try again in a minute, or write to Pujan at ${CONTACT}.`,
};

// A short message that is only a greeting, thanks or "who are you": answered without Jev,
// which saves a paid call on the commonest openers. Anything longer goes to Jev.
const PURE_SMALL_TALK = /^\s*(hi+|hello|hey|namaste|good (morning|afternoon|evening)|thanks|thank you|thx|ok(ay)?|shukriya|dhanyavad|who are you|what are you|what is your name)[\s!.?]*$/i;

function smallTalk(q: string): string {
  if (/\b(thanks|thank you|thx|shukriya|dhanyavad)\b/i.test(q)) return "You're welcome. Anything else you'd like to know about the systems we build?";
  if (/\b(who|what) are you\b|your name|are you (a )?(bot|robot|human|real|ai)\b/i.test(q)) {
    return "I'm Ahrom AI, the assistant on ahromlabs.com. I answer from Ahrom Labs' own pages: what we build, what it costs, how a project runs. For anything else, Pujan replies personally.";
  }
  if (/^\s*(hi|hello|hey|namaste|good (morning|afternoon|evening))\b/i.test(q)) {
    return "Hello. I'm Ahrom AI. We build the operations and accounting systems manufacturers and trading groups run on. Ask me what we build, what it costs, or how soon you could use it.";
  }
  return "I'm a robot, so that one's beyond me. I can tell you about the systems we build, what they cost, or how a project runs.";
}

const WRITER_SYSTEM = `You are Ahrom AI, the assistant on ahromlabs.com. Ahrom Labs builds operations and accounting systems for manufacturers and trading groups. Write "we" for Ahrom Labs.
Answer the visitor's latest message from the ENTRIES below, which are Ahrom Labs' own published answers.
- Put the answer in the first sentence, then the one or two details that matter. Two to five sentences in all. Plain text, no markdown.
- Use only the ENTRIES. Copy figures, terms and names exactly; never round, extend or invent a price, timeline, client, feature or term. "Ours" in an entry means Ahrom Labs'.
- Cost ranges in the entries are market figures from published guides, not Ahrom Labs' price list: say so, and that we quote a fixed price per phase after the modeling phase.
- Reply in English. Only if the visitor's latest message is itself written in Hindi, Gujarati or Hinglish, reply in that.
- If the ENTRIES only answer part of the message, answer that part and say plainly which part the site doesn't cover.
- End with the URL of the entry you used most, as a full https://ahromlabs.com link.`;

// The entry's own answer, with its link unless the answer already ends on one.
const withLink = (e: Entry) => (e.answer.includes("https://") ? e.answer : `${e.answer}\n\n${e.url}`);
const sourcesHeader = (list: { url: string; title: string }[]) => encodeURIComponent(JSON.stringify(list));
const text = (body: string, path: string, sources: { url: string; title: string }[] = []) =>
  new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-path": path, "x-sources": sourcesHeader(sources) } });

// OpenRouter or AI Search SSE -> plain text.
function sseToText(body: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buf = "";
  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, ctl) {
        buf += decoder.decode(chunk, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
          try {
            const t = JSON.parse(line.slice(6)).choices?.[0]?.delta?.content;
            if (t) ctl.enqueue(encoder.encode(t));
          } catch {
            // keep-alive, the `event: chunks` payload, or a partial line
          }
        }
      },
    }),
  );
}

async function decide(key: string, question: string, previous: string | null, list: Entry[]): Promise<Route> {
  const res = await fetch(`${OPENROUTER}/alpha/decisions`, {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json", "x-title": "Ahrom Labs website" },
    body: JSON.stringify({
      model: JEV_MODEL,
      state: { latest_message: question, previous_message: previous, website: "ahromlabs.com, Ahrom Labs: custom operations and accounting systems for manufacturers and trading groups" },
      questions: jevQuestions(list),
    }),
    signal: AbortSignal.timeout(8000),
  });
  const body = (await res.json().catch(() => null)) as { answers?: Parameters<typeof route>[1] } | null;
  if (!res.ok || !body?.answers) throw new Error(`Jev returned ${res.status}`);
  return route(list, body.answers);
}

async function write(key: string, messages: { role: string; content: string }[], entries: Entry[]): Promise<Response | null> {
  const context = entries.map((e) => `### ${e.title}\n${e.answer}${e.more ? `\n${e.more}` : ""}\nURL: ${e.url}`).join("\n\n");
  const res = await fetch(`${OPENROUTER}/v1/chat/completions`, {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json", "x-title": "Ahrom Labs website" },
    body: JSON.stringify({
      model: WRITER_MODEL,
      stream: true,
      temperature: 0.2,
      max_tokens: 500,
      // Answer straight away: thinking first cost Gemma 22-100 s on Workers AI.
      reasoning: { enabled: false },
      messages: [{ role: "system", content: `${WRITER_SYSTEM}\n\nENTRIES\n${context}` }, ...messages],
    }),
    signal: AbortSignal.timeout(20000),
  }).catch(() => null);
  if (!res?.ok || !res.body) return null;
  return new Response(sseToText(res.body), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-path": "write", "x-sources": sourcesHeader(sourcesOf(entries)) },
  });
}

// Jev or OpenRouter unreachable: today's AI Search chat, so the chat never goes silent.
async function fallback(messages: { role: string; content: string }[]): Promise<Response> {
  const res = await fetch(`${AI_SEARCH_URL}/chat/completions`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://ahromlabs.com" },
    body: JSON.stringify({ messages, stream: true }),
  }).catch(() => null);
  if (!res?.ok || !res.body) return text(CANNED.miss, "miss");
  return new Response(sseToText(res.body), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-path": "fallback", "x-sources": sourcesHeader([]) } });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { messages?: unknown; dry?: boolean } | null;
  const messages = (Array.isArray(body?.messages) ? body.messages : [])
    .filter((m): m is { role: "user" | "assistant"; content: string } => !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-6)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_QUESTION) }));
  const users = messages.filter((m) => m.role === "user");
  const question = users.at(-1)?.content.trim();
  if (!question) return NextResponse.json({ error: "Ask a question." }, { status: 400 });

  const env = (await getCloudflareContext({ async: true })).env as unknown as Env;
  // Cloudflare sets cf-connecting-ip on every real request; only local `next dev` lacks it.
  const ip = req.headers.get("cf-connecting-ip");
  if (ip && env.CHAT_LIMITER && !(await env.CHAT_LIMITER.limit({ key: `chat:${ip}` })).success) return text(CANNED.busy, "busy");
  if (PURE_SMALL_TALK.test(question)) return text(smallTalk(question), "small_talk");
  if (!env.OPENROUTER_KEY) return fallback(messages);

  const previous = users.at(-2)?.content ?? null;
  // The previous question too, so "and how long does that take?" keeps its subject.
  const list = shortlist(ENTRIES, previous ? `${question} ${previous}` : question);
  const started = Date.now();
  let decision: Route;
  try {
    decision = await decide(env.OPENROUTER_KEY, question, previous, list);
  } catch {
    return fallback(messages);
  }
  if (body?.dry) {
    return NextResponse.json({
      path: decision.path,
      ms: Date.now() - started,
      ...("entry" in decision ? { entry: decision.entry.id, p: decision.p } : {}),
      ...("entries" in decision ? { entries: decision.entries.map((e) => e.id), p: decision.p } : {}),
      shortlist: list.length,
    });
  }

  switch (decision.path) {
    case "entry":
      return text(withLink(decision.entry), "entry", sourcesOf([decision.entry]));
    case "small_talk":
      return text(smallTalk(question), "small_talk");
    case "contact":
      return text(CANNED.contact, "contact");
    case "miss":
      return text(CANNED.miss, "miss");
    case "write":
      return (await write(env.OPENROUTER_KEY, messages, decision.entries)) ?? text(withLink(decision.entries[0]), "entry", sourcesOf(decision.entries.slice(0, 1)));
  }
}
