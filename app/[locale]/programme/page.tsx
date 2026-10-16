import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getFestivalEvents } from "@/lib/data/programme";
import ProgrammeTimeline from "@/components/programme/ProgrammeTimeline";
import { Calendar, ArrowRight, MapPin } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.programme" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProgrammePage({ params }: Props) {
  const { locale } = await params;
  const isMr = locale === "mr";
  const events = await getFestivalEvents();

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-6 sm:py-10 animate-fade-in-up">
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
            {isMr ? "कार्यक्रम पत्रिका" : "Programme Timetable"}
          </li>
        </ol>
      </nav>

      {/* ── HEADER BANNER ────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-5 sm:p-8 text-center shadow-md mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
          <Calendar size={14} className="text-accent" />
          {isMr ? "नवरात्रोत्सव २०२६ — ९ दिवसांची रूपरेषा" : "Navratri 2026 — 9 Days Timetable"}
        </span>

        <h1 className="deva-heading gradient-text mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold">
          {isMr ? "दैनिक कार्यक्रम पत्रिका" : "Festival Programme Schedule"}
        </h1>

        <p className="deva-body mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {isMr
            ? "घटस्थापना, महाआरती, गरबा रास, नवचंडी हवन, कन्या पूजन, महाप्रसाद भंडारा व विसर्जन मिरवणुकीची संपूर्ण तारीख व वेळ."
            : "Complete schedule of Ghatasthapana, daily Maha Aartis, Garba Raas, Kanya Pujan, Mahaprasad, and grand Visarjan procession."}
        </p>

        {/* Venue Pill */}
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3.5 py-1 text-xs font-semibold text-foreground/90 shadow-sm">
          <MapPin size={13} className="text-primary" />
          <span>{isMr ? "स्थान: न्यु प्रताप मित्र मंडळ चौक, डांगरवाडा असोदा" : "Venue: Mandal Chowk, Dangarvada Asoda"}</span>
        </div>
      </div>

      {/* ── VERTICAL TIMELINE COMPONENT ──────────────────── */}
      <ProgrammeTimeline events={events} locale={locale} />

      {/* ── BOTTOM ACTIONS ───────────────────────────────── */}
      <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-between items-center pt-5 border-t border-border">
        <Link
          href="/gallery"
          className="flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow hover:opacity-95 transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <span>{isMr ? "उत्सवाचे छायाचित्र दालन पहा" : "View Photo Gallery"}</span>
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/aarti"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <span>{isMr ? "आरती वेळा व संग्रह" : "Aarti Collection"}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
