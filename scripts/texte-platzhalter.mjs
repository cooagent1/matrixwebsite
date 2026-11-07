// Ersetzt Texte in src/content/pages.json durch Platzhalter ⟦schlüssel⟧ und trägt sie in texte.json ein.
//
//   node scripts/texte-platzhalter.mjs <entscheidungen.json>
//
// entscheidungen.json: [{ "slug": "kassensysteme/nxt", "text": "<exakter bisheriger Text>", "brief": "<was hier hingehört>" }]
// Ersetzt wird nur ein String-Feld, dessen Wert exakt dem Text entspricht. Max. Zeichen = Länge des bisherigen Texts.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const PAGES = path.resolve(here, "../src/content/pages.json");
const TEXTE = path.resolve(here, "../src/content/texte.json");

const decisions = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const pages = JSON.parse(fs.readFileSync(PAGES, "utf8"));
const texte = JSON.parse(fs.readFileSync(TEXTE, "utf8"));

// Felder, die nie Platzhalter werden (Technik, Meta-Daten, Links)
const SKIP = new Set(["slug", "id", "name", "type", "href", "img", "src", "image", "icon", "kind", "metaTitle", "description", "variant", "phone", "nr", "n"]);

const nextNo = (prefix) => {
  let n = 0;
  for (const k of Object.keys(texte)) if (k.startsWith(prefix)) n = Math.max(n, Number(k.slice(prefix.length)) || 0);
  return n + 1;
};

const done = new Set();
let count = 0;
for (const page of pages) {
  const mine = decisions.filter((d) => d.slug === page.slug);
  if (!mine.length) continue;
  const prefix = `seite.${page.slug.replace(/\//g, ".") || "start"}.`;
  let no = nextNo(prefix);
  for (const sec of page.sections) {
    const bereich = (sec.heading && !sec.heading.includes("⟦") ? sec.heading : sec.name) || sec.id;
    const walk = (node, field, blockType) => {
      if (Array.isArray(node)) return node.map((x) => walk(x, field, blockType));
      if (node && typeof node === "object") {
        const bt = node.type || blockType;
        for (const [k, v] of Object.entries(node)) if (!SKIP.has(k)) node[k] = walk(v, k, bt);
        return node;
      }
      if (typeof node !== "string") return node;
      const d = mine.find((x) => x.text === node);
      if (!d) return node;
      const key = prefix + no++;
      // „**Titel.** Text“: Titel bleibt (Funktionsname), nur der Text wird Platzhalter
      const lead = node.match(/^(\*\*[^*]+\*\*\s+)([\s\S]+)$/);
      const body = lead ? lead[2] : node;
      texte[key] = {
        seite: page.title, bereich, element: `${blockType || "Abschnitt"} · ${field}${lead ? ` (${lead[1].replace(/\*|\s+$/g, "")})` : ""}`, status: "offen",
        max: Math.max(12, body.replace(/\*\*|⟦[^⟧]*⟧/g, "").length), brief: d.brief, text: "", entwurf: body, hinweis: "", quelle: "pages",
      };
      done.add(d);
      count++;
      return lead ? `${lead[1]}⟦${key}⟧` : `⟦${key}⟧`;
    };
    for (const k of ["eyebrow", "heading"]) if (typeof sec[k] === "string") sec[k] = walk(sec[k], k, "Abschnitt");
    sec.blocks = walk(sec.blocks, "blocks");
    for (const [k, v] of Object.entries(sec)) if (!["eyebrow", "heading", "blocks", ...SKIP].includes(k) && v && typeof v === "object") sec[k] = walk(v, k, "Abschnitt");
  }
}

fs.writeFileSync(PAGES, JSON.stringify(pages, null, 2) + "\n");
fs.writeFileSync(TEXTE, JSON.stringify(texte, null, 2) + "\n");
const missed = decisions.filter((d) => !done.has(d));
console.log(`${count} Platzhalter gesetzt.`);
if (missed.length) console.log(`Nicht gefunden (${missed.length}):\n  ` + missed.map((d) => `${d.slug}: ${d.text.slice(0, 70)}`).join("\n  "));
