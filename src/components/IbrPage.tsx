import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCta } from "@/components/ClosingCta";
import { OpenOnWide } from "@/components/OpenOnWide";
import { formatDate, getContent } from "@/lib/content";
import { headingId, textOf } from "@/lib/headings";
import { IBR_2026_URL, jsonLd } from "@/lib/schema";

// Shared frame for every /ibr page, laid out like the industry pages: breadcrumb
// eyebrow, title and lead, the body beside a sticky contents column, then what a
// reader of regulatory content is owed — the official sources, when it was last
// checked against the Gazette, its boundary — and the way on to the system that
// produces these documents.

export type IbrSource = { title: string; publisher: string; url: string; date: string };
export type IbrImage = { src: string; alt: string; width: number; height: number; caption: string };

const GAZETTE: IbrSource = {
  title: "Indian Boiler Regulations, 2026 (Gazette of India, Extraordinary, No. 596)",
  publisher: "Central Boilers Board, Department for Promotion of Industry and Internal Trade",
  url: IBR_2026_URL,
  date: "2026-10-01",
};

// Guides in reading order; any guide not listed here still shows, after these.
const GUIDE_ORDER = ["2026-changes", "registration-documents", "record-keeping", "small-industrial-boilers"];
export function ibrGuides() {
  const rank = (s: string) => GUIDE_ORDER.indexOf(s) + 1 || GUIDE_ORDER.length + 1;
  return [...getContent("guide")].sort((a, b) => rank(a.slug) - rank(b.slug));
}

// Every IBR page links every guide and the forms list. Before this, some guides were
// linked from one other page only, and Google crawls what is linked well first.
const IBR_LINKS = () => [
  ...ibrGuides().map((g) => ({ href: `/ibr/${g.slug}`, title: g.title })),
  { href: "/ibr/forms", title: "IBR 2026 forms list, and their IBR 1950 names" },
];

// Every section heading gets an anchor id, so the contents list, Google's
// "jump to" links and AI answers can point straight at it.
export function IbrH2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 id={headingId(textOf(children))} className={`display mt-14 scroll-mt-24 text-3xl text-foreground first:mt-0 sm:text-4xl ${className}`}>
      {children}
    </h2>
  );
}

