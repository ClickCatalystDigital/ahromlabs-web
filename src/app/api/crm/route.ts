import { env, underRateLimit } from "@/lib/lead-email";

// The CRM: every lead saved by lib/lead-email.ts (contact form + the three demos), newest first, with a status
// and notes per lead. Sign-in form: username = CRM_USER (wrangler.jsonc vars), password = the CRM_PASSWORD
// Worker secret. A signed cookie keeps the browser signed in for 30 days; changing the password signs
// everyone out.
// ponytail: one server-rendered page, no framework UI. Add CSV export when the list outgrows a screen.
const STATUSES = ["new", "contacted", "qualified", "won", "lost", "spam"];
const SOURCES: Record<string, string> = { contact: "Contact form", "demo:boiler": "SB Ops demo", "demo:electronics": "Inventory Ops demo", "demo:interiors": "Designer Ops demo" };
const COOKIE = "crm_session";
const SESSION_DAYS = 30;

type Row = { id: number; created_at: string; source: string; name: string | null; company: string | null; email: string; phone: string | null;
  about: string | null; message: string | null; page: string | null; email_status: string; status: string; notes: string; updated_at: string | null };

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const HEADERS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "X-Frame-Options": "DENY" };

// Equal-time comparison, so a value can't be guessed a character at a time.
function same(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(mac))).replace(/[+/=]/g, (c) => ({ "+": "-", "/": "_", "=": "" })[c]!);
}

// Cookie value: "<expiry ms>.<HMAC of expiry keyed by the password>".
async function signedIn(request: Request, secret: string) {
  const value = (request.headers.get("cookie") || "").match(new RegExp(`(?:^|; )${COOKIE}=([^;]+)`))?.[1] || "";
  const [expiry, mac] = value.split(".");
  return Number(expiry) > Date.now() && !!mac && same(mac, await sign(expiry, secret));
}

const page = (title: string, body: string, status = 200, extra: Record<string, string> = {}) => new Response(`<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title><style>
:root{--bg:#fbfbfc;--card:#fff;--fg:#18181b;--muted:#52525b;--line:#e4e4e7;--accent:#1d3461;--warn:#b45309;--danger:#9f1d1d}
@media(prefers-color-scheme:dark){:root{--bg:#0f0f11;--card:#18181b;--fg:#f4f4f5;--muted:#a1a1aa;--line:#2e2e33;--accent:#93b4f0;--warn:#f59e0b;--danger:#f87171}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.5 ui-sans-serif,system-ui,-apple-system,sans-serif}
a{color:var(--accent)}main{max-width:1100px;margin:0 auto;padding:24px 16px 64px}
header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}h1{font-size:22px;margin:0;font-weight:600}
.muted{color:var(--muted)}.small{font-size:12px}
input,select,textarea,button{font:inherit;color:inherit}input,select,textarea{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:8px 10px;width:100%}
input:focus,select:focus,textarea:focus{outline:2px solid var(--accent);outline-offset:-1px}
button{background:var(--accent);color:var(--bg);border:0;border-radius:6px;padding:8px 14px;cursor:pointer;font-weight:500}
.ghost{background:none;color:var(--muted);border:1px solid var(--line)}
.bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 16px}.bar input{max-width:280px}
.tab{padding:5px 12px;border:1px solid var(--line);border-radius:99px;text-decoration:none;color:var(--muted);text-transform:capitalize;background:var(--card)}
.tab.on{background:var(--fg);color:var(--bg);border-color:var(--fg)}
.alert{padding:10px 12px;border-radius:8px;border:1px solid var(--warn);color:var(--warn);margin-bottom:16px}
.lead{display:grid;grid-template-columns:1.1fr 1.6fr 1fr;gap:20px;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:16px;margin-bottom:12px}
.lead.new{border-left:3px solid var(--accent)}.who b{font-size:15px;display:block}.who div{margin-top:2px;overflow-wrap:anywhere}
.msg{white-space:pre-wrap;overflow-wrap:anywhere}.msg p{margin:0 0 6px}
.pill{display:inline-block;font-size:12px;padding:1px 8px;border-radius:99px;border:1px solid var(--line);color:var(--muted);text-transform:capitalize}
.pill.warn{border-color:var(--warn);color:var(--warn)}
.edit{display:grid;gap:6px;align-content:start}.edit .row{display:flex;gap:6px}.edit select{flex:1}
.login{max-width:340px;margin:12vh auto;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:24px;display:grid;gap:12px}
.login label{display:grid;gap:4px;font-weight:500}.error{color:var(--danger)}
@media(max-width:760px){.lead{grid-template-columns:1fr;gap:12px}}
</style></head><body><main>${body}</main></body></html>`, { status, headers: { ...HEADERS, "Content-Type": "text/html; charset=utf-8", ...extra } });

