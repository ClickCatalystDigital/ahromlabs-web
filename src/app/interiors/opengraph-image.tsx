import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { intOgArt } from "@/lib/interiors-images";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({ art: await intOgArt("interiors-hub"), title: "Running an interior design firm that sells product", description: "How to charge and mark up, deposits and invoices, purchase orders, trade accounts, budgets and QuickBooks Online." });
}
