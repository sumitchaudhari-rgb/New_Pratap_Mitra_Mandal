"use client";

import { useState } from "react";
import { FestivalEvent } from "@/lib/data/programme";
import { downloadICSFile } from "@/lib/utils/calendar";
import {
  Clock,
  MapPin,
  CalendarPlus,
  Sparkles,
  Flame,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProgrammeTimelineProps {
  events: FestivalEvent[];
  locale: string;
}

const CATEGORY_FILTERS = [
  { key: "all", label_mr: "सर्व कार्यक्रम", label_en: "All Events" },
  { key: "religious", label_mr: "धार्मिक विधी", label_en: "Religious" },
  { key: "aarti", label_mr: "महाआरती", label_en: "Maha Aarti" },
  { key: "garba", label_mr: "गरबा-दांडिया", label_en: "Garba & Dandiya" },
  { key: "kanya_pujan", label_mr: "हवन व कन्या पूजन", label_en: "Havan & Kanya Pujan" },
  { key: "bhandara", label_mr: "महाप्रसाद", label_en: "Mahaprasad" },
  { key: "cultural", label_mr: "सांस्कृतिक स्पर्धा", label_en: "Cultural" },
  { key: "procession", label_mr: "विसर्जन मिरवणूक", label_en: "Procession" },
] as const;

export default function ProgrammeTimeline({
  events,
  locale,
}: ProgrammeTimelineProps) {
  const isMr = locale === "mr";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [downloadedEventId, setDownloadedEventId] = useState<string | null>(null);

  // Check if today matches any event date
  const todayStr = new Date().toISOString().split("T")[0];

  const filteredEvents = events.filter((evt) => {
    if (selectedCategory === "all") return true;
    return evt.category === selectedCategory;
  });

  const handleAddToCalendar = (evt: FestivalEvent) => {
    downloadICSFile(
      {
        title: isMr ? evt.title_mr : evt.title_en,
        description: isMr ? evt.description_mr : evt.description_en,
        location: isMr ? evt.location_mr : evt.location_en,
        startDate: evt.date,
        startTime: evt.start_time,
        endTime: evt.end_time,
      },
      `Navratri_2026_${evt.day_number}_${evt.title_mr.replace(/\s+/g, "_")}.ics`
    );

    setDownloadedEventId(evt.id);
    setTimeout(() => setDownloadedEventId(null), 2500);
  };

  return (
    <div className="w-full">
      {/* ── CATEGORY FILTER ROW ───────────────────────────── */}
      <div className="snap-row no-scrollbar pb-3 border-b border-border/70 mb-6">
        {CATEGORY_FILTERS.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              type="button"
              className={`snap-start flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold transition-all min-h-[44px] whitespace-nowrap ${
                isSelected
                  ? "gradient-primary text-white shadow-md scale-105"
                  : "border border-border/80 bg-card text-foreground/80 hover:bg-muted"
              }`}
              aria-pressed={isSelected}
            >
              <span>{isMr ? cat.label_mr : cat.label_en}</span>
            </button>
          );
        })}
      </div>

      {/* ── VERTICAL TIMELINE CONTAINER ──────────────────── */}
      <div className="relative pl-4 sm:pl-8 border-l-2 border-gold/40 space-y-6 sm:space-y-8 ml-3 sm:ml-4">
        <AnimatePresence>
          {filteredEvents.map((evt, idx) => {
            const isToday = evt.date === todayStr;

            return (
              <motion.div
                layout
                key={evt.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.3) }}
                whileHover={{ scale: 1.015, x: 4 }}
                className={`relative rounded-2xl border p-4 sm:p-6 transition-all shadow-md ${
                  isToday
                    ? "border-2 border-primary bg-primary/5 ring-4 ring-primary/20 shadow-lg"
                    : evt.is_highlight
                    ? "border-2 border-gold/70 bg-gradient-to-r from-gold/10 via-card to-card hover:border-gold shadow-md"
                    : "border-border/80 bg-card hover:border-gold/50"
                }`}
              >
              {/* Timeline Node Dot on the vertical line */}
              <div
                className={`absolute -left-[27px] sm:-left-[43px] top-6 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 border-card shadow-sm ${
                  isToday
                    ? "bg-primary text-white ring-4 ring-primary/30"
                    : evt.is_highlight
                    ? "bg-gold text-slate-950"
                    : "bg-muted text-foreground"
                }`}
              >
                {isToday ? (
                  <Flame size={14} className="animate-pulse" />
                ) : (
                  <span className="text-[10px] sm:text-xs font-bold">
                    {evt.day_number}
                  </span>
                )}
              </div>

              {/* Card Header: Day Badge, Category Pill & Today Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg gradient-festive px-2.5 py-1 text-xs font-bold text-slate-900 shadow-sm">
                    {isMr
                      ? evt.day_number === 10
                        ? evt.category === "bhandara"
                          ? "अंतिम दिवस — महाप्रसाद"
                          : "विसर्जन सोहळा"
                        : `दिवस ${evt.day_number}`
                      : evt.day_number === 10
                      ? evt.category === "bhandara"
                        ? "Final Day — Mahaprasad"
                        : "Visarjan Ceremony"
                      : `Day ${evt.day_number}`}
                  </span>

                  <span className="text-xs font-semibold text-muted-foreground">
                    {evt.date} ({isMr ? evt.day_name_mr : evt.day_name_en})
                  </span>

                  {isToday && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-extrabold text-white animate-pulse">
                      <Flame size={10} />
                      {isMr ? "आजचा कार्यक्रम" : "Today"}
                    </span>
                  )}
                </div>

                <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] font-semibold text-foreground/80">
                  {isMr ? evt.category_label_mr : evt.category_label_en}
                </span>
              </div>

              {/* Event Title */}
              <h3 className="deva-heading mt-3 text-lg sm:text-xl font-bold text-foreground leading-snug">
                {isMr ? evt.title_mr : evt.title_en}
              </h3>

              {/* Time & Venue meta pills */}
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-foreground/90 font-medium">
                  <Clock size={13} className="text-accent shrink-0" />
                  <span>{isMr ? evt.time_display_mr : evt.time_display_en}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-foreground/90 font-medium">
                  <MapPin size={13} className="text-primary shrink-0" />
                  <span>{isMr ? evt.location_mr : evt.location_en}</span>
                </span>
              </div>

              {/* Description */}
              <p className="deva-body mt-3 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                {isMr ? evt.description_mr : evt.description_en}
              </p>

              {/* 1-Tap Add to Calendar Action Button */}
              <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => handleAddToCalendar(evt)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-gold/50 bg-gold/10 px-3.5 py-2 text-xs font-bold text-foreground hover:bg-gold/20 active:scale-95 transition-all min-h-[44px]"
                  aria-label={isMr ? "कॅलेंडरमध्ये जोडा" : "Add to Calendar"}
                >
                  {downloadedEventId === evt.id ? (
                    <>
                      <Check size={14} className="text-green-600" />
                      <span>{isMr ? "कॅलेंडर फाइल डाउनलोड झाली!" : "Calendar Event Added!"}</span>
                    </>
                  ) : (
                    <>
                      <CalendarPlus size={14} className="text-gold" />
                      <span>{isMr ? "कॅलेंडरमध्ये जोडा (.ics)" : "Add to Calendar (.ics)"}</span>
                    </>
                  )}
                </button>

                {evt.is_highlight && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gold">
                    <Sparkles size={12} />
                    {isMr ? "विशेष महासोहळा" : "Grand Highlight"}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>
    </div>
  );
}
