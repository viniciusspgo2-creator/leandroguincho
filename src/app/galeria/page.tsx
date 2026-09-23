import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { JsonLd } from "@/components/site/json-ld";
import { Icon } from "@/lib/icons";
import { defaultConfig, whatsappUrl } from "@/lib/config";
import { breadcrumbSchema, buildSocialMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Galeria de Fotos e Vídeo Institucional",
  description:
    "Confira fotos da frota e operações do Leandro Guincho, além do vídeo institucional.",
  alternates: { canonical: "/galeria" },
  ...buildSocialMeta({
    title: "Galeria de Fotos e Vídeo Institucional | Leandro Guincho",
    description:
      "Confira fotos da frota e operações do Leandro Guincho, além do vídeo institucional.",
    url: "/galeria",
    image: "/assets/images/frota/frota-03-800.webp",
  }),
};

export default function GaleriaPage() {
  const config = defaultConfig;
  const { site } = config;

  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Galeria", path: "/galeria" },
        ])}
      />
      <SiteHeader config={config} currentPath="/galeria" />
      <main id="conteudo">
        <section className="page-hero page-hero--gallery">
          <div className="page-hero__media">
            {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
            <img
              src="/assets/images/frota/frota-03-800.webp"
              alt="Frota Leandro Guincho"
              width={800}
              height={600}
            />
            <div />
          </div>
          <div className="container page-hero__content" data-reveal>
            <span className="eyebrow eyebrow--light"><i /> Imagens reais</span>
            <h1>
              Galeria da frota
              <br />
              <span>e dos atendimentos.</span>
            </h1>
            <p>Registros do caminhão plataforma em operações de transporte e remoção de veículos.</p>
            <div className="page-hero__actions">
              <a
                className="button button--primary"
                href={whatsappUrl("Olá! Preciso de atendimento de guincho.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="message" /> Solicitar atendimento
              </a>
              <button
                className="button button--glass"
                type="button"
                data-video-open={site.institutionalVideoId}
              >
                <Icon name="play" /> Vídeo institucional
              </button>
            </div>
          </div>
        </section>

        <section className="section gallery-page" aria-labelledby="gallery-page-title">
          <div className="container">
            <div className="gallery-page__heading" data-reveal>
              <div>
                <span className="eyebrow"><i /> Leandro Guincho</span>
                <h2 id="gallery-page-title">Frota em ação</h2>
              </div>
              <p>Clique em qualquer imagem para visualizar em tamanho ampliado.</p>
            </div>
            <div className="gallery-grid">
              {Array.from({ length: 10 }, (_, idx) => {
                const image = idx + 1;
                const n = String(image).padStart(2, "0");
                const variant = ((image - 1) % 5) + 1;
                return (
                  <button
                    key={image}
                    className={`gallery-grid__item gallery-grid__item--${variant}`}
                    type="button"
                    data-lightbox-src={`/assets/images/galeria/frota-${n}.webp`}
                    data-reveal
                    aria-label={`Ampliar foto ${image}`}
                  >
                    <picture>
                      <source
                        srcSet={`/assets/images/frota/frota-${n}-480.webp`}
                        media="(max-width: 720px)"
                      />
                      {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
                      <img
                        src={`/assets/images/frota/frota-${n}-800.webp`}
                        alt="Operação e frota do Leandro Guincho"
                        width={800}
                        height={600}
                        loading="lazy"
                      />
                    </picture>
                    <span>
                      <b>Ver foto</b>
                      <Icon name="camera" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="gallery-video" aria-labelledby="gallery-video-title">
          <div className="gallery-video__bg">
            {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
            <img
              src="/assets/images/frota/frota-10-800.webp"
              alt=""
              width={800}
              height={600}
              loading="lazy"
            />
            <div />
          </div>
          <div className="container gallery-video__inner" data-reveal>
            <span className="gallery-video__play">
              <button
                type="button"
                data-video-open={site.institutionalVideoId}
                aria-label="Assistir vídeo institucional"
              >
                <Icon name="play" />
              </button>
            </span>
            <div>
              <span className="eyebrow eyebrow--light"><i /> Conheça nosso trabalho</span>
              <h2 id="gallery-video-title">
                Vídeo institucional
                <br />
                <span>Leandro Guincho</span>
              </h2>
              <p>Veja mais detalhes da frota e do atendimento.</p>
            </div>
          </div>
        </section>

        <div className="lightbox" data-lightbox hidden>
          <div className="lightbox__backdrop" data-lightbox-close />
          <div
            className="lightbox__dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Foto ampliada"
          >
            <button
              type="button"
              className="lightbox__close"
              aria-label="Fechar imagem"
              data-lightbox-close
            >
              <Icon name="close" />
            </button>
            {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> — src is set by app.js on click */}
            <img alt="Foto ampliada da frota Leandro Guincho" data-lightbox-image />
          </div>
        </div>
      </main>
      <SiteFooter config={config} />
    </>
  );
}
