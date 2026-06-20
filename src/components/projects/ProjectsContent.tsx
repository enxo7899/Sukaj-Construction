"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/home/ProjectCard";
import type { Project } from "@/data/projects";

const EASE = [0.25, 0, 0, 1] as const;

type Filter = "all" | Project["status"];

interface ProjectsContentProps {
  projects: Project[];
  locale: string;
  viewProject: string;
  ui: {
    heading: string;
    filterAll: string;
    filterCompleted: string;
    filterConstruction: string;
    filterPlanned: string;
  };
}

export function ProjectsContent({ projects, locale, viewProject, ui }: ProjectsContentProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const counts = {
    all: projects.length,
    completed: projects.filter((p) => p.status === "completed").length,
    "under-construction": projects.filter((p) => p.status === "under-construction").length,
    planned: projects.filter((p) => p.status === "planned").length,
  };

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.status === activeFilter);

  const filters: Array<{ key: Filter; label: string }> = [
    { key: "all",               label: `${ui.filterAll} (${counts.all})` },
    { key: "completed",         label: `${ui.filterCompleted} (${counts.completed})` },
    { key: "under-construction",label: `${ui.filterConstruction} (${counts["under-construction"]})` },
    { key: "planned",           label: `${ui.filterPlanned} (${counts.planned})` },
  ];

  return (
    <>
      {/* Page hero */}
      <section className="px-6 md:px-14 pt-32 md:pt-44 pb-10 md:pb-12">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, ease: EASE } } }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent">Projects</span>
            <div className="h-px w-8 bg-accent/35" />
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
            className="font-display text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] text-text"
          >
            {ui.heading}
          </motion.h1>
        </motion.div>
      </section>

      {/* Filter bar */}
      <div className="px-6 md:px-14 pb-10 md:pb-14">
        <div className="flex flex-wrap gap-2">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`
                font-sans text-[9px] tracking-[0.2em] uppercase
                px-4 py-2.5 border transition-colors duration-200
                ${activeFilter === key
                  ? "bg-text text-bg border-text"
                  : "bg-transparent text-text/45 border-accent-secondary/20 hover:text-text hover:border-accent-secondary/45"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-accent-secondary/20" />

      {/* Grid */}
      <section className="px-6 md:px-14 py-14 md:py-20" aria-label="Project grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                locale={locale}
                viewProject={viewProject}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
