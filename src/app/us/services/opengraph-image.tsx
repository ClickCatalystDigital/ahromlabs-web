import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({ title: "Custom ERP that works beside QuickBooks", description: "Operations software for manufacturers and distributors, built around how your shop already runs." });
}
