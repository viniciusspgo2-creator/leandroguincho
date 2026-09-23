import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

/** POST /api/admin/logout — destroys the current admin session. */
export async function POST() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
