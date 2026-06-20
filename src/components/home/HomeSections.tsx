"use client";

// Sections 2–5 of the homepage — Client Component so Framer Motion works.
// Translated strings arrive as props from the Server Component (page.tsx).
// GSAP is reserved for the hero; Framer Motion drives everything here.

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/data/projects";

const EASE = [0.25, 0, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.65, ease: EASE } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface HomeSectionsProps {
  positioning:  { headline: string; body: string };
  projects:     { heading: string; viewAll: string; viewProject: string };
  credibility:  {
    stat1Label: string; stat1Value: string;
    stat2Label: string; stat2Value: string;
    stat3Label: string; stat3Value: string;
    nipt: string;
  };
  cta:          { headline: string; body: string; button: string };
  featuredProjects: Project[];
  locale: string;
}

// ─── Section divider ──────────────────────────────────────────────────────────
function Divider() {
  return <div className="border-t border-accent-secondary/20" />;
}

// ─── Section 2: Positioning statement ────────────────────────────────────────
function PositioningSection({ headline, body }: { headline: string; body: string }) {
  return (
    <section
      className="px-6 md:px-14 py-20 md:py-32"
      aria-label="Positioning statement"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Section label */}
        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-10 md:mb-14">
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">01</span>
          <div className="h-px w-8 bg-accent/35" />
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text/30">Developer · Tirana</span>
        </motion.div>

        {/* Headline — unconstrained so it fills the column naturally */}
        <motion.h2
          variants={fadeUp}
          className="font-display text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] text-text max-w-5xl"
        >
          {headline}
        </motion.h2>

        {/* Body — offset to the right half on desktop */}
        <motion.div
          variants={fadeUp}
          className="mt-10 md:mt-14 md:flex md:justify-end"
        >
          <p className="font-sans text-sm md:text-base text-text/50 leading-relaxed max-w-md">
            {body}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Section 3: Featured projects ─────────────────────────────────────────────
function ProjectsSection({
  heading,
  viewAll,
  viewProject,
  featuredProjects,
  locale,
}: {
  heading: string;
  viewAll: string;
  viewProject: string;
  featuredProjects: Project[];
  locale: string;
}) {
  return (
    <section
      className="px-6 md:px-14 py-14 md:py-20"
      aria-label="Featured projects"
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-10 md:mb-14">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">02</span>
          <div className="h-px w-8 bg-accent/35" />
          <h2 className="font-display text-xl md:text-2xl text-text">{heading}</h2>
        </div>
        <Link
          href="/projects"
          className="font-sans text-[9px] tracking-widest uppercase text-accent hover:text-accent-deep transition-colors duration-200 hidden md:block"
        >
          {viewAll} →
        </Link>
      </div>

      {/* 2-column grid — large cards with real visual presence */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 lg:gap-12"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {featuredProjects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            locale={locale}
            viewProject={viewProject}
          />
        ))}
      </motion.div>

      {/* Mobile "view all" */}
      <motion.div
        className="mt-10 sm:hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          href="/projects"
          className="font-sans text-[9px] tracking-widest uppercase text-accent"
        >
          {viewAll} →
        </Link>
      </motion.div>
    </section>
  );
}

// ─── Section 4: Credibility / trust strip ────────────────────────────────────
function CredibilityStrip({
  stat1Label, stat1Value,
  stat2Label, stat2Value,
  stat3Label, stat3Value,
  nipt,
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
    <section
      className="px-6 md:px-14 py-14 md:py-20 bg-surface/35"
      aria-label="Credibility"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-10 md:mb-14">
        <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">03</span>
        <div className="h-px w-8 bg-accent/35" />
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text/30">Heritage</span>
      </div>

      <motion.div
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 md:gap-0"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-10 md:gap-0">
          {stats.map(({ label, value }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className={`md:pr-16 md:mr-16 ${
                i < stats.length - 1
                  ? "md:border-r md:border-accent-secondary/20"
                  : ""
              }`}
            >
              <p className="font-display text-5xl md:text-6xl text-text leading-none tracking-tight">
                {value}
              </p>
              <p className="font-sans text-[9px] tracking-widest uppercase text-text/40 mt-3">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* NIPT */}
        <motion.p
          variants={fadeIn}
          className="font-sans text-[9px] tracking-widest uppercase text-text/22 md:text-right"
        >
          {nipt}
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Section 5: Soft CTA ─────────────────────────────────────────────────────
function CtaSection({ headline, body, button }: { headline: string; body: string; button: string }) {
  return (
    <section
      className="px-6 md:px-14 py-20 md:py-36"
      aria-label="Contact call to action"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-10 md:mb-14">
        <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">04</span>
        <div className="h-px w-8 bg-accent/35" />
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text/30">Inquire</span>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-[2.2rem] sm:text-5xl md:text-6xl leading-[1.04] text-text max-w-2xl"
        >
          {headline}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-sans text-sm md:text-base text-text/45 mt-7 md:mt-9 leading-relaxed max-w-xs md:max-w-sm"
        >
          {body}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 md:mt-12">
          <Link
            href="/contact"
            className="
              inline-flex items-center gap-4
              font-sans text-[9px] tracking-[0.24em] uppercase
              bg-accent hover:bg-accent-deep text-bg
              px-8 py-4
              transition-colors duration-300
            "
          >
            {button}
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Composed export ──────────────────────────────────────────────────────────
export function HomeSections({
  positioning, projects, credibility, cta, featuredProjects, locale,
}: HomeSectionsProps) {
  return (
    <>
      <Divider />
      <PositioningSection
        headline={positioning.headline}
        body={positioning.body}
      />
      <Divider />
      <ProjectsSection
        heading={projects.heading}
        viewAll={projects.viewAll}
        viewProject={projects.viewProject}
        featuredProjects={featuredProjects}
        locale={locale}
      />
      <Divider />
      <CredibilityStrip
        stat1Label={credibility.stat1Label}
        stat1Value={credibility.stat1Value}
        stat2Label={credibility.stat2Label}
        stat2Value={credibility.stat2Value}
        stat3Label={credibility.stat3Label}
        stat3Value={credibility.stat3Value}
        nipt={credibility.nipt}
      />
      <Divider />
      <CtaSection
        headline={cta.headline}
        body={cta.body}
        button={cta.button}
      />
    </>
  );
}
