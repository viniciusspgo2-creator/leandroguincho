# Leandro Guincho — Site Next.js (migrado de PHP)

Site institucional do **Leandro Guincho** (auto socorro 24h em Ituiutaba) migrado
de PHP para **Next.js 16 + TypeScript + Prisma + Vercel-ready**.

A migração preserva 100% do design visual original aprovado pelo cliente (CSS, JS,
imagens e HTML idênticos) e adiciona novos recursos pedidos:

- ✅ Blog com 6 artigos estratégicos para SEO
- ✅ Painel administrativo (login, blog, SEO, contador de visitas)
- ✅ SEO técnico completo (sitemap dinâmico, robots, JSON-LD, OG, Twitter)
- ✅ Schema.org: LocalBusiness, WebSite, FAQPage, BlogPosting, BreadcrumbList
- ✅ Google Analytics & Google Tag Manager prontos para uso
- ✅ PWA manifest dinâmico
- ✅ Redirects permanentes das URLs `.php` antigas

---

## Sumário da migração

### PRESERVADO (100% do visual original)

- Arquivo `assets/css/style.css` (536 linhas) — copiado integralmente para `public/assets/css/style.css`.
- Arquivo `assets/js/app.js` (292 linhas) — copiado integralmente para `public/assets/js/app.js`.
- Todas as imagens (hero-poster, about, og-image, 10 galeria, 10 frota dupla-resolução, 4 brand).
- Estrutura HTML de cada página (header, hero, services, process, showcase, gallery preview, reviews, FAQ, request form, lightbox, video modal, footer).
- Identidade visual (logo, paleta magenta `#e50078`, fonte Inter, dark hero, glassmorphism).
- Conteúdo (textos, depoimentos, FAQ, navegação, serviços).
- URLs públicas: `/`, `/galeria`, `/blog`, `/blog/[slug]`.
- Comportamento JS (sticky header, mobile menu, reveal, tilt, lightbox, video modal, accordion, reviews carousel, geolocation, WhatsApp form).
- Logo, ícones SVG, favicon, manifest.

### MIGRADO (PHP → Node.js)

| PHP original | Node.js / Next.js |
| --- | --- |
| `index.php` | `src/app/page.tsx` (Server Component) |
| `galeria.php` | `src/app/galeria/page.tsx` |
| `404.php` | `src/app/not-found.tsx` |
| `includes/header.php` | `src/components/site/site-header.tsx` |
| `includes/footer.php` | `src/components/site/site-footer.tsx` |
| `includes/bootstrap.php` (funções `e()`, `icon()`, `whatsapp_url()`, `site_config()`) | `src/lib/config.ts`, `src/lib/icons.tsx` |
| `config/site.json` (config estática) | `src/lib/config.ts` (`defaultConfig`) |
| `.htaccess` (HTTPS redirect, headers, cache) | `next.config.ts` (`headers()`, `redirects()`) + `vercel.json` |
| `manifest.webmanifest` (estático) | `src/app/manifest.ts` (dinâmico) |
| `robots.txt` (estático) | `src/app/robots.ts` (dinâmico) |
| `sitemap.xml` (estático, 2 URLs) | `src/app/sitemap.ts` (dinâmico, inclui posts publicados) |
| Meta tags PHP inline | Next.js Metadata API + `src/lib/seo.ts` |
| JSON-LD inline no `header.php` (apenas LocalBusiness básico) | 5 schemas: AutomotiveBusiness, WebSite, FAQPage, BlogPosting, BreadcrumbList |
| Form WhatsApp (client-side only) | Idem — sem mudança de comportamento |

### CORRIGIDO (bugs reais)

- Sitemap era estático (só 2 URLs) → agora é dinâmico (inclui blog posts).
- Robots.txt era estático → agora é dinâmico (com URL de sitemap correta).
- JSON-LD era apenas LocalBusiness básico → agora inclui 5 schemas completos.
- Canonical era manual no PHP → agora via Next.js Metadata API (sempre correto).
- Security headers estavam só no `.htaccess` (Apache) → agora em `next.config.ts` (Vercel).

