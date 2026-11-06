import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/components/PageView";
import { JsonLd } from "@/components/JsonLd";
import { getTeam } from "@/lib/cms";
import { getPage, livePages } from "@/lib/content";
import { pageJsonLd, pageMeta } from "@/lib/seo";

export const dynamicParams = false;
// Inhalte aus dem CMS (Team auf /ueber-uns) alle 5 Minuten neu.
export const revalidate = 300;

export function generateStaticParams() {
  return livePages()
    .filter((p) => p.slug !== "")
    .map((p) => ({ slug: p.slug.split("/") }));
}

export async function generateMetadata(props: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getPage(slug.join("/"));
  if (!page) return {};
  return pageMeta({ title: page.metaTitle ?? page.title, description: page.description, path: `/${page.slug}` });
}

export default async function Page(props: PageProps<"/[...slug]">) {
  const { slug } = await props.params;
  const page = getPage(slug.join("/"));
  if (!page) notFound();
  return (
    <>
      <JsonLd data={pageJsonLd(page, (s) => getPage(s)?.title)} />
      <PageView page={page} team={page.slug === "ueber-uns" ? await getTeam() : undefined} />
    </>
  );
}
