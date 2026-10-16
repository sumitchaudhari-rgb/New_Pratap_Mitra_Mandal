import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { CHINNAMASTA_SECTIONS } from "@/lib/data/chhinnamasta";
import {
  Sparkles,
  Flame,
  Clock,
  MapPin,
  Calendar,
  Ruler,
  User,
  ArrowRight,
  ShieldAlert,
  BookOpen,
} from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.idol" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const SECTION_ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={18} className="text-gold" />,
  BookOpen: <BookOpen size={18} className="text-accent" />,
  Flame: <Flame size={18} className="text-primary" />,
  Calendar: <Calendar size={18} className="text-gold" />,
  MapPin: <MapPin size={18} className="text-accent" />,
};

export default async function IdolPage({ params }: Props) {
  const { locale } = await params;
  const isMr = locale === "mr";
  const settings = await getSiteSettings();

  const idolSpecs = [
    {
      label_mr: "देवीचे स्वरूप",
      label_en: "Form of Devi",
      value_mr: settings.idol_form,
      value_en: "Shri Chhinnamasta Mata (6th Mahavidya)",
      icon: <Flame size={18} className="text-accent" />,
    },
    {
      label_mr: "मूर्तीची उंची",
      label_en: "Idol Height",
      value_mr: settings.idol_height,
      value_en: "10 Feet",
      icon: <Ruler size={18} className="text-gold" />,
    },
    {
      label_mr: "मूर्तिकार",
      label_en: "Sculptor",
      value_mr: settings.idol_sculptor,
      value_en: "Dipak Kanoje (Bhusawal)",
      icon: <User size={18} className="text-primary" />,
    },
    {
      label_mr: "मंडळाची स्थापना",
      label_en: "Founding Year",
      value_mr: settings.founding_year,
      value_en: "1980",
      icon: <Calendar size={18} className="text-accent" />,
    },
    {
      label_mr: "प्रतिष्ठापना दिनांक",
      label_en: "Installation Date",
      value_mr: settings.installation_date,
      value_en: "11/10/2026",
      icon: <Clock size={18} className="text-gold" />,
    },
    {
      label_mr: "स्थान / ठिकाण",
      label_en: "Location",
      value_mr: "डांगरवाडा असोदा, जि. जळगाव",
      value_en: "Dangarvada Asoda, Dist. Jalgaon",
      icon: <MapPin size={18} className="text-primary" />,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-6 sm:py-10 animate-fade-in-up">
      {/* ── BREADCRUMB & HEADER ──────────────────────────── */}
      <nav className="mb-4 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              {isMr ? "मुखपृष्ठ" : "Home"}
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-foreground">
            {isMr ? "मूर्तीची माहिती" : "About the Idol"}
          </li>
        </ol>
      </nav>

      {/* Main Title Banner */}
      <div className="rounded-2xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-5 sm:p-8 text-center shadow-md">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
          <Flame size={14} className="text-accent" />
          {isMr ? "नवरात्रोत्सव २०२६ विशेष मूर्ती" : "Navratri 2026 Special Idol"}
        </span>

        <h1 className="deva-heading gradient-text mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold">
          {isMr ? "श्री छिन्नमस्ता माता मूर्ती" : "Shri Chhinnamasta Mata Idol"}
        </h1>

        <p className="deva-body mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {isMr
            ? "डांगरवाडा असोदा येथील न्यु प्रताप मित्र मंडळाच्या नवरात्रोत्सवात यंदा दहा महाविद्यांमधील सहावी महाविद्या श्री छिन्नमस्ता मातेची भव्य व तेजस्वी मूर्ती प्रतिष्ठापित करण्यात येत आहे."
            : "Nyu Pratap Mitra Mandal of Dangarvada Asoda proudly installs the awe-inspiring idol of Shri Chhinnamasta Mata, the Sixth Mahavidya, for Navratri 2026."}
        </p>
      </div>

      {/* ── SECTION 1: MANDAL IDOL SPECIFICATIONS GRID ───── */}
      <section className="mt-8" aria-label="Idol Specifications">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-white shadow">
            <Sparkles size={16} />
          </span>
          <h2 className="deva-heading text-xl sm:text-2xl font-bold text-foreground">
            {isMr ? "मूर्ती व मंडळ तपशील" : "Idol & Mandal Specifications"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {idolSpecs.map((spec, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:border-gold/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted shadow-inner">
                {spec.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="deva-body text-xs font-medium text-muted-foreground">
                  {isMr ? spec.label_mr : spec.label_en}
                </p>
                <p className="deva-heading text-sm sm:text-base font-bold text-foreground truncate mt-0.5">
                  {isMr ? spec.value_mr : spec.value_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: DARSHAN & AARTI TIMINGS ───────────── */}
      <section className="mt-8" aria-label="Darshan Timings">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Clock size={20} className="text-accent" />
            <h2 className="deva-heading text-lg sm:text-xl font-bold text-foreground">
              {isMr ? "दर्शन व महाआरती वेळा" : "Darshan & Maha Aarti Timings"}
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Darshan card */}
            <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
              <p className="deva-heading text-sm font-bold text-primary flex items-center gap-1.5">
                <Flame size={16} />
                {isMr ? "दर्शन वेळा (दररोज)" : "Daily Darshan Hours"}
              </p>
              <ul className="deva-body mt-2 space-y-1 text-xs sm:text-sm text-foreground/80">
                <li className="flex justify-between">
                  <span>{isMr ? "सकाळ सत्र:" : "Morning:"}</span>
                  <span className="font-semibold text-foreground">
                    {settings.darshan_morning_start} – {settings.darshan_morning_end}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>{isMr ? "संध्याकाळ सत्र:" : "Evening:"}</span>
                  <span className="font-semibold text-foreground">
                    {settings.darshan_evening_start} – {settings.darshan_evening_end}
                  </span>
                </li>
              </ul>
            </div>

            {/* Aarti card */}
            <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
              <p className="deva-heading text-sm font-bold text-accent flex items-center gap-1.5">
                <Sparkles size={16} />
                {isMr ? "महाआरती वेळा (दररोज)" : "Daily Maha Aarti"}
              </p>
              <ul className="deva-body mt-2 space-y-1 text-xs sm:text-sm text-foreground/80">
                <li className="flex justify-between">
                  <span>{isMr ? "सकाळची महाआरती:" : "Morning Aarti:"}</span>
                  <span className="font-semibold text-foreground">{settings.aarti_morning}</span>
                </li>
                <li className="flex justify-between">
                  <span>{isMr ? "संध्याकाळची महाआरती:" : "Evening Aarti:"}</span>
                  <span className="font-semibold text-foreground">{settings.aarti_evening}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: 5 DEVOTIONAL CHINNAMASTA SECTIONS ── */}
      <section className="mt-10" aria-label="About Shri Chhinnamasta Mata">
        <div className="text-center mb-6">
          <div className="ornament-divider text-xs font-bold uppercase tracking-wider text-gold mb-2">
            {isMr ? "महाविद्या रहस्य" : "Esoteric Wisdom"}
          </div>
          <h2 className="deva-heading gradient-text text-2xl sm:text-3xl font-extrabold">
            {isMr
              ? "श्री छिन्नमस्ता माता: सविस्तर माहिती"
              : "Shri Chhinnamasta Mata: Detailed Insights"}
          </h2>
          <p className="deva-body mt-1 text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
            {isMr
              ? "स्वरूप, पौराणिक कथा, आध्यात्मिक महत्त्व, जयंती व रजरप्पा तीर्थक्षेत्र"
              : "Form, origin story, yogic significance, rituals, and Rajrappa pilgrimage"}
          </p>
        </div>

        <div className="space-y-4">
          {CHINNAMASTA_SECTIONS.map((section) => (
            <div
              key={section.id}
              className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm transition-all hover:border-gold/50"
            >
              {/* Card Header */}
              <div className="flex items-start gap-3 pb-3 border-b border-border/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold shadow-inner mt-0.5">
                  {SECTION_ICON_MAP[section.icon] || <Sparkles size={18} />}
                </div>
                <div>
                  <h3 className="deva-heading text-lg sm:text-xl font-bold text-foreground">
                    {isMr ? section.title_mr : section.title_en}
                  </h3>
                  <p className="deva-body text-xs sm:text-sm font-medium text-accent">
                    {isMr ? section.subtitle_mr : section.subtitle_en}
                  </p>
                </div>
              </div>

              {/* Section Image (Points 1 to 5) */}
              {section.image && (
                <div className="mt-4 overflow-hidden rounded-xl border border-gold/40 shadow-md bg-muted/20">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-96 w-full">
                    <Image
                      src={section.image}
                      alt={isMr ? (section.imageAlt_mr || section.title_mr) : (section.imageAlt_en || section.title_en)}
                      fill
                      sizes="(max-width: 640px) 100vw, 680px"
                      className="object-contain object-center"
                      priority={section.id === "swaroop"}
                    />
                  </div>
                  {(isMr ? section.imageCaption_mr : section.imageCaption_en) && (
                    <div className="bg-gold/10 px-3 py-1.5 text-center border-t border-gold/20">
                      <p className="deva-body text-[11px] sm:text-xs font-semibold text-accent">
                        {isMr ? section.imageCaption_mr : section.imageCaption_en}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Text Paragraphs */}
              <div className="mt-3 space-y-2">
                {(isMr ? section.content_mr : section.content_en).map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="deva-body text-xs sm:text-sm text-foreground/85 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Key points box */}
              <div className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-3 sm:p-4">
                <p className="deva-heading text-xs font-bold uppercase tracking-wider text-gold mb-2">
                  {isMr ? "महत्त्वाचे पैलू:" : "Key Highlights:"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {(isMr ? section.keyPoints_mr : section.keyPoints_en).map((kp, kIdx) => (
                    <div key={kIdx} className="flex items-start gap-1.5">
                      <span className="font-bold text-foreground shrink-0">{kp.label}:</span>
                      <span className="text-foreground/80">{kp.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: DARSHAN ETIQUETTE & GUIDELINES ─────── */}
      <section className="mt-8" aria-label="Devotee Guidelines">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert size={20} className="text-primary" />
            <h3 className="deva-heading text-base sm:text-lg font-bold text-foreground">
              {isMr ? "भाविकांसाठी दर्शन सूचना व नियम" : "Devotee Darshan Guidelines"}
            </h3>
          </div>
          <ul className="deva-body space-y-2 text-xs sm:text-sm text-foreground/80">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>{isMr ? "दर्शन रांगेमध्ये शांतता राखावी व स्वयंसेवकांना सहकार्य करावे." : "Maintain silence in the darshan queue and cooperate with mandal volunteers."}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>{isMr ? "मंडपाच्या आत मोबाईल फोन सायलेंट मोडवर ठेवावेत." : "Please keep mobile phones on silent mode inside the sanctum."}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>{isMr ? "महिला, वृद्ध व लहान मुलांसाठी स्वतंत्र दर्शन रांगेची सोय उपलब्ध आहे." : "Dedicated separate darshan queues are provided for women, seniors, and children."}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 5: FOOTER NAVIGATION CTA ─────────────── */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between items-center pt-4 border-t border-border">
        <Link
          href="/devi-forms"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted hover:text-primary transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <span>{isMr ? "१० महाविद्या व नवदुर्गा रूपे पहा" : "Explore 10 Mahavidyas & Navdurga"}</span>
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/aarti"
          className="flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow-md hover:opacity-95 transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <span>{isMr ? "आरती वेळा व संग्रह" : "Aarti Lyrics & Timings"}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
