// Abgleich der Website-Texte mit dem Sheet „website copies“.
//
//   node scripts/texte.mjs export          schreibt ../docs/texte/website-texte.csv (zum Import ins Sheet)
//   node scripts/texte.mjs import <datei>  übernimmt die Spalte „Neuer Text“ aus dem Sheet-Export (CSV)
//   node scripts/texte.mjs status          zählt offene Platzhalter
//
// Das Sheet ist die Quelle für Inhalte, src/content/texte.json die Quelle für Schlüssel, Briefing und Länge.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const JSON_FILE = path.resolve(here, "../src/content/texte.json");
const CSV_FILE = path.resolve(here, "../../docs/texte/website-texte.csv");

const COLS = ["Schlüssel", "Seite", "Bereich", "Element", "Status", "Max. Zeichen", "Was hier hingehört", "Text auf der Website", "Neuer Text", "Zeichen", "Hinweis", "Bisheriger Entwurf (nicht freigegeben)"];

const load = () => JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));
const save = (t) => fs.writeFileSync(JSON_FILE, JSON.stringify(t, null, 2) + "\n");

const q = (v) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function parseCsv(src) {
  const rows = [];
  let row = [], cell = "", inQ = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQ) {
      if (c === '"' && src[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') inQ = false;
      else cell += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim()));
}

// Stilregeln aus docs/stil.md, nur als Warnung
function lint(text, max) {
  const w = [];
  if (/\s[–—-]\s|[–—]/.test(text)) w.push("Gedankenstrich");
  if (max && text.length > max) w.push(`${text.length}/${max} Zeichen`);
  if (/nicht\b[^.]*\bsondern\b/i.test(text)) w.push("„nicht … sondern“");
  if (/\b(einfach|nahtlos|innovativ|smart|rundum|sorgenfrei|ganzheitlich|alles aus einer Hand)\b/i.test(text)) w.push("Werbewort");
  return w;
}

const cmd = process.argv[2];
const t = load();

if (cmd === "export") {
  const lines = [COLS.map(q).join(",")];
  let r = 2;
  for (const [k, e] of Object.entries(t)) {
    const shown = e.text || `[Platzhalter] ${e.brief}`;
    lines.push([k, e.seite, e.bereich, e.element, e.status, e.max, e.brief, shown, "", `=IF(I${r}="";"";LEN(I${r}))`, e.hinweis, e.entwurf].map(q).join(","));
    r++;
  }
  fs.mkdirSync(path.dirname(CSV_FILE), { recursive: true });
  fs.writeFileSync(CSV_FILE, lines.join("\n") + "\n");
  console.log(`${Object.keys(t).length} Zeilen → ${path.relative(process.cwd(), CSV_FILE)}`);
} else if (cmd === "import") {
  const file = process.argv[3];
  if (!file) throw new Error("Pfad zur CSV fehlt");
  const [head, ...rows] = parseCsv(fs.readFileSync(file, "utf8").replace(/^﻿/, ""));
  const iKey = head.indexOf("Schlüssel"), iNew = head.indexOf("Neuer Text");
  if (iKey < 0 || iNew < 0) throw new Error("Spalten „Schlüssel“ und „Neuer Text“ nicht gefunden");
  let changed = 0;
  const unknown = [], warn = [];
  for (const r of rows) {
    const k = r[iKey]?.trim(), v = r[iNew]?.trim();
    if (!k || !v) continue;
    if (!t[k]) { unknown.push(k); continue; }
    if (t[k].text === v) continue;
    t[k].text = v;
    t[k].status = "geliefert";
    changed++;
    const w = lint(v, t[k].max);
    if (w.length) warn.push(`${k}: ${w.join(", ")}`);
  }
  save(t);
  console.log(`${changed} Texte übernommen.`);
  if (unknown.length) console.log(`Unbekannte Schlüssel (ignoriert): ${unknown.join(", ")}`);
  if (warn.length) console.log(`Bitte prüfen:\n  ${warn.join("\n  ")}`);
}

const open = Object.entries(t).filter(([, e]) => !e.text);
console.log(`${open.length} Platzhalter offen.`);
if (cmd === "status") for (const [k] of open) console.log(`  ${k}`);
