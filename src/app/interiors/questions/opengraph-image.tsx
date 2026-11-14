import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({ title: "Interior design business questions, answered", description: "Short answers on fees, deposits, purchase orders, sales tax and project budgets for design firms." });
}
