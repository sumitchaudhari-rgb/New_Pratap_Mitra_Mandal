import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Home, ChevronRight, Brain, MessageSquareHeart, Mic2 } from "lucide-react";
import DeviQuiz from "@/components/quiz/DeviQuiz";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isMr = locale === "mr";

  return {
    title: isMr
      ? "नवदुर्गा व छिन्नमस्ता माता प्रश्नमंजुषा — नवरात्रोत्सव २०२६ | न्यु प्रताप मित्र मंडळ"
      : "Navdurga & Chhinnamasta Mata Quiz — Navratri 2026 | New Pratap Mitra Mandal",
    description: isMr
      ? "नवदुर्गेची ९ रूपे, ६ वी महाविद्या छिन्नमस्ता माता व डांगरवाडा असोदा उत्सवावर आधारित १० प्रश्न सोडवा आणि प्रमाणपत्र मिळवा."
      : "Answer 10 sacred questions on Navdurga, Goddess Chhinnamasta, and Dangarvada Asoda festival. Score and share on WhatsApp.",
  };
}

export default async function QuizPage({ params }: Props) {
  const { locale } = await params;
  const isMr = locale === "mr";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
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
            {isMr ? "प्रश्नमंजुषा" : "Quiz"}
          </li>
        </ol>
      </nav>

      {/* ── HEADER BANNER ────────────────────────────────── */}
      <div className="rounded-3xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-gold/10 p-5 sm:p-8 text-center shadow-md mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
          <Brain size={14} className="text-accent" />
          {isMr ? "भक्ती व ज्ञान चाचणी" : "Devotional Quiz"}
        </span>

        <h1 className="deva-heading gradient-text mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold">
          {isMr ? "नवदुर्गा व छिन्नमस्ता प्रश्नमंजुषा" : "Devi & Chhinnamasta Quiz"}
        </h1>

        <p className="deva-body mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {isMr
            ? "नवरात्रीचे ९ दिवस, श्री छिन्नमस्ता मातेचे स्वरूप आणि न्यु प्रताप मित्र मंडळाच्या ४४ वर्षांच्या इतिहासाबद्दल आपले ज्ञान तपासा."
            : "Test your knowledge about the 9 forms of Navdurga, 6th Mahavidya Chhinnamasta Mata, and the 44-year legacy of New Pratap Mitra Mandal."}
        </p>
      </div>

      {/* ── INTERACTIVE QUIZ COMPONENT ───────────────────── */}
      <DeviQuiz locale={locale} />

      {/* ── BOTTOM ACTIONS ───────────────────────────────── */}
      <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-between items-center pt-5 border-t border-border">
        <Link
          href="/wishes"
          className="flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow hover:opacity-95 transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <MessageSquareHeart size={16} />
          <span>{isMr ? "मातेला शुभेच्छा अर्पण करा ✍️" : "Offer Wishes to Mata ✍️"}</span>
        </Link>

        <Link
          href="/aarti"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-foreground hover:bg-muted/60 transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <Mic2 size={16} className="text-primary" />
          <span>{isMr ? "आरती संग्रह वाचा" : "Read Aarti Collection"}</span>
        </Link>
      </div>
    </div>
  );
}
