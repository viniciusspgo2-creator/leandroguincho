import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminLogout } from "@/components/admin/admin-logout";
import { PostEditor, type PostFormInitial } from "@/components/admin/post-editor";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function AdminBlogEditPage({ params }: Params) {
  await requireAdmin();
  const { id } = await params;
  const post = await db.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const initial: PostFormInitial = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    tags: post.tags ?? "",
    coverImage: post.coverImage ?? "",
    author: post.author,
    published: post.published,
    seoTitle: post.seoTitle ?? "",
    seoDescription: post.seoDescription ?? "",
    ogImage: post.ogImage ?? "",
  };

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
          <div>
            <Link href="/admin/blog" className="text-xs text-slate-400 hover:text-slate-200">
              ← Voltar para a lista
            </Link>
            <h1 className="text-2xl font-bold mt-2">Editar post</h1>
            <p className="text-sm text-slate-400 mt-1">{post.title}</p>
          </div>

          <PostEditor initial={initial} />
        </main>
      </div>
    </div>
  );
}
