import { useTranslations, useLocale } from "next-intl";
import { projects } from "@/data/projects";
import { HeroWrapper } from "@/components/home/HeroWrapper";
import { HomeSections } from "@/components/home/HomeSections";
import { Preloader } from "@/components/home/Preloader";

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
      <Preloader wordmark="Sukaj Construction" />

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-bg"
        aria-label="Hero"
      >
        {/* Warm light atmosphere behind the monument — soft Mediterranean glow
            rising from the lower-right, plus a faint top vignette for depth. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 90% at 72% 38%, rgba(178,95,56,0.10) 0%, rgba(178,95,56,0.04) 30%, transparent 62%)," +
              "radial-gradient(100% 70% at 50% 0%, rgba(33,29,24,0.05) 0%, transparent 55%)",
          }}
        />

        {/* Canvas / SVG — fills the full section */}
        <HeroWrapper />

        {/* Hero text — pinned to bottom-left, always above canvas */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-14 pb-12 md:pb-20">
          {/* Gradient ensures legibility over any canvas state */}
          <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-bg via-bg/55 to-transparent pointer-events-none" />

          <div className="relative max-w-lg md:max-w-3xl">
            {/* Editorial kicker */}
            <div className="flex items-center gap-3 mb-5 md:mb-7">
              <span className="block h-px w-7 bg-accent/55" />
              <span className="font-sans text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-accent">
                {t("misc.sectionDeveloper")}
              </span>
            </div>

            <h1 className="font-display font-light text-[2.85rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.98] text-text">
              {t("hero.headline")}
            </h1>
            <p className="font-sans text-sm md:text-base text-text-soft mt-5 md:mt-7 tracking-wide max-w-md">
              {t("hero.subline")}
            </p>
          </div>
        </div>

        {/* Scroll cue — desktop only */}
        <div
          className="hidden md:flex absolute bottom-12 right-14 flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-text/35 [writing-mode:vertical-rl]">
            {t("misc.scroll")}
          </span>
          <span className="relative block w-px h-12 overflow-hidden bg-accent/15">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-accent/70 animate-[scrollcue_2.2s_ease-in-out_infinite]" />
          </span>
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
        misc={{
          sectionDeveloper: t("misc.sectionDeveloper"),
          sectionHeritage:  t("misc.sectionHeritage"),
          sectionInquire:   t("misc.sectionInquire"),
        }}
      />
    </>
  );
}
