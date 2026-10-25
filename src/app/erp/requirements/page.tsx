import type { Metadata } from "next";
import Link from "next/link";
import { ErpPage } from "@/components/ErpPage";
import { GuideH2 } from "@/components/GuidePage";
import { getContent } from "@/lib/content";
import { services, serviceUrl } from "@/lib/services";
import {
  requirements, departments, deptItems, ERP_DOCS, ERP_CHECKED, ERP_PUBLISHED, ERP_VERSION,
  DEMO_URL, PRIORITY_LABEL, INDUSTRY_LABEL, BUILT_LABEL, type Requirement,
} from "@/lib/erp";
import { erpPageGraph } from "@/lib/schema";
import { seoTitle } from "@/lib/seo";

const title = "ERP requirements checklist for Indian manufacturers and traders";
const lead = `${requirements.length} ERP requirements in ${departments.length} departments, each written so you can test it: what to ask for, why it matters, and what to make a vendor show you. Indian statutory requirements are quoted from the official text, and figures come from systems running today.`;

const image = { src: "/erp/erp-requirements-checklist.webp", alt: "A long checklist sheet with tick boxes, the first few ticked, and a pen beside it.", width: 1086, height: 362 };

export const metadata: Metadata = {
  title: seoTitle(title),
  description: "ERP requirements checklist for Indian manufacturers and traders: testable requirements by department, with vendor demo tests and quoted GST and MCA rules.",
  alternates: { canonical: "/erp/requirements" },
  openGraph: { type: "website", url: "https://ahromlabs.com/erp/requirements", siteName: "Ahrom Labs", title, description: lead, images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] },
  twitter: { card: "summary_large_image", title, description: lead },
};

const anchor = (id: string) => id.replace(/\./g, "-");
const titleOf = (kind: "note" | "pattern" | "term", slug: string) => getContent(kind).find((e) => e.slug === slug)?.title ?? slug;
const serviceOf = (slug: string) => services.find((s) => s.slug === slug);

function Item({ r }: { r: Requirement }) {
  const svc = r.service ? serviceOf(r.service) : undefined;
  const s = r.statutory;
  const links: { href: string; label: string }[] = [
    ...(svc ? [{ href: serviceUrl(svc), label: svc.name }] : []),
    ...(r.note ? [{ href: `/notes/${r.note}`, label: titleOf("note", r.note) }] : []),
    ...(r.pattern ? [{ href: `/patterns/${r.pattern}`, label: `Pattern: ${titleOf("pattern", r.pattern)}` }] : []),
    ...(r.term ? [{ href: `/systems/${r.term}`, label: `Glossary: ${titleOf("term", r.term)}` }] : []),
    ...(r.service === "custom-ai-assistant" ? [{ href: "/ai-assistant/vendor-test", label: "How to test an AI assistant" }] : []),
  ];
  return (
    <article id={anchor(r.id)} className="mt-10 scroll-mt-24 border-t border-line pt-6">
      <h3 className="text-xl font-medium text-foreground">{r.question}</h3>
      <p className="mt-3 leading-relaxed text-foreground">{r.text}</p>
      <p className="mt-2 text-xs uppercase tracking-wide text-foreground-secondary">
        {PRIORITY_LABEL[r.priority]} · {r.appliesTo.map((i) => INDUSTRY_LABEL[i]).join(", ")}
        {r.when?.turnoverAtLeast ? ` · turnover above ₹${r.when.turnoverAtLeast} crore` : ""}
        {r.when?.tally === "keep" ? " · if Tally stays" : r.when?.tally === "replace" ? " · if Tally is replaced" : ""}
      </p>
      <dl className="mt-4 space-y-3 text-sm leading-relaxed">
        <div>
          <dt className="font-medium text-foreground">Why</dt>
          <dd className="text-foreground-secondary">{r.why}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">What to make a vendor show</dt>
          <dd className="text-foreground-secondary">{r.test}</dd>
        </div>
        {r.benchmark && (
          <div>
            <dt className="font-medium text-foreground">What good looks like, from a live system</dt>
            <dd className="text-foreground-secondary">{r.benchmark}</dd>
          </div>
        )}
        {r.failure && (
          <div>
            <dt className="font-medium text-foreground">What went wrong without it</dt>
            <dd className="text-foreground-secondary">{r.failure}</dd>
          </div>
        )}
        {s && (
          <div>
            <dt className="font-medium text-foreground">The law</dt>
            <dd className="text-foreground-secondary">
              {s.quote ? <q className="italic text-foreground">{s.quote}</q> : s.cited}{" "}
              <a href={ERP_DOCS[s.doc].url} className="text-link focus-ring">{s.law}</a>. In force: {s.effective}. Applies to: {s.appliesWhen}.
            </dd>
          </div>
        )}
        {r.built && r.built !== "live" && (
          <div>
            <dt className="font-medium text-foreground">Ahrom Labs</dt>
            <dd className="text-foreground-secondary">{BUILT_LABEL[r.built]}.</dd>
          </div>
        )}
      </dl>
      {(links.length > 0 || r.demo) && (
        <p className="mt-4 text-sm">
          {links.map((l, i) => (
            <span key={l.href}>
              {i > 0 && " · "}
              <Link href={l.href} className="text-link focus-ring">{l.label}</Link>
            </span>
          ))}
          {r.demo && (
            <>
              {links.length > 0 && " · "}
              <a href={DEMO_URL[r.demo.client]} className="text-link focus-ring">Try it in the demo</a>
              <span className="text-foreground-secondary"> (sign in as {r.demo.as})</span>
            </>
          )}
        </p>
      )}
    </article>
  );
}

