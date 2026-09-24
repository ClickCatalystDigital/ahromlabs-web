import Link from "next/link";

export function ClosingCta() {
  return (
    <section className="section border-t border-line">
      <div className="rail">
        <h2 className="display text-3xl text-foreground sm:text-4xl">
          Talk to us about your systems.
        </h2>
        <p className="prose-measure mt-4 text-base leading-relaxed text-foreground-secondary">
          Tell us what&apos;s held together with workarounds right now. We reply to every
          message ourselves.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/#contact" className="subscribe-submit focus-ring inline-block">
            Start a conversation
          </Link>
          <Link href="/engagement" className="text-link focus-ring">
            Pricing, ownership and support
          </Link>
        </div>
      </div>
    </section>
  );
}
