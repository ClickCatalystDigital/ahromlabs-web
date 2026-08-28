import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ahrom Labs",
    short_name: "Ahrom",
    description: "Custom operational infrastructure for businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbfc",
    theme_color: "#fbfbfc",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
