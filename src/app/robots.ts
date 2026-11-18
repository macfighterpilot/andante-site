import type { MetadataRoute } from "next";

// Demo: block all crawlers until Andante approves the site (then allow and add a sitemap).
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
