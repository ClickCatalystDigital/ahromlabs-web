import type { Metadata } from "next";
import Link from "next/link";
import { InteriorsPage } from "@/components/InteriorsPage";
import { GuideH2 } from "@/components/GuidePage";
import { INT_CHECKED, INT_GROUPS, INT_PUBLISHED, intGuides } from "@/lib/interiors";
import { mfgPageGraph } from "@/lib/schema";
import { intArt } from "@/lib/interiors-images";

const title = "Running an interior design firm that sells product";
const lead =
  "A design firm that resells furniture, lighting and fabric runs two businesses at once: design time, and a small trading company buying on trade accounts. These guides cover how to charge and mark up product, the letter of agreement, invoices, deposits and retainers, purchase orders from vendor deposit to delivery, freight damage claims, trade accounts, the project budget against what the client approved, job costing in a furniture shop, QuickBooks Online, 1099s, and sales tax in the US and GST/HST in Canada, with worked numbers and the sources quoted.";

export const metadata: Metadata = {
  title: { absolute: "Interior design business guides: pricing, POs, QuickBooks" },
  description: "For interior design firms that sell product: fees and markup, deposits and invoices, purchase orders, trade accounts, budgets, QuickBooks Online and sales tax.",
  alternates: { canonical: "/interiors" },
  openGraph: { type: "website", url: "https://ahromlabs.com/interiors", siteName: "Ahrom Labs", title, description: lead },
  twitter: { card: "summary_large_image", title, description: lead },
};

// Each section heading is the buyer's question its guides answer (the group names stay as labels elsewhere).
const GROUP_QUESTIONS: Record<string, string> = {
  pricing: "How should a design firm charge, contract and bill?",
  projects: "How do you buy product for clients and keep track of it?",
  systems: "What does QuickBooks do for a design firm, and what doesn't it?",
};

export default function InteriorsHub() {
  const guides = intGuides();
  const updated = [INT_CHECKED, ...guides.map((g) => g.updated)].sort().at(-1)!;
  const trail = [{ name: "Interior design firms", path: "/interiors" }];
  const art = intArt("interiors-hub");
  return (
    <InteriorsPage
      graph={mfgPageGraph({ path: "/interiors", title, description: lead, published: INT_PUBLISHED, updated, trail, image: art })}
      trail={trail}
      title={title}
      lead={lead}
      checked={INT_CHECKED}
      updated={updated}
      art={art?.src}
      artAlt={art?.alt}
    >
      {INT_GROUPS.map((group) => {
        const list = guides.filter((g) => g.group === group.slug);
        return list.length === 0 ? null : (
          <div key={group.slug}>
            <GuideH2>{GROUP_QUESTIONS[group.slug] ?? group.name}</GuideH2>
            <p className="mt-4 leading-relaxed text-foreground-secondary">{group.intro}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {list.map((g) => (
                <li key={g.slug} className="py-6">
                  <Link href={`/interiors/${g.slug}`} className="text-link focus-ring text-xl font-medium">{g.title}</Link>
                  <p className="mt-2 leading-relaxed text-foreground-secondary">{g.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <GuideH2>Do design fees and furniture carry sales tax?</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Furniture you resell is taxable in every state with a sales tax; whether your design fee is depends on the state
        and on how the invoice is written. New York taxes design services, California taxes fees tied to the sale of
        merchandise, and Texas doesn&apos;t list interior design as a taxable service:{" "}
        <Link href="/sales-tax/interior-designers-sales-tax" className="text-link focus-ring">sales tax for interior designers</Link>{" "}
        quotes each state, with more detail for{" "}
        <Link href="/sales-tax/new-york-interior-design-sales-tax" className="text-link focus-ring">New York</Link> and{" "}
        <Link href="/sales-tax/california-interior-design-sales-tax" className="text-link focus-ring">California</Link>, and{" "}
        <Link href="/sales-tax/resale-certificates" className="text-link focus-ring">resale certificates</Link>{" "}
        covers buying from vendors without tax.
      </p>

      <GuideH2>Can I see a system that does this?</GuideH2>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Yes. Our{" "}
        <a href="https://interiors-erp-us.ahromlabs.com/demo" className="text-link focus-ring">design studio demo</a>{" "}
        runs a made-up Austin studio and its furniture shop: quotes from an item library with payment stages that become
        invoices, vendor purchase orders with partial deliveries and returns, freight checked against each route&apos;s
        rate, sales tax per invoice line, and invoices, client payments and completed purchase orders sent to a
        QuickBooks Online sandbox. What it does and doesn&apos;t do is on the{" "}
        <Link href="/us/industries/interior-design-and-furniture" className="text-link focus-ring">interior design industry page</Link>.
      </p>
    </InteriorsPage>
  );
}
