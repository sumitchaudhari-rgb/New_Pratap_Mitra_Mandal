"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  GALLERY_CATEGORIES,
  GALLERY_YEARS,
  GalleryPhoto,
  PhotoCategory,
} from "@/lib/data/gallery";
import GalleryLightbox from "./GalleryLightbox";
import { Sparkles, Calendar, Maximize2, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryGridProps {
  initialPhotos: GalleryPhoto[];
  locale: string;
}

export default function GalleryGrid({ initialPhotos, locale }: GalleryGridProps) {
  const isMr = locale === "mr";

  // Active category filter
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>("all");

  // Active year filter (null = all years)
  const [activeYear, setActiveYear] = useState<number | null>(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    return initialPhotos.filter((photo) => {
      const matchCategory =
        activeCategory === "all" || photo.category === activeCategory;
      const matchYear = activeYear === null || photo.year === activeYear;
      return matchCategory && matchYear;
    });
  }, [initialPhotos, activeCategory, activeYear]);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  if (initialPhotos.length === 0) {
    return (
      <div className="w-full mt-4">
        <div className="rounded-2xl border-2 border-dashed border-gold/40 bg-card/70 p-8 sm:p-14 text-center shadow-xs">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
            <Camera size={32} className="text-accent" />
          </div>
          <h3 className="deva-heading mt-4 text-xl sm:text-2xl font-bold text-foreground">
            {isMr ? "उत्सवाची छायाचित्रे लवकरच येथे उपलब्ध होतील!" : "Festival Photos Coming Soon!"}
          </h3>
          <p className="deva-body mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            {isMr
              ? "नवरात्रोत्सवातील श्री छिन्नमस्ता माता मूर्ती प्रतिष्ठापना, देखावा, महाआरती व विसर्जन सोहळ्याची छायाचित्रे लवकरच अपलोड करण्यात येतील."
              : "Sacred photos of Shri Chhinnamasta Mata idol installation, pandal decoration, Maha Aarti, and Visarjan procession will be uploaded soon."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ── CATEGORY FILTER CHIPS ───────────────────────── */}
      <div className="snap-row no-scrollbar pb-2">
        {GALLERY_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              type="button"
              className={`snap-start flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold transition-all min-h-[44px] whitespace-nowrap ${
                isSelected
                  ? "gradient-primary text-white shadow-md scale-105"
                  : "border border-border/80 bg-card text-foreground/80 hover:bg-muted"
              }`}
              aria-pressed={isSelected}
            >
              <span aria-hidden="true">{cat.emoji}</span>
              <span>{isMr ? cat.label_mr : cat.label_en}</span>
            </button>
          );
        })}
      </div>

      {/* ── YEAR SUB-FILTER ROW ───────────────────────────── */}
      <div className="mt-3 flex items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveYear(null)}
            type="button"
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors min-h-[36px] ${
              activeYear === null
                ? "bg-foreground text-background font-bold"
                : "bg-muted/70 text-muted-foreground hover:text-foreground"
            }`}
          >
            {isMr ? "सर्व वर्षे" : "All Years"}
          </button>
          {GALLERY_YEARS.map((year) => {
            const isSelected = activeYear === year;
            return (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                type="button"
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors min-h-[36px] ${
                  isSelected
                    ? "bg-gold text-slate-950 font-bold shadow-sm"
                    : "bg-muted/70 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Calendar size={12} />
                <span>{year}</span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground font-medium shrink-0">
          {filteredPhotos.length} {isMr ? "छायाचित्रे" : "photos"}
        </p>
      </div>

      {/* ── MASONRY / RESPONSIVE PHOTO GRID ──────────────── */}
      {filteredPhotos.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border p-8 text-center bg-card">
          <Sparkles size={32} className="mx-auto text-muted-foreground" />
          <p className="deva-heading mt-3 text-base font-bold text-foreground">
            {isMr
              ? "या श्रेणीमध्ये छायाचित्रे उपलब्ध नाहीत"
              : "No photos available in this filter"}
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setActiveYear(null);
            }}
            className="mt-3 inline-flex items-center gap-1 rounded-xl gradient-primary px-4 py-2 text-xs font-bold text-white shadow"
          >
            {isMr ? "सर्व छायाचित्रे पहा" : "Reset Filters"}
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => openLightbox(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-border/80 bg-card shadow-md transition-all duration-300 hover:shadow-2xl hover:border-gold/70"
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={photo.image_url}
                    alt={isMr ? photo.title_mr : photo.title_en}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5" />

                  {/* Top Badge: Year & Category */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="rounded-full bg-black/70 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      {photo.year}
                    </span>
                    <span className="rounded-full bg-gold text-slate-950 px-2.5 py-0.5 text-[10px] font-black shadow-sm">
                      {isMr ? photo.category_label_mr : photo.category_label_en}
                    </span>
                  </div>

                  {/* Expand icon */}
                  <div className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-sm">
                    <Maximize2 size={14} />
                  </div>
                </div>

                {/* Title & Caption */}
                <div className="p-3.5">
                  <h3 className="deva-heading text-xs sm:text-sm font-extrabold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {isMr ? photo.title_mr : photo.title_en}
                  </h3>
                  <p className="deva-body mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {isMr ? photo.caption_mr : photo.caption_en}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── LIGHTBOX ─────────────────────────────────────── */}
      <GalleryLightbox
        photos={filteredPhotos}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
        locale={locale}
      />
    </div>
  );
}