const loginPage = (error = "", status = 200) => page("Sign in · Ahrom CRM", `<form class="login" method="post" action="/api/crm">
<h1>Ahrom CRM</h1><input type="hidden" name="action" value="login">
<label>Username<input name="username" autocomplete="username" required autofocus></label>
<label>Password<input name="password" type="password" autocomplete="current-password" required></label>
${error ? `<div class="error" role="alert">${esc(error)}</div>` : ""}<button>Sign in</button>
<div class="muted small">Stays signed in for ${SESSION_DAYS} days on this browser.</div></form>`, status);

function ago(utc: string) {
  const mins = Math.round((Date.now() - Date.parse(utc.replace(" ", "T") + "Z")) / 60000);
  if (mins < 60) return `${Math.max(mins, 1)} min ago`;
  if (mins < 48 * 60) return `${Math.round(mins / 60)} h ago`;
  return `${Math.round(mins / 1440)} days ago`;
}

export async function GET(request: Request) {
  const { CRM, CRM_PASSWORD } = await env();
  if (!CRM_PASSWORD) return new Response("Not found", { status: 404, headers: HEADERS });
  const url = new URL(request.url);
  if (url.searchParams.has("logout")) {
    return new Response(null, { status: 303, headers: { ...HEADERS, Location: "/api/crm", "Set-Cookie": `${COOKIE}=; Path=/api/crm; Max-Age=0; HttpOnly; Secure; SameSite=Strict` } });
  }
  if (!(await signedIn(request, CRM_PASSWORD))) return loginPage();

  const filter = url.searchParams.get("status") || "";
  const { results } = await (STATUSES.includes(filter)
    ? CRM!.prepare("SELECT * FROM leads WHERE status = ? ORDER BY id DESC LIMIT 500").bind(filter)
    : CRM!.prepare("SELECT * FROM leads ORDER BY id DESC LIMIT 500").bind()).all<Row>();
  const counts = (await CRM!.prepare("SELECT status, COUNT(*) AS n FROM leads GROUP BY status").bind().all<{ status: string; n: number }>()).results;
  const count = (s: string) => counts.find((c) => c.status === s)?.n ?? 0;
  const unsent = results.filter((r) => r.email_status !== "sent").length;

  const tabs = [["", `All ${counts.reduce((a, c) => a + c.n, 0)}`], ...STATUSES.map((s) => [s, `${s} ${count(s)}`])]
    .map(([s, label]) => `<a class="tab${s === filter ? " on" : ""}" href="?status=${s}">${esc(label)}</a>`).join("");
  const leads = results.map((r) => `<article class="lead ${esc(r.status)}" data-search="${esc([r.name, r.company, r.email, r.phone, r.about, r.message, r.notes].join(" ").toLowerCase())}">
<div class="who">${r.name ? `<b>${esc(r.name)}</b>` : ""}${r.company ? `<div>${esc(r.company)}</div>` : ""}
<div><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></div>${r.phone ? `<div><a href="tel:${esc(r.phone.replace(/[^\d+]/g, ""))}">${esc(r.phone)}</a></div>` : ""}
<div class="small muted" style="margin-top:8px" title="${esc(r.created_at)} UTC">${esc(SOURCES[r.source] ?? r.source)} · ${ago(r.created_at)}</div>
${r.email_status !== "sent" ? `<span class="pill warn" style="text-transform:none">Email ${esc(r.email_status)}</span>` : ""}</div>
<div class="msg">${r.about ? `<p>${esc(r.about)}</p>` : ""}${r.message ? `<p>${esc(r.message)}</p>` : ""}${!r.about && !r.message ? '<span class="muted">No message</span>' : ""}${r.page ? `<div class="small muted">from ${esc(r.page)}</div>` : ""}</div>
<form class="edit" method="post" action="/api/crm?status=${esc(filter)}"><input type="hidden" name="id" value="${r.id}">
<div class="row"><select name="status" aria-label="Status">${STATUSES.map((s) => `<option${s === r.status ? " selected" : ""}>${s}</option>`).join("")}</select><button>Save</button></div>
<textarea name="notes" rows="3" aria-label="Notes" placeholder="Notes: call, next step…">${esc(r.notes)}</textarea>
${r.updated_at ? `<span class="small muted">Updated ${ago(r.updated_at)}</span>` : ""}</form></article>`).join("");

  return page("Leads · Ahrom CRM", `<header><div><h1>Leads</h1><div class="muted">${count("new")} new waiting for a reply</div></div>
<a class="tab" style="text-transform:none" href="?logout">Sign out</a></header>
${unsent ? `<div class="alert">${unsent} lead${unsent > 1 ? "s" : ""} below did not reach your inbox. Nothing is lost: they are saved here.</div>` : ""}
<div class="bar">${tabs}<input type="search" id="q" placeholder="Search name, company, email, notes" aria-label="Search leads"></div>
${leads || '<p class="muted">No leads here yet.</p>'}
<script>document.getElementById("q").oninput=e=>{const q=e.target.value.toLowerCase();document.querySelectorAll(".lead").forEach(l=>l.hidden=!l.dataset.search.includes(q))}</script>`);
}

