import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// ── Security Headers ─────────────────────────────────────────
const isDev = process.env.NODE_ENV === "development";

const cspDirectives = [
  "default-src 'self'",
  // Next.js requires 'unsafe-inline' for style hydration; next/font uses fonts.gstatic.com
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Google Fonts woff2 delivery
  "font-src 'self' https://fonts.gstatic.com",
  // Images from Supabase storage and own domain
  "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com",
  // Media from own origin (Web Audio API needs no external src)
  "media-src 'self'",
  // Dev: React Turbopack/HMR needs unsafe-eval. Production: strict.
  isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'",
  // Service worker from same origin
  "worker-src 'self' blob:",
  // YouTube embed for live stream page
  "frame-src 'self' https://www.youtube.com https://youtube.com",
  // Supabase Realtime + REST
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  // Block Flash / ActiveX objects
  "object-src 'none'",
  // Only load base URL from same origin
  "base-uri 'self'",
  // Prevent form submissions to external domains
  "form-action 'self'",
];

const securityHeaders = [
  // Prevent browsers from MIME-sniffing content type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block clickjacking / iframe embedding from other origins
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Legacy XSS Protection for older browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Control referrer info sent to other origins
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Force HTTPS for 1 year (enforced by Vercel HTTPS automatically)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Restrict powerful browser APIs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(self), geolocation=(), payment=(), usb=()",
  },
  // CSP (dynamically strict in production, relaxed for dev HMR)
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
];

const nextConfig: NextConfig = {
  // ── Disable powered-by header (avoid fingerprinting)
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  // ── Apply security headers to all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

