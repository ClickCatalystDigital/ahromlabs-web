import type { Metadata } from "next";
import Link from "next/link";
import { IbrPage } from "@/components/IbrPage";
import { ibrForms, ibrFormPages, formName, IBR_FORMS_CHECKED, IBR_FORMS_PUBLISHED } from "@/lib/ibr-forms";
import { ibrPageGraph } from "@/lib/schema";

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
  return {
    title,
    description: f.summary,
    alternates: { canonical: `/ibr/forms/${f.slug}` },
    openGraph: { type: "article", url: `https://ahromlabs.com/ibr/forms/${f.slug}`, siteName: "Ahrom Labs", title, description: f.summary },
    twitter: { card: "summary_large_image", title, description: f.summary },
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

  return (
    <IbrPage
      graph={ibrPageGraph({ path, title: pageTitle(f), description: f.summary, published: IBR_FORMS_PUBLISHED, updated: IBR_FORMS_CHECKED, trail })}
      trail={trail}
      title={`${name}: ${f.title}`}
      lead={f.summary}
      checked={IBR_FORMS_CHECKED}
      updated={IBR_FORMS_CHECKED}
    >
      <h2 className="display text-3xl text-foreground sm:text-4xl">What is {name}?</h2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        {name} of the Indian Boiler Regulations, 2026 is the {f.title.charAt(0).toLowerCase() + f.title.slice(1)}, prescribed
        under regulation {f.regulation}.
        {f.old && ` Under the Indian Boiler Regulations, 1950 it was ${f.old.form} (${f.old.title.toLowerCase()}).`}
      </p>

      <h2 className="display mt-12 text-3xl text-foreground sm:text-4xl">Who issues and signs {name}?</h2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">{page.issuedBy}</p>

      <h2 className="display mt-12 text-3xl text-foreground sm:text-4xl">What does {name} record?</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground-secondary">
        {page.records.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <h2 className="display mt-12 text-3xl text-foreground sm:text-4xl">When is {name} filed, and with what?</h2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">{page.filedWith}</p>

      <h2 className="display mt-12 text-3xl text-foreground sm:text-4xl">What changed for {name} from IBR 1950?</h2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">{page.changed}</p>

      <h2 className="display mt-12 text-3xl text-foreground sm:text-4xl">What does the regulation say about {name}?</h2>
      {page.facts.map((fact) => (
        <blockquote key={fact.quote} className="mt-6 border-l-2 border-line pl-6 text-foreground-secondary">
          <p className="italic text-foreground">&ldquo;{fact.quote}&rdquo;</p>
          <p className="mt-2 text-sm">IBR 2026, {/^\d/.test(fact.reg) ? `regulation ${fact.reg}` : fact.reg}</p>
        </blockquote>
      ))}

      {related.length > 0 && (
        <div className="mt-12 border-t border-line pt-8">
          <h2 className="text-sm font-medium text-foreground-secondary">Related forms</h2>
          <ul className="mt-3 space-y-2">
            {related.map((o) => (
              <li key={o.slug} className="text-foreground-secondary">
                {o.page ? (
                  <Link href={`/ibr/forms/${o.slug}`} className="text-link focus-ring">
                    {formName(o)}
                  </Link>
                ) : (
                  formName(o)
                )}
                {`: ${o.title}`}
                {o.old && ` (was ${o.old.form})`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </IbrPage>
  );
}
