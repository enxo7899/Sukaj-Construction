"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";

const STATUS_LABELS: Record<Project["status"], string> = {
  completed:          "Completed",
  "under-construction": "Under construction",
  planned:            "Planned",
};
const STATUS_LABELS_SQ: Record<Project["status"], string> = {
  completed:          "Përfunduar",
  "under-construction": "Në ndërtim",
  planned:            "Planifikuar",
};

// ─── Palette constants (hardcoded so they work inside SVG <defs>) ─────────────
// Kept in sync with the premium tokens in globals.css.
const C = {
  bg:      "#F4EFE6",
  surface: "#EBE1D3",
  text:    "#211D18",
  accent:  "#B25F38",
  bronze:  "#A3895F",
};

// ─── Four distinct massing silhouettes ────────────────────────────────────────
// Uses radial sky gradient, window-warmth fill, and ground-shadow gradient
// for more atmospheric depth than flat fills.
function BuildingIllustration({ index }: { index: number }) {
  const id = `bld-${index}`;

  const configs = [
    // 0 — wide podium + slim tower
    {
      podium: { x: 28, y: 338, w: 144, h: 50 },
      body:   { x: 58, y: 142, w: 84, h: 200 },
      upper:  { x: 72, y: 62,  w: 60, h: 84 },
      winCols: [66, 88, 112, 128],
      winRows: [154, 182, 210, 238, 266, 294],
      upCols:  [80, 108],
      upRows:  [74, 100, 126],
      balconyRows: [210, 266],
    },
    // 1 — tall single slab
    {
      podium: { x: 48, y: 356, w: 104, h: 32 },
      body:   { x: 66, y: 92,  w: 68, h: 268 },
      upper:  { x: 74, y: 44,  w: 52, h: 52 },
      winCols: [74, 96, 116],
      winRows: [104, 132, 160, 188, 216, 244, 272, 300],
      upCols:  [82, 108],
      upRows:  [54, 78],
      balconyRows: [160, 216, 272],
    },
    // 2 — stepped massing
    {
      podium: { x: 22, y: 348, w: 156, h: 40 },
      body:   { x: 38, y: 174, w: 124, h: 178 },
      upper:  { x: 58, y: 84,  w: 84,  h: 94 },
      winCols: [48, 74, 100, 128, 150],
      winRows: [186, 214, 242, 270, 298],
      upCols:  [66, 92, 118],
      upRows:  [96, 124, 150],
      balconyRows: [214, 270],
    },
    // 3 — two-volume composition
    {
      podium: { x: 24, y: 350, w: 152, h: 38 },
      body:   { x: 24, y: 150, w: 68, h: 204 },
      upper:  { x: 108, y: 100, w: 68, h: 254 },
      winCols: [32, 54, 72],
      winRows: [162, 192, 222, 252, 282, 312],
      upCols:  [116, 140, 162],
      upRows:  [112, 142, 172, 202, 232, 262, 292],
      balconyRows: [222, 282],
    },
  ] as const;

  const c = configs[index % 4];

  return (
    <svg
      viewBox="0 0 200 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,0,0,1)] group-hover:scale-[1.04] origin-center"
      aria-hidden="true"
    >
      <defs>
        {/* Radial sky glow — warm light pools at top-centre */}
        <radialGradient id={`sky-${id}`} cx="50%" cy="18%" r="70%">
          <stop offset="0%"   stopColor={C.bg} />
          <stop offset="100%" stopColor={C.surface} />
        </radialGradient>

        {/* Building face — slight lightening at top (sky reflection) */}
        <linearGradient id={`bld-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={C.surface} stopOpacity="0.9" />
          <stop offset="100%" stopColor={C.surface} stopOpacity="0.6" />
        </linearGradient>

        {/* Window warmth — hint of lit interior */}
        <radialGradient id={`win-${id}`} cx="50%" cy="60%" r="70%">
          <stop offset="0%"   stopColor={C.accent}  stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.accent}  stopOpacity="0" />
        </radialGradient>

        {/* Ground shadow */}
        <linearGradient id={`gnd-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={C.bronze}  stopOpacity="0.12" />
          <stop offset="100%" stopColor={C.bronze}  stopOpacity="0.26" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="200" height="420" fill={`url(#sky-${id})`} />

      {/* Ground strip */}
      <rect x="0" y="370" width="200" height="50" fill={`url(#gnd-${id})`} />

      {/* Podium */}
      <rect
        x={c.podium.x} y={c.podium.y}
        width={c.podium.w} height={c.podium.h}
        fill={`url(#bld-${id})`}
        stroke={C.bronze} strokeWidth="0.7"
      />

      {/* Main body */}
      <rect
        x={c.body.x} y={c.body.y}
        width={c.body.w} height={c.body.h}
        fill={`url(#bld-${id})`}
        stroke={C.bronze} strokeWidth="0.7"
      />

      {/* Window warmth overlay on main body */}
      <rect
        x={c.body.x} y={c.body.y}
        width={c.body.w} height={c.body.h}
        fill={`url(#win-${id})`}
      />

      {/* Windows — main body */}
      {c.winRows.map((wy) =>
        c.winCols.map((wx) => (
          <rect
            key={`w-${wx}-${wy}`}
            x={wx} y={wy} width="12" height="16"
            fill={C.bg} fillOpacity="0.78"
            stroke={C.bronze} strokeWidth="0.45"
          />
        ))
      )}

      {/* Balcony projections */}
      {"balconyRows" in c && (c.balconyRows as readonly number[]).map((y) => (
        <rect
          key={`bal-${y}`}
          x={c.body.x - 2} y={y}
          width={c.body.w + 4} height="3.5"
          fill={C.surface}
          stroke={C.accent} strokeWidth="0.5"
        />
      ))}

      {/* Upper / setback volume */}
      <rect
        x={c.upper.x} y={c.upper.y}
        width={c.upper.w} height={c.upper.h}
        fill={`url(#bld-${id})`}
        stroke={C.bronze} strokeWidth="0.7"
      />
      {c.upRows.map((wy) =>
        c.upCols.map((wx) => (
          <rect
            key={`u-${wx}-${wy}`}
            x={wx} y={wy} width="12" height="16"
            fill={C.bg} fillOpacity="0.78"
            stroke={C.bronze} strokeWidth="0.45"
          />
        ))
      )}

      {/* Terracotta cornice accent */}
      <line
        x1={c.body.x} y1={c.body.y}
        x2={c.body.x + c.body.w} y2={c.body.y}
        stroke={C.accent} strokeWidth="1.4"
      />

      {/* Ground shadow ellipse */}
      <ellipse
        cx="100" cy="412" rx="58" ry="6"
        fill={C.accent} fillOpacity="0.10"
      />
    </svg>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
export function ProjectCard({
  project,
  index,
  locale,
  viewProject,
}: {
  project: Project;
  index: number;
  locale: string;
  viewProject?: string;
}) {
  const statusLabel =
    locale === "sq"
      ? STATUS_LABELS_SQ[project.status]
      : STATUS_LABELS[project.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.75,
        delay: (index % 2) * 0.1,
        ease: [0.25, 0, 0, 1] as const,
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        aria-label={project.title}
      >
        {/* Image plate — framed, warm, with a hairline edge for editorial weight */}
        <div className="relative w-full aspect-[4/5] overflow-hidden mb-5 bg-surface-deep border border-accent-secondary/20 group-hover:border-accent/35 transition-colors duration-500">
          <BuildingIllustration index={index} />

          {/* Indicative label */}
          <span className="absolute top-3.5 left-3.5 z-10 font-sans text-[8px] tracking-[0.2em] uppercase text-text/35">
            Indicative render
          </span>

          {/* Hover overlay — warms slightly */}
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.04] transition-colors duration-500" />

          {/* View project on hover */}
          {viewProject && (
            <span className="absolute bottom-3.5 right-3.5 font-sans text-[9px] tracking-[0.2em] uppercase text-accent bg-bg/92 backdrop-blur-sm px-3 py-1.5 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
              {viewProject} →
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-accent-secondary mb-2">
              {statusLabel} · {project.year}
            </p>
            <h3 className="font-display text-xl md:text-2xl text-text group-hover:text-accent transition-colors duration-300 leading-tight">
              {project.title}
            </h3>
            <p className="font-sans text-xs text-text-soft mt-2">
              {project.location}
            </p>
          </div>
          <span
            className="mt-1 text-accent text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 md:-translate-x-1 md:group-hover:translate-x-0 transition-all duration-300 flex-shrink-0"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
