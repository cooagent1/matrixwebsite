import type { Metadata } from "next";
import type { Page } from "@/lib/content";
import { LABELS } from "@/lib/nav";

// Kanonische Adresse ist immer die Live-Domain, auch auf der Vorschau.
export const SITE = "https://matrixpos.de";
export const ORG_NAME = "Matrix POS GmbH";
export const PHONE = "+49 511 592938-0";
export const EMAIL = "sales@matrixpos.de";
export const SOCIAL = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/matrix-pos-gmbh/" },
  { name: "Instagram", url: "https://www.instagram.com/matrixpos_gmbh" },
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61572403651608" },
];

// Vorschaubild aus src/app/opengraph-image.tsx; explizit gesetzt, weil eigene openGraph-Angaben das Datei-Bild sonst verdrängen.
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Matrix POS: Kassensysteme für die Gastronomie aus Hannover" };

const abs = (path: string) => (path === "/" ? SITE : `${SITE}${path}`);

// Gemeinsame Metadaten je Seite: Titel, Beschreibung, Canonical, Open Graph, Twitter.
export function pageMeta({ title, description, path }: { title: string; description?: string | null; path: string }): Metadata {
  return {
    title: { absolute: title },
    description: description ?? undefined,
    alternates: { canonical: abs(path) },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: "Matrix POS",
      url: abs(path),
      title,
      description: description ?? undefined,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description: description ?? undefined, images: [OG_IMAGE.url] },
  };
}

const ORG_ID = `${SITE}/#organization`;

export const ORGANIZATION = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: ORG_NAME,
  alternateName: "Matrix POS",
  url: SITE,
  logo: `${SITE}/lp/logo-matrixpos.png`,
  slogan: "Kassensysteme für die Gastronomie",
  description:
    "Die Matrix POS GmbH aus Hannover entwickelt seit über 30 Jahren Kassensysteme für Gastronomie und Hotellerie: Matrix NXT, Matrix POS und Matrix PAY.",
  email: EMAIL,
  telephone: PHONE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Eckenerstraße 2",
    postalCode: "30179",
    addressLocality: "Hannover",
    addressCountry: "DE",
  },
  areaServed: ["DE", "AT", "CH"],
  parentOrganization: { "@type": "Organization", name: "Everfield" },
  sameAs: SOCIAL.map((s) => s.url),
};

export const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "Matrix POS",
  inLanguage: "de-DE",
  publisher: { "@id": ORG_ID },
};

const PRODUCTS: Record<string, { name: string; os: string; features: string[] }> = {
  nxt: {
    name: "Matrix NXT",
    os: "Web, Android",
    features: ["Tischplan und Gänge", "Android-Handgerät", "Kartenzahlung und Tap to Pay mit Matrix PAY", "Cloud-TSE von Fiskaly", "Tagesabschluss und DSFinV-K-Export", "Automatische Updates"],
  },
  pos: {
    name: "Matrix POS",
    os: "Windows",
    features: ["Stationäre Kasse", "Mobil kassieren mit Matrix NEO", "Dienstplan und Zeiterfassung mit Matrix CONGA", "Anbindung an Hotelsoftware, Warenwirtschaft und Buchhaltung"],
  },
  pay: {
    name: "Matrix PAY",
    os: "Web, Android",
    features: ["Kartenterminals", "Tap to Pay am Handgerät", "Eine Abrechnung für alle Zahlarten", "Mit Matrix NXT, Matrix POS oder einer anderen Kasse"],
  },
};

const plain = (t: string) =>
  t
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/→\s*(\/[^\s,;)]*)/g, (_, p: string) => LABELS[p.split(/[#?]/)[0]] ?? "")
    .replace(/\s+/g, " ")
    .trim();

// Strukturierte Daten je Unterseite: Breadcrumb, Produkt (NXT, POS, PAY), FAQ aus den FAQ-Blöcken der Seite.
export function pageJsonLd(page: Page, title: (slug: string) => string | undefined): object[] {
  const out: object[] = [];
  const parts = page.slug.split("/");
  const items = [{ name: "Startseite", item: SITE }];
  parts.forEach((_, i) => {
    const slug = parts.slice(0, i + 1).join("/");
    const name = LABELS[`/${slug}`] ?? title(slug);
    if (name) items.push({ name, item: abs(`/${slug}`) });
  });
  out.push({
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.item })),
  });

  const product = PRODUCTS[page.slug];
  if (product)
    out.push({
      "@type": "SoftwareApplication",
      name: product.name,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Kassensystem für die Gastronomie",
      operatingSystem: product.os,
      description: page.description ?? undefined,
      url: abs(`/${page.slug}`),
      featureList: product.features,
      inLanguage: "de-DE",
      publisher: { "@id": ORG_ID },
      provider: { "@id": ORG_ID },
    });

  const faqs = page.sections.flatMap((s) => s.blocks.flatMap((b) => (b.type === "faq" ? b.items : [])));
  if (faqs.length)
    out.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: plain(f.q),
        acceptedAnswer: { "@type": "Answer", text: f.a.map(plain).join(" ") },
      })),
    });
  return out;
}
