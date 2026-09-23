import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminLogout } from "@/components/admin/admin-logout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminVisitsPage() {
  await requireAdmin();

  const [total, today, week, month] = await Promise.all([
    db.visit.count(),
    db.visit.count({ where: { createdAt: { gte: startOfDay(new Date()) } } }),
    db.visit.count({ where: { createdAt: { gte: daysAgo(7) } } }),
    db.visit.count({ where: { createdAt: { gte: daysAgo(30) } } }),
  ]);

  // Visits per day (last 14 days).
  const last14 = daysAgo(13);
  const recent = await db.visit.findMany({
    where: { createdAt: { gte: last14 } },
    select: { createdAt: true, path: true },
  });
  const perDay = new Map<string, number>();
  for (const v of recent) {
    const key = new Intl.DateTimeFormat("en-CA").format(v.createdAt); // YYYY-MM-DD
    perDay.set(key, (perDay.get(key) ?? 0) + 1);
  }
  const perDayList = [...perDay.entries()].sort(([a], [b]) => a.localeCompare(b));

  // Top paths.
  const allPaths = await db.visit.findMany({ select: { path: true } });
  const pathCounts = new Map<string, number>();
  for (const v of allPaths) {
    pathCounts.set(v.path, (pathCounts.get(v.path) ?? 0) + 1);
  }
  const topPaths = [...pathCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15);

  const recentVisits = await db.visit.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  const maxDay = Math.max(1, ...perDayList.map(([, n]) => n));

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
        <AdminNav active="visits" />

        <main className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Contador de visitas</h1>
            <p className="text-sm text-slate-400 mt-1">
              Visitas registradas pelo site (uma por page-view).
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-slate-900 border-slate-800 text-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-slate-400 uppercase tracking-wider">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{total}</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800 text-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-slate-400 uppercase tracking-wider">Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{today}</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800 text-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-slate-400 uppercase tracking-wider">7 dias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{week}</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800 text-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-slate-400 uppercase tracking-wider">30 dias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{month}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader>
              <CardTitle className="text-base">Visitas por dia (últimos 14 dias)</CardTitle>
            </CardHeader>
            <CardContent>
              {perDayList.length === 0 ? (
                <p className="text-sm text-slate-400">Sem dados no período.</p>
              ) : (
                <div className="space-y-2">
                  {perDayList.map(([day, count]) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-mono w-24">{day}</span>
                      <div className="flex-1 h-6 bg-slate-950 rounded overflow-hidden">
                        <div
                          className="h-full bg-pink-600 transition-all"
                          style={{ width: `${(count / maxDay) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-300 font-bold w-8 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

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
                <CardTitle className="text-base">Últimas 30 visitas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 max-h-96 overflow-y-auto">
                  {recentVisits.map((visit) => (
                    <li key={visit.id} className="text-xs space-y-0.5 pb-2 border-b border-slate-800/60">
                      <div className="font-mono text-slate-300">{visit.path}</div>
                      <div className="text-slate-500">
                        {new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }).format(visit.createdAt)}
                      </div>
                      {visit.referrer ? (
                        <div className="text-slate-600 truncate">↳ {visit.referrer}</div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d;
}
