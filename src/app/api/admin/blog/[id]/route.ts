import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/admin/blog/[id] — returns a single post by id.
 * PUT /api/admin/blog/[id] — updates a post.
 * DELETE /api/admin/blog/[id] — deletes a post.
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  await requireAdmin();
  const { id } = await context.params;
  const post = await db.blogPost.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ error: "Post não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ post });
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function PUT(request: NextRequest, context: RouteContext) {
  await requireAdmin();
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const existing = await db.blogPost.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Post não encontrado." }, { status: 404 });
  }

  const data: Record<string, unknown> = {};
  if (typeof body.title === "string" && body.title.trim().length > 0) data.title = body.title.trim();
  if (typeof body.excerpt === "string") data.excerpt = body.excerpt.trim();
  if (typeof body.content === "string") data.content = body.content;
  if (typeof body.tags === "string") data.tags = body.tags.trim() || null;
  if (typeof body.coverImage === "string") data.coverImage = body.coverImage.trim() || null;
  if (typeof body.author === "string" && body.author.trim().length > 0) data.author = body.author.trim();
  if (typeof body.seoTitle === "string") data.seoTitle = body.seoTitle.trim() || null;
  if (typeof body.seoDescription === "string") data.seoDescription = body.seoDescription.trim() || null;
  if (typeof body.ogImage === "string") data.ogImage = body.ogImage.trim() || null;

  if (typeof body.slug === "string" && body.slug.trim().length > 0) {
    const slug = slugify(body.slug.trim());
    if (slug !== existing.slug) {
      const collision = await db.blogPost.findUnique({ where: { slug } });
      if (collision) {
        return NextResponse.json({ error: "Esse slug já está em uso." }, { status: 409 });
      }
      data.slug = slug;
    }
  }

  if (typeof body.published === "boolean") {
    data.published = body.published;
    if (body.published && !existing.publishedAt) {
      data.publishedAt = new Date();
    } else if (!body.published) {
      data.publishedAt = null;
    }
  }

  const post = await db.blogPost.update({ where: { id }, data });
  return NextResponse.json({ ok: true, post });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  await requireAdmin();
  const { id } = await context.params;
  await db.blogPost.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
