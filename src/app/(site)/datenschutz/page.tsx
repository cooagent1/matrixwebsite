import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalText";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Datenschutzerklärung | Matrix POS", path: "/datenschutz" });

export default function Page() {
  return <LegalPage title="Datenschutzerklärung" file="datenschutz.md" />;
}
