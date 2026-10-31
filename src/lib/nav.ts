export type NavItem = { label: string; href: string; hint?: string; external?: boolean };
export type NavGroup = { label: string; href?: string; children?: NavItem[] };

export const SUPPORT_PORTAL = "https://support.matrixpos.de/help";

export const NAV: NavGroup[] = [
  { label: "Matrix NXT", href: "/nxt" },
  {
    label: "Matrix POS",
    href: "/pos",
    children: [
      { label: "Matrix POS", href: "/pos", hint: "Stationär, bewährt, erweiterbar" },
      { label: "NEO", href: "/pos/neo", hint: "Mobil kassieren" },
      { label: "CONGA", href: "/pos/conga", hint: "Dienstplan und Zeiterfassung" },
      { label: "POS oder NXT?", href: "/kassensysteme", hint: "Die Systeme im Vergleich" },
    ],
  },
  { label: "Matrix PAY", href: "/pay" },
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
      { label: "Fernwartung", href: "/fernwartung" },
      { label: "Hardware", href: "/hardware" },
      { label: "Schnittstellen", href: "/schnittstellen" },
      { label: "Kasse & Gesetz", href: "/kasse-und-gesetz" },
      { label: "Häufige Fragen", href: "/faq" },
    ],
  },
  { label: "Partner", href: "/partner" },
  {
    label: "Unternehmen",
    children: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Referenzen", href: "/referenzen" },
      { label: "Jobs", href: "/jobs" },
    ],
  },
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
