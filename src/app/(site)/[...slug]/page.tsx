import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/components/PageView";
import { getPage, livePages } from "@/lib/content";

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
  return {
    title: { absolute: page.metaTitle ?? page.title },
    description: page.description ?? undefined,
  };
}

export default async function Page(props: PageProps<"/[...slug]">) {
  const { slug } = await props.params;
  const page = getPage(slug.join("/"));
  if (!page) notFound();
  return <PageView page={page} />;
}
