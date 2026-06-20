"use client";

// Sections 2–5 of the homepage.
// Lives in a Client Component so Framer Motion scroll-triggered reveals work.
// All translated strings arrive as props from the Server Component (page.tsx).

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/data/projects";

// Shared fade-up variant used across sections
const EASE = [0.25, 0, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// ─── Types ─────────────────────────────────────────────────────────────────────
interface HomeSectionsProps {
  positioning: { headline: string; body: string };
  projects: { heading: string; viewAll: string; viewProject: string };
  credibility: {
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    stat3Label: string;
    stat3Value: string;
    nipt: string;
  };
  cta: { headline: string; body: string; button: string };
  featuredProjects: Project[];
  locale: string;
}

// ─── Section 2: Positioning statement ─────────────────────────────────────────
function PositioningSection({
  headline,
  body,
}: {
  headline: string;
  body: string;
}) {
  return (
    <section
      className="py-20 md:py-44 px-6 md:px-14 max-w-5xl"
      aria-label="Positioning statement"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20px" }}
      >
        <motion.p
          variants={fadeUp}
          className="font-sans text-xs tracking-[0.25em] uppercase text-accent mb-8"
        >
          Developer · Tirana
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-text max-w-3xl"
        >
          {headline}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="font-sans text-base md:text-lg text-text/60 mt-8 max-w-xl leading-relaxed"
        >
          {body}
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Section 3: Featured projects ──────────────────────────────────────────────
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
      className="py-16 md:py-28 px-6 md:px-14 border-t border-accent-secondary/15"
      aria-label="Featured projects"
    >
      {/* Section header */}
      <motion.div
        className="flex items-end justify-between mb-12 md:mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-2xl md:text-3xl text-text">
          {heading}
        </h2>
        <Link
          href="/projects"
          className="font-sans text-xs tracking-widest uppercase text-accent hover:text-accent-deep transition-colors duration-200 hidden md:block"
        >
          {viewAll} →
        </Link>
      </motion.div>

      {/* Project grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {featuredProjects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            locale={locale}
          />
        ))}
      </div>

      {/* Mobile "view all" link */}
      <motion.div
        className="mt-10 md:hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link
          href="/projects"
          className="font-sans text-xs tracking-widest uppercase text-accent"
        >
          {viewAll} →
        </Link>
      </motion.div>
    </section>
  );
}

// ─── Section 4: Credibility / trust strip ──────────────────────────────────────
function CredibilityStrip({
  stat1Label,
  stat1Value,
  stat2Label,
  stat2Value,
  stat3Label,
  stat3Value,
  nipt,
}: {
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  stat3Label: string;
  stat3Value: string;
  nipt: string;
}) {
  const stats = [
    { label: stat1Label, value: stat1Value },
    { label: stat2Label, value: stat2Value },
    { label: stat3Label, value: stat3Value },
  ];

  return (
    <section
      className="py-14 md:py-20 px-6 md:px-14 border-t border-accent-secondary/15 bg-surface/40"
      aria-label="Credibility"
    >
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-0"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10px" }}
      >
        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
          {stats.map(({ label, value }) => (
            <motion.div key={label} variants={fadeUp}>
              <p className="font-display text-3xl md:text-4xl text-text">
                {value}
              </p>
              <p className="font-sans text-xs tracking-widest uppercase text-text/50 mt-1">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* NIPT — quiet legitimacy signal for Albanian buyers */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-xs tracking-widest uppercase text-text/30"
        >
          {nipt}
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Section 5: Soft closing CTA ───────────────────────────────────────────────
function CtaSection({
  headline,
  body,
  button,
}: {
  headline: string;
  body: string;
  button: string;
}) {
  return (
    <section
      className="py-20 md:py-44 px-6 md:px-14 border-t border-accent-secondary/15"
      aria-label="Contact call to action"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20px" }}
        className="max-w-xl"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-3xl md:text-5xl leading-[1.1] text-text"
        >
          {headline}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="font-sans text-base text-text/60 mt-6 leading-relaxed"
        >
          {body}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10">
          <Link
            href="/contact"
            className="inline-block font-sans text-xs tracking-[0.2em] uppercase text-bg bg-accent hover:bg-accent-deep px-8 py-4 transition-colors duration-300"
          >
            {button}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Composed export ───────────────────────────────────────────────────────────
export function HomeSections({
  positioning,
  projects,
  credibility,
  cta,
  featuredProjects,
  locale,
}: HomeSectionsProps) {
  return (
    <>
      <PositioningSection
        headline={positioning.headline}
        body={positioning.body}
      />
      <ProjectsSection
        heading={projects.heading}
        viewAll={projects.viewAll}
        viewProject={projects.viewProject}
        featuredProjects={featuredProjects}
        locale={locale}
      />
      <CredibilityStrip
        stat1Label={credibility.stat1Label}
        stat1Value={credibility.stat1Value}
        stat2Label={credibility.stat2Label}
        stat2Value={credibility.stat2Value}
        stat3Label={credibility.stat3Label}
        stat3Value={credibility.stat3Value}
        nipt={credibility.nipt}
      />
      <CtaSection
        headline={cta.headline}
        body={cta.body}
        button={cta.button}
      />
    </>
  );
}
