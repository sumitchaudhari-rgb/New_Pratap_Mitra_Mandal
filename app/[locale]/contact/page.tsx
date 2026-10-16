import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import ContactLocationView from "@/components/contact/ContactLocationView";
import { MapPin, ArrowRight, Video, Flame } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isMr = locale === "mr";
  return {
    title: isMr
      ? "संपर्क व स्थान | न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा"
      : "Contact & Location | New Pratap Mitra Mandal Asoda",
    description: isMr
      ? "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा, जि. जळगाव — Google Maps मार्ग, संपर्क क्रमांक ०२५७-२२३४५६७, वाहनतळ व भाविक सुविधांची माहिती."
      : "Official venue address, route directions from Jalgaon station, Google Maps link, and facilities at New Pratap Mitra Mandal, Dangarvada Asoda.",
  };
}

export default async function ContactPage({ params }: Props) {
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
            {isMr ? "संपर्क व मंडप स्थान" : "Contact & Location"}
          </li>
        </ol>
      </nav>

      {/* ── HEADER BANNER ────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-5 sm:p-8 text-center shadow-md mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
          <MapPin size={14} className="text-accent" />
          {isMr ? "मंडप पत्ता व संपर्क" : "Venue & Help Desk"}
        </span>

        <h1 className="deva-heading gradient-text mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold">
          {isMr ? "मंडप स्थान व संपर्क केंद्र" : "Venue Location & Contact"}
        </h1>

        <p className="deva-body mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {isMr
            ? "डांगरवाडा असोदा येथील मंडप परिसराचा Google Maps नकाशा, जळगाव शहरावरून येण्याचे मार्ग आणि भाविकांसाठी सर्व मोफत सुविधा."
            : "Directions to Dangarvada Asoda from Jalgaon, 1-tap Google Maps navigation, parking, and visitor amenities."}
        </p>
      </div>

      {/* ── CONTACT & LOCATION VIEW COMPONENT ────────────── */}
      <ContactLocationView locale={locale} />

      {/* ── NAVIGATION BOTTOM ACTIONS ────────────────────── */}
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
          <span>{isMr ? "कार्यक्रम पत्रिका पहा" : "View Programme"}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
