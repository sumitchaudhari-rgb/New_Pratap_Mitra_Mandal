import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Home, ChevronRight, MessageSquareHeart, Brain, Radio } from "lucide-react";
import WishesWall from "@/components/wishes/WishesWall";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isMr = locale === "mr";

  return {
    title: isMr
      ? "शुभेच्छा भिंत — श्री छिन्नमस्ता माता नवरात्रोत्सव २०२६ | न्यु प्रताप मित्र मंडळ"
      : "Wishes Wall — Shri Chhinnamasta Mata Navratri 2026 | New Pratap Mitra Mandal",
    description: isMr
      ? "श्री छिन्नमस्ता मातेच्या चरणी आपल्या मंगल मनोकामना, नवस व शुभेच्छा अर्पण करा. न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा."
      : "Offer your sacred wishes, prayers, and vows at the lotus feet of Shri Chhinnamasta Mata. New Pratap Mitra Mandal, Dangarvada Asoda.",
  };
}

export default async function WishesPage({ params }: Props) {
  const { locale } = await params;
  const isMr = locale === "mr";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* ── BREADCRUMBS ──────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors min-h-[36px]"
            >
              <Home size={14} />
              <span>{isMr ? "मुख्यपृष्ठ" : "Home"}</span>
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li className="font-semibold text-foreground" aria-current="page">
            {isMr ? "शुभेच्छा भिंत" : "Wishes Wall"}
          </li>
        </ol>
      </nav>

      {/* ── HEADER BANNER ────────────────────────────────── */}
      <div className="rounded-3xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-gold/10 p-5 sm:p-8 text-center shadow-md mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
          <MessageSquareHeart size={14} className="text-accent" />
          {isMr ? "डिजिटल प्रार्थना व आशीर्वाद" : "Sacred Prayers & Blessings"}
        </span>

        <h1 className="deva-heading gradient-text mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold">
          {isMr ? "भाविकांची शुभेच्छा भिंत" : "Devotees Wishes Wall"}
        </h1>

        <p className="deva-body mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {isMr
            ? "डांगरवाडा असोदा येथील श्री छिन्नमस्ता मातेच्या चरणी आपल्या श्रद्धापूर्वक मनोकामना व्यक्त करा व इतर भाविकांच्या प्रार्थनांना पुष्प अर्पण करा."
            : "Express your devotional wishes and vows at the lotus feet of Maa Chhinnamasta and offer digital flowers to fellow devotees' prayers."}
        </p>
      </div>

      {/* ── INTERACTIVE WISHES WALL ──────────────────────── */}
      <WishesWall locale={locale} />

      {/* ── BOTTOM ACTIONS ───────────────────────────────── */}
      <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-between items-center pt-5 border-t border-border">
        <Link
          href="/quiz"
          className="flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow hover:opacity-95 transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <Brain size={16} />
          <span>{isMr ? "देवी प्रश्नमंजुषा खेळा 🏆" : "Play Devi Quiz 🏆"}</span>
        </Link>

        <Link
          href="/live"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-foreground hover:bg-muted/60 transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <Radio size={16} className="text-red-500" />
          <span>{isMr ? "थेट दर्शन पहा" : "Watch Live Darshan"}</span>
        </Link>
      </div>
    </div>
  );
}
