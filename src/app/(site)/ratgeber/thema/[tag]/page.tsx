import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { getArticles, getTags } from "@/lib/ratgeber";
import { ArticleGrid, RatgeberClose, TagChips } from "@/components/cms/Ratgeber";

export const revalidate = 300;

type Props = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  return (await getTags()).map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const t = (await getTags()).find((x) => x.slug === tag);
  if (!t) return {};
  return pageMeta({ title: `Ratgeber ${t.name} | Matrix POS`, description: t.description, path: `/ratgeber/thema/${t.slug}` });
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const [tags, all] = await Promise.all([getTags(), getArticles()]);
  const t = tags.find((x) => x.slug === tag);
  if (!t) notFound();
  const used = tags.filter((x) => all.some((a) => a.tags.some((y) => y.slug === x.slug)));
  const articles = all.filter((a) => a.tags.some((x) => x.slug === tag));
  return (
    <>
      <section className="sub-hero" id="top">
        <div className="b-wrap sub-hero-in">
          <span className="b-m b-kicker">Ratgeber · Thema</span>
          <h1 className="b-d sub-h1">{t.name}</h1>
          {t.description && <p className="sub-lead">{t.description}</p>}
        </div>
      </section>
      <section className="sub-sec">
        <div className="b-wrap">
          <TagChips tags={used} active={t.slug} />
          <ArticleGrid articles={articles} />
        </div>
      </section>
      <RatgeberClose />
    </>
  );
}
