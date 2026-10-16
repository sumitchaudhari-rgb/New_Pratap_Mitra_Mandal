"use client";

import { useTranslations } from "next-intl";
import { Flame, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import IdolHeroVisual from "./IdolHeroVisual";

const CHIPS = [
  { key: "gallery", href: "/gallery", emoji: "🖼️" },
  { key: "programme", href: "/programme", emoji: "📅" },
  { key: "aarti", href: "/aarti", emoji: "🪔" },
  { key: "live", href: "/live", emoji: "📡" },
  { key: "donate", href: "/community#donate", emoji: "❤️" },
] as const;

export default function HomeHeroMotion({ locale }: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section
      className="relative overflow-hidden px-4 pb-8 pt-5 sm:px-6 sm:pt-8 md:pt-12"
      aria-label="Hero section"
    >
      {/* Decorative ambient background glows */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl gradient-festive"
        />
        <motion.div
          animate={{ x: [-20, 20, -20], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute top-48 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [20, -20, 20], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute top-48 -right-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
        />

        {/* Floating sacred sparkle particles */}
        <motion.div
          animate={{ y: [0, -24, 0], x: [0, 12, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-16 left-[12%] text-gold pointer-events-none hidden sm:block"
        >
          <Sparkles size={22} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 4.5, delay: 1, ease: "easeInOut" }}
          className="absolute top-28 right-[12%] text-accent pointer-events-none hidden sm:block"
        >
          <Sparkles size={18} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -18, 0], scale: [0.8, 1.25, 0.8], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 6, delay: 2, ease: "easeInOut" }}
          className="absolute top-64 left-[6%] text-gold pointer-events-none"
        >
          <Sparkles size={16} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -22, 0], scale: [1, 1.3, 1], opacity: [0.3, 0.85, 0.3] }}
          transition={{ repeat: Infinity, duration: 5.5, delay: 0.5, ease: "easeInOut" }}
          className="absolute top-72 right-[8%] text-gold pointer-events-none"
        >
          <Sparkles size={20} />
        </motion.div>
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3.5 flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-card/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-foreground shadow-sm">
            <Flame size={14} className="text-accent animate-flame-pulse" />
            <span>नवरात्रोत्सव २०२६</span>
            <span className="text-gold">•</span>
            <span className="text-muted-foreground font-semibold">४६ वे वर्ष</span>
          </span>
        </motion.div>

        {/* Main Heading with Stagger Motion */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="deva-heading gradient-text text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl drop-shadow-xs"
        >
          {t("hero.heading")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="deva-heading mt-2.5 text-base sm:text-xl font-extrabold text-accent flex items-center justify-center gap-2"
        >
          <Sparkles size={16} className="text-gold" />
          <span>{t("hero.subheading")}</span>
          <Sparkles size={16} className="text-gold" />
        </motion.p>

        {/* Intro Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="deva-body mx-auto mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-foreground/85 font-medium"
        >
          {t("hero.intro")}
        </motion.p>

        {/* CTA Buttons with Spring Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/idol"
              id="cta-idol"
              className="flex items-center justify-center gap-2 gradient-primary text-white font-bold rounded-xl px-7 py-3.5 text-sm min-h-[52px] shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
            >
              <span>{t("hero.ctaIdol")}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/aarti"
              id="cta-aarti"
              className="flex items-center justify-center gap-2 border-2 border-primary/80 text-primary font-bold rounded-xl px-7 py-3.5 text-sm min-h-[52px] transition-all hover:bg-primary/5 bg-card/80 backdrop-blur-sm shadow-sm"
            >
              <span>{t("hero.ctaAarti")}</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Idol Hero Presentation Visual */}
        <IdolHeroVisual locale={locale} />

        {/* Quick-link chips with tactile spring hover */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="snap-row no-scrollbar mt-7 justify-center sm:flex-wrap"
          role="navigation"
          aria-label="Quick links"
        >
          {CHIPS.map(({ key, href, emoji }) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href={href}
                id={`chip-${key}`}
                className="snap-start flex items-center gap-1.5 rounded-full border border-gold/40 bg-card/90 backdrop-blur-md px-4 py-2.5 text-xs sm:text-sm font-bold text-foreground/90 shadow-sm transition-colors hover:border-gold hover:text-primary min-h-[44px] whitespace-nowrap"
              >
                <span aria-hidden="true">{emoji}</span>
                <span>{t(`chips.${key}` as Parameters<typeof t>[0])}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
