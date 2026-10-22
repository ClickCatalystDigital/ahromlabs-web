import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SupportForm } from "@/components/SupportForm";

// For clients running a system we built. Linked from emails to clients, not from the nav; kept out of search
// and the sitemap. Requests land in the Ahrom CRM's support desk (app/api/support/route.ts).
// Reply targets match the CRM (src/lib/support.ts there) and the decisions in docs/support-desk-plan.md.
export const metadata: Metadata = {
  title: "Support",
  description: "Raise a support request for a system Ahrom Labs built and maintains.",
  alternates: { canonical: "/support" },
  robots: { index: false, follow: false },
};

function Fact({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="text-sm font-medium text-foreground">{title}</dt>
      <dd className="mt-2 text-base leading-relaxed text-foreground-secondary">{children}</dd>
    </div>
  );
}

export default function SupportPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-24 md:pt-24">
          <h1 className="display text-5xl text-foreground sm:text-6xl">Support</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            For businesses running a system we built. Tell us what&apos;s wrong or what you need. Every request gets a
            number and a reply by email.
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-20">
            <dl className="grid content-start gap-8">
              <Fact title="Who can send a request">
                Only emails registered to your company. Use yours and the request goes straight in, with a
                confirmation and its number sent to that inbox. To register an email, yours or a colleague&apos;s, write
                to{" "}
                <a href="mailto:pujan@ahromlabs.com" className="text-link focus-ring">pujan@ahromlabs.com</a>{" "}
                with the person&apos;s name and company.
              </Fact>
              <Fact title="When we reply">
                Within 2 business days. Urgent issues, where the system is down or work has stopped, the same business
                day. Support hours are Monday to Saturday, 10:00 to 19:00 IST, except public holidays.
              </Fact>
              <Fact title="What helps">
                What you were doing, what you expected and what happened instead, with a screenshot if you can. One
                request per issue keeps each one easy to track.
              </Fact>
            </dl>

            <div>
              <SupportForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
