"use client";

import { useId, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";

// "Tell me when this changes": one email field, posted to /api/alerts (saved to the CRM, emailed to us).
export function AlertSignup({ topic, detail, text }: { topic: "ibr"; detail?: string; text: string }) {
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setState("sending");
    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: String(data.get("email") ?? ""), company: String(data.get("company") ?? ""), topic, detail }),
      });
      const out = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(out.error || "Something went wrong. Please try again.");
      track(`${topic}_alert_signup`, { from: location.pathname });
      setState("done");
    } catch (e) {
      setError((e as Error).message);
      setState("error");
    }
  }

  if (state === "done") return <p className="mt-8 rounded-lg border border-line p-4 text-foreground">Done. We&apos;ll email you when it changes.</p>;
  return (
    <form onSubmit={submit} className="mt-8 rounded-lg border border-line p-4">
      <label htmlFor={id} className="block text-foreground">{text}</label>
      <div className="mt-3 flex flex-wrap gap-3">
        <input id={id} name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="min-w-0 flex-1 rounded-md border border-line bg-transparent px-3 py-2 focus-ring" />
        <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button type="submit" disabled={state === "sending"} className="subscribe-submit focus-ring">
          {state === "sending" ? "Saving…" : "Email me"}
        </button>
      </div>
      <p className="mt-2 text-sm text-foreground-secondary">One email when the regulation or a form changes. No newsletter; reply &ldquo;stop&rdquo; any time.</p>
      {state === "error" && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}
