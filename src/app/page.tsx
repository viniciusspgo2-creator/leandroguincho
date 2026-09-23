import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { JsonLd } from "@/components/site/json-ld";
import { Icon } from "@/lib/icons";
import { defaultConfig, homeServices, whatsappUrl } from "@/lib/config";
import {
  localBusinessSchema,
  websiteSchema,
  faqSchema,
  buildSocialMeta,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guincho e Auto Socorro 24h em Ituiutaba",
  description:
    "Guincho e auto socorro 24 horas em Ituiutaba e região. Atendimento para pane, acidente, transporte e imprevistos automotivos.",
  alternates: { canonical: "/" },
  ...buildSocialMeta({
    title: "Guincho e Auto Socorro 24h em Ituiutaba | Leandro Guincho",
    description:
      "Guincho e auto socorro 24 horas em Ituiutaba e região. Atendimento para pane, acidente, transporte e imprevistos automotivos.",
    url: "/",
    image: "/assets/images/og-image.jpg",
  }),
};

export default function HomePage() {
  const config = defaultConfig;
  const { site } = config;

  return (
    <>
      <JsonLd id="ld-business" data={localBusinessSchema(config)} />
      <JsonLd id="ld-website" data={websiteSchema(config)} />
      <JsonLd id="ld-faq" data={faqSchema(config.faq)} />

      <SiteHeader config={config} currentPath="/" />
      <main id="conteudo">
        {/* HERO */}
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero__media" aria-hidden="true">
            {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
            <img
              className="hero__poster"
              src="/assets/images/hero-poster.webp"
              alt=""
              width={1920}
              height={1080}
              fetchPriority="high"
            />
            <div
              className="hero__video"
              data-hero-video
              data-video-id={site.heroVideoId}
            />
            <div className="hero__overlay" />
            <div className="hero__vignette" />
          </div>
          <div className="hero__speed-lines" aria-hidden="true">
            <i /><i /><i />
          </div>
          <div className="container hero__content">
            <div className="hero__copy" data-reveal>
              <div className="hero__live">
                <span /> Atendimento 24 horas
              </div>
              <h1 id="hero-title">
                Seu carro parou?
                <br />
                <em>O socorro já pode estar a caminho.</em>
              </h1>
              <p>
                Guincho e auto socorro em Ituiutaba e região para pane, acidente, transporte e outros imprevistos.
              </p>
              <div className="hero__actions">
                <a
                  className="button button--primary button--large button--pulse"
                  href={whatsappUrl("Olá! Preciso de um guincho. Minha localização é: ")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="message" /> Solicitar atendimento
                </a>
                <a
                  className="button button--glass button--large"
                  href={`tel:${site.phoneLink}`}
                >
                  <Icon name="phone" /> Ligar {site.phoneDisplay}
                </a>
              </div>
              <button className="location-link" type="button" data-location-button>
                <Icon name="map" /> Enviar minha localização pelo WhatsApp <Icon name="arrow" />
              </button>
            </div>
            <aside
              className="dispatch-card"
              data-reveal
              data-reveal-delay="160"
              aria-label="Resumo do atendimento"
            >
              <div className="dispatch-card__top">
                <span className="dispatch-card__icon">
                  <Icon name="truck" />
                </span>
                <div>
                  <small>PLANTÃO ATIVO</small>
                  <strong>Auto Socorro 24h</strong>
                </div>
                <span className="dispatch-card__signal">
                  <i /><i /><i />
                </span>
              </div>
              <div className="dispatch-card__route">
                <span><i /> Você</span>
                <b />
                <span><i /> Equipe</span>
              </div>
              <ul>
                <li><Icon name="check" /> Atendimento em Ituiutaba e região</li>
                <li><Icon name="check" /> Carros, motos e utilitários</li>
                <li><Icon name="check" /> Contato direto com a equipe</li>
              </ul>
              <a
                href={whatsappUrl("Olá! Quero solicitar atendimento de guincho.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Iniciar atendimento <Icon name="arrow" />
              </a>
            </aside>
          </div>
          <div className="hero__footer">
            <div className="container hero__metrics">
              <div><strong>24h</strong><span>todos os dias</span></div>
              <div><strong>Ituiutaba</strong><span>e região</span></div>
              <div><strong>Direto</strong><span>pelo WhatsApp</span></div>
              <div><strong>Seguro</strong><span>do chamado à entrega</span></div>
            </div>
          </div>
        </section>

        {/* EMERGENCY FLOW */}
        <section className="emergency-flow" aria-labelledby="flow-call-title">
          <div className="container emergency-flow__inner" data-reveal>
            <div className="emergency-flow__badge"><Icon name="bolt" /></div>
            <div>
              <span className="eyebrow"><i /> Precisa agora?</span>
              <h2 id="flow-call-title">Não perca tempo explicando tudo por telefone.</h2>
              <p>Envie sua localização, informe o veículo e conte rapidamente o que aconteceu.</p>
            </div>
            <div className="emergency-flow__actions">
              <button className="button button--dark" type="button" data-location-button>
                <Icon name="map" /> Usar minha localização
              </button>
              <a className="button button--outline" href="#solicitar">
                Preencher chamado <Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section section--about" aria-labelledby="about-title">
          <div className="container split-layout">
            <div className="media-stack" data-reveal>
              <div className="media-stack__main">
                {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
                <img
                  src="/assets/images/about.webp"
                  alt="Caminhão do Leandro Guincho transportando um veículo"
                  width={819}
                  height={1024}
                  loading="lazy"
                />
                <span className="media-stack__scan" aria-hidden="true" />
              </div>
              <div className="media-stack__small">
                <picture>
                  <source
                    srcSet="/assets/images/frota/frota-01-480.webp"
                    media="(max-width: 720px)"
                  />
                  {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
                  <img
                    src="/assets/images/frota/frota-01-800.webp"
                    alt="Operação de transporte em plataforma"
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className="media-stack__seal">
                <strong>24H</strong>
                <span>pronto para ajudar</span>
              </div>
            </div>
            <div className="section-copy" data-reveal data-reveal-delay="120">
              <span className="eyebrow"><i /> Leandro Guincho</span>
              <h2 id="about-title">
                Rapidez para chegar.
                <br />
                <span>Cuidado para transportar.</span>
              </h2>
              <p className="lead">
                Estamos prontos para atender você com rapidez, segurança e eficiência, seja em uma pane, acidente ou outro imprevisto.
              </p>
              <p>
                O atendimento é realizado com veículos equipados para reboque seguro e suporte emergencial. A prioridade é reduzir o transtorno, orientar o cliente e conduzir o veículo com responsabilidade.
              </p>
              <div className="feature-list">
                <div>
                  <Icon name="clock" />
                  <span>
                    <strong>Plantão permanente</strong>
                    <small>Disponível 24 horas, inclusive madrugadas e feriados.</small>
                  </span>
                </div>
                <div>
                  <Icon name="shield" />
                  <span>
                    <strong>Operação responsável</strong>
                    <small>Atendimento cuidadoso desde o primeiro contato até a entrega.</small>
                  </span>
                </div>
                <div>
                  <Icon name="route" />
                  <span>
                    <strong>Atuação regional</strong>
                    <small>Ituiutaba, áreas próximas e rodovias da região.</small>
                  </span>
                </div>
              </div>
              <div className="section-copy__actions">
                <a
                  className="button button--primary"
                  href={whatsappUrl("Olá! Preciso de informações sobre o serviço de guincho.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicite agora <Icon name="arrow" />
                </a>
                <button
                  className="text-button"
                  type="button"
                  data-video-open={site.institutionalVideoId}
                >
                  <Icon name="play" /> Assistir vídeo institucional
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section section--services" id="servicos" aria-labelledby="services-title">
          <div className="services-bg" aria-hidden="true">
            <i /><i /><i />
          </div>
          <div className="container">
            <div className="section-heading section-heading--center" data-reveal>
              <span className="eyebrow eyebrow--light"><i /> Serviços profissionais</span>
              <h2 id="services-title">
                Estrutura para atender.
                <br />
                <span>Compromisso para resolver.</span>
              </h2>
              <p>Suporte 24 horas com atendimento direto, orientação clara e cuidado em cada etapa.</p>
            </div>
            <div className="services-grid">
              {homeServices.map((service, index) => (
                <article
                  key={service.title}
                  className="service-card"
                  data-tilt
                  data-reveal
                  data-reveal-delay={index * 55}
                >
                  <div className="service-card__glow" aria-hidden="true" />
                  <span className="service-card__number">0{index + 1}</span>
                  <span className="service-card__icon"><Icon name={service.icon} /></span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a
                    href={whatsappUrl(`Olá! Quero saber mais sobre: ${service.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Falar sobre este serviço <Icon name="arrow" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section section--process" id="como-funciona" aria-labelledby="process-title">
          <div className="container">
            <div className="section-heading" data-reveal>
              <span className="eyebrow"><i /> Como solicitar</span>
              <h2 id="process-title">
                Três passos.
                <br />
                <span>Sem complicação.</span>
              </h2>
              <p>O fluxo foi organizado para você pedir ajuda com rapidez, mesmo em uma situação de pressão.</p>
            </div>
            <div className="process-grid">
              <article className="process-card" data-reveal>
                <span>01</span>
                <div className="process-card__icon"><Icon name="map" /></div>
                <h3>Envie a localização</h3>
                <p>Compartilhe o ponto exato pelo WhatsApp ou use o botão de localização do site.</p>
              </article>
              <div className="process-connector" aria-hidden="true"><i /></div>
              <article className="process-card" data-reveal data-reveal-delay="100">
                <span>02</span>
                <div className="process-card__icon"><Icon name="car" /></div>
                <h3>Conte o que aconteceu</h3>
                <p>Informe o veículo, o problema e o destino desejado para agilizar o atendimento.</p>
              </article>
              <div className="process-connector" aria-hidden="true"><i /></div>
              <article className="process-card" data-reveal data-reveal-delay="200">
                <span>03</span>
                <div className="process-card__icon"><Icon name="truck" /></div>
                <h3>Confirme o chamado</h3>
                <p>Receba as orientações e confirme as condições diretamente com a equipe.</p>
              </article>
            </div>
          </div>
        </section>

        {/* SHOWCASE */}
        <section className="showcase" aria-labelledby="showcase-title">
          <div className="showcase__media">
            {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
            <img
              src="/assets/images/frota/frota-09-800.webp"
              alt="Guincho Leandro em operação"
              width={800}
              height={600}
              loading="lazy"
            />
            <div className="showcase__overlay" />
          </div>
          <div className="container showcase__inner">
            <div className="showcase__copy" data-reveal>
              <span className="eyebrow eyebrow--light"><i /> Vídeo institucional</span>
              <h2 id="showcase-title">
                Conheça a estrutura
                <br />
                <span>por trás do atendimento.</span>
              </h2>
              <p>Veja imagens da frota e de operações realizadas pelo Leandro Guincho.</p>
              <button
                className="play-button"
                type="button"
                data-video-open={site.institutionalVideoId}
              >
                <span><Icon name="play" /></span>
                <b>Assistir agora</b>
                <small>Abre em tela ampliada</small>
              </button>
            </div>
            <div className="showcase__panel" data-reveal data-reveal-delay="130">
              <div>
                <span><Icon name="clock" /></span>
                <strong>24 horas</strong>
                <small>todos os dias</small>
              </div>
              <div>
                <span><Icon name="map" /></span>
                <strong>Regional</strong>
                <small>Ituiutaba e entorno</small>
              </div>
              <div>
                <span><Icon name="shield" /></span>
                <strong>Cuidado</strong>
                <small>em cada operação</small>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY PREVIEW */}
        <section className="section section--gallery-preview" aria-labelledby="gallery-title">
          <div className="container">
            <div className="gallery-preview__top">
              <div className="section-heading" data-reveal>
                <span className="eyebrow"><i /> Galeria real</span>
                <h2 id="gallery-title">
                  Frota em ação.
                  <br />
                  <span>Trabalho de verdade.</span>
                </h2>
              </div>
              <a className="button button--outline" href="/galeria">
                Ver galeria completa <Icon name="camera" />
              </a>
            </div>
          </div>
          <div className="gallery-marquee" data-marquee>
            <div className="gallery-marquee__track">
              {[0, 1].map((round) => (
                <div
                  key={round}
                  className="gallery-marquee__group"
                  aria-hidden={round === 1 ? "true" : undefined}
                >
                  {Array.from({ length: 10 }, (_, idx) => {
                    const image = idx + 1;
                    const n = String(image).padStart(2, "0");
                    return (
                      <button
                        key={image}
                        className="gallery-tile"
                        type="button"
                        data-lightbox-src={`/assets/images/galeria/frota-${n}.webp`}
                        aria-label={`Ampliar foto ${image} da galeria`}
                        tabIndex={round === 1 ? -1 : undefined}
                      >
                        {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
                        <img
                          src={`/assets/images/frota/frota-${n}-480.webp`}
                          alt={round === 0 ? "Registro da frota Leandro Guincho em operação" : ""}
                          width={480}
                          height={360}
                          loading="lazy"
                        />
                        <span><Icon name="camera" /></span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="section section--reviews" id="avaliacoes" aria-labelledby="reviews-title">
          <div className="container reviews-layout">
            <div className="reviews-intro" data-reveal>
              <span className="eyebrow"><i /> Recomendações de clientes</span>
              <h2 id="reviews-title">
                Quem precisou,
                <br />
                <span>conta como foi.</span>
              </h2>
              <p>Relatos de clientes sobre rapidez, educação e segurança no atendimento.</p>
              <div className="reviews-stars" aria-label="Cinco estrelas">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon key={i} name="star" />
                ))}
              </div>
              <div className="reviews-controls">
                <button type="button" data-review-prev aria-label="Avaliação anterior">
                  <Icon name="chevron" />
                </button>
                <button type="button" data-review-next aria-label="Próxima avaliação">
                  <Icon name="chevron" />
                </button>
              </div>
            </div>
            <div
              className="reviews-slider"
              data-reviews-slider
              data-reveal
              data-reveal-delay="120"
            >
              {config.testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.name}
                  className={`review-card${index === 0 ? " is-active" : ""}`}
                  data-review-slide
                  aria-hidden={index === 0 ? "false" : "true"}
                >
                  <span className="review-card__quote">"</span>
                  <div className="review-card__stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Icon key={i} name="star" />
                    ))}
                  </div>
                  <blockquote>{testimonial.quote}</blockquote>
                  <footer>
                    <span>{testimonial.name.charAt(0)}</span>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <small>{testimonial.role}</small>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section--faq" id="duvidas" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div className="faq-intro" data-reveal>
              <span className="eyebrow"><i /> Dúvidas frequentes</span>
              <h2 id="faq-title">
                Rápido, claro
                <br />
                <span>e sem enrolação.</span>
              </h2>
              <p>As respostas mais importantes antes de solicitar um guincho em Ituiutaba.</p>
              <a
                className="button button--primary"
                href={whatsappUrl("Olá! Tenho uma dúvida sobre o atendimento de guincho.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Perguntar no WhatsApp <Icon name="message" />
              </a>
            </div>
            <div className="accordion" data-accordion>
              {config.faq.map((item, index) => (
                <article
                  key={item.question}
                  className={`accordion-item${index === 0 ? " is-open" : ""}`}
                  data-reveal
                  data-reveal-delay={Math.min(250, index * 45)}
                >
                  <button
                    type="button"
                    aria-expanded={index === 0 ? "true" : "false"}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.question}</strong>
                    <i><Icon name="chevron" /></i>
                  </button>
                  <div className="accordion-item__content">
                    <p>{item.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* REQUEST FORM */}
        <section className="section section--request" id="solicitar" aria-labelledby="request-title">
          <div className="container request-card" data-reveal>
            <div className="request-card__visual">
              {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
              <img
                src="/assets/images/frota/frota-08-800.webp"
                alt="Caminhão guincho transportando veículo"
                width={800}
                height={600}
                loading="lazy"
              />
              <div className="request-card__visual-overlay" />
              <div className="request-card__status">
                <i />
                <span>
                  <strong>Plantão disponível</strong>
                  <small>Atendimento 24 horas</small>
                </span>
              </div>
            </div>
            <div className="request-card__form">
              <span className="eyebrow"><i /> Solicitação rápida</span>
              <h2 id="request-title">
                Prepare sua mensagem
                <br />
                <span>em menos de um minuto.</span>
              </h2>
              <p>
                Os dados são usados apenas para montar a mensagem no seu WhatsApp. Nada é enviado ou armazenado pelo site.
              </p>
              <form data-whatsapp-form>
                <div className="form-grid">
                  <label>
                    <span>Seu nome</span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Como podemos chamar você?"
                    />
                  </label>
                  <label>
                    <span>Veículo</span>
                    <input
                      type="text"
                      name="vehicle"
                      placeholder="Ex.: carro, moto, utilitário"
                    />
                  </label>
                  <label className="form-grid__full">
                    <span>O que aconteceu?</span>
                    <select name="issue">
                      <option value="Pane mecânica ou elétrica">Pane mecânica ou elétrica</option>
                      <option value="Acidente">Acidente</option>
                      <option value="Pneu furado">Pneu furado</option>
                      <option value="Pane seca / falta de combustível">Pane seca / falta de combustível</option>
                      <option value="Transporte de veículo">Transporte de veículo</option>
                      <option value="Outro imprevisto">Outro imprevisto</option>
                    </select>
                  </label>
                  <label className="form-grid__full">
                    <span>Localização ou referência</span>
                    <input
                      type="text"
                      name="location"
                      placeholder="Rua, rodovia, bairro ou ponto de referência"
                      data-location-input
                    />
                  </label>
                </div>
                <div className="request-card__form-actions">
                  <button className="button button--ghost" type="button" data-fill-location>
                    <Icon name="map" /> Usar localização atual
                  </button>
                  <button className="button button--primary" type="submit">
                    <Icon name="message" /> Abrir atendimento no WhatsApp
                  </button>
                </div>
                <small className="form-note">
                  <Icon name="shield" /> Sua localização só é acessada após sua autorização.
                </small>
              </form>
            </div>
          </div>
        </section>

        {/* LIGHTBOX */}
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
