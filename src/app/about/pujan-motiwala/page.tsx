import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCta } from "@/components/ClosingCta";
import { jsonLd, siteUrl } from "@/lib/schema";

// The founder's page. /about stays about the client; this page is for the
// reader who wants to know who they'd be working with, and for search engines
// tying the person to the firm (the Person node in orgGraph points here).
// Facts come from Pujan's own resume (24 Oct 2026); only what explains how
// Ahrom Labs works is here, and no figures the site doesn't show elsewhere.

const path = "/about/pujan-motiwala";
const title = "Pujan Motiwala, founder of Ahrom Labs";
const description =
  "Pujan Motiwala founded Ahrom Labs in Ahmedabad: nine years in data science and process mapping, now building the operations and AI systems Indian manufacturers run on.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { type: "profile", url: `${siteUrl}${path}`, siteName: "Ahrom Labs", title, description, firstName: "Pujan", lastName: "Motiwala" },
  twitter: { card: "summary_large_image", title, description },
};

const NEXT: { title: string; body: string; href: string; link: string }[] = [
  {
    title: "Machines and jobs that are about to slip",
    body: "Your job cards, breakdowns and dispatch dates already hold the pattern. A model trained on them can flag the machine due for trouble or the order likely to run late, while there is still time to act.",
    href: "/services/making-and-delivering",
    link: "Making and delivering",
  },
  {
    title: "Cash and stock, before the month closes",
    body: "Receivables, payables and stock movement in one ledger can be projected forward: what comes in, what goes out, and which item runs short first.",
    href: "/services/receivables-from-tally",
    link: "Receivables from Tally",
  },
  {
    title: "The entry that doesn't fit",
    body: "The methods banks and security teams use to catch fraud work on a factory's books too: a rate far off the purchase order, a payment out of pattern, stock that moved without a document. One version already runs: every vendor and freight charge is checked against its agreed rate.",
    href: "/services/operational-intelligence",
    link: "Operational intelligence",
  },
  {
    title: "Customers going quiet, or due to reorder",
    body: "Order history shows who usually buys when. The system can tell sales who has gone silent and who is due, before a competitor calls them.",
    href: "/services/sales-crm",
    link: "Sales CRM",
  },
  {
    title: "Questions answered from your own records",
    body: "Ask in plain words, in English or Hinglish, and get the number from your own data with its source. Invoices, certificates and drawings are read for you and checked by a person before they post.",
    href: "/services/custom-ai-assistant",
    link: "AI assistant",
  },
];

const graph = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}${path}#page`,
  url: `${siteUrl}${path}`,
  name: title,
  description,
  isPartOf: { "@id": `${siteUrl}/#website` },
  mainEntity: { "@id": `${siteUrl}/#founder` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "About", item: `${siteUrl}/about` },
      { "@type": "ListItem", position: 2, name: "Pujan Motiwala", item: `${siteUrl}${path}` },
    ],
  },
};

