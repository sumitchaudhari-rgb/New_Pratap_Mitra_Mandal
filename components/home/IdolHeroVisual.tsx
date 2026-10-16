"use client";

import Image from "next/image";
import { Flame, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface IdolHeroVisualProps {
  locale?: string;
}

export default function IdolHeroVisual({ locale = "mr" }: IdolHeroVisualProps) {
  const isMr = locale === "mr";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-xs sm:max-w-sm mt-8"
    >
      {/* Outer ambient pulsing glow */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-40 blur-2xl gradient-festive -z-10 animate-pulse-glow"
        aria-hidden="true"
      />

      {/* Rotating Sacred Halo Aura behind idol */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="pointer-events-none absolute -inset-6 -z-10 opacity-30 blur-md"
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-full border-2 border-dashed border-gold/70" />
      </motion.div>

      {/* Main Elevated Card with Float animation */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
        whileHover={{ scale: 1.03 }}
        className="relative overflow-hidden rounded-2xl border-2 border-gold/80 bg-gradient-to-b from-card via-card to-primary/15 shadow-2xl transition-shadow hover:shadow-[0_20px_45px_rgba(240,165,0,0.25)]"
      >
        {/* Top Gold Corner Accents with Twinkle */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 text-gold drop-shadow"
        >
          <Sparkles size={15} />
        </motion.div>
        <motion.div
          animate={{ scale: [1.2, 0.8, 1.2], opacity: [1, 0.6, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 text-gold drop-shadow"
        >
          <Sparkles size={15} />
        </motion.div>

        {/* Top Divine Badge */}
        <div className="absolute top-3 inset-x-0 z-10 text-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/70 bg-black/70 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-gold uppercase tracking-wider shadow-lg">
            <Flame size={13} className="text-accent animate-flame-pulse" />
            {isMr ? "सहावी महाविद्या — २०२६" : "Sixth Mahavidya — 2026"}
          </span>
        </div>

        {/* Idol Display Container */}
        <div
          className="relative aspect-[3/4] w-full overflow-hidden bg-muted group cursor-pointer"
          aria-label={
            isMr
              ? "श्री छिन्नमस्ता माता मूर्ती दर्शन — न्यु प्रताप मित्र मंडळ"
              : "Shri Chhinnamasta Mata Idol Darshan — Nyu Pratap Mitra Mandal"
          }
        >
          <Image
            src="/images/HomePageImage.jpeg"
            alt={
              isMr
                ? "श्री छिन्नमस्ता माता — न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा"
                : "Shri Chhinnamasta Mata — Nyu Pratap Mitra Mandal, Dangarvada Asoda"
            }
            fill
            sizes="(max-width: 640px) 320px, 384px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            priority
          />

          {/* Bottom vignette gradient for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-4 text-center">
            <h3
              className="deva-heading text-xl sm:text-2xl font-extrabold tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
              style={{ color: "#F0A500" }}
            >
              {isMr ? "श्री छिन्नमस्ता माता" : "Shri Chhinnamasta Mata"}
            </h3>
            <p className="text-[11px] text-white/80 font-medium tracking-wide">
              {isMr ? "डांगरवाडा असोदा (जळगाव)" : "Dangarvada Asoda (Jalgaon)"}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
