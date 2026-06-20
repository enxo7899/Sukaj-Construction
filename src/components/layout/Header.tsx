"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
  { key: "home" as const, href: "/" },
  { key: "about" as const, href: "/about" },
  { key: "projects" as const, href: "/projects" },
  { key: "process" as const, href: "/process" },
  { key: "contact" as const, href: "/contact" },
];

const EASE = [0.25, 0, 0, 1] as const;

const menuVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.25, ease: EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: EASE },
  },
};

export function Header() {
  const t = useTranslations("nav");
  const tLocale = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const oppositeLocale = locale === "en" ? "sq" : "en";

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 bg-bg/90 backdrop-blur-sm border-b border-accent-secondary/20">
        {/* Wordmark */}
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display text-sm tracking-[0.2em] uppercase text-text hover:text-accent transition-colors"
        >
          Sukaj Construction
        </Link>

        {/* Desktop nav */}
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

        {/* Desktop locale toggle */}
        <Link
          href={pathname}
          locale={oppositeLocale}
          className="hidden md:block font-sans text-xs tracking-widest uppercase text-accent-secondary hover:text-accent transition-colors"
        >
          {tLocale("toggle")}
        </Link>

        {/* Mobile: hamburger button */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-[5px] w-8 h-8"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <motion.span
            className="block w-5 h-px bg-text origin-center"
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
          />
          <motion.span
            className="block w-5 h-px bg-text"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-5 h-px bg-text origin-center"
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
          />
        </button>
      </header>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center pb-16 pt-16"
          >
            <nav className="flex flex-col items-center gap-8 mb-12">
              {NAV_ITEMS.map(({ key, href }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                >
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="font-display text-4xl text-text hover:text-accent transition-colors duration-200"
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Locale toggle at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: NAV_ITEMS.length * 0.07, ease: EASE }}
            >
              <Link
                href={pathname}
                locale={oppositeLocale}
                onClick={closeMenu}
                className="font-sans text-xs tracking-[0.25em] uppercase text-accent-secondary hover:text-accent transition-colors"
              >
                {tLocale("toggle")}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
