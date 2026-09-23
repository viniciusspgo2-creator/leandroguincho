import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { JsonLd } from "@/components/site/json-ld";
import { BlogCard } from "@/components/blog/blog-card";
import { Icon } from "@/lib/icons";
import { defaultConfig, whatsappUrl } from "@/lib/config";
import { breadcrumbSchema, buildSocialMeta } from "@/lib/seo";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog — Guincho e Auto Socorro em Ituiutaba",
  description:
    "Dicas, guias e informações sobre guincho, auto socorro e transporte de veículos em Ituiutaba e região.",
  alternates: { canonical: "/blog" },
  ...buildSocialMeta({
    title: "Blog — Guincho e Auto Socorro em Ituiutaba | Leandro Guincho",
    description:
      "Dicas, guias e informações sobre guincho, auto socorro e transporte de veículos em Ituiutaba e região.",
    url: "/blog",
    image: "/assets/images/og-image.jpg",
  }),
};

export default async function BlogPage() {
  const config = defaultConfig;
  const { site } = config;

  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <SiteHeader config={config} currentPath="/blog" />
      <main id="conteudo">
        <section className="page-hero page-hero--blog">
          <div className="page-hero__media">
            {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
            <img
              src="/assets/images/frota/frota-06-800.webp"
              alt=""
              width={800}
              height={600}
            />
            <div />
          </div>
          <div className="container page-hero__content" data-reveal>
            <span className="eyebrow eyebrow--light"><i /> Conteúdo útil</span>
            <h1>
              Blog do guincho
              <br />
              <span>dicas para o motorista.</span>
            </h1>
            <p>Informações e guias sobre auto socorro, transporte de veículos e imprevistos na estrada em Ituiutaba.</p>
            <div className="page-hero__actions">
              <a
                className="button button--primary"
                href={whatsappUrl("Olá! Preciso de atendimento de guincho.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="message" /> Solicitar atendimento
              </a>
              <a
                className="button button--glass"
                href={`tel:${site.phoneLink}`}
              >
                <Icon name="phone" /> Ligar agora
              </a>
            </div>
          </div>
        </section>

        <section className="section section--blog" aria-labelledby="blog-list-title">
          <div className="container">
            <div className="section-heading section-heading--center" data-reveal>
              <span className="eyebrow"><i /> Artigos publicados</span>
              <h2 id="blog-list-title">
                Guia do motorista
                <br />
                <span>em Ituiutaba e região.</span>
              </h2>
              <p>Conteúdo prático para te ajudar antes, durante e depois de um imprevisto automotivo.</p>
            </div>

            {posts.length === 0 ? (
              <div className="blog-empty">
                <p>Nenhum artigo publicado ainda. Volte em breve.</p>
              </div>
            ) : (
              <div className="blog-grid">
                {posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={{
                      slug: post.slug,
                      title: post.title,
                      excerpt: post.excerpt,
                      coverImage: post.coverImage,
                      author: post.author,
                      publishedAt: post.publishedAt,
                      tags: post.tags,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter config={config} />
    </>
  );
}
