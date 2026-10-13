// Sends a lead to our inbox through Resend: the contact form (api/contact) and the three live demos'
// entry forms (api/demo-lead). The recipient is LEADS_TO (wrangler.jsonc vars); RESEND_API_KEY and
// RESEND_FROM are Worker secrets. Throws when the email could not be sent.
export async function sendLeadEmail({ subject, text, replyTo }: { subject: string; text: string; replyTo: string }) {
  const { RESEND_API_KEY, RESEND_FROM, LEADS_TO } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM || !LEADS_TO) throw new Error("Missing Resend environment configuration.");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: RESEND_FROM, to: LEADS_TO, reply_to: replyTo, subject, text }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend API error ${response.status}: ${detail}`);
  }
}