export default function ErpRequirementsPage() {
  const trail = [
    { name: "ERP requirements", path: "/erp" },
    { name: "Checklist", path: "/erp/requirements" },
  ];
  return (
    <ErpPage
      graph={erpPageGraph({ path: "/erp/requirements", title, description: lead, published: ERP_PUBLISHED, updated: ERP_CHECKED, trail, image })}
      trail={trail}
      title={title}
      lead={lead}
      art={image.src}
      checked={ERP_CHECKED}
      updated={ERP_CHECKED}
      headings={departments.map((d) => d.name)}
    >
      <p className="leading-relaxed text-foreground-secondary">
        Every line has a test: ask the vendor to do it in front of you, and check it again before go-live. Lines marked
        with a law are required of the business, not just good practice. To get only the lines that apply to you,
        use the <Link href="/erp/check" className="text-link focus-ring">requirements builder</Link>; to send them out, use
        the <Link href="/erp/template" className="text-link focus-ring">Excel template</Link>.
      </p>
      <p className="mt-4 text-sm text-foreground-secondary">
        Version {ERP_VERSION}. Free to reuse under{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/" className="text-link focus-ring" rel="license">CC BY 4.0</a>, with credit to
        Ahrom Labs. As data: <a href="/erp/requirements.json" className="text-link focus-ring">JSON</a> ·{" "}
        <a href="/erp/erp-requirements-template.csv" className="text-link focus-ring" download>CSV</a>. Cite as: Ahrom Labs, &ldquo;ERP
        requirements checklist for Indian manufacturers and traders&rdquo;, version {ERP_VERSION}, ahromlabs.com/erp/requirements.
      </p>
      {departments.map((d) => (
        <section key={d.slug}>
          <GuideH2>{d.name}</GuideH2>
          <p className="mt-4 leading-relaxed text-foreground-secondary">
            <strong className="font-medium text-foreground">{d.question}</strong> {d.answer}
          </p>
          {deptItems(d.slug).map((r) => (
            <Item key={r.id} r={r} />
          ))}
        </section>
      ))}
    </ErpPage>
  );
}
