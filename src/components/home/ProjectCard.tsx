"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";

const STATUS_LABELS: Record<Project["status"], string> = {
  completed: "Completed",
  "under-construction": "Under construction",
  planned: "Planned",
};
const STATUS_LABELS_SQ: Record<Project["status"], string> = {
  completed: "Përfunduar",
  "under-construction": "Në ndërtim",
  planned: "Planifikuar",
};

// ─── Palette constants (hardcoded so they work inside SVG <defs>) ─────────────
const C = {
  bg: "#FAF6EE",
  surface: "#EFE4D5",
  text: "#241F1A",
  accent: "#B96A43",
  bronze: "#A98F6E",
};

// ─── Four distinct massing silhouettes (line-art covers) ──────────────────────
function BuildingIllustration({ index }: { index: number }) {
  const id = `bld-${index}`;

  const configs = [
    {
      podium: { x: 28, y: 338, w: 144, h: 50 },
      body: { x: 58, y: 142, w: 84, h: 200 },
      upper: { x: 72, y: 62, w: 60, h: 84 },
      winCols: [66, 88, 112, 128],
      winRows: [154, 182, 210, 238, 266, 294],
      upCols: [80, 108],
      upRows: [74, 100, 126],
      balconyRows: [210, 266],
    },
    {
      podium: { x: 48, y: 356, w: 104, h: 32 },
      body: { x: 66, y: 92, w: 68, h: 268 },
      upper: { x: 74, y: 44, w: 52, h: 52 },
      winCols: [74, 96, 116],
      winRows: [104, 132, 160, 188, 216, 244, 272, 300],
      upCols: [82, 108],
      upRows: [54, 78],
      balconyRows: [160, 216, 272],
    },
    {
      podium: { x: 22, y: 348, w: 156, h: 40 },
      body: { x: 38, y: 174, w: 124, h: 178 },
      upper: { x: 58, y: 84, w: 84, h: 94 },
      winCols: [48, 74, 100, 128, 150],
      winRows: [186, 214, 242, 270, 298],
      upCols: [66, 92, 118],
      upRows: [96, 124, 150],
      balconyRows: [214, 270],
    },
    {
      podium: { x: 24, y: 350, w: 152, h: 38 },
      body: { x: 24, y: 150, w: 68, h: 204 },
      upper: { x: 108, y: 100, w: 68, h: 254 },
      winCols: [32, 54, 72],
      winRows: [162, 192, 222, 252, 282, 312],
      upCols: [116, 140, 162],
      upRows: [112, 142, 172, 202, 232, 262, 292],
      balconyRows: [222, 282],
    },
  ] as const;

  const c = configs[index % 4];

  return (
    <svg
      viewBox="0 0 200 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 w-full h-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.25,0,0,1)] group-hover:scale-[1.05] origin-bottom"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`sky-${id}`} cx="50%" cy="14%" r="78%">
          <stop offset="0%" stopColor={C.bg} />
          <stop offset="100%" stopColor={C.surface} />
        </radialGradient>
        <linearGradient id={`face-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.surface} stopOpacity="0.95" />
          <stop offset="100%" stopColor={C.surface} stopOpacity="0.62" />
        </linearGradient>
        <radialGradient id={`win-${id}`} cx="50%" cy="58%" r="72%">
          <stop offset="0%" stopColor={C.accent} stopOpacity="0.2" />
          <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="200" height="420" fill={`url(#sky-${id})`} />

      <rect x={c.podium.x} y={c.podium.y} width={c.podium.w} height={c.podium.h} fill={`url(#face-${id})`} stroke={C.bronze} strokeWidth="0.7" />
      <rect x={c.body.x} y={c.body.y} width={c.body.w} height={c.body.h} fill={`url(#face-${id})`} stroke={C.bronze} strokeWidth="0.7" />
      <rect x={c.body.x} y={c.body.y} width={c.body.w} height={c.body.h} fill={`url(#win-${id})`} />

      {c.winRows.map((wy) =>
        c.winCols.map((wx) => (
          <rect key={`w-${wx}-${wy}`} x={wx} y={wy} width="12" height="16" fill={C.bg} fillOpacity="0.78" stroke={C.bronze} strokeWidth="0.45" />
        ))
      )}

      {(c.balconyRows as readonly number[]).map((y) => (
        <rect key={`bal-${y}`} x={c.body.x - 2} y={y} width={c.body.w + 4} height="3.5" fill={C.surface} stroke={C.accent} strokeWidth="0.5" />
      ))}

      <rect x={c.upper.x} y={c.upper.y} width={c.upper.w} height={c.upper.h} fill={`url(#face-${id})`} stroke={C.bronze} strokeWidth="0.7" />
      {c.upRows.map((wy) =>
        c.upCols.map((wx) => (
          <rect key={`u-${wx}-${wy}`} x={wx} y={wy} width="12" height="16" fill={C.bg} fillOpacity="0.78" stroke={C.bronze} strokeWidth="0.45" />
        ))
      )}

      <line x1={c.body.x} y1={c.body.y} x2={c.body.x + c.body.w} y2={c.body.y} stroke={C.accent} strokeWidth="1.4" />
    </svg>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
export function ProjectCard({
  project,
  index,
  locale,
  viewProject,
  ratio = "portrait",
}: {
  project: Project;
  index: number;
  locale: string;
  viewProject?: string;
  ratio?: "portrait" | "landscape";
}) {
  const statusLabel =
    locale === "sq"
      ? STATUS_LABELS_SQ[project.status]
      : STATUS_LABELS[project.status];

  const aspectClass =
    ratio === "landscape"
      ? "aspect-[4/5] sm:aspect-[16/11]"
      : "aspect-[4/5]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, ease: [0.25, 0, 0, 1] as const }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full"
        aria-label={`${project.title} — ${project.location}`}
      >
        {/* Cover */}
        <div className={`relative w-full ${aspectClass} overflow-hidden bg-surface`}>
          <BuildingIllustration index={index} />

          {/* Indicative render label */}
          <span className="absolute top-4 right-4 z-20 eyebrow text-[0.5rem] text-text/40">
            Indicative render
          </span>

          {/* Status tag — top-left */}
          <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 eyebrow text-[0.5rem] text-text/55">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            {statusLabel}
          </span>

          {/* Bottom scrim — deepens on hover */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-text/55 via-text/15 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Overlaid title + location */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-6">
            <h3 className="font-display text-2xl md:text-3xl leading-tight text-bg">
              {project.title}
            </h3>
            {project.essence && (
              <p className="font-sans text-xs text-bg/60 mt-1.5 leading-snug line-clamp-1">
                {project.essence}
              </p>
            )}
            <div className="flex items-center justify-between mt-2.5">
              <p className="font-sans text-xs text-bg/55">
                {project.location} · {project.year}
              </p>
              {viewProject && (
                <span className="eyebrow text-[0.5rem] text-bg/0 group-hover:text-bg/90 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                  {viewProject} →
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
