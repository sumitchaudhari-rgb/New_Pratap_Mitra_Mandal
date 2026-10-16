"use client";

import { useState, useEffect, useRef } from "react";
import { FestivalEvent, DEFAULT_EVENTS } from "@/lib/data/programme";
import { downloadICSFile } from "@/lib/utils/calendar";
import { Link } from "@/i18n/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TodayProgrammeCardProps {
  locale?: string;
}

export default function TodayProgrammeCard({
  locale = "mr",
}: TodayProgrammeCardProps) {
  const isMr = locale === "mr";

  // Check today's date against festival events
  const todayStr = new Date().toISOString().split("T")[0];
  const todayIndex = DEFAULT_EVENTS.findIndex((e) => e.date === todayStr);

  // Default focus to current day if matched, else first event
  const [activeEventIndex, setActiveEventIndex] = useState<number>(() => {
    return todayIndex !== -1 ? todayIndex : 0;
  });

  const [downloaded, setDownloaded] = useState(false);
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

  const displayEvent: FestivalEvent =
    DEFAULT_EVENTS[activeEventIndex] || DEFAULT_EVENTS[0];

  const handleDownload = () => {
    downloadICSFile(
      {
        title: isMr ? displayEvent.title_mr : displayEvent.title_en,
        description: isMr ? displayEvent.description_mr : displayEvent.description_en,
        location: isMr ? displayEvent.location_mr : displayEvent.location_en,
        startDate: displayEvent.date,
        startTime: displayEvent.start_time,
        endTime: displayEvent.end_time,
      },
      `Navratri_2026_${displayEvent.day_number}.ics`
    );

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  // Format date as DD/MM (e.g. 12/10, 13/10, 14/10)
  const formatDayMonth = (dateStr: string) => {
    const [, month, day] = dateStr.split("-");
    return `${day}/${month}`;
  };

  const [dispYear, dispMonth, dispDay] = displayEvent.date.split("-");

  return (
    <section className="px-3 sm:px-6 pb-12" aria-label="Today's Programme">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-gold/40 bg-card/95 p-5 sm:p-6 shadow-xl backdrop-blur-md transition-all hover:border-gold/60"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-border/70">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary shadow-xs">
              <Calendar size={17} />
            </span>
            <span className="deva-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
              {isMr ? "आजचा विशेष कार्यक्रम" : "Today's Featured Event"}
            </span>
          </div>

          <span className="rounded-full gradient-festive px-3 py-1 text-xs font-black text-slate-950 shadow-sm">
            {isMr
              ? displayEvent.day_number === 10
                ? "विसर्जन सोहळा"
                : `दिवस ${displayEvent.day_number}`
              : displayEvent.day_number === 10
              ? "Visarjan Ceremony"
              : `Day ${displayEvent.day_number}`}
          </span>
        </div>

        {/* Quick event day selector chips with DD/MM date format */}
        <div ref={chipsContainerRef} className="snap-row no-scrollbar mt-3.5 pb-2">
          {DEFAULT_EVENTS.map((evt, idx) => {
            const isSelected = idx === activeEventIndex;
            const isToday = evt.date === todayStr;
            const dateLabel = formatDayMonth(evt.date);

            return (
              <motion.button
                key={evt.id}
                ref={isSelected ? activeChipRef : null}
                onClick={() => setActiveEventIndex(idx)}
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
                <span>
                  {isMr
                    ? evt.day_number === 10
                      ? "विसर्जन"
                      : `दि. ${evt.day_number}`
                    : `D${evt.day_number}`}
                </span>
                <span className="font-semibold opacity-90">• {dateLabel}</span>
                {isToday && (
                  <span className="rounded-full bg-gold text-slate-950 px-1.5 py-0.2 text-[9px] font-black uppercase">
                    {isMr ? "आज" : "Today"}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Animated Event Detail Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={displayEvent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-xl border border-border/70 bg-gradient-to-b from-card via-muted/20 to-primary/5 p-4 sm:p-5 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 border border-accent/30 px-2.5 py-0.5 text-xs font-bold text-accent shadow-2xs">
                <Sparkles size={11} />
                <span>{evtCategory(displayEvent.category, isMr)}</span>
              </span>
              <span className="text-xs text-muted-foreground font-bold">
                {dispDay}/{dispMonth}/{dispYear} ({isMr ? displayEvent.day_name_mr : displayEvent.day_name_en})
              </span>
            </div>

            <h3 className="deva-heading mt-2 text-lg sm:text-xl font-black text-foreground">
              {isMr ? displayEvent.title_mr : displayEvent.title_en}
            </h3>

            {/* Time & Venue */}
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-card px-3 py-1.5 text-foreground font-bold border border-border/70 shadow-xs">
                <Clock size={13} className="text-accent" />
                <span>{isMr ? displayEvent.time_display_mr : displayEvent.time_display_en}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-card px-3 py-1.5 text-foreground font-bold border border-border/70 shadow-xs">
                <MapPin size={13} className="text-primary" />
                <span>{isMr ? displayEvent.location_mr : displayEvent.location_en}</span>
              </span>
            </div>

            <p className="deva-body mt-3 text-xs sm:text-sm text-foreground/85 leading-relaxed">
              {isMr ? displayEvent.description_mr : displayEvent.description_en}
            </p>

            {/* Action Row */}
            <div className="mt-4 pt-3.5 border-t border-border/60 flex items-center justify-between gap-2">
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gold/60 bg-gold/20 px-3.5 py-2 text-xs font-bold text-foreground hover:bg-gold/30 transition-all min-h-[40px] shadow-xs"
              >
                {downloaded ? (
                  <>
                    <Check size={14} className="text-green-600 font-bold" />
                    <span>{isMr ? "कॅलेंडर फाईल जोडली!" : "Added!"}</span>
                  </>
                ) : (
                  <>
                    <CalendarPlus size={14} className="text-gold font-bold" />
                    <span>{isMr ? "कॅलेंडरमध्ये जोडा (.ics)" : "Add to Calendar (.ics)"}</span>
                  </>
                )}
              </motion.button>

              <Link
                href="/programme"
                className="group inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-accent transition-colors min-h-[40px]"
              >
                <span>{isMr ? "संपूर्ण वेळापत्रक पहा" : "Full Schedule"}</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function evtCategory(cat: string, isMr: boolean): string {
  const map: Record<string, { mr: string; en: string }> = {
    religious: { mr: "धार्मिक सोहळा", en: "Religious Ceremony" },
    cultural: { mr: "सांस्कृतिक कार्यक्रम", en: "Cultural Event" },
    aarti: { mr: "महाआरती", en: "Maha Aarti" },
    garba: { mr: "गरबा व दांडिया", en: "Garba & Dandiya" },
    kanya_pujan: { mr: "हवन व कन्या पूजन", en: "Havan & Kanya Pujan" },
    bhandara: { mr: "महाप्रसाद भंडारा", en: "Mahaprasad Bhandara" },
    procession: { mr: "भव्य विसर्जन मिरवणूक", en: "Visarjan Procession" },
  };
  return isMr ? map[cat]?.mr || cat : map[cat]?.en || cat;
}
