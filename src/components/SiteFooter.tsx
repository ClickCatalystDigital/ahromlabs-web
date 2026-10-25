import Link from "next/link";
import { families, familyUrl } from "@/lib/services";
import { LogoBadge } from "@/components/Wordmark";

// Every page's way out: the five families (the hubs under /services), the
// company pages, the reading library, and the machine-readable surfaces, so an
// agent that lands anywhere can find the whole graph in one hop.
const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "What we build",
    links: [{ href: "/services", label: "All services" }, ...families.map((f) => ({ href: familyUrl(f), label: f.shortName }))],
  },
  {
    title: "Company",
    links: [
      { href: "/work", label: "Work" },
      { href: "/industries", label: "Industries" },
      { href: "/approach", label: "Approach" },
      { href: "/engagement", label: "Pricing" },
      { href: "/about", label: "About" },
      { href: "/support", label: "Client support" },
      { href: "https://www.linkedin.com/company/ahromlabs", label: "LinkedIn" },
    ],
  },
  {
    title: "Library",
    links: [
      { href: "/notes", label: "Engineering notes" },
      { href: "/patterns", label: "Patterns" },
      { href: "/systems", label: "Systems glossary" },
      { href: "/ibr", label: "IBR 2026 guide" },
      { href: "/boq", label: "Interior BOQ guide" },
      { href: "/erp", label: "ERP requirements guide" },
      { href: "/ai-assistant", label: "AI assistants guide" },
    ],
  },
  {
    title: "For AI agents",
    links: [
      { href: "/agents", label: "MCP and agent access" },
      { href: "/llms.txt", label: "llms.txt" },
      { href: "/knowledge.json", label: "knowledge.json" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="rail grid grid-cols-1 gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" className="focus-ring -ml-1.5 inline-flex" aria-label="Ahrom Labs home">
            <LogoBadge />
          </Link>
          <p className="display mt-6 max-w-[22ch] text-2xl leading-snug text-foreground">
            Map the business, then build the system it runs on.
          </p>
          {/* The contact form is a client component, so this is the only way to
              reach us with JS off — and the only one on pages that aren't /. */}
          <p className="mt-6 flex flex-col gap-1 text-sm">
            <a href="mailto:pujan@ahromlabs.com" className="text-link focus-ring self-start">
              pujan@ahromlabs.com
            </a>{" "}
            <span className="text-foreground-secondary">Ahmedabad, Gujarat · clients across India</span>
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-8">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-foreground">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {/* Plain <a> for the .txt/.json routes: they aren't pages to prefetch. */}
                    {l.href.includes(".") ? (
                      <a href={l.href} className="nav-link focus-ring">{l.label}</a>
                    ) : (
                      <Link href={l.href} className="nav-link focus-ring">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Privacy sits left, beside the copyright: the chat bubble covers the bottom-right corner. */}
      <div className="rail border-t border-line py-6">
        <p className="footer-copyright pr-16">
          © {new Date().getFullYear()} Ahrom Labs. Industrial systems engineering.{" · "}
          <Link href="/privacy" className="focus-ring hover:underline">Privacy</Link>
        </p>
      </div>
    </footer>
  );
}
