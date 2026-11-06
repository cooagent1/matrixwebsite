import type { NextConfig } from "next";

const PORTAL = "https://support.matrixpos.de/help";

// Alte URLs von matrixpos.de (Odoo) und vom Webflow-Staging auf die neue Struktur.
// Quelle: docs/sitemap.md (Redirects) und sitemap.xml der alten Seite, Stand 06.11.2026.
const OLD_TO_NEW: [string, string][] = [
  // Produkte
  ["/matrixpos", "/pos"],
  ["/matrixneo", "/pos/neo"],
  ["/matrixconga", "/pos/conga"],
  ["/matrixpayment", "/pay"],
  ["/integrierte-systeme", "/pos"],
  ["/produkte", "/pos"],
  ["/matrix-nxt", "/nxt"],
  ["/matrix-pos", "/pos"],
  ["/matrix-pay", "/pay"],
  ["/pos/pay", "/pay"],
  ["/branchen/freizeitpark-foodcourt", "/branchen/freizeitpark"],
  // Service und Unternehmen
  ["/fernwartung-teamviewer", "/fernwartung"],
  ["/uber-uns", "/ueber-uns"],
  ["/unsere-partner", "/partner"],
  ["/partner-werden", "/partner"],
  ["/jobs/:path+", "/jobs"],
  // Kontakt und Termine
  ["/contactus", "/demo"],
  ["/appointment", "/demo"],
  ["/calendar", "/demo"],
  ["/terminbuchung-fur-die-kassenmeldepflicht", "/kasse-und-gesetz"],
  ["/terminbuchung-fur-service-support", PORTAL],
  // Rechtliches
  ["/datenschutzerklarung-nach-dsgvo", "/datenschutz"],
  ["/cookie-policy", "/datenschutz"],
  ["/allgemeine-geschaftsbedingungen", "/agb"],
  // Support, Forum, Schulungen, Login: alles ins Supportportal
  ["/helpdesk", PORTAL],
  ["/helpdesk/:path*", PORTAL],
  ["/forum", PORTAL],
  ["/forum/:path*", PORTAL],
  ["/slides", PORTAL],
  ["/slides/:path*", PORTAL],
  ["/web/login", PORTAL],
  ["/my", PORTAL],
  ["/my/:path*", PORTAL],
  ["/https/support-matrixpos-de/help", PORTAL],
  // Blog: Beiträge auf das passende Thema statt pauschal auf die Startseite (Audit 06.11.)
  ["/blog/news-messen-3/wichtige-frist-neigt-sich-dem-ende-zu-meldepflicht-fur-kassensysteme-bis-zum-31-juli-2025-3", "/kasse-und-gesetz"],
  ["/blog/pressemeldung-ubernahme-durch-everfield-2/:path*", "/ueber-uns"],
  ["/blog/news-messen-3/:path*", "/ueber-uns"],
  ["/blog", "/"],
  ["/blog/:path*", "/"],
  ["/news", "/ueber-uns"],
  ["/presse", "/ueber-uns"],
  // Ohne Gegenstück in V1: Events, Shop, Profile
  ["/events", "/"],
  ["/event/:path*", "/"],
  ["/shop", "/hardware"],
  ["/shop/:path*", "/hardware"],
  ["/kontakt", "/demo"],
  ["/profile/:path*", "/"],
  // Social-Links der alten Seite
  ["/website/social/linkedin", "https://www.linkedin.com/company/matrix-pos-gmbh/"],
  ["/website/social/instagram", "https://www.instagram.com/matrixpos_gmbh"],
  ["/website/social/facebook", "https://www.facebook.com/profile.php?id=61572403651608"],
  ["/website/:path*", "/"],
];

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return OLD_TO_NEW.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
