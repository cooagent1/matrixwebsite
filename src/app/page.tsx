import type { Metadata } from "next";
import { PageView } from "@/components/PageView";
import { getPage } from "@/lib/content";

const page = getPage("")!;

export const metadata: Metadata = {
  title: { absolute: page.metaTitle ?? page.title },
  description: page.description ?? undefined,
};

export default function Home() {
  return <PageView page={page} />;
}
