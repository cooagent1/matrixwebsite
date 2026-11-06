import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalText";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Allgemeine Geschäftsbedingungen | Matrix POS", path: "/agb" });

export default function Page() {
  return <LegalPage title="Allgemeine Geschäftsbedingungen" file="agb.md" />;
}
