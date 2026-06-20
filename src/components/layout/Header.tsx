"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";

// Wordmark is the Home link — no separate Home item in the nav.
const NAV_ITEMS = [
  { key: "about"   as const, href: "/about" },
  { key: "projects"as const, href: "/projects" },
  { key: "process" as const, href: "/process" },
  { key: "contact" as const, href: "/contact" },
];

const EASE = [0.25, 0, 0, 1] as const;

const menuVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.22, ease: EASE } },
  exit:   { opacity: 0, transition: { duration: 0.18, ease: EASE } },
};

export function Header() {
  const t       = useTranslations("nav");
  const tLocale = useTranslations("locale");
  const locale  = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const oppositeLocale = locale === "en" ? "sq" : "en";
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`
          fixed top-0 inset-x-0 z-50
          flex items-center justify-between
          px-6 md:px-10 h-16
          transition-all duration-300
          ${scrolled
            ? "bg-bg/96 backdrop-blur-md border-b border-accent-secondary/20"
            : "bg-transparent border-b border-transparent"
          }
        `}
      >
        {/* Wordmark = Home */}
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display text-[0.68rem] tracking-[0.22em] uppercase text-text hover:text-accent transition-colors duration-200"
        >
          Sukaj Construction
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="font-sans text-[10px] tracking-widest uppercase text-text/55 hover:text-accent transition-colors duration-200"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Desktop: locale toggle only */}
        <Link
          href={pathname}
          locale={oppositeLocale}
          className="hidden md:block font-sans text-[10px] tracking-widest uppercase text-accent-secondary hover:text-accent transition-colors duration-200"
        >
          {tLocale("toggle")}
        </Link>

        {/* Mobile: locale + hamburger */}
        <div className="md:hidden flex items-center gap-5">
          <Link
            href={pathname}
            locale={oppositeLocale}
            onClick={closeMenu}
            className="font-sans text-[10px] tracking-[0.25em] uppercase text-accent-secondary"
          >
            {tLocale("toggle")}
          </Link>
          <button
            className="flex flex-col items-center justify-center gap-[5px] w-7 h-7"
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
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-40 bg-bg flex flex-col px-6 pt-20 pb-10"
          >
            <nav className="flex flex-col gap-5 flex-1" aria-label="Mobile navigation">
              {[{ key: "home" as const, href: "/" }, ...NAV_ITEMS].map(({ key, href }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.38, delay: i * 0.055, ease: EASE }}
                >
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="font-display text-3xl sm:text-4xl text-text hover:text-accent transition-colors duration-200 block py-1.5"
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="border-t border-accent-secondary/15 pt-5 flex items-end justify-between"
            >
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-text/25">
                Tirana · Albania · Est. 2010
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
