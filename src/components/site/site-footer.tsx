import Link from "next/link";
import { Icon } from "@/lib/icons";
import { whatsappUrl, type SiteConfig } from "@/lib/config";

/**
 * Site footer — port of `includes/footer.php`.
 * Renders final CTA, footer grid, floating WhatsApp/location buttons,
 * toast container, video modal container.
 * The original `app.js` reads `data-lightbox`, `data-video-modal`, etc.
 */
export function SiteFooter({ config }: { config: SiteConfig }) {
  const { site } = config;
  const year = new Date().getFullYear();

  return (
    <>
      <section className="final-cta" aria-labelledby="final-cta-title">
        <div className="final-cta__road" aria-hidden="true" />
        <div className="container final-cta__inner">
          <div>
            <span className="eyebrow eyebrow--light">
              <i /> Atendimento emergencial
            </span>
            <h2 id="final-cta-title">
              Seu veículo parou?
              <br />
              <span>Não fique na estrada.</span>
            </h2>
            <p>Fale com a equipe, informe o que aconteceu e envie sua localização pelo WhatsApp.</p>
          </div>
          <div className="final-cta__actions">
            <Link
              className="button button--white button--large"
              href={whatsappUrl("Olá! Meu veículo parou e preciso de atendimento.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="message" /> Chamar no WhatsApp
            </Link>
            <button className="button button--dark button--large" type="button" data-location-button>
              <Icon name="map" /> Enviar minha localização
            </button>
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="footer-brand">
            {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
            <img
              src="/assets/images/brand/logo-header.png"
              width={164}
              height={164}
              alt={site.name}
            />
            <div>
              <strong>Leandro Guincho</strong>
              <p>Auto socorro 24 horas em Ituiutaba e região.</p>
            </div>
          </div>
          <div className="footer-links">
            <h3>Navegação</h3>
            <Link href="/#servicos">Serviços</Link>
            <Link href="/#como-funciona">Como funciona</Link>
            <Link href="/galeria">Galeria</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#duvidas">Dúvidas frequentes</Link>
          </div>
          <div className="footer-contact">
            <h3>Atendimento</h3>
            <a href={`tel:${site.phoneLink}`}>
              <Icon name="phone" /> {site.phoneDisplay}
            </a>
            <Link
              href={whatsappUrl("Olá! Preciso de atendimento.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="message" /> WhatsApp 24h
            </Link>
            <span>
              <Icon name="map" /> {site.serviceArea}
            </span>
          </div>
          <div className="footer-emergency">
            <span className="status-pill">
              <i /> Disponível 24h
            </span>
            <p>Pane, acidente ou imprevisto? Entre em contato com a equipe.</p>
            <a href={`tel:${site.phoneLink}`}>
              Ligar agora <Icon name="arrow" />
            </a>
          </div>
        </div>
        <div className="container site-footer__bottom">
          <p>© {year} Leandro Guincho. Todos os direitos reservados.</p>
          <p>Site otimizado para atendimento rápido em dispositivos móveis.</p>
        </div>
      </footer>
      <div className="floating-actions" aria-label="Atalhos de atendimento">
        <button
          className="floating-location"
          type="button"
          data-location-button
          aria-label="Enviar localização pelo WhatsApp"
        >
          <Icon name="map" />
          <span>Localização</span>
        </button>
        <Link
          className="floating-whatsapp"
          href={whatsappUrl("Olá! Preciso de um guincho em Ituiutaba.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Solicitar atendimento pelo WhatsApp"
        >
          <Icon name="message" />
          <span>WhatsApp</span>
        </Link>
      </div>
      <div className="toast" role="status" aria-live="polite" data-toast />
      <div className="video-modal" data-video-modal hidden>
        <div className="video-modal__backdrop" data-video-close />
        <div
          className="video-modal__dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo institucional"
        >
          <button
            type="button"
            className="video-modal__close"
            aria-label="Fechar vídeo"
            data-video-close
          >
            <Icon name="close" />
          </button>
          <div className="video-modal__frame" data-video-frame />
        </div>
      </div>
    </>
  );
}
