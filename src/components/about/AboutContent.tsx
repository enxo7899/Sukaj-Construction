"use client";

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

interface TimelineEntry {
  year: string;
  city: string;
  heading: string;
  body: string;
}

interface AboutContentProps {
  hero: { label: string; headline: string; subline: string };
  timelineLabel: string;
  t1995: TimelineEntry;
  t2010: TimelineEntry;
  dev: { label: string; headline: string; p1: string; p2: string; p3: string };
  sisterNote: string;
  cta: { headline: string; body: string; button: string };
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="border-t border-accent-secondary/20" />;
}

// ─── Page hero (text-only, no canvas) ────────────────────────────────────────
function PageHero({ label, headline, subline }: { label: string; headline: string; subline: string }) {
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
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">
            {label}
          </span>
          <div className="h-px w-8 bg-accent/35" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] text-text max-w-3xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-sans text-sm md:text-base text-text/45 mt-6 md:mt-8 leading-relaxed max-w-md"
        >
          {subline}
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Heritage timeline ────────────────────────────────────────────────────────
function Timeline({
  label,
  entries,
}: {
  label: string;
  entries: TimelineEntry[];
}) {
  return (
    <section className="px-6 md:px-14 py-16 md:py-24" aria-label="Company history">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-12 md:mb-16">
        <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">01</span>
        <div className="h-px w-8 bg-accent/35" />
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text/30">{label}</span>
      </div>

      {/* Timeline entries */}
      <div>
        {entries.map((entry, i) => (
          <motion.div
            key={entry.year}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className={`flex flex-col md:flex-row md:gap-0 ${
              i < entries.length - 1 ? "pb-12 md:pb-16" : ""
            }`}
          >
            {/* Year + city — left column */}
            <motion.div
              variants={fadeIn}
              className="md:w-52 flex-shrink-0 flex items-baseline gap-5 md:block mb-4 md:mb-0"
            >
              <p className="font-display text-5xl md:text-7xl text-text leading-none tabular-nums">
                {entry.year}
              </p>
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent mt-0 md:mt-3">
                {entry.city}
              </p>
            </motion.div>

            {/* Thin vertical accent — desktop only */}
            <div className="hidden md:block w-px bg-accent-secondary/25 self-stretch mx-10 flex-shrink-0" />

            {/* Content — right column */}
            <div className="flex-1 md:pt-1.5">
              <motion.h3
                variants={fadeUp}
                className="font-display text-xl md:text-2xl text-text mb-4"
              >
                {entry.heading}
              </motion.h3>
              <motion.p
                variants={fadeUp}
                className="font-sans text-sm md:text-base text-text/50 leading-relaxed max-w-lg"
              >
                {entry.body}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Developer positioning section ───────────────────────────────────────────
function DeveloperSection({
  label,
  headline,
  p1,
  p2,
  p3,
}: {
  label: string;
  headline: string;
  p1: string;
  p2: string;
  p3: string;
}) {
  return (
    <section className="px-6 md:px-14 py-16 md:py-28 bg-surface/30" aria-label="Developer approach">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Section label */}
        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-10 md:mb-14">
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">02</span>
          <div className="h-px w-8 bg-accent/35" />
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text/30">{label}</span>
        </motion.div>

        {/* Two-column layout: headline left, body right on desktop */}
        <div className="md:flex md:gap-16 lg:gap-24">
          <motion.h2
            variants={fadeUp}
            className="font-display text-[2rem] sm:text-4xl md:text-5xl leading-[1.06] text-text md:w-80 lg:w-96 flex-shrink-0 mb-10 md:mb-0"
          >
            {headline}
          </motion.h2>

          <div className="flex-1 space-y-5 md:pt-1">
            <motion.p
              variants={fadeUp}
              className="font-sans text-sm md:text-base text-text/55 leading-relaxed"
            >
              {p1}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-sans text-sm md:text-base text-text/55 leading-relaxed"
            >
              {p2}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-sans text-sm md:text-base text-text/55 leading-relaxed"
            >
              {p3}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Sister company note — quiet, low visual weight ───────────────────────────
function SisterNote({ note }: { note: string }) {
  return (
    <motion.div
      className="px-6 md:px-14 py-8 md:py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <p className="font-sans text-[11px] md:text-xs text-text/30 leading-relaxed max-w-md">
        {note}
      </p>
    </motion.div>
  );
}

// ─── Page CTA ─────────────────────────────────────────────────────────────────
function PageCta({ headline, body, button }: { headline: string; body: string; button: string }) {
  return (
    <section className="px-6 md:px-14 py-20 md:py-36" aria-label="Contact call to action">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-10 md:mb-14">
        <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">03</span>
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
export function AboutContent({
  hero,
  timelineLabel,
  t1995,
  t2010,
  dev,
  sisterNote,
  cta,
}: AboutContentProps) {
  return (
    <>
      <PageHero label={hero.label} headline={hero.headline} subline={hero.subline} />
      <Divider />
      <Timeline label={timelineLabel} entries={[t1995, t2010]} />
      <Divider />
      <DeveloperSection
        label={dev.label}
        headline={dev.headline}
        p1={dev.p1}
        p2={dev.p2}
        p3={dev.p3}
      />
      <SisterNote note={sisterNote} />
      <Divider />
      <PageCta headline={cta.headline} body={cta.body} button={cta.button} />
    </>
  );
}
