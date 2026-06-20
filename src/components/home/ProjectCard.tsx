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
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0, 0, 1] as const }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        aria-label={project.title}
      >
        {/* Image placeholder — swap for next/image when real assets exist */}
        <div className="relative w-full aspect-[4/5] bg-surface overflow-hidden mb-4">
          {/* Indicative render label */}
          <span className="absolute top-3 left-3 z-10 text-[10px] tracking-widest uppercase text-text/40 font-sans">
            Indicative render
          </span>

          {/* Abstract placeholder texture — geometric lines in the brand palette */}
          <svg
            viewBox="0 0 400 500"
            fill="none"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <rect width="400" height="500" fill="var(--color-surface)" />
            {/* Silhouette outline of a generic tower form */}
            <rect
              x="140"
              y="320"
              width="120"
              height="160"
              fill="var(--color-bg)"
              fillOpacity="0.6"
              stroke="var(--color-accent-secondary)"
              strokeWidth="1"
            />
            <rect
              x="160"
              y="160"
              width="80"
              height="165"
              fill="var(--color-bg)"
              fillOpacity="0.6"
              stroke="var(--color-accent-secondary)"
              strokeWidth="1"
            />
            <rect
              x="175"
              y="100"
              width="50"
              height="64"
              fill="var(--color-bg)"
              fillOpacity="0.6"
              stroke="var(--color-accent-secondary)"
              strokeWidth="1"
            />
            {/* Ground shadow */}
            <ellipse
              cx="200"
              cy="480"
              rx="52"
              ry="8"
              fill="var(--color-accent-secondary)"
              fillOpacity="0.12"
            />
          </svg>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-text/0 group-hover:bg-text/8 transition-colors duration-500" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-accent-secondary mb-1">
              {statusLabel} · {project.year}
            </p>
            <h3 className="font-display text-xl text-text group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <p className="font-sans text-sm text-text/60 mt-0.5">
              {project.location}
            </p>
          </div>
          <span
            className="mt-1 font-sans text-xs tracking-widest uppercase text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
