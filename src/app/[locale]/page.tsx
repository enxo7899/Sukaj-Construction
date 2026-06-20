import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("nav");

  return (
    <section className="flex items-center justify-center min-h-[60vh] px-6">
      <p className="font-display text-2xl text-accent-secondary">
        {/* Homepage hero content — next phase */}
        Sukaj Construction · {t("home")}
      </p>
    </section>
  );
}
