import Link from "next/link";
import { LogoBadge } from "./Wordmark";

const links = [
  { href: "/approach", label: "Approach" },
  { href: "/systems", label: "Systems" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/70 backdrop-blur-md">
      <nav className="rail flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring" aria-label="Ahrom Labs">
          <LogoBadge />
        </Link>

        <ul className="hidden items-center gap-8 sm:flex">
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

        <details className="nav-menu relative sm:hidden">
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
