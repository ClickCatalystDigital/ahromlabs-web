// Turns away made-up emails on the contact form and the four demos' entry forms (they ask through api/demo-lead),
// so the CRM never starts a sequence that bounces. Two checks: obvious placeholders, and a domain with no mail server
// (MX looked up over Cloudflare's free DNS-over-HTTPS resolver, no key, no billing). Returns the message to show,
// or null when the address may be real.
// ponytail: a made-up mailbox at a real provider (admin@gmail.com) still passes; only an emailed code stops that.
// When the lookup itself fails (timeout, resolver down) the address is allowed: a real visitor is never blocked by us.

const FREE_MAIL = /@(gmail|googlemail|yahoo|ymail|hotmail|outlook|live|rediffmail|icloud|proton|protonmail)\./;
// Placeholder mailbox names; admin@/info@-style names only count at free mail, since a company can own admin@its-domain.
const PLACEHOLDER = /^(test|testing|tester|dummy|fake|sample|example|asdf|qwerty|abc|xyz|aaa|123)\d*@/;
const PLACEHOLDER_FREE = /^(admin|demo|user|email|mail|info|none|na|me|name|your\.?name|yourname)\d*@/;
const FAKE_DOMAIN = /@(example\.(com|org|net)|(email|test|abc|xyz|asdf|domain|company|sample)\d*\.(com|in|net|org|co))$/;
// Throwaway-inbox services seen in our leads or widely used; matched against the domain and its mail server.
const THROWAWAY = ["mailinator.com", "yopmail.com", "guerrillamail.com", "sharklasers.com", "10minutemail.com", "temp-mail.org",
  "tempmail.com", "getnada.com", "maildrop.cc", "dispostable.com", "trashmail.com", "throwawaymail.com", "fakeinbox.com",
  "emailondeck.com", "mohmal.com", "1secmail.com", "moblha.com", "wallywatts.com", "wabblywabble.com"];
const throwaway = (host: string) => THROWAWAY.some((t) => host === t || host.endsWith("." + t));

const REAL = "Please use your real email address, so we can reach you.";

export async function emailProblem(raw: string): Promise<string | null> {
  const email = raw.trim().toLowerCase();
  const domain = email.split("@")[1] ?? "";
  if (PLACEHOLDER.test(email) || FAKE_DOMAIN.test(email) || (FREE_MAIL.test(email) && PLACEHOLDER_FREE.test(email))) return REAL;
  if (throwaway(domain)) return "Please use your work or personal email, not a temporary inbox.";
  let mx: string[];
  try {
    const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`,
      { headers: { accept: "application/dns-json" }, signal: AbortSignal.timeout(3000) });
    const j = (await r.json()) as { Status: number; Answer?: { type: number; data: string }[] };
    if (j.Status !== 0 && j.Status !== 3) return null; // resolver trouble (SERVFAIL etc.): allow
    // "0 ." is a null MX: the domain says it takes no mail.
    mx = (j.Answer ?? []).filter((a) => a.type === 15).map((a) => a.data.split(" ")[1]?.replace(/\.$/, "") ?? "").filter(Boolean);
  } catch {
    return null;
  }
  if (!mx.length) return `We couldn't find a mail server for ${domain}. Please check the spelling, or use your work email.`;
  if (mx.some(throwaway)) return "Please use your work or personal email, not a temporary inbox.";
  return null;
}
