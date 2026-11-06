import { createClient } from "@supabase/supabase-js";
import { marked } from "marked";

// Ratgeber aus Supabase (Tabellen articles, authors, tags, article_tags). Pflege im Table Editor,
// Artikeltext als Markdown. RLS liefert nur veröffentlichte Artikel. Ohne Konfiguration leere Listen.

export type Author = { slug: string; name: string; role: string | null; bio: string | null; photo_url: string | null };
export type Tag = { slug: string; name: string; description: string | null };
export type ArticleTeaser = {
  slug: string;
  title: string;
  lead: string;
  published_at: string;
  updated_at: string;
  checked_at: string | null;
  cover_url: string | null;
  cover_alt: string | null;
  author: Author;
  tags: Tag[];
  minutes: number;
};
export type Article = ArticleTeaser & { body: string; meta_title: string | null; meta_description: string | null };

const AUTHOR = "author:authors(slug,name,role,bio,photo_url)";
const TAGS = "article_tags(tags(slug,name,description,sort))";
const TEASER = `slug,title,lead,body,published_at,updated_at,checked_at,cover_url,cover_alt,${AUTHOR},${TAGS}`;

function client() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  // Daten-Cache von Next höchstens 5 Minuten, damit neue Artikel auch nach einem Build erscheinen.
  const fetch300: typeof fetch = (input, init) => fetch(input, { ...init, next: { revalidate: 300 } });
  return url && key ? createClient(url, key, { auth: { persistSession: false }, global: { fetch: fetch300 } }) : null;
}

type Row = Omit<Article, "tags" | "minutes"> & { article_tags: { tags: Tag & { sort: number } }[] };

function shape(r: Row): Article {
  const tags = (r.article_tags ?? []).map((x) => x.tags).filter(Boolean).sort((a, b) => a.sort - b.sort);
  const words = `${r.lead} ${r.body}`.split(/\s+/).length;
  return { ...r, tags: tags.map(({ slug, name, description }) => ({ slug, name, description })), minutes: Math.max(1, Math.round(words / 200)) };
}

export async function getArticles(tag?: string): Promise<ArticleTeaser[]> {
  const db = client();
  if (!db) return [];
  const { data, error } = await db.from("articles").select(TEASER).order("published_at", { ascending: false });
  if (error) console.error("ratgeber list", error.message);
  const all = ((data as unknown as Row[] | null) ?? []).map(shape);
  return tag ? all.filter((a) => a.tags.some((t) => t.slug === tag)) : all;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const db = client();
  if (!db) return null;
  const { data, error } = await db
    .from("articles")
    .select(`${TEASER},meta_title,meta_description`)
    .eq("slug", slug)
    .maybeSingle();
  if (error) console.error("ratgeber article", error.message);
  return data ? shape(data as unknown as Row) : null;
}

export async function getTags(): Promise<Tag[]> {
  const db = client();
  if (!db) return [];
  const { data, error } = await db.from("tags").select("slug,name,description").order("sort").order("name");
  if (error) console.error("ratgeber tags", error.message);
  return (data as Tag[] | null) ?? [];
}

/** Markdown → HTML. Inhalte kommen nur aus dem CMS (Schreibrecht nur Dashboard). Externe Links in neuem Tab. */
export function renderMarkdown(md: string): { html: string; toc: { id: string; text: string }[] } {
  const toc: { id: string; text: string }[] = [];
  const slugify = (s: string) =>
    s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = renderer.parser.parseInline(tokens);
    const plain = text.replace(/<[^>]+>/g, "");
    const id = slugify(plain);
    if (depth === 2) toc.push({ id, text: plain });
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };
  renderer.link = ({ href, tokens }) => {
    const text = renderer.parser.parseInline(tokens);
    const ext = /^https?:\/\//.test(href);
    return `<a href="${href}" class="link"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${text}</a>`;
  };
  renderer.table = (token) => {
    const head = token.header.map((c) => `<th>${renderer.parser.parseInline(c.tokens)}</th>`).join("");
    const rows = token.rows.map((r) => `<tr>${r.map((c) => `<td>${renderer.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`).join("");
    return `<div class="rg-table"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
  };
  const html = marked.parse(md, { renderer, async: false }) as string;
  return { html, toc };
}

export function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin" });
}
