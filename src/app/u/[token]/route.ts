import { env } from "@/lib/lead-email";

// Unsubscribe link in every outreach email from the CRM (crm.ahromlabs.com, ~/Developer/ahrom-crm). Public on
// purpose: the CRM itself sits behind Cloudflare Access. GET shows a button (link scanners open links; they must not
// unsubscribe anyone); POST unsubscribes — from that button, or Gmail's one-click (List-Unsubscribe-Post).
// The email goes on the never-contact list, its sequence stops, and the prospect is marked "do not contact".
const HEADERS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "Content-Type": "text/html; charset=utf-8" };
const page = (body: string, status = 200) => new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Unsubscribe · Ahrom Labs</title>
<style>body{margin:0;font:16px/1.5 ui-sans-serif,system-ui,sans-serif;background:#fbfbfc;color:#18181b}main{max-width:420px;margin:18vh auto;padding:0 16px}
button{font:inherit;background:#18181b;color:#fff;border:0;border-radius:8px;padding:10px 18px;cursor:pointer}
@media(prefers-color-scheme:dark){body{background:#0f0f11;color:#f4f4f5}button{background:#f4f4f5;color:#0f0f11}}</style></head>
<body><main>${body}</main></body></html>`, { status, headers: HEADERS });

type Enrollment = { id: number; cin: string; contact_id: number; email: string; status: string };
async function find(token: string) {
  const { CRM } = await env();
  if (!CRM || !/^[A-Za-z0-9_-]{16,64}$/.test(token)) return { CRM, e: null };
  const { results } = await CRM.prepare("SELECT id, cin, contact_id, email, status FROM email_enrollments WHERE unsub_token = ?").bind(token).all<Enrollment>();
  return { CRM, e: results[0] ?? null };
}

export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const { e } = await find((await params).token);
  if (!e) return page("<h1>Link not found</h1><p>Reply to the email with “unsubscribe” and I will remove you by hand.</p>", 404);
  if (e.status === "unsubscribed") return page("<h1>You are unsubscribed</h1><p>You will not get more emails from Ahrom Labs.</p>");
  return page(`<h1>Unsubscribe</h1><p>Stop emails from Ahrom Labs to <b>${e.email.replace(/[&<>"']/g, "")}</b>?</p>
<form method="post"><button>Unsubscribe</button></form>`);
}

export async function POST(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const { CRM, e } = await find((await params).token);
  if (!CRM || !e) return page("<h1>Link not found</h1>", 404);
  if (e.status !== "unsubscribed") {
    await CRM.prepare("INSERT OR IGNORE INTO suppression (match_type, value, reason) VALUES ('email', ?, 'Unsubscribed from email')").bind(e.email).run();
    await CRM.prepare("UPDATE email_enrollments SET status = 'unsubscribed', stopped_reason = 'unsubscribed', updated_at = datetime('now') WHERE id = ?").bind(e.id).run();
    await CRM.prepare("UPDATE prospects SET status = 'do not contact', updated_at = datetime('now') WHERE cin = ?").bind(e.cin).run();
    await CRM.prepare("INSERT INTO activities (cin, contact_id, kind, body) VALUES (?, ?, 'email', 'Unsubscribed')").bind(e.cin, e.contact_id).run();
  }
  return page("<h1>You are unsubscribed</h1><p>You will not get more emails from Ahrom Labs. Sorry for the bother.</p>");
}
