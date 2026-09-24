import Link from "next/link";
import { LogoBadge } from "./Wordmark";

// Ordered the way a buyer decides: what do you build, for businesses like
// mine?, for whom already?, what does it cost?, prove it, who are you.
// Approach, Systems and Patterns stay one click away in the footer.
const links = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/work", label: "Work" },
  { href: "/engagement", label: "Pricing" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/70 backdrop-blur-md">
      <nav className="rail flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring" aria-label="Ahrom Labs">
          <LogoBadge />
        </Link>

        {/* Six links plus the CTA don't fit before lg; below it the menu takes over. */}
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link focus-ring">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#contact" className="nav-link nav-link-cta focus-ring">
              Start a conversation
            </Link>
          </li>
        </ul>

        <details className="nav-menu relative lg:hidden">
          <summary className="nav-link focus-ring cursor-pointer select-none list-none">
            Menu
          </summary>
          <div className="absolute right-0 top-full z-10 mt-2 flex w-48 flex-col gap-4 border border-line bg-background p-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link focus-ring">
                {link.label}
              </Link>
            ))}
            <Link href="/#contact" className="nav-link nav-link-cta focus-ring">
              Start a conversation
            </Link>
          </div>
        </details>
      </nav>
    </header>
  );
}
