import { useTranslations, useLocale } from "next-intl";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { HeroWrapper } from "@/components/home/HeroWrapper";
import { HomeSections } from "@/components/home/HomeSections";

const FEATURED_SLUGS = [
  "rezidenca-bardhe",
  "kodra-e-diellit",
  "shqiponja-residence",
  "selvia-tower",
];
const featuredProjects = FEATURED_SLUGS.map(
  (slug) => projects.find((p) => p.slug === slug)!
).filter(Boolean);

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-bg"
        aria-label="Hero"
      >
        {/* Canvas / SVG — fills the full section */}
        <HeroWrapper />

        {/* Top meta row — editorial coordinate label (renders immediately) */}
        <div className="absolute top-20 md:top-24 inset-x-0 z-10 px-6 md:px-14 flex items-center justify-between">
          <span className="eyebrow text-text/45">{t("hero.eyebrow")}</span>
          <span
            className="eyebrow text-text/30 hidden sm:block"
            aria-hidden="true"
          >
            41.33°N&nbsp;&nbsp;19.82°E
          </span>
        </div>

        {/* Hero text — pinned to bottom-left, always above canvas */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-14 pb-12 md:pb-16">
          {/* Gradient ensures legibility over any canvas state */}
          <div className="absolute inset-x-0 bottom-0 h-[28rem] bg-gradient-to-t from-bg via-bg/55 to-transparent pointer-events-none" />

          <div className="relative max-w-xl lg:max-w-2xl">
            <div className="flex items-center gap-3 mb-5 md:mb-7">
              <span className="h-px w-10 rule-bronze" />
              <span className="eyebrow text-accent">{t("hero.subline")}</span>
            </div>

            <h1 className="font-display text-display-xl text-text text-balance">
              {t("hero.headline")}
            </h1>

            <div className="mt-8 md:mt-10">
              <Link
                href="/contact"
                className="
                  group inline-flex items-center gap-3
                  eyebrow text-text
                  border border-accent/45 hover:border-accent
                  hover:bg-accent hover:text-bg
                  px-7 py-4
                  transition-colors duration-300
                "
              >
                {t("hero.cta")}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue — desktop only */}
        <div
          className="hidden md:flex absolute bottom-14 right-14 flex-col items-center gap-3 z-10"
          aria-hidden="true"
        >
          <span className="eyebrow text-text/30 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <div className="w-px h-12 bg-accent/25" />
        </div>
      </section>

      {/* ── 2–5: client shell — receives translated strings as props ──── */}
      <HomeSections
        positioning={{
          headline: t("positioning.headline"),
          body: t("positioning.body"),
        }}
        projects={{
          heading: t("projects.heading"),
          viewAll: t("projects.viewAll"),
          viewProject: t("projects.viewProject"),
        }}
        place={{
          label: t("place.label"),
          headline: t("place.headline"),
          body: t("place.body"),
          caption: t("place.caption"),
        }}
        credibility={{
          stat1Label: t("credibility.stat1Label"),
          stat1Value: t("credibility.stat1Value"),
          stat2Label: t("credibility.stat2Label"),
          stat2Value: t("credibility.stat2Value"),
          stat3Label: t("credibility.stat3Label"),
          stat3Value: t("credibility.stat3Value"),
          nipt: t("credibility.nipt"),
        }}
        cta={{
          label: t("cta.label"),
          headline: t("cta.headline"),
          body: t("cta.body"),
          button: t("cta.button"),
        }}
        featuredProjects={featuredProjects}
        locale={locale}
      />
    </>
  );
}
