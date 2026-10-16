"use client";

import { useState, useEffect } from "react";
import { AARTIS_DATA, AartiItem } from "@/lib/data/aartis";
import {
  Flame,
  Type,
  Sun,
  Copy,
  Check,
  Bell,
  Volume2,
  VolumeX,
  Share2,
  Clock,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface AartiReaderProps {
  locale: string;
}

export default function AartiReader({ locale }: AartiReaderProps) {
  const isMr = locale === "mr";

  // Selected aarti
  const [selectedId, setSelectedId] = useState<string>(AARTIS_DATA[0].id);

  // Font size multiplier: 0 = normal (text-base), 1 = large (text-lg), 2 = extra-large (text-xl), 3 = max (text-2xl)
  const [fontSizeStep, setFontSizeStep] = useState<number>(1);

  // Screen Wake Lock state
  const [wakeLockActive, setWakeLockActive] = useState<boolean>(false);
  const [wakeLockSupported, setWakeLockSupported] = useState<boolean>(true);

  // Copy state
  const [copied, setCopied] = useState<boolean>(false);

  // Show meaning
  const [showMeaning, setShowMeaning] = useState<boolean>(false);

  // Bell audio chime state
  const [ringing, setRinging] = useState<boolean>(false);

  const currentAarti: AartiItem =
    AARTIS_DATA.find((a) => a.id === selectedId) || AARTIS_DATA[0];

  // Wake Lock handler
  useEffect(() => {
    let sentinel: any = null;

    if (!("wakeLock" in navigator)) {
      setWakeLockSupported(false);
      return;
    }

    async function toggleLock() {
      if (wakeLockActive) {
        try {
          sentinel = await (navigator as any).wakeLock.request("screen");
          sentinel.addEventListener("release", () => {
            setWakeLockActive(false);
          });
        } catch {
          setWakeLockActive(false);
        }
      } else if (sentinel) {
        sentinel.release();
        sentinel = null;
      }
    }

    if (wakeLockActive) {
      toggleLock();
    }

    return () => {
      if (sentinel) sentinel.release();
    };
  }, [wakeLockActive]);

  // Authentic temple brass bell sound generated via Web Audio API (No external file needed)
  function playTempleBell() {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      setRinging(true);
      setTimeout(() => setRinging(false), 1800);

      const now = ctx.currentTime;
      // Fundamental + harmonics for brass bell
      const freqs = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6 harmonics
      const gains = [0.4, 0.25, 0.15, 0.08];

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(gains[i], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.3);
      });
    } catch {
      // AudioContext unavailable or blocked by autoplay
    }
  }

  function handleCopy() {
    const text = currentAarti.lyrics_mr.join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: isMr ? currentAarti.title_mr : currentAarti.title_en,
        text: `${isMr ? currentAarti.title_mr : currentAarti.title_en} — न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  }

  // Font size classes
  const fontSizes = [
    "text-sm sm:text-base leading-loose",
    "text-base sm:text-lg leading-loose",
    "text-lg sm:text-xl leading-loose",
    "text-xl sm:text-2xl leading-loose font-medium",
  ];

  return (
    <div className="w-full">
      {/* ── AARTI SELECTION TABS ─────────────────────────── */}
      <div className="snap-row no-scrollbar pb-3 border-b border-border/70 mb-6 gap-2">
        {AARTIS_DATA.map((aarti) => {
          const isSelected = aarti.id === selectedId;
          return (
            <button
              key={aarti.id}
              onClick={() => {
                setSelectedId(aarti.id);
                setShowMeaning(false);
              }}
              type="button"
              className={`snap-start flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all min-h-[46px] whitespace-nowrap ${
                isSelected
                  ? "gradient-primary text-white shadow-md scale-102"
                  : "border border-border/80 bg-card text-foreground/80 hover:bg-muted"
              }`}
            >
              <Flame size={15} className={isSelected ? "text-white" : "text-accent"} />
              <span>{isMr ? aarti.title_mr : aarti.title_en}</span>
            </button>
          );
        })}
      </div>

      {/* ── TOP READING CONTROLS TOOLBAR ──────────────────── */}
      <div className="sticky top-16 z-20 mb-6 flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md p-3 shadow-md">
        {/* Font Size Adjuster */}
        <div className="flex items-center gap-1 rounded-xl border border-border bg-background/80 p-1">
          <span className="px-2 text-xs font-semibold text-muted-foreground flex items-center gap-1">
            <Type size={14} />
            <span className="hidden xs:inline">{isMr ? "फॉन्ट" : "Font"}</span>
          </span>
          <button
            onClick={() => setFontSizeStep((s) => Math.max(0, s - 1))}
            disabled={fontSizeStep === 0}
            className="rounded-lg px-2.5 py-1 text-xs font-bold hover:bg-muted disabled:opacity-40 transition-colors min-h-[34px] min-w-[34px]"
            title="लहान अक्षर"
            aria-label="Decrease font size"
          >
            A-
          </button>
          <button
            onClick={() => setFontSizeStep((s) => Math.min(3, s + 1))}
            disabled={fontSizeStep === 3}
            className="rounded-lg px-2.5 py-1 text-xs font-bold hover:bg-muted disabled:opacity-40 transition-colors min-h-[34px] min-w-[34px]"
            title="मोठे अक्षर"
            aria-label="Increase font size"
          >
            A+
          </button>
        </div>

        {/* Wake Lock Screen On Toggle */}
        {wakeLockSupported && (
          <button
            onClick={() => setWakeLockActive(!wakeLockActive)}
            type="button"
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all min-h-[38px] ${
              wakeLockActive
                ? "border border-gold/60 bg-gold/15 text-gold-dark shadow-sm ring-2 ring-gold/30"
                : "border border-border bg-background/80 text-muted-foreground hover:text-foreground"
            }`}
            title="आरती म्हणताना स्क्रीन बंद होऊ नये म्हणून स्क्रीन चालू ठेवा"
          >
            <Sun size={15} className={wakeLockActive ? "text-gold animate-spin-slow" : ""} />
            <span>
              {wakeLockActive
                ? isMr
                  ? "स्क्रीन ऑन आहे ☀️"
                  : "Screen Always On ☀️"
                : isMr
                ? "स्क्रीन ऑन ठेवा"
                : "Keep Screen On"}
            </span>
          </button>
        )}

        {/* Action Buttons: Bell chime, Copy, Share */}
        <div className="flex items-center gap-1.5">
          {/* Temple Bell */}
          <button
            onClick={playTempleBell}
            type="button"
            className={`flex items-center gap-1 rounded-xl border border-gold/50 bg-gold/10 px-3 py-1.5 text-xs font-bold text-foreground hover:bg-gold/20 active:scale-95 transition-all min-h-[38px] ${
              ringing ? "ring-2 ring-gold animate-bounce" : ""
            }`}
            title="आरती घंटा वाजवा"
            aria-label="Play temple bell sound"
          >
            <Bell size={15} className={`text-gold ${ringing ? "rotate-12" : ""}`} />
            <span className="hidden sm:inline">{isMr ? "घंटा वाजवा" : "Ring Bell"}</span>
          </button>

          {/* Copy Lyrics */}
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1 rounded-xl border border-border bg-background/80 px-2.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted active:scale-95 transition-all min-h-[38px]"
            title="आरती कॉपी करा"
            aria-label="Copy lyrics"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-500" />
                <span className="text-emerald-600 font-bold">{isMr ? "कॉपी झाले!" : "Copied"}</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span className="hidden xs:inline">{isMr ? "कॉपी" : "Copy"}</span>
              </>
            )}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            type="button"
            className="flex items-center gap-1 rounded-xl border border-border bg-background/80 px-2.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted active:scale-95 transition-all min-h-[38px]"
            title="आरती शेअर करा"
            aria-label="Share aarti"
          >
            <Share2 size={14} />
          </button>
        </div>
      </div>

      {/* ── AARTI CARD DISPLAY CONTAINER ─────────────────── */}
      <div className="relative rounded-3xl border-2 border-gold/40 bg-gradient-to-b from-card via-card to-card/95 p-5 sm:p-10 shadow-lg">
        {/* Top Sacred Corner Accents */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/30 pb-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wide">
              <Sparkles size={13} className="text-accent" />
              <span>{isMr ? currentAarti.deity_mr : currentAarti.deity_en}</span>
            </div>
            <h2 className="deva-heading gradient-text mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              {isMr ? currentAarti.title_mr : currentAarti.title_en}
            </h2>
          </div>

          {/* Timing Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-bold text-foreground/90">
            <Clock size={13} className="text-accent" />
            <span>{isMr ? "वेळ: सकाळी ०७:०० AM • सायंकाळी ०७:०० PM" : "Aarti: 07:00 AM • 07:00 PM"}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="deva-body mb-8 text-xs sm:text-sm text-muted-foreground italic bg-muted/40 rounded-xl p-3 border-l-4 border-accent">
          {isMr ? currentAarti.description_mr : currentAarti.description_en}
        </p>

        {/* LYRICS TEXT CONTENT */}
        <div className="my-6 text-center">
          <div
            className={`deva-heading font-serif text-foreground/95 transition-all select-text tracking-wide ${fontSizes[fontSizeStep]}`}
          >
            {currentAarti.lyrics_mr.map((line, index) => {
              if (line.trim() === "") {
                return <div key={index} className="h-4 sm:h-6" />;
              }
              const isDhruva = line.includes("ध्रु०") || line.includes("जय देवी जय देवी");
              const isHeader = line.startsWith("॥");
              return (
                <p
                  key={index}
                  className={`py-0.5 ${
                    isHeader
                      ? "text-primary font-bold text-lg sm:text-xl py-2"
                      : isDhruva
                      ? "font-bold text-primary/95 scale-102"
                      : ""
                  }`}
                >
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        {/* Meaning / भावार्थ Toggle */}
        {currentAarti.meaning_mr && (
          <div className="mt-8 pt-5 border-t border-border">
            <button
              onClick={() => setShowMeaning(!showMeaning)}
              type="button"
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline"
            >
              <BookOpen size={15} />
              <span>
                {showMeaning
                  ? isMr
                    ? "भावार्थ लपवा ▲"
                    : "Hide Meaning ▲"
                  : isMr
                  ? "आरतीचा पवित्र भावार्थ जाणून घ्या ▼"
                  : "View Aarti Spiritual Meaning ▼"}
              </span>
            </button>

            {showMeaning && (
              <div className="mt-3 rounded-2xl border border-border/80 bg-background/80 p-4 sm:p-5 text-xs sm:text-sm leading-relaxed text-foreground/90 animate-fade-in-up">
                <span className="font-bold text-gold uppercase text-[11px] block mb-1">
                  {isMr ? "॥ संक्षिप्त भावार्थ ॥" : "Spiritual Meaning"}
                </span>
                <p className="deva-body">{isMr ? currentAarti.meaning_mr : currentAarti.meaning_en}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── MAHA AARTI ADVICE BANNER ─────────────────────── */}
      <div className="mt-8 rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl gradient-primary text-white shadow">
            <Flame size={22} />
          </div>
          <div>
            <h4 className="deva-heading text-sm sm:text-base font-bold text-foreground">
              {isMr ? "दैनिक महाआरतीमध्ये सहभागी व्हा" : "Participate in Daily Maha Aarti"}
            </h4>
            <p className="deva-body text-xs text-muted-foreground mt-0.5">
              {isMr
                ? "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा येथे दररोज सकाळी ०७:०० आणि सायंकाळी ०७:०० वाजता महाआरती संपन्न होते."
                : "Maha Aarti is held daily at 07:00 AM and 07:00 PM at Mandal Pandal, Dangarvada Asoda."}
            </p>
          </div>
        </div>

        <button
          onClick={playTempleBell}
          type="button"
          className="flex items-center gap-2 rounded-xl gradient-gold px-4 py-2 text-xs font-bold text-slate-950 shadow hover:opacity-90 active:scale-95 transition-all min-h-[42px] whitespace-nowrap"
        >
          <Bell size={16} />
          <span>{isMr ? "घंटा नाद करा 🔔" : "Ring Temple Bell 🔔"}</span>
        </button>
      </div>
    </div>
  );
}
