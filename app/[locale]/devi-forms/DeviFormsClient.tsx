"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { NAVDURGA_FORMS, NavdurgaForm } from "@/lib/data/navdurga";
import { MAHAVIDYAS } from "@/lib/data/mahavidyas";
import { CHINNAMASTA_SECTIONS } from "@/lib/data/chhinnamasta";
import {
  Flame,
  Sparkles,
  Copy,
  Check,
  Layers,
  ArrowRight,
} from "lucide-react";

interface DeviFormsClientProps {
  locale: string;
}

function getTodayNavdurgaDay(): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 9 is October (0-indexed)
  const date = now.getDate();

  // If in October 2026
  if (year === 2026 && month === 9) {
    if (date >= 11 && date <= 19) {
      return date - 10;
    }
    if (date > 19) return 9;
    return 1;
  }

  // Fallback: check 9-day range around festival
  const start = new Date(year, 9, 11);
  const diff =
    Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  if (diff >= 1 && diff <= 9) return diff;
  return 1;
}

export default function DeviFormsClient({ locale }: DeviFormsClientProps) {
  const isMr = locale === "mr";
  const todayDayNumber = getTodayNavdurgaDay();

  // Tab state: 'navdurga' | 'mahavidyas' | 'chhinnamasta'
  const [activeTab, setActiveTab] = useState<"navdurga" | "mahavidyas" | "chhinnamasta">("navdurga");

  // Navdurga selected day (1 to 9) - defaults to current day of festival
  const [selectedDay, setSelectedDay] = useState<number>(() => getTodayNavdurgaDay());

  const activeChipRef = useRef<HTMLButtonElement | null>(null);
  const chipsContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll active day chip inside horizontal container only
  useEffect(() => {
    if (activeTab === "navdurga" && activeChipRef.current && chipsContainerRef.current) {
      const container = chipsContainerRef.current;
      const chip = activeChipRef.current;
      const scrollPos =
        chip.offsetLeft - container.clientWidth / 2 + chip.clientWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollPos), behavior: "smooth" });
    }
  }, [activeTab]);

  // Mantra copied state
  const [copiedMantra, setCopiedMantra] = useState<string | null>(null);

  const activeNavdurga: NavdurgaForm =
    NAVDURGA_FORMS.find((f) => f.day === selectedDay) || NAVDURGA_FORMS[0];

  function handleCopy(mantra: string) {
    navigator.clipboard.writeText(mantra);
    setCopiedMantra(mantra);
    setTimeout(() => setCopiedMantra(null), 2000);
  }

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
            {isMr ? "देवीचे नऊ रूपे व महाविद्या" : "Devi Forms & Mahavidyas"}
          </li>
        </ol>
      </nav>

      {/* ── HEADER BANNER ────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-5 sm:p-8 text-center shadow-md">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
          <Flame size={14} className="text-accent" />
          {isMr ? "आदिशक्तीचे दिव्य अवतार" : "Divine Manifestations"}
        </span>

        <h1 className="deva-heading gradient-text mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold">
          {isMr ? "देवीचे नऊ रूपे व १० महाविद्या" : "Nine Navdurga & Ten Mahavidyas"}
        </h1>

        <p className="deva-body mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {isMr
            ? "नवरात्रीच्या नऊ दिवसांची नऊ पवित्र नवदुर्गा रूपे आणि यंदा मंडळाने प्रतिष्ठापित केलेल्या श्री छिन्नमस्ता मातेसह दहा महाविद्यांचे सविस्तर दर्शन."
            : "Explore the nine sacred forms of Navdurga worshipped during Navratri, and the ten Mahavidyas featuring our 2026 deity, Shri Chhinnamasta Mata."}
        </p>

        {/* ── MAIN NAVIGATION TABS ─────────────────────────── */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center rounded-2xl border border-border/80 bg-background/95 dark:bg-card/95 p-1.5 shadow-sm max-w-full overflow-x-auto no-scrollbar gap-1">
            <button
              onClick={() => setActiveTab("navdurga")}
              className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold transition-all min-h-[44px] whitespace-nowrap ${
                activeTab === "navdurga"
                  ? "bg-gradient-to-r from-[#A51C1D] via-[#CC3C1F] to-[#E55D1C] text-white shadow-md"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Sparkles size={16} className={activeTab === "navdurga" ? "text-white" : "text-foreground/70"} />
              <span>{isMr ? "९ नवदुर्गा रूपे" : "9 Navdurga Forms"}</span>
            </button>
            <button
              onClick={() => setActiveTab("mahavidyas")}
              className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold transition-all min-h-[44px] whitespace-nowrap ${
                activeTab === "mahavidyas"
                  ? "bg-gradient-to-r from-[#A51C1D] via-[#CC3C1F] to-[#E55D1C] text-white shadow-md"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Layers size={16} className={activeTab === "mahavidyas" ? "text-white" : "text-foreground/70"} />
              <span>{isMr ? "१० महाविद्या" : "10 Mahavidyas"}</span>
            </button>
            <button
              onClick={() => setActiveTab("chhinnamasta")}
              className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold transition-all min-h-[44px] whitespace-nowrap ${
                activeTab === "chhinnamasta"
                  ? "bg-gradient-to-r from-[#A51C1D] via-[#CC3C1F] to-[#E55D1C] text-white shadow-md"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Flame size={16} className={activeTab === "chhinnamasta" ? "text-white" : "text-accent"} />
              <span>{isMr ? "छिन्नमस्ता विशेष" : "Chhinnamasta Special"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────── */}
      {/* TAB 1: NAVDURGA (9 FORMS)                           */}
      {/* ─────────────────────────────────────────────────── */}
      {activeTab === "navdurga" && (
        <section className="mt-8" aria-label="Navdurga Forms">
          {/* Horizontally scrollable snap tabs */}
          <div ref={chipsContainerRef} className="snap-row no-scrollbar pb-3 border-b border-border/70">
            {NAVDURGA_FORMS.map((form) => {
              const isSelected = form.day === selectedDay;
              const isToday = form.day === todayDayNumber;
              return (
                <button
                  key={form.day}
                  ref={isSelected ? activeChipRef : null}
                  onClick={() => setSelectedDay(form.day)}
                  className={`snap-start flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all min-h-[48px] ${
                    isSelected
                      ? "bg-primary text-white shadow-md scale-105"
                      : "border border-border/80 bg-card text-foreground/80 hover:bg-muted"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span
                    className="inline-block h-3 w-3 rounded-full shadow-sm shrink-0"
                    style={{ backgroundColor: form.colorHex }}
                    aria-hidden="true"
                  />
                  <span>
                    {isMr ? `दिवस ${form.day}: ${form.name_mr}` : `Day ${form.day}: ${form.name_en}`}
                  </span>
                  {isToday && (
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold uppercase ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-gold/20 text-gold border border-gold/40"
                      }`}
                    >
                      {isMr ? "आज" : "Today"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Navdurga Detailed Card */}
          <div className="mt-6 overflow-hidden rounded-2xl border-2 border-gold/40 bg-card p-5 sm:p-7 shadow-lg">
            {/* Top Bar with Badge & Color */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-extrabold shadow"
                  style={{ backgroundColor: activeNavdurga.colorHex }}
                >
                  {activeNavdurga.day}
                </span>
                <div>
                  <h2 className="deva-heading text-2xl sm:text-3xl font-bold text-foreground">
                    {isMr ? `माता ${activeNavdurga.name_mr}` : `Mata ${activeNavdurga.name_en}`}
                  </h2>
                  <p className="deva-heading text-xs sm:text-sm font-semibold text-accent">
                    {isMr ? activeNavdurga.epithet_mr : activeNavdurga.epithet_en}
                  </p>
                </div>
              </div>

              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: activeNavdurga.colorHex }}
              >
                {isMr ? activeNavdurga.color_mr : activeNavdurga.color_en}
              </span>
            </div>

            {/* Sacred Mantra with Copy Action */}
            <div className="mt-5 rounded-xl border border-gold/40 bg-gold/10 p-4 text-center relative group">
              <p className="deva-heading text-xs font-bold uppercase tracking-wider text-gold mb-1">
                {isMr ? "॥ सिद्ध बीज मंत्र ॥" : "Sacred Mantra"}
              </p>
              <p className="deva-heading text-base sm:text-lg md:text-xl font-bold text-foreground/95 select-all">
                {activeNavdurga.mantra}
              </p>
              <button
                onClick={() => handleCopy(activeNavdurga.mantra)}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-gold/40 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-gold/20 transition-all min-h-[36px]"
                aria-label="Copy mantra"
              >
                {copiedMantra === activeNavdurga.mantra ? (
                  <>
                    <Check size={14} className="text-green-600" />
                    <span>{isMr ? "मंत्र कॉपी झाला!" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>{isMr ? "मंत्र कॉपी करा" : "Copy Mantra"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Attributes Grid */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/70 bg-muted/40 p-3.5">
                <p className="deva-body text-xs text-muted-foreground">{isMr ? "वाहन" : "Vehicle"}</p>
                <p className="deva-heading text-sm font-bold text-foreground mt-0.5">
                  {isMr ? activeNavdurga.vahana_mr : activeNavdurga.vahana_en}
                </p>
              </div>
              <div className="rounded-xl border border-border/70 bg-muted/40 p-3.5">
                <p className="deva-body text-xs text-muted-foreground">{isMr ? "शस्त्र व अस्त्र" : "Weapons"}</p>
                <p className="deva-heading text-sm font-bold text-foreground mt-0.5">
                  {isMr ? activeNavdurga.weapons_mr : activeNavdurga.weapons_en}
                </p>
              </div>
              <div className="rounded-xl border border-border/70 bg-muted/40 p-3.5">
                <p className="deva-body text-xs text-muted-foreground">{isMr ? "शुभ रंग" : "Color"}</p>
                <p className="deva-heading text-sm font-bold text-foreground mt-0.5">
                  {isMr ? activeNavdurga.color_mr : activeNavdurga.color_en}
                </p>
              </div>
              <div className="rounded-xl border border-border/70 bg-muted/40 p-3.5">
                <p className="deva-body text-xs text-muted-foreground">{isMr ? "प्रसाद / नैवेद्य" : "Prasad Offering"}</p>
                <p className="deva-heading text-sm font-bold text-foreground mt-0.5">
                  {isMr ? activeNavdurga.prasad_mr : activeNavdurga.prasad_en}
                </p>
              </div>
            </div>

            {/* Significance Description */}
            <div className="mt-5">
              <h3 className="deva-heading text-sm font-bold text-foreground mb-1.5">
                {isMr ? "आध्यात्मिक महत्त्व व उपासना फळ:" : "Spiritual Significance:"}
              </h3>
              <p className="deva-body text-sm text-foreground/85 leading-relaxed">
                {isMr ? activeNavdurga.significance_mr : activeNavdurga.significance_en}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────── */}
      {/* TAB 2: 10 MAHAVIDYAS                                */}
      {/* ─────────────────────────────────────────────────── */}
      {activeTab === "mahavidyas" && (
        <section className="mt-8" aria-label="10 Mahavidyas">
          <div className="text-center mb-6">
            <h2 className="deva-heading gradient-text text-2xl sm:text-3xl font-extrabold">
              {isMr ? "दहा महाविद्या स्वरूप व रहस्य" : "The Ten Mahavidyas"}
            </h2>
            <p className="deva-body mt-1 text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
              {isMr
                ? "यंदाच्या न्यु प्रताप मित्र मंडळाची आराध्य देवता 'श्री छिन्नमस्ता माता' या सहाव्या महाविद्या आहेत."
                : "Highlighting our 2026 Mandal Deity, Shri Chhinnamasta Mata, the Sixth Mahavidya."}
            </p>
          </div>

          <div className="space-y-4">
            {MAHAVIDYAS.map((m) => {
              const isHighlight = m.isMandaldol;

              return (
                <div
                  key={m.number}
                  className={`rounded-2xl p-5 sm:p-6 transition-all ${
                    isHighlight
                      ? "border-2 border-gold bg-gradient-to-r from-gold/15 via-card to-accent/10 shadow-xl ring-2 ring-gold/40 relative overflow-hidden"
                      : "border border-border/80 bg-card shadow-sm hover:border-gold/40"
                  }`}
                >
                  {/* Mandal Deity Ribbon for Chhinnamasta */}
                  {isHighlight && (
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gold bg-gold/20 px-3.5 py-1 text-xs font-extrabold text-foreground shadow-sm">
                      <Flame size={14} className="text-accent animate-pulse" />
                      <span>{isMr ? "★ २०२६ न्यु प्रताप मित्र मंडळ आराध्य देवता ★" : "★ 2026 Mandal Presiding Deity ★"}</span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-border/60">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-extrabold text-sm ${
                          isHighlight
                            ? "bg-gold text-slate-900 shadow"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {m.number}
                      </span>
                      <div>
                        <h3 className="deva-heading text-lg sm:text-xl font-bold text-foreground">
                          {isMr ? `${m.number}. माता ${m.name_mr}` : `${m.number}. Mata ${m.name_en}`}
                        </h3>
                        <p className="deva-body text-xs sm:text-sm font-semibold text-accent">
                          {isMr ? m.title_mr : m.title_en}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mantra */}
                  <div className="mt-3 rounded-lg border border-gold/30 bg-gold/5 px-3 py-2 text-center">
                    <p className="deva-heading text-xs sm:text-sm font-bold text-foreground/90">
                      {m.mantra}
                    </p>
                  </div>

                  {/* Attributes */}
                  <div className="mt-3 text-xs">
                    <span className="font-bold text-foreground">{isMr ? "स्वरूप व अस्त्र:" : "Attributes:"} </span>
                    <span className="text-foreground/80">{isMr ? m.attributes_mr : m.attributes_en}</span>
                  </div>

                  {/* Significance */}
                  <p className="deva-body mt-2 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                    {isMr ? m.significance_mr : m.significance_en}
                  </p>

                  {/* Direct link for Chhinnamasta */}
                  {isHighlight && (
                    <div className="mt-4 pt-3 border-t border-gold/30 flex justify-end">
                      <Link
                        href="/idol"
                        className="inline-flex items-center gap-1.5 rounded-lg gradient-primary px-4 py-2 text-xs font-bold text-white shadow hover:opacity-95 transition-opacity min-h-[40px]"
                      >
                        <span>{isMr ? "मूर्ती व स्वरूप सविस्तर पहा" : "View Complete Idol Details"}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────── */}
      {/* TAB 3: CHINNAMASTA SPECIAL (5 CARDS)                */}
      {/* ─────────────────────────────────────────────────── */}
      {activeTab === "chhinnamasta" && (
        <section className="mt-8 space-y-4" aria-label="Chhinnamasta Deep Dive">
          <div className="text-center mb-6">
            <h2 className="deva-heading gradient-text text-2xl sm:text-3xl font-extrabold">
              {isMr ? "श्री छिन्नमस्ता माता: पंच रहस्य" : "Shri Chhinnamasta Mata: Five Revelations"}
            </h2>
            <p className="deva-body mt-1 text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
              {isMr
                ? "स्वरूप, पौराणिक कथा, कुंडलिनी जागृती, उपासना विधी व रजरप्पा तीर्थक्षेत्र"
                : "Iconography, origin story, Kundalini awakening, worship, and Rajrappa pilgrimage"}
            </p>
          </div>

          {CHINNAMASTA_SECTIONS.map((section) => (
            <div
              key={section.id}
              className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm hover:border-gold/50 transition-all"
            >
              <div className="pb-3 border-b border-border/60">
                <h3 className="deva-heading text-lg sm:text-xl font-bold text-foreground">
                  {isMr ? section.title_mr : section.title_en}
                </h3>
                <p className="deva-body text-xs sm:text-sm font-semibold text-accent mt-0.5">
                  {isMr ? section.subtitle_mr : section.subtitle_en}
                </p>
              </div>

              {/* Section Image (if present, e.g. Point 1) */}
              {section.image && (
                <div className="mt-4 overflow-hidden rounded-xl border border-gold/40 shadow-md bg-muted/20">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-96 w-full">
                    <Image
                      src={section.image}
                      alt={isMr ? (section.imageAlt_mr || section.title_mr) : (section.imageAlt_en || section.title_en)}
                      fill
                      sizes="(max-width: 640px) 100vw, 680px"
                      className="object-contain object-center"
                      priority
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

              <div className="mt-3 space-y-2">
                {(isMr ? section.content_mr : section.content_en).map((p, idx) => (
                  <p key={idx} className="deva-body text-xs sm:text-sm text-foreground/85 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-3 sm:p-4">
                <p className="deva-heading text-xs font-bold uppercase tracking-wider text-gold mb-2">
                  {isMr ? "महत्त्वाचे सार:" : "Key Essence:"}
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
        </section>
      )}

      {/* ── BOTTOM ACTIONS ───────────────────────────────── */}
      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-between items-center pt-5 border-t border-border">
        <Link
          href="/idol"
          className="flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-white shadow hover:opacity-95 transition-all min-h-[48px] w-full sm:w-auto justify-center"
        >
          <span>{isMr ? "मंडळाच्या मूर्तीची संपूर्ण माहिती" : "Mandal Idol Details"}</span>
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
