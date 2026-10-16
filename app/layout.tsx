import type { Metadata } from "next";
import { Tiro_Devanagari_Marathi, Mukta } from "next/font/google";
import "./globals.css";

const tiroDevanagari = Tiro_Devanagari_Marathi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro-devanagari",
  display: "swap",
});

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा",
  description:
    "डांगरवाडा असोदा येथील न्यु प्रताप मित्र मंडळाच्या नवरात्रोत्सवाचे अधिकृत संकेतस्थळ.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="mr"
      className={`${tiroDevanagari.variable} ${mukta.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />
        <meta name="theme-color" content="#8B1A2C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/icons/icon-192.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-512.svg" />
      </head>
      <body className="deva-body antialiased">{children}</body>
    </html>
  );
}
