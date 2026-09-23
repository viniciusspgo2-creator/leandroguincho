import type { MetadataRoute } from "next";
import { defaultConfig } from "@/lib/config";

/**
 * robots.txt — generated dynamically so the sitemap URL is always correct.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? defaultConfig.site.url).replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
