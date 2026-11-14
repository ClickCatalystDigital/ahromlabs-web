import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // ponytail: unoptimized rather than wiring a Cloudflare Images binding
  // (a paid product) for a handful of small, already-sized static assets.
  // Revisit if user-uploaded or highly variable imagery is added later.
  images: {
    unoptimized: true,
  },
  // The nav and footer say "Pricing"; people type the word they saw.
  async redirects() {
    return [
      { source: "/pricing", destination: "/engagement", permanent: true },
      // Live for a few hours on 14 Nov 2026, then merged into the industry guide for each assistant.
      { source: "/ai-assistant/ember-ai", destination: "/ai-assistant/manufacturers", permanent: true },
      { source: "/ai-assistant/ohm-ai", destination: "/ai-assistant/trading-distribution", permanent: true },
      { source: "/ai-assistant/atelier-ai", destination: "/ai-assistant/interior-design-firms", permanent: true },
      { source: "/ai-assistant/datum-ai", destination: "/ai-assistant/construction-contractors", permanent: true },
    ];
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
