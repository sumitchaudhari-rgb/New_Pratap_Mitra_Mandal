"use client";

import { useEffect, useState } from "react";
import { Sparkles, Calendar, PartyPopper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  targetDate?: string;
  locale?: string;
}

// Navratri 2026 Visarjan target date (October 21, 2026 18:00 IST)
const DEFAULT_TARGET = "2026-10-21T18:00:00+05:30";

function toDevanagariDigits(num: number | string): string {
  const devanagariDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(num).replace(/\d/g, (d) => devanagariDigits[Number(d)]);
}

export default function CountdownTimer({
  targetDate = DEFAULT_TARGET,
  locale = "mr",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function calculateTime() {
      setMounted(true);
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    }

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isMr = locale === "mr";

  // Post-festival celebration banner state
  if (mounted && timeLeft.isPast) {
    return (
      <section className="px-3 sm:px-6 py-6" aria-label="Festival Celebration">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-gold bg-gradient-to-r from-primary/10 via-gold/15 to-accent/10 p-6 text-center shadow-lg"
        >
          <div className="flex justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold shadow-inner">
              <PartyPopper size={24} />
            </span>
          </div>
          <h3 className="deva-heading mt-3 text-xl font-bold text-foreground sm:text-2xl">
            {isMr
              ? "॥ नवरात्रोत्सव २०२६ मंगलमय संपन्न ॥"
              : "Navratri 2026 Celebrations Complete"}
          </h3>
          <p className="deva-body mt-2 text-sm text-foreground/80 leading-relaxed">
            {isMr
              ? "आई श्री छिन्नमस्ता मातेच्या कृपेने यंदाचा नवरात्रोत्सव अत्यंत उत्साहात संपन्न झाला. सर्व भाविकांचे, दानशूरांचे व कार्यकर्त्यांचे मनःपूर्वक आभार!"
              : "By the divine grace of Shri Chhinnamasta Mata, Navratri celebrations concluded with immense devotional fervor. Sincere thanks to all devotees and volunteers!"}
          </p>
        </motion.div>
      </section>
    );
  }

  const units = [
    {
      key: "days",
      label_mr: "दिवस",
      label_en: "Days",
      value: timeLeft.days,
    },
    {
      key: "hours",
      label_mr: "तास",
      label_en: "Hours",
      value: timeLeft.hours,
    },
    {
      key: "minutes",
      label_mr: "मिनिटे",
      label_en: "Minutes",
      value: timeLeft.minutes,
    },
    {
      key: "seconds",
      label_mr: "सेकंद",
      label_en: "Seconds",
      value: timeLeft.seconds,
    },
  ];

  return (
    <section className="px-3 sm:px-6 py-6" aria-label="Navratri Countdown">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl rounded-2xl border-2 border-gold/40 bg-card/95 p-4 sm:p-6 shadow-xl backdrop-blur-md transition-all hover:border-gold/60"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent shadow-xs">
              <Calendar size={18} />
            </span>
            <div>
              <p className="deva-heading text-sm sm:text-base font-bold text-foreground">
                {isMr ? "विसर्जन सोहळा उलटी गणती" : "Visarjan Ceremony Countdown"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {isMr ? "२१ ऑक्टोबर २०२६ — बुधवार" : "21 October 2026 — Wednesday"}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/30 px-3 py-1 text-xs font-bold text-gold shadow-xs">
            <Sparkles size={13} className="text-accent" />
            {isMr ? "उरलेला वेळ" : "Remaining"}
          </span>
        </div>

        {/* 4 Dials Grid with Animated Cards */}
        <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4">
          {units.map((unit) => {
            const formatted = String(unit.value).padStart(2, "0");
            const displayValue = mounted
              ? isMr
                ? toDevanagariDigits(formatted)
                : formatted
              : "--";

            return (
              <motion.div
                key={unit.key}
                whileHover={{ y: -4, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="group relative flex flex-col items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-b from-primary/5 via-card to-accent/5 p-3 sm:p-4 text-center shadow-sm hover:shadow-md hover:border-gold/70"
              >
                <span className="deva-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary drop-shadow-xs">
                  {displayValue}
                </span>
                <span className="deva-body mt-1 text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {isMr ? unit.label_mr : unit.label_en}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Festive footer line */}
        <div className="mt-3.5 text-center pt-2 border-t border-border/40">
          <p className="deva-heading text-xs font-bold text-gold tracking-wide">
            {isMr
              ? "॥ आई श्री छिन्नमस्ता माता की जय ॥"
              : "॥ Jai Shri Chhinnamasta Mata ॥"}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
