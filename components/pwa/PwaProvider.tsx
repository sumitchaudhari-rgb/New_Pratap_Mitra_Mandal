"use client";

import React, { useEffect } from "react";

export default function PwaProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register Service Worker for offline capabilities and caching
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch(() => {
            // Service worker registration failed
          });
      });
    }
  }, []);

  return <>{children}</>;
}
