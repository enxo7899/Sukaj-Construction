"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const NAV_ITEMS = [
  { key: "home" as const, href: "/" },
  { key: "about" as const, href: "/about" },
  { key: "projects" as const, href: "/projects" },
  { key: "process" as const, href: "/process" },
  { key: "contact" as const, href: "/contact" },
];

export function Header() {
  const t = useTranslations("nav");
  const tLocale = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();

  const oppositeLocale = locale === "en" ? "sq" : "en";

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 bg-bg/90 backdrop-blur-sm border-b border-accent-secondary/20">
      {/* Wordmark */}
      <Link
        href="/"
        className="font-display text-sm tracking-[0.2em] uppercase text-text hover:text-accent transition-colors"
      >
        Sukaj Construction
      </Link>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map(({ key, href }) => (
          <Link
            key={key}
            href={href}
            className="font-sans text-xs tracking-widest uppercase text-text/70 hover:text-accent transition-colors"
          >
            {t(key)}
          </Link>
        ))}
      </nav>

      {/* Locale toggle */}
      <Link
        href={pathname}
        locale={oppositeLocale}
        className="font-sans text-xs tracking-widest uppercase text-accent-secondary hover:text-accent transition-colors"
      >
        {tLocale("toggle")}
      </Link>
    </header>
  );
}
