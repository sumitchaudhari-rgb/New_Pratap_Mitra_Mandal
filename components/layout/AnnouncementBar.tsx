"use client";

import { useTranslations } from "next-intl";
import { X, Sparkles, Flame } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AnnouncementBar() {
  const t = useTranslations("announcement");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const tickerText = t("text");

  return (
    <div
      className="announcement-bar relative flex items-center overflow-hidden py-2 px-8 border-b border-gold/30 shadow-xs"
      role="banner"
      aria-label="Announcement"
    >
      {/* Infinite Scrolling Marquee Ticker */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex shrink-0 items-center gap-10 whitespace-nowrap"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 text-xs sm:text-sm font-semibold tracking-wide">
            <span className="flex items-center gap-1.5 text-gold">
              <Flame size={13} className="text-accent animate-flame-pulse" />
              <span>{tickerText}</span>
            </span>
            <span className="text-gold/70">•</span>
            <span className="flex items-center gap-1 text-gold/90">
              <Sparkles size={12} className="text-accent" />
              <span>दैनिक महाआरती: सकाळी ०७:०० व सायंकाळी ०७:००</span>
            </span>
            <span className="text-gold/70">•</span>
            <span className="text-accent font-bold">
              भव्य विसर्जन मिरवणूक: २१ ऑक्टोबर २०२६
            </span>
            <span className="text-gold/70">•</span>
          </div>
        ))}
      </motion.div>

      {/* Dismiss Button */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Close announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-sm p-1 text-white/80 hover:text-white transition-opacity z-10"
        style={{ minWidth: 28, minHeight: 28 }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
