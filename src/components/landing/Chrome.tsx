/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { NAV, SUPPORT_PORTAL } from "@/lib/nav";

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
              {NAV.map((g) => (
                <div key={g.label}>
                  <h4 className="b-m">{g.label}</h4>
                  {g.href && !g.children && <Link href={g.href}>{g.label}</Link>}
                  {g.children?.map((c) => (
                    <Link key={c.href} href={c.href}>{c.label}</Link>
                  ))}
                </div>
              ))}
              <div>
                <h4 className="b-m">Direkt</h4>
                <Link href="/demo">Demo buchen</Link>
                <a href={SUPPORT_PORTAL} target="_blank" rel="noopener noreferrer">Supportportal</a>
                <Link href="/partner">Partner werden</Link>
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
        </div>
      </div>
    </footer>
  );
}
