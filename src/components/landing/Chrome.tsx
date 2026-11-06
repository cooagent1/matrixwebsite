import { ConsentLink } from "@/components/Consent";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { NAV, QUICK, SUPPORT_PORTAL } from "@/lib/nav";

// Gemeinsamer Rahmen aller Seiten im A2-Design: Menü-Pille oben links, schlanker Footer.
export function LpHeader() {
  return (
    <header className="b-hdr">
      <div className="b-wrap b-hdr-in">
        <div className="b-pill">
          <details className="b-pill-menu">
            <summary className="b-burger" aria-label="Menü öffnen">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <nav className="b-menu" aria-label="Hauptnavigation">
              <div className="b-menu-grid">
                {NAV.map((g) => (
                  <div key={g.label} className={g.label === "Lösungen" ? "b-menu-col b-menu-main" : "b-menu-col"}>
                    <h4 className="b-m">{g.label}</h4>
                    {g.children?.map((c) => (
                      <Link key={c.href} href={c.href}>
                        {c.label}
                        {c.hint && <small>{c.hint}</small>}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="b-menu-foot">
                {QUICK.map((q, k) =>
                  q.external ? (
                    <a key={q.href} href={q.href} target="_blank" rel="noopener noreferrer">{q.label} ↗</a>
                  ) : (
                    <Link key={q.href} href={q.href} className={k === 0 ? "b-menu-cta" : ""}>{q.label}</Link>
                  ),
                )}
              </div>
            </nav>
          </details>
          <Link href="/" aria-label="Matrix POS Startseite"><img src="/lp/logo-matrixpos.png" alt="Matrix POS" className="b-logo" /></Link>
        </div>
      </div>
    </header>
  );
}

export function LpFooter() {
  return (
    <footer className="b-foot">
      <div className="b-wrap b-foot-in">
        <span>© {new Date().getFullYear()} Matrix POS GmbH · Eckenerstraße 2 · 30179 Hannover · <a href="mailto:sales@matrixpos.de">sales@matrixpos.de</a></span>
        <div className="b-foot-links">
          <a href={SUPPORT_PORTAL} target="_blank" rel="noopener noreferrer">Supportportal</a>
          <Link href="/partner">Partner werden</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
          <ConsentLink />
        </div>
      </div>
    </footer>
  );
}