export async function POST(request: Request) {
  const { CRM, CRM_PASSWORD, CRM_USER } = await env();
  if (!CRM_PASSWORD) return new Response("Not found", { status: 404, headers: HEADERS });
  // Forms only from this page (the cookie is SameSite=Strict as well).
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return new Response("Forbidden", { status: 403, headers: HEADERS });
  const form = await request.formData();

  if (form.get("action") === "login") {
    // 5 tries a minute per IP.
    if (!(await underRateLimit(`crm:${request.headers.get("cf-connecting-ip") || "unknown"}`))) return loginPage("Too many attempts. Wait a minute and try again.", 429);
    const okUser = same(String(form.get("username") || "").trim().toLowerCase(), (CRM_USER || "").toLowerCase());
    const okPass = same(String(form.get("password") || ""), CRM_PASSWORD);
    if (!okUser || !okPass) return loginPage("Wrong username or password.", 401);
    const expiry = String(Date.now() + SESSION_DAYS * 86400000);
    return new Response(null, { status: 303, headers: { ...HEADERS, Location: "/api/crm",
      "Set-Cookie": `${COOKIE}=${expiry}.${await sign(expiry, CRM_PASSWORD)}; Path=/api/crm; Max-Age=${SESSION_DAYS * 86400}; HttpOnly; Secure; SameSite=Strict` } });
  }

  if (!(await signedIn(request, CRM_PASSWORD))) return loginPage("", 401);
  const id = Number(form.get("id"));
  const status = String(form.get("status") || "");
  const notes = String(form.get("notes") || "").slice(0, 5000);
  if (!Number.isInteger(id) || !STATUSES.includes(status)) return new Response("Bad request", { status: 400, headers: HEADERS });
  await CRM!.prepare("UPDATE leads SET status = ?, notes = ?, updated_at = datetime('now') WHERE id = ?").bind(status, notes, id).run();
  return new Response(null, { status: 303, headers: { ...HEADERS, Location: `/api/crm?status=${encodeURIComponent(new URL(request.url).searchParams.get("status") || "")}` } });
}
