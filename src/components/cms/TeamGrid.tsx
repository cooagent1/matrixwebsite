/* eslint-disable @next/next/no-img-element */
import type { TeamMember } from "@/lib/cms";

const initials = (n: string) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

// Leitungsteam auf /ueber-uns, gepflegt in Supabase (Tabelle team_members).
// Ohne Name und Foto erscheint eine ruhige Platzhalterkarte mit der Rolle.
export function TeamGrid({ team }: { team: TeamMember[] }) {
  return (
    <ul className="tm-grid">
      {team.map((m) => (
        <li key={m.id} className="tm-card">
          <div className="tm-photo">
            {m.photo_url ? (
              <img src={m.photo_url} alt={m.name ? `${m.name}, ${m.role}` : m.role} loading="lazy" />
            ) : (
              <span aria-hidden="true">
                {m.name ? initials(m.name) : (
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" /></svg>
                )}
              </span>
            )}
          </div>
          <span className="b-m tm-role">{m.role}</span>
          <h3 className="b-d tm-name">{m.name ?? "Name folgt"}</h3>
          {m.bio && <p className="tm-bio">{m.bio}</p>}
        </li>
      ))}
    </ul>
  );
}
