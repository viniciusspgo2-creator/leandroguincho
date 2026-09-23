import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminLogout } from "@/components/admin/admin-logout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [totalVisits, blogCount, publishedPosts, recentVisits] = await Promise.all([
    db.visit.count(),
    db.blogPost.count(),
    db.blogPost.count({ where: { published: true } }),
    db.visit.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
  ]);

  // Aggregate visits by path (top 10).
  const allPaths = await db.visit.findMany({
    select: { path: true },
  });
  const pathCounts = new Map<string, number>();
  for (const v of allPaths) {
    pathCounts.set(v.path, (pathCounts.get(v.path) ?? 0) + 1);
  }
  const topPaths = [...pathCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const visitsToday = await db.visit.count({
    where: { createdAt: { gte: today } },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* biome-ignore lint/performance/noImgElement: brand logo */}
            <img
              src="/assets/images/brand/logo-header.png"
              alt=""
              width={32}
              height={32}
              className="rounded"
            />
            <div>
              <div className="font-bold text-sm">Painel Leandro Guincho</div>
              <div className="text-xs text-slate-400">Administração do site</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Ver site ↗
            </Link>
            <AdminLogout />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <AdminNav active="dashboard" />

        <main className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Visão geral</h1>
            <p className="text-sm text-slate-400 mt-1">
              Métricas principais do site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-900 border-slate-800 text-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-slate-400 uppercase tracking-wider">
                  Total de visitas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalVisits}</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800 text-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-slate-400 uppercase tracking-wider">
                  Visitas hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{visitsToday}</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800 text-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-slate-400 uppercase tracking-wider">
                  Posts publicados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{publishedPosts}</div>
                <div className="text-xs text-slate-500 mt-1">{blogCount} no total</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800 text-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-slate-400 uppercase tracking-wider">
                  Ações rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 pt-1">
                <Link
                  href="/admin/blog/new"
                  className="text-xs px-3 py-1.5 rounded-md bg-pink-600 hover:bg-pink-700 text-white font-semibold"
                >
                  + Novo post
                </Link>
                <Link
                  href="/admin/seo"
                  className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold"
                >
                  Editar SEO
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-900 border-slate-800 text-slate-100">
              <CardHeader>
                <CardTitle className="text-base">Páginas mais visitadas</CardTitle>
              </CardHeader>
              <CardContent>
                {topPaths.length === 0 ? (
                  <p className="text-sm text-slate-400">Nenhuma visita registrada ainda.</p>
                ) : (
                  <ul className="space-y-2">
                    {topPaths.map(([path, count]) => (
                      <li key={path} className="flex items-center justify-between text-sm">
                        <span className="font-mono text-slate-300">{path}</span>
                        <span className="font-bold text-pink-400">{count}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 text-slate-100">
              <CardHeader>
                <CardTitle className="text-base">Visitas recentes</CardTitle>
              </CardHeader>
              <CardContent>
                {recentVisits.length === 0 ? (
                  <p className="text-sm text-slate-400">Nenhuma visita ainda.</p>
                ) : (
                  <ul className="space-y-2 max-h-72 overflow-y-auto">
                    {recentVisits.map((visit) => (
                      <li key={visit.id} className="text-xs space-y-0.5">
                        <div className="font-mono text-slate-300">{visit.path}</div>
                        <div className="text-slate-500">
                          {new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(visit.createdAt)}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
