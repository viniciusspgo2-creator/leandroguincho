import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminLogout } from "@/components/admin/admin-logout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeletePostButton } from "@/components/admin/delete-post-button";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  await requireAdmin();

  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

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
        <AdminNav active="blog" />

        <main className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Blog</h1>
              <p className="text-sm text-slate-400 mt-1">{posts.length} post(s) no total.</p>
            </div>
            <Link
              href="/admin/blog/new"
              className="text-sm px-4 py-2 rounded-md bg-pink-600 hover:bg-pink-700 text-white font-semibold"
            >
              + Novo post
            </Link>
          </div>

          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader>
              <CardTitle className="text-base">Posts cadastrados</CardTitle>
            </CardHeader>
            <CardContent>
              {posts.length === 0 ? (
                <p className="text-sm text-slate-400">
                  Nenhum post ainda. Crie o primeiro clicando em “+ Novo post”.
                </p>
              ) : (
                <div className="space-y-2">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-md bg-slate-950/60 border border-slate-800 hover:border-slate-700"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                              post.published
                                ? "bg-green-900/60 text-green-200"
                                : "bg-slate-700 text-slate-300"
                            }`}
                          >
                            {post.published ? "PUBLICADO" : "RASCUNHO"}
                          </span>
                          {post.publishedAt ? (
                            <span className="text-xs text-slate-500">
                              {new Intl.DateTimeFormat("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }).format(post.publishedAt)}
                            </span>
                          ) : null}
                        </div>
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="block font-semibold text-sm text-slate-100 hover:text-pink-400 truncate"
                        >
                          {post.title}
                        </Link>
                        <div className="text-xs text-slate-500 mt-0.5 font-mono truncate">
                          /blog/{post.slug}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold"
                        >
                          Editar
                        </Link>
                        {post.published ? (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold"
                          >
                            Ver ↗
                          </Link>
                        ) : null}
                        <DeletePostButton postId={post.id} postTitle={post.title} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
