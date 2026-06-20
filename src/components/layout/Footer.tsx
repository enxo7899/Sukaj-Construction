import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-accent-secondary/15 bg-bg px-6 md:px-10 py-10 md:py-12">
      <div className="max-w-none flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-0">

        {/* Left — wordmark + nav shortcuts */}
        <div className="space-y-3">
          <p className="font-display text-[0.7rem] tracking-[0.22em] uppercase text-text">
            Sukaj Construction
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {[
              { label: "Projects", href: "/projects" },
              { label: "About",    href: "/about" },
              { label: "Process",  href: "/process" },
              { label: "Contact",  href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-sans text-[10px] tracking-widest uppercase text-text/40 hover:text-accent transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right — legal / family note */}
        <div className="space-y-1.5 md:text-right">
          <p className="font-sans text-[10px] text-text/35">{t("contact")}</p>
          <p className="font-sans text-[10px] text-text/30">{t("nipt")}</p>
          <p className="font-sans text-[10px] text-text/25">{t("familyNote")}</p>
        </div>

      </div>
    </footer>
  );
}
