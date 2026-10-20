"use client";
/* eslint-disable @next/next/no-img-element -- the faces are 5 KB files already at size, swapped on every mood change; plain <img> keeps the warmed URLs identical to the ones shown. */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AI_SEARCH_URL } from "@/lib/ai-search";
import { track } from "@/lib/analytics";

// Ahrom AI: the site chat. Our own panel on the AI Search chat endpoint (the
// same one Cloudflare's <chat-bubble-snippet> used), so the look and the
// mascot's face are ours. Answers stream as server-sent events: `event: chunks`
// carries the pages the answer was retrieved from, then OpenAI-style deltas.
// The persona and the answering rules are the instance's system prompt
// (docs/chatbot-system-prompt.md), not this file.

// The mascot's faces, cropped from one sheet into /public/ahrom-ai.
type Mood = "neutral" | "wink" | "surprised" | "idea" | "alert" | "thinking" | "calm" | "happy" | "sorry" | "delighted" | "confused";
const face = (mood: Mood) => `/ahrom-ai/${mood}.webp`;
const MOODS: Mood[] = ["neutral", "wink", "surprised", "idea", "alert", "thinking", "calm", "happy", "sorry", "delighted", "confused"];

type Source = { url: string; title: string };
type Message = { role: "user" | "assistant"; content: string; sources?: Source[] };

// Localhost goes through the dev proxy in next.config.ts (the endpoint's CORS
// only allows ahromlabs.com).
const CHAT_BASE = process.env.NODE_ENV === "development" ? "/__ahrom-ai" : AI_SEARCH_URL;

const SUGGESTIONS = ["What do you build?", "Who owns the code?", "Does it work with Tally?"];