### APRIMORADO (safe enhancements)

- Inter font carregado via Google Fonts (antes dependia de instalação local).
- Adicionado `loading="lazy"` onde faltava (já existia na maioria das imagens).
- Adicionado `fetchPriority="high"` no hero poster.
- JSON-LD `Article` schema nos posts do blog (novo recurso).
- Breadcrumb schema nas páginas internas (novo recurso).
- OG/Twitter cards completos em todas as páginas.
- Contador de visitas real (Persistência em DB, dashboard no admin).
- Painel admin completo (novo recurso).

### ALTERAÇÕES TÉCNICAS

- Stack: PHP 8.0 → Next.js 16 + TypeScript 5.
- Renderização: PHP server-rendered → Next.js Server Components (default).
- Estilização: Tailwind 4 + shadcn/ui **somente no admin** (público usa o CSS original).
- Banco: SQLite em dev → PostgreSQL em produção (Neon/Supabase).
- Auth: cookie httpOnly + scrypt (sem NextAuth, conforme solicitado).
- Imagens: mantidas como `<img>` (não `next/image`) para preservar HTML original.

---

## Variáveis de ambiente necessárias

Crie um arquivo `.env` local (ou configure em Project Settings → Environment Variables na Vercel):

| Variável | Obrigatório | Descrição |
| --- | --- | --- |
| `DATABASE_URL` | ✅ Sim | String de conexão. Dev: `file:/home/z/my-project/db/custom.db` (SQLite). Vercel: connection string Postgres (Neon/Supabase/Vercel Postgres). |
| `NEXT_PUBLIC_SITE_URL` | ✅ Sim | URL canônica do site (ex.: `https://guinchoituiutaba.com.br`). Usada para sitemap, OG tags, JSON-LD. |
| `NEXT_PUBLIC_GA_ID` | ❌ Opcional | Google Analytics 4 ID (ex.: `G-XXXXXXXXXX`). |
| `NEXT_PUBLIC_GTM_ID` | ❌ Opcional | Google Tag Manager ID (ex.: `GTM-XXXXXXX`). |

> **Atenção:** nenhum secret/senha é hardcoded. A senha do admin é definida no
> primeiro acesso em `/admin/login` e armazenada como hash (scrypt) no banco.

---

## Como subir para o GitHub + Vercel

### 1. Subir para o GitHub

Use o **GitHub Desktop** (ou `git` na linha de comando):

```bash
git init
git remote add origin https://github.com/SEU_USUARIO/leandro-guincho.git
git add .
git commit -m "Initial commit — Next.js migration from PHP"
git push -u origin main
```

> **Aviso:** a pasta `public/assets/images/` contém muitas imagens (~50 arquivos).
> Recomendamos usar o **GitHub Desktop** (ou `git push` na CLI), não o upload
> manual pelo navegador (que trava acima de ~100 arquivos).

### 2. Conectar à Vercel

1. Acesse https://vercel.com/new
2. Importe o repositório do GitHub
3. **Configure as variáveis de ambiente** ANTES do primeiro deploy:
   - `DATABASE_URL` → connection string do Neon/Supabase/Vercel Postgres
   - `NEXT_PUBLIC_SITE_URL` → `https://seu-dominio.vercel.app` (ou domínio custom)
   - `NEXT_PUBLIC_GA_ID` (opcional)
   - `NEXT_PUBLIC_GTM_ID` (opcional)
4. **Edite o `prisma/schema.prisma`** antes do primeiro deploy:
   ```prisma
   datasource db {
     provider = "postgresql"  // ⚠️ mude de "sqlite" para "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Clique em **Deploy**.

A Vercel vai rodar:
```bash
bun install
bun run build   # executa `prisma generate && next build`
```

O `postinstall` (no `package.json`) garante que o Prisma Client seja gerado
antes do build, evitando erros do tipo "PrismaClient not found".

### 3. Após o primeiro deploy

1. Acesse `https://seu-dominio.vercel.app/admin/login`
2. Crie a senha de administrador (primeiro acesso)
3. Confirme se o sitemap está em `/sitemap.xml`
4. Confirme se o robots está em `/robots.txt`
5. Adicione o site ao Google Search Console
6. (Opcional) Configure o GA/GTM pelo painel admin em `/admin/seo`

