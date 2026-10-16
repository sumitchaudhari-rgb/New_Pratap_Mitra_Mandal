import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import AartiReader from "@/components/aarti/AartiReader";
import AartiYajmanSchedule from "@/components/aarti/AartiYajmanSchedule";
import { Flame, ArrowRight, Video, MapPin, Users } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isMr = locale === "mr";
  return {
    title: isMr
      ? "आरती संग्रह व दैनिक मानकरी सूची | न्यु प्रताप मित्र मंडळ असोदा"
      : "Aarti Collection & Daily Yajman Schedule | New Pratap Mitra Mandal",
    description: isMr
      ? "आज कोणाची आरती आहे? १० दिवसांचे सकाळ-सायंकाळ आरती मानकरी, प्रसाद व संपूर्ण आरती संग्रह - न्यु प्रताप मित्र मंडळ असोदा."
      : "Daily Maha Aarti hosts and prasad schedule, traditional Marathi Aartis, Chhinnamasta Dhyan Mantra with screen-awake feature.",
  };
}

export default async function AartiPage({ params }: Props) {
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
            {isMr ? "आरती संग्रह व मानकरी" : "Aarti & Yajman"}
          </li>
        </ol>
      </nav>

      {/* ── HEADER BANNER ────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-5 sm:p-8 text-center shadow-md mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
          <Flame size={14} className="text-accent" />
          {isMr ? "मंगल आरती व उपासना" : "Sacred Chants & Prayers"}
        </span>

        <h1 className="deva-heading gradient-text mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold">
          {isMr ? "श्री देवी आरती संग्रह व दैनिक मानकरी" : "Sacred Aarti & Daily Yajman"}
        </h1>

        <p className="deva-body mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {isMr
            ? "दररोज सकाळी ०७:०० आणि सायंकाळी ०७:०० वाजता होणाऱ्या महाआरतीचे मानकरी, यजमान व संपूर्ण आरती संग्रह."
            : "Daily 07:00 AM & 07:00 PM Maha Aarti hosts, prasad sponsors and complete authentic Marathi lyrics."}
        </p>

        {/* Quick Jump buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <a
            href="#aarti-yajman"
            className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 hover:bg-gold/30 border border-gold/50 px-3.5 py-1.5 text-xs font-bold text-gold transition-colors"
          >
            <Users size={13} />
            <span>{isMr ? "आजचे आरती मानकरी पहा" : "View Today's Aarti Hosts"}</span>
          </a>
          <a
            href="#aarti-reader"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 px-3.5 py-1.5 text-xs font-bold text-primary transition-colors"
          >
            <Flame size={13} />
            <span>{isMr ? "आरती वाचन सुरू करा" : "Read Aarti Lyrics"}</span>
          </a>
        </div>
      </div>

      {/* ── AARTI YAJMAN SCHEDULE (आज कोणाची आरती आहे?) ───── */}
      <section id="aarti-yajman" className="mb-10 scroll-mt-20">
        <AartiYajmanSchedule locale={locale} />
      </section>

      {/* ── AARTI READER COMPONENT ───────────────────────── */}
      <section id="aarti-reader" className="scroll-mt-20">
        <AartiReader locale={locale} />
      </section>

      {/* ── NAVIGATION BOTTOM LINKS ──────────────────────── */}
      <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-between items-center pt-5 border-t border-border">
        <Link
          href="/live"
          className="flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow hover:opacity-95 transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <Video size={16} />
          <span>{isMr ? "थेट महाआरती दर्शन पहा" : "Watch Live Aarti"}</span>
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/programme"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <span>{isMr ? "संपूर्ण कार्यक्रम पत्रिका" : "Festival Programme"}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
