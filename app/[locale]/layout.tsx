import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FestivalJsonLd from "@/components/seo/FestivalJsonLd";
import PwaProvider from "@/components/pwa/PwaProvider";
import AmbientDevotionalAudio from "@/components/audio/AmbientDevotionalAudio";
import MotionProvider from "@/components/motion/MotionProvider";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isMr = locale === "mr";

  const titleDefault = isMr
    ? "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा | नवरात्रोत्सव २०२६"
    : "New Pratap Mitra Mandal, Dangarvada Asoda | Navratri 2026";
  const titleTemplate = isMr
    ? "%s | न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा"
    : "%s | New Pratap Mitra Mandal, Dangarvada Asoda";
  const description = isMr
    ? "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा (स्थापना १९८०) चे अधिकृत संकेतस्थळ. श्री छिन्नमस्ता माता नवरात्रोत्सव २०२६: दैनिक महाआरती मानकरी वेळापत्रक, थेट दर्शन, कार्यक्रम व समाज कक्ष."
    : "Official website of New Pratap Mitra Mandal, Dangarvada Asoda (Est. 1980). Shri Chhinnamasta Mata Navratri Festival 2026: Daily Maha Aarti Mankari schedule, live stream, programmes and community hub.";

  return {
    metadataBase: new URL("https://newpratapmitramandal.org"),
    title: {
      template: titleTemplate,
      default: titleDefault,
    },
    description,
    keywords: [
      "न्यु प्रताप मित्र मंडळ",
      "New Pratap Mitra Mandal",
      "डांगरवाडा असोदा",
      "Dangarvada Asoda",
      "छिन्नमस्ता माता",
      "Chhinnamasta Mata",
      "नवरात्रोत्सव २०२६",
      "Navratri 2026 Jalgaon",
      "आरती मानकरी वेळापत्रक",
      "Aarti Mankari",
      "मिलिंद चौधरी",
      "Milind Chaudhari",
      "असोदा नवरात्र",
    ],
    authors: [{ name: "New Pratap Mitra Mandal Committee" }],
    creator: "New Pratap Mitra Mandal",
    publisher: "New Pratap Mitra Mandal, Dangarvada Asoda",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        mr: "/mr",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isMr ? "mr_IN" : "en_IN",
      url: `https://newpratapmitramandal.org/${locale}`,
      siteName: isMr
        ? "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा"
        : "New Pratap Mitra Mandal, Dangarvada Asoda",
      title: titleDefault,
      description,
      images: [
        {
          url: "/images/HomePageImage.jpeg",
          width: 1200,
          height: 630,
          alt: "न्यु प्रताप मित्र मंडळ नवरात्रोत्सव २०२६",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description,
      images: ["/images/HomePageImage.jpeg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MotionProvider>
        <PwaProvider>
          <FestivalJsonLd locale={locale} />
          <div className="flex min-h-svh flex-col">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <AmbientDevotionalAudio />
        </PwaProvider>
      </MotionProvider>
    </NextIntlClientProvider>
  );
}
