import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "How to test an AI assistant before you buy it · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "How to test an AI assistant before you buy it", description: "Twelve tests to run in any vendor's demo, with your own data, and a test sheet for Excel." });
}
