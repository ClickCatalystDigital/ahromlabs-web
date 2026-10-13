import { env, underRateLimit } from "@/lib/lead-email";

// The CRM: every lead saved by lib/lead-email.ts (contact form + the three demos), newest first, with a status
// and notes per lead. Behind HTTP Basic auth: any username, password = the CRM_PASSWORD Worker secret.
// ponytail: one page, no framework UI. Add search/export when the list outgrows a screen.
const STATUSES = ["new", "contacted", "qualified", "won", "lost", "spam"];
const SOURCES: Record<string, string> = { contact: "Contact form", "demo:boiler": "SB Ops demo", "demo:electronics": "Inventory Ops demo", "demo:interiors": "Designer Ops demo" };

type Row = { id: number; created_at: string; source: string; name: string | null; company: string | null; email: string; phone: string | null;
  about: string | null; message: string | null; page: string | null; email_status: string; status: string; notes: string; updated_at: string | null };

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const HEADERS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "X-Frame-Options": "DENY" };

// Equal-time comparison, so the password can't be guessed a character at a time.
function same(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

async function authorised(request: Request): Promise<Response | null> {
  const { CRM_PASSWORD } = await env();
  if (!CRM_PASSWORD) return new Response("Not found", { status: 404, headers: HEADERS });
  const header = request.headers.get("authorization") || "";
  let password = "";
  try { password = atob(header.replace(/^Basic /, "")).split(":").slice(1).join(":"); } catch {}
  if (header.startsWith("Basic ") && same(password, CRM_PASSWORD)) return null;
  // Wrong or missing password: 5 tries a minute per IP.
  if (header && !(await underRateLimit(`crm:${request.headers.get("cf-connecting-ip") || "unknown"}`))) {
    return new Response("Too many attempts. Wait a minute.", { status: 429, headers: HEADERS });
  }
  return new Response("Sign in", { status: 401, headers: { ...HEADERS, "WWW-Authenticate": 'Basic realm="Ahrom CRM", charset="UTF-8"' } });
}

export async function GET(request: Request) {
  const denied = await authorised(request);
  if (denied) return denied;
  const { CRM } = await env();
  const filter = new URL(request.url).searchParams.get("status") || "";
  const { results } = await (STATUSES.includes(filter)
    ? CRM!.prepare("SELECT * FROM leads WHERE status = ? ORDER BY id DESC LIMIT 500").bind(filter)
    : CRM!.prepare("SELECT * FROM leads ORDER BY id DESC LIMIT 500").bind()).all<Row>();
  const counts = (await CRM!.prepare("SELECT status, COUNT(*) AS n FROM leads GROUP BY status").bind().all<{ status: string; n: number }>()).results;
  const count = (s: string) => counts.find((c) => c.status === s)?.n ?? 0;
  const failed = results.filter((r) => r.email_status !== "sent").length;

  const tabs = [["", `All (${counts.reduce((a, c) => a + c.n, 0)})`], ...STATUSES.map((s) => [s, `${s} (${count(s)})`])]
    .map(([s, label]) => `<a href="?status=${s}"${s === filter ? ' class="on"' : ""}>${esc(label)}</a>`).join("");
  const rows = results.map((r) => `<tr class="${esc(r.status)}">
<td>${esc(r.created_at)} UTC<br><small>${esc(SOURCES[r.source] ?? r.source)}</small>${r.email_status !== "sent" ? `<br><b class="warn">email ${esc(r.email_status)}</b>` : ""}</td>
<td><b>${esc(r.name || "-")}</b><br>${esc(r.company || "")}<br><a href="mailto:${esc(r.email)}">${esc(r.email)}</a>${r.phone ? `<br><a href="tel:${esc(r.phone)}">${esc(r.phone)}</a>` : ""}</td>
<td class="msg">${esc(r.about || "")}${r.message ? `<p>${esc(r.message)}</p>` : ""}${r.page ? `<small>${esc(r.page)}</small>` : ""}</td>
<td><form method="post" action="?status=${esc(filter)}"><input type="hidden" name="id" value="${r.id}">
<select name="status" aria-label="Status">${STATUSES.map((s) => `<option${s === r.status ? " selected" : ""}>${s}</option>`).join("")}</select>
<textarea name="notes" rows="2" aria-label="Notes" placeholder="Notes">${esc(r.notes)}</textarea>
<button>Save</button>${r.updated_at ? `<small>updated ${esc(r.updated_at)}</small>` : ""}</form></td></tr>`).join("");

  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ahrom CRM</title><meta name="robots" content="noindex"><style>
:root{color-scheme:light dark;--line:#8884;--warn:#c2410c}body{font:14px/1.45 system-ui,sans-serif;margin:0;padding:16px;background:Canvas;color:CanvasText}
h1{font-size:18px;margin:0 0 8px}nav{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 12px}nav a{padding:4px 10px;border:1px solid var(--line);border-radius:99px;text-decoration:none;color:inherit;text-transform:capitalize}
nav a.on{background:CanvasText;color:Canvas}.warn{color:var(--warn)}table{border-collapse:collapse;width:100%}td{border-top:1px solid var(--line);padding:10px 8px;vertical-align:top}
tr.new td:first-child{box-shadow:inset 3px 0 #2563eb}.msg{white-space:pre-wrap;max-width:420px}.msg p{margin:6px 0}small{opacity:.7}
form{display:grid;gap:4px;min-width:200px}textarea,select,button{font:inherit}
@media(max-width:760px){table,tbody,tr,td{display:block}tr{border-top:2px solid var(--line);padding:8px 0}td{border:0;padding:4px 0}}
</style></head><body><h1>Leads</h1>
<p>${count("new")} new waiting for a reply.${failed ? ` <b class="warn">${failed} shown here did not reach your inbox; nothing is lost, they are only here.</b>` : ""}</p>
<nav>${tabs}</nav><table><tbody>${rows || "<tr><td>No leads yet.</td></tr>"}</tbody></table></body></html>`,
    { headers: { ...HEADERS, "Content-Type": "text/html; charset=utf-8" } });
}

export async function POST(request: Request) {
  const denied = await authorised(request);
  if (denied) return denied;
  // Browsers resend Basic auth on cross-site form posts, so only accept posts from this page.
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return new Response("Forbidden", { status: 403, headers: HEADERS });
  const form = await request.formData();
  const id = Number(form.get("id"));
  const status = String(form.get("status") || "");
  const notes = String(form.get("notes") || "").slice(0, 5000);
  if (!Number.isInteger(id) || !STATUSES.includes(status)) return new Response("Bad request", { status: 400, headers: HEADERS });
  const { CRM } = await env();
  await CRM!.prepare("UPDATE leads SET status = ?, notes = ?, updated_at = datetime('now') WHERE id = ?").bind(status, notes, id).run();
  return new Response(null, { status: 303, headers: { ...HEADERS, Location: `/api/crm?status=${encodeURIComponent(new URL(request.url).searchParams.get("status") || "")}` } });
}
