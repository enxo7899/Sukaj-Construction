import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NAV_LINKS = [
  { key: "projects" as const, href: "/projects" },
  { key: "about"    as const, href: "/about"    },
  { key: "process"  as const, href: "/process"  },
  { key: "contact"  as const, href: "/contact"  },
];

export function Footer() {
  const t     = useTranslations("footer");
  const tNav  = useTranslations("nav");
  const tHome = useTranslations("home");
  const year  = new Date().getFullYear();

  return (
    <footer className="bg-bg">
      {/* Terracotta top rule */}
      <div className="h-px w-full bg-accent" />

      <div className="px-6 md:px-14 pt-14 md:pt-18 pb-10">
        {/* Top — wordmark block + nav + legal */}
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-10">

          {/* Wordmark + tagline + CTA */}
          <div className="col-span-12 lg:col-span-6">
            <p className="font-display text-[0.65rem] tracking-[0.28em] uppercase text-accent mb-1">
              Sukaj Construction
            </p>
            <p className="font-sans text-[0.65rem] tracking-[0.18em] uppercase text-text/35 mb-8">
              Residential Developer · Tirana
            </p>

            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-text leading-tight max-w-sm text-balance">
              {tHome("hero.headline")}
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 eyebrow text-accent hover:text-accent-deep transition-colors duration-200 mt-7"
            >
              {t("contact")}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="col-span-6 lg:col-span-3" aria-label="Footer navigation">
            <p className="eyebrow text-text/35 mb-5">Index</p>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-text/55 hover:text-accent transition-colors duration-200"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal / trust */}
          <div className="col-span-6 lg:col-span-3">
            <p className="eyebrow text-text/35 mb-5">Registry</p>
            <div className="space-y-3">
              <p className="font-sans text-sm text-text/55">{t("nipt")}</p>
              <p className="font-sans text-xs text-text/30 leading-relaxed">{t("leje")}</p>
            </div>
          </div>
        </div>

        {/* Thin mid-rule */}
        <div className="border-t border-accent-secondary/12 mt-12 md:mt-16" />

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="eyebrow text-text/30">{t("familyNote")}</p>
          <p className="eyebrow text-text/22">© {year} Sukaj Construction</p>
        </div>
      </div>
    </footer>
  );
}
