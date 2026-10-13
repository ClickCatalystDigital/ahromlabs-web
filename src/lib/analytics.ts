// Google Analytics 4, property "Ahrom Labs" (docs/analytics-strategy.md). The ID is public.
export const GA_ID = "G-BC080TXMMZ";

type Gtag = (...args: unknown[]) => void;

// No-op until the visitor accepts analytics (gtag is only defined after consent).
export function track(event: string, params?: Record<string, string>) {
  (window as unknown as { gtag?: Gtag }).gtag?.("event", event, params);
}
