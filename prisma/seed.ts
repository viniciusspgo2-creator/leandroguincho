/**
 * Seed script — populates 6 strategic SEO articles for the blog.
 * Run with: `bun run db:seed` (or `bunx prisma db seed`).
 *
 * Articles are in pt-BR, focused on the guincho / auto socorro niche in
 * Ituiutaba and region. Each article targets a specific search intent:
 *   1. Guincho 24h Ituiutaba (head term)
 *   2. Auto socorro Ituiutaba (secondary head)
 *   3. Preço de guincho (commercial intent — pricing awareness)
 *   4. Como solicitar guincho (informational — process/UX)
 *   5. Quando chamar guincho (informational — qualifying scenarios)
 *   6. Transporte de veículos (commercial — long-tail)
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  coverImage: string;
  author: string;
  seoTitle: string;
  seoDescription: string;
};

const POSTS: SeedPost[] = [
  {
    slug: "guincho-24h-ituiutaba",
    title: "Guincho 24h em Ituiutaba: o que fazer quando o carro para",
    excerpt:
      "Saiba como funciona o serviço de guincho 24 horas em Ituiutaba, quando chamar e qual informação enviar para receber atendimento rápido em qualquer horário.",
    tags: "guincho, ituiutaba, 24h, auto socorro",
    coverImage: "/assets/images/frota/frota-01-800.webp",
    author: "Leandro Guincho",
    seoTitle: "Guincho 24h em Ituiutaba — Atendimento Rápido e Seguro",
    seoDescription:
      "Serviço de guincho 24 horas em Ituiutaba e região. Atendimento para pane, acidente e transporte. Veja como solicitar e o que informar.",
    content: `## Guincho 24h em Ituiutaba: o que fazer quando o carro para

Quando o carro para no meio da rua, de madrugada ou em uma rodovia, o tempo faz diferença. O serviço de **guincho 24h em Ituiutaba** existe justamente para resolver esse tipo de imprevisto sem que você precise esperar até o horário comercial.

### Quando vale a pena chamar um guincho?

- Pane mecânica ou elétrica que impede o veículo de seguir viagem;
- Acidente com bloqueio parcial ou total da via;
- Pneu furado sem estepe ou sem ferramenta;
- Pane seca (falta de combustível) em local de risco;
- Travamento de chave ou problemas no câmbio;
- Necessidade de transportar um veículo entre endereços.

### Como solicitar o guincho em Ituiutaba

1. **Envie sua localização** — use o botão "Enviar minha localização" aqui no site ou compartilhe pelo WhatsApp.
2. **Informe o veículo** — carro, moto ou utilitário.
3. **Conte o que aconteceu** — quanto mais detalhe, mais rápido o atendimento.
4. **Confirme as condições** — valor e forma de pagamento são passados antes do atendimento.

### Por que escolher um serviço 24h?

O atendimento 24 horas em Ituiutaba cobre não apenas a zona urbana, mas também rodovias da região. Em situações de risco — banco da estrada, madrugada, chuva —, contar com uma equipe preparada evita que o imprevisto vire um problema maior.

> Dica: salve o número do guincho no celular antes de precisar. Quando o problema acontecer, basta ligar.

### Atendimento direto pelo WhatsApp

Aqui no site você não preenche formulário demorado: a mensagem é montada no seu próprio WhatsApp, com sua localização e o resumo do problema. Tudo isso em menos de um minuto.

Se seu carro parou em Ituiutaba ou na região, [chame o guincho agora pelo WhatsApp](/). Plantão ativo 24 horas, todos os dias.
`,
  },
  {
    slug: "auto-socorro-ituiutaba",
    title: "Auto socorro em Ituiutaba: diferença entre guincho e socorro mecânico",
    excerpt:
      "Entenda a diferença entre auto socorro e guincho, quais situações cada um atende e como escolher o serviço certo em Ituiutaba.",
    tags: "auto socorro, ituiutaba, guincho, socorro mecânico",
    coverImage: "/assets/images/frota/frota-03-800.webp",
    author: "Leandro Guincho",
    seoTitle: "Auto Socorro em Ituiutaba — Guincho e Socorro Mecânico",
    seoDescription:
      "Diferença entre auto socorro e guincho em Ituiutaba. Saiba qual serviço contratar em pane, acidente ou transporte de veículo.",
    content: `## Auto socorro em Ituiutaba: o que é e quando contratar

Quem nunca precisou, geralmente confunde **auto socorro** com **guincho**. Os dois serviços se completam, mas têm finalidades diferentes. Entender essa diferença ajuda você a tomar a decisão certa na hora do aperto.

### Guincho: transporte do veículo

O guincho é o serviço de **remoção do veículo** de um ponto a outro. É usado quando o carro não consegue seguir viagem sozinho — seja por pane, acidente ou transporte programado.

O guincho plataforma, por exemplo, levanta o veículo sobre uma plataforma metálica, evitando desgaste de pneus e suspensão durante o trajeto.

### Auto socorro: tentativa de resolver no local

O auto socorro é a tentativa de **resolver o problema no local**, sem precisar rebocar o veículo. Inclui:

- Troca de pneu;
- Carga de bateria (pano elétrico);
- Pequenos reparos mecânicos;
- Fornecimento de combustível em pane seca.

Se o problema não for resolvido no local, o próximo passo é o guincho.

### Qual serviço você precisa?

| Situação | Serviço |
| --- | --- |
| Pneu furado sem estepe | Guincho |
| Bateria descarregada | Auto socorro |
| Pane mecânica grave | Guincho |
| Falta de combustível | Auto socorro |
| Acidente | Guincho |
| Transporte entre cidades | Guincho |

### Em Ituiutaba e região

O Leandro Guincho atua em Ituiutaba e arredores com **plataforma adequada para carros, motos e utilitários**. O atendimento é direto, sem intermediários, e as condições são passadas antes do serviço começar.

[Chame agora no WhatsApp](/) e informe o que aconteceu — a equipe avalia e direciona o suporte mais adequado.
`,
  },
  {
    slug: "preco-de-guincho-ituiutaba",
    title: "Preço de guincho em Ituiutaba: o que influence o valor",
    excerpt:
      "Saiba quais fatores influenciam o preço de um guincho em Ituiutaba e por que é importante combiná-lo antes do atendimento.",
    tags: "preço de guincho, ituiutaba, quanto custa, guincho",
    coverImage: "/assets/images/frota/frota-05-800.webp",
    author: "Leandro Guincho",
    seoTitle: "Preço de Guincho em Ituiutaba — Como Funciona a Cobrança",
    seoDescription:
      "O que influencia o preço de um guincho em Ituiutaba. Saiba quais informações passar para receber um valor justo antes do atendimento.",
    content: `## Preço de guincho em Ituiutaba: o que influence o valor

A pergunta "quanto custa um guincho?" é a primeira que vem à cabeça. E faz sentido — ninguém quer surpresa na hora de pagar por um serviço de emergência.

### Fatores que influenciam o preço

- **Distância** entre o local da ocorrência e o destino;
- **Tipo de veículo** (carro de passeio, moto, utilitário, van);
- **Horário** — atendimento noturno, feriados e fins de semana;
- **Condições da via** — estrada de terra, rodovia, zona urbana;
- **Dificuldade de acesso** ao veículo (preso em vala, garagem apertada etc.);
- **Necessidade de equipamento extra** (cinta, roda livre, segunda plataforma).

### Por que combinamos o valor antes?

Trabalhar com **preço transparente** significa que você sabe o valor antes do serviço começar. Isso evita:

- Cobrança de taxas não informadas;
- Discussão na hora da entrega;
- Sensação de ter sido aproveitado em momento de vulnerabilidade.

> Quem liga em três serviços e só pergunta o preço está sendo injusto consigo mesmo. O mais barato pode custar caro se faltar equipamento ou experiência.

### Como pedir um orçamento

1. Envie sua **localização** (link do mapa);
2. Informe o **tipo de veículo**;
3. Conte o **que aconteceu**;
4. Diga para onde o veículo precisa ir.

Com essas informações, é possível passar uma condição clara antes do guincho sair.

### Cuidado com "guincho barato"

Serviço muito abaixo do mercado costuma significar:

- Veículo sem manutenção;
- Motorista sem experiência;
- Sem equipamentos de segurança;
- Sem cobertura em caso de avaria.

Em Ituiutaba, o Leandro Guincho trabalha com **plataforma própria, equipe treinada e condições combinadas antes do atendimento**. [Fale agora no WhatsApp](/) e receba uma proposta transparente.
`,
  },
  {
    slug: "como-solicitar-guincho-pelo-whatsapp",
    title: "Como solicitar guincho pelo WhatsApp: passo a passo",
    excerpt:
      "Veja o passo a passo de como solicitar um guincho pelo WhatsApp em Ituiutaba, com modelo de mensagem pronta e dicas para agilizar.",
    tags: "whatsapp, guincho, solicitar, passo a passo",
    coverImage: "/assets/images/frota/frota-07-800.webp",
    author: "Leandro Guincho",
    seoTitle: "Como Solicitar Guincho pelo WhatsApp — Passo a Passo",
    seoDescription:
      "Passo a passo para solicitar guincho pelo WhatsApp em Ituiutaba. Modelo de mensagem pronta e dicas para acelerar o atendimento.",
    content: `## Como solicitar guincho pelo WhatsApp: passo a passo

O WhatsApp virou a forma mais rápida de pedir um guincho. Em vez de ficar explicando por telefone, você manda a localização e o resumo do problema por mensagem — e a equipe já sabe o que fazer.

Aqui no site do Leandro Guincho esse fluxo é ainda mais rápido: o **formulário de solicitação** monta a mensagem pronta e abre o WhatsApp direto no chat certo.

### Passo 1 — Abra o site e clique em "Solicitar atendimento"

O botão rosa no topo da página já abre o WhatsApp com uma mensagem padrão.

### Passo 2 — Envie sua localização

- Use o botão **"Enviar minha localização"** no site (autoriza o navegador a pegar seu GPS);
- Ou compartilhe a localização direto pelo WhatsApp (clip → localização → enviar).

### Passo 3 — Informe o veículo

- **Tipo**: carro, moto, utilitário;
- **Placa e modelo**: ajuda a equipe a saber o tamanho do veículo;
- **Condição**: roda livre? travado? sem condição de mover?

### Passo 4 — Conte o que aconteceu

Exemplos:

- "Pane mecânica, o carro apagou no semáforo";
- "Bati de frente, o radiador vazou";
- "Pneu furado e o estepe está vencido";
- "Acabou a gasolina na BR-365, km 200".

### Passo 5 — Combine as condições

Antes do guincho sair, **confirme o valor** e a forma de pagamento. Serviço sério não cobra taxa escondida.

### Modelo de mensagem pronta

> Olá! Preciso de atendimento de guincho.
> Nome: (seu nome)
> Veículo: (modelo e placa)
> Situação: (pane, acidente, pneu furado...)
> Localização: (link do Google Maps)

Aqui no site, esse texto é montado **automaticamente** — basta preencher os campos e clicar em "Abrir atendimento no WhatsApp".

[ Solicite agora pelo site](/) e economize tempo.
`,
  },
  {
    slug: "quando-chamar-guincho",
    title: "Quando chamar guincho: 7 situações que você não deve ignorar",
    excerpt:
      " Nem todo imprevisto exige guincho. Veja as 7 situações em que chamar um guincho é a decisão mais segura para você e para o veículo.",
    tags: "quando chamar guincho, segurança, guincho, dicas",
    coverImage: "/assets/images/frota/frota-09-800.webp",
    author: "Leandro Guincho",
    seoTitle: "Quando Chamar Guincho — 7 Situações de Risco no Trânsito",
    seoDescription:
      "7 situações em que chamar guincho é a decisão mais segura. Identifique quando é hora de parar e pedir ajuda profissional.",
    content: `## Quando chamar guincho: 7 situações que você não deve ignorar

Nem todo imprevisto exige guincho. Pneu furado com estepe em dia, por exemplo, pode ser resolvido no local. Mas há situações em que **insistir em seguir viagem** é colocar sua vida e a de outros motoristas em risco.

### 1. Pane mecânica que impede o movimento

Motor apagado, câmbio travado, embreagem que não engata. Se o carro não se move, **não force**.

### 2. Acidente com danos visíveis

Mesmo que o carro ainda ligue, **funilaria amassada, radiador vazando ou suspensão torta** podem comprometer a dirigibilidade. Remova com guincho.

### 3. Rodovia à noite

Atronar à noite em rodovia sem acostamento iluminado é uma das situações mais perigosas. **Guincho imediato**.

### 4. Pane seca em local de risco

Parar no meio da pista por falta de combustível pode virar acidente. Se estiver em local movimentado, chame guincho — não tente atravessar a pé até o posto.

### 5. Veículo em local de difícil acesso

Vala, garagem subterrânea com pé-direito baixo, estrada de terra enlameada. Sem equipamento adequado, a tentativa de sair sozinho piora a situação.

### 6. Travamento de chave

Chave quebrada dentro da fechadura ou sistema imobilizador travado. Forçar pode danificar permanentemente o conjunto.

### 7. Transporte de veículo entre cidades

Comprar carro em outra cidade, levar para oficina especializada, mudança. Plataforma é mais seguro do que rebocar com corda.

### Sinais de que NÃO é hora de guincho

- Pneu furado com estepe em bom estado;
- Bateria fraca que dá partida com tranco (em carro manual);
- Falta de combustível com posto a 100 metros e acostamento largo.

> Em dúvida, **ligue e pergunte**. Uma conversa de 30 segundos evita uma decisão errada que custa caro.

### Em Ituiutaba e região

O Leandro Guincho atende 24 horas em **Ituiutaba, rodovias da região e cidades próximas**. [Chame no WhatsApp](/) com sua localização que a equipe avalia o caso na hora.
`,
  },
  {
    slug: "transporte-de-veiculo-ituiutaba",
    title: "Transporte de veículo em Ituiutaba: plataforma ou reboque?",
    excerpt:
      "Precisa transportar um veículo em Ituiutaba? Entenda a diferença entre plataforma e reboque e por que plataforma é mais seguro para o seu carro.",
    tags: "transporte de veículo, plataforma, reboque, ituiutaba",
    coverImage: "/assets/images/frota/frota-10-800.webp",
    author: "Leandro Guincho",
    seoTitle: "Transporte de Veículo em Ituiutaba — Plataforma é Mais Seguro",
    seoDescription:
      "Transporte de veículo em Ituiutaba com plataforma. Saiba por que a plataforma protege mais seu carro do que o reboque por corda.",
    content: `## Transporte de veículo em Ituiutaba: plataforma ou reboque?

Quando você precisa **transportar um veículo** de um ponto a outro em Ituiutaba — seja por compra, mudança, oficina ou leilão —, a primeira decisão é o método: **plataforma ou reboque**?

### Plataforma: o veículo viaja "em cima"

O guincho plataforma levanta o veículo e o coloca sobre uma superfície metálica plana. As quatro rodas ficam suspensas.

**Vantagens:**

- **Desgaste zero** dos pneus e suspensão durante o trajeto;
- **Sem risco de câmbio** — o veículo não precisa estar em ponto morto;
- **Mais seguro para carros baixos** (esportivos, rebaixados);
- **Ideal para veículos com defeito no câmbio ou nas rodas**;
- **Adequado para veículos 0km e leiloados**.

### Reboque: o veículo é puxado

No reboque, uma barra ou corda conecta dois veículos e o seu é puxado com as rodas no chão.

**Problemas comuns:**

- Desgaste de pneus;
- Risco de dano no câmbio automático (muitos carros não podem ser rebocados);
- Difícil de manobrar em descidas e curvas fechadas;
- Exige um segundo motorista no veículo rebocado.

### Quando a plataforma é a escolha certa

- **Carros automáticos**: a maioria não tolera reboque acima de 30 km/h ou 30 km de distância;
- **Carros rebaixados**: o para-choque dianteiro pode rasgar no reboque por barra;
- **Veículos com defeito na roda ou suspensão**: não dá para rebocar;
- **Veículos 0km**: a plataforma evita qualquer quilometragem extra;
- **Motos e quadriciclos**: a plataforma é o único método seguro.

### Em Ituiutaba e região

O Leandro Guincho opera com **caminhão plataforma** para transporte de veículos em Ituiutaba, cidades próximas e rodovias da região. Atende carros de passeio, motos e utilitários.

> Antes de contratar, pergunte: **é plataforma ou reboque?** A diferença no preço costuma ser pequena, mas na segurança do veículo é enorme.

### Como solicitar transporte programado

Nem todo transporte é emergência. Para **transporte programado** (compra de veículo, mudança, entrega em oficina), agende com antecedência:

1. Informe origem e destino;
2. Diga o tipo de veículo;
3. Combine data e horário;
4. Receba a condição antes do dia.

[Fale com o Leandro Guincho no WhatsApp](/) e agende seu transporte de veículo com segurança.
`,
  },
];

async function main() {
  console.log("Seeding 6 strategic SEO articles...");

  for (const post of POSTS) {
    const existing = await db.blogPost.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log(`- ${post.slug}: already exists, skipping.`);
      continue;
    }

    await db.blogPost.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        tags: post.tags,
        coverImage: post.coverImage,
        author: post.author,
        published: true,
        publishedAt: new Date(),
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        ogImage: post.coverImage,
      },
    });
    console.log(`- ${post.slug}: created.`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
