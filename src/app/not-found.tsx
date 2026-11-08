import Link from "next/link";
import { LpFooter, LpHeader } from "@/components/landing/Chrome";
import "@/components/landing/landing.css";


export default function NotFound() {
  return (
    <div className="lp lp-sub">
      <LpHeader />
      <main className="flex-1">
        <section className="sub-hero">
          <div className="b-aurora" aria-hidden="true" />
          <div className="b-grain" aria-hidden="true" />
          <div className="b-wrap sub-hero-in">
            <span className="b-m b-kicker">404</span>
            <h1 className="b-d sub-h1">Diese Seite gibt es nicht.</h1>
            <p className="sub-lead">Vielleicht hilft Ihnen die Startseite oder ein kurzes Gespräch weiter.</p>
            <div className="sub-btns"><Link href="/" className="b-btn b-btn-white">Zur Startseite</Link><Link href="/demo" className="b-btn b-btn-ghost">Demo buchen</Link></div>
          </div>
        </section>
      </main>
      <LpFooter />
    </div>
  );
}
