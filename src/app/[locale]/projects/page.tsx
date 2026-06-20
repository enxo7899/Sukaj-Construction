import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { projects } from "@/data/projects";
import { ProjectsContent } from "@/components/projects/ProjectsContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("meta") };
}

export default function ProjectsPage() {
  const t      = useTranslations("projects");
  const tHome  = useTranslations("home");
  const locale = useLocale();

  return (
    <ProjectsContent
      projects={projects}
      locale={locale}
      viewProject={tHome("projects.viewProject")}
      ui={{
        heading:            t("index.heading"),
        filterAll:          t("index.filterAll"),
        filterCompleted:    t("index.filterCompleted"),
        filterConstruction: t("index.filterConstruction"),
        filterPlanned:      t("index.filterPlanned"),
      }}
    />
  );
}
