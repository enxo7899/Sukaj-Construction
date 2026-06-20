"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";

const EASE = [0.25, 0, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

// Palette — hardcoded so values work inside SVG defs
const C = {
  bg:      "#FAF6EE",
  surface: "#EFE4D5",
  accent:  "#B96A43",
  bronze:  "#A98F6E",
  muted:   "#4E5340",
};

// ─── Types ────────────────────────────────────────────────────────────────────

type GalleryTab = "exteriors" | "interiors" | "materials";

interface UiStrings {
  backToAll: string;
  sectionFacts: string;
  sectionNarrative: string;
  sectionLocation: string;
  sectionSensory: string;
  sectionGallery: string;
  tabExteriors: string;
  tabInteriors: string;
  tabMaterials: string;
  labelLocation: string;
  labelYear: string;
  labelTypology: string;
  labelUnits: string;
  labelStatus: string;
  indicativeRender: string;
  photosFollow: string;
  ctaHeadline: string;
  ctaBody: string;
  ctaButton: string;
  statusCompleted: string;
  statusConstruction: string;
  statusPlanned: string;
}

interface CaseStudyProps {
  project: Project;
  ui: UiStrings;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusLabel(status: Project["status"], ui: UiStrings): string {
  if (status === "completed") return ui.statusCompleted;
  if (status === "under-construction") return ui.statusConstruction;
  return ui.statusPlanned;
}

function Divider() {
  return <div className="border-t border-accent-secondary/20" />;
}

// ─── Hero building SVG (architectural line-to-solid sketch) ──────────────────
function CaseStudyBuildingSvg({ index }: { index: number }) {
  // Four distinct massing variants — same palette as HeroFallback
  const configs = [
    { podium: [14, 392, 132, 38], body: [30, 178, 100, 218], upper: [48, 82, 64, 100], crown: [60, 34, 40, 50] },
    { podium: [20, 400, 120, 30], body: [38, 100, 84, 304], upper: [50, 52, 60, 52],  crown: [62, 12, 36, 42] },
    { podium: [8,  380, 144, 50], body: [24, 174, 112, 210], upper: [42, 72, 76, 104], crown: [58, 24, 44, 50] },
    { podium: [18, 388, 124, 42], body: [36, 160, 88, 232],  upper: [50, 64, 60, 98],  crown: [64, 18, 32, 48] },
  ] as const;

  const cfg = configs[index % 4];
  const id = `cs-${index}`;

  return (
    <svg
      viewBox="0 0 160 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-auto"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`sky-${id}`} cx="50%" cy="20%" r="72%">
          <stop offset="0%"   stopColor={C.bg} />
          <stop offset="100%" stopColor={C.surface} />
        </radialGradient>
        <radialGradient id={`win-${id}`} cx="50%" cy="55%" r="65%">
          <stop offset="0%"   stopColor={C.accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="160" height="440" fill={`url(#sky-${id})`} />

      {/* Crown */}
      <rect x={cfg.crown[0]} y={cfg.crown[1]} width={cfg.crown[2]} height={cfg.crown[3]}
        fill={C.surface} fillOpacity="0.45" stroke={C.accent} strokeWidth="0.8" />

      {/* Upper volume */}
      <rect x={cfg.upper[0]} y={cfg.upper[1]} width={cfg.upper[2]} height={cfg.upper[3]}
        fill={C.surface} fillOpacity="0.5" stroke={C.accent} strokeWidth="0.8" />
      {[cfg.upper[1]+14, cfg.upper[1]+36, cfg.upper[1]+58, cfg.upper[1]+80].filter(y => y < cfg.upper[1]+cfg.upper[3]).map((wy) =>
        [cfg.upper[0]+8, cfg.upper[0]+cfg.upper[2]-22].map((wx) => (
          <rect key={`u-${wx}-${wy}`} x={wx} y={wy} width="12" height="16"
            fill={C.bg} fillOpacity="0.7" stroke={C.bronze} strokeWidth="0.4" />
        ))
      )}

      {/* Main body */}
      <rect x={cfg.body[0]} y={cfg.body[1]} width={cfg.body[2]} height={cfg.body[3]}
        fill={C.surface} fillOpacity="0.5" stroke={C.accent} strokeWidth="0.8" />
      <rect x={cfg.body[0]} y={cfg.body[1]} width={cfg.body[2]} height={cfg.body[3]}
        fill={`url(#win-${id})`} />
      {[cfg.body[1]+14, cfg.body[1]+42, cfg.body[1]+70, cfg.body[1]+98, cfg.body[1]+126, cfg.body[1]+154, cfg.body[1]+182].filter(y => y < cfg.body[1]+cfg.body[3]-20).map((wy) =>
        [cfg.body[0]+8, cfg.body[0]+cfg.body[2]-22].map((wx) => (
          <rect key={`w-${wx}-${wy}`} x={wx} y={wy} width="12" height="17"
            fill={C.bg} fillOpacity="0.72" stroke={C.bronze} strokeWidth="0.4" />
        ))
      )}

      {/* Terracotta cornice line */}
      <line x1={cfg.body[0]} y1={cfg.body[1]} x2={cfg.body[0]+cfg.body[2]} y2={cfg.body[1]}
        stroke={C.accent} strokeWidth="1.4" />

      {/* Podium */}
      <rect x={cfg.podium[0]} y={cfg.podium[1]} width={cfg.podium[2]} height={cfg.podium[3]}
        fill={C.surface} fillOpacity="0.6" stroke={C.bronze} strokeWidth="0.7" />

      {/* Ground glow */}
      <ellipse cx="80" cy="434" rx="50" ry="5"
        fill={C.accent} fillOpacity="0.12" />
    </svg>
  );
}

// ─── 1. Hero ──────────────────────────────────────────────────────────────────
function CaseStudyHero({
  project,
  ui,
  index,
}: {
  project: Project;
  ui: Pick<UiStrings, "backToAll" | "indicativeRender">;
  index: number;
}) {
  return (
    <section
      className="relative w-full overflow-hidden bg-surface/25"
      style={{ minHeight: "62vh" }}
      aria-label="Project hero"
    >
      {/* Back link — top-left, visible once header scrolls away */}
      <div className="absolute top-20 md:top-24 left-6 md:left-14 z-20">
        <Link
          href="/projects"
          className="font-sans text-[9px] tracking-widest uppercase text-text/35 hover:text-accent transition-colors duration-200"
        >
          ← {ui.backToAll}
        </Link>
      </div>

      {/* Building illustration — right side */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-[55%] md:w-[45%] flex items-end justify-end pr-0 pb-0 pointer-events-none"
      >
        <div className="h-full flex items-end opacity-75 md:opacity-90">
          <CaseStudyBuildingSvg index={index} />
        </div>
      </div>

      {/* Gradient overlay — keeps text legible over SVG */}
      <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-surface/60 via-surface/25 to-transparent pointer-events-none" />

      {/* Text — bottom-left */}
      <div className="absolute bottom-0 left-0 z-10 px-6 md:px-14 pb-10 md:pb-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-lg md:max-w-xl"
        >
          <motion.p
            variants={fadeIn}
            className="font-sans text-[9px] tracking-[0.3em] uppercase text-accent mb-5 md:mb-7"
          >
            {project.location} · {project.year}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[2.4rem] sm:text-5xl md:text-6xl leading-[1.03] text-text"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-sans text-sm md:text-base text-text/50 mt-4 md:mt-6 leading-relaxed"
          >
            {project.narrative}
          </motion.p>
        </motion.div>
      </div>

      {/* Indicative label */}
      <span className="absolute top-20 md:top-24 right-6 md:right-14 font-sans text-[8px] tracking-widest uppercase text-text/20">
        {ui.indicativeRender}
      </span>
    </section>
  );
}

// ─── 2. Facts strip ───────────────────────────────────────────────────────────
function FactsStrip({
  project,
  ui,
}: {
  project: Project;
  ui: UiStrings;
}) {
  const facts = [
    { label: ui.labelLocation, value: project.location },
    { label: ui.labelYear,     value: String(project.year) },
    { label: ui.labelTypology, value: project.typology },
    { label: ui.labelUnits,    value: project.unitMixRange },
    { label: ui.labelStatus,   value: statusLabel(project.status, ui), isStatus: true },
  ];

  return (
    <section className="bg-surface/40 px-6 md:px-14 py-8 md:py-10" aria-label="Project facts">
      <motion.div
        className="flex flex-col sm:flex-row sm:flex-wrap gap-8 sm:gap-0"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {facts.map(({ label, value, isStatus }, i) => (
          <motion.div
            key={label}
            variants={fadeIn}
            className={`sm:pr-10 sm:mr-10 ${
              i < facts.length - 1 ? "sm:border-r sm:border-accent-secondary/20" : ""
            }`}
          >
            <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-text/35 mb-1.5">
              {label}
            </p>
            <p
              className={`font-sans text-xs md:text-sm tracking-wide ${
                isStatus ? "text-accent-muted font-medium" : "text-text"
              }`}
            >
              {value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* No-pricing notice */}
      <p className="mt-6 font-sans text-[8px] tracking-widest uppercase text-text/20">
        No pricing or availability information is shown — contact us to discuss
      </p>
    </section>
  );
}

// ─── 3 & 4. Narrative / Location text sections ────────────────────────────────
function TextSection({
  sectionNumber,
  label,
  body,
}: {
  sectionNumber: string;
  label: string;
  body: string;
}) {
  return (
    <section className="px-6 md:px-14 py-14 md:py-20" aria-label={label}>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8 md:mb-12">
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">{sectionNumber}</span>
          <div className="h-px w-8 bg-accent/35" />
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text/30">{label}</span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-sans text-base md:text-lg text-text/60 leading-relaxed max-w-2xl"
        >
          {body}
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── 5. Sensory passage ───────────────────────────────────────────────────────
function SensoryPassage({
  projectName,
  passage,
  label,
}: {
  projectName: string;
  passage: string;
  label: string;
}) {
  return (
    <section
      className="px-6 md:px-14 py-14 md:py-20 bg-surface/20"
      aria-label="Sensory description"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-10 md:mb-14">
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">04</span>
          <div className="h-px w-8 bg-accent/35" />
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text/30">
            {label} {projectName}
          </span>
        </motion.div>

        {/* Passage — set apart with a terracotta left border */}
        <motion.blockquote
          variants={fadeUp}
          className="border-l-2 border-accent/40 pl-6 md:pl-10 max-w-2xl"
        >
          <p className="font-display text-xl md:text-2xl lg:text-3xl text-text/70 leading-relaxed italic">
            {passage}
          </p>
        </motion.blockquote>
      </motion.div>
    </section>
  );
}

// ─── Gallery placeholder card ─────────────────────────────────────────────────
function GalleryCard({
  type,
  index,
  label,
  photosFollow,
}: {
  type: GalleryTab;
  index: number;
  label: string;
  photosFollow: string;
}) {
  const aspect =
    type === "materials" ? "aspect-square" : type === "interiors" ? "aspect-[3/4]" : "aspect-[4/3]";

  return (
    <div className={`relative ${aspect} bg-surface/50 border border-accent-secondary/15 overflow-hidden`}>
      {/* Architectural sketch */}
      {type === "exteriors" && (
        <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full opacity-[0.18]" aria-hidden="true">
          <rect x="48" y="18" width="64" height="124" stroke={C.bronze} strokeWidth="0.6" fill="none" />
          <rect x="32" y="114" width="96" height="28" stroke={C.bronze} strokeWidth="0.6" fill="none" />
          <rect x="60" y="24" width="10" height="14" stroke={C.bronze} strokeWidth="0.4" fill="none" />
          <rect x="90" y="24" width="10" height="14" stroke={C.bronze} strokeWidth="0.4" fill="none" />
          <rect x="60" y="50" width="10" height="14" stroke={C.bronze} strokeWidth="0.4" fill="none" />
          <rect x="90" y="50" width="10" height="14" stroke={C.bronze} strokeWidth="0.4" fill="none" />
          <rect x="60" y="76" width="10" height="14" stroke={C.bronze} strokeWidth="0.4" fill="none" />
          <rect x="90" y="76" width="10" height="14" stroke={C.bronze} strokeWidth="0.4" fill="none" />
          <line x1="48" y1="18" x2="112" y2="18" stroke={C.accent} strokeWidth="0.8" />
        </svg>
      )}
      {type === "interiors" && (
        <svg viewBox="0 0 120 160" className="absolute inset-0 w-full h-full opacity-[0.18]" aria-hidden="true">
          {/* Room box */}
          <line x1="10" y1="140" x2="110" y2="140" stroke={C.bronze} strokeWidth="0.6" />
          <line x1="10" y1="20"  x2="10"  y2="140" stroke={C.bronze} strokeWidth="0.6" />
          <line x1="110" y1="20" x2="110" y2="140" stroke={C.bronze} strokeWidth="0.6" />
          <line x1="10" y1="20"  x2="110" y2="20"  stroke={C.bronze} strokeWidth="0.6" />
          {/* Window */}
          <rect x="30" y="40" width="60" height="70" stroke={C.accent} strokeWidth="0.5" fill={C.bg} fillOpacity="0.5" />
          <line x1="60" y1="40" x2="60"  y2="110" stroke={C.bronze} strokeWidth="0.3" />
          <line x1="30" y1="75" x2="90"  y2="75"  stroke={C.bronze} strokeWidth="0.3" />
        </svg>
      )}
      {type === "materials" && (
        <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full opacity-[0.18]" aria-hidden="true">
          <rect x="8"  y="8"  width="46" height="46" stroke={C.bronze} strokeWidth="0.5" fill={C.surface} />
          <rect x="66" y="8"  width="46" height="46" stroke={C.bronze} strokeWidth="0.5" fill={C.bronze} fillOpacity="0.4" />
          <rect x="8"  y="66" width="46" height="46" stroke={C.bronze} strokeWidth="0.5" fill={C.accent} fillOpacity="0.25" />
          <rect x="66" y="66" width="46" height="46" stroke={C.bronze} strokeWidth="0.5" fill={C.surface} />
          {/* Texture lines on stone swatch */}
          {[18, 24, 30, 36, 42].map((y) => (
            <line key={y} x1="8" y1={y} x2="54" y2={y} stroke={C.bronze} strokeWidth="0.2" strokeOpacity="0.5" />
          ))}
        </svg>
      )}

      <span className="absolute top-2.5 left-3 font-sans text-[8px] tracking-widest uppercase text-text/25">
        {label}
      </span>
      <span className="absolute bottom-2.5 right-3 font-sans text-[8px] tracking-widest uppercase text-text/15">
        {photosFollow}
      </span>
    </div>
  );
}

// ─── 6. Gallery ───────────────────────────────────────────────────────────────
function Gallery({
  project,
  ui,
}: {
  project: Project;
  ui: UiStrings;
}) {
  const [activeTab, setActiveTab] = useState<GalleryTab>("exteriors");

  const tabs: Array<{ key: GalleryTab; label: string }> = [
    { key: "exteriors", label: ui.tabExteriors },
    { key: "interiors", label: ui.tabInteriors },
    { key: "materials", label: ui.tabMaterials },
  ];

  // Always show 3 placeholders per tab (minimum)
  const counts: Record<GalleryTab, number> = {
    exteriors: Math.max(project.galleryExteriors.length, 3),
    interiors: Math.max(project.galleryInteriors.length, 3),
    materials: Math.max(project.galleryMaterials.length, 3),
  };

  return (
    <section className="px-6 md:px-14 py-14 md:py-20" aria-label="Project gallery">
      {/* Section label */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8 md:mb-10">
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">05</span>
          <div className="h-px w-8 bg-accent/35" />
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text/30">{ui.sectionGallery}</span>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={fadeIn} className="flex gap-1 mb-8 md:mb-10">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                font-sans text-[9px] tracking-[0.22em] uppercase
                px-5 py-2.5 border transition-colors duration-200
                ${activeTab === key
                  ? "bg-text text-bg border-text"
                  : "bg-transparent text-text/40 border-accent-secondary/20 hover:text-text"
                }
              `}
            >
              {label}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Gallery grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`grid gap-3 md:gap-4 ${
            activeTab === "materials"
              ? "grid-cols-2 sm:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          {Array.from({ length: counts[activeTab] }).map((_, i) => (
            <GalleryCard
              key={i}
              type={activeTab}
              index={i}
              label={ui.indicativeRender}
              photosFollow={ui.photosFollow}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ─── 7. CTA ───────────────────────────────────────────────────────────────────
function CaseStudyCta({
  project,
  ui,
}: {
  project: Project;
  ui: UiStrings;
}) {
  return (
    <section className="px-6 md:px-14 py-20 md:py-32" aria-label="Project inquiry">
      <div className="flex items-center gap-3 mb-10 md:mb-14">
        <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">06</span>
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
          className="font-display text-[2rem] sm:text-4xl md:text-5xl leading-[1.05] text-text max-w-xl"
        >
          {ui.ctaHeadline}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-sans text-sm md:text-base text-text/45 mt-6 md:mt-8 leading-relaxed max-w-xs"
        >
          {ui.ctaBody}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 md:mt-11">
          <Link
            href={`/contact?project=${encodeURIComponent(project.slug)}`}
            className="
              inline-flex items-center gap-4
              font-sans text-[9px] tracking-[0.24em] uppercase
              bg-accent hover:bg-accent-deep text-bg
              px-8 py-4
              transition-colors duration-300
            "
          >
            {ui.ctaButton} — {project.title}
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Composed export ──────────────────────────────────────────────────────────
export function CaseStudy({ project, ui }: CaseStudyProps) {
  // Use the project index to cycle building illustrations
  const projectIndex = project.slug.length % 4;

  return (
    <>
      <CaseStudyHero project={project} ui={ui} index={projectIndex} />
      <FactsStrip project={project} ui={ui} />
      <Divider />
      <TextSection sectionNumber="02" label={ui.sectionNarrative} body={project.narrative} />
      <Divider />
      <TextSection sectionNumber="03" label={ui.sectionLocation} body={project.locationContext} />
      <Divider />
      <SensoryPassage projectName={project.title} passage={project.sensoryPassage} label={ui.sectionSensory} />
      <Divider />
      <Gallery project={project} ui={ui} />
      <Divider />
      <CaseStudyCta project={project} ui={ui} />
    </>
  );
}
