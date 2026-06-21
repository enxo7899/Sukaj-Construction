"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";

// Wordmark is the Home link — no separate Home item in the desktop nav.
const NAV_ITEMS = [
  { key: "about" as const, href: "/about" },
  { key: "projects" as const, href: "/projects" },
  { key: "process" as const, href: "/process" },
  { key: "contact" as const, href: "/contact" },
];

const EASE = [0.25, 0, 0, 1] as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: EASE } },
};

export function Header() {
  const t = useTranslations("nav");
  const tLocale = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const oppositeLocale = locale === "en" ? "sq" : "en";
  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`
          fixed top-0 inset-x-0 z-50
          flex items-center justify-between
          px-6 md:px-14 h-16 md:h-20
          transition-[background-color,border-color,backdrop-filter] duration-500
          ${
            scrolled || menuOpen
              ? "bg-bg/90 backdrop-blur-md border-b border-accent-secondary/15"
              : "bg-transparent border-b border-transparent"
          }
        `}
      >
        {/* Wordmark = Home */}
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display text-[0.72rem] tracking-[0.24em] uppercase text-text hover:text-accent transition-colors duration-200"
        >
          Sukaj Construction
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
          {NAV_ITEMS.map(({ key, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={key}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`
                  relative eyebrow transition-colors duration-200
                  ${active ? "text-accent" : "text-text/55 hover:text-text"}
                `}
              >
                {t(key)}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-accent transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop: locale toggle */}
        <Link
          href={pathname}
          locale={oppositeLocale}
          className="hidden md:block eyebrow text-accent-secondary hover:text-accent transition-colors duration-200"
        >
          {tLocale("toggle")}
        </Link>

        {/* Mobile: locale + hamburger */}
        <div className="md:hidden flex items-center gap-5">
          <Link
            href={pathname}
            locale={oppositeLocale}
            onClick={closeMenu}
            className="eyebrow text-accent-secondary"
          >
            {tLocale("toggle")}
          </Link>
          <button
            className="flex flex-col items-center justify-center gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-5 h-px bg-text origin-center"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
            />
            <motion.span
              className="block w-5 h-px bg-text"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.12 }}
            />
            <motion.span
              className="block w-5 h-px bg-text origin-center"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-40 bg-bg flex flex-col px-6 pt-24 pb-10"
          >
            <nav className="flex flex-col flex-1" aria-label="Mobile navigation">
              {[{ key: "home" as const, href: "/" }, ...NAV_ITEMS].map(({ key, href }, i) => {
                const active = isActive(href);
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 + i * 0.06, ease: EASE }}
                    className="border-b border-accent-secondary/12"
                  >
                    <Link
                      href={href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline justify-between py-5 group"
                    >
                      <span
                        className={`font-display text-4xl sm:text-5xl transition-colors duration-200 ${
                          active ? "text-accent" : "text-text group-hover:text-accent"
                        }`}
                      >
                        {t(key)}
                      </span>
                      <span className="eyebrow text-text/30">0{i + 1}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.42 }}
              className="pt-6 flex items-end justify-between"
            >
              <p className="eyebrow text-text/30">Tirana · Albania</p>
              <p className="eyebrow text-text/30">Est. 2010</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
