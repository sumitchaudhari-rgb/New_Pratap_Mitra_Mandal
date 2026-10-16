"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { GalleryPhoto } from "@/lib/data/gallery";

interface LightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  locale: string;
}

export default function GalleryLightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  locale,
}: LightboxProps) {
  const isMr = locale === "mr";
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const photo = photos[currentIndex];

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(photos.length - 1);
    }
  }, [currentIndex, onNavigate, photos.length]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  }, [currentIndex, onNavigate, photos.length]);

  // Lock body scroll and handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Minimum swipe threshold (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext(); // swipe left -> next photo
      } else {
        handlePrev(); // swipe right -> prev photo
      }
    }
    setTouchStartX(null);
  };

  if (!isOpen || !photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md animate-fade-in-up"
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* ── TOP BAR ────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/40">
        <div className="flex items-center gap-2 text-white/90">
          <Sparkles size={16} className="text-gold" />
          <span className="text-xs font-semibold">
            {currentIndex + 1} / {photos.length}
          </span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] text-white">
            {isMr ? photo.category_label_mr : photo.category_label_en}
          </span>
          <span className="rounded-full bg-gold/30 px-2 py-0.5 text-[10px] text-gold font-bold">
            {photo.year}
          </span>
        </div>

        {/* 48px touch-friendly close target */}
        <button
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
          aria-label="Close photo preview"
        >
          <X size={24} />
        </button>
      </div>

      {/* ── MAIN IMAGE VIEWPORT ───────────────────────────── */}
      <div className="relative flex flex-1 items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Navigation arrow Left */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white/90 hover:bg-black/80 hover:text-white transition-all shadow-lg active:scale-90"
          aria-label="Previous photo"
        >
          <ChevronLeft size={28} />
        </button>

        {/* The photo container */}
        <div className="relative max-h-[70vh] max-w-[95vw] sm:max-w-4xl h-full w-full flex items-center justify-center">
          <Image
            src={photo.image_url}
            alt={isMr ? photo.title_mr : photo.title_en}
            fill
            sizes="(max-width: 768px) 100vw, 85vw"
            className="object-contain select-none"
            priority
          />
        </div>

        {/* Navigation arrow Right */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white/90 hover:bg-black/80 hover:text-white transition-all shadow-lg active:scale-90"
          aria-label="Next photo"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* ── BOTTOM CAPTION ─────────────────────────────────── */}
      <div className="px-4 py-3 bg-black/70 text-center border-t border-white/10">
        <h3 className="deva-heading text-sm sm:text-base font-bold text-white">
          {isMr ? photo.title_mr : photo.title_en}
        </h3>
        <p className="deva-body mt-1 text-xs text-white/80 max-w-xl mx-auto leading-relaxed">
          {isMr ? photo.caption_mr : photo.caption_en}
        </p>
        <p className="mt-1 text-[10px] text-white/50">
          {isMr ? "डावीकडे/उजवीकडे स्वाइप करा • Esc ने बंद करा" : "Swipe left/right • Press Esc to close"}
        </p>
      </div>
    </div>
  );
}
