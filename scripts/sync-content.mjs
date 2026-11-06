// Liest die Texte aus ../docs/copy (Quelle der Wahrheit im Agent-Workspace),
// entfernt interne Markierungen und schreibt src/content/pages.json.
// Aufruf: npm run sync
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const COPY = path.resolve(here, "../../docs/copy");
const OUT = path.resolve(here, "../src/content/pages.json");

const PAGES = [
  ["startseite.md", ""],
  ["kassensysteme/uebersicht.md", "kassensysteme"],
  ["kassensysteme/nxt.md", "kassensysteme/nxt"],
  ["kassensysteme/pos.md", "kassensysteme/pos"],
  ["pay.md", "pay"],
  ["schnittstellen.md", "schnittstellen"],
  ["industries.md", "industries"],
  ["support.md", "support"],
  ["faq.md", "faq"],
  ["ratgeber.md", "ratgeber"],
  ["ueber-uns.md", "ueber-uns"],
  ["partner-werden.md", "partner"],
  ["jobs.md", "jobs"],
  ["demo.md", "demo"],
];
// Schlanke Struktur 07.11. (Robert): NEO, CONGA, Hardware, Fernwartung als Abschnitte; EVO, Branchen-Detailseiten,
// Kasse & Gesetz, Referenzen, Empfehlen gestrichen. Alte Texte liegen in docs/copy/_archiv/.

// Seiten ohne belastbaren Inhalt werden nicht ausgeliefert, bis die Fakten da sind.
const DRAFTS = new Set([]);

const SKIP_SECTIONS = /^(offen|intern|hinweise?|quellen)\b/i;

function clean(s) {
  return s
    // interne Markierungen (auch mit eckigen Klammern im Inhalt, nicht verschachtelt)
    .replace(/\[(?:PRÜFEN|ENTSCHEIDUNG|ASSET\/PRÜFEN|PRÜFEN\/ASSET|Matrix prüfen)[^\]]*\]/g, "")
    // Klammern mit internen Verweisen
    .replace(/\s*\([^()]*(?:COO-\d+|Einwand|Launchdeck|Odoo|entschieden|Entschieden|Ticket)[^()]*\)/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

function extractAssets(line) {
  const assets = [];
  const rest = line.replace(/\[ASSET:\s*([^\]]*)\]/g, (_, a) => {
    assets.push(a.trim());
    return "";
  });
  return { rest, assets };
}

function parseButtons(line) {
  const parts = line.split(/\s·\s(?=\[(?:Button|Link)\])/);
  const items = [];
  let phone = null;
  for (const part of parts) {
    const m = part.match(/^\[(Button|Link)\]\s*(.+?)\s*→\s*(\S+)(.*)$/);
    if (!m) continue;
    let [, kind, label, target, tail] = m;
    label = clean(label);
    let href = target;
    if (/hubspot/i.test(target + " " + tail)) href = /rückruf/i.test(label) ? "hubspot:callback" : "hubspot:demo";
    const tm = tail.match(/(\+49[\d\s-]+)/);
    if (tm) phone = tm[1].trim();
    items.push({ kind: kind.toLowerCase(), label, href: href.replace(/[),.;]+$/, "") });
  }
  return { items, phone };
}

function parseTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => clean(c.trim()));
}

