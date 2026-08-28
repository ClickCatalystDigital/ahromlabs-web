"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail flex min-h-[60vh] flex-col justify-center py-16">
          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Something went wrong.
          </h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary">
            That page hit an error on our end. Try again, or head back to home.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button onClick={() => reset()} className="subscribe-submit focus-ring">
              Try again
            </button>
            <Link href="/" className="nav-link focus-ring">
              Back to home
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
