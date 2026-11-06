import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getArticles, getTags } from "@/lib/ratgeber";
import { ArticleGrid, RatgeberClose, TagChips } from "@/components/cms/Ratgeber";

// Ratgeber aus Supabase (articles, authors, tags), alle 5 Minuten neu.
export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: "Ratgeber für Gastronomen: Kasse, TSE und Meldepflicht | Matrix POS",
  description: "Ratgeber zu Kassensystemen in der Gastronomie: TSE, KassenSichV, Kassenmeldepflicht, Kassenwechsel und Kartenzahlung.",
  path: "/ratgeber",
});

export default async function RatgeberPage() {
  const [articles, tags] = await Promise.all([getArticles(), getTags()]);
  const used = tags.filter((t) => articles.some((a) => a.tags.some((x) => x.slug === t.slug)));
  return (
    <>
      <section className="sub-hero" id="top">
        <div className="b-wrap sub-hero-in">
          <span className="b-m b-kicker">Ratgeber</span>
          <h1 className="b-d sub-h1">Ratgeber.</h1>
          <p className="sub-lead">Antworten auf die Fragen rund um Kasse, Gesetz und Bezahlen in der Gastronomie.</p>
        </div>
      </section>
      <section className="sub-sec">
        <div className="b-wrap">
          <TagChips tags={used} />
          <ArticleGrid articles={articles} />
        </div>
      </section>
      <RatgeberClose />
    </>
  );
}
