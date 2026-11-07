import texte from "@/content/texte.json";

// Texte der Website kommen aus src/content/texte.json, Quelle ist das Sheet „website copies“.
// Leerer Text = Platzhalter: Statt Text wird das Briefing angezeigt und markiert.
// Abgleich mit dem Sheet: scripts/texte.mjs (export / import).

export type TextEntry = {
  seite: string;
  bereich: string;
  element: string;
  status: "fest" | "offen" | "geliefert";
  max: number;
  brief: string;
  text: string;
  entwurf: string;
  hinweis: string;
};

export const TEXTE = texte as Record<string, TextEntry>;

function entry(k: string): TextEntry {
  const e = TEXTE[k];
  if (!e) throw new Error(`Text fehlt in texte.json: ${k}`);
  return e;
}

/** Text als String, für Attribute (alt, aria-label) und JSON-LD. Platzhalter liefern das Briefing. */
export function txt(k: string): string {
  const e = entry(k);
  return e.text || e.brief;
}

/** Strings mit ⟦schlüssel⟧ für Meta-Daten und JSON-LD: gelieferter Text oder leer. */
export function plain(s: string): string {
  return s.replace(/⟦([^⟧]+)⟧/g, (_, k) => TEXTE[k]?.text ?? "").replace(/\s{2,}/g, " ").trim();
}

export function isPlaceholder(k: string): boolean {
  return !entry(k).text;
}

const LOREM =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.";

/** Blindtext in der Länge des Platzhalters (max Zeichen), am Wortende abgeschnitten, mit Punkt. */
export function lorem(max: number): string {
  const n = Math.max(12, Math.min(max || 60, LOREM.length));
  let t = LOREM.slice(0, n);
  const cut = t.lastIndexOf(" ");
  if (cut > n * 0.6) t = t.slice(0, cut);
  t = t.replace(/[,.;]+$/, "");
  return t + ".";
}

/** Text im Layout. Platzhalter zeigen Blindtext in Ziel-Länge (Robert 06.11.), Briefing und Schlüssel stehen im Tooltip. */
export function T({ k }: { k: string }) {
  const e = entry(k);
  if (e.text) return <>{e.text}</>;
  return (
    <span className="ph" data-k={k} title={`Platzhalter ${k}, ca. ${e.max} Zeichen: ${e.brief}`}>
      {lorem(e.max)}
    </span>
  );
}
