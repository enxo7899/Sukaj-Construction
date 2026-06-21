"use client";

// Sections 2–6 of the homepage — Client Component so Framer Motion works.
// Translated strings arrive as props from the Server Component (page.tsx).
// GSAP is reserved for the hero; Framer Motion drives everything here.

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/data/projects";

const EASE = [0.25, 0, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface HomeSectionsProps {
  positioning: { headline: string; body: string };
  projects: { heading: string; viewAll: string; viewProject: string };
  place: { label: string; headline: string; body: string; caption: string };
  credibility: {
    stat1Label: string; stat1Value: string;
    stat2Label: string; stat2Value: string;
    stat3Label: string; stat3Value: string;
    nipt: string;
  };
  cta: { label: string; headline: string; body: string; button: string };
  featuredProjects: Project[];
  locale: string;
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ index, title, dark = false }: { index: string; title: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="eyebrow text-accent">{index}</span>
      <span className={`h-px w-8 ${dark ? "bg-bg/25" : "rule-bronze"}`} />
      <span className={`eyebrow ${dark ? "text-bg/45" : "text-text/35"}`}>{title}</span>
    </div>
  );
}

function Divider() {
  return <div className="mx-6 md:mx-14 border-t border-accent-secondary/15" />;
}

// ─── Section 01: Positioning ─────────────────────────────────────────────────
function PositioningSection({ headline, body }: { headline: string; body: string }) {
  return (
    <section className="px-6 md:px-14 py-24 md:py-40" aria-label="Positioning statement">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
        <motion.div variants={fadeIn} className="mb-12 md:mb-20">
          <SectionLabel index="01" title="Developer · Tirana" />
        </motion.div>

        {/* Offset editorial layout: headline left-wide, body lower-right */}
        <div className="grid grid-cols-12 gap-y-10">
          <motion.h2
            variants={fadeUp}
            className="col-span-12 lg:col-span-10 font-display text-display-lg text-text text-balance"
          >
            {headline}
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="col-span-12 md:col-span-7 lg:col-span-5 lg:col-start-8 md:justify-self-end mt-2 md:mt-6"
          >
            <p className="font-sans text-base md:text-lg text-text/55 leading-relaxed text-pretty">
              {body}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8">
              {["Land", "Design", "Build", "Handover"].map((step, i) => (
                <span key={step} className="eyebrow text-text/40">
                  <span className="text-accent mr-1.5">0{i + 1}</span>
                  {step}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Section 02: Featured projects (asymmetric 12-col) ───────────────────────
function ProjectsSection({
  heading, viewAll, viewProject, featuredProjects, locale,
}: {
  heading: string; viewAll: string; viewProject: string;
  featuredProjects: Project[]; locale: string;
}) {
  // Desktop placement: 7/5 then 5/7, with a vertical offset for rhythm.
  const placement = [
    "lg:col-span-7",
    "lg:col-span-5 lg:mt-24",
    "lg:col-span-5",
    "lg:col-span-7 lg:-mt-24",
  ];
  const ratios: Array<"portrait" | "landscape"> = ["portrait", "portrait", "portrait", "portrait"];

  return (
    <section className="px-6 md:px-14 py-20 md:py-28" aria-label="Featured projects">
      <div className="flex items-end justify-between mb-12 md:mb-16">
        <div className="space-y-4">
          <SectionLabel index="02" title="Selected work" />
          <h2 className="font-display text-display-md text-text">{heading}</h2>
        </div>
        <Link
          href="/projects"
          className="group hidden md:inline-flex items-center gap-2 eyebrow text-accent hover:text-accent-deep transition-colors duration-200 pb-2"
        >
          {viewAll}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 md:gap-x-12 gap-y-14 md:gap-y-16"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {featuredProjects.map((project, i) => (
          <div key={project.slug} className={placement[i % placement.length]}>
            <ProjectCard
              project={project}
              index={i}
              locale={locale}
              viewProject={viewProject}
              ratio={ratios[i % ratios.length]}
            />
          </div>
        ))}
      </motion.div>

      <motion.div
        className="mt-14 md:hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Link href="/projects" className="eyebrow text-accent">
          {viewAll} →
        </Link>
      </motion.div>
    </section>
  );
}

// ─── Tirana linework — abstract topographic contours ─────────────────────────
function TiranaLinework() {
  return (
    <svg
      viewBox="0 0 600 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tir-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A98F6E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#A98F6E" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="tir-sun" cx="74%" cy="26%" r="40%">
          <stop offset="0%" stopColor="#B96A43" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#B96A43" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="600" height="460" fill="url(#tir-sun)" />

      {/* Topographic hillside contour lines — Dajti ridge abstraction */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const y = 150 + i * 34;
        const amp = 26 + i * 6;
        return (
          <path
            key={i}
            d={`M-10 ${y} C 120 ${y - amp}, 230 ${y + amp * 0.6}, 340 ${y - amp * 0.4} S 520 ${y + amp}, 610 ${y - amp * 0.5}`}
            stroke="url(#tir-fade)"
            strokeWidth="1"
            fill="none"
          />
        );
      })}

      {/* Sun / origin point above the ridge */}
      <circle cx="444" cy="120" r="42" stroke="#B96A43" strokeWidth="1.2" strokeOpacity="0.45" fill="none" />
      <circle cx="444" cy="120" r="3" fill="#B96A43" fillOpacity="0.7" />

      {/* A single marked site — the "new address" */}
      <line x1="300" y1="120" x2="300" y2="250" stroke="#8C421F" strokeWidth="1.4" strokeOpacity="0.55" />
      <path d="M292 132 L300 120 L308 132" stroke="#8C421F" strokeWidth="1.4" strokeOpacity="0.55" fill="none" />
      <circle cx="300" cy="250" r="4.5" stroke="#8C421F" strokeWidth="1.4" fill="#FAF6EE" />
    </svg>
  );
}

