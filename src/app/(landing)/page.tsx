import type { Metadata } from "next";
import { Landing, START_FAQ } from "@/components/landing/Landing";
import { pageMeta, productJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { TEXTE, plain } from "@/components/T";

// Title und Description aus dem Konzept-Doc vom 12.11. (Tab „Copy“, Abschnitt Meta).
export const metadata: Metadata = pageMeta({
  title: "Kassensystem für die Gastronomie: Cloud-Kasse Matrix NXT | Matrix POS",
  description:
    "Matrix NXT ist das Cloud-Kassensystem für Restaurant, Hotel, Bar und Biergarten. Von Gastro-Profis aus Hannover, mit über 30 Jahren Erfahrung. Jetzt Demo buchen.",
  path: "/",
});

export default function Home() {
  // FAQPage nur für Fragen, deren Antwort keinen offenen Platzhalter mehr enthält.
  const fertig = START_FAQ.map((n) => ({ q: TEXTE[`start.faq${n}.frage`].text, a: TEXTE[`start.faq${n}.antwort`].text })).filter(
    (f) => !/⟦([^⟧]+)⟧/.test(f.a) || [...f.a.matchAll(/⟦([^⟧]+)⟧/g)].every((m) => TEXTE[m[1]]?.text),
  );
  const data: object[] = [];
  const nxt = productJsonLd("kassensysteme/nxt", "Matrix NXT, die Cloud-Kasse der Matrix POS GmbH aus Hannover. Läuft im Browser und auf Android, mit Tischplan, Handgerät, Kartenzahlung und Cloud-TSE.");
  if (nxt) data.push(nxt);
  if (fertig.length)
    data.push({
      "@type": "FAQPage",
      mainEntity: fertig.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a).replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") } })),
    });
  return (
    <>
      <JsonLd data={data} />
      <Landing />
    </>
  );
}
