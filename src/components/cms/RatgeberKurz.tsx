import Link from "next/link";
import { T } from "@/components/T";

// ANNAHME (Nachtpaket 07.11.): Vier Kurzartikel ohne eigene URL direkt auf /ratgeber, ausklappbar.
// Texte nur aus vorhandenem Material (Ratgeber Cloud-TSE, FAQ Gesetz, NXT-Seite), gepflegt in texte.json.
// Ausführliche Artikel kommen weiter aus dem CMS (Supabase) und stehen darüber.

const ITEMS: { n: number; link?: { label: string; href: string }; extra?: string }[] = [
  { n: 1, link: { label: "Ratgeber Cloud-TSE", href: "/ratgeber/cloud-tse" } },
  { n: 2, link: { label: "Meldung und Fristen im Detail", href: "/ratgeber/cloud-tse#meldung-beim-finanzamt" } },
  { n: 3, extra: "ratgeber.kurz3.ergaenzung" },
  { n: 4, link: { label: "Wechsel-Demo buchen", href: "/demo?thema=wechsel" } },
];

export function RatgeberKurz() {
  return (
    <section className="sub-sec alt" id="kurz-erklaert">
      <div className="b-wrap">
        <h2 className="b-d sub-h2"><T k="ratgeber.kurz.h2" /></h2>
        <ul className="rk-grid">
          {ITEMS.map((it) => (
            <li key={it.n} className="sub-card rk-card">
              <h3 className="b-d"><T k={`ratgeber.kurz${it.n}.titel`} /></h3>
              <p className="rk-teaser"><T k={`ratgeber.kurz${it.n}.teaser`} /></p>
              <details className="rk-more">
                <summary className="b-m">Weiterlesen</summary>
                <p><T k={`ratgeber.kurz${it.n}.text`} /></p>
                {it.extra && <p><T k={it.extra} /></p>}
                {it.link && <Link href={it.link.href} className="link">{it.link.label} →</Link>}
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
