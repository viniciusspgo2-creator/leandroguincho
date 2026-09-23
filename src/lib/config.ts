/**
 * Site configuration — port of original `config/site.json`.
 * Values here are the source-of-truth defaults used by the public site.
 * Admin-editable overrides live in the SiteSetting table (see `lib/settings.ts`).
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  site: {
    name: string;
    tagline: string;
    description: string;
    url: string;
    phoneDisplay: string;
    phoneLink: string;
    whatsapp: string;
    serviceArea: string;
    instagram: string;
    heroVideoId: string;
    institutionalVideoId: string;
  };
  navigation: NavItem[];
  testimonials: Testimonial[];
  faq: FaqItem[];
};

/** Default static config (preserved from the original PHP site). */
export const defaultConfig: SiteConfig = {
  site: {
    name: "Leandro Guincho",
    tagline: "Auto Socorro 24h em Ituiutaba",
    description:
      "Serviço de guincho e auto socorro 24 horas em Ituiutaba e região, com atendimento rápido, seguro e personalizado.",
    url: "https://guinchoituiutaba.com.br",
    phoneDisplay: "(34) 9 9686-2805",
    phoneLink: "+5534996862805",
    whatsapp: "5534996862805",
    serviceArea: "Ituiutaba e região",
    instagram: "",
    heroVideoId: "D1wkrCPUGSM",
    institutionalVideoId: "9s0o_xKceYY",
  },
  navigation: [
    { label: "Início", href: "/#inicio" },
    { label: "Serviços", href: "/#servicos" },
    { label: "Como funciona", href: "/#como-funciona" },
    { label: "Galeria", href: "/galeria" },
    { label: "Blog", href: "/blog" },
    { label: "Avaliações", href: "/#avaliacoes" },
    { label: "Dúvidas", href: "/#duvidas" },
  ],
  testimonials: [
    {
      quote:
        "Rapaz, eu tava no meio da estrada com o carro apagado e já era quase meia-noite. Liguei pra eles e em menos de meia hora o guincho chegou. Atendimento top demais, me senti seguro o tempo todo.",
      name: "Carlos Henrique",
      role: "Motorista de aplicativo",
    },
    {
      quote:
        "Meu carro deu pau bem no centro de Ituiutaba, e eu tava com meu filho pequeno no banco de trás. Eles chegaram rápido, foram super educados e ainda me ajudaram a achar uma oficina de confiança. Recomendo sem pensar duas vezes.",
      name: "Rogério Silva",
      role: "Vendedor autônomo",
    },
  ],
  faq: [
    {
      question: "Em quais situações posso chamar o guincho?",
      answer:
        "Você pode acionar o serviço quando seu veículo não puder seguir viagem com segurança, como em pane mecânica ou elétrica, acidente, falta de combustível, pneu furado, travamento de chave ou outro imprevisto. O atendimento contempla carros de passeio, motos e utilitários.",
    },
    {
      question: "O serviço funciona de madrugada, domingo e feriado?",
      answer:
        "Sim. O atendimento funciona 24 horas por dia, 7 dias por semana, inclusive em madrugadas e feriados.",
    },
    {
      question: "Quanto tempo leva para o guincho chegar?",
      answer:
        "O tempo varia conforme a localização, o trânsito, as condições da via e a disponibilidade no momento. Ao chamar pelo WhatsApp, envie sua localização para receber uma orientação mais precisa.",
    },
    {
      question: "Como funciona o pagamento?",
      answer:
        "O valor e as opções de pagamento são informados com transparência antes do atendimento. Confirme as condições diretamente com a equipe no momento da solicitação.",
    },
    {
      question: "O transporte é seguro para o meu veículo?",
      answer:
        "A remoção e o deslocamento são realizados com cuidado técnico e equipamentos adequados ao tipo de veículo, priorizando a segurança durante toda a operação.",
    },
    {
      question: "Como enviar minha localização?",
      answer:
        "Use o botão “Enviar minha localização” no site. Com sua permissão, o navegador cria um link do mapa e prepara uma mensagem para o WhatsApp. Você também pode compartilhar a localização diretamente pelo aplicativo.",
    },
  ],
};

/**
 * Build a WhatsApp deep-link URL with a pre-filled message.
 * Port of original PHP `whatsapp_url()`.
 */
export function whatsappUrl(message: string, whatsappNumber = defaultConfig.site.whatsapp): string {
  return `https://wa.me/${encodeURIComponent(whatsappNumber)}?text=${encodeURIComponent(message)}`;
}

/** Home services list — preserved verbatim from original `index.php`. */
export const homeServices = [
  {
    icon: "bolt",
    title: "Resposta rápida",
    text: "Atendimento 24 horas para receber sua chamada, entender a situação e organizar o suporte com agilidade.",
  },
  {
    icon: "user",
    title: "Equipe experiente",
    text: "Atendimento cuidadoso e preparado para diferentes situações de emergência automotiva.",
  },
  {
    icon: "shield",
    title: "Segurança na operação",
    text: "Remoção e transporte realizados com atenção técnica e equipamentos adequados ao veículo.",
  },
  {
    icon: "tag",
    title: "Preço transparente",
    text: "Condições informadas antes do atendimento, com clareza para você decidir sem surpresas.",
  },
  {
    icon: "tools",
    title: "Atendimento personalizado",
    text: "Cada ocorrência é avaliada individualmente para direcionar o suporte mais adequado.",
  },
  {
    icon: "route",
    title: "Cobertura regional",
    text: "Atuação em Ituiutaba, áreas próximas, zona urbana e rodovias da região.",
  },
] as const;
