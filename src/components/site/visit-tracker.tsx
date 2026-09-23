"use client";

import { useEffect } from "react";

/**
 * Lightweight visitor tracker. Calls `/api/visits` once per page-view with
 * the current pathname. Non-blocking; failures are silently ignored.
 *
 * Visits are stored in the Visit table and surfaced in /admin/visits.
 */
export function VisitTracker() {
  useEffect(() => {
    const path = window.location.pathname;
    const referrer = document.referrer || null;
    const userAgent = navigator.userAgent || null;

    fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, referrer, userAgent }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
