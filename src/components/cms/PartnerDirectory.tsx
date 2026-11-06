import { getPartners, type Partner } from "@/lib/cms";

const site = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;

// Vertriebspartner nach Region, gepflegt in Supabase (Tabelle partners).
export async function PartnerDirectory() {
  const partners = await getPartners();
  if (!partners.length) return null;
  const groups = new Map<string, Partner[]>();
  for (const p of partners) groups.set(p.region, [...(groups.get(p.region) ?? []), p]);
  return (
    <section id="haendler" className="sub-sec alt">
      <div className="b-wrap">
        <span className="b-m b-kicker">Vertriebspartner</span>
        <h2 className="b-d sub-h2">Matrix in Ihrer Nähe.</h2>
        <p className="sub-p" style={{ maxWidth: 720 }}>
          Vertriebspartner installieren Matrix vor Ort und übernehmen den First-Level-Support. Sortiert nach Postleitzahl in Deutschland, dazu Österreich und die Schweiz.
        </p>
        <div className="pd-groups">
          {[...groups].map(([region, list]) => (
            <div key={region} className="pd-group">
              <h3 className="b-m pd-region">{region}</h3>
              <ul className="pd-list">
                {list.map((p) => (
                  <li key={p.id} className="sub-card pd-card">
                    <h4 className="b-d">{p.name}</h4>
                    <p className="pd-addr">
                      {p.street && <>{p.street}<br /></>}
                      {[p.postal_code, p.city].filter(Boolean).join(" ")}
                      {p.country !== "DE" && <>, {p.country === "AT" ? "Österreich" : "Schweiz"}</>}
                    </p>
                    {p.contact_person && <p className="pd-contact">{p.contact_person}</p>}
                    <p className="pd-links">
                      {p.phone && <a href={tel(p.phone)}>{p.phone}</a>}
                      {p.email && <a href={`mailto:${p.email}`}>{p.email}</a>}
                      {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer">{site(p.website)} ↗</a>}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
