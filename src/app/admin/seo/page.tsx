import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { loadSeoSettings } from "@/lib/settings";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminLogout } from "@/components/admin/admin-logout";
import { SeoForm } from "@/components/admin/seo-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminSeoPage() {
  await requireAdmin();
  const settings = await loadSeoSettings();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* biome-ignore lint/performance/noImgElement: brand logo */}
            <img src="/assets/images/brand/logo-header.png" alt="" width={32} height={32} className="rounded" />
            <div>
              <div className="font-bold text-sm">Painel Leandro Guincho</div>
              <div className="text-xs text-slate-400">Administração do site</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-xs text-slate-400 hover:text-slate-200">
              Ver site ↗
            </Link>
            <AdminLogout />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <AdminNav active="seo" />

        <main className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">SEO & Analytics</h1>
            <p className="text-sm text-slate-400 mt-1">
              Configure metadados padrão, Google Analytics, Google Tag Manager e verificação do Search Console.
            </p>
          </div>

          <SeoForm initial={settings} />

          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader>
              <CardTitle className="text-base">Referência rápida</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-300 space-y-2">
              <p><strong className="text-slate-100">Google Analytics 4:</strong> formato G-XXXXXXXXXX</p>
              <p><strong className="text-slate-100">Google Tag Manager:</strong> formato GTM-XXXXXXX</p>
              <p><strong className="text-slate-100">Verificação Google:</strong> cole apenas o token (não a tag completa). Ex.: <code className="bg-slate-950 px-1 rounded">Np3jHc7V...</code></p>
              <p><strong className="text-slate-100">Sitemap:</strong> disponível em <code className="bg-slate-950 px-1 rounded">/sitemap.xml</code></p>
              <p><strong className="text-slate-100">Robots:</strong> disponível em <code className="bg-slate-950 px-1 rounded">/robots.txt</code></p>
              <p><strong className="text-slate-100">Manifest:</strong> disponível em <code className="bg-slate-950 px-1 rounded">/manifest.webmanifest</code></p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
