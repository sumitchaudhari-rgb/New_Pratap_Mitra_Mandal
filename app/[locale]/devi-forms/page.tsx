import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import DeviFormsClient from "./DeviFormsClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.deviForms" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DeviFormsPage({ params }: Props) {
  const { locale } = await params;
  return <DeviFormsClient locale={locale} />;
}
