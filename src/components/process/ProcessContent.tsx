"use client";

// PLACEHOLDER: confirm construction licence category (NP-2 structural construction,
// NP-3 reconstruction/facade, NP-7 water/drainage) before adding it to copy.
// PLACEHOLDER: confirm ceiling height guarantee per-project (referenced as 2.8m minimum).

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

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

interface Stage {
  number: string;
  heading: string;
  paragraphs: string[];
}

interface ProcessContentProps {
  hero: { label: string; headline: string; intro: string };
  stages: Stage[];
  cta: { headline: string; body: string; button: string };
  sectionInquire: string;
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="border-t border-accent-secondary/20" />;
}

// ─── Page hero ────────────────────────────────────────────────────────────────
function PageHero({ label, headline, intro }: { label: string; headline: string; intro: string }) {
  return (
    <section
      className="px-6 md:px-14 pt-32 md:pt-44 pb-16 md:pb-24"
      aria-label="Page header"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8 md:mb-12">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent">
            {label}
          </span>
          <div className="h-px w-10 bg-accent/40" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display font-light text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.0] text-text max-w-3xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-sans text-sm md:text-base text-text-soft mt-6 md:mt-8 leading-relaxed max-w-md"
        >
          {intro}
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Single process stage ─────────────────────────────────────────────────────
function ProcessStage({ number, heading, paragraphs }: Stage) {
  return (
    <section
      className="px-6 md:px-14 py-14 md:py-20"
      aria-label={`Stage ${number}: ${heading}`}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="md:flex md:gap-16 lg:gap-24"
      >
        {/* Left: number + heading */}
        <div className="md:w-72 lg:w-80 flex-shrink-0 mb-8 md:mb-0">
          <motion.p
            variants={fadeIn}
            className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-4"
          >
            {number}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-2xl md:text-4xl lg:text-5xl leading-[1.06] text-text"
          >
            {heading}
          </motion.h2>
        </div>

        {/* Right: body paragraphs */}
        <div className="flex-1 space-y-5 md:pt-1">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="font-sans text-sm md:text-base text-text-soft leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page CTA ─────────────────────────────────────────────────────────────────
function PageCta({ headline, body, button, sectionLabel }: { headline: string; body: string; button: string; sectionLabel: string }) {
  return (
    <section className="px-6 md:px-14 py-20 md:py-36" aria-label="Contact call to action">
      <div className="flex items-center gap-3 mb-10 md:mb-14">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent">05</span>
        <div className="h-px w-10 bg-accent/40" />
        <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-text-soft">{sectionLabel}</span>
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
          className="font-sans text-sm md:text-base text-text-soft mt-7 md:mt-9 leading-relaxed max-w-xs md:max-w-sm"
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
export function ProcessContent({ hero, stages, cta, sectionInquire }: ProcessContentProps) {
  return (
    <>
      <PageHero label={hero.label} headline={hero.headline} intro={hero.intro} />
      {stages.map((stage) => (
        <div key={stage.number}>
          <Divider />
          <ProcessStage
            number={stage.number}
            heading={stage.heading}
            paragraphs={stage.paragraphs}
          />
        </div>
      ))}
      <Divider />
      <PageCta headline={cta.headline} body={cta.body} button={cta.button} sectionLabel={sectionInquire} />
    </>
  );
}
