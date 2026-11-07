import { createClient } from "@supabase/supabase-js";
import fallback from "@/content/faqs.json";
import type { Page } from "@/lib/content";

// FAQ aus Supabase (Tabellen faq_groups, faqs), Robert 07.11.: eine Tabelle für alle Fragen.
// /faq zeigt alle veröffentlichten Fragen nach Gruppen, die Startseite die mit startseite = true,
// andere Seiten die, deren Slug in seiten steht (z. B. {"support"}).
// ANNAHME: Solange Supabase nicht erreichbar ist oder faqs leer ist, gilt src/content/faqs.json
// (gleicher Inhalt wie der Startbestand der Migration), damit die Seite nie ohne Fragen dasteht.

export type FaqGroup = { slug: string; titel: string; sort: number };
export type Faq = {
  gruppe: string;
  frage: string;
  antwort: string; // Absätze durch Leerzeile getrennt, **fett** und [Text](/pfad) erlaubt
  link_href: string | null;
  link_label: string | null;
  startseite: boolean;
  seiten: string[];
  sort: number;
};
export type FaqData = { gruppen: FaqGroup[]; fragen: Faq[] };

const FALLBACK = fallback as unknown as FaqData;

async function load(): Promise<FaqData> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return FALLBACK;
  const db = createClient(url, key, { auth: { persistSession: false } });
  const [g, f] = await Promise.all([
    db.from("faq_groups").select("slug,titel,sort").order("sort"),
    db.from("faqs").select("gruppe,frage,antwort,link_href,link_label,startseite,seiten,sort").order("sort"),
  ]);
  if (g.error || f.error) {
    console.error("cms faq", g.error?.message ?? f.error?.message);
    return FALLBACK;
  }
  if (!f.data?.length) return FALLBACK;
  return { gruppen: (g.data as FaqGroup[]) ?? [], fragen: f.data as Faq[] };
}

/** Absätze für die Darstellung mit <Inline>, Link als letzter Absatz. */
export function faqParagraphs(f: Faq): string[] {
  const a = f.antwort.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
  if (f.link_href) a.push(f.link_label ? `[${f.link_label} →](${f.link_href})` : `→ ${f.link_href}`);
  return a;
}

export async function getFaqs(): Promise<FaqData> {
  return load();
}

export async function startFaqs(): Promise<Faq[]> {
  const { gruppen, fragen } = await load();
  const order = new Map(gruppen.map((g, i) => [g.slug, i]));
  return fragen
    .filter((f) => f.startseite)
    .sort((a, b) => (order.get(a.gruppe) ?? 99) - (order.get(b.gruppe) ?? 99) || a.sort - b.sort);
}

/** Setzt die FAQ aus dem CMS in die Seite ein: faqgroups (/faq) mit allen Fragen, faq-Blöcke mit cms: true mit den Fragen der Seite. */
export async function withCmsFaqs(page: Page): Promise<Page> {
  const uses = page.sections.some((s) => s.blocks.some((b) => b.type === "faqgroups" || (b.type === "faq" && b.cms)));
  if (!uses) return page;
  const { gruppen, fragen } = await load();
  const item = (f: Faq) => ({ q: f.frage, a: faqParagraphs(f) });
  return {
    ...page,
    sections: page.sections.map((s) => ({
      ...s,
      blocks: s.blocks.map((b) => {
        if (b.type === "faqgroups")
          return {
            ...b,
            groups: gruppen
              .map((g) => ({ id: g.slug, title: g.titel, items: fragen.filter((f) => f.gruppe === g.slug).sort((x, y) => x.sort - y.sort).map(item) }))
              .filter((g) => g.items.length),
          };
        if (b.type === "faq" && b.cms) return { ...b, items: fragen.filter((f) => f.seiten.includes(page.slug)).map(item) };
        return b;
      }),
    })),
  };
}
