import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession, hasAdmin, hashPassword, verifyPassword } from "@/lib/auth";

/**
 * GET /api/admin/login — probe to detect first-time setup vs. normal login.
 * Returns { exists: boolean } — no auth required.
 */
export async function GET() {
  const exists = await hasAdmin();
  return NextResponse.json({ exists });
}

/**
 * POST /api/admin/login
 *
 * Two modes:
 *   1. First-time setup (no admin exists yet): body = { password, confirm }
 *      Creates the admin row + session.
 *   2. Normal login: body = { password }
 *      Verifies password against the stored hash and creates a session.
 *
 * Username is fixed to "admin" (single-tenant app).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body.password !== "string" || body.password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 },
      );
    }

    const exists = await hasAdmin();

    // First-time setup
    if (!exists) {
      if (body.password !== body.confirm) {
        return NextResponse.json(
          { error: "As senhas não conferem." },
          { status: 400 },
        );
      }
      await db.admin.create({
        data: { username: "admin", passwordHash: hashPassword(body.password) },
      });
      await createSession("admin");
      return NextResponse.json({ ok: true, firstRun: true });
    }

    // Normal login
    const admin = await db.admin.findUnique({ where: { username: "admin" } });
    if (!admin || !verifyPassword(body.password, admin.passwordHash)) {
      return NextResponse.json(
        { error: "Senha incorreta." },
        { status: 401 },
      );
    }
    await createSession("admin");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/login] error:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 },
    );
  }
}
