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
  | { type: "form" }
  // Nachtpaket 07.11.: kompakte Wege-Zeile (/demo) und Kontaktkarte für die Seitenspalte
  | { type: "ways"; items: { title: string; text: string; button: Button }[] }
  | {
      type: "catgrid";
      items: { title: string; text?: string; chips?: string[] }[];
      notes?: { title: string; tone: "blue" | "yellow"; rows: { label?: string; chips: string[] }[]; link?: Button }[];
    }
  | { type: "featgrid"; items: { title: string; text: string; link?: Button; placeholder?: string }[] }
  | { type: "halves"; items: { id?: string; title: string; text?: string; cards: { nr: string; text: string }[] }[] }
  | { type: "columns"; items: { title: string; tone?: "blue" | "grey"; points: string[]; button?: Button }[] }
  | { type: "contact"; heading?: string; lines: { label: string; text: string }[]; steps?: string[]; stepsHeading?: string; notes?: string[] };
export type Section = {
  id: string;
  name: string;
  eyebrow: string | null;
  heading: string | null;
  blocks: Block[];
  /** Abschnitt als farbige Hinweiskarte (gelb wie Technologiepartner, blau wie Vertriebspartner). */
  card?: "yellow" | "blue";
  /** Foto rechts im Hero (ab 1024 px), mobil unter dem Text. */
  image?: { src: string; alt: string; position?: string; asset?: string };
  /** Rechte Spalte neben den Blöcken (ab 1024 px), mobil darunter. */
  aside?: Block[];
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
