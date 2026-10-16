import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import LiveDarshanView from "@/components/live/LiveDarshanView";
import { Video, ArrowRight, MapPin, Flame } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isMr = locale === "mr";
  return {
    title: isMr
      ? "थेट दर्शन | श्री छिन्नमस्ता माता नवरात्रोत्सव २०२६ | असोदा"
      : "Live Darshan | Shri Chhinnamasta Mata Navratri 2026",
    description: isMr
      ? "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा — श्री छिन्नमस्ता माता थेट दर्शन, दैनिक महाआरती लाईव्ह व पुढील आरतीचे काउंटडाउन."
      : "Watch Shri Chhinnamasta Mata live darshan, daily 07:00 AM & 07:00 PM Maha Aarti live stream from Asoda, Jalgaon.",
  };
}

export default async function LiveDarshanPage({ params }: Props) {
  const { locale } = await params;
  const isMr = locale === "mr";

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
            {isMr ? "थेट दर्शन" : "Live Darshan"}
          </li>
        </ol>
      </nav>

      {/* ── HEADER BANNER ────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-5 sm:p-8 text-center shadow-md mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
          <Video size={14} className="text-accent" />
          {isMr ? "घरबसल्या आईचे दर्शन" : "Darshan From Anywhere"}
        </span>

        <h1 className="deva-heading gradient-text mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold">
          {isMr ? "थेट दर्शन व महाआरती प्रक्षेपण" : "Live Darshan & Maha Aarti"}
        </h1>

        <p className="deva-body mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {isMr
            ? "डांगरवाडा असोदा मंडपातून श्री छिन्नमस्ता मातेचे थेट दर्शन, दैनिक महाआरती (सकाळी ०७:०० आणि सायंकाळी ०७:००) आणि डिजिटल पुष्प अर्पण करा."
            : "Direct virtual darshan of Shri Chhinnamasta Mata from Mandal sanctum, Dangarvada Asoda."}
        </p>
      </div>

      {/* ── LIVE DARSHAN COMPONENT ───────────────────────── */}
      <LiveDarshanView locale={locale} />

      {/* ── NAVIGATION BOTTOM ACTIONS ────────────────────── */}
      <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-between items-center pt-5 border-t border-border">
        <Link
          href="/contact"
          className="flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow hover:opacity-95 transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <MapPin size={16} />
          <span>{isMr ? "मंडपात प्रत्यक्ष दर्शनासाठी मार्ग पहा" : "Get Directions to Mandal"}</span>
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/aarti"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <Flame size={16} className="text-accent" />
          <span>{isMr ? "आरती संग्रह व मंत्र" : "Aarti Collection"}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
