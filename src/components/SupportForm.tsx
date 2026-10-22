"use client";

import { useId, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";

type Done = { number: string; respondBy?: string; email: string };

const MAX_FILES = 3;
const MAX_BYTES = 5 * 1024 * 1024;

export function SupportForm() {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<Done | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const files = data.getAll("files").filter((x): x is File => typeof x !== "string" && x.size > 0);

    if (!email || !String(data.get("subject") ?? "").trim() || !String(data.get("body") ?? "").trim()) {
      return setError("Fill in your email, a subject and what's happening.");
    }
    if (files.length > MAX_FILES) return setError(`Attach at most ${MAX_FILES} files.`);
    const big = files.find((f) => f.size > MAX_BYTES);
    if (big) return setError(`${big.name} is over 5 MB.`);

    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/support", { method: "POST", body: data });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.");
      track("support_request_sent");
      setDone({ number: body.number, respondBy: body.respondBy, email });
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div role="status" aria-live="polite" className="max-w-[32rem] border-t border-line pt-6">
        <p className="text-2xl text-foreground">
          Request {done.number ? <span className="whitespace-nowrap">{done.number}</span> : null} received.
        </p>
        <p className="mt-3 text-base leading-relaxed text-foreground-secondary">
          You&apos;ll have a reply by {done.respondBy} IST. A confirmation is on its way to {done.email}; reply to it to add anything.
        </p>
        <button type="button" onClick={() => setDone(null)} className="text-link focus-ring mt-6 text-base">
          Send another request
        </button>
      </div>
    );
  }

  const err = error ? `${id}-error` : undefined;
  return (
    <form onSubmit={handleSubmit} noValidate className="subscribe-form">
      <div className="subscribe-field">
        <label htmlFor={`${id}-name`} className="subscribe-label">Your name</label>
        <input id={`${id}-name`} name="name" autoComplete="name" className="subscribe-input" />
      </div>

      <div className="subscribe-field">
        <label htmlFor={`${id}-email`} className="subscribe-label">
          Registered work email
        </label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required className="subscribe-input" aria-describedby={err} />
      </div>

      <div className="subscribe-field">
        <label htmlFor={`${id}-subject`} className="subscribe-label">Subject</label>
        <input id={`${id}-subject`} name="subject" required maxLength={200} placeholder="e.g. Invoice PDF won't open for one client" className="subscribe-input" aria-describedby={err} />
      </div>

      <div className="subscribe-field">
        <label htmlFor={`${id}-body`} className="subscribe-label">What&apos;s happening</label>
        <textarea
          id={`${id}-body`}
          name="body"
          rows={6}
          required
          placeholder="What you were doing, what you expected, and what happened instead."
          className="subscribe-input subscribe-textarea"
          aria-describedby={err}
        />
      </div>

      <div className="subscribe-field">
        <label htmlFor={`${id}-files`} className="subscribe-label">
          Screenshots <span className="font-normal text-foreground-secondary">(optional, up to 3 images or PDFs, 5 MB each)</span>
        </label>
        <input id={`${id}-files`} name="files" type="file" multiple accept="image/png,image/jpeg,image/webp,image/gif,application/pdf" className="subscribe-input text-sm" />
      </div>

      <label htmlFor={`${id}-urgent`} className="flex items-start gap-2 text-sm text-foreground-secondary">
        <input id={`${id}-urgent`} name="urgent" type="checkbox" className="mt-1" />
        <span>
          <span className="font-medium text-foreground">Urgent:</span> the system is down, or billing, dispatch or stock work has stopped with no way around it.
        </span>
      </label>

      {error && (
        <p id={`${id}-error`} className="subscribe-error" role="status" aria-live="polite">{error}</p>
      )}

      {/* Honeypot: hidden from people and keyboard order; bots fill it in. */}
      <div className="subscribe-honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={busy} className="subscribe-submit focus-ring">
        {busy ? "Sending" : "Send request"}
      </button>
    </form>
  );
}
