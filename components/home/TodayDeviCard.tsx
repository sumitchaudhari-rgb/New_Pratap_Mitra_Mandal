"use client";

import { useState, useEffect, useRef } from "react";
import { NAVDURGA_FORMS, NavdurgaForm } from "@/lib/data/navdurga";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TodayDeviProps {
  locale?: string;
}

function getTodayNavdurgaDay(): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 9 is October
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

export default function TodayDeviCard({ locale = "mr" }: TodayDeviProps) {
  const isMr = locale === "mr";

  // Automatically default focus to current festival day (e.g. Day 6 on 16th Oct)
  const [selectedDay, setSelectedDay] = useState<number>(() =>
    getTodayNavdurgaDay()
  );

  const activeChipRef = useRef<HTMLButtonElement | null>(null);
  const chipsContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll horizontal chip container only (without scrolling window)
  useEffect(() => {
    if (activeChipRef.current && chipsContainerRef.current) {
      const container = chipsContainerRef.current;
      const chip = activeChipRef.current;
      const scrollPos =
        chip.offsetLeft - container.clientWidth / 2 + chip.clientWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollPos), behavior: "smooth" });
    }
  }, []);

  const todayDayNumber = getTodayNavdurgaDay();
  const activeForm: NavdurgaForm =
    NAVDURGA_FORMS.find((f) => f.day === selectedDay) || NAVDURGA_FORMS[0];

  return (
    <section className="px-3 sm:px-6 py-6" aria-label="Today's Navdurga Form">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-gold/60 bg-gradient-to-b from-card via-card to-gold/10 p-5 sm:p-6 shadow-xl transition-all"
      >
        {/* Top Ornament */}
        <div className="flex items-center justify-between pb-3 border-b border-border/70">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-gold shadow-xs">
              <Flame size={16} className="text-accent animate-flame-pulse" />
            </span>
            <span className="deva-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-gold">
              {isMr ? "नवरात्रोत्सव — नवदुर्गा दर्शन" : "Navratri — Navdurga Darshan"}
            </span>
          </div>

          <span
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold text-white shadow-md transition-colors"
            style={{ backgroundColor: activeForm.colorHex }}
          >
            <Sparkles size={11} />
            {isMr ? `दिवस ${activeForm.day}` : `Day ${activeForm.day}`}
          </span>
        </div>

        {/* Day Selector Chips with Auto Focus */}
        <div ref={chipsContainerRef} className="snap-row no-scrollbar mt-3.5 pb-2">
          {NAVDURGA_FORMS.map((form) => {
            const isSelected = form.day === selectedDay;
            const isToday = form.day === todayDayNumber;

            return (
              <motion.button
                key={form.day}
                ref={isSelected ? activeChipRef : null}
                onClick={() => setSelectedDay(form.day)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className={`snap-start flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all min-h-[38px] ${
                  isSelected
                    ? "gradient-primary text-white shadow-md ring-2 ring-gold/60 scale-105"
                    : "border border-border/80 bg-card text-foreground/80 hover:bg-muted"
                }`}
                aria-pressed={isSelected}
              >
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full shadow-xs"
                  style={{ backgroundColor: form.colorHex }}
                  aria-hidden="true"
                />
                <span>{isMr ? form.name_mr : form.name_en}</span>
                {isToday && (
                  <span className="rounded-full bg-gold text-slate-950 px-1.5 py-0.2 text-[9px] font-black uppercase ml-0.5">
                    {isMr ? "आज" : "Today"}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Animated Form Details with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-xl border border-gold/30 bg-card/80 p-4 sm:p-5 shadow-sm backdrop-blur-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3 className="deva-heading text-xl sm:text-2xl font-black text-foreground">
                {isMr ? `माता ${activeForm.name_mr}` : `Mata ${activeForm.name_en}`}
              </h3>
              <p className="deva-heading text-xs sm:text-sm font-bold text-accent">
                {isMr ? activeForm.epithet_mr : activeForm.epithet_en}
              </p>
            </div>

            {/* Sacred Mantra */}
            <div className="mt-3 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-center shadow-xs">
              <p className="deva-heading text-sm sm:text-base font-extrabold text-foreground tracking-wide">
                {activeForm.mantra}
              </p>
            </div>

            {/* Quick attributes pills */}
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted/80 px-3 py-1 text-muted-foreground font-medium">
                <span className="font-bold text-foreground">
                  {isMr ? "वाहन:" : "Vehicle:"}
                </span>{" "}
                {isMr ? activeForm.vahana_mr : activeForm.vahana_en}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted/80 px-3 py-1 text-muted-foreground font-medium">
                <span className="font-bold text-foreground">
                  {isMr ? "शुभ रंग:" : "Color:"}
                </span>{" "}
                {isMr ? activeForm.color_mr : activeForm.color_en}
              </span>
            </div>

            {/* Significance */}
            <p className="deva-body mt-3 text-xs sm:text-sm text-foreground/85 leading-relaxed">
              {isMr ? activeForm.significance_mr : activeForm.significance_en}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* View all 9 forms CTA */}
        <div className="mt-4 flex items-center justify-between pt-2">
          <p className="deva-body text-xs text-muted-foreground font-medium">
            {isMr
              ? "९ ही रूपांची संपूर्ण माहिती व मंत्र"
              : "Complete details of all 9 forms"}
          </p>
          <Link
            href="/devi-forms"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-accent transition-colors min-h-[44px]"
          >
            <span>{isMr ? "सर्व रूपे पहा" : "View All Forms"}</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
