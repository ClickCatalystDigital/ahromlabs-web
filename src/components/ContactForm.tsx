"use client";

import { useId, useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const emailId = useId();
  const messageId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const company = String(formData.get("company") ?? ""); // honeypot

    if (!email || !message) {
      setStatus("error");
      setError("Enter your email and a message.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, company }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className="subscribe-success" role="status" aria-live="polite">
        Message received. We read every one and reply directly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="subscribe-form">
      <div className="subscribe-field">
        <label htmlFor={emailId} className="subscribe-label">
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          className="subscribe-input"
          aria-describedby={status === "error" ? `${emailId}-error` : undefined}
          aria-invalid={status === "error"}
        />
      </div>

      <div className="subscribe-field">
        <label htmlFor={messageId} className="subscribe-label">
          What are you trying to solve?
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          required
          className="subscribe-input subscribe-textarea"
          aria-describedby={status === "error" ? `${emailId}-error` : undefined}
          aria-invalid={status === "error"}
        />
      </div>

      {status === "error" && (
        <p id={`${emailId}-error`} className="subscribe-error" role="status" aria-live="polite">
          {error}
        </p>
      )}

      {/* Honeypot: hidden from sighted users and keyboard tab order, real bots fill it in. */}
      <div className="subscribe-honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={status === "submitting"} className="subscribe-submit focus-ring">
        {status === "submitting" ? "Sending" : "Send message"}
      </button>
    </form>
  );
}
