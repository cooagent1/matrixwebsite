import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta, ORGANIZATION } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { formatDate, getArticle, getArticles, renderMarkdown } from "@/lib/ratgeber";
import { ArticleGrid, RatgeberClose } from "@/components/cms/Ratgeber";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  const meta = pageMeta({ title: a.meta_title || `${a.title} | Matrix POS`, description: a.meta_description || a.lead, path: `/ratgeber/${a.slug}` });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: a.published_at, modifiedTime: a.updated_at, authors: [a.author.name], tags: a.tags.map((t) => t.name) } };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();
  const { html, toc } = renderMarkdown(a.body);
  const related = (await getArticles()).filter((x) => x.slug !== a.slug && x.tags.some((t) => a.tags.some((u) => u.slug === t.slug))).slice(0, 3);
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://matrixpos.de";

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "Article",
            headline: a.title,
            description: a.meta_description || a.lead,
            datePublished: a.published_at,
            dateModified: a.updated_at,
            author: { "@type": a.author.slug === "redaktion" ? "Organization" : "Person", name: a.author.name },
            publisher: ORGANIZATION,
            keywords: a.tags.map((t) => t.name).join(", "),
            mainEntityOfPage: `${site}/ratgeber/${a.slug}`,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Ratgeber", item: `${site}/ratgeber` },
              { "@type": "ListItem", position: 2, name: a.title, item: `${site}/ratgeber/${a.slug}` },
            ],
          },
        ]}
      />
      <article>
        <header className="sub-hero rg-hero" id="top">
          <div className="b-wrap sub-hero-in">
            <nav className="b-m rg-crumb" aria-label="Brotkrumen"><Link href="/ratgeber">Ratgeber</Link></nav>
            <h1 className="b-d sub-h1 rg-h1">{a.title}</h1>
            <p className="sub-lead rg-lead">{a.lead}</p>
            <div className="rg-byline">
              <span><b>{a.author.name}</b>{a.author.role && <small>{a.author.role}</small>}</span>
              <span className="b-m rg-meta">
                {formatDate(a.published_at)}
                {a.checked_at && <> · Stand {formatDate(a.checked_at)}</>} · {a.minutes} Min. Lesezeit
              </span>
            </div>
            <div className="rg-tags">
              {a.tags.map((t) => (
                <Link key={t.slug} href={`/ratgeber/thema/${t.slug}`} className="b-m rg-tag">{t.name}</Link>
              ))}
            </div>
          </div>
        </header>
        <div className="sub-sec rg-body-sec">
          <div className="b-wrap rg-layout">
            {toc.length > 2 && (
              <nav className="rg-toc" aria-label="Inhalt">
                <span className="b-m rg-meta">Inhalt</span>
                <ol>{toc.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
              </nav>
            )}
            <div className="rg-prose" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="sub-sec alt">
          <div className="b-wrap">
            <h2 className="b-d sub-h2">Weitere Ratgeber</h2>
            <ArticleGrid articles={related} />
          </div>
        </section>
      )}
      <RatgeberClose />
    </>
  );
}