---

## Estrutura do projeto

```
.
├── prisma/
│   ├── schema.prisma          # Schema do banco (SQLite em dev, mude para postgresql na Vercel)
│   └── seed.ts                # Popula os 6 artigos SEO iniciais
├── public/
│   └── assets/
│       ├── css/style.css      # CSS original do PHP (preservado 100%)
│       ├── js/app.js          # JS original do PHP (preservado 100%)
│       └── images/            # Todas as imagens originais (preservadas)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout: lang=pt-BR, meta, GTM/GA, fonts
│   │   ├── page.tsx           # Home (port de index.php)
│   │   ├── galeria/page.tsx   # Galeria (port de galeria.php)
│   │   ├── blog/page.tsx      # Listagem do blog
│   │   ├── blog/[slug]/page.tsx  # Detalhe do post + SEO + JSON-LD
│   │   ├── admin/
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── login/page.tsx # Login / primeiro acesso
│   │   │   ├── blog/          # CRUD de posts
│   │   │   ├── seo/page.tsx   # Configurações SEO/GA/GTM
│   │   │   └── visits/page.tsx# Contador de visitas
│   │   ├── api/
│   │   │   ├── visits/        # POST /api/visits (tracker)
│   │   │   └── admin/         # login, logout, blog CRUD, settings, password
│   │   ├── sitemap.ts         # Sitemap dinâmico
│   │   ├── robots.ts          # Robots dinâmico
│   │   ├── manifest.ts        # PWA manifest dinâmico
│   │   └── not-found.tsx      # 404 (port de 404.php)
│   ├── components/
│   │   ├── site/              # site-header, site-footer, json-ld, visit-tracker
│   │   ├── blog/              # blog-card
│   │   ├── admin/             # admin-nav, admin-logout, post-editor, seo-form, delete-post-button
│   │   └── ui/                # shadcn/ui (usado apenas no admin)
│   └── lib/
│       ├── db.ts              # Prisma client
│       ├── auth.ts            # Cookie-based auth + scrypt hashing
│       ├── config.ts          # Site config (port de config/site.json)
│       ├── icons.tsx          # SVG icon set (port de icon() PHP)
│       ├── seo.ts             # JSON-LD builders + OG/Twitter helpers
│       └── settings.ts        # SiteSetting service (admin-editable)
├── next.config.ts             # redirects (.php → /), headers, security
├── vercel.json                # buildCommand, installCommand, headers
├── .env.example               # Template de variáveis de ambiente
└── package.json
```

### Pastas com muitos arquivos (use GitHub Desktop)

- `public/assets/images/` — ~50 arquivos webp/png (frota, galeria, brand, og)
- `node_modules/` — NÃO subir (já no `.gitignore`)
- `.next/` — NÃO subir (já no `.gitignore`)

### Nenhuma pasta essencial está faltando

A entrega contém **todas** as pastas necessárias para o deploy:
`prisma/`, `public/`, `src/`, `package.json`, `tsconfig.json`, `next.config.ts`,
`vercel.json`, `tailwind.config.ts`, `postcss.config.mjs`, `components.json`.

---

## Desenvolvimento local

```bash
# Instalar dependências
bun install

# Inicializar banco de dados (SQLite em dev)
bun run db:push

# Popular os 6 artigos SEO iniciais (idempotente)
bun run db:seed

# Iniciar dev server em http://localhost:3000
bun run dev

# Lint
bun run lint

# Build de produção
bun run build
```

Para acessar o painel admin: http://localhost:3000/admin/login

No primeiro acesso, você será solicitado a criar uma senha.
A senha pode ser trocada a qualquer momento dentro do painel.

