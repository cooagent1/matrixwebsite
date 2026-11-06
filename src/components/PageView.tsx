import Image from "next/image";
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { Btn } from "./Button";
import { ContactForm } from "./ContactForm";
import { TeamGrid } from "./cms/TeamGrid";
import type { TeamMember } from "@/lib/cms";
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

// Fett-Einleitung ("**Titel.** Text") als Karte mit Titel und Text
function splitLead(t: string): { title: string; text: string } | null {
  const m = t.match(/^\*\*(.+?)\*\*\s*([\s\S]*)$/);
  return m ? { title: m[1].replace(/[.:]\s*$/, ""), text: m[2] } : null;
}

function Blocks({ blocks: rawBlocks, sectionName }: { blocks: Block[]; sectionName: string }) {
  const blocks = mergeButtons(rawBlocks);
  // Aufeinanderfolgende "**Titel.** Text"-Absätze werden zu einem Kartenraster.
  const groups: (Block | { type: "leadcards"; items: { title: string; text: string }[] })[] = [];
  for (const b of blocks) {
    const lead = b.type === "p" ? splitLead(b.text) : null;
    const prev = groups[groups.length - 1];
    if (lead && prev && prev.type === "leadcards") prev.items.push(lead);
    else if (lead) groups.push({ type: "leadcards", items: [lead] });
    else groups.push(b);
  }
  return (
    <>
      {groups.map((b, i) => {
        switch (b.type) {
          case "leadcards":
            if (b.items.length === 1)
              return (
                <p key={i} className="sub-p"><strong>{b.items[0].title}.</strong> <Inline text={b.items[0].text} /></p>
              );
            return (
              <div key={i} className="sub-grid">
                {b.items.map((c, j) => (
                  <div key={j} className="sub-card">
                    <h3 className="b-d">{c.title}</h3>
                    <p><Inline text={c.text} /></p>
                  </div>
                ))}
              </div>
            );
          case "p":
            return (
              <p key={i} className="sub-p"><Inline text={b.text} /></p>
            );
          case "h3":
            return (
              <h3 key={i} className="b-d sub-h3"><Inline text={b.text} /></h3>
            );
          case "list": {
            const stats = /kennzahlen/i.test(sectionName) && b.items.every((t) => t.startsWith("**"));
            if (stats)
              return (
                <ul key={i} className="b-nums sub-nums">
                  {b.items.map((t, j) => {
                    const m = t.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
                    return (
                      <li key={j} className="b-num"><b className="b-d">{m?.[1]}</b><span>{m?.[2]}</span></li>
                    );
                  })}
                </ul>
              );
            const links = b.items.every((t) => /→\s*\//.test(t));
            if (links)
              return (
                <ul key={i} className="sub-grid">
                  {b.items.map((t, j) => {
                    const m =
                      t.match(/^\*\*(.+?)\.?\*\*\s+(.*?)\s*→\s*(\/\S*)$/) ||
                      t.match(/^([^:]+?):\s+(.*?)\s*→\s*(\/\S*)$/) ||
                      t.match(/^(.*?)\s+[–-]\s+(.*?)\s*→\s*(\/\S*)$/);
                    if (!m) return null;
                    return (
                      <li key={j}>
                        <Link href={m[3]} className="sub-card sub-card-link">
                          <h3 className="b-d">{m[1]}</h3>
                          <p>{m[2]}</p>
                          <span className="sub-more">Mehr erfahren →</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              );
            if (b.items.every((t) => t.startsWith("**")))
              return (
                <div key={i} className="sub-grid">
                  {b.items.map((t, j) => {
                    const l = splitLead(t);
                    return (
                      <div key={j} className="sub-card">
                        {l ? (<><h3 className="b-d">{l.title}</h3><p><Inline text={l.text} /></p></>) : <p><Inline text={t} /></p>}
                      </div>
                    );
                  })}
                </div>
              );
            return (
              <ul key={i} className="sub-check">
                {b.items.map((t, j) => (
                  <li key={j}><Inline text={t} /></li>
                ))}
              </ul>
            );
          }
          case "cards":
            return (
              <div key={i} className="sub-grid">
                {b.items.map((c) => {
                  const l = splitLead(c.text);
                  return (
                    <div key={c.nr} className="sub-card">
                      <span className="n b-d">{c.nr}</span>
                      {l ? (<><h3 className="b-d">{l.title}</h3><p><Inline text={l.text} /></p></>) : <p><Inline text={c.text} /></p>}
                    </div>
                  );
                })}
              </div>
            );
          case "table":
            return (
              <div key={i} className="sub-table">
                <table>
                  <thead>
                    <tr>{b.head.map((h, j) => (<th key={j}><Inline text={h} /></th>))}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>{r.map((c, k) => (<td key={k} className={k === 0 ? "first" : ""}><Inline text={c} /></td>))}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "buttons":
            return (
              <div key={i} className="sub-btns">
                {b.items.map((it, j) => (
                  <Btn key={j} item={it} tone="dark" secondary={j > 0 && it.kind === "button"} />
                ))}
                {b.phone && (
                  <a href={`tel:${b.phone.replace(/[^\d+]/g, "")}`} className="link">{b.phone}</a>
                )}
              </div>
            );
          case "badges":
            return (
              <ul key={i} className="b-devs">
                {b.items.map((t, j) => (<li key={j} className="b-m b-dev">{t}</li>))}
              </ul>
            );
          case "faq":
            return (
              <div key={i} className="sub-faq">
                {b.items.map((it, j) => (
                  <details key={j}>
                    <summary className="b-d">{it.q}<svg className="sub-faq-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary>
                    <div>
                      {it.a.map((t, k) => (<p key={k}><Inline text={t} /></p>))}
                    </div>
                  </details>
                ))}
              </div>
            );
          case "placeholder":
            return SHOW_PLACEHOLDERS ? (
              <div key={i} className="sub-ph" role="img" aria-label="Platzhalter"><span className="b-m">Platzhalter</span>{b.label}</div>
            ) : null;
          case "form":
            return (
              <div key={i} id="formular" className="sub-form"><ContactForm /></div>
            );
          case "ways":
            return (
              <ul key={i} className="sub-ways">
                {b.items.map((w, j) => (
                  <li key={j}>
                    <b className="b-d">{w.title}</b>
                    <span>{w.text}</span>
                    <Btn item={w.button} tone="dark" secondary={w.button.kind !== "button"} />
                  </li>
                ))}
              </ul>
            );
          case "contact":
            return (
              <div key={i} className="sub-contact">
                {b.heading && <span className="b-d sub-contact-h">{b.heading}</span>}
                <dl>
                  {b.lines.map((l, j) => (
                    <div key={j}><dt className="b-m">{l.label}</dt><dd><Inline text={l.text} /></dd></div>
                  ))}
                </dl>
                {b.steps && (
                  <>
                    {b.stepsHeading && <span className="b-d sub-contact-h3">{b.stepsHeading}</span>}
                    <ol className="sub-contact-steps">
                      {b.steps.map((t, j) => (<li key={j}><Inline text={t} /></li>))}
                    </ol>
                  </>
                )}
                {b.notes?.map((t, j) => (<p key={j} className="sub-contact-note"><Inline text={t} /></p>))}
              </div>
            );
        }
      })}
    </>
  );
}

function SectionView({ s, index, isFirst, team }: { s: Section; index: number; isFirst: boolean; team?: TeamMember[] }) {
  const hero = /^hero$/i.test(s.name);
  // Team aus dem CMS ersetzt den Textblock im Abschnitt "Management" (/ueber-uns).
  if (/^management$/i.test(s.name) && team?.length)
    return (
      <section id={s.id} className={`sub-sec ${index % 2 === 0 ? "alt" : ""}`}>
        <div className="b-wrap">
          {s.heading && <h2 className="b-d sub-h2">{s.heading}</h2>}
          <TeamGrid team={team} />
        </div>
      </section>
    );
  // In Produktion keine Abschnitte, die nur aus Platzhaltern bestehen (sonst leere Überschrift).
  if (!hero && !SHOW_PLACEHOLDERS && s.blocks.every((b) => b.type === "placeholder")) return null;
  const closing = /^abschluss$/i.test(s.name);
  if (hero && s.image)
    // ANNAHME (Nachtpaket 07.11.): Fotos aus dem NXT-Shooting 09/2026 sind freigegeben (Robert, 05.11.).
    return (
      <section id={s.id} className="sub-hero sub-hero-img">
        <div className="b-wrap sub-hero-grid">
          <div className="sub-hero-in">
            {s.eyebrow && <span className="b-m b-kicker">{s.eyebrow}</span>}
            {s.heading && (isFirst ? <h1 className="b-d sub-h1">{s.heading}</h1> : <h2 className="b-d sub-h1">{s.heading}</h2>)}
            <div className="sub-hero-body"><Blocks blocks={s.blocks} sectionName={s.name} /></div>
          </div>
          <figure className="sub-hero-photo">
            <Image src={s.image.src} alt={s.image.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" style={{ objectFit: "cover", objectPosition: s.image.position ?? "50% 50%" }} />
          </figure>
        </div>
      </section>
    );
  if (hero)
    return (
      <section id={s.id} className="sub-hero">
        <div className="b-aurora" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap sub-hero-in">
          {s.eyebrow && <span className="b-m b-kicker">{s.eyebrow}</span>}
          {s.heading && (isFirst ? <h1 className="b-d sub-h1">{s.heading}</h1> : <h2 className="b-d sub-h1">{s.heading}</h2>)}
          <div className="sub-hero-body"><Blocks blocks={s.blocks} sectionName={s.name} /></div>
        </div>
      </section>
    );
  if (closing)
    return (
      <section id={s.id} className="sub-close">
        <div className="b-aurora b-aurora-wide" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap sub-close-in">
          {s.eyebrow && <span className="b-m b-kicker">{s.eyebrow}</span>}
          {s.heading && <h2 className="b-d sub-h1">{s.heading}</h2>}
          <Blocks blocks={s.blocks} sectionName={s.name} />
        </div>
      </section>
    );
  if (s.aside?.length)
    return (
      <section id={s.id} className={`sub-sec ${index % 2 === 0 ? "alt" : ""}`}>
        <div className="b-wrap sub-split">
          <div className="sub-split-main">
            {s.eyebrow && <span className="b-m b-kicker">{s.eyebrow}</span>}
            {s.heading && <h2 className="b-d sub-h2">{s.heading}</h2>}
            <Blocks blocks={s.blocks} sectionName={s.name} />
          </div>
          <aside className="sub-split-aside">
            <Blocks blocks={s.aside} sectionName={s.name} />
          </aside>
        </div>
      </section>
    );
  return (
    <section id={s.id} className={`sub-sec ${index % 2 === 0 ? "alt" : ""}`}>
      <div className="b-wrap">
        {s.eyebrow && <span className="b-m b-kicker">{s.eyebrow}</span>}
        {s.heading && <h2 className="b-d sub-h2">{s.heading}</h2>}
        <Blocks blocks={s.blocks} sectionName={s.name} />
      </div>
    </section>
  );
}

export function PageView({ page, team }: { page: Page; team?: TeamMember[] }) {
  const first = page.sections[0];
  const hasHero = first && /^hero$/i.test(first.name);
  return (
    <>
      {!hasHero && (
        <section className="sub-hero">
          <div className="b-aurora" aria-hidden="true" />
          <div className="b-grain" aria-hidden="true" />
          <div className="b-wrap sub-hero-in"><h1 className="b-d sub-h1">{page.title}</h1></div>
        </section>
      )}
      {page.sections.map((s, i) => (
        <SectionView key={s.id + i} s={s} index={i} isFirst={i === 0} team={team} />
      ))}
    </>
  );
}
