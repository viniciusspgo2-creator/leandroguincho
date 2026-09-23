import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, verifyPassword, hashPassword } from "@/lib/auth";

/**
 * POST /api/admin/password
 * Body: { current: string, next: string }
 *
 * Changes the admin password. Requires an authenticated session.
 */
export async function POST(request: NextRequest) {
  await requireAdmin();
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body.current !== "string" || typeof body.next !== "string") {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }
    if (body.next.length < 6) {
      return NextResponse.json(
        { error: "A nova senha deve ter pelo menos 6 caracteres." },
        { status: 400 },
      );
    }

    const admin = await db.admin.findUnique({ where: { username: "admin" } });
    if (!admin || !verifyPassword(body.current, admin.passwordHash)) {
      return NextResponse.json({ error: "Senha atual incorreta." }, { status: 401 });
    }

    await db.admin.update({
      where: { username: "admin" },
      data: { passwordHash: hashPassword(body.next) },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/password] error:", error);
    return NextResponse.json({ error: "Erro ao atualizar senha." }, { status: 500 });
  }
}
