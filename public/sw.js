// Service Worker for Nyu Pratap Mitra Mandal PWA (Navratri 2026)
const CACHE_NAME = "pratap-mandal-v2";
const STATIC_ASSETS = [
  "/",
  "/mr",
  "/mr/aarti",
  "/mr/programme",
  "/mr/idol",
  "/mr/contact",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
  "/manifest.webmanifest",
  "/images/HomePageImage.jpeg"
];

// Install Event - Pre-cache core shell & aartis
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("PWA pre-cache warning:", err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Stale-while-revalidate for pages, Cache-first for images & fonts
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and browser extensions
  if (request.method !== "GET" || !url.protocol.startsWith("http")) return;

  // CRITICAL: NEVER cache Next.js internal chunks, HMR, APIs, or admin dashboards
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/api/") ||
    url.pathname.includes("/admin")
  ) {
    return; // Pass through directly to network
  }

  // Static Assets (Images, Icons, Fonts) -> Cache First
  if (
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.includes(".svg") ||
    url.pathname.includes(".webp") ||
    url.pathname.includes(".woff2")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // HTML Pages -> Network first with cache fallback
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            // Fallback to cached aarti or home if available
            return caches.match("/mr/aarti") || caches.match("/mr");
          });
        })
    );
    return;
  }

  // Default: Network with Cache Fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
