import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental-cache override: the app has no ISR/revalidation, so
// OpenNext's default (build-time only, no runtime cache store) is correct.
export default defineCloudflareConfig();
