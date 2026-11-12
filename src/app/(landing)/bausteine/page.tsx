import type { Metadata } from "next";
import { Bausteine } from "@/components/landing/Bausteine";
import { LpFooter } from "@/components/landing/Chrome";

// Musterkatalog der 14 Signature-Bausteine (07.11.), seit 12.11. nicht mehr auf der Startseite.
// Nicht verlinkt, nicht in der Sitemap, noindex.
export const metadata: Metadata = {
  title: { absolute: "Bausteine (intern) | Matrix POS" },
  robots: { index: false, follow: false },
};

export default function BausteinePage() {
  return (
    <>
      <main id="main" className="b-bausteine-page">
        <div className="b-wrap" style={{ padding: "48px 40px 0" }}>
          <h1 className="b-d sub-h2">Bausteine (intern)</h1>
          <p className="sub-p">Musterkatalog, nicht verlinkt. Stand 07.11.2026.</p>
        </div>
        <Bausteine />
      </main>
      <LpFooter />
    </>
  );
}
