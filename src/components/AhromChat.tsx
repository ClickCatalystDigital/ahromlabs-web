"use client";
/* eslint-disable @next/next/no-img-element -- the faces are 5 KB files already at size, swapped on every mood change; plain <img> keeps the warmed URLs identical to the ones shown. */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { LogoBadge } from "@/components/Wordmark";
import type { Preset } from "@/lib/ai-chat-presets";

// Ahrom AI: the site chat. Typed questions go to /api/ahrom-ai, which decides
// with Jev and answers from the site's own published answers, with Gemma
// writing only when a question needs it (docs/ahrom-ai-router-plan.md). The
// suggested questions have fixed answers here (presets), no network.

// The mascot's faces, cropped from one sheet into /public/ahrom-ai.
type Mood = "neutral" | "wink" | "surprised" | "idea" | "alert" | "thinking" | "calm" | "happy" | "sorry" | "delighted" | "confused";
const face = (mood: Mood) => `/ahrom-ai/${mood}.webp`;
const MOODS: Mood[] = ["neutral", "wink", "surprised", "idea", "alert", "thinking", "calm", "happy", "sorry", "delighted", "confused"];

type Source = { url: string; title: string };
type Message = { role: "user" | "assistant"; content: string; sources?: Source[] };

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

// The route's x-sources header: URL-encoded JSON [{ url, title }].
function sourcesFrom(header: string | null): Source[] {
  try {
    return header ? (JSON.parse(decodeURIComponent(header)) as Source[]) : [];
  } catch {
    return [];
  }
}

// `presets` come from the server (layout.tsx), so the page data they are built
// from stays out of the client bundle.
export function AhromChat({ presets }: { presets: Preset[] }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mood, setMood] = useState<Mood>("neutral");
  const [greeting, setGreeting] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // After 10 seconds on the site, a one-line hello by the visitor's own clock,
  // beside the launcher (the panel stays shut). Once per visit; never once the
  // chat has been opened. sessionStorage can throw (private mode): then it just
  // shows again next visit.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("ahrom-ai-greeted") === "1";
    } catch {}
    if (seen) return;
    const timer = setTimeout(() => {
      const h = new Date().getHours();
      const hello = h >= 5 && h < 12 ? "Good morning" : h >= 12 && h < 17 ? "Good afternoon" : h >= 17 && h < 22 ? "Good evening" : "Hello";
      setGreeting(`${hello}. I'm Ahrom AI. Ask me anything about the systems we build.`);
      try {
        sessionStorage.setItem("ahrom-ai-greeted", "1");
      } catch {}
    }, 10_000);
    return () => clearTimeout(timer);
  }, []);

  // Warm the other faces once the panel opens, so a change never flickers.
  useEffect(() => {
    if (!open) return;
    for (const m of MOODS) new Image().src = face(m);
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && minimise();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, busy]);

  function openPanel() {
    setGreeting(null);
    setOpen(true);
    if (messages.length === 0) setMood("happy");
  }

  // Minimise keeps the conversation (the launcher wears the current face);
  // close ends it.
  function minimise() {
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }

  function close() {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setBusy(false);
    setMood("neutral");
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
    const update = (patch: Partial<Message>) =>
      setMessages((m) => [...m.slice(0, -1), { ...m[m.length - 1], ...patch }]);

    // A suggested question: its fixed answer, after a beat so it reads as a reply.
    const preset = presets.find((p) => p.question === question);
    if (preset) {
      setMood("thinking");
      await new Promise((r) => setTimeout(r, 500));
      update({ content: preset.answer, sources: preset.sources });
      setMood(moodAfter(question, preset.answer, preset.sources.length));
      setBusy(false);
      track("ahrom_ai_question", { kind: "suggested" });
      return;
    }

    setMood(SURPRISED.test(question) ? "surprised" : "thinking");
    if (SURPRISED.test(question)) setTimeout(() => setMood((m) => (m === "surprised" ? "thinking" : m)), 900);
    track("ahrom_ai_question", { kind: "typed" });

    let answer = "";
    let sources = 0;
    let path = "";
    try {
      abortRef.current = new AbortController();
      const res = await fetch("/api/ahrom-ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: [...history, { role: "user", content: question }] }),
        signal: abortRef.current.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      path = res.headers.get("x-path") ?? "";
      const found = sourcesFrom(res.headers.get("x-sources"));
      sources = found.length;

      // Plain text, streamed: our own answer arrives at once, Gemma's word by word.
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        update({ content: answer });
        setMood("calm");
      }
      update({ content: answer, sources: found });
      if (!answer) throw new Error("empty answer");
      setMood(path === "contact" ? "happy" : moodAfter(question, answer, sources));
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
      {!open && greeting && (
        <div className="ahrom-ai-greeting" role="status">
          <button type="button" onClick={openPanel} className="focus-ring text-left">
            {greeting}
          </button>
          <button type="button" onClick={() => setGreeting(null)} aria-label="Dismiss" className="ahrom-ai-icon-button focus-ring -mt-1 -mr-2 h-7 w-7 flex-none">
            <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

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
          <img src={face(messages.length ? mood : greeting ? "happy" : "neutral")} alt="" width={56} height={56} className="h-full w-full" />
        </button>
      )}

      {open && (
        <section id="ahrom-ai" role="dialog" aria-label="Ahrom AI" className="ahrom-ai-panel">
          <header className="flex items-center gap-1 border-b border-line py-3 pr-3 pl-4">
            <LogoBadge className="mr-auto" />
            <button type="button" onClick={minimise} aria-label="Minimise Ahrom AI" title="Minimise" className="ahrom-ai-icon-button focus-ring">
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <path d="M5 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" onClick={close} aria-label="Close and clear the conversation" title="Close" className="ahrom-ai-icon-button focus-ring">
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
                  {presets.map((p) => (
                    <button key={p.question} type="button" onClick={() => send(p.question)} className="ahrom-ai-chip focus-ring">
                      {p.question}
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
                placeholder="Ask about the systems we build…"
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
                className="max-h-32 min-h-8 flex-1 resize-none bg-transparent py-1 text-base leading-6 sm:text-[0.9375rem] sm:leading-6 text-foreground outline-none placeholder:text-foreground-secondary/70 [field-sizing:content]"
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
