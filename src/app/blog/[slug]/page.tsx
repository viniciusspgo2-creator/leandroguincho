import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { JsonLd } from "@/components/site/json-ld";
import { Icon } from "@/lib/icons";
import { defaultConfig, whatsappUrl } from "@/lib/config";
import {
  articleSchema,
  breadcrumbSchema,
  buildSocialMeta,
} from "@/lib/seo";
import { db } from "@/lib/db";

type Params = { params: Promise<{ slug: string }> };

/** Static metadata per slug — pre-rendered at build time via `generateStaticParams`. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });
  if (!post) {
    return {
      title: "Artigo não encontrado",
      robots: { index: false, follow: true },
    };
  }
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const image = post.ogImage ?? post.coverImage ?? "/assets/images/og-image.jpg";

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    keywords: post.tags ? post.tags.split(",").map((t) => t.trim()) : undefined,
    authors: [{ name: post.author }],
    ...buildSocialMeta({
      title,
      description,
      url: `/blog/${post.slug}`,
      image,
      type: "article",
    }),
  };
}

/** Pre-render every published post at build time. */
export async function generateStaticParams() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) {
    notFound();
  }

  const config = defaultConfig;
  const { site } = config;

  const dateStr = post.publishedAt
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(post.publishedAt)
    : "";

  const tags = post.tags
    ? post.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <>
      <JsonLd
        id="ld-article"
        data={articleSchema({
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          coverImage: post.coverImage,
          author: post.author,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
        })}
      />
      <JsonLd
        id="ld-breadcrumb"
        data={breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <SiteHeader config={config} currentPath="/blog" />
      <main id="conteudo">
        <article className="article">
          <header className="article__header">
            <div className="container">
              <nav className="article__crumbs" aria-label="Trilha de navegação">
                <Link href="/">Início</Link>
                <Icon name="chevron" />
                <Link href="/blog">Blog</Link>
              </nav>
              {tags.length > 0 ? (
                <div className="article__tags">
                  {tags.map((tag) => (
                    <span key={tag} className="article__tag">{tag}</span>
                  ))}
                </div>
              ) : null}
              <h1>{post.title}</h1>
              <p className="article__excerpt">{post.excerpt}</p>
              <div className="article__meta">
                <span><Icon name="user" /> {post.author}</span>
                {dateStr ? (
                  <span><Icon name="clock" /> {dateStr}</span>
                ) : null}
              </div>
            </div>
          </header>

          {post.coverImage ? (
            <div className="container article__cover">
              {/* biome-ignore lint/performance/noImgElement: blog cover */}
              <img
                src={post.coverImage}
                alt={post.title}
                width={1600}
                height={900}
                loading="eager"
              />
            </div>
          ) : null}

          <div className="container article__content prose-lg">
            <BlogContent content={post.content} />
          </div>

          <section className="article__cta" aria-labelledby="article-cta-title">
            <div className="container article__cta-inner">
              <div>
                <span className="eyebrow eyebrow--light"><i /> Precisa de um guincho agora?</span>
                <h2 id="article-cta-title">
                  Atendimento 24h
                  <br />
                  <span>em Ituiutaba e região.</span>
                </h2>
                <p>Fale com a equipe pelo WhatsApp e envie sua localização.</p>
              </div>
              <div className="article__cta-actions">
                <a
                  className="button button--white button--large"
                  href={whatsappUrl("Olá! Li um artigo no blog e preciso de um guincho.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="message" /> Chamar no WhatsApp
                </a>
                <a
                  className="button button--dark button--large"
                  href={`tel:${site.phoneLink}`}
                >
                  <Icon name="phone" /> Ligar {site.phoneDisplay}
                </a>
              </div>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter config={config} />
    </>
  );
}

/**
 * Minimal, dependency-free markdown-ish renderer.
 * Supports: ## H2, ### H3, paragraphs, **bold**, *italic*, - lists, > blockquote,
 * [text](url) links, and ```code blocks```.
 * The admin post editor stores plain markdown text; this renderer keeps the page
 * lightweight (no react-markdown dependency).
 */
function BlogContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/).filter(Boolean);
  return (
    <>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("### ")) {
          return <h3 key={idx}>{renderInline(trimmed.slice(4))}</h3>;
        }
        if (trimmed.startsWith("## ")) {
          return <h2 key={idx}>{renderInline(trimmed.slice(3))}</h2>;
        }
        if (trimmed.startsWith("# ")) {
          return <h2 key={idx}>{renderInline(trimmed.slice(2))}</h2>;
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={idx}>
              {renderInline(trimmed.replace(/^>\s?/gm, ""))}
            </blockquote>
          );
        }
        if (trimmed.startsWith("```")) {
          const lines = trimmed.split("\n");
          const code = lines.slice(1, -1).join("\n");
          return (
            <pre key={idx}>
              <code>{code}</code>
            </pre>
          );
        }
        if (/^[-*]\s+/m.test(trimmed)) {
          const items = trimmed.split("\n").map((l) => l.replace(/^[-*]\s+/, ""));
          return (
            <ul key={idx}>
              {items.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        if (/^\d+\.\s+/m.test(trimmed)) {
          const items = trimmed.split("\n").map((l) => l.replace(/^\d+\.\s+/, ""));
          return (
            <ol key={idx}>
              {items.map((item, i) => (
                <li key={i}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }
        return <p key={idx}>{renderInline(trimmed)}</p>;
      })}
    </>
  );
}

/** Renders **bold**, *italic*, [text](url), and `inline code` into React nodes. */
function renderInline(text: string): React.ReactNode {
  // Tokenize in order: code, links, bold, italic.
  const tokens = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return tokens.map((token, i) => {
    if (token.startsWith("`") && token.endsWith("`")) {
      return <code key={i}>{token.slice(1, -1)}</code>;
    }
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={i}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      return <em key={i}>{token.slice(1, -1)}</em>;
    }
    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = /^https?:\/\//.test(href);
      return (
        <Link
          key={i}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {label}
        </Link>
      );
    }
    return <span key={i}>{token}</span>;
  });
}
