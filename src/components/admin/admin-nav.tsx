"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "M3 12l9-9 9 9M5 10v10h14V10" },
  { href: "/admin/blog", label: "Blog", icon: "M4 4h16v16H4zM4 9h16M9 4v16" },
  { href: "/admin/visits", label: "Visitas", icon: "M4 19V5M4 19h16M8 16V9M12 16v-5M16 16v-3" },
  { href: "/admin/seo", label: "SEO", icon: "M12 2a7 7 0 0 0-7 7c0 3 2 5 4 6v3h6v-3c2-1 4-3 4-6a7 7 0 0 0-7-7z" },
];

export function AdminNav({ active }: { active: string }) {
  const pathname = usePathname();
  return (
    <nav className="hidden lg:block">
      <ul className="space-y-1 sticky top-20">
        {NAV.map((item) => {
          const isActive =
            active === item.href.split("/").pop() || (active === "dashboard" && item.href === "/admin")
              ? true
              : pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-pink-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: static icon
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
