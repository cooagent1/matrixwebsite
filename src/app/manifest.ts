import type { MetadataRoute } from "next";

// Icons vorerst aus dem Favicon der alten matrixpos.de (Odoo, 256 px; 512 px hochskaliert).
// Ersetzen, sobald die Bildmarke als SVG von Matrix vorliegt.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Matrix POS: Kassensysteme für die Gastronomie",
    short_name: "Matrix POS",
    description: "Matrix NXT, Matrix POS und Matrix PAY: Kassensysteme für Gastronomie und Hotellerie aus Hannover.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#232323",
    lang: "de",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
