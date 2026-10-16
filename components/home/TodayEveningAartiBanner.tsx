"use client";

import { useEffect, useState } from "react";
import { Flame, Clock, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  getActiveAartiSchedule,
  AARTI_MANKARI_STORAGE_KEY,
  AartiYajmanDay,
  DEFAULT_AARTI_SCHEDULE,
} from "@/lib/data/aartiYajman";

interface TodayEveningAartiBannerProps {
  locale?: string;
}

function getTodayFestivalDay(): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 9 is October (0-indexed)
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

export default function TodayEveningAartiBanner({
  locale = "mr",
}: TodayEveningAartiBannerProps) {
  const isMr = locale === "mr";
  const todayDayNumber = getTodayFestivalDay();

  const [schedule, setSchedule] = useState<AartiYajmanDay[]>(DEFAULT_AARTI_SCHEDULE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSchedule(getActiveAartiSchedule());

    const handleStorageChange = (e?: StorageEvent) => {
      if (!e || e.key === AARTI_MANKARI_STORAGE_KEY) {
        setSchedule(getActiveAartiSchedule());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("aarti_mankari_updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("aarti_mankari_updated", handleStorageChange);
    };
  }, []);

  const todayData: AartiYajmanDay =
    schedule.find((d) => d.day === todayDayNumber) || schedule[0];

  const eveningMankari = isMr
    ? todayData.eveningAarti.yajman_mr
    : todayData.eveningAarti.yajman_en || todayData.eveningAarti.yajman_mr;

  const aartiTime = todayData.eveningAarti.time || (isMr ? "सायंकाळी ०७:००" : "07:00 PM");

  return (
    <section
      className="px-3 sm:px-6 pt-4 pb-2"
      aria-label="Today Evening Aarti Host"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -3, scale: 1.008 }}
        className="mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-gold/70 bg-gradient-to-r from-primary/10 via-card to-accent/15 p-4 sm:p-5 shadow-lg backdrop-blur-md transition-all hover:shadow-[0_12px_30px_rgba(240,165,0,0.18)]"
      >
        {/* Top header line */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-border/70">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent">
              <Flame size={15} className="text-accent animate-flame-pulse" />
            </span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="deva-heading text-xs sm:text-sm font-extrabold text-foreground">
                {isMr
                  ? `आजची सायंकाळची महाआरती (दिवस ${todayData.day})`
                  : `Today's Evening Aarti (Day ${todayData.day})`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/30 px-3 py-1 text-xs font-bold text-accent shadow-xs">
            <Clock size={12} />
            <span>{aartiTime}</span>
          </div>
        </div>

        {/* Main Content: Aarti Mankari Name */}
        <div className="mt-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <span>🪔</span>
              <span>{isMr ? "आजचे महाआरती मानकरी:" : "Today's Aarti Host / Mankari:"}</span>
            </span>

            {mounted && eveningMankari ? (
              <div className="flex items-center gap-2.5 flex-wrap pt-0.5">
                <h3 className="deva-heading text-xl sm:text-2xl font-black text-foreground tracking-tight leading-snug">
                  {eveningMankari}
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 px-2.5 py-0.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-300 shadow-xs">
                  <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
                  <span>{isMr ? "मानकरी निश्चित" : "Confirmed"}</span>
                </span>
              </div>
            ) : (
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-3 py-1 text-xs sm:text-sm font-bold text-primary">
                  <Sparkles size={13} />
                  <span>
                    {isMr ? "यजमान नाव लवकरच घोषित होईल" : "Host to be announced soon"}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Quick link to /aarti */}
          <Link
            href="/aarti#aarti-yajman"
            className="group flex items-center gap-1.5 rounded-xl bg-card/80 border border-border/80 px-3.5 py-2 text-xs font-bold text-primary hover:text-accent hover:border-gold/50 transition-all shadow-xs self-end sm:self-center shrink-0 min-h-[40px]"
          >
            <span>{isMr ? "संपूर्ण आरती सूची" : "Full Schedule"}</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
