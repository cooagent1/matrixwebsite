export type NavItem = { label: string; href: string; hint?: string; external?: boolean };
export type NavGroup = { label: string; href?: string; children?: NavItem[] };

export const SUPPORT_PORTAL = "https://support.matrixpos.de/help";

// Schlanke Struktur, freigegeben 07.11. (Robert): wenige Seiten, höchstens zwei Ebenen. Wachsen können wir später.
export const NAV: NavGroup[] = [
  {
    label: "Produkte",
    children: [
      // Reihenfolge nach Positionierung 12.11. (Robert): NXT zuerst, PAY als eigenes Produkt, POS für Sonderfälle
      { label: "Matrix NXT", href: "/kassensysteme/nxt", hint: "Die Cloud-Kasse für die Gastronomie" },
      { label: "Matrix PAY", href: "/pay", hint: "Kartenzahlung, auch mit anderen Kassen" },
      { label: "Matrix POS", href: "/kassensysteme/pos", hint: "Für individuelle Anforderungen" },
      { label: "Kassensysteme", href: "/kassensysteme", hint: "NXT und POS im Vergleich" },
      { label: "Schnittstellen", href: "/schnittstellen" },
    ],
  },
  { label: "Branchen", href: "/branchen" },
  {
    label: "Service",
    children: [
      { label: "Support & Wartung", href: "/support" },
      { label: "Häufige Fragen", href: "/faq" },
      { label: "Ratgeber", href: "/ratgeber" },
    ],
  },
  {
    label: "Unternehmen",
    children: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Partner", href: "/partner" },
      { label: "Jobs", href: "/jobs" },
    ],
  },
];

// Schnellzugriff unter dem Menü: so schlank wie möglich (07.11.)
export const QUICK: NavItem[] = [
  { label: "Demo buchen", href: "/demo" },
  { label: "Supportportal", href: SUPPORT_PORTAL, external: true },
];

// Linktexte für Querverweise im Fließtext ("→ /pfad")
export const LABELS: Record<string, string> = {
  "/kassensysteme": "Kassensysteme im Vergleich",
  "/kassensysteme/nxt": "Matrix NXT",
  "/kassensysteme/pos": "Matrix POS",
  "/pay": "Matrix PAY",
  "/schnittstellen": "Schnittstellen",
  "/branchen": "Branchen",
  "/support": "Support & Wartung",
  "/faq": "Häufige Fragen",
  "/ratgeber": "Ratgeber",
  "/partner": "Partner",
  "/ueber-uns": "Über uns",
  "/jobs": "Jobs",
  "/demo": "Demo buchen",
};

export const FOOTER: { title: string; items: NavItem[] }[] = [
  {
    title: "Produkte",
    items: [
      { label: "Matrix NXT", href: "/kassensysteme/nxt" },
      { label: "Matrix PAY", href: "/pay" },
      { label: "Matrix POS", href: "/kassensysteme/pos" },
      { label: "Kassensysteme", href: "/kassensysteme" },
      { label: "Schnittstellen", href: "/schnittstellen" },
      { label: "Branchen", href: "/branchen" },
    ],
  },
  {
    title: "Service",
    items: [
      { label: "Support & Wartung", href: "/support" },
      { label: "Supportportal", href: SUPPORT_PORTAL, external: true },
      { label: "Häufige Fragen", href: "/faq" },
      { label: "Ratgeber", href: "/ratgeber" },
    ],
  },
  {
    title: "Unternehmen",
    items: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Partner", href: "/partner" },
      { label: "Jobs", href: "/jobs" },
    ],
  },
];
