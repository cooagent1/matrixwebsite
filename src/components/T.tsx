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

export function isPlaceholder(k: string): boolean {
  return !entry(k).text;
}

/** Text im Layout. Platzhalter werden sichtbar markiert, Schlüssel steht im Tooltip. */
export function T({ k }: { k: string }) {
  const e = entry(k);
  if (e.text) return <>{e.text}</>;
  return (
    <span className="ph" data-k={k} title={`Platzhalter ${k}, ca. ${e.max} Zeichen`}>
      {e.brief}
    </span>
  );
}
