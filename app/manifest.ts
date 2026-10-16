import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "न्यु प्रताप मित्र मंडळ - नवरात्रोत्सव २०२६",
    short_name: "न्यु प्रताप मंडळ",
    description:
      "डांगरवाडा असोदा येथील न्यु प्रताप मित्र मंडळाच्या श्री छिन्नमस्ता माता नवरात्रोत्सव २०२६ चे अधिकृत संकेतस्थळ.",
    start_url: "/mr",
    display: "standalone",
    background_color: "#FFF8F0",
    theme_color: "#8B1A2C",
    orientation: "portrait",
    lang: "mr",
    categories: ["culture", "religion", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
