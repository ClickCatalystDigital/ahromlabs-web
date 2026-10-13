import { NextResponse } from "next/server";
import { sendLeadEmail, logSendFailure, underRateLimit } from "@/lib/lead-email";

// Contact form (components/ContactForm.tsx) -> email to LEADS_TO via Cloudflare Email Sending (lib/lead-email.ts).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
// Shown when the email could not be sent, so the visitor still has a way to reach us.
const SEND_FAILED = "We couldn't send your message just now. Please try again in a minute, or email pujan@ahromlabs.com.";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.email !== "string" || typeof body.message !== "string") {
    return NextResponse.json({ error: "Enter your email and a message." }, { status: 400 });
  }

  const email = body.email.trim();
  const message = body.message.trim();
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";

  // Real visitors never fill the hidden "company" field. A bot did; report
  // success without sending anything, so it stops retrying.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!EMAIL_RE.test(email) || email.length > MAX_EMAIL) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Enter a message." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: `Keep the message under ${MAX_MESSAGE.toLocaleString("en-IN")} characters.` }, { status: 400 });
  }

  // Per visitor (IP), set in wrangler.jsonc (FORM_LIMITER). Checked after validation so typos don't use it up.
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  if (!(await underRateLimit(`contact:${ip}`))) {
    return NextResponse.json({ error: "Too many messages from here. Please wait a minute and try again." }, { status: 429 });
  }

  try {
    await sendLeadEmail({
      form: "contact",
      subject: `Website enquiry from ${email}`,
      replyTo: email,
      intro: "New message from the contact form on ahromlabs.com.",
      fields: [["Email", email], ["Page", request.headers.get("referer") || "-"]],
      message,
    });
  } catch (err) {
    logSendFailure("contact", err);
    return NextResponse.json({ error: SEND_FAILED }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
