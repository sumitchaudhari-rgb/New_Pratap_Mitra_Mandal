import type { Metadata } from "next";
import CountdownTimer from "@/components/home/CountdownTimer";
import TodayEveningAartiBanner from "@/components/home/TodayEveningAartiBanner";
import TodayDeviCard from "@/components/home/TodayDeviCard";
import TodayProgrammeCard from "@/components/home/TodayProgrammeCard";
import HomeHeroMotion from "@/components/home/HomeHeroMotion";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "mr"
        ? "मुखपृष्ठ | न्यु प्रताप मित्र मंडळ"
        : "Home | Nyu Pratap Mitra Mandal",
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="space-y-2">
      {/* ── HERO WITH MOTION & AMBIENT AURA ──────────────── */}
      <HomeHeroMotion locale={locale} />

      {/* ── TODAY'S EVENING AARTI MANKARI BANNER ─────────── */}
      <TodayEveningAartiBanner locale={locale} />

      {/* ── COUNTDOWN TIMER COMPONENT ────────────────────── */}
      <CountdownTimer locale={locale} />

      {/* ── TODAY'S DEVI (NAVDURGA) COMPONENT ─────────────── */}
      <TodayDeviCard locale={locale} />

      {/* ── TODAY'S PROGRAMME PREVIEW ────────────────────── */}
      <TodayProgrammeCard locale={locale} />
    </div>
  );
}
