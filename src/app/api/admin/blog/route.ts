import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/admin/blog?published=all|true|false
 *   - Returns all posts (admin view). Defaults to all.
 *
 * POST /api/admin/blog
 *   - Creates a new draft/published post.
 */
export async function GET(request: NextRequest) {
  await requireAdmin();
  const filter = request.nextUrl.searchParams.get("published");
  const where = filter === "true" || filter === "false" ? { published: filter === "true" } : {};
  const posts = await db.blogPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ posts });
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function POST(request: NextRequest) {
  await requireAdmin();
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body.title !== "string" || body.title.trim().length < 3) {
      return NextResponse.json({ error: "Título inválido." }, { status: 400 });
    }

    const title = body.title.trim();
    const slug = typeof body.slug === "string" && body.slug.trim().length > 0
      ? slugify(body.slug.trim())
      : slugify(title);
    const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
    const content = typeof body.content === "string" ? body.content : "";
    const tags = typeof body.tags === "string" ? body.tags.trim() : null;
    const coverImage = typeof body.coverImage === "string" && body.coverImage.trim().length > 0 ? body.coverImage.trim() : null;
    const author = typeof body.author === "string" && body.author.trim().length > 0 ? body.author.trim() : "Leandro Guincho";
    const published = Boolean(body.published);
    const seoTitle = typeof body.seoTitle === "string" ? body.seoTitle.trim() : null;
    const seoDescription = typeof body.seoDescription === "string" ? body.seoDescription.trim() : null;
    const ogImage = typeof body.ogImage === "string" && body.ogImage.trim().length > 0 ? body.ogImage.trim() : null;

    if (excerpt.length < 10) {
      return NextResponse.json({ error: "Resumo muito curto." }, { status: 400 });
    }

    // Ensure slug uniqueness
    const exists = await db.blogPost.findUnique({ where: { slug } });
    if (exists) {
      return NextResponse.json({ error: "Já existe um post com esse slug." }, { status: 409 });
    }

    const post = await db.blogPost.create({
      data: {
        slug,
        title,
        excerpt,
        content,
        tags,
        coverImage,
        author,
        published,
        publishedAt: published ? new Date() : null,
        seoTitle,
        seoDescription,
        ogImage,
      },
    });

    return NextResponse.json({ ok: true, post });
  } catch (error) {
    console.error("[admin/blog/create] error:", error);
    return NextResponse.json({ error: "Erro ao criar post." }, { status: 500 });
  }
}
