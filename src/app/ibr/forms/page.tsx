import type { Metadata } from "next";
import Link from "next/link";
import { IbrPage } from "@/components/IbrPage";
import { ibrForms, ibrGroups, formName, unmatched1950, IBR_FORMS_CHECKED, IBR_FORMS_PUBLISHED } from "@/lib/ibr-forms";
import { ibrPageGraph } from "@/lib/schema";

const title = "IBR 2026 forms list, and their IBR 1950 names";
const lead =
  "Every form in the Indian Boiler Regulations, 2026, what it is, the regulation it falls under, and the IBR 1950 form it replaced. The forms were renumbered: Form III, the maker's certificate, is now Form IV Part A, and Forms II(1) and II(2), the inspection certificates, are now Form I Part B and Part C.";

export const metadata: Metadata = {
  title,
  description: "Every IBR 2026 form with its regulation and the IBR 1950 form it replaced: Form I to Form XXIII, including Form IV Part A, Form V Part B and Form XXII.",
  alternates: { canonical: "/ibr/forms" },
  openGraph: { type: "article", url: "https://ahromlabs.com/ibr/forms", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

export default function IbrFormsPage() {
  const trail = [
    { name: "IBR", path: "/ibr" },
    { name: "Forms", path: "/ibr/forms" },
  ];
  const renamed = ibrForms.filter((f) => f.old).sort((a, b) => a.old!.form.localeCompare(b.old!.form, "en", { numeric: true }));
  const isNew = ibrForms.filter((f) => !f.old);
  const link = (f: (typeof ibrForms)[number]) =>
    f.page ? (
      <Link href={`/ibr/forms/${f.slug}`} className="text-link focus-ring">
        {formName(f)}
      </Link>
    ) : (
      <span className="text-foreground">{formName(f)}</span>
    );

  return (
    <IbrPage
      graph={ibrPageGraph({ path: "/ibr/forms", title, description: lead, published: IBR_FORMS_PUBLISHED, updated: IBR_FORMS_CHECKED, trail })}
      trail={trail}
      title={title}
      lead={lead}
      checked={IBR_FORMS_CHECKED}
      updated={IBR_FORMS_CHECKED}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ibr/ibr-forms-1950-to-2026.webp"
        alt="IBR forms renumbered on 1 October 2026, IBR 1950 to IBR 2026: Form II(1) is now Form I Part B; Form II(2), Form I Part C; Form III, Form IV Part A; Form III-A, Form IV Part B; Form IV, Form V Part A; Form IV-A, Form V Part B; Form V, Form X; Form I, Form XI; Form VI, Form XII; Form XVII, Form XXII. Source: Indian Boiler Regulations, 2026, Gazette of India No. 596."
        loading="lazy"
        className="mb-12 w-full border border-line"
      />
      {ibrGroups.map((g) => {
        const forms = ibrForms.filter((f) => f.group === g.id);
        if (forms.length === 0) return null;
        return (
          <div key={g.id}>
            <h2 className="display mt-12 text-3xl text-foreground first:mt-0 sm:text-4xl">{g.name}</h2>
            <ul className="mt-4 space-y-4">
              {forms.map((f) => (
                <li key={f.slug} className="leading-relaxed text-foreground-secondary">
                  {link(f)}
                  {`: ${f.title}. `}
                  {f.summary}
                  <span className="block text-sm">
                    Regulation {f.regulation}
                    {f.old ? ` · was ${f.old.form} under IBR 1950` : " · new in IBR 2026"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <h2 className="display mt-12 text-3xl text-foreground sm:text-4xl">What is my old IBR 1950 form called now?</h2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Folders and drawings will carry IBR 1950 form names for years. Each one below is matched to its IBR 2026 form by
        the title both regulations print.
      </p>
      <ul className="mt-4 space-y-2 text-foreground-secondary">
        {renamed.map((f) => (
          <li key={f.slug}>
            {f.old!.form} under IBR 1950 ({f.old!.title.toLowerCase()}) is now {link(f)} under IBR 2026.
          </li>
        ))}
        {unmatched1950.map((u) => (
          <li key={u.form}>
            {u.form} under IBR 1950 ({u.title.toLowerCase()}): no form with this title in IBR 2026.
          </li>
        ))}
      </ul>

      <h2 className="display mt-12 text-3xl text-foreground sm:text-4xl">Which IBR 2026 forms are new?</h2>
      <ul className="mt-4 space-y-2 text-foreground-secondary">
        {isNew.map((f) => (
          <li key={f.slug}>
            {link(f)}: {f.summary}
          </li>
        ))}
      </ul>
    </IbrPage>
  );
}
