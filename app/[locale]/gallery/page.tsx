import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getGalleryPhotos } from "@/lib/data/gallery";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { Flame, ArrowRight, Camera } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.gallery" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  const isMr = locale === "mr";
  const photos = await getGalleryPhotos();

  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-6 py-6 sm:py-10 animate-fade-in-up">
      {/* ── BREADCRUMB ───────────────────────────────────── */}
      <nav className="mb-4 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              {isMr ? "मुखपृष्ठ" : "Home"}
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-foreground">
            {isMr ? "छायाचित्र दालन" : "Photo Gallery"}
          </li>
        </ol>
      </nav>

      {/* ── HEADER BANNER ────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-5 sm:p-8 text-center shadow-md mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
          <Flame size={14} className="text-accent" />
          {isMr ? "उत्सव आठवणी व दर्शन" : "Festival Moments & Darshan"}
        </span>

        <h1 className="deva-heading gradient-text mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold">
          {isMr ? "छायाचित्र दालन" : "Festival Photo Gallery"}
        </h1>

        <p className="deva-body mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {isMr
            ? "न्यु प्रताप मित्र मंडळाच्या नवरात्रोत्सवाचे विहंगम क्षण: श्री छिन्नमस्ता माता मूर्ती दर्शन, मंडप सजावट, महाआरती आणि विसर्जन मिरवणूक."
            : "Divine glimpses of Nyu Pratap Mitra Mandal's Navratri celebrations: Idol darshan, pandal illumination, Maha Aarti, and grand processions."}
        </p>
      </div>

      {/* ── INTERACTIVE GALLERY GRID COMPONENT ───────────── */}
      <GalleryGrid initialPhotos={photos} locale={locale} />

      {/* ── SUBMIT PHOTO CTA ─────────────────────────────── */}
      <div className="mt-12 rounded-2xl border border-border bg-card p-5 sm:p-6 text-center shadow-sm">
        <div className="flex justify-center mb-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Camera size={20} />
          </span>
        </div>
        <h3 className="deva-heading text-base sm:text-lg font-bold text-foreground">
          {isMr ? "आपल्याकडील उत्सवाची छायाचित्रे पाठवा" : "Share Your Festival Photos"}
        </h3>
        <p className="deva-body mt-1 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          {isMr
            ? "आपण काढलेली सुंदर छायाचित्रे आमच्या अधिकृत WhatsApp क्रमांकावर पाठवून दालनात समाविष्ट करू शकता."
            : "Send your festival photos to our official WhatsApp number to get featured in the gallery."}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl gradient-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow min-h-[44px]"
          >
            <span>{isMr ? "मंडळाशी संपर्क साधा" : "Contact Mandal"}</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/programme"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-5 py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted min-h-[44px]"
          >
            <span>{isMr ? "कार्यक्रम पत्रिका पहा" : "View Programme"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
