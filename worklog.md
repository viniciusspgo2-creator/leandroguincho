# Worklog — Leandro Guincho (PHP → Next.js Migration)

Source ZIP: `/home/z/my-project/upload/Leandro_Guincho_Site_Moderno_v1.0.zip`
Original site extracted to: `/home/z/my-project/original-site/leandro_guincho_site/`
Target: Next.js 16 (App Router) + TypeScript + Prisma + Vercel-ready.

## Original site audit (Tipo A — PHP Simples)

Pages:
- `index.php` — home (hero, services, process, showcase, gallery preview, reviews, FAQ, contact form, lightbox, video modal)
- `galeria.php` — gallery grid + video modal
- `404.php` — not found

Includes (PHP):
- `includes/header.php` — emergency bar, header, desktop nav, mobile menu, opening `<main>`
- `includes/footer.php` — final CTA, footer, floating actions, toast, video modal, lightbox container
- `includes/bootstrap.php` — `site_config()`, `e()`, `whatsapp_url()`, `icon()`, `current_page()`

Static:
- `assets/css/style.css` (536 lines, full design system — Inter font, magenta brand `#e50078`, dark hero, glassmorphism cards)
- `assets/js/app.js` (292 lines — sticky header, mobile menu, reveal, YouTube bg, tilt, geolocation, WhatsApp form, video modal, lightbox, accordion, reviews carousel, ESC handler)
- `assets/images/**` — webp hero-poster, about.webp, 10 gallery webp, 10 frota (480+800), 4 brand PNGs, og-image.jpg

Config:
- `config/site.json` — site info (name, url, phone, whatsapp, videos), navigation, testimonials, faq
- `manifest.webmanifest` — PWA
- `.htaccess` — HTTPS redirect, security headers, cache, deny access to sensitive files
- `robots.txt` + `sitemap.xml` (basic)

## Migration strategy (decisions)

1. **Visual fidelity:** reuse original `style.css` and `app.js` verbatim from `/public/assets/`. Convert PHP-generated HTML into JSX preserving every class/structure. NO Tailwind on the public site. shadcn/ui only inside the admin panel.
2. **PHP helpers** → TS modules in `src/lib/` (config, whatsapp, icons, auth, seo).
3. **PHP pages** → App Router routes (`/`, `/galeria`, `/blog`, `/blog/[slug]`, `/admin*`, `/404`).
4. **SEO:** dynamic `sitemap.ts`, `robots.ts`, `manifest.ts`, JSON-LD (LocalBusiness, Breadcrumb, FAQ, Article), OG, Twitter, Analytics-ready placeholders (GTM/GA env-driven).
5. **Database:** Prisma + SQLite locally (works in this sandbox) → user switches provider to `postgresql` (Neon/Supabase) for Vercel production. Schema uses only portable types.
6. **Admin auth:** httpOnly cookie + bcrypt password set on first access. No NextAuth (user said "no extra auth service").
7. **Blog:** 6 strategic SEO articles pre-seeded via `prisma/seed.ts`.
8. **Redirects:** `next.config.ts` `redirects()` for `galeria.php → /galeria` and any `*.php` legacy URLs.

## Env vars required for production
- `DATABASE_URL` — Postgres connection (Neon/Supabase/Vercel Postgres)
- `ADMIN_PASSWORD` — optional override; otherwise set on first visit
- `NEXT_PUBLIC_SITE_URL` — canonical base URL
- `NEXT_PUBLIC_GTM_ID` — optional Google Tag Manager
- `NEXT_PUBLIC_GA_ID` — optional Google Analytics 4

---
Task ID: 1
Agent: orchestrator (Z.ai Code)
Task: Initial audit, worklog creation, asset copy strategy.

Work Log:
- Extracted ZIP into `/home/z/my-project/original-site/leandro_guincho_site/`
- Read all PHP/CSS/JS/JSON files; cataloged structure above.
- Decided reuse-original-CSS strategy (preserve 100% design).
- Created this worklog.

Stage Summary:
- Project classified as **Tipo A (PHP Simples)**.
- No DB, no auth, no uploads in original — DB/auth/admin/blog are NEW features added per user request.
- Next agent picks up at Task 2: Prisma schema + asset copy.

---
Task ID: 2-21
Agent: orchestrator (Z.ai Code)
Task: Complete migration + admin panel + blog + SEO + Vercel deploy prep.

