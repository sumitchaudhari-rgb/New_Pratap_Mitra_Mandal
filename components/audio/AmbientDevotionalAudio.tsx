"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { useLocale } from "next-intl";

export default function AmbientDevotionalAudio() {
  const locale = useLocale();
  const isMr = locale === "mr";

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // Initialize Web Audio Synthesis for Divine Temple Drone & Ambient Bells
  const startDevotionalSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 2.5); // Gentle gentle volume
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Tanpura Root Drone (D# / 155.56 Hz + 311.13 Hz)
      const baseFreq = 155.56;
      [1, 1.5, 2, 2.67].forEach((mult, index) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = index % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(baseFreq * mult, ctx.currentTime);

        // Subtle detune for natural chorus warmth
        osc.detune.setValueAtTime((index - 1.5) * 4, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.06 / (index + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });

      // 2. Periodic Temple Bell (घंटा नाद) every 7-10 seconds
      const ringTempleBell = () => {
        if (!ctx || ctx.state === "closed" || !gainNodeRef.current) return;
        const now = ctx.currentTime;
        const bellOsc = ctx.createOscillator();
        const bellGain = ctx.createGain();

        // High frequency shimmering bell harmonic (1046.5 Hz - C6 / 1318.5 Hz - E6)
        const notes = [1046.5, 1174.66, 1318.5, 1567.98];
        const randomNote = notes[Math.floor(Math.random() * notes.length)];

        bellOsc.type = "sine";
        bellOsc.frequency.setValueAtTime(randomNote, now);

        bellGain.gain.setValueAtTime(0.08, now);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5); // long ring decay

        bellOsc.connect(bellGain);
        bellGain.connect(masterGain);

        bellOsc.onended = () => {
          try {
            bellOsc.disconnect();
            bellGain.disconnect();
          } catch {
            // Ignore
          }
        };

        bellOsc.start(now);
        bellOsc.stop(now + 4);
      };

      // Ring first bell after 1.5s
      setTimeout(ringTempleBell, 1500);

      // Ring periodic bells
      intervalRef.current = setInterval(ringTempleBell, 8500);

      setIsPlaying(true);
    } catch {
      // Web Audio API unavailable — ambient sound silently disabled
    }
  };

  const stopDevotionalSound = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      try {
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        setTimeout(() => {
          ctx.close();
          audioCtxRef.current = null;
          gainNodeRef.current = null;
        }, 1300);
      } catch {
        // Ignore
      }
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopDevotionalSound();
      try {
        localStorage.setItem("pratap_ambient_audio", "off");
      } catch {
        // Ignore
      }
    } else {
      startDevotionalSound();
      try {
        localStorage.setItem("pratap_ambient_audio", "on");
      } catch {
        // Ignore
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        onClick={toggleSound}
        type="button"
        title={
          isPlaying
            ? isMr
              ? "भक्तिमय संगीत बंद करा"
              : "Pause devotional ambient sound"
            : isMr
              ? "भक्तिमय संगीत सुरू करा (तंबोरा व घंटा नाद)"
              : "Play devotional ambient sound"
        }
        aria-label={
          isPlaying
            ? isMr
              ? "भक्तिमय संगीत बंद करा"
              : "Mute devotional ambient sound"
            : isMr
              ? "भक्तिमय संगीत सुरू करा"
              : "Play devotional ambient sound"
        }
        className={`group flex items-center gap-2 rounded-full px-3.5 py-2.5 shadow-lg backdrop-blur-md transition-all duration-300 border ${
          isPlaying
            ? "border-gold bg-primary/95 text-white shadow-primary/30 ring-2 ring-gold/40 scale-105"
            : "border-border bg-card/90 text-foreground hover:border-gold/60 hover:bg-card shadow-sm"
        }`}
      >
        {isPlaying ? (
          <>
            {/* Animated Sound Wave Bars */}
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-0.5 h-3 bg-gold rounded-full animate-bounce" style={{ animationDuration: "600ms" }} />
              <span className="w-0.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDuration: "400ms" }} />
              <span className="w-0.5 h-3.5 bg-gold rounded-full animate-bounce" style={{ animationDuration: "800ms" }} />
              <span className="w-0.5 h-2 bg-white rounded-full animate-bounce" style={{ animationDuration: "500ms" }} />
            </div>
            <span className="deva-body text-xs font-bold text-white hidden sm:inline">
              {isMr ? "भक्ति संगीत" : "Devotional"}
            </span>
            <Volume2 size={15} className="text-gold" />
          </>
        ) : (
          <>
            <Music size={15} className="text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="deva-body text-xs font-semibold text-muted-foreground group-hover:text-foreground hidden sm:inline transition-colors">
              {isMr ? "भक्ति संगीत" : "Ambient"}
            </span>
            <VolumeX size={15} className="text-muted-foreground" />
          </>
        )}
      </button>
    </div>
  );
}
