import { NextResponse } from "next/server";
import { captureLead, underRateLimit } from "@/lib/lead-email";
import { CHOICE_COOKIE, leadCountry, marketFromParam } from "@/lib/markets";
import { attributionFrom, cookieIn } from "@/lib/analytics";

// "Tell me when this changes" sign-ups (components/AlertSignup.tsx): saved to the CRM as a lead with source "alerts"
// and the topic, and emailed to LEADS_TO like the contact form. Alerts are sent by hand when a regulation changes.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Topics a page may offer; anything else is refused, so the CRM only holds topics we can actually send.
const TOPICS: Record<string, string> = { ibr: "IBR 2026 changes" };

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const topic = typeof body?.topic === "string" ? body.topic : "";
  const detail = typeof body?.detail === "string" ? body.detail.trim().slice(0, 120) : "";
  if (typeof body?.company === "string" && body.company.trim()) return NextResponse.json({ ok: true }); // honeypot
  if (!EMAIL_RE.test(email) || email.length > 254) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!TOPICS[topic]) return NextResponse.json({ error: "Unknown alert." }, { status: 400 });

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  if (!(await underRateLimit(`alerts:${ip}`))) {
    return NextResponse.json({ error: "Too many sign-ups from here. Please wait a minute and try again." }, { status: 429 });
  }
  const page = request.headers.get("referer") || "";
  const chosen = marketFromParam(request.headers.get("cookie")?.match(new RegExp(`(?:^|; )${CHOICE_COOKIE}=([a-zA-Z]+)`))?.[1]);
  const country = leadCountry(request.headers.get("cf-ipcountry"), chosen);
  const message = `Alert: ${TOPICS[topic]}${detail ? ` (reading ${detail})` : ""}`;
  const kept = await captureLead({ source: "alerts", email, message, about: topic, page, country, attribution: attributionFrom(cookieIn(request.headers.get("cookie"))) }, {
    form: "alerts",
    subject: `Alert sign-up: ${TOPICS[topic]} (${email})`,
    replyTo: email,
    intro: "Someone asked to be told when this changes on ahromlabs.com.",
    fields: [["Email", email], ["Alert", TOPICS[topic]], ["Reading", detail || "-"], ["Page", page || "-"], ["Country", country || "-"]],
    message,
  });
  if (!kept) return NextResponse.json({ error: "We couldn't save that just now. Please try again in a minute." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
