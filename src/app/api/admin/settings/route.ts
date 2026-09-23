import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { defaultSeoSettings, loadSeoSettings, saveSeoSettings } from "@/lib/settings";

/**
 * GET /api/admin/settings — returns the current SEO settings.
 * POST /api/admin/settings — updates the SEO settings.
 */
export async function GET() {
  await requireAdmin();
  const settings = await loadSeoSettings();
  return NextResponse.json(settings);
}

export async function POST(request: NextRequest) {
  await requireAdmin();
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
    }

    // Allow-listed keys only — prevents accidental overwrites.
    const next = {
      gaId: typeof body.gaId === "string" ? body.gaId.trim() : "",
      gtmId: typeof body.gtmId === "string" ? body.gtmId.trim() : "",
      defaultTitle:
        typeof body.defaultTitle === "string" && body.defaultTitle.trim().length > 0
          ? body.defaultTitle.trim()
          : defaultSeoSettings.defaultTitle,
      defaultDescription:
        typeof body.defaultDescription === "string" && body.defaultDescription.trim().length > 0
          ? body.defaultDescription.trim()
          : defaultSeoSettings.defaultDescription,
      defaultOgImage:
        typeof body.defaultOgImage === "string" && body.defaultOgImage.trim().length > 0
          ? body.defaultOgImage.trim()
          : defaultSeoSettings.defaultOgImage,
      googleVerification:
        typeof body.googleVerification === "string" ? body.googleVerification.trim() : "",
      facebookPixelId:
        typeof body.facebookPixelId === "string" ? body.facebookPixelId.trim() : "",
    };

    await saveSeoSettings(next);
    return NextResponse.json({ ok: true, settings: next });
  } catch (error) {
    console.error("[admin/settings] error:", error);
    return NextResponse.json({ error: "Erro ao salvar." }, { status: 500 });
  }
}