export const ibrMarkdown = {
  h2: ({ children }: ComponentProps<"h2">) => <IbrH2>{children}</IbrH2>,
  h3: (props: ComponentProps<"h3">) => <h3 className="mt-8 text-xl font-medium text-foreground" {...props} />,
  p: (props: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-foreground-secondary" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground-secondary" {...props} />,
  ol: (props: ComponentProps<"ol">) => <ol className="mt-4 list-decimal space-y-3 pl-5 text-foreground-secondary" {...props} />,
  a: (props: ComponentProps<"a">) => <a className="text-link focus-ring" {...props} />,
  strong: (props: ComponentProps<"strong">) => <strong className="font-medium text-foreground" {...props} />,
};

// Quotes from the Gazette, one per claim. Folded by default on long lists: the
// text stays in the HTML for crawlers and the site search either way.
export function IbrQuotes({ quotes, open }: { quotes: { quote: string; reg: string }[]; open?: boolean }) {
  return (
    <details open={open} className="group mt-14 border-t border-line pt-8">
      <summary className="focus-ring cursor-pointer list-none text-sm font-medium text-foreground-secondary">
        Quoted from the regulations ({quotes.length}){" "}
        <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90">›</span>
      </summary>
      {quotes.map((q) => (
        <blockquote key={q.quote} className="mt-6 border-l-2 border-line pl-6">
          <p className="italic text-foreground">&ldquo;{q.quote}&rdquo;</p>
          <p className="mt-2 text-sm text-foreground-secondary">{q.reg}</p>
        </blockquote>
      ))}
    </details>
  );
}

export function IbrPage(props: {
  graph: unknown;
  trail: { name: string; path: string }[];
  title: string;
  lead: string;
  checked: string;
  updated: string;
  headings?: string[];
  image?: IbrImage;
  sources?: IbrSource[];
  children: ReactNode;
}) {
  const sources = [GAZETTE, ...(props.sources ?? []).filter((s) => s.url !== GAZETTE.url)];
  const headings = props.headings ?? [];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(props.graph) }} />
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-foreground-secondary">
            <ol className="flex flex-wrap gap-x-2">
              <li>
                <Link href="/" className="focus-ring hover:underline">Home</Link>
              </li>
              {props.trail.slice(0, -1).map((c) => (
                <li key={c.path} className="before:mr-2 before:content-['·']">
                  <Link href={c.path} className="focus-ring hover:underline">{c.name}</Link>
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="display mt-3 max-w-5xl text-5xl text-foreground sm:text-6xl">{props.title}</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">{props.lead}</p>
          <p className="mt-6 text-sm text-foreground-secondary">
            Pujan Motiwala · Checked against the Gazette on <time dateTime={props.checked}>{formatDate(props.checked)}</time>
            {" · "}IBR 2026, in force from 1 October 2026
          </p>
        </section>

        {props.image && (
          <figure className="rail pb-4">
            {/* Infographic of the page's main point. Alt text repeats every label, since
                crawlers and the site chatbot read the text, not the picture. Width and
                height reserve its space, so the page doesn't jump when it loads. */}
            {/* Links to the full-size file: on a phone the labels are too small to read in place. */}
            <a href={props.image.src} className="focus-ring block max-w-5xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={props.image.src}
                alt={props.image.alt}
                width={props.image.width}
                height={props.image.height}
                fetchPriority="high"
                className="h-auto w-full border border-line bg-white"
              />
            </a>
            <figcaption className="mt-3 text-sm text-foreground-secondary">{props.image.caption}</figcaption>
          </figure>
        )}

        <section className="section border-t border-line">
          <div className="rail lg:grid lg:grid-cols-[minmax(0,65ch)_minmax(0,16rem)] lg:justify-between lg:gap-16">
            {headings.length > 2 && (
              <nav aria-label="On this page" className="mb-12 border-b border-line pb-6 lg:order-2 lg:mb-0 lg:border-0 lg:pb-0">
                <OpenOnWide className="group lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
                  <summary className="focus-ring cursor-pointer list-none text-sm font-medium text-foreground-secondary lg:pointer-events-none">
                    On this page <span aria-hidden="true" className="lg:hidden">({headings.length})</span>{" "}
                    <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90 lg:hidden">›</span>
                  </summary>
                  <ol className="mt-3 space-y-2 text-sm">
                    {headings.map((h) => (
                      <li key={h}>
                        <a href={`#${headingId(h)}`} className="text-link focus-ring">{h}</a>
                      </li>
                    ))}
                  </ol>
                </OpenOnWide>
              </nav>
            )}

            <div className="prose-measure lg:order-1">
              {props.children}

              <div className="mt-14 border-t border-line pt-8">
                <p className="text-lg text-foreground">
                  See a boiler&apos;s IBR folder produced from its material certificates, with a sample company.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a href="https://boiler-erp.ahromlabs.com/demo" className="subscribe-submit focus-ring inline-block">
                    Try the live demo
                  </a>
                  <span className="text-sm text-foreground-secondary">Free. Resets every night.</span>
                </div>
                <p className="mt-4 text-sm text-foreground-secondary">
                  Built for a boiler manufacturer:{" "}
                  <Link href="/industries/boiler-pressure-vessel-manufacturing" className="text-link focus-ring">
                    ERP for boiler manufacturers
                  </Link>
                  {" · "}
                  <Link href="/notes/ibr-statutory-folder-from-bom" className="text-link focus-ring">
                    how the folder is produced
                  </Link>
                </p>
              </div>

              {(() => {
                const here = props.trail.at(-1)?.path;
                const links = IBR_LINKS().filter((l) => l.href !== here);
                return here === "/ibr" ? null : (
                  <nav aria-label="IBR 2026 guides" className="mt-12 border-t border-line pt-8">
                    <h2 className="text-sm font-medium text-foreground-secondary">IBR 2026 guides</h2>
                    <ul className="mt-3 space-y-2">
                      {links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="text-link focus-ring">{l.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                );
              })()}

              <div className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-8 text-sm sm:grid-cols-2">
                <div>
                  <h2 className="font-medium text-foreground-secondary">Official sources</h2>
                  <ul className="mt-3 space-y-3">
                    {sources.map((s) => (
                      <li key={s.url} className="text-foreground-secondary">
                        <a href={s.url} className="text-link focus-ring">{s.title}</a>
                        {`. ${s.publisher}, ${formatDate(s.date)}.`}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-medium text-foreground-secondary">What this page is not</h2>
                  <p className="mt-3 leading-relaxed text-foreground-secondary">
                    A guide written by Ahrom Labs from the Gazette text; not legal advice. The Gazette governs wherever
                    this page differs from it, and a state&apos;s Chief Inspector of Boilers may set procedures of their
                    own. Last updated <time dateTime={props.updated}>{formatDate(props.updated)}</time>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
