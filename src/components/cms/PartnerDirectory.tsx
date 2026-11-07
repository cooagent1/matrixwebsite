import Link from "next/link";
import { getPartners, type Partner } from "@/lib/cms";
import { T } from "@/components/T";

const site = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;
const LAND: Record<Partner["country"], string> = { DE: "Deutschland", AT: "Österreich", CH: "Schweiz" };
const ORDER: Record<Partner["country"], number> = { DE: 0, AT: 1, CH: 2 };

/** Deutschland nach Postleitzahl, danach Österreich und Schweiz. */
function sorted(list: Partner[]): Partner[] {
  return [...list].sort(
    (a, b) => ORDER[a.country] - ORDER[b.country] || (a.postal_code ?? "").localeCompare(b.postal_code ?? "") || a.name.localeCompare(b.name, "de"),
  );
}

// ANNAHME (Nachtpaket 07.11.): Verzeichnis auf eigener Seite /partner/verzeichnis, Daten unverändert aus Supabase (Tabelle partners).
// Auf /partner steht nur ein Teaser mit Anzahl und Link.
export async function PartnerTeaser() {
  const partners = await getPartners();
  const lands = [...new Set(sorted(partners).map((p) => (p.country === "CH" ? "der Schweiz" : LAND[p.country])))];
  const where = lands.length > 1 ? `${lands.slice(0, -1).join(", ")} und ${lands[lands.length - 1]}` : lands[0];
  return (
    <section id="haendler" className="sub-sec alt">
      <div className="b-wrap pd-teaser">
        <div className="pt-col">
          <span className="b-m b-kicker">Vertriebspartner</span>
          <h2 className="b-d sub-h2">Matrix in Ihrer Nähe.</h2>
          <p className="sub-p">
            {/* Anzahl und Länder aus dem CMS bleiben fest, die Beschreibung ist Platzhalter (seite.partner.9). */}
            {partners.length > 0 && <>{`${partners.length} Vertriebspartner in ${where}.`} </>}
            <T k="seite.partner.9" />
          </p>
        </div>
        <Link href="/partner/verzeichnis" className="b-btn b-btn-acc">Zum Partnerverzeichnis</Link>
      </div>
    </section>
  );
}

// Vertriebspartner als Liste mit PLZ-Spalte, gepflegt in Supabase (Tabelle partners).
export async function PartnerDirectory() {
  const partners = sorted(await getPartners());
  if (!partners.length)
    return (
      <section className="sub-sec">
        <div className="b-wrap"><p className="sub-p">Das Verzeichnis wird gerade aktualisiert. Fragen Sie uns nach einem Partner in Ihrer Region: <a href="tel:+495115929380" className="link">+49 511 592938-0</a>.</p></div>
      </section>
    );
  return (
    <section id="liste" className="sub-sec">
      <div className="b-wrap">
        <div className="pd-table" role="table" aria-label="Vertriebspartner nach Postleitzahl">
          <div className="pd-row pd-head" role="row">
            <span role="columnheader">PLZ</span><span role="columnheader">Partner</span><span role="columnheader">Adresse</span><span role="columnheader">Kontakt</span>
          </div>
          {partners.map((p) => (
            <div key={p.id} className="pd-row" role="row">
              <span role="cell" className="b-m pd-plz">{p.country !== "DE" && <small>{p.country} </small>}{p.postal_code}</span>
              <span role="cell" className="pd-name"><b className="b-d">{p.name}</b>{p.contact_person && <small>{p.contact_person}</small>}</span>
              <span role="cell" className="pd-addr">
                {p.street && <>{p.street}<br /></>}
                {[p.postal_code, p.city].filter(Boolean).join(" ")}
                {p.country !== "DE" && <>, {LAND[p.country]}</>}
              </span>
              <span role="cell" className="pd-links">
                {p.phone && <a href={tel(p.phone)}>{p.phone}</a>}
                {p.email && <a href={`mailto:${p.email}`}>{p.email}</a>}
                {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer">{site(p.website)} ↗</a>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
