import type { Metadata } from "next";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ContactContent } from "@/components/contact/ContactContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("meta") };
}

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    // Suspense required: ContactContent uses useSearchParams()
    <Suspense>
      <ContactContent
        hero={{
          label:    t("hero.label"),
          headline: t("hero.headline"),
          subline:  t("hero.subline"),
        }}
        form={{
          fieldName:          t("form.fieldName"),
          fieldEmail:         t("form.fieldEmail"),
          fieldPhone:         t("form.fieldPhone"),
          fieldPhoneOptional: t("form.fieldPhoneOptional"),
          fieldRegarding:     t("form.fieldRegarding"),
          fieldMessage:       t("form.fieldMessage"),
          submit:             t("form.submit"),
          submitting:         t("form.submitting"),
          successHeadline:    t("form.successHeadline"),
          successBody:        t("form.successBody"),
          successBack:        t("form.successBack"),
        }}
        office={{
          label:   t("office.label"),
          address: t("office.address"),
          hours:   t("office.hours"),
          email:   t("office.email"),
        }}
      />
    </Suspense>
  );
}
