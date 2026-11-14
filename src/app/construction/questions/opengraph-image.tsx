import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({ title: "Construction billing questions, answered", description: "Short answers on pay applications, retainage, liens, RA bills, measurement books and job cost." });
}
