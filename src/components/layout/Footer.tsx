import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-accent-secondary/20 bg-bg px-6 md:px-10 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Left — wordmark + contact */}
        <div className="space-y-1">
          <p className="font-display text-sm tracking-[0.15em] uppercase text-text">
            Sukaj Construction
          </p>
          <p className="font-sans text-xs text-text/50">{t("contact")}</p>
        </div>

        {/* Right — legal + family note */}
        <div className="space-y-1 text-right">
          <p className="font-sans text-xs text-text/40">{t("nipt")}</p>
          <p className="font-sans text-xs text-text/40">{t("familyNote")}</p>
        </div>
      </div>
    </footer>
  );
}
