import type { MetadataRoute } from "next";
import { livePages } from "@/lib/content";
import { getArticles, getTags } from "@/lib/ratgeber";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://matrixpos.de";
  const pages = livePages().map((p) => ({ url: `${base}/${p.slug}`.replace(/\/$/, "") || base }));
  const [articles, tags] = await Promise.all([getArticles(), getTags()]);
  const used = tags.filter((t) => articles.some((a) => a.tags.some((x) => x.slug === t.slug)));
  return [
    ...pages,
    { url: `${base}/ratgeber` },
    ...used.map((t) => ({ url: `${base}/ratgeber/thema/${t.slug}` })),
    ...articles.map((a) => ({ url: `${base}/ratgeber/${a.slug}`, lastModified: a.updated_at })),
  ];
}
