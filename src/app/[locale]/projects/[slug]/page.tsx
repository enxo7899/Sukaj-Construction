import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug } from "@/data/projects";
import { CaseStudy } from "@/components/projects/CaseStudy";

// Rendered on demand (dynamic) — consistent with the other localized routes.
// next-intl Server-Component APIs opt into dynamic rendering, so we don't
// pre-generate these statically.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: `${project.title} — ${t("meta")}` };
}

export default async function ProjectCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Resolve translations server-side; pass to client component as plain strings.
  // Async Server Component → must use getTranslations (await), not the
  // useTranslations hook (which next-intl forbids in async components).
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <CaseStudy
      project={project}
      ui={{
        backToAll:         t("case.backToAll"),
        sectionFacts:      t("case.sectionFacts"),
        sectionNarrative:  t("case.sectionNarrative"),
        sectionLocation:   t("case.sectionLocation"),
        sectionSensory:    t("case.sectionSensory"),
        sectionGallery:    t("case.sectionGallery"),
        tabExteriors:      t("case.tabExteriors"),
        tabInteriors:      t("case.tabInteriors"),
        tabMaterials:      t("case.tabMaterials"),
        labelLocation:     t("case.labelLocation"),
        labelYear:         t("case.labelYear"),
        labelTypology:     t("case.labelTypology"),
        labelUnits:        t("case.labelUnits"),
        labelStatus:       t("case.labelStatus"),
        indicativeRender:  t("case.indicativeRender"),
        photosFollow:      t("case.photosFollow"),
        ctaHeadline:       t("case.ctaHeadline"),
        ctaBody:           t("case.ctaBody"),
        ctaButton:         t("case.ctaButton"),
        statusCompleted:    t("case.statusCompleted"),
        statusConstruction: t("case.statusConstruction"),
        statusPlanned:      t("case.statusPlanned"),
        noPricing:          t("case.noPricing"),
        sectionInquire:     t("case.sectionInquire"),
      }}
    />
  );
}
