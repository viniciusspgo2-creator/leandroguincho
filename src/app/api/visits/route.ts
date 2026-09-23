import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/visits
 * Body: { path: string, referrer?: string, userAgent?: string }
 *
 * Records one row per page-view. Used by the VisitTracker client component
 * and surfaced in /admin/visits.
 *
 * Failures are swallowed (200 with { ok: false }) so the tracker never breaks
 * the visitor experience.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const path = typeof body?.path === "string" ? body.path.slice(0, 500) : "/";
    const referrer =
      typeof body?.referrer === "string" && body.referrer.length > 0
        ? body.referrer.slice(0, 500)
        : null;
    const userAgent =
      typeof body?.userAgent === "string" && body.userAgent.length > 0
        ? body.userAgent.slice(0, 500)
        : request.headers.get("user-agent")?.slice(0, 500) ?? null;

    await db.visit.create({
      data: { path, referrer, userAgent },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[visits] error:", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
