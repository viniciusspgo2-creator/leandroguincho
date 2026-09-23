/**
 * SEO utilities: JSON-LD builders, OpenGraph/Twitter helpers.
 *
 * All builders return plain objects suitable for `JSON.stringify` inside
 * `<script type="application/ld+json">` tags or Next.js `metadata` API.
 */
import type { SiteConfig } from "@/lib/config";
import type { FaqItem } from "@/lib/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://guinchoituiutaba.com.br";

export function absoluteUrl(path = "/"): string {
  const trimmed = path.replace(/^\/+/, "/");
  return `${SITE_URL.replace(/\/$/, "")}${trimmed}`;
}

/** Schema.org LocalBusiness (AutomotiveBusiness subtype) for the home page. */
export function localBusinessSchema(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": absoluteUrl("/#business"),
    name: config.site.name,
    alternateName: "Leandro Guincho 24h",
    description: config.site.description,
    url: config.site.url,
    telephone: config.site.phoneLink,
    areaServed: config.site.serviceArea,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ituiutaba",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -18.9744,
      longitude: -49.4606,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    priceRange: "$$",
    image: absoluteUrl("/assets/images/og-image.jpg"),
    logo: absoluteUrl("/assets/images/brand/logo-full.png"),
    sameAs: [config.site.instagram].filter(Boolean),
  };
}

/** Schema.org WebSite — sitelinks search box eligible. */
export function websiteSchema(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: config.site.url,
    name: config.site.name,
    description: config.site.tagline,
    publisher: { "@id": absoluteUrl("/#business") },
    inLanguage: "pt-BR",
  };
}

/** Schema.org FAQPage — turns the FAQ section into rich results. */
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Schema.org BreadcrumbList — used on inner pages (galeria, blog, blog/[slug]). */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Schema.org BlogPosting — for blog article pages. */
export function articleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string | null;
  author?: string;
  publishedAt?: Date | null;
  updatedAt: Date;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? absoluteUrl(post.coverImage) : absoluteUrl("/assets/images/og-image.jpg"),
    datePublished: post.publishedAt?.toISOString() ?? post.updatedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: post.author ?? "Leandro Guincho",
    },
    publisher: {
      "@type": "Organization",
      name: "Leandro Guincho",
      logo: { "@type": "ImageObject", url: absoluteUrl("/assets/images/brand/logo-full.png") },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    inLanguage: "pt-BR",
  };
}

/** Build Twitter + OpenGraph object for Next.js metadata API. */
export function buildSocialMeta({
  title,
  description,
  url,
  image = "/assets/images/og-image.jpg",
  type = "website",
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article";
}) {
  return {
    openGraph: {
      type,
      locale: "pt_BR",
      url: absoluteUrl(url),
      siteName: "Leandro Guincho",
      title,
      description,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

/** Build a JSON-LD script tag string. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data, null, 2);
}
