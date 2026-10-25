import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "AI assistants over your business data · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "AI assistants over your business data", description: "How an assistant should answer from your own records, a free check for made-up numbers, and the tests to run on any vendor." });
}
