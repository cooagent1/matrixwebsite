import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { PartnerDirectory } from "@/components/cms/PartnerDirectory";

// Partnerliste kommt aus Supabase; alle 5 Minuten neu.
export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: "Partnerverzeichnis: Matrix-Vertriebspartner nach PLZ | Matrix POS",
  description: "Vertriebspartner von Matrix POS in Deutschland, Österreich und der Schweiz, sortiert nach Postleitzahl. Installation vor Ort und First-Level-Support.",
  path: "/partner/verzeichnis",
});

export default function PartnerVerzeichnisPage() {
  return (
    <>
      <section className="sub-hero" id="top">
        <div className="b-wrap sub-hero-in">
          <nav className="rg-crumb" aria-label="Brotkrumen"><Link href="/partner">Partner</Link></nav>
          <h1 className="b-d sub-h1">Partnerverzeichnis.</h1>
          <p className="sub-lead">Vertriebspartner installieren Matrix vor Ort und übernehmen den First-Level-Support. Sortiert nach Postleitzahl in Deutschland, dazu Österreich und die Schweiz.</p>
        </div>
      </section>
      <PartnerDirectory />
      <section className="sub-sec alt">
        <div className="b-wrap">
          <h2 className="b-d sub-h2">Kein Partner in Ihrer Nähe?</h2>
          <p className="sub-p">Dann betreuen wir Sie direkt aus Hannover.</p>
          <div className="sub-btns">
            <Link href="/demo" className="b-btn b-btn-acc">Demo buchen</Link>
            <Link href="/partner" className="b-btn b-btn-ghost">Partner werden</Link>
          </div>
        </div>
      </section>
    </>
  );
}
