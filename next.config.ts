import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // ponytail: unoptimized rather than wiring a Cloudflare Images binding
  // (a paid product) for a handful of small, already-sized static assets.
  // Revisit if user-uploaded or highly variable imagery is added later.
  images: {
    unoptimized: true,
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
