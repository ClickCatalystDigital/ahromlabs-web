import { Reveal } from "@/components/Reveal";
import { DICT, money, type MarketCode } from "@/lib/markets";

// Fixed prices for a market that has them (DICT[market].pricing, docs/markets-plan.md section 9). The nav and
// footer "Pricing" link points here (/#pricing) in that market. India's terms stay on /engagement.
export function MarketPricing({ market, heading = "Fixed prices, agreed up front" }: { market: MarketCode; heading?: string }) {
  const p = DICT[market].pricing;
  if (!p) return null;
  const $ = (n: number) => money(market, n);
  const steps = [
    { name: "Prototype", price: `${$(p.prototype)} flat`, time: `${p.prototypeWeeks} weeks`, text: "A working prototype of your main workflow, on your own data. Credited in full to the build if you continue." },
    { name: "Build", price: `From ${$(p.buildFrom)}, fixed`, time: `${p.buildWeeks} weeks`, text: `Your inventory and orders system, live. Usually ${$(p.buildFrom)}–${$(p.buildTo)} depending on scope. 40% at the start, 40% at acceptance testing, 20% at go-live.` },
    { name: "Care plan", price: `${$(p.care)} / month`, time: "Billed monthly", text: "Hosting, backups, support and small changes." },
  ];
  return (
    <Reveal>
      <section id="pricing" className="section scroll-mt-16 border-t border-line">
        <div className="rail">
          <h2 className="display text-3xl text-foreground sm:text-4xl">{heading}</h2>
          <p className="prose-measure mt-6 text-base leading-relaxed text-foreground-secondary">
            The scope is written down and the price fixed before any work starts. No hourly billing.
          </p>
          <ol className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.name} className="border-t border-line pt-6">
                <h3 className="text-lg font-medium text-foreground">{s.name}</h3>
                <p className="display mt-2 text-3xl text-foreground">{s.price}</p>
                <p className="mt-1 text-sm text-foreground-secondary">{s.time}</p>
                <p className="mt-3 max-w-[40ch] leading-relaxed text-foreground-secondary">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="prose-measure mt-10 leading-relaxed text-foreground">
            <strong className="font-medium">Founding clients:</strong> our first {p.foundingCount} US clients get {p.foundingOff}% off the
            build, in return for a case study, a reference call and their logo on this site.
          </p>
          <p className="mt-3 text-sm text-foreground-secondary">{p.pay}</p>
        </div>
      </section>
    </Reveal>
  );
}
