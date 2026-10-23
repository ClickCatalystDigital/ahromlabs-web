import type { Metadata } from "next";
import Link from "next/link";
import { IbrPage, IbrH2, IbrQuotes } from "@/components/IbrPage";
import { ibrForms, ibrFormPages, formName, IBR_FORMS_CHECKED, IBR_FORMS_PUBLISHED } from "@/lib/ibr-forms";
import { ibrPageGraph } from "@/lib/schema";
import { seoTitle, metaDescription } from "@/lib/seo";

// Unknown form slugs 404 rather than render on demand (see notes/[slug]).
export const dynamicParams = false;

export function generateStaticParams() {
  return ibrFormPages().map((f) => ({ form: f.slug }));
}

const get = (slug: string) => ibrFormPages().find((f) => f.slug === slug)!;

// "What is Form IV Part A?" is what people search, so it leads the title; the
// 1950 name rides along because folders will carry the old names for years.
function pageTitle(f: ReturnType<typeof get>) {
  return f.old ? `IBR ${formName(f)} (formerly ${f.old.form}): ${f.title}` : `IBR ${formName(f)}: ${f.title}`;
}

export async function generateMetadata(props: PageProps<"/ibr/forms/[form]">): Promise<Metadata> {
  const f = get((await props.params).form);
  const title = pageTitle(f);
  // The summary alone is a short line; the old name and the regulation are what people search with.
  const description = metaDescription(`${f.summary}${f.old ? ` It was ${f.old.form} under IBR 1950.` : ""} Prescribed by regulation ${f.regulation} of the Indian Boiler Regulations, 2026.`);
  return {
    title: seoTitle(title),
    description,
    alternates: { canonical: `/ibr/forms/${f.slug}` },
    openGraph: { type: "article", url: `https://ahromlabs.com/ibr/forms/${f.slug}`, siteName: "Ahrom Labs", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function IbrFormPage(props: PageProps<"/ibr/forms/[form]">) {
  const f = get((await props.params).form);
  const name = formName(f);
  const page = f.page!;
  const path = `/ibr/forms/${f.slug}`;
  const trail = [
    { name: "IBR", path: "/ibr" },
    { name: "Forms", path: "/ibr/forms" },
    { name, path },
  ];
  const related = ibrForms.filter((o) => o.group === f.group && o.slug !== f.slug);

  const headings = [
    `What is ${name}?`,
    `Who issues and signs ${name}?`,
    `What does ${name} record?`,
    `When is ${name} filed, and with what?`,
    `What changed for ${name} from IBR 1950?`,
  ];

  return (
    <IbrPage
      graph={ibrPageGraph({ path, title: pageTitle(f), description: f.summary, published: IBR_FORMS_PUBLISHED, updated: IBR_FORMS_CHECKED, trail })}
      trail={trail}
      title={`${name}: ${f.title}`}
      lead={f.summary}
      checked={IBR_FORMS_CHECKED}
      updated={IBR_FORMS_CHECKED}
      headings={related.length > 0 ? [...headings, "Related forms"] : headings}
    >
      <IbrH2>{headings[0]}</IbrH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        {name} of the Indian Boiler Regulations, 2026 is the {f.title.charAt(0).toLowerCase() + f.title.slice(1)}, prescribed
        under regulation {f.regulation}.
        {f.old && ` Under the Indian Boiler Regulations, 1950 it was ${f.old.form} (${f.old.title.toLowerCase()}).`}
      </p>

      <IbrH2>{headings[1]}</IbrH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">{page.issuedBy}</p>

      <IbrH2>{headings[2]}</IbrH2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground-secondary">
        {page.records.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <IbrH2>{headings[3]}</IbrH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">{page.filedWith}</p>

      <IbrH2>{headings[4]}</IbrH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">{page.changed}</p>

      {related.length > 0 && (
        <>
          <IbrH2>Related forms</IbrH2>
          <ul className="mt-4 space-y-2 text-foreground-secondary">
            {related.map((o) => (
              <li key={o.slug}>
                {o.page ? (
                  <Link href={`/ibr/forms/${o.slug}`} className="text-link focus-ring">
                    {formName(o)}
                  </Link>
                ) : (
                  <span className="text-foreground">{formName(o)}</span>
                )}
                {`: ${o.title}`}
                {o.old && ` (was ${o.old.form})`}
              </li>
            ))}
          </ul>
        </>
      )}

      <IbrQuotes open quotes={page.facts.map((fact) => ({ quote: fact.quote, reg: `IBR 2026, ${/^\d/.test(fact.reg) ? `regulation ${fact.reg}` : fact.reg}` }))} />
    </IbrPage>
  );
}
