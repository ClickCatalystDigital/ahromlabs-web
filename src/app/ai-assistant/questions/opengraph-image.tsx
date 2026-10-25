import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Questions to ask an AI assistant over your business data · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Questions to ask an AI assistant over your business data", description: "By industry and role: what should answer each question and how to check the answer." });
}
