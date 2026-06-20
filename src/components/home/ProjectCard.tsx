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

// Four distinct massing compositions — one per card position.
// All share the same palette but vary in silhouette so the grid
// reads as different buildings rather than repeated placeholders.
function BuildingIllustration({ index }: { index: number }) {
  const configs = [
    // 0 — wide podium + slim tower
    {
      podium: { x: 30, y: 340, w: 140, h: 48 },
      body:   { x: 62, y: 148, w: 76, h: 196 },
      upper:  { x: 74, y: 72,  w: 52, h: 80 },
      windowCols: [70, 90, 110, 126],
      windowRows: [158, 186, 214, 242, 270, 298],
      upperCols: [82, 106],
      upperRows: [82, 106, 130],
    },
    // 1 — single tall slab, narrow
    {
      podium: { x: 50, y: 360, w: 100, h: 32 },
      body:   { x: 68, y: 100, w: 64, h: 264 },
      upper:  { x: 76, y: 50,  w: 48, h: 54 },
      windowCols: [76, 96, 112],
      windowRows: [112, 140, 168, 196, 224, 252, 280, 308],
      upperCols: [84, 106],
      upperRows: [60, 84],
    },
    // 2 — stepped massing, two setbacks
    {
      podium: { x: 24, y: 350, w: 152, h: 40 },
      body:   { x: 40, y: 180, w: 120, h: 174 },
      upper:  { x: 60, y: 90,  w: 80,  h: 94 },
      windowCols: [50, 76, 102, 128, 148],
      windowRows: [192, 220, 248, 276, 304],
      upperCols: [68, 92, 116],
      upperRows: [100, 128, 154],
    },
    // 3 — two-volume composition side by side
    {
      podium: { x: 26, y: 352, w: 148, h: 38 },
      body:   { x: 26, y: 158, w: 64, h: 198 },
      upper:  { x: 110, y: 108, w: 64, h: 248 },
      windowCols: [36, 56, 72],
      windowRows: [168, 198, 228, 258, 288, 316],
      upperCols: [118, 140, 160],
      upperRows: [118, 148, 178, 208, 238, 268, 298],
    },
  ] as const;

  const c = configs[index % 4];

  return (
    <svg
      viewBox="0 0 200 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      {/* Sky zone */}
      <rect width="200" height="420" fill="var(--color-surface)" />
      <rect width="200" height="200" fill="var(--color-bg)" fillOpacity="0.6" />

      {/* Podium */}
      <rect
        x={c.podium.x} y={c.podium.y}
        width={c.podium.w} height={c.podium.h}
        fill="var(--color-surface)" fillOpacity="0.7"
        stroke="var(--color-accent-secondary)" strokeWidth="0.8"
      />

      {/* Main body */}
      <rect
        x={c.body.x} y={c.body.y}
        width={c.body.w} height={c.body.h}
        fill="var(--color-surface)" fillOpacity="0.6"
        stroke="var(--color-accent-secondary)" strokeWidth="0.8"
      />

      {/* Windows on main body */}
      {c.windowRows.map((wy) =>
        c.windowCols.map((wx) => (
          <rect
            key={`w-${wx}-${wy}`}
            x={wx} y={wy} width="10" height="14"
            fill="var(--color-bg)" fillOpacity="0.8"
            stroke="var(--color-accent-secondary)" strokeWidth="0.5"
          />
        ))
      )}

      {/* Upper / setback volume */}
      <rect
        x={c.upper.x} y={c.upper.y}
        width={c.upper.w} height={c.upper.h}
        fill="var(--color-surface)" fillOpacity="0.55"
        stroke="var(--color-accent-secondary)" strokeWidth="0.8"
      />

      {/* Windows on upper */}
      {c.upperRows.map((wy) =>
        c.upperCols.map((wx) => (
          <rect
            key={`u-${wx}-${wy}`}
            x={wx} y={wy} width="10" height="14"
            fill="var(--color-bg)" fillOpacity="0.8"
            stroke="var(--color-accent-secondary)" strokeWidth="0.5"
          />
        ))
      )}

      {/* Terracotta cornice accent */}
      <line
        x1={c.body.x} y1={c.body.y}
        x2={c.body.x + c.body.w} y2={c.body.y}
        stroke="var(--color-accent)" strokeWidth="1.2"
      />

      {/* Ground shadow */}
      <ellipse
        cx="100" cy="410" rx="56" ry="7"
        fill="var(--color-accent-secondary)" fillOpacity="0.15"
      />
    </svg>
  );
}

export function ProjectCard({
  project,
  index,
  locale,
}: {
  project: Project;
  index: number;
  locale: string;
}) {
  const statusLabel =
    locale === "sq"
      ? STATUS_LABELS_SQ[project.status]
      : STATUS_LABELS[project.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0, 0, 1] as const }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        aria-label={project.title}
      >
        {/* Image / placeholder */}
        <div className="relative w-full aspect-[4/5] overflow-hidden mb-3 md:mb-4">
          {/* Indicative render label */}
          <span className="absolute top-2 left-2 z-10 text-[9px] tracking-widest uppercase text-text/40 font-sans">
            Indicative render
          </span>

          <BuildingIllustration index={index} />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-text/0 group-hover:bg-text/8 transition-colors duration-500" />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-accent-secondary mb-1">
              {statusLabel} · {project.year}
            </p>
            <h3 className="font-display text-base md:text-xl text-text group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <p className="font-sans text-xs md:text-sm text-text/60 mt-0.5">
              {project.location}
            </p>
          </div>
          {/* Arrow: always visible on touch, hover-only on desktop */}
          <span
            className="mt-1 font-sans text-xs tracking-widest uppercase text-accent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
