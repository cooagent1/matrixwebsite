import type { MetadataRoute } from "next";
import { livePages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://matrixpos.de";
  return livePages().map((p) => ({ url: `${base}/${p.slug}`.replace(/\/$/, "") || base }));
}
