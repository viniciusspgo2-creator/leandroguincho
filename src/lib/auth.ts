/**
 * Cookie-based admin auth.
 *
 * Flow:
 * 1. On first visit to /admin, if no Admin row exists, the user is forced to
 *    /admin/login?setup=1 and must choose a password.
 * 2. After login, an httpOnly cookie `lg_admin_session` is set with a random
 *    token (also stored hashed on the Admin row).
 * 3. `requireAdmin()` throws a redirect when unauthenticated.
 *
 * No NextAuth — user explicitly asked not to add extra auth services.
 * Password is hashed with Node's built-in scrypt (no extra deps).
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";

const SESSION_COOKIE = "lg_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

/** Hash a password using scrypt + per-password salt. Returns `salt:hash` (both hex). */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

/** Verify a password against a stored `salt:hash` string. */
export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const real = Buffer.from(hash, "hex");
  return candidate.length === real.length && timingSafeEqual(candidate, real);
}

function hashToken(token: string): string {
  return scryptSync(token, "lg-session-salt", 32).toString("hex");
}

/** Create a new session token, persist its hash, and set the cookie. */
export async function createSession(username: string): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  const admin = await db.admin.findFirst({ where: { username } });
  if (!admin) throw new Error("Admin não encontrado.");

  // Reuse the passwordHash column slot pattern by storing session token hash
  // in a separate SiteSetting row keyed by `session:<adminId>`.
  await db.siteSetting.upsert({
    where: { id: `session:${admin.id}` },
    update: { value: `${hashToken(token)}|${expiresAt.toISOString()}` },
    create: { id: `session:${admin.id}`, value: `${hashToken(token)}|${expiresAt.toISOString()}` },
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, `${admin.id}.${token}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

/** Returns true when an admin is logged-in for the current request. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return false;

  const [adminId, token] = raw.split(".");
  if (!adminId || !token) return false;

  const session = await db.siteSetting.findUnique({ where: { id: `session:${adminId}` } });
  if (!session) return false;

  const [storedHash, expiresAtStr] = session.value.split("|");
  if (!storedHash || !expiresAtStr) return false;

  const expiresAt = new Date(expiresAtStr);
  if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() < Date.now()) {
    return false;
  }

  try {
    const candidate = Buffer.from(hashToken(token), "hex");
    const real = Buffer.from(storedHash, "hex");
    return candidate.length === real.length && timingSafeEqual(candidate, real);
  } catch {
    return false;
  }
}

/** Destroy the current session (cookie + DB row). */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (raw) {
    const [adminId] = raw.split(".");
    if (adminId) {
      await db.siteSetting.delete({ where: { id: `session:${adminId}` } }).catch(() => {});
    }
  }
  store.delete(SESSION_COOKIE);
}

/** Throws a redirect to /admin/login when unauthenticated. */
export async function requireAdmin(): Promise<void> {
  const ok = await isAuthenticated();
  if (!ok) redirect("/admin/login");
}

/** Returns true if at least one Admin exists (used to detect first-access setup). */
export async function hasAdmin(): Promise<boolean> {
  const count = await db.admin.count();
  return count > 0;
}
