import { useTranslations, useLocale } from "next-intl";
import { projects } from "@/data/projects";
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
        className="relative w-full h-[100svh] min-h-[580px] overflow-hidden bg-bg"
        aria-label="Hero"
      >
        {/* Canvas / SVG — fills the full section */}
        <HeroWrapper />

        {/* Hero text — pinned to bottom-left, always above canvas */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-14 pb-10 md:pb-16">
          {/* Gradient ensures legibility over any canvas state */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bg/85 via-bg/40 to-transparent pointer-events-none" />

          <div className="relative max-w-lg md:max-w-2xl">
            <h1 className="font-display text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] leading-[1.02] text-text">
              {t("hero.headline")}
            </h1>
            <p className="font-sans text-xs md:text-sm text-text/50 mt-4 md:mt-5 tracking-wide">
              {t("hero.subline")}
            </p>
          </div>
        </div>

        {/* Scroll cue — desktop only */}
        <div
          className="hidden md:flex absolute bottom-10 right-14 flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text/30 [writing-mode:vertical-rl]">
            scroll
          </span>
          <div className="w-px h-10 bg-accent/20" />
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