// ─── Section 03: Tirana / place ──────────────────────────────────────────────
function PlaceSection({ label, headline, body, caption }: { label: string; headline: string; body: string; caption: string }) {
  return (
    <section className="px-6 md:px-14 py-20 md:py-28 bg-surface/40" aria-label="Tirana">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-12 gap-y-12 md:gap-x-12 items-center"
      >
        <div className="col-span-12 lg:col-span-5">
          <motion.div variants={fadeIn} className="mb-8 md:mb-10">
            <SectionLabel index="03" title={label} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-display-md text-text text-balance">
            {headline}
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-base md:text-lg text-text/55 leading-relaxed mt-8 max-w-md text-pretty">
            {body}
          </motion.p>
          <motion.p variants={fadeIn} className="eyebrow text-text/35 mt-10">
            {caption}
          </motion.p>
        </div>

        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-6 lg:col-start-7">
          <TiranaLinework />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Section 04: Credibility / heritage ──────────────────────────────────────
function CredibilityStrip({
  stat1Label, stat1Value, stat2Label, stat2Value, stat3Label, stat3Value, nipt,
}: {
  stat1Label: string; stat1Value: string;
  stat2Label: string; stat2Value: string;
  stat3Label: string; stat3Value: string;
  nipt: string;
}) {
  const stats = [
    { label: stat1Label, value: stat1Value },
    { label: stat2Label, value: stat2Value },
    { label: stat3Label, value: stat3Value },
  ];

  return (
    <section className="px-6 md:px-14 py-20 md:py-28" aria-label="Credibility">
      <div className="mb-12 md:mb-16">
        <SectionLabel index="04" title="Heritage" />
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {stats.map(({ label, value }, i) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className={`md:px-10 ${i === 0 ? "md:pl-0" : ""} ${i < stats.length - 1 ? "md:border-r md:border-accent-secondary/20" : ""}`}
          >
            <p className="eyebrow text-text/40 mb-4">{label}</p>
            <p className="font-display text-6xl md:text-7xl text-text leading-none">
              {value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="eyebrow text-text/25 mt-14"
      >
        {nipt}
      </motion.p>
    </section>
  );
}

// ─── Section 05: Dark inverted CTA ───────────────────────────────────────────
function CtaSection({ label, headline, body, button }: { label: string; headline: string; body: string; button: string }) {
  return (
    <section className="mt-8 md:mt-12" aria-label="Contact call to action">
      <div className="bg-text text-bg px-6 md:px-14 py-24 md:py-40 relative overflow-hidden">
        {/* Soft terracotta glow */}
        <div
          className="absolute -top-1/3 right-0 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(185,106,67,0.22) 0%, transparent 62%)" }}
          aria-hidden="true"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative"
        >
          <motion.div variants={fadeIn} className="mb-12 md:mb-16">
            <SectionLabel index="05" title={label} dark />
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-display text-display-lg text-bg text-balance max-w-4xl">
            {headline}
          </motion.h2>

          <motion.p variants={fadeUp} className="font-sans text-base md:text-lg text-bg/55 mt-8 md:mt-10 leading-relaxed max-w-md text-pretty">
            {body}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 md:mt-14">
            <Link
              href="/contact"
              className="
                group inline-flex items-center gap-4
                eyebrow text-bg
                border border-accent hover:bg-accent
                px-8 py-4
                transition-colors duration-300
              "
            >
              {button}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Composed export ──────────────────────────────────────────────────────────
export function HomeSections({
  positioning, projects, place, credibility, cta, featuredProjects, locale,
}: HomeSectionsProps) {
  return (
    <>
      <Divider />
      <PositioningSection headline={positioning.headline} body={positioning.body} />
      <Divider />
      <ProjectsSection
        heading={projects.heading}
        viewAll={projects.viewAll}
        viewProject={projects.viewProject}
        featuredProjects={featuredProjects}
        locale={locale}
      />
      <PlaceSection label={place.label} headline={place.headline} body={place.body} caption={place.caption} />
      <CredibilityStrip
        stat1Label={credibility.stat1Label} stat1Value={credibility.stat1Value}
        stat2Label={credibility.stat2Label} stat2Value={credibility.stat2Value}
        stat3Label={credibility.stat3Label} stat3Value={credibility.stat3Value}
        nipt={credibility.nipt}
      />
      <CtaSection label={cta.label} headline={cta.headline} body={cta.body} button={cta.button} />
    </>
  );
}
