import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/components/PageView";
import { JsonLd } from "@/components/JsonLd";
import { getPage, livePages } from "@/lib/content";
import { pageJsonLd, pageMeta } from "@/lib/seo";

export const dynamicParams = false;

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
      <PageView page={page} />
    </>
  );
}
