import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/lead-email";

// Called by the three live demos (boiler-erp, electronics-erp, interiors-erp .ahromlabs.com) when a visitor
// fills in the demo entry form, so each lead arrives by email as well as in that demo's leads database.
// Server to server only: the demos send the shared DEMO_LEAD_KEY (a Worker secret on all four).
const DEMOS: Record<string, string> = { boiler: "SB Ops (boiler-erp)", electronics: "Inventory Ops (electronics-erp)", interiors: "Designer Ops (interiors-erp)" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

export async function POST(request: Request) {
  const key = process.env.DEMO_LEAD_KEY;
  if (!key || request.headers.get("x-demo-key") !== key) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const b = await request.json().catch(() => ({}));
  const demo = DEMOS[clip(b.demo, 20)];
  const lead = { name: clip(b.name, 120), company: clip(b.company, 160), email: clip(b.email, 160), phone: clip(b.phone, 40), about: clip(b.about, 200) };
  if (!demo || !lead.name || !lead.company || !EMAIL_RE.test(lead.email)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  try {
    await sendLeadEmail({
      subject: `Demo lead: ${lead.company} (${demo})`,
      replyTo: lead.email,
      text: [`New visitor on the ${demo} live demo.`, "", `Name: ${lead.name}`, `Company: ${lead.company}`, `Email: ${lead.email}`,
        `Phone: ${lead.phone || "-"}`, `About their business: ${lead.about || "-"}`].join("\n"),
    });
  } catch (err) {
    console.error("Failed to send demo lead email", err);
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
