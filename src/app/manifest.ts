import type { MetadataRoute } from "next";

/**
 * manifest.webmanifest — PWA manifest, port of the original file.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Leandro Guincho 24h",
    short_name: "Leandro Guincho",
    description: "Auto socorro e guincho 24h em Ituiutaba e região.",
    start_url: "/",
    display: "standalone",
    background_color: "#110a12",
    theme_color: "#e50078",
    icons: [
      { src: "/assets/images/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/images/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
