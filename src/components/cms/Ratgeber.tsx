import Link from "next/link";
import type { ArticleTeaser, Tag } from "@/lib/ratgeber";
import { formatDate } from "@/lib/ratgeber";

// Bausteine für /ratgeber: Themen-Filter und Artikelkarten.

export function TagChips({ tags, active }: { tags: Tag[]; active?: string }) {
  if (!tags.length) return null;
  return (
    <nav className="rg-tags" aria-label="Themen">
      <Link href="/ratgeber" className={`b-m rg-tag ${!active ? "on" : ""}`} aria-current={!active ? "page" : undefined}>Alle</Link>
      {tags.map((t) => (
        <Link key={t.slug} href={`/ratgeber/thema/${t.slug}`} className={`b-m rg-tag ${active === t.slug ? "on" : ""}`} aria-current={active === t.slug ? "page" : undefined}>
          {t.name}
        </Link>
      ))}
    </nav>
  );
}

export function ArticleGrid({ articles }: { articles: ArticleTeaser[] }) {
  if (!articles.length) return <p className="sub-p">Zu diesem Thema gibt es noch keinen Artikel.</p>;
  return (
    <ul className="rg-grid">
      {articles.map((a) => (
        <li key={a.slug}>
          <Link href={`/ratgeber/${a.slug}`} className="sub-card sub-card-link rg-card">
            <span className="b-m rg-meta">{a.tags.map((t) => t.name).join(" · ")}</span>
            <h3 className="b-d">{a.title}</h3>
            <p>{a.lead}</p>
            <span className="b-m rg-meta rg-foot">{formatDate(a.published_at)} · {a.minutes} Min. Lesezeit</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function RatgeberClose() {
  return (
    <section className="sub-sec">
      <div className="b-wrap">
        <h2 className="b-d sub-h2">Ihre Frage ist nicht dabei?</h2>
        <div className="sub-btns">
          <Link href="/demo?thema=frage" className="b-btn b-btn-acc">Rückruf vereinbaren</Link>
          <a href="tel:+495115929380" className="b-btn b-btn-ghost">+49 511 592938-0</a>
        </div>
      </div>
    </section>
  );
}
