import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ibrForms } from "@/lib/ibr-forms";
import { boqItems, trades } from "@/lib/boq";
import { requirements } from "@/lib/erp";
import { questions } from "@/lib/ai-assistant";
import { asmeGuides } from "@/lib/asme";
import { mfgGuides } from "@/lib/manufacturing";
import { stGuides } from "@/lib/sales-tax";
import { intGuides } from "@/lib/interiors";
import { conGuides } from "@/lib/construction";
import { marketsFor, only, shownIn, type MarketCode } from "@/lib/markets";

// The free reference hubs (each shown only in the markets it's for), as one section for the homepage, /about and /services: they bring most of
// the search traffic, and a footer link alone carries little weight. Counts come from the data files.
const GUIDES = [
  { href: "/ibr", title: "IBR 2026 guide", text: `All ${ibrForms.length} forms of the Indian Boiler Regulations, 2026 with their IBR 1950 numbers, what changed, registration documents and record keeping, quoted from the Gazette.` },
  { href: "/boq", title: "Interior BOQ guide", text: `How to write a bill of quantities contractors price the same way: ${boqItems.length} items in ${trades.length} trades, a free checker and an Excel template.` },
  { href: "/erp", title: "ERP requirements", text: `${requirements.length} testable requirements for Indian manufacturers and traders, a builder, an Excel scorecard and the GST and company-law rules quoted.` },
  { href: "/asme", title: "ASME code guide", text: `The Boiler and Pressure Vessel Code in plain English: ${asmeGuides().length} guides on sections, stamps, Section IX welding and design, with hydrotest, shell thickness and welder continuity tools.` },
  { href: "/manufacturing", title: "Manufacturing software guide", text: `For US job shops and small manufacturers: ${mfgGuides().length} guides on choosing an ERP, QuickBooks for manufacturing, job costing and scheduling, with a job cost calculator and a schedule demo.` },
  { href: "/sales-tax", title: "US sales tax guide", text: `When you must collect in another state, every state's economic nexus threshold with a checker, resale and exemption certificates, the manufacturing exemption and use tax: ${stGuides().length} guides.` },
  { href: "/construction", title: "Construction billing guide", text: `${conGuides().length} guides for contractors: pay applications, retainage, lien waivers and the WIP schedule in the US; RA bills, the measurement book, TDS and GST on works contracts in India.` },
  { href: "/interiors", title: "Interior design firm guide", text: `For design firms that resell furniture and lighting: ${intGuides().length} guides on fees and markup, deposits, purchase orders, trade accounts, budgets and QuickBooks Online.` },
  { href: "/ai-assistant", title: "AI assistants guide", text: `How an assistant on your records should answer, a check for made-up numbers, ${questions.length} questions to ask it and a vendor test.` },
];

// market: a page prerendered for one market (home, /services) leaves the other market's guides out of its HTML, so a
// crawler reading /us doesn't find India's IBR guide there. Without it (/about) CSS hides them per visitor.
export function FreeGuides({ heading = "Free guides and tools", market }: { heading?: string; market?: MarketCode }) {
  return (
    <Reveal>
      <section className="section border-t border-line">
        <div className="rail">
          <h2 className="display text-3xl text-foreground sm:text-4xl">{heading}</h2>
          <p className="prose-measure mt-6 leading-relaxed text-foreground-secondary">
            Written from the systems we run, checked against the official texts, and free to use without talking to us.
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {GUIDES.filter((g) => !market || shownIn(market, g.href)).map((g) => (
              <li key={g.href} className="border-t border-line pt-5" {...only(marketsFor(g.href))}>
                <Link href={g.href} className="text-link focus-ring text-lg font-medium">{g.title}</Link>
                <p className="mt-2 max-w-[52ch] leading-relaxed text-foreground-secondary">{g.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
