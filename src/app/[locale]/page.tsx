import { useTranslations, useLocale } from "next-intl";
import { projects } from "@/data/projects";
import { HeroWrapper } from "@/components/home/HeroWrapper";
import { HomeSections } from "@/components/home/HomeSections";

// Featured projects — first 4 completed entries
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
      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      {/* Text is SSR'd immediately. Canvas is lazy-inited client-side.        */}
      <section
        className="relative w-full h-screen flex flex-col items-start justify-end pb-12 md:pb-16 px-6 md:px-14 overflow-hidden"
        aria-label="Hero"
      >
        {/* 3D canvas — lazy, client-only, falls back on mobile / reduced-motion */}
        <HeroWrapper />

        {/* Text always renders above the canvas */}
        <div className="relative z-10 max-w-xl">
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-accent mb-4">
            Sukaj Construction
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[1.05] text-text">
            {t("hero.headline")}
          </h1>
          <p className="font-sans text-sm md:text-base text-text/60 mt-4 tracking-wide">
            {t("hero.subline")}
          </p>
        </div>

        {/* Scroll indicator — desktop only */}
        <div
          className="hidden md:flex absolute bottom-8 right-14 flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-text/30 [writing-mode:vertical-rl]">
            scroll
          </span>
          <div className="w-px h-12 bg-accent/30" />
        </div>
      </section>

      {/* ── 2–5: client shell receives translated strings as props ──────────── */}
      {/* Keeps page.tsx a Server Component while Framer Motion runs client-side */}
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
