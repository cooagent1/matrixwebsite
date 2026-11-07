import type { Metadata } from "next";
import { Landing } from "@/components/landing/Landing";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { startFaqs } from "@/lib/faq";

export const metadata: Metadata = pageMeta({
  title: "Kassensysteme für die Gastronomie aus Hannover | Matrix POS",
  description:
    "Matrix NXT, die Cloud-Kasse für Restaurant, Hotel und Freizeitpark. Seit über 30 Jahren Gastro-Kassen, Support von Gastro-Profis an 7 Tagen. Demo buchen.",
  path: "/",
});

// FAQ der Startseite aus dem CMS (startseite = true), alle 5 Minuten neu.
export const revalidate = 300;

export default async function Home() {
  const faqs = await startFaqs();
  const faq = {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.frage, acceptedAnswer: { "@type": "Answer", text: f.antwort.replace(/\*\*/g, "").replace(/\s*\n\s*\n\s*/g, " ") } })),
  };
  return (
    <>
      <JsonLd data={[faq]} />
      <Landing faqs={faqs} />
    </>
  );
}
