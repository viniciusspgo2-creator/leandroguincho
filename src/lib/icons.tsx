/**
 * Inline SVG icon set — port of original PHP `icon()` helper.
 * Renders the same `<svg>` markup so the existing CSS keeps working.
 */
import type { JSX } from "react";

const ICONS: Record<string, string> = {
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/>',
  message:
    '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 9h8M8 13h5"/>',
  map: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield:
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-5"/>',
  truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M3 10h11"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 9-12h-7z"/>',
  tools:
    '<path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L20 16.4 16.4 20l-7.7-7.7a4 4 0 0 0-5-5L6 9.6 3.6 12 1.3 9.7a4 4 0 0 0 5 5L14 22"/>',
  route:
    '<circle cx="5" cy="19" r="2"/><circle cx="19" cy="5" r="2"/><path d="M7 19h5a3 3 0 0 0 0-6h0a3 3 0 0 1 0-6h5"/>',
  tag: '<path d="M20.6 13.6 13.7 20.5a2 2 0 0 1-2.8 0L3.5 13.1V4h9.1l8 8a2 2 0 0 1 0 2.8z"/><circle cx="8" cy="8" r="1.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  play: '<path d="m9 7 8 5-8 5z"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  camera:
    '<path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><circle cx="12" cy="13" r="4"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  car: '<path d="M5 11l2-5h10l2 5M3 11h18v7H3z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M7 11h10"/>',
};

type IconProps = {
  name: keyof typeof ICONS | string;
  className?: string;
};

/**
 * Renders an inline `<svg>` matching the original PHP `icon()` output exactly,
 * so the existing CSS (`svg { width: 1.15em; ... }`) keeps working.
 */
export function Icon({ name, className }: IconProps): JSX.Element {
  const body = ICONS[name] ?? ICONS.check;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static local icon strings only
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
