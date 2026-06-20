import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NAV_LINKS = [
  { key: "projects" as const, href: "/projects" },
  { key: "about"    as const, href: "/about" },
  { key: "process"  as const, href: "/process" },
  { key: "contact"  as const, href: "/contact" },
];

export function Footer() {
  const t    = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-accent-secondary/15 bg-bg px-6 md:px-10 py-10 md:py-14">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 md:gap-0">

        {/* Left — wordmark + nav */}
        <div className="space-y-4">
          <p className="font-display text-[0.7rem] tracking-[0.22em] uppercase text-text">
            Sukaj Construction
          </p>

          <nav className="flex flex-wrap gap-x-5 gap-y-1.5" aria-label="Footer navigation">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="font-sans text-[10px] tracking-widest uppercase text-text/40 hover:text-accent transition-colors duration-200"
              >
                {tNav(key)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right — contact + legal + trust */}
        <div className="space-y-2 md:text-right">
          <p className="font-sans text-[10px] text-text/40">
            {t("contact")}
          </p>
          <p className="font-sans text-[10px] text-text/28">
            {t("nipt")}
          </p>
          {/* Leje Ndërtimi — §7 trust signal, per-project permit reference */}
          <p className="font-sans text-[10px] text-text/22">
            {t("leje")}
          </p>
          {/* Sister company — quiet, same tone as About page */}
          <p className="font-sans text-[10px] text-text/18 mt-1">
            {t("familyNote")}
          </p>
        </div>

      </div>
    </footer>
  );
}
