import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { Btn } from "./Button";
import { ContactForm } from "./ContactForm";
import { Inline } from "./Inline";

const SHOW_PLACEHOLDERS = process.env.VERCEL_ENV !== "production";

// Benachbarte Button-Zeilen gehören zusammen (z. B. Demo buchen + Matrix NXT entdecken).
function mergeButtons(blocks: Block[]): Block[] {
  const out: Block[] = [];
  for (const b of blocks) {
    const prev = out[out.length - 1];
    if (b.type === "buttons" && prev && prev.type === "buttons") {
      out[out.length - 1] = { type: "buttons", items: [...prev.items, ...b.items], phone: b.phone ?? prev.phone };
    } else out.push(b);
  }
  return out;
}

function Blocks({ blocks: rawBlocks, dark, sectionName }: { blocks: Block[]; dark: boolean; sectionName: string }) {
  const blocks = mergeButtons(rawBlocks);
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className={`prose-p ${dark ? "text-white/80" : "text-slate-700"}`}>
                <Inline text={b.text} />
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 text-xl font-semibold tracking-tight">
                <Inline text={b.text} />
              </h3>
            );
          case "list": {
            const stats = /kennzahlen/i.test(sectionName) && b.items.every((t) => t.startsWith("**"));
            if (stats)
              return (
                <ul key={i} className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  {b.items.map((t, j) => {
                    const m = t.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
                    return (
                      <li key={j} className="stat">
                        <span className="stat-n">{m?.[1]}</span>
                        <span className="stat-l">{m?.[2]}</span>
                      </li>
                    );
                  })}
                </ul>
              );
            const links = b.items.every((t) => /→\s*\//.test(t));
            if (links)
              return (
                <ul key={i} className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {b.items.map((t, j) => {
                    // Formen: "Titel: Text → /slug", "**Titel.** Text → /slug", "Titel – Text → /slug"
                    const m =
                      t.match(/^\*\*(.+?)\.?\*\*\s+(.*?)\s*→\s*(\/\S*)$/) ||
                      t.match(/^([^:]+?):\s+(.*?)\s*→\s*(\/\S*)$/) ||
                      t.match(/^(.*?)\s+[–-]\s+(.*?)\s*→\s*(\/\S*)$/);
                    if (!m) return null;
                    return (
                      <li key={j}>
                        <Link href={m[3]} className="card block h-full transition hover:border-ink">
                          <span className="block text-lg font-semibold">{m[1]}</span>
                          <span className="mt-1 block text-sm text-slate-600">{m[2]}</span>
                          <span className="mt-4 block text-sm font-medium text-accent-ink">Mehr erfahren →</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              );
            if (b.items.every((t) => t.startsWith("**")))
              return (
                <ul key={i} className="mt-8 grid gap-4 md:grid-cols-3">
                  {b.items.map((t, j) => (
                    <li key={j} className="card text-slate-700">
                      <Inline text={t} />
                    </li>
                  ))}
                </ul>
              );
            return (
              <ul key={i} className="checklist">
                {b.items.map((t, j) => (
                  <li key={j}>
                    <Inline text={t} />
                  </li>
                ))}
              </ul>
            );
          }
          case "cards":
            return (
              <div key={i} className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {b.items.map((c) => (
                  <div key={c.nr} className="card">
                    <span className="card-nr">{c.nr}</span>
                    <p className="mt-3 text-slate-700">
                      <Inline text={c.text} />
                    </p>
                  </div>
                ))}
              </div>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-xl border border-line bg-white">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-surface">
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} className="px-4 py-3 font-semibold">
                          <Inline text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-line align-top">
                        {r.map((c, k) => (
                          <td key={k} className={`px-4 py-3 ${k === 0 ? "font-medium" : "text-slate-700"}`}>
                            <Inline text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "buttons":
            return (
              <div key={i} className="mt-6 flex flex-wrap items-center gap-3">
                {b.items.map((it, j) => (
                  <Btn key={j} item={it} tone={dark ? "dark" : "light"} secondary={j > 0 && it.kind === "button"} />
                ))}
                {b.phone && (
                  <a href={`tel:${b.phone.replace(/[^\d+]/g, "")}`} className={`link ${dark ? "text-white" : ""}`}>
                    {b.phone}
                  </a>
                )}
              </div>
            );
          case "badges":
            return (
              <ul key={i} className="mt-5 flex flex-wrap gap-2">
                {b.items.map((t, j) => (
                  <li key={j} className="rounded-full border border-line bg-white px-3 py-1 text-sm font-medium text-slate-700">
                    {t}
                  </li>
                ))}
              </ul>
            );
          case "faq":
            return (
              <div key={i} className="mt-6 divide-y divide-line rounded-xl border border-line bg-white">
                {b.items.map((it, j) => (
                  <details key={j} className="group p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                      {it.q}
                      <span className="text-accent-ink transition group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <div className="mt-3 space-y-3 text-slate-700">
                      {it.a.map((t, k) => (
                        <p key={k} className="leading-relaxed"><Inline text={t} /></p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            );
          case "placeholder":
            return SHOW_PLACEHOLDERS ? (
              <div key={i} className="placeholder" role="img" aria-label="Platzhalter">
                <span>Platzhalter</span>
                {b.label}
              </div>
            ) : null;
          case "form":
            return (
              <div key={i} id="formular" className="mt-8">
                <ContactForm />
              </div>
            );
        }
      })}
    </>
  );
}

function SectionView({ s, index, isHome }: { s: Section; index: number; isHome: boolean }) {
  const hero = /^hero$/i.test(s.name);
  const closing = /^abschluss$/i.test(s.name);
  const dark = hero || closing;
  const band = !dark && index % 2 === 0 ? "bg-surface" : "bg-white";
  return (
    <section
      id={s.id}
      className={`${dark ? "bg-navy text-white" : band} ${hero ? "hero" : "py-16 md:py-20"}`}
    >
      <div className={`wrap ${hero ? "py-20 md:py-28" : ""}`}>
        <div className={hero ? "max-w-3xl" : "max-w-4xl"}>
          {s.eyebrow && <p className={`eyebrow ${dark ? "text-accent" : "text-accent-ink"}`}>{s.eyebrow}</p>}
          {s.heading &&
            (hero && (isHome || index === 0) ? (
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">{s.heading}</h1>
            ) : (
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{s.heading}</h2>
            ))}
        </div>
        <div className={hero ? "mt-6 max-w-2xl" : "mt-4 max-w-4xl"}>
          <Blocks blocks={s.blocks} dark={dark} sectionName={s.name} />
        </div>
      </div>
    </section>
  );
}

export function PageView({ page }: { page: Page }) {
  const isHome = page.slug === "";
  const first = page.sections[0];
  const hasHero = first && /^hero$/i.test(first.name);
  return (
    <>
      {!hasHero && (
        <section className="bg-navy text-white">
          <div className="wrap py-20">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{page.title}</h1>
          </div>
        </section>
      )}
      {page.sections.map((s, i) => (
        <SectionView key={s.id + i} s={s} index={i} isHome={isHome} />
      ))}
    </>
  );
}
