"use client";

import React, { useEffect } from "react";

export default function PwaProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    // In development mode, ensure any existing service worker is unregistered to avoid stale chunk crashes
    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const reg of registrations) {
          reg.unregister();
        }
      });
      return;
    }

    // In production, safely register service worker
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .catch(() => {
          // Service worker registration failed silently
        });
    });
  }, []);

  return <>{children}</>;
}
