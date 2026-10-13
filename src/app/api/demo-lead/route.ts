import { NextResponse } from "next/server";
import { captureLead, underRateLimit } from "@/lib/lead-email";

// Called by the three live demos (boiler-erp, electronics-erp, interiors-erp .ahromlabs.com) when a visitor
// fills in the demo entry form, so each lead lands in our CRM and inbox as well as in that demo's leads database.
// Server to server only: the demos send the shared DEMO_LEAD_KEY (a Worker secret on all four). The demo has
// already saved the lead, so a failure here is logged by the demo and never blocks the visitor.
const DEMOS: Record<string, string> = { boiler: "SB Ops (boiler-erp)", electronics: "Inventory Ops (electronics-erp)", interiors: "Designer Ops (interiors-erp)" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

export async function POST(request: Request) {
  const key = process.env.DEMO_LEAD_KEY;
  if (!key || request.headers.get("x-demo-key") !== key) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const b = await request.json().catch(() => ({}));
  const demoKey = clip(b.demo, 20);
  const demo = DEMOS[demoKey];
  const lead = { name: clip(b.name, 120), company: clip(b.company, 160), email: clip(b.email, 160), phone: clip(b.phone, 40), about: clip(b.about, 200) };
  if (!demo || !lead.name || !lead.company || !EMAIL_RE.test(lead.email)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  // These requests all come from the demo Workers, so limit per demo and per visitor email, not per IP.
  if (!(await underRateLimit(`demo-lead:${demoKey}`)) || !(await underRateLimit(`demo-lead:${lead.email.toLowerCase()}`))) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }
  const kept = await captureLead({ source: `demo:${demoKey}`, ...lead }, {
    form: `demo-lead:${demoKey}`,
    subject: `Demo lead: ${lead.company} (${demo})`,
    replyTo: lead.email,
    intro: `New visitor on the ${demo} live demo.`,
    fields: [["Name", lead.name], ["Company", lead.company], ["Email", lead.email], ["Phone", lead.phone], ["About their business", lead.about]],
  });
  if (!kept) return NextResponse.json({ error: "Could not save or send" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
