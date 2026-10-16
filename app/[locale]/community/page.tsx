import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import CommunityView from "@/components/community/CommunityView";
import { Users, ArrowRight, HeartHandshake, MapPin } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isMr = locale === "mr";
  return {
    title: isMr
      ? "आमचा समाज, इतिहास व देणगीदार | न्यु प्रताप मित्र मंडळ असोदा"
      : "Community, History & Donors | New Pratap Mitra Mandal",
    description: isMr
      ? "१९८० पासूनचा मंडळाचा गौरवशाली इतिहास, पदाधिकारी व कार्यकर्ते, सन्माननीय देणगीदार यादी आणि ऑनलाइन UPI देणगी."
      : "44-year history of New Pratap Mitra Mandal, committee members, honored donors list, and secure mobile UPI donation.",
  };
}

export default async function CommunityPage({ params }: Props) {
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
            {isMr ? "आमचा समाज व इतिहास" : "Community & History"}
          </li>
        </ol>
      </nav>

      {/* ── HEADER BANNER ────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-5 sm:p-8 text-center shadow-md mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
          <Users size={14} className="text-accent" />
          {isMr ? "ऐक्य, भक्ती व परंपरा" : "Unity, Devotion & Heritage"}
        </span>

        <h1 className="deva-heading gradient-text mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold">
          {isMr ? "मंडळ इतिहास व कार्यकारिणी" : "Mandal Community & Heritage"}
        </h1>

        <p className="deva-body mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {isMr
            ? "१९८० च्या स्थापनेपासूनचा अखंड प्रवास, प्रमुख कार्यकारिणी पदाधिकारी व उत्सव देणगी."
            : "Explore our 44-year legacy since 1980, dedicated volunteer committee, and digital UPI contributions."}
        </p>
      </div>

      {/* ── COMMUNITY VIEW COMPONENT ─────────────────────── */}
      <CommunityView locale={locale} />

      {/* ── NAVIGATION BOTTOM ACTIONS ────────────────────── */}
      <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-between items-center pt-5 border-t border-border">
        <Link
          href="/contact"
          className="flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow hover:opacity-95 transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <MapPin size={16} />
          <span>{isMr ? "मंडप पत्ता व संपर्क केंद्र" : "Venue & Contact"}</span>
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/gallery"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <span>{isMr ? "छायाचित्र दालन पहा" : "Photo Gallery"}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
