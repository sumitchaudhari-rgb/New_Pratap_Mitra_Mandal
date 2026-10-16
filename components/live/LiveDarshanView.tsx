"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Video,
  Flame,
  Clock,
  Bell,
  Share2,
  Sparkles,
  Users,
  Check,
  AlertCircle,
  Eye,
  Volume2,
} from "lucide-react";

interface LiveDarshanViewProps {
  locale: string;
}

export default function LiveDarshanView({ locale }: LiveDarshanViewProps) {
  const isMr = locale === "mr";

  // State: whether live is active or showing placeholder/countdown
  const [isLive, setIsLive] = useState<boolean>(false);
  const [devoteeCount, setDevoteeCount] = useState<number>(142);
  const [prasadOffered, setPrasadOffered] = useState<boolean>(false);
  const [prasadCount, setPrasadCount] = useState<number>(384);
  const [bellRinging, setBellRinging] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  // Next Aarti Countdown
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    targetName: string;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    targetName: "सायंकाळची महाआरती (०७:०० PM)",
  });

  // Calculate countdown to next 07:00 AM or 07:00 PM
  useEffect(() => {
    function calculateCountdown() {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();

      // Aarti slots: 7:00 AM (07:00) and 7:00 PM (19:00)
      let nextTarget = new Date(now);

      if (now.getHours() < 7) {
        nextTarget.setHours(7, 0, 0, 0);
      } else if (now.getHours() < 19) {
        nextTarget.setHours(19, 0, 0, 0);
      } else {
        // Next day 7:00 AM
        nextTarget.setDate(nextTarget.getDate() + 1);
        nextTarget.setHours(7, 0, 0, 0);
      }

      const diffMs = nextTarget.getTime() - now.getTime();
      const totalSec = Math.max(0, Math.floor(diffMs / 1000));
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;

      const isMorning = nextTarget.getHours() === 7;
      const targetName = isMorning
        ? isMr
          ? "सकाळची महाआरती (०७:०० AM)"
          : "Morning Maha Aarti (07:00 AM)"
        : isMr
        ? "सायंकाळची महाआरती (०७:०० PM)"
        : "Evening Maha Aarti (07:00 PM)";

      setTimeLeft({ hours, minutes, seconds, targetName });

      // If within 30 mins of Aarti, toggle simulated active live stream
      const isAartiTime =
        (currentHours === 7 && currentMinutes <= 30) ||
        (currentHours === 19 && currentMinutes <= 30);
      setIsLive(isAartiTime);
    }

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isMr]);

  // Authentic temple bell Web Audio API sound
  function ringBell() {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      setBellRinging(true);
      setTimeout(() => setBellRinging(false), 1600);

      const now = ctx.currentTime;
      const freqs = [659.25, 987.77, 1318.51]; // E5, B5, E6
      const gains = [0.35, 0.2, 0.1];

      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(gains[i], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 2.1);
      });
    } catch {}
  }

  function handleOfferPrasad() {
    if (!prasadOffered) {
      setPrasadOffered(true);
      setPrasadCount((c) => c + 1);
      ringBell();
    }
  }

  function handleShare() {
    const text = isMr
      ? "श्री छिन्नमस्ता माता थेट दर्शन — न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा. येथे लाईव्ह दर्शन घ्या:"
      : "Shri Chhinnamasta Mata Live Darshan — New Pratap Mitra Mandal Asoda:";
    if (navigator.share) {
      navigator.share({
        title: "श्री छिन्नमस्ता माता थेट दर्शन",
        text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2200);
    }
  }

  return (
    <div className="w-full">
      {/* ── LIVE VIDEO CONTAINER (16:9 RESPONSIVE) ───────── */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-gold/50 bg-black shadow-2xl">
        {/* Aspect Ratio 16:9 Container */}
        <div className="relative aspect-video w-full flex items-center justify-center">
          {/* Background Poster: Official 2026 Idol */}
          <Image
            src="/images/gallery/HomePageImage.jpeg"
            alt="श्री छिन्नमस्ता माता थेट दर्शन"
            fill
            priority
            className="object-cover opacity-85 scale-102"
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

          {/* Top Overlay Badges */}
          <div className="absolute top-3 sm:top-5 left-3 sm:left-5 right-3 sm:right-5 flex items-center justify-between pointer-events-auto">
            {/* Live Indicator */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-600/90 px-3.5 py-1 text-xs font-extrabold text-white shadow-lg backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <span>{isLive ? (isMr ? "थेट प्रक्षेपण चालू" : "LIVE NOW") : (isMr ? "थेट दर्शन कक्ष" : "LIVE DARSHAN")}</span>
            </div>

            {/* Viewers Pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md shadow">
              <Eye size={13} className="text-emerald-400" />
              <span>{devoteeCount} {isMr ? "भाविक ऑनलाईन" : "watching"}</span>
            </div>
          </div>

          {/* Center Card: Live Status & Countdown */}
          <div className="relative z-10 p-4 sm:p-6 text-center max-w-lg mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-gold/20 px-3 py-1 text-xs font-bold text-gold uppercase tracking-wider backdrop-blur-sm">
              <Flame size={13} className="text-accent" />
              {isMr ? "मंडप गर्भगृह, डांगरवाडा असोदा" : "Sanctum Pandal, Dangarvada Asoda"}
            </span>

            <h2 className="deva-heading text-white mt-2 text-xl sm:text-3xl font-extrabold drop-shadow-md">
              {isMr ? "श्री छिन्नमस्ता माता दर्शन" : "Shri Chhinnamasta Mata Darshan"}
            </h2>

            {/* Countdown Box to Next Aarti */}
            <div className="mt-4 rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-3.5 sm:p-4 text-white shadow-xl">
              <span className="text-[11px] sm:text-xs text-amber-300 font-bold uppercase tracking-wider block mb-2">
                ⏳ {isMr ? "पुढील महाआरतीची वेळ" : "Next Scheduled Maha Aarti"} — {timeLeft.targetName}
              </span>

              {/* Digital Countdown Timer */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black text-white bg-white/10 rounded-xl px-2.5 py-1 min-w-[48px]">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1">{isMr ? "तास" : "Hours"}</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-amber-400">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black text-white bg-white/10 rounded-xl px-2.5 py-1 min-w-[48px]">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1">{isMr ? "मिनिटे" : "Minutes"}</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-amber-400">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black text-white bg-white/10 rounded-xl px-2.5 py-1 min-w-[48px]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1">{isMr ? "सेकंद" : "Seconds"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Video Bar */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
            <span className="text-[11px] sm:text-xs text-white/80 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
              📍 असोदा, जि. जळगाव • नवरात्रोत्सव २०२६
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={ringBell}
                type="button"
                className={`flex items-center gap-1.5 rounded-full border border-gold/60 bg-gold/30 px-3 py-1 text-xs font-bold text-white backdrop-blur-md hover:bg-gold/50 active:scale-95 transition-all ${
                  bellRinging ? "ring-2 ring-gold scale-105" : ""
                }`}
                title="आरती घंटा वाजवा"
              >
                <Bell size={13} className={`text-gold ${bellRinging ? "rotate-12" : ""}`} />
                <span>{isMr ? "घंटा वाजवा 🔔" : "Ring Bell"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE DEVOTEE ACTIONS BAR ──────────────── */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Virtual Prasad Offer */}
        <button
          onClick={handleOfferPrasad}
          type="button"
          className={`flex items-center justify-center gap-2.5 rounded-2xl p-4 font-bold transition-all min-h-[56px] shadow-sm ${
            prasadOffered
              ? "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
              : "gradient-festive text-slate-950 hover:opacity-95 active:scale-98"
          }`}
        >
          <Sparkles size={18} />
          <div className="text-left">
            <div className="text-xs sm:text-sm leading-tight">
              {prasadOffered
                ? isMr
                  ? "मातेच्या चरणी पुष्प अर्पण केले! 🙏"
                  : "Flower Offered! 🙏"
                : isMr
                ? "डिजिटल पुष्प व नैवेद्य अर्पण करा"
                : "Offer Virtual Flowers"}
            </div>
            <div className="text-[10px] opacity-80">
              {prasadCount} {isMr ? "भाविकांनी अर्पण केले" : "devotees offered"}
            </div>
          </div>
        </button>

        {/* Read Aarti Lyrics Button */}
        <Link
          href="/aarti"
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-primary/40 bg-card p-4 text-xs sm:text-sm font-bold text-primary hover:bg-primary/5 transition-all min-h-[56px] shadow-sm text-center"
        >
          <Flame size={18} className="text-accent" />
          <span>{isMr ? "आरतीचे शब्द सोबत म्हणा 📜" : "Sing Along Aarti Lyrics"}</span>
        </Link>

        {/* WhatsApp & Social Share */}
        <button
          onClick={handleShare}
          type="button"
          className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 text-xs sm:text-sm font-bold text-foreground hover:bg-muted transition-all min-h-[56px] shadow-sm"
        >
          {linkCopied ? (
            <>
              <Check size={18} className="text-emerald-500" />
              <span className="text-emerald-600">{isMr ? "दर्शनाची लिंक कॉपी झाली!" : "Link Copied!"}</span>
            </>
          ) : (
            <>
              <Share2 size={18} />
              <span>{isMr ? "मित्रमंडळींना दर्शनाची लिंक पाठवा" : "Share Live Darshan"}</span>
            </>
          )}
        </button>
      </div>

      {/* ── DAILY AARTI TIMINGS SCHEDULE ─────────────────── */}
      <div className="mt-8 rounded-3xl border border-gold/40 bg-card p-5 sm:p-7 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-bold text-sm">
          <Clock size={16} />
          <span>{isMr ? "दैनिक आरती व दर्शन वेळापत्रक" : "Daily Darshan & Aarti Schedule"}</span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Morning Aarti */}
          <div className="rounded-2xl border border-border/80 bg-background/80 p-4 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold font-bold">
              🌅
            </div>
            <div>
              <div className="text-xs font-bold text-muted-foreground uppercase">{isMr ? "पहिली महाआरती" : "First Aarti"}</div>
              <div className="text-base sm:text-lg font-extrabold text-foreground">{isMr ? "सकाळी ०७:०० AM" : "07:00 AM Morning"}</div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isMr ? "काकड आरती, शृंगार दर्शन व प्रातः महाआरती" : "Morning Abhishek, adornment darshan, and Aarti."}
              </p>
            </div>
          </div>

          {/* Evening Aarti */}
          <div className="rounded-2xl border border-border/80 bg-background/80 p-4 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary font-bold">
              🪔
            </div>
            <div>
              <div className="text-xs font-bold text-muted-foreground uppercase">{isMr ? "दुसरी महाआरती" : "Second Aarti"}</div>
              <div className="text-base sm:text-lg font-extrabold text-foreground">{isMr ? "सायंकाळी ०७:०० PM" : "07:00 PM Evening"}</div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isMr ? "संध्या महाआरती, १०८ दीपदान व धूपारती" : "Evening grand Aarti, 108 oil lamps, and dhoop aarti."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MANDAL LIVE STREAM NOTE & RULES ──────────────── */}
      <div className="mt-6 rounded-2xl border border-border/80 bg-muted/40 p-4 sm:p-5 text-xs text-muted-foreground leading-relaxed flex items-start gap-3">
        <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-foreground block mb-0.5">
            {isMr ? "थेट दर्शन व तांत्रिक सूचना:" : "Live Darshan Note:"}
          </span>
          <p>
            {isMr
              ? "महाआरतीच्या वेळी थेट व्हिडिओ कॅमेरा सुरू होतो. जर नेटवर्क किंवा तांत्रिक कारणास्तव व्हिडिओ लोड होण्यास वेळ लागल्यास पेज एकदा रिफ्रेश करा. आपण थेट डांगरवाडा असोदा मंडपात येऊनही प्रत्यक्ष दर्शन घेऊ शकता."
              : "Live video camera stream activates during Aarti hours. In case of connectivity lag, please refresh the page."}
          </p>
        </div>
      </div>
    </div>
  );
}
