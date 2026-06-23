import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ProcessContent } from "@/components/process/ProcessContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "process" });
  return { title: t("meta") };
}

export default function ProcessPage() {
  const t = useTranslations("process");

  return (
    <ProcessContent
      hero={{
        label:    t("hero.label"),
        headline: t("hero.headline"),
        intro:    t("hero.intro"),
      }}
      stages={[
        {
          number:     t("s1Number"),
          heading:    t("s1Heading"),
          paragraphs: [t("s1P1"), t("s1P2")],
        },
        {
          number:     t("s2Number"),
          heading:    t("s2Heading"),
          paragraphs: [t("s2P1"), t("s2P2"), t("s2P3")],
        },
        {
          number:     t("s3Number"),
          heading:    t("s3Heading"),
          paragraphs: [t("s3P1"), t("s3P2")],
        },
        {
          number:     t("s4Number"),
          heading:    t("s4Heading"),
          paragraphs: [t("s4P1"), t("s4P2")],
        },
      ]}
      cta={{
        headline: t("ctaHeadline"),
        body:     t("ctaBody"),
        button:   t("ctaButton"),
      }}
      sectionInquire={t("sectionInquire")}
    />
  );
}
