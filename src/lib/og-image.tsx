import { ImageResponse } from "next/og";
import { pilcrowRegularBase64, ogLogoBase64 } from "./og-assets";

export const ogImageSize = { width: 1200, height: 630 };

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Shared OG image template used by every route's opengraph-image.tsx. Each
 * route supplies its own title/description text; everything else (fonts,
 * logo, layout) is identical so the social cards read as one system instead
 * of the root's card being reused verbatim across all four pages.
 */
export function renderOgImage({ title, description }: { title: string; description: string }) {
  const pilcrowData = base64ToArrayBuffer(pilcrowRegularBase64);
  const logoSrc = `data:image/png;base64,${ogLogoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fbfbfc",
          fontFamily: "Pilcrow Rounded",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={56} height={56} alt="" />
        </div>
        <span style={{ fontSize: 72, color: "#18181b", letterSpacing: -1, maxWidth: 960 }}>
          {title}
        </span>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.32em",
            fontSize: 32,
            color: "#52525b",
            marginTop: 32,
            maxWidth: 900,
          }}
        >
          {description.split(" ").map((word, i) => (
            <span key={`${word}-${i}`}>{word}</span>
          ))}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [{ name: "Pilcrow Rounded", data: pilcrowData, weight: 400, style: "normal" }],
    }
  );
}
