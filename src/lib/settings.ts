/**
 * Persistent admin-editable settings (SiteSetting table).
 *
 * SiteSetting is a simple key/value store: { id: string, value: string }.
 * Complex values (objects, arrays) are stored as JSON strings.
 *
 * On the public site, settings override the static defaults from `lib/config.ts`.
 * The admin panel writes via the `/api/admin/settings` route.
 */
import { db } from "@/lib/db";
import { defaultConfig, type SiteConfig } from "@/lib/config";

export type SeoSettings = {
  /** Optional Google Analytics 4 measurement ID (e.g. G-XXXX). */
  gaId: string;
  /** Optional Google Tag Manager container ID (e.g. GTM-XXXX). */
  gtmId: string;
  /** Default SEO title template (used when a page does not define its own). */
  defaultTitle: string;
  /** Default meta description. */
  defaultDescription: string;
  /** Default OG image URL (absolute or root-relative). */
  defaultOgImage: string;
  /** Optional Google Search Console verification token. */
  googleVerification: string;
  /** Optional Facebook Pixel ID. */
  facebookPixelId: string;
};

export const defaultSeoSettings: SeoSettings = {
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  defaultTitle: "Leandro Guincho — Auto Socorro 24h em Ituiutaba",
  defaultDescription:
    "Serviço de guincho e auto socorro 24 horas em Ituiutaba e região. Atendimento para pane, acidente, transporte e imprevistos automotivos.",
  defaultOgImage: "/assets/images/og-image.jpg",
  googleVerification: "",
  facebookPixelId: "",
};

const SETTINGS_ID = "seo:settings";
const CONFIG_OVERRIDE_ID = "config:override";

/** Load SEO settings (DB override > defaults). */
export async function loadSeoSettings(): Promise<SeoSettings> {
  const row = await db.siteSetting.findUnique({ where: { id: SETTINGS_ID } });
  if (!row) return defaultSeoSettings;
  try {
    return { ...defaultSeoSettings, ...(JSON.parse(row.value) as Partial<SeoSettings>) };
  } catch {
    return defaultSeoSettings;
  }
}

/** Persist SEO settings. */
export async function saveSeoSettings(next: SeoSettings): Promise<void> {
  await db.siteSetting.upsert({
    where: { id: SETTINGS_ID },
    update: { value: JSON.stringify(next) },
    create: { id: SETTINGS_ID, value: JSON.stringify(next) },
  });
}

/**
 * Resolve the effective site config by merging static defaults with
 * admin-edited overrides (if any). Currently the admin only edits SEO +
 * content text; for now, overrides apply to the SEO-relevant fields.
 */
export async function loadEffectiveConfig(): Promise<SiteConfig> {
  const override = await db.siteSetting.findUnique({ where: { id: CONFIG_OVERRIDE_ID } });
  if (!override) return defaultConfig;
  try {
    return { ...defaultConfig, ...(JSON.parse(override.value) as Partial<SiteConfig>) };
  } catch {
    return defaultConfig;
  }
}
