import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCta } from "@/components/ClosingCta";
import { formatDate } from "@/lib/content";
import { IBR_2026_URL, jsonLd } from "@/lib/schema";

// Shared frame for every /ibr page: breadcrumb, title and lead, the body, then
// what each page owes a reader of regulatory content — the official sources,
// when it was last checked against the Gazette, its boundary — and the way on
// to the system that produces these documents.

export type IbrSource = { title: string; publisher: string; url: string; date: string };

const GAZETTE: IbrSource = {
  title: "Indian Boiler Regulations, 2026 (Gazette of India, Extraordinary, No. 596)",
  publisher: "Central Boilers Board, Department for Promotion of Industry and Internal Trade",
  url: IBR_2026_URL,
  date: "2026-10-01",
};

export const ibrMarkdown = {
  h2: (props: ComponentProps<"h2">) => <h2 className="display mt-12 text-3xl text-foreground first:mt-0 sm:text-4xl" {...props} />,
  h3: (props: ComponentProps<"h3">) => <h3 className="mt-8 text-xl font-medium text-foreground" {...props} />,
  p: (props: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-foreground-secondary" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground-secondary" {...props} />,
  ol: (props: ComponentProps<"ol">) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-foreground-secondary" {...props} />,
  a: (props: ComponentProps<"a">) => <a className="text-link focus-ring" {...props} />,
  strong: (props: ComponentProps<"strong">) => <strong className="font-medium text-foreground" {...props} />,
};

export function IbrPage(props: {
  graph: unknown;
  trail: { name: string; path: string }[];
  title: string;
  lead: string;
  checked: string;
  updated: string;
  sources?: IbrSource[];
  children: ReactNode;
}) {
  const sources = [GAZETTE, ...(props.sources ?? []).filter((s) => s.url !== GAZETTE.url)];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(props.graph) }} />
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <nav aria-label="Breadcrumb" className="text-sm text-foreground-secondary">
            <Link href="/" className="text-link focus-ring">Home</Link>
            {props.trail.slice(0, -1).map((c) => (
              <span key={c.path}>
                {" › "}
                <Link href={c.path} className="text-link focus-ring">{c.name}</Link>
              </span>
            ))}
          </nav>
          <h1 className="display mt-6 text-5xl text-foreground sm:text-6xl">{props.title}</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">{props.lead}</p>
          <p className="mt-6 text-sm text-foreground-secondary">
            Under the Indian Boiler Regulations, 2026, in force from 1 October 2026 · Checked against the Gazette on{" "}
            <time dateTime={props.checked}>{formatDate(props.checked)}</time>
          </p>
        </section>

        <section className="section border-t border-line">
          <div className="rail prose-measure">
            {props.children}

            <div className="mt-12 border-t border-line pt-8">
              <h2 className="text-sm font-medium text-foreground-secondary">Official sources</h2>
              <ul className="mt-3 space-y-2">
                {sources.map((s) => (
                  <li key={s.url} className="text-foreground-secondary">
                    <a href={s.url} className="text-link focus-ring">{s.title}</a>
                    {`. ${s.publisher}, ${formatDate(s.date)}.`}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-line pt-8">
              <h2 className="text-sm font-medium text-foreground-secondary">What this page is not</h2>
              <p className="mt-3 leading-relaxed text-foreground-secondary">
                A guide to the Indian Boiler Regulations, 2026, written by Ahrom Labs from the Gazette text; it is not legal
                advice. The Gazette governs wherever this page differs from it, and a state&apos;s Chief Inspector of Boilers
                may set procedures of their own. Last updated {formatDate(props.updated)}.
              </p>
            </div>

            <div className="mt-8 border-t border-line pt-8">
              <h2 className="text-sm font-medium text-foreground-secondary">Keeping a boiler folder without retyping it</h2>
              <p className="mt-3 leading-relaxed text-foreground-secondary">
                Ahrom Labs built the operations system Shanti Boilers uses to produce each boiler&apos;s statutory folder from
                its bank of material test certificates.{" "}
                <Link href="/industries/boiler-pressure-vessel-manufacturing" className="text-link focus-ring">
                  ERP for boiler manufacturers
                </Link>
                {" · "}
                <a href="https://boiler-erp.ahromlabs.com/demo" className="text-link focus-ring">Try the live demo</a>
                {" · "}
                <Link href="/notes/ibr-statutory-folder-from-bom" className="text-link focus-ring">
                  How the folder is produced
                </Link>
              </p>
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
