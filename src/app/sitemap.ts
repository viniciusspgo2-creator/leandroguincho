import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { defaultConfig } from "@/lib/config";

/**
 * Dynamic sitemap.xml — generated at request time.
 * Includes:
 *   - Static pages (/ and /galeria)
 *   - All published blog posts (/blog/[slug])
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? defaultConfig.site.url).replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    blogPosts = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("[sitemap] could not load posts:", error);
  }

  return [...staticPages, ...blogPosts];
}
