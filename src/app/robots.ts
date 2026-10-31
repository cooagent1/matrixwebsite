import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";
  return indexable
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: "https://matrixpos.de/sitemap.xml" }
    : { rules: { userAgent: "*", disallow: "/" } };
}
