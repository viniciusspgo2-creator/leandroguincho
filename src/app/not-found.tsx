import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Icon } from "@/lib/icons";
import { defaultConfig, whatsappUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A página solicitada não foi encontrada.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const config = defaultConfig;

  return (
    <>
      <SiteHeader config={config} currentPath="/404" />
      <main id="conteudo">
        <section className="not-found">
          <div className="container not-found__inner">
            <span>404</span>
            <h1>
              Essa rota não leva
              <br />
              <em>a lugar nenhum.</em>
            </h1>
            <p>A página pode ter mudado, mas o atendimento continua disponível 24 horas.</p>
            <div>
              <a className="button button--primary" href="/">
                Voltar ao início <Icon name="arrow" />
              </a>
              <a
                className="button button--ghost"
                href={whatsappUrl("Olá! Preciso de um guincho.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="message" /> Solicitar atendimento
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter config={config} />
    </>
  );
}