export default function FounderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <p className="text-sm text-foreground-secondary">
            <Link href="/about" className="text-link focus-ring">About</Link>
          </p>
          <h1 className="display mt-3 text-5xl text-foreground sm:text-6xl">Pujan Motiwala</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            Founder and Principal, Ahrom Labs. I map how a business actually runs, then build the system it runs
            on, and I&apos;m the person who answers when you write in.
          </p>
        </section>

        <section className="section border-t border-line">
          <div className="rail"><div className="prose-measure">
            <h2 className="display text-3xl text-foreground sm:text-4xl">The map comes first</h2>
            <p className="mt-6 leading-relaxed text-foreground-secondary">
              I learned to draw how work moves before I wrote software for anyone. During my master&apos;s in
              Information Systems at Stevens Institute of Technology, where I studied business process management,
              I mapped the workflows of a defence research centre: how each request moved, where it waited and what
              it should look like instead. That habit is the first phase of every Ahrom Labs engagement. We draw
              your business as it is before anything is built, because a system built on the wrong picture only
              makes the workarounds faster.
            </p>

            <h2 className="display mt-14 text-3xl text-foreground sm:text-4xl">Nine years inside other people&apos;s numbers</h2>
            <p className="mt-6 leading-relaxed text-foreground-secondary">
              My work has been where the data meets the money. I analysed insurance claims at Bajaj Allianz and
              customer data at Liberty Mutual. At USAA I built predictive maintenance and asset optimisation
              models, at Arkose Labs fraud and bot detection, and at ABC Fitness churn and retention models across
              their clubs. I also taught Python for data analysis in Columbia University&apos;s Applied Analytics
              programme.
            </p>
            <p className="mt-4 leading-relaxed text-foreground-secondary">
              Every one of those projects taught the same lesson: a model is only as good as the records under it.
              Most Indian manufacturers and traders don&apos;t have an AI problem yet. They have a records problem:
              the truth is split across Tally, spreadsheets and a few people&apos;s memory. So that&apos;s where we
              start.
            </p>

            <h2 className="display mt-14 text-3xl text-foreground sm:text-4xl">What I build at Ahrom Labs</h2>
            <p className="mt-6 leading-relaxed text-foreground-secondary">
              Since 2024 Ahrom Labs has built and run the operations and accounting systems for an electronics
              component trader, an interior design studio and its furniture workshop, and a boiler manufacturer:
              sales to dispatch, stock, statutory documents, payroll, TallyPrime posting, and AI that reads
              invoices and answers questions from the books, with a person confirming anything that matters. The
              systems are in <Link href="/work" className="text-link focus-ring">the work</Link>; how they were
              built, and why, is in the <Link href="/notes" className="text-link focus-ring">engineering notes</Link>{" "}
              and <Link href="/patterns" className="text-link focus-ring">patterns</Link>, every one written by me.
            </p>
          </div></div>
        </section>

        <section className="section border-t border-line">
          <div className="rail">
            <div className="prose-measure">
              <h2 className="display text-3xl text-foreground sm:text-4xl">Where your system goes next</h2>
              <p className="mt-6 leading-relaxed text-foreground-secondary">
                Once your records live in one structure, the work I did for banks, insurers and security teams
                applies to your business too. These are the next steps on a system you already run, and none of
                them needs a new one.
              </p>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
              {NEXT.map((n) => (
                <li key={n.title}>
                  <h3 className="text-lg font-medium text-foreground">{n.title}</h3>
                  <p className="mt-2 leading-relaxed text-foreground-secondary">{n.body}</p>
                  <p className="mt-2 text-sm">
                    <Link href={n.href} className="text-link focus-ring">{n.link}</Link>
                  </p>
                </li>
              ))}
            </ul>
            <p className="prose-measure mt-10 leading-relaxed text-foreground-secondary">
              The rule doesn&apos;t change as the AI grows. The system suggests, a person confirms, and nothing
              posts to your books on a guess.
            </p>
          </div>
        </section>

        <section className="section border-t border-line">
          <div className="rail"><div className="prose-measure">
            <h2 className="display text-3xl text-foreground sm:text-4xl">Elsewhere</h2>
            <dl className="mt-6 space-y-4 leading-relaxed">
              <div>
                <dt className="font-medium text-foreground">Education</dt>
                <dd className="text-foreground-secondary">
                  Master&apos;s in Information Systems, Stevens Institute of Technology, USA (2016). Bachelor&apos;s
                  in Information Technology, Gujarat Technological University (2014).
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Also founded</dt>
                <dd className="text-foreground-secondary">
                  <a href="https://clickcatalyst.digital/author/pujan-motiwala" className="text-link focus-ring">ClickCatalyst</a>,
                  a separate company that builds Google Ads audit software.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Profiles</dt>
                <dd className="text-foreground-secondary">
                  <a href="https://www.linkedin.com/in/pujanmotiwala/" className="text-link focus-ring" rel="me">LinkedIn</a>
                  {" · "}
                  <a href="https://github.com/PujanMotiwala" className="text-link focus-ring" rel="me">GitHub</a>
                  {" · "}
                  <a href="mailto:pujan@ahromlabs.com" className="text-link focus-ring">pujan@ahromlabs.com</a>
                </dd>
              </div>
            </dl>
          </div></div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