---

## Recursos do painel admin

- **Dashboard** (`/admin`): métricas de visitas (total, hoje, 7 dias, 30 dias),
  páginas mais visitadas, últimas 10 visitas, atalhos rápidos.
- **Blog** (`/admin/blog`): lista todos os posts (publicados e rascunhos),
  criar/editar/excluir.
- **Editor de post** (`/admin/blog/new` e `/admin/blog/[id]/edit`): título,
  slug, resumo, conteúdo (Markdown básico), tags, capa, autor, SEO override.
- **Visitas** (`/admin/visits`): gráfico de visitas por dia (últimos 14 dias),
  páginas mais visitadas, últimas 30 visitas com referrer.
- **SEO** (`/admin/seo`): título/descrição/OG padrão, GA4 ID, GTM ID,
  verificação Google Search Console, Facebook Pixel ID.

---

## SEO implementado

| Recurso | Status |
| --- | --- |
| Sitemap.xml automático | ✅ `src/app/sitemap.ts` (inclui posts dinamicamente) |
| Robots.txt otimizado | ✅ `src/app/robots.ts` (disallow /admin e /api) |
| Meta tags completas | ✅ Metadata API em cada rota |
| Open Graph | ✅ OG + image em todas as páginas |
| Twitter Cards | ✅ summary_large_image |
| Canonical URLs | ✅ alternates.canonical em cada rota |
| Schema.org LocalBusiness | ✅ AutomotiveBusiness com endereço, geo, openingHours |
| Schema.org WebSite | ✅ com publisher |
| Schema.org FAQPage | ✅ na home (todas as FAQs do site) |
| Schema.org BlogPosting | ✅ em cada post do blog |
| Schema.org BreadcrumbList | ✅ em /galeria, /blog, /blog/[slug] |
| H1/H2/H3 hierarquia | ✅ validado (1 H1 por página) |
| URLs amigáveis | ✅ /blog/[slug] com slug SEO |
| Redirects SEO | ✅ /index.php, /galeria.php, /404.php → permanent redirect |
| Performance Core Web Vitals | ✅ Lazy loading, fetchPriority, WebP, fonts preconnect |
| Imagens WebP | ✅ originais em WebP (frota, galeria) |
| Estrutura indexação Google | ✅ sitemap + robots + canonical |
| Google Search Console Ready | ✅ token via admin/seo |
| Google Analytics Ready | ✅ GA4 ID via admin/seo ou NEXT_PUBLIC_GA_ID |
| Google Tag Manager Ready | ✅ GTM ID via admin/seo ou NEXT_PUBLIC_GTM_ID |
| PWA Manifest | ✅ `src/app/manifest.ts` |

---

## O que NÃO foi testado

Conforme solicitado, deixamos explícito:

- ❌ **Conexão real com PostgreSQL** (Neon/Supabase): testado apenas com
  SQLite local. O schema é portável (somente tipos Prisma padrão), mas a
  troca `sqlite → postgresql` no `schema.prisma` deve ser feita antes do
  deploy. Após trocar, rode `bun run db:push` uma vez localmente para validar.
- ❌ **Deploy real na Vercel**: testamos o build (`bun run build` passa limpo
  com 0 erros), mas o deploy final depende das variáveis de ambiente que só
  você pode configurar no painel da Vercel.
- ❌ **Google Analytics / GTM reais**: scripts injetados corretamente quando
  IDs estão configurados, mas não validados com IDs reais.

---

## Contato / fluxo do WhatsApp

O formulário na home page **não envia dados ao servidor** — ele monta uma
mensagem e abre o WhatsApp diretamente (comportamento idêntico ao PHP original).
A geolocalização só é acessada após autorização explícita do visitante.

---

## Licença e créditos

Site original desenvolvido em PHP e migrado para Next.js preservando
identidade visual, conteúdo e URLs aprovados pelo cliente.

Marca: **Leandro Guincho** — Auto Socorro 24h em Ituiutaba e região.
