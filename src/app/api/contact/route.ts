import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  // ponytail: honeypot only, no rate limiting. Add rate limiting if abuse shows up.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ error: "Enter a message." }, { status: 400 });
  }

  const { RESEND_API_KEY, RESEND_FROM, CONTACT_TO } = process.env;

  if (!RESEND_API_KEY || !RESEND_FROM || !CONTACT_TO) {
    console.error("Missing Resend environment configuration.");
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: CONTACT_TO,
        reply_to: email,
        subject: "Ahrom Labs: new contact form message",
        text: `From: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`Resend API error ${response.status}: ${detail}`);
    }
  } catch (err) {
    console.error("Failed to send contact email", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
