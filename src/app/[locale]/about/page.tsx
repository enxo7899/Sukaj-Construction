import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AboutContent } from "@/components/about/AboutContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("meta") };
}

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <AboutContent
      hero={{
        label:    t("hero.label"),
        headline: t("hero.headline"),
        subline:  t("hero.subline"),
      }}
      timelineLabel={t("timelineLabel")}
      t1995={{
        year:    t("t1995Year"),
        city:    t("t1995City"),
        heading: t("t1995Heading"),
        body:    t("t1995Body"),
      }}
      t2010={{
        year:    t("t2010Year"),
        city:    t("t2010City"),
        heading: t("t2010Heading"),
        body:    t("t2010Body"),
      }}
      dev={{
        label:    t("devLabel"),
        headline: t("devHeadline"),
        p1:       t("devP1"),
        p2:       t("devP2"),
        p3:       t("devP3"),
      }}
      sisterNote={t("sisterNote")}
      cta={{
        headline: t("ctaHeadline"),
        body:     t("ctaBody"),
        button:   t("ctaButton"),
      }}
    />
  );
}
