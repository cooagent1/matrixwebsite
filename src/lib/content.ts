import raw from "@/content/pages.json";

export type Button = { kind: "button" | "link"; label: string; href: string };
export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "cards"; items: { nr: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "buttons"; items: Button[]; phone: string | null }
  | { type: "placeholder"; label: string }
  | { type: "badges"; items: string[] }
  | { type: "faq"; items: { q: string; a: string[] }[] }
  | { type: "form" };
export type Section = {
  id: string;
  name: string;
  eyebrow: string | null;
  heading: string | null;
  blocks: Block[];
};
export type Page = {
  slug: string;
  title: string;
  metaTitle: string | null;
  description: string | null;
  sections: Section[];
  stub: boolean;
  draft: boolean;
};

const pages = raw as unknown as Page[];

export function getPage(slug: string): Page | undefined {
  return pages.find((p) => p.slug === slug && !p.draft);
}

export function livePages(): Page[] {
  return pages.filter((p) => !p.draft);
}
