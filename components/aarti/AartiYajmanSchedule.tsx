"use client";

import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Flame,
  Sparkles,
  Clock,
  User,
  Heart,
  ChevronRight,
  Phone,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DEFAULT_AARTI_SCHEDULE,
  getActiveAartiSchedule,
  AARTI_MANKARI_STORAGE_KEY,
  AartiYajmanDay,
} from "@/lib/data/aartiYajman";

interface AartiYajmanScheduleProps {
  locale: string;
}

function getTodayFestivalDay(): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 9 is October
  const date = now.getDate();

  if (year === 2026 && month === 9) {
    if (date >= 11 && date <= 19) {
      return date - 10;
    }
    if (date > 19) return 10;
    return 1;
  }

  const start = new Date(year, 9, 11);
  const diff =
    Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  if (diff >= 1 && diff <= 10) return diff;
  return 1;
}

export default function AartiYajmanSchedule({ locale }: AartiYajmanScheduleProps) {
  const isMr = locale === "mr";
  const todayDayNumber = getTodayFestivalDay();

  // Full schedule state (synced with admin updates from localStorage)
  const [schedule, setSchedule] = useState<AartiYajmanDay[]>(DEFAULT_AARTI_SCHEDULE);

  // Selected Day (1 to 10) - defaults to today's festival day
  const [selectedDay, setSelectedDay] = useState<number>(() => getTodayFestivalDay());
  const activeChipRef = useRef<HTMLButtonElement | null>(null);

  // Hydrate from localStorage on client mount & listen for admin updates
  useEffect(() => {
    setSchedule(getActiveAartiSchedule());

    const handleUpdate = () => {
      setSchedule(getActiveAartiSchedule());
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === AARTI_MANKARI_STORAGE_KEY) {
        handleUpdate();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("aarti_mankari_updated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("aarti_mankari_updated", handleUpdate);
    };
  }, []);

  const chipsContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll the active chip inside horizontal container only
  useEffect(() => {
    if (activeChipRef.current && chipsContainerRef.current) {
      const container = chipsContainerRef.current;
      const chip = activeChipRef.current;
      const scrollPos =
        chip.offsetLeft - container.clientWidth / 2 + chip.clientWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollPos), behavior: "smooth" });
    }
  }, []);

  const activeDayData: AartiYajmanDay =
    schedule.find((d) => d.day === selectedDay) || schedule[0];

  const isSelectedToday = activeDayData.day === todayDayNumber;

  const morningYajman = isMr
    ? activeDayData.morningAarti.yajman_mr
    : activeDayData.morningAarti.yajman_en || activeDayData.morningAarti.yajman_mr;

  const eveningYajman = isMr
    ? activeDayData.eveningAarti.yajman_mr
    : activeDayData.eveningAarti.yajman_en || activeDayData.eveningAarti.yajman_mr;

  return (
    <div className="rounded-3xl border-2 border-gold/40 bg-card p-5 sm:p-8 shadow-md space-y-6">
      {/* ── SECTION HEADER ───────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/50 px-3 py-0.5 text-xs font-bold text-gold uppercase tracking-wider">
            <Flame size={13} className="text-primary" />
            {isMr ? "दैनिक महाआरती मानकरी व यजमान सूची" : "Daily Maha Aarti Yajman Schedule"}
          </span>
          <h2 className="deva-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground mt-1">
            {isMr ? "आज कोणाची आरती आहे? (आरती मानकरी)" : "Who is Performing Aarti Today?"}
          </h2>
          <p className="deva-body text-xs sm:text-sm text-muted-foreground mt-0.5">
            {isMr
              ? "नवरात्रीच्या १० दिवसांचे सकाळ व सायंकाळच्या महाआरतीचे अधिकृत यजमान व प्रसाद तपशील."
              : "Official morning and evening Maha Aarti hosts and prasad sponsors for each festival day."}
          </p>
        </div>

        {/* Today quick indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
          <span className="deva-body text-xs font-bold text-emerald-700 dark:text-emerald-300">
            {isMr
              ? `आज: दिवस ${todayDayNumber} ची महाआरती`
              : `Today: Day ${todayDayNumber} Aarti`}
          </span>
        </div>
      </div>

      {/* ── DAY SELECTOR CHIPS (1 TO 10) ──────────────────── */}
      <div ref={chipsContainerRef} className="snap-row no-scrollbar pb-2">
        {schedule.map((dayItem) => {
          const isSelected = dayItem.day === selectedDay;
          const isToday = dayItem.day === todayDayNumber;
          const hasMankari =
            Boolean(dayItem.morningAarti.yajman_mr) ||
            Boolean(dayItem.eveningAarti.yajman_mr);

          return (
            <motion.button
              key={dayItem.day}
              ref={isSelected ? activeChipRef : null}
              onClick={() => setSelectedDay(dayItem.day)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`snap-start flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all min-h-[44px] whitespace-nowrap border ${
                isSelected
                  ? "bg-gradient-to-r from-[#A51C1D] via-[#CC3C1F] to-[#E55D1C] text-white border-primary shadow-md scale-105"
                  : "bg-background text-foreground/80 border-border hover:bg-muted"
              }`}
            >
              <span>{isMr ? `दिवस ${dayItem.day}` : `Day ${dayItem.day}`}</span>
              {hasMankari && (
                <span className="h-1.5 w-1.5 rounded-full bg-gold" title="मानकरी निश्चित" />
              )}
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
            </motion.button>
          );
        })}
      </div>

      {/* ── DAY HEADER & SPECIAL OCCASION BANNER ─────────── */}
      <div className="rounded-2xl border border-gold/40 bg-gradient-to-r from-gold/10 via-card to-primary/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-full bg-primary text-white font-extrabold px-3 py-0.5 text-xs shadow-sm">
              {isMr ? `दिवस ${activeDayData.day}` : `Day ${activeDayData.day}`}
            </span>
            <span className="deva-heading font-extrabold text-sm sm:text-base text-foreground">
              {isMr ? activeDayData.date_mr : activeDayData.date_en}
            </span>
            {isSelectedToday && (
              <span className="rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 px-2 py-0.5 text-[11px] font-extrabold">
                {isMr ? "आजची आरती" : "Today's Aarti"}
              </span>
            )}
          </div>
          <h3 className="deva-heading text-lg sm:text-xl font-extrabold text-foreground mt-1">
            {isMr ? activeDayData.devi_mr : activeDayData.devi_en}
          </h3>
        </div>

        {activeDayData.specialOccasion_mr && (
          <div className="rounded-xl border border-gold/50 bg-gold/15 px-3.5 py-2 text-xs font-bold text-slate-900 dark:text-gold flex items-center gap-1.5 self-stretch sm:self-auto">
            <Sparkles size={14} className="text-primary flex-shrink-0" />
            <span>
              {isMr
                ? activeDayData.specialOccasion_mr
                : activeDayData.specialOccasion_en}
            </span>
          </div>
        )}
      </div>

      {/* ── MORNING & EVENING YAJMAN CARDS ────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* 1. MORNING AARTI */}
          <div className="relative rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-amber-500/5 via-card to-card p-5 sm:p-6 shadow-md hover:border-amber-500/70 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-border/70">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-3 py-1 text-xs font-extrabold">
                  <span>🌅</span>
                  <span>{isMr ? "सकाळची महाआरती" : "Morning Aarti"}</span>
                </span>

                <span className="deva-heading text-xs sm:text-sm font-bold text-foreground flex items-center gap-1">
                  <Clock size={13} className="text-primary" />
                  <span>{activeDayData.morningAarti.time || "सकाळी ०७:००"}</span>
                </span>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {isMr ? "आरती यजमान / मानकरी:" : "Aarti Host / Yajman:"}
              </span>

              {morningYajman ? (
                <h4 className="deva-heading text-lg sm:text-xl font-extrabold text-foreground mt-1 leading-snug flex items-center gap-2">
                  <span>{morningYajman}</span>
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                </h4>
              ) : (
                <div className="mt-2 space-y-1">
                  <div className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-amber-500/50 bg-amber-500/10 px-3 py-1.5 text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-300">
                    <span>📋</span>
                    <span>
                      {isMr ? "यजमान नाव लवकरच घोषित होईल" : "Host to be announced soon"}
                    </span>
                  </div>
                  <p className="deva-body text-xs text-muted-foreground">
                    {isMr
                      ? "सकाळच्या आरती सेवेसाठी व नाव नोंदणीसाठी मंडळाशी संपर्क करा."
                      : "Contact mandal to register for morning aarti seva."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 2. EVENING AARTI */}
          <div className="relative rounded-2xl border-2 border-primary/40 bg-gradient-to-b from-primary/5 via-card to-card p-5 sm:p-6 shadow-md hover:border-primary/70 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-border/70">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary border border-primary/30 px-3 py-1 text-xs font-extrabold">
                  <span>🌆</span>
                  <span>{isMr ? "सायंकाळची भव्य महाआरती" : "Evening Maha Aarti"}</span>
                </span>

                <span className="deva-heading text-xs sm:text-sm font-bold text-foreground flex items-center gap-1">
                  <Clock size={13} className="text-accent" />
                  <span>{activeDayData.eveningAarti.time || "सायंकाळी ०७:००"}</span>
                </span>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {isMr ? "आरती यजमान / मानकरी:" : "Aarti Host / Yajman:"}
              </span>

              {eveningYajman ? (
                <h4 className="deva-heading text-lg sm:text-xl font-extrabold text-foreground mt-1 leading-snug flex items-center gap-2">
                  <span>{eveningYajman}</span>
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                </h4>
              ) : (
                <div className="mt-2 space-y-1">
                  <div className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-primary/50 bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-bold text-primary">
                    <span>📋</span>
                    <span>
                      {isMr ? "यजमान नाव लवकरच घोषित होईल" : "Host to be announced soon"}
                    </span>
                  </div>
                  <p className="deva-body text-xs text-muted-foreground">
                    {isMr
                      ? "सायंकाळच्या महाआरती सेवेसाठी मंडळाशी संपर्क करा."
                      : "Contact mandal to register for evening aarti seva."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── BOTTOM INQUIRY / PARTICIPATION ACTION ─────────── */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground bg-muted/30 rounded-2xl p-4 border border-border/60">
        <p className="deva-body text-center sm:text-left">
          {isMr
            ? "💡 महाआरतीत प्रत्यक्ष सहभागी होण्यासाठी किंवा यजमान पद नोंदणीसाठी मंडळाशी संपर्क करा."
            : "💡 To participate as an Aarti Yajman or sponsor prasad, please connect with the mandal."}
        </p>

        <a
          href="https://wa.me/91XXXXXXXXXX?text=नमस्कार%20—%20मला%20नवरात्रोत्सव%20महाआरती%20यजमानपद%20व%20प्रसादाबद्दल%20माहिती%20हवी%20आहे."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-xl gradient-primary px-4 py-2 text-xs font-bold text-white shadow hover:opacity-95 transition-all min-h-[36px] flex-shrink-0"
        >
          <MessageCircle size={14} />
          <span>{isMr ? "आरती चौकशी (WhatsApp)" : "Aarti Inquiry"}</span>
        </a>
      </div>
    </div>
  );
}
