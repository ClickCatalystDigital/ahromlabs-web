import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail flex min-h-[60vh] flex-col justify-center py-16">
          <h1 className="display text-5xl text-foreground sm:text-6xl">
            Page not found.
          </h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary">
            The page you&apos;re looking for doesn&apos;t exist, or has moved.
          </p>
          <Link href="/" className="subscribe-submit focus-ring mt-8 inline-block w-fit">
            Back to home
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
