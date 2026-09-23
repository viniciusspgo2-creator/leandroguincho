import Link from "next/link";
import { Icon } from "@/lib/icons";

export type BlogCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  author: string;
  publishedAt: Date | null;
  tags: string | null;
};

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function BlogCard({ post }: { post: BlogCardPost }) {
  const tags = post.tags
    ? post.tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 3)
    : [];

  return (
    <article className="blog-card" data-reveal>
      <Link href={`/blog/${post.slug}`} className="blog-card__cover">
        {post.coverImage ? (
          // biome-ignore lint/performance/noImgElement: blog cover image
          <img src={post.coverImage} alt={post.title} loading="lazy" />
        ) : (
          <div className="blog-card__cover-fallback">
            <Icon name="truck" />
          </div>
        )}
      </Link>
      <div className="blog-card__body">
        {tags.length > 0 ? (
          <div className="blog-card__tags">
            {tags.map((tag) => (
              <span key={tag} className="blog-card__tag">{tag}</span>
            ))}
          </div>
        ) : null}
        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <div className="blog-card__meta">
          <span>{post.author}</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="blog-card__cta">
          Ler artigo <Icon name="arrow" />
        </Link>
      </div>
    </article>
  );
}
