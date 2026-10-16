// Keeps every lead: saved to the CRM database (D1 binding CRM, schema in migrations/) and then emailed to our
// inbox with Cloudflare Email Sending (the EMAIL binding in wrangler.jsonc). Used by the contact form
// (api/contact) and the three live demos' entry forms (api/demo-lead). The CRM is read at /api/crm.
//
// Sent from website@notify.ahromlabs.com. Only that subdomain is onboarded to Email Sending (its records sit
// under notify.ahromlabs.com), so the root domain's Google Workspace MX, SPF, DKIM and DMARC are untouched.
// The binding itself only allows that sender and the one destination (pujan@ahromlabs.com), so even a bug
// can't mail anyone else. Reply-To is the visitor, so replying answers them directly.
import { getCloudflareContext } from "@opennextjs/cloudflare";

const FROM = { email: "website@notify.ahromlabs.com", name: "Ahrom Labs website" };

type SendEmail = { send(message: Record<string, unknown>): Promise<{ messageId: string }> };
type RateLimit = { limit(options: { key: string }): Promise<{ success: boolean }> };
type D1 = { prepare(sql: string): { bind(...v: unknown[]): { run(): Promise<{ meta: { last_row_id: number } }>; all<T>(): Promise<{ results: T[] }> } } };
type Env = { EMAIL?: SendEmail; LEADS_TO?: string; FORM_LIMITER?: RateLimit; CRM?: D1; CRM_USER?: string; CRM_PASSWORD?: string };

export async function env(): Promise<Env> {
  return (await getCloudflareContext({ async: true })).env as unknown as Env;
}

// True when this key (e.g. "contact:<ip>") is still under the limit set in wrangler.jsonc. When the binding
// is missing (local `next dev`), allows the request.
export async function underRateLimit(key: string): Promise<boolean> {
  const limiter = (await env()).FORM_LIMITER;
  return limiter ? (await limiter.limit({ key })).success : true;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// fields: label/value pairs shown as a table; message: free text shown below it. Throws when the email was not
// accepted (missing binding, unverified sender, delivery error): callers must report failure, never success.
export async function sendLeadEmail({ form, subject, replyTo, intro, fields, message }: {
  form: string; subject: string; replyTo: string; intro: string; fields: [string, string][]; message?: string;
}): Promise<string> {
  const { EMAIL, LEADS_TO } = await env();
  if (!EMAIL || !LEADS_TO) throw new Error("EMAIL binding or LEADS_TO is not configured");
  const text = [intro, "", ...fields.map(([k, v]) => `${k}: ${v || "-"}`), ...(message ? ["", "Message:", message] : []), "", "Reply to this email to answer them."].join("\n");
  const html = `<p>${esc(intro)}</p><table cellpadding="4" style="border-collapse:collapse">${fields
    .map(([k, v]) => `<tr><td style="color:#666">${esc(k)}</td><td>${esc(v || "-")}</td></tr>`).join("")}</table>${
    message ? `<p style="color:#666;margin-top:16px">Message</p><p style="white-space:pre-wrap">${esc(message)}</p>` : ""}<p style="color:#666;margin-top:16px">Reply to this email to answer them.</p>`;
  const { messageId } = await EMAIL.send({ from: FROM, to: LEADS_TO, replyTo, subject, text, html });
  console.log(JSON.stringify({ event: "lead_email_sent", form, messageId })); // no visitor details
  return messageId;
}

// Error codes only, never message content or the visitor's details.
export function logSendFailure(form: string, err: unknown) {
  const e = err as { code?: string; message?: string };
  console.error(JSON.stringify({ event: "lead_email_failed", form, code: e?.code ?? null, error: String(e?.message ?? err).replace(/[^\s@<>]+@[^\s@<>]+/g, "<email>").slice(0, 200) }));
}

export type Lead = { source: string; email: string; name?: string; company?: string; phone?: string; about?: string; message?: string; page?: string; whatsappOk?: boolean };

// Saves the lead, then emails it. Returns true when the lead was kept by at least one of the two, so the
// visitor is told "received" only when that is true. Each failure is logged (without visitor details) and the
// CRM row shows whether the email went out.
export async function captureLead(lead: Lead, email: Parameters<typeof sendLeadEmail>[0]): Promise<boolean> {
  const { CRM } = await env();
  let id: number | null = null;
  try {
    if (!CRM) throw new Error("CRM binding is not configured");
    const r = await CRM.prepare("INSERT INTO leads (source, name, company, email, phone, about, message, page, whatsapp_ok) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(lead.source, lead.name || null, lead.company || null, lead.email, lead.phone || null, lead.about || null, lead.message || null, lead.page || null, lead.whatsappOk ? 1 : 0).run();
    id = r.meta.last_row_id;
  } catch (err) {
    console.error(JSON.stringify({ event: "lead_save_failed", form: lead.source, error: String((err as Error)?.message ?? err).slice(0, 200) }));
  }
  let sent = false;
  try {
    await sendLeadEmail(email);
    sent = true;
  } catch (err) {
    logSendFailure(email.form, err);
  }
  if (id && CRM) await CRM.prepare("UPDATE leads SET email_status = ? WHERE id = ?").bind(sent ? "sent" : "failed", id).run().catch(() => {});
  return sent || id !== null;
}
