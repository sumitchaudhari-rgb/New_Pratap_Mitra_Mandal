"use client";

import React, { useEffect, useState } from "react";
import { Download, X, Smartphone, CheckCircle } from "lucide-react";
import { useLocale } from "next-intl";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const isMr = locale === "mr";

  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [showIosInstructions, setShowIosInstructions] = useState<boolean>(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch(() => {
            // Service worker registration failed — PWA offline features unavailable
          });
      });
    }

    // 2. Check if already installed (standalone mode)
    if (typeof window !== "undefined") {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        // @ts-expect-error navigator.standalone is iOS Safari specific
        window.navigator.standalone === true;

      if (isStandalone) {
        setIsInstalled(true);
        return;
      }

      // Check if dismissed recently (24h)
      const dismissed = localStorage.getItem("pratap_pwa_dismissed");
      if (dismissed && Date.now() - parseInt(dismissed, 10) < 24 * 60 * 60 * 1000) {
        // Dismissed within last 24h
        return;
      }

      // Detect iOS Safari
      const ua = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(ua);
      setIsIos(isIosDevice);

      // 3. Listen for BeforeInstallPrompt (Chrome/Android)
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setInstallPrompt(e as BeforeInstallPromptEvent);
        setShowBanner(true);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstall);

      // On iOS, show prompt banner after 4 seconds if not dismissed
      if (isIosDevice && !isStandalone && !dismissed) {
        const timer = setTimeout(() => setShowBanner(true), 4000);
        return () => clearTimeout(timer);
      }

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setShowBanner(false);
        setIsInstalled(true);
      }
      setInstallPrompt(null);
    } else if (isIos) {
      setShowIosInstructions(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIosInstructions(false);
    try {
      localStorage.setItem("pratap_pwa_dismissed", Date.now().toString());
    } catch {
      // Ignore
    }
  };

  return (
    <>
      {children}

      {/* Floating Mobile PWA Install Card */}
      {showBanner && !isInstalled && (
        <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto animate-fade-in-up">
          <div className="rounded-2xl border-2 border-gold/50 bg-card/95 backdrop-blur-md p-4 shadow-2xl flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-primary text-white shadow-md">
              <Smartphone size={24} />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="deva-heading text-sm font-extrabold text-foreground truncate">
                {isMr ? "न्यु प्रताप मंडळ ॲप" : "New Pratap App"}
              </h4>
              <p className="deva-body text-xs text-muted-foreground line-clamp-1">
                {isMr
                  ? "आरती व उत्सव माहितीसाठी होम स्क्रीनवर जोडा"
                  : "Add to home screen for fast offline aarti"}
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 rounded-xl gradient-primary px-3 py-2 text-xs font-extrabold text-white shadow hover:opacity-95 transition-all min-h-[36px]"
              >
                <Download size={14} />
                <span>{isMr ? "इन्स्टॉल" : "Install"}</span>
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/80 transition-all"
                aria-label="Close install prompt"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* iOS Safari Instructions Drawer */}
          {showIosInstructions && (
            <div className="mt-2 rounded-xl border border-gold/40 bg-background/95 p-3 text-xs shadow-lg space-y-1.5">
              <p className="font-bold text-foreground">
                {isMr ? "iOS वर कसे इन्स्टॉल करावे:" : "How to install on iOS Safari:"}
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-muted-foreground">
                <li>
                  {isMr
                    ? "सफारी ब्राऊझरमधील 'Share' (शेअर) बटणावर टॅप करा"
                    : "Tap the Share button in Safari toolbar"}
                </li>
                <li>
                  {isMr
                    ? "'Add to Home Screen' (होम स्क्रीनवर जोडा) पर्याय निवडा"
                    : "Select 'Add to Home Screen'"}
                </li>
                <li>
                  {isMr ? "वरती उजवीकडे 'Add' वर टॅप करा" : "Tap 'Add' at top right"}
                </li>
              </ol>
            </div>
          )}
        </div>
      )}
    </>
  );
}
