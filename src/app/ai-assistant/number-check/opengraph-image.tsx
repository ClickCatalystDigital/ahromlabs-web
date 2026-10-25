import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Check an AI answer for made-up numbers · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Check an AI answer for made-up numbers", description: "Paste the answer and the report it should come from; every number that isn't in the report is marked." });
}
