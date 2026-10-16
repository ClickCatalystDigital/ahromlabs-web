import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const description =
  "How Ahrom Labs collects and uses personal data: website forms, business outreach by email and WhatsApp, meetings, analytics and the systems we build for clients.";

export const metadata: Metadata = {
  title: "Privacy policy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", url: "https://ahromlabs.com/privacy", siteName: "Ahrom Labs", title: "Privacy policy | Ahrom Labs", description },
};

const UPDATED = "16 October 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-foreground-secondary">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <article className="rail pt-16 pb-24 md:pt-24">
          <h1 className="display text-5xl text-foreground sm:text-6xl">Privacy policy</h1>
          <div className="prose-measure">
            <p className="mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
              Ahrom Labs builds operational software for manufacturers and traders. This page explains what personal data we
              collect, why, who helps us process it, and how to have it corrected or deleted. Last updated {UPDATED}.
            </p>

            <Section title="Who we are">
              <p>Ahrom Labs, based in Ahmedabad, India. For anything about your data, write to <a className="underline" href="mailto:pujan@ahromlabs.com">pujan@ahromlabs.com</a>.</p>
            </Section>

            <Section title="What we collect and why">
              <p><strong>Contact and demo forms.</strong> Your email address and message, and on the demo forms your name, company, phone number and what you are looking for. We use them to reply and to follow up on your enquiry. If you give a WhatsApp number and tick the box, we may also reply and send occasional updates about our work on WhatsApp.</p>
              <p><strong>Business outreach.</strong> We write to businesses we think we can help, using business contact details (name, role, work email, company phone) from public company records and business data providers. Every outreach email has an unsubscribe link, and replying &ldquo;no&rdquo; also stops it. Once you opt out we keep your address on a never-contact list so you are not contacted again.</p>
              <p><strong>WhatsApp.</strong> We message people on WhatsApp only when they wrote to us first or agreed to it. Messages are about your enquiry, a meeting, or occasional updates on our work. Reply &ldquo;stop&rdquo; at any time and we will not message you again.</p>
              <p><strong>Meetings.</strong> When you book a call, Google Calendar records your name, email and the time you chose.</p>
              <p><strong>Analytics.</strong> Google Analytics runs only after you accept it. It records pages visited and how the site is used, not who you are.</p>
              <p><strong>Systems we build for clients.</strong> Business data in a client&rsquo;s system is used to run and support that system. Outside that, we use it only anonymised and aggregated.</p>
            </Section>

            <Section title="Who processes it for us">
              <p>Cloudflare (website, database and email sending), Google (email, calendar and analytics), Meta (WhatsApp), and an AI service reached through OpenRouter that reads replies to our emails and WhatsApp messages so we can answer the important ones first. They process data on our behalf; we do not sell personal data to anyone.</p>
            </Section>

            <Section title="How long we keep it">
              <p>As long as the conversation or work with you continues, and then only what we need for our records. Outreach contacts are removed on request; the never-contact list is kept so we respect your choice.</p>
            </Section>

            <Section title="Your choices">
              <p>Under India&rsquo;s Digital Personal Data Protection Act, 2023, you can ask to see the data we hold about you, correct it, have it deleted, or withdraw consent you gave. Email <a className="underline" href="mailto:pujan@ahromlabs.com">pujan@ahromlabs.com</a> and we will respond within 30 days.</p>
            </Section>

            <Section title="Changes">
              <p>If this policy changes, we update this page and the date at the top.</p>
            </Section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
