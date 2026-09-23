import Link from "next/link";
import { Icon } from "@/lib/icons";
import { whatsappUrl, type NavItem, type SiteConfig } from "@/lib/config";

type HeaderProps = {
  config: SiteConfig;
  currentPath: string;
};

/**
 * Site header — port of `includes/header.php`.
 * Same HTML structure/classes so the original CSS keeps working.
 * `app.js` reads `data-header`, `data-menu-toggle`, `data-mobile-menu`.
 */
export function SiteHeader({ config, currentPath }: HeaderProps) {
  const { site } = config;

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="site-noise" aria-hidden="true" />
      <div className="emergency-bar">
        <div className="container emergency-bar__inner">
          <span className="emergency-bar__status">
            <i /> Plantão 24h ativo
          </span>
          <span className="emergency-bar__copy">
            Auto socorro em {site.serviceArea}
          </span>
          <a href={`tel:${site.phoneLink}`} aria-label={`Ligar para ${site.phoneDisplay}`}>
            <Icon name="phone" /> {site.phoneDisplay}
          </a>
        </div>
      </div>
      <header className="site-header" data-header>
        <div className="container site-header__inner">
          <Link className="brand" href="/" aria-label={`Página inicial do ${site.name}`}>
            {/* biome-ignore lint/performance/noImgElement: original PHP uses <img> */}
            <img
              src="/assets/images/brand/logo-header.png"
              width={148}
              height={148}
              alt={site.name}
            />
            <span>
              <strong>Leandro</strong>
              <small>Guincho 24h</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {config.navigation.map((item: NavItem) => {
              const isActive =
                (currentPath === "/galeria" && item.href === "/galeria") ||
                (currentPath === "/" && item.href === "/#inicio") ||
                (currentPath.startsWith("/blog") && item.href === "/blog");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive ? "is-active" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="site-header__actions">
            <Link
              className="button button--ghost button--compact header-call"
              href={`tel:${site.phoneLink}`}
            >
              <Icon name="phone" />
              <span>Ligar agora</span>
            </Link>
            <Link
              className="button button--primary button--compact"
              href={whatsappUrl("Olá! Preciso de um guincho em Ituiutaba.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="message" />
              <span>Solicitar guincho</span>
            </Link>
            <button
              className="menu-toggle"
              type="button"
              aria-label="Abrir menu"
              aria-expanded="false"
              data-menu-toggle
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      <div className="mobile-menu" data-mobile-menu hidden>
        <div className="mobile-menu__glow" aria-hidden="true" />
        <nav aria-label="Navegação móvel">
          {config.navigation.map((item: NavItem) => (
            <Link key={item.href} href={item.href}>
              <span>{item.label}</span>
              <Icon name="chevron" />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__actions">
          <Link
            className="button button--primary"
            href={whatsappUrl("Olá! Preciso de um guincho em Ituiutaba.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="message" /> Solicitar no WhatsApp
          </Link>
          <Link className="button button--ghost" href={`tel:${site.phoneLink}`}>
            <Icon name="phone" /> {site.phoneDisplay}
          </Link>
        </div>
      </div>
    </>
  );
}