function parseFile(file, slug) {
  const raw = fs.readFileSync(path.join(COPY, file), "utf8").split("\n");
  const title = clean(raw[0].replace(/^#\s*/, "").replace(/\s*\(\/[^)]*\)\s*$/, ""));
  const page = { slug, title, metaTitle: null, description: null, sections: [] };
  let section = null;
  let skip = false;
  let list = null;
  let cards = null;
  let table = null;

  const flush = () => {
    if (!section) return;
    if (list) { section.blocks.push({ type: "list", items: list }); list = null; }
    if (cards) { section.blocks.push({ type: "cards", items: cards }); cards = null; }
    if (table) {
      const [head, , ...rows] = table;
      section.blocks.push({ type: "table", head, rows });
      table = null;
    }
  };
  const push = (b) => { flush(); section.blocks.push(b); };

  let i = 1;
  // alles vor der ersten ## ignorieren
  while (i < raw.length && !raw[i].startsWith("## ")) i++;

  for (; i < raw.length; i++) {
    const line = raw[i].replace(/\s+$/, "");

    if (line.startsWith("## ")) {
      flush();
      const name = clean(line.slice(3));
      if (/^meta$/i.test(name)) { section = null; skip = false; page._meta = true; continue; }
      if (SKIP_SECTIONS.test(name)) { section = null; skip = true; continue; }
      skip = false;
      page._meta = false;
      const base = name.replace(/\s*\(.*$/, "").trim();
      const anchor = name.match(/\(#([a-z0-9-]+)\)/);
      const id = anchor ? anchor[1] : base.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      section = { id, name: base, eyebrow: null, heading: null, blocks: [] };
      if (/^formular\b/i.test(name)) { section.blocks.push({ type: "form" }); section.heading = "Nachricht schreiben"; }
      page.sections.push(section);
      continue;
    }

    if (page._meta) {
      const t = line.match(/^-\s*Title:\s*(.+)$/);
      const d = line.match(/^-\s*Description:\s*(.+)$/);
      if (t) page.metaTitle = clean(t[1]);
      if (d) page.description = clean(d[1]);
      continue;
    }
    if (skip || !section) continue;
    if (section.blocks.length === 1 && section.blocks[0].type === "form" && /^formular\b/i.test(section.name)) continue; // Felddefinition ist intern

    if (!line.trim()) { flush(); continue; }

    // Tabelle
    if (line.trim().startsWith("|")) {
      if (list) { section.blocks.push({ type: "list", items: list }); list = null; }
      table = table || [];
      table.push(parseTableRow(line));
      continue;
    } else if (table) flush();

    // Kartenzeile "01 **Titel.** Text"
    const card = line.match(/^(\d{2})\s+(.*)$/);
    if (card) {
      const { rest } = extractAssets(card[2]);
      const text = clean(rest);
      if (text) { cards = cards || []; cards.push({ nr: card[1], text }); }
      continue;
    } else if (cards) flush();

    // Liste
    if (/^-\s+/.test(line)) {
      const { rest } = extractAssets(line.replace(/^-\s+/, ""));
      const text = clean(rest);
      if (text) { list = list || []; list.push(text); }
      continue;
    } else if (list) flush();

    // Überzeile
    const eb = line.match(/^\*Überzeile:\*\s*(.+)$/);
    if (eb) { section.eyebrow = clean(eb[1]); continue; }

    // H3
    if (line.startsWith("### ")) { push({ type: "h3", text: clean(line.slice(4)) }); continue; }

    // Buttons / Links
    if (/^\[(Button|Link)\]/.test(line)) {
      const { items, phone } = parseButtons(line);
      if (items.length) push({ type: "buttons", items, phone });
      continue;
    }

    // Formularhinweis
    if (/^Formular:/.test(line)) { push({ type: "form" }); continue; }

    // reine Klammerzeile = interne Notiz
    if (/^\(.*\)$/.test(line.trim())) continue;
    if (/^(Telefon|E-Mail):/.test(line)) { /* normaler Text */ }

    // FAQ: fette Frage
    const q = line.match(/^\*\*([^*]+\?)\*\*(?:\s*\(.*\))?$/);
    if (q && /faq\.md$/.test(file)) { push({ type: "q", text: clean(q[1]) }); continue; }

    // Überschrift als reine Fettzeile
    const bold = line.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      const text = clean(bold[1]);
      if (!text) continue;
      if (!section.heading) section.heading = text; else push({ type: "h3", text });
      continue;
    }

    // Absatz (evtl. mit Asset-Hinweis)
    const { rest, assets } = extractAssets(line);
    const text = clean(rest);

    // Badges ("Drei Fakten als Badges: A · B · C" oder "Badges: A · B")
    const badges = text.match(/^(?:Drei Fakten als )?Badges:\s*(.+)$/);
    if (badges) { push({ type: "badges", items: badges[1].split(/\s·\s/).map((t) => t.trim()).filter(Boolean) }); continue; }

    // FAQ-Teaser: Verweis auf Fragen aus faq.md
    const faqRef = text.match(/^(?:\w+ )?Fragen aus copy\/faq\.md:\s*(.+)$/) ||
      (/häufige fragen/i.test(section.name) && text.includes("?") && text.includes(" · ") ? [null, text] : null);
    if (faqRef) { push({ type: "faqref", questions: faqRef[1].split(/\s·\s/).map((t) => t.trim()).filter(Boolean) }); continue; }

    // interne Regieanweisungen
    if (/^(Sieben Bausteine|Kacheln,|Drei Kacheln|Kundenlogo-Leiste|Zwei Varianten|Formular:|Platzierung)/.test(text) || /copy\/|Staging|Freigaben prüfen/.test(text)) continue;

    if (/^Regel für alle Seiten/.test(text) || /COO-\d+/.test(text)) continue;
    const bi = text.search(/\[(?:Button|Link)\]/);
    if (bi > 0) {
      push({ type: "p", text: text.slice(0, bi).trim() });
      const { items } = parseButtons(text.slice(bi));
      if (items.length) push({ type: "buttons", items, phone: null });
    } else if (text) push({ type: "p", text });
    for (const a of assets) push({ type: "placeholder", label: clean(a.replace(/[,:]?\s*(?:wenn\s+)?COO-\d+(?:\s+ja)?/g, "")) });
  }
  flush();
  for (const sec of page.sections) {
    const out = [];
    for (let k = 0; k < sec.blocks.length; k++) {
      const b = sec.blocks[k];
      if (b.type === "q") {
        const a = [];
        while (sec.blocks[k + 1] && sec.blocks[k + 1].type === "p") a.push(sec.blocks[++k].text);
        const prev = out[out.length - 1];
        const item = { q: b.text, a };
        if (!a.length) continue; // Frage ohne Antwort (nur [PRÜFEN]) nicht ausliefern
        if (prev && prev.type === "faq") prev.items.push(item); else out.push({ type: "faq", items: [item] });
      } else out.push(b);
    }
    sec.blocks = out;
    if (/faq\.md$/.test(file) && !sec.heading && !/^hero$|nicht dabei/i.test(sec.name)) sec.heading = sec.name;
  }
  for (const sec of page.sections) {
    if (!sec.heading && !sec.eyebrow && !/^(hero|kennzahlen|abschluss|der film|kontakt)$/i.test(sec.name)) sec.heading = sec.name;
  }
  delete page._meta;
  // leere Abschnitte entfernen
  // Abschnitte ohne Inhalt (nur Überschrift, Rest war [PRÜFEN]) nicht ausliefern
  page.sections = page.sections.filter((s) => s.blocks.length || (/^hero$/i.test(s.name) && s.heading));
  page.stub = page.sections.reduce((n, s) => n + s.blocks.length, 0) < 1;
  page.draft = DRAFTS.has(slug);
  return page;
}

const pages = PAGES.map(([f, s]) => parseFile(f, s));

// FAQ-Teaser mit den Antworten der FAQ-Seite füllen (nächstliegende Frage nach gemeinsamen Wörtern)
const words = (t) => new Set(t.toLowerCase().replace(/[^a-zäöüß ]/g, " ").split(/\s+/).filter((w) => w.length > 3));
const faqItems = pages.find((p) => p.slug === "faq").sections.flatMap((sec) => sec.blocks.filter((b) => b.type === "faq").flatMap((b) => b.items));
for (const pg of pages) for (const sec of pg.sections) {
  sec.blocks = sec.blocks.map((b) => {
    if (b.type !== "faqref") return b;
    const items = b.questions.map((qq) => {
      const w = words(qq);
      let best = null, score = 0;
      for (const it of faqItems) {
        const v = words(it.q);
        const common = [...w].filter((x) => v.has(x)).length;
        const sc = common / Math.max(1, Math.min(w.size, v.size));
        if (sc > score) { score = sc; best = it; }
      }
      return score >= 0.5 ? best : null;
    }).filter(Boolean);
    return items.length ? { type: "faq", items } : { type: "p", text: "" };
  }).filter((b) => !(b.type === "p" && !b.text));
}
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(pages, null, 1) + "\n");
const stubs = pages.filter((p) => p.stub).map((p) => "/" + p.slug);
console.log(`sync: ${pages.length} Seiten, ${pages.reduce((n, p) => n + p.sections.length, 0)} Abschnitte. Ohne Inhalt: ${stubs.join(", ") || "keine"}`);
