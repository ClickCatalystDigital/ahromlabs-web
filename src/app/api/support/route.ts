import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { underRateLimit } from "@/lib/lead-email";

// Support form (components/SupportForm.tsx) -> the Ahrom CRM's support desk (ahrom-crm, POST /api/support/web).
// Reached over a service binding (CRM_APP in wrangler.jsonc), so the request never crosses Cloudflare Access and the
// CRM stays private. The shared WEB_SUPPORT_KEY secret (set on both Workers) proves the call comes from here.
// The CRM decides everything else: only emails registered to a client get in (403 otherwise, nothing filed); it
// assigns the request number and the reply-by time and emails the receipt to that registered inbox.
type Env = { CRM_APP?: { fetch: typeof fetch }; WEB_SUPPORT_KEY?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILES = 3;
const MAX_BYTES = 5 * 1024 * 1024;
const FALLBACK = "We couldn't take the request just now. Please email it to pujan@ahromlabs.com and we'll log it for you.";
const NOT_REGISTERED = "This email isn't registered for support. Use the email registered to your company, or ask us to register this one: write to pujan@ahromlabs.com with your name and company.";
const text = (f: FormData, k: string, n: number) => String(f.get(k) ?? "").trim().slice(0, n);

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Fill in the form and try again." }, { status: 400 });

  // Real visitors never fill the hidden "website" field. A bot did: report success, send nothing.
  if (text(form, "website", 200)) return NextResponse.json({ number: "" });

  const email = text(form, "email", 254), subject = text(form, "subject", 200), body = text(form, "body", 20000);
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!subject) return NextResponse.json({ error: "Add a subject." }, { status: 400 });
  if (!body) return NextResponse.json({ error: "Describe what's happening." }, { status: 400 });
  const files = form.getAll("files").filter((x): x is File => typeof x !== "string" && x.size > 0);
  if (files.length > MAX_FILES) return NextResponse.json({ error: `Attach at most ${MAX_FILES} files.` }, { status: 400 });
  const big = files.find((x) => x.size > MAX_BYTES);
  if (big) return NextResponse.json({ error: `${big.name} is over 5 MB.` }, { status: 400 });

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  if (!(await underRateLimit(`support:${ip}`))) {
    return NextResponse.json({ error: "Too many requests from here. Please wait a minute and try again." }, { status: 429 });
  }

  const { CRM_APP, WEB_SUPPORT_KEY } = (await getCloudflareContext({ async: true })).env as unknown as Env;
  if (!CRM_APP || !WEB_SUPPORT_KEY) return NextResponse.json({ error: FALLBACK }, { status: 503 });

  const out = new FormData();
  out.set("email", email);
  out.set("name", text(form, "name", 120));
  out.set("subject", subject);
  out.set("body", body);
  out.set("urgent", form.get("urgent") === "on" ? "1" : "0");
  for (const f of files) out.append("files", f, f.name);

  try {
    // The hostname only names the route inside the CRM Worker; a service binding never goes over the internet.
    const res = await CRM_APP.fetch("https://crm.ahromlabs.com/api/support/web", {
      method: "POST",
      headers: { authorization: `Bearer ${WEB_SUPPORT_KEY}` },
      body: out,
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (res.status === 201) {
      return NextResponse.json({ number: data.number, respondBy: data.respond_by_text });
    }
    if (res.status === 403) return NextResponse.json({ error: NOT_REGISTERED }, { status: 403 });
    // 400 and 429 carry a message written for the person filling the form; anything else is our problem.
    if (res.status === 400 || res.status === 429) return NextResponse.json({ error: String(data.error ?? FALLBACK) }, { status: res.status });
    console.error(JSON.stringify({ event: "support_forward_failed", status: res.status }));
  } catch (err) {
    console.error(JSON.stringify({ event: "support_forward_failed", error: err instanceof Error ? err.name : "unknown" }));
  }
  return NextResponse.json({ error: FALLBACK }, { status: 502 });
}
