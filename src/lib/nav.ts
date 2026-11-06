export type NavItem = { label: string; href: string; hint?: string; external?: boolean };
export type NavGroup = { label: string; href?: string; children?: NavItem[] };

export const SUPPORT_PORTAL = "https://support.matrixpos.de/help";

export const NAV: NavGroup[] = [
  {
    label: "Lösungen",
    children: [
      { label: "Matrix NXT", href: "/nxt", hint: "Cloud-Kasse, im Browser und auf Android" },
      { label: "Matrix POS", href: "/pos", hint: "Stationäre Kasse, mit NEO und CONGA" },
      { label: "Matrix PAY", href: "/pay", hint: "Bezahlen: Terminals und Tap to Pay" },
      { label: "POS oder NXT?", href: "/kassensysteme", hint: "Die Systeme im Vergleich" },
    ],
  },
  {
    label: "Branchen",
    href: "/branchen",
    children: [
      { label: "Restaurant", href: "/branchen/restaurant" },
      { label: "Hotel", href: "/branchen/hotel" },
      { label: "Bar & Café", href: "/branchen/bar-cafe" },
      { label: "Biergarten & Terrasse", href: "/branchen/aussengastronomie" },
      { label: "Freizeitpark", href: "/branchen/freizeitpark" },
      { label: "Food Court", href: "/branchen/foodcourt" },
      { label: "Systemgastronomie", href: "/branchen/systemgastronomie" },
    ],
  },
  {
    label: "Service",
    children: [
      { label: "Support & Wartung", href: "/support" },
      { label: "Hardware", href: "/hardware" },
      { label: "Schnittstellen", href: "/schnittstellen" },
      { label: "Kasse & Gesetz", href: "/kasse-und-gesetz" },
      { label: "Häufige Fragen", href: "/faq" },
    ],
  },
  {
    label: "Unternehmen",
    children: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Referenzen", href: "/referenzen" },
      { label: "Partner", href: "/partner" },
      { label: "Jobs", href: "/jobs" },
    ],
  },
];

// Schnellzugriff unter dem Menü (Robert 6.11.: Produkte unter Lösungen, weniger Punkte, Fernwartung nur über /support)
export const QUICK: NavItem[] = [
  { label: "Demo buchen", href: "/demo" },
  { label: "Rückruf vereinbaren", href: "/demo#rueckruf" },
  { label: "Supportportal", href: SUPPORT_PORTAL, external: true },
  { label: "Partner werden", href: "/partner#anfrage" },
];

// Linktexte für Querverweise im Fließtext ("→ /pfad")
export const LABELS: Record<string, string> = {
  "/nxt": "Matrix NXT",
  "/pos": "Matrix POS",
  "/pos/neo": "Matrix NEO",
  "/pos/conga": "Matrix CONGA",
  "/pos/evo": "Matrix EVO",
  "/pay": "Matrix PAY",
  "/kassensysteme": "Systemvergleich",
  "/branchen": "Branchen",
  "/support": "Support & Wartung",
  "/fernwartung": "Fernwartung",
  "/hardware": "Hardware",
  "/schnittstellen": "Schnittstellen",
  "/kasse-und-gesetz": "Kasse & Gesetz",
  "/faq": "Häufige Fragen",
  "/partner": "Partner",
  "/ueber-uns": "Über uns",
  "/referenzen": "Referenzen",
  "/jobs": "Jobs",
  "/demo": "Demo buchen",
};

export const FOOTER: { title: string; items: NavItem[] }[] = [
  {
    title: "Produkte",
    items: [
      { label: "Matrix NXT", href: "/nxt" },
      { label: "Matrix POS", href: "/pos" },
      { label: "NEO", href: "/pos/neo" },
      { label: "CONGA", href: "/pos/conga" },
      { label: "Matrix PAY", href: "/pay" },
      { label: "POS oder NXT?", href: "/kassensysteme" },
    ],
  },
  {
    title: "Branchen",
    items: [
      { label: "Restaurant", href: "/branchen/restaurant" },
      { label: "Hotel", href: "/branchen/hotel" },
      { label: "Bar & Café", href: "/branchen/bar-cafe" },
      { label: "Biergarten & Terrasse", href: "/branchen/aussengastronomie" },
      { label: "Freizeitpark", href: "/branchen/freizeitpark" },
      { label: "Food Court", href: "/branchen/foodcourt" },
      { label: "Systemgastronomie", href: "/branchen/systemgastronomie" },
    ],
  },
  {
    title: "Service",
    items: [
      { label: "Support & Wartung", href: "/support" },
      { label: "Supportportal", href: SUPPORT_PORTAL, external: true },
      { label: "Fernwartung", href: "/fernwartung" },
      { label: "Hardware", href: "/hardware" },
      { label: "Schnittstellen", href: "/schnittstellen" },
      { label: "Kasse & Gesetz", href: "/kasse-und-gesetz" },
      { label: "Häufige Fragen", href: "/faq" },
    ],
  },
  {
    title: "Unternehmen",
    items: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Referenzen", href: "/referenzen" },
      { label: "Partner", href: "/partner" },
      { label: "Jobs", href: "/jobs" },
    ],
  },
];