Work Log:
- Copied original assets (CSS/JS/images) verbatim to `public/assets/`.
- Defined Prisma schema (Admin, BlogPost, Visit, SiteSetting) — SQLite in dev, postgresql-ready.
- Built lib: db.ts, auth.ts (scrypt cookie-based), config.ts (port of site.json), icons.tsx (port of icon()), settings.ts, seo.ts (5 JSON-LD builders).
- Built site-header.tsx and site-footer.tsx (ports of header.php / footer.php).
- Built json-ld.tsx + visit-tracker.tsx client components.
- Built root layout.tsx (lang=pt-BR, Inter font via Google Fonts link, GTM/GA inject scripts, loads original CSS+JS).
- Migrated home page (page.tsx — port of index.php, 100% markup fidelity).
- Migrated gallery page (galeria/page.tsx — port of galeria.php).
- Migrated 404 page (not-found.tsx — port of 404.php).
- Built blog listing (blog/page.tsx) + blog post detail (blog/[slug]/page.tsx) with article JSON-LD + breadcrumbs.
- Created blog-card component + appended blog CSS to public/assets/css/style.css (safe enhancement).
- Seeded 6 strategic SEO articles via prisma/seed.ts (guincho 24h, auto socorro, preço, como solicitar, quando chamar, transporte de veículo).
- Built admin login page (first-time setup + normal login, password set on first access).
- Built admin dashboard (visits overview, top paths, recent visits).
- Built admin blog CRUD (list, create, edit, delete via API routes).
- Built admin SEO settings page (GA4, GTM, Google verification, default title/description/OG).
- Built admin visits page (14-day chart, top pages, last 30 visits).
- Built dynamic sitemap.ts, robots.ts, manifest.ts.
- Added next.config.ts redirects for legacy .php URLs (308 permanent).
- Added vercel.json with buildCommand + security headers.
- Added .env.example + .gitignore fixes (keep .env.example, exclude local db).
- README.md with deploy instructions and full migration summary.

Verification:
- ✅ bun run lint: 0 errors, 3 warnings (all intentional design decisions for visual fidelity).
- ✅ Home renders correctly (verified via agent-browser snapshot + VLM analysis).
- ✅ Gallery renders correctly.
- ✅ Blog listing shows 6 seeded articles.
- ✅ Blog post detail renders with Article + Breadcrumb JSON-LD.
- ✅ /admin/login first-time setup → password creation → redirect to /admin dashboard.
- ✅ /admin/blog shows all 6 posts with edit/delete/view links.
- ✅ /admin/visits shows visit stats (multiple visits tracked already).
- ✅ /sitemap.xml returns valid sitemap with all 9 URLs (3 static + 6 blog posts).
- ✅ /robots.txt returns valid robots (disallow /admin and /api).
- ✅ /manifest.webmanifest returns valid PWA manifest.
- ✅ Legacy redirects work: /index.php → /, /galeria.php → /galeria, /404.php → /404 (308 permanent).
- ✅ Mobile responsive verified at 375px width.
- ✅ Desktop verified at 1440px width.
- ✅ No runtime errors in dev.log.
- ✅ 5 JSON-LD schemas on home (AutomotiveBusiness, WebSite, FAQPage).
- ✅ 2 JSON-LD schemas on blog post (BlogPosting, BreadcrumbList).
- ✅ OpenGraph + Twitter cards on all pages.
- ✅ Canonical URLs on all pages.

Stage Summary:
- Migration complete. 100% visual fidelity preserved (CSS + JS + images + HTML structure all original).
- All 6 SEO articles seeded and accessible at /blog/[slug].
- Admin panel fully functional with cookie-based auth (no NextAuth, no extra deps).
- Vercel-ready: schema is portable (sqlite → postgresql), build command runs prisma generate.
- Env vars documented: DATABASE_URL, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GTM_ID.
- What was NOT tested: real Postgres connection, real Vercel deploy, real GA/GTM IDs.

---
Task ID: 22
Agent: orchestrator (Z.ai Code)
Task: Add temporary download button to download full project ZIP.

Work Log:
- Created `/api/download-zip` route that uses system `zip` command to generate a ZIP on-the-fly.
- Excludes: node_modules, .next, .git, db/*.db, dev.log, server.log, original-site/, upload/, tests/, skills/, .zscripts/, download/, mini-services/, examples/, agent-ctx/, .claude/, .z-ai-config/, screenshot-*.png, .vercel/.
- Optional `?token=XXX` query param protection via DOWNLOAD_ZIP_TOKEN env var.
- Created `TempDownloadButton` client component with progress feedback.
- Added button to src/app/page.tsx (bottom-left, fixed position, blue).
- Verified: GET /api/download-zip returns 200, 3.1MB ZIP with 192 files in db/, prisma/, public/, src/.
- Verified: Button click triggers browser download and resets to normal state after.

Stage Summary:
- Temporary download button is live at the bottom-left of the home page.
- ZIP contains ALL project files needed for Vercel deploy: prisma/, public/assets/, src/app/, src/components/, src/lib/, package.json, next.config.ts, vercel.json, .env.example, README.md, etc.
- After deploy, REMOVE: src/app/api/download-zip/route.ts, src/components/site/temp-download-button.tsx, and the <TempDownloadButton /> import in src/app/page.tsx.
