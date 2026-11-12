import Image from "next/image";
import Link from "next/link";
import type { Block, Page, Section } from "@/lib/content";
import { Btn } from "./Button";
import { ContactForm } from "./ContactForm";
import { TeamGrid } from "./cms/TeamGrid";
import type { TeamMember } from "@/lib/cms";
import { Inline } from "./Inline";
import { QUOTES } from "./landing/startseite-data";
import { NxtRad } from "./landing/NxtRad";
import { ProduktFamilie } from "./landing/ProduktFamilie";
import { EMAIL, PHONE } from "@/lib/seo";

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
  const m = t.match(/^\*\*(.+?)\*\*[.:]?\s*([\s\S]*)$/);
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
                    <h3 className="b-d"><Inline text={c.title} /></h3>
                    <p><Inline text={c.text} /></p>
                  </div>
                ))}
              </div>
            );
          case "p":
            return (
              <p key={i} className="sub-p"><Inline text={b.text} /></p>
            );
          case "tiles":
            return (
              <div key={i} className="sub-tiles">
                {b.items.map((x, j) => {
                  const inner = (
                    <>
                      {x.n && <b className="b-d">{x.n}</b>}
                      {x.title && <strong><Inline text={x.title} /></strong>}
                      {x.text && <span><Inline text={x.text} /></span>}
                    </>
                  );
                  return x.href ? (
                    <Link key={j} href={x.href} className="sub-tile sub-tile-link">{inner}</Link>
                  ) : (
                    <div key={j} className="sub-tile">{inner}</div>
                  );
                })}
              </div>
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
                        {l ? (<><h3 className="b-d"><Inline text={l.title} /></h3><p><Inline text={l.text} /></p></>) : <p><Inline text={t} /></p>}
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
                      {l ? (<><h3 className="b-d"><Inline text={l.title} /></h3><p><Inline text={l.text} /></p></>) : <p><Inline text={c.text} /></p>}
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
                      <tr key={j}>{r.map((c, k) => (<td key={k} className={k === 0 ? "first" : ""} data-label={k > 0 ? b.head[k] : undefined}><Inline text={c} /></td>))}</tr>
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
                    <summary className="b-d"><Inline text={it.q} /><svg className="sub-faq-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary>
                    <div>
                      {it.a.map((t, k) => (<p key={k}><Inline text={t} /></p>))}
                    </div>
                  </details>
                ))}
              </div>
            );
          case "placeholder":
            return SHOW_PLACEHOLDERS ? (
              <div key={i} className="sub-ph" role="img" aria-label="Platzhalter"><span className="b-m">Platzhalter</span><Inline text={b.label} /></div>
            ) : null;
          case "nxtrad":
            return <NxtRad key={i} />;
          case "familie":
            return <ProduktFamilie key={i} />;
          case "form":
            return (
              <div key={i} id="formular" className="sub-form"><ContactForm /></div>
            );
          case "featgrid":
            return (
              <ul key={i} className="sub-feats">
                {b.items.map((c, j) => (
                  <li key={j} className="sub-card sub-feat">
                    <h3 className="b-d"><Inline text={c.title} /></h3>
                    <p><Inline text={c.text} /></p>
                    {c.link && <Link href={c.link.href} className="sub-more"><Inline text={c.link.label} /> →</Link>}
                    {c.placeholder && SHOW_PLACEHOLDERS && <span className="b-m sub-feat-ph">Platzhalter: {c.placeholder}</span>}
                  </li>
                ))}
              </ul>
            );
          case "halves":
            return (
              <div key={i} className="sub-halves">
                {b.items.map((h, j) => (
                  <div key={j} id={h.id} className="sub-half">
                    <h3 className="b-d"><Inline text={h.title} /></h3>
                    {h.text && <p className="sub-p"><Inline text={h.text} /></p>}
                    <ul className="sub-half-cards">
                      {h.cards.map((c) => {
                        const l = splitLead(c.text);
                        return (
                          <li key={c.nr} className="sub-card">
                            {l ? (<><h4 className="b-d"><Inline text={l.title} /></h4><p><Inline text={l.text} /></p></>) : <p><Inline text={c.text} /></p>}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            );
          case "quotes":
            return (
              <div key={i} className="sub-quotes">
                {b.items.map((q, j) => (
                  <figure key={j} className="b-qcard sub-qcard">
                    <svg className="b-qmark-s" width="36" height="28" viewBox="0 0 36 28" aria-hidden="true"><path fill="currentColor" d="M0 28V17C0 7.6 4.6 1.9 13.2 0l1.6 4.2C10 5.8 7.7 9 7.4 13H14v15H0zm21 0V17c0-9.4 4.6-15.1 13.2-17l1.6 4.2C31 5.8 28.7 9 28.4 13H35v15H21z"/></svg>
                    <blockquote><Inline text={q.text} /></blockquote>
                    <figcaption><div><b>{q.name}</b>{q.role && <small>{q.role}</small>}</div></figcaption>
                  </figure>
                ))}
              </div>
            );
          case "points":
            return (
              <ul key={i} className="sub-check sub-points">
                {b.items.map((t, j) => (<li key={j}><Inline text={t} /></li>))}
              </ul>
            );
          case "jumpnav":
            return (
              <nav key={i} className="sub-jump" aria-label="Auf dieser Seite">
                {b.items.map((it, j) => (<a key={j} href={it.href} className="b-m sub-jump-chip">{it.label}</a>))}
              </nav>
            );
          case "logos":
            // ANNAHME (07.11., Robert „gerne“): Logos Oracle und Adyen von Wikimedia Commons (gemeinfrei),
            // protel, DATEV und Fiskaly als Schriftzug, bis Logodateien der Hersteller vorliegen. Alle einfarbig.
            return (
              <div key={i} className="sub-logos">
                {b.label && <span className="b-m sub-logos-l"><Inline text={b.label} /></span>}
                <ul>
                  {b.items.map((l) => (
                    <li key={l.name}>
                      {l.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={l.src} alt={l.name} style={{ height: l.h ?? 26 }} loading="lazy" />
                      ) : (
                        <span className="b-d sub-logos-w"><Inline text={l.name} /></span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "faqgroups":
            // ANNAHME (Nachtpaket 07.11.): Alle Gruppen in einem Abschnitt, erste Frage je Gruppe offen.
            return (
              <div key={i} className="sub-faqgroups">
                {b.groups.map((g) => (
                  <div key={g.id} id={g.id} className="sub-faqgroup">
                    <h2 className="b-d sub-faqgroup-h"><Inline text={g.title} /></h2>
                    <div className="sub-faq">
                      {g.items.map((it, j) => (
                        <details key={j} open={j === 0}>
                          <summary className="b-d"><Inline text={it.q} /><svg className="sub-faq-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary>
                          <div>{it.a.map((t, k) => (<p key={k}><Inline text={t} /></p>))}</div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          case "jobs":
            return (
              <ul key={i} className="sub-jobs">
                {b.items.map((j2, j) => (
                  <li key={j} className="sub-card sub-job">
                    <div><h3 className="b-d"><Inline text={j2.title} /></h3><span className="b-m"><Inline text={j2.meta} /></span></div>
                    <a href={j2.href} className="btn btn-primary">Bewerben</a>
                  </li>
                ))}
              </ul>
            );
          case "columns":
            return (
              <div key={i} className="sub-cols">
                {b.items.map((c, j) => (
                  <div key={j} className={`sub-col sub-col-${c.tone ?? "grey"}`}>
                    <h3 className="b-d"><Inline text={c.title} /></h3>
                    {c.text && <p className="sub-p"><Inline text={c.text} /></p>}
                    <ul className="sub-check">{c.points.map((t, k) => (<li key={k}><Inline text={t} /></li>))}</ul>
                    {c.button && <div className="sub-btns"><Btn item={c.button} tone="dark" secondary={c.button.kind !== "button"} /></div>}
                  </div>
                ))}
              </div>
            );
          case "catgrid":
            return (
              <div key={i} className="sub-cat-wrap">
                <ul className="sub-cats">
                  {b.items.map((c, j) => (
                    <li key={j} className="sub-card sub-cat">
                      <h3 className="b-d"><Inline text={c.title} /></h3>
                      {c.text && <p><Inline text={c.text} /></p>}
                      {c.chips && (
                        <ul className="sub-chips">
                          {c.chips.map((t, k) => (<li key={k} className={`b-m sub-chip ${/^weitere/.test(t) ? "more" : ""}`}>{t}</li>))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
                {b.notes && (
                  <div className="sub-cat-notes">
                    {b.notes.map((n, j) => (
                      <div key={j} className={`sub-note sub-note-${n.tone}`}>
                        <h3 className="b-d"><Inline text={n.title} /></h3>
                        {n.rows.map((r, k) => (
                          <div key={k} className="sub-note-row">
                            {r.label && <span className="b-m sub-note-lbl"><Inline text={r.label} /></span>}
                            <ul className="sub-chips">{r.chips.map((t, l) => (<li key={l} className="b-m sub-chip">{t}</li>))}</ul>
                          </div>
                        ))}
                        {n.link && <Link href={n.link.href} className="sub-more"><Inline text={n.link.label} /> →</Link>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          case "ways":
            return (
              <ul key={i} className="sub-ways">
                {b.items.map((w, j) => (
                  <li key={j}>
                    <b className="b-d"><Inline text={w.title} /></b>
                    <span><Inline text={w.text} /></span>
                    <Btn item={w.button} tone="dark" secondary={w.button.kind !== "button"} />
                  </li>
                ))}
              </ul>
            );
          case "contact":
            return (
              <div key={i} className="sub-contact">
                {b.heading && <span className="b-d sub-contact-h"><Inline text={b.heading} /></span>}
                <dl>
                  {b.lines.map((l, j) => (
                    <div key={j}><dt className="b-m"><Inline text={l.label} /></dt><dd><Inline text={l.text} /></dd></div>
                  ))}
                </dl>
                {b.steps && (
                  <>
                    {b.stepsHeading && <span className="b-d sub-contact-h3"><Inline text={b.stepsHeading} /></span>}
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
  // Rad (Matrix NXT): eigene dunkle Sektion über die volle Breite, ohne Überschrift aus dem Inhalt.
  if (s.blocks.some((b) => b.type === "nxtrad")) return <NxtRad id={s.id} />;
  if (s.blocks.some((b) => b.type === "familie")) return <ProduktFamilie id={s.id} />;
  // Team aus dem CMS ersetzt den Textblock im Abschnitt "Management" (/ueber-uns).
  if (/^management$/i.test(s.name) && team?.length)
    return (
      <section id={s.id} className={`sub-sec ${index % 2 === 0 ? "alt" : ""}`}>
        <div className="b-wrap">
          {s.heading && <h2 className="b-d sub-h2"><Inline text={s.heading} /></h2>}
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
            {s.eyebrow && <span className="b-m b-kicker"><Inline text={s.eyebrow} /></span>}
            {s.heading && (isFirst ? <h1 className="b-d sub-h1"><Inline text={s.heading} /></h1> : <h2 className="b-d sub-h1"><Inline text={s.heading} /></h2>)}
            <div className="sub-hero-body"><Blocks blocks={s.blocks} sectionName={s.name} /></div>
          </div>
          <figure className="sub-hero-photo">
            <Image src={s.image.src} alt={s.image.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" style={{ objectFit: "cover", objectPosition: s.image.position ?? "50% 50%" }} />
          </figure>
        </div>
      </section>
    );
  if (hero && s.heroCard?.length)
    // Hero ohne Foto (07.11.): rechts eine Inhaltskarte, je Seite aus dem, was es gibt (Zahlen, Produkte, Themen, Logos).
    return (
      <section id={s.id} className="sub-hero sub-hero-img sub-hero-card">
        <div className="b-wrap sub-hero-grid">
          <div className="sub-hero-in">
            {s.eyebrow && <span className="b-m b-kicker"><Inline text={s.eyebrow} /></span>}
            {s.heading && (isFirst ? <h1 className="b-d sub-h1"><Inline text={s.heading} /></h1> : <h2 className="b-d sub-h1"><Inline text={s.heading} /></h2>)}
            <div className="sub-hero-body"><Blocks blocks={s.blocks} sectionName={s.name} /></div>
          </div>
          <div className="sub-hero-box"><Blocks blocks={s.heroCard} sectionName={s.name} /></div>
        </div>
      </section>
    );
  if (hero)
    return (
      <section id={s.id} className="sub-hero">
        <div className="b-aurora" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap sub-hero-in">
          {s.eyebrow && <span className="b-m b-kicker"><Inline text={s.eyebrow} /></span>}
          {s.heading && (isFirst ? <h1 className="b-d sub-h1"><Inline text={s.heading} /></h1> : <h2 className="b-d sub-h1"><Inline text={s.heading} /></h2>)}
          <div className="sub-hero-body"><Blocks blocks={s.blocks} sectionName={s.name} /></div>
        </div>
      </section>
    );
  if (closing && s.close)
    // ANNAHME (07.11., Robert „ok“): Drei Varianten für den Abschluss, je Seite eine (Telefon, Formular, Zitat).
    return (
      <section id={s.id} className={`sub-close close-${s.close}`}>
        <div className="b-aurora b-aurora-wide" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap sub-close-2">
          <div className="sub-close-in">
            {s.eyebrow && <span className="b-m b-kicker"><Inline text={s.eyebrow} /></span>}
            {s.heading && <h2 className="b-d sub-h1"><Inline text={s.heading} /></h2>}
            <Blocks blocks={s.blocks} sectionName={s.name} />
          </div>
          <CloseAside s={s} />
        </div>
      </section>
    );
  if (closing)
    return (
      <section id={s.id} className="sub-close">
        <div className="b-aurora b-aurora-wide" aria-hidden="true" />
        <div className="b-grain" aria-hidden="true" />
        <div className="b-wrap sub-close-in">
          {s.eyebrow && <span className="b-m b-kicker"><Inline text={s.eyebrow} /></span>}
          {s.heading && <h2 className="b-d sub-h1"><Inline text={s.heading} /></h2>}
          <Blocks blocks={s.blocks} sectionName={s.name} />
        </div>
      </section>
    );
  if (s.aside?.length)
    return (
      <section id={s.id} className={`sub-sec ${index % 2 === 0 ? "alt" : ""}`}>
        <div className="b-wrap sub-split">
          <div className="sub-split-main">
            {s.eyebrow && <span className="b-m b-kicker"><Inline text={s.eyebrow} /></span>}
            {s.heading && <h2 className="b-d sub-h2"><Inline text={s.heading} /></h2>}
            <Blocks blocks={s.blocks} sectionName={s.name} />
          </div>
          <aside className="sub-split-aside">
            <Blocks blocks={s.aside} sectionName={s.name} />
          </aside>
        </div>
      </section>
    );
  if (s.media)
    // ANNAHME (Nachtpaket 07.11.): Wo kein passendes Foto vorliegt, steht eine neutrale Fläche mit dem Namen der Branche.
    return (
      <section id={s.id} className={`sub-sec sub-media-sec ${index % 2 === 0 ? "alt" : ""}`}>
        <div className={`b-wrap sub-media ${index % 2 === 0 ? "flip" : ""}`}>
          <figure className={`sub-media-fig ${s.media.src ? "" : "empty"}`}>
            {s.media.src ? (
              <Image src={s.media.src} alt={s.media.alt ?? ""} fill sizes="(min-width: 1024px) 45vw, 100vw" style={{ objectFit: "cover", objectPosition: s.media.position ?? "50% 50%" }} />
            ) : (
              <span className="b-d"><Inline text={s.media.label} />{SHOW_PLACEHOLDERS && <small className="b-m">Foto folgt</small>}</span>
            )}
          </figure>
          <div className="sub-media-txt">
            {s.eyebrow && <span className="b-m b-kicker"><Inline text={s.eyebrow} /></span>}
            {s.heading && <h2 className="b-d sub-h2"><Inline text={s.heading} /></h2>}
            <Blocks blocks={s.blocks} sectionName={s.name} />
          </div>
        </div>
      </section>
    );
  if (s.card)
    return (
      <section id={s.id} className="sub-sec sub-sec-card">
        <div className="b-wrap">
          <div className={`sub-tone sub-tone-${s.card}`}>
            {s.eyebrow && <span className="b-m b-kicker"><Inline text={s.eyebrow} /></span>}
            {s.heading && <h2 className="b-d sub-h2"><Inline text={s.heading} /></h2>}
            <Blocks blocks={s.blocks} sectionName={s.name} />
          </div>
        </div>
      </section>
    );
  return (
    <section id={s.id} className={`sub-sec ${index % 2 === 0 ? "alt" : ""}`}>
      <div className="b-wrap">
        {s.eyebrow && <span className="b-m b-kicker"><Inline text={s.eyebrow} /></span>}
        {s.heading && <h2 className="b-d sub-h2"><Inline text={s.heading} /></h2>}
        <Blocks blocks={s.blocks} sectionName={s.name} />
      </div>
    </section>
  );
}

const isRad = (s: Section) => s.blocks.some((b) => b.type === "nxtrad");

export function PageView({ page, team }: { page: Page; team?: TeamMember[] }) {
  const first = page.sections[0];
  const hasHero = first && /^hero$/i.test(first.name);
  return (
    <>
      {!hasHero && (
        <section className="sub-hero">
          <div className="b-aurora" aria-hidden="true" />
          <div className="b-grain" aria-hidden="true" />
          <div className="b-wrap sub-hero-in"><h1 className="b-d sub-h1"><Inline text={page.title} /></h1></div>
        </section>
      )}
      {page.sections.map((s, i) => (
        // Das Rad zählt nicht beim Hell/Grau-Wechsel mit, damit die folgenden Abschnitte ihren Ton behalten.
        <SectionView key={s.id + i} s={s} index={i - page.sections.slice(0, i).filter(isRad).length} isFirst={i === 0} team={team} />
      ))}
    </>
  );
}

function CloseAside({ s }: { s: Section }) {
  if (s.close === "phone")
    return (
      <div className="sub-close-card">
        <span className="b-m b-kicker">Telefon</span>
        <a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`} className="b-d sub-close-tel">{PHONE}</a>
        <p>7 Tage die Woche, Support aus Hannover.</p>
        <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />Eckenerstraße 2, 30179 Hannover</p>
      </div>
    );
  if (s.close === "form")
    return (
      <div id="formular" className="sub-form sub-close-form"><ContactForm /></div>
    );
  const q = QUOTES.find((x) => x.name === s.closeQuote) ?? QUOTES[0];
  return (
    <figure className="b-qcard sub-qcard sub-close-quote">
      <svg className="b-qmark-s" width="36" height="28" viewBox="0 0 36 28" aria-hidden="true"><path fill="currentColor" d="M0 28V17C0 7.6 4.6 1.9 13.2 0l1.6 4.2C10 5.8 7.7 9 7.4 13H14v15H0zm21 0V17c0-9.4 4.6-15.1 13.2-17l1.6 4.2C31 5.8 28.7 9 28.4 13H35v15H21z"/></svg>
      <blockquote><Inline text={q.text} /></blockquote>
      <figcaption><div><b>{q.name}</b><small>{q.role}</small></div></figcaption>
    </figure>
  );
}