// ponytail: the face is picked from what's already known (typing, waiting, the
// reply's wording), not by a model. A classifier call per message would cost
// money and latency for the same result.
//   typing → alert · waiting → thinking (surprised first, for "wow!" or "really?")
//   streaming → calm · error → confused, and once the answer is in:
function moodAfter(question: string, answer: string, sources: number): Mood {
  if (/\b(thanks|thank you|thx|great|awesome|perfect|shukriya|dhanyavad)\b/i.test(question)) return "delighted";
  if (/doesn'?t cover|does not cover|not covered|ask pujan directly/i.test(answer)) return "sorry";
  if (sources === 0) return "wink"; // nothing retrieved and no apology: small talk
  if (/₹|\d/.test(answer)) return "idea"; // a concrete figure from the pages
  return "happy";
}
const SURPRISED = /!|\b(wow|really|seriously|no way)\b/i;

// Answer text: plain paragraphs, with ahromlabs.com URLs as in-site links and
// markdown emphasis dropped (the model sometimes adds it).
function renderText(text: string, onNavigate: () => void) {
  const clean = text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/^\s*[*-]\s+/gm, "• ");
  return clean
    .split(/\n{2,}/)
    .filter((p) => p.trim())
    .map((para, i) => (
      <p key={i} className="whitespace-pre-line">
        {para.split(/(https?:\/\/[^\s),]+[^\s),.])/g).map((part, j) => {
          if (!/^https?:\/\//.test(part)) return part;
          const internal = part.match(/^https:\/\/ahromlabs\.com(\/[^\s]*)?$/);
          return internal ? (
            <Link key={j} href={internal[1] || "/"} onClick={onNavigate} className="text-link focus-ring">
              {part.replace(/^https:\/\//, "")}
            </Link>
          ) : (
            <a key={j} href={part} className="text-link focus-ring" rel="noopener">
              {part.replace(/^https?:\/\//, "")}
            </a>
          );
        })}
      </p>
    ));
}

function sourcesFrom(data: string): Source[] {
  try {
    const chunks = JSON.parse(data) as { item?: { key?: string; metadata?: { title?: string } } }[];
    const seen = new Map<string, Source>();
    for (const c of chunks) {
      const url = c.item?.key;
      if (url && !seen.has(url)) {
        seen.set(url, { url, title: (c.item?.metadata?.title ?? url).replace(/\s*\|\s*Ahrom Labs$/, "") });
      }
    }
    return [...seen.values()].slice(0, 3);
  } catch {
    return [];
  }
}

export function AhromChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mood, setMood] = useState<Mood>("neutral");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Warm the other faces once the panel opens, so a change never flickers.
  useEffect(() => {
    if (!open) return;
    for (const m of MOODS) new Image().src = face(m);
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, busy]);

  function openPanel() {
    setOpen(true);
    if (messages.length === 0) setMood("happy");
  }

  function close() {
    setOpen(false);
    // The launcher only exists while the panel is closed: focus it once it's back.
    requestAnimationFrame(() => buttonRef.current?.focus());
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const history = messages.slice(-6).map(({ role, content }) => ({ role, content }));
    setMessages((m) => [...m, { role: "user", content: question }, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    setMood(SURPRISED.test(question) ? "surprised" : "thinking");
    if (SURPRISED.test(question)) setTimeout(() => setMood((m) => (m === "surprised" ? "thinking" : m)), 900);
    track("ahrom_ai_question");

    const update = (patch: Partial<Message>) =>
      setMessages((m) => [...m.slice(0, -1), { ...m[m.length - 1], ...patch }]);

    let answer = "";
    let sources = 0;
    try {
      abortRef.current = new AbortController();
      const res = await fetch(`${CHAT_BASE}/chat/completions`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: [...history, { role: "user", content: question }], stream: true }),
        signal: abortRef.current.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let cut;
        while ((cut = buffer.indexOf("\n\n")) !== -1) {
          const frame = buffer.slice(0, cut);
          buffer = buffer.slice(cut + 2);
          const event = frame.match(/^event: (.+)$/m)?.[1];
          const data = frame.match(/^data: ([\s\S]*)$/m)?.[1];
          if (!data || data === "[DONE]") continue;
          if (event === "chunks") {
            const found = sourcesFrom(data);
            sources = found.length;
            update({ sources: found });
            continue;
          }
          try {
            const delta = JSON.parse(data).choices?.[0]?.delta?.content;
            if (delta) {
              answer += delta;
              update({ content: answer });
              setMood("calm");
            }
          } catch {
            // A malformed frame is skipped, not fatal.
          }
        }
      }
      if (!answer) throw new Error("empty answer");
      setMood(moodAfter(question, answer, sources));
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      update({
        content:
          "Sorry, I couldn't reach my notes just now. Try again in a moment, or write to Pujan at https://ahromlabs.com/#contact.",
        sources: [],
      });
      setMood("confused");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          ref={buttonRef}
          type="button"
          onClick={openPanel}
          aria-label="Ask Ahrom AI"
          aria-controls="ahrom-ai"
          aria-expanded={false}
          className="ahrom-ai-launcher focus-ring"
        >
          <img src={face("neutral")} alt="" width={56} height={56} className="h-full w-full" />
        </button>
      )}

      {open && (
        <section id="ahrom-ai" role="dialog" aria-labelledby="ahrom-ai-title" className="ahrom-ai-panel">
          <header className="flex items-center gap-3 border-b border-line px-5 py-4">
            <div className="min-w-0 flex-1">
              <h2 id="ahrom-ai-title" className="display text-xl leading-none text-foreground">Ahrom AI</h2>
            </div>
            <button type="button" onClick={close} aria-label="Close Ahrom AI" className="ahrom-ai-icon-button focus-ring">
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-6" aria-live="polite">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <img src={face(mood)} alt="" width={88} height={88} className="ahrom-ai-face h-22 w-22" />
                <p className="display mt-5 text-3xl text-foreground">Hi, I&apos;m Ahrom AI.</p>
                <p className="mt-2 text-sm text-foreground-secondary">What would you like to know?</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)} className="ahrom-ai-chip focus-ring">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ol className="space-y-6">
                {messages.map((m, i) =>
                  m.role === "user" ? (
                    <li key={i} className="flex justify-end">
                      <p className="ahrom-ai-user">{m.content}</p>
                    </li>
                  ) : (
                    // The face sits by the latest answer only, at its foot (sticky), so the
                    // current mood stays in view while a long answer streams.
                    <li key={i} className="flex gap-3">
                      {i === messages.length - 1 ? (
                        <img src={face(mood)} alt="" width={32} height={32} className="ahrom-ai-face sticky bottom-0 h-8 w-8 flex-none self-end" />
                      ) : (
                        <span className="w-8 flex-none" />
                      )}
                      <div className="min-w-0 flex-1 space-y-3 text-[0.9375rem] leading-relaxed text-foreground">
                      {m.content ? (
                        renderText(m.content, () => window.innerWidth < 640 && setOpen(false))
                      ) : (
                        <span className="ahrom-ai-dots" aria-label="Ahrom AI is thinking">
                          <span /><span /><span />
                        </span>
                      )}
                      {!!m.sources?.length && m.content && !(busy && i === messages.length - 1) && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {m.sources.map((s) => (
                            <Link
                              key={s.url}
                              href={s.url.replace(/^https:\/\/ahromlabs\.com/, "") || "/"}
                              className="ahrom-ai-source focus-ring"
                            >
                              {s.title}
                            </Link>
                          ))}
                        </div>
                      )}
                      </div>
                    </li>
                  ),
                )}
              </ol>
            )}
          </div>

          <form
            className="border-t border-line p-4"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <div className="ahrom-ai-composer">
              <textarea
                ref={inputRef}
                value={input}
                rows={1}
                maxLength={500}
                placeholder="Ask about pricing, Tally, IBR…"
                aria-label="Message Ahrom AI"
                onChange={(e) => {
                  setInput(e.target.value);
                  if (!busy) setMood(e.target.value ? "alert" : "happy");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                className="max-h-32 min-h-6 flex-1 resize-none bg-transparent text-base sm:text-[0.9375rem] text-foreground outline-none placeholder:text-foreground-secondary/70 [field-sizing:content]"
              />
              <button
                type="submit"
                disabled={!input.trim() || busy}
                aria-label="Send"
                className="ahrom-ai-send focus-ring"
              >
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <path d="M10 15V5M5 10l5-5 5 5" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
