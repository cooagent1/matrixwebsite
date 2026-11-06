import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalText";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Impressum | Matrix POS", path: "/impressum" });

export default function Page() {
  return <LegalPage title="Impressum" file="impressum.md" />;
}
