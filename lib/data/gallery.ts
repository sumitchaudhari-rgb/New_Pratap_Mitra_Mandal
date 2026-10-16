import { createClient } from "@/lib/supabase/client";

export type PhotoCategory =
  | "all"
  | "idol"
  | "karyakarte"
  | "decoration"
  | "aarti"
  | "procession"
  | "historical";

export interface GalleryPhoto {
  id: string;
  title_mr: string;
  title_en: string;
  category: "idol" | "karyakarte" | "decoration" | "aarti" | "procession" | "historical";
  category_label_mr: string;
  category_label_en: string;
  year: number;
  image_url: string;
  aspect_ratio?: string; // e.g. "3/4", "16/9", "4/3", "1/1"
  caption_mr: string;
  caption_en: string;
  is_featured?: boolean;
}

export const GALLERY_CATEGORIES: {
  key: PhotoCategory;
  label_mr: string;
  label_en: string;
  emoji: string;
}[] = [
  { key: "all", label_mr: "सर्व छायाचित्रे", label_en: "All Photos", emoji: "✨" },
  { key: "idol", label_mr: "मूर्ती दर्शन", label_en: "Idol Darshan", emoji: "🪔" },
  { key: "karyakarte", label_mr: "मंडळाचे कार्यकर्ते", label_en: "Mandal Volunteers", emoji: "👥" },
  { key: "decoration", label_mr: "देखावा व आरास", label_en: "Pandal Decoration", emoji: "🎨" },
  { key: "aarti", label_mr: "महाआरती", label_en: "Maha Aarti", emoji: "🔥" },
  { key: "procession", label_mr: "मिरवणूक", label_en: "Procession", emoji: "🥁" },
  { key: "historical", label_mr: "मागील वर्षे", label_en: "Past Years", emoji: "📜" },
];

export const GALLERY_YEARS = [2026, 2025, 2024] as const;

export const DEFAULT_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-2026-mandap-homepage",
    title_mr: "श्री छिन्नमस्ता माता देखावा व भव्य मंडप २०२६",
    title_en: "Shri Chhinnamasta Mata Pandal & Tableaux 2026",
    category: "decoration",
    category_label_mr: "देखावा व आरास",
    category_label_en: "Pandal Decoration",
    year: 2026,
    image_url: "/images/HomePageImage.jpeg",
    aspect_ratio: "4/3",
    caption_mr: "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा — नवरात्रोत्सव २०२६ मधील श्री छिन्नमस्ता मातेचा भव्य देखावा, मनमोहक मंडप व रोषणाई.",
    caption_en: "Nyu Pratap Mitra Mandal, Dangarvada Asoda — Navratri 2026 Shri Chhinnamasta Mata grand tableaux, pandal, and illumination.",
    is_featured: true,
  },
  {
    id: "photo-2026-karyakarte",
    title_mr: "न्यु प्रताप मित्र मंडळाचे कार्यकर्ते व संघटक",
    title_en: "Nyu Pratap Mitra Mandal Volunteers & Organizers",
    category: "karyakarte",
    category_label_mr: "मंडळाचे कार्यकर्ते",
    category_label_en: "Mandal Volunteers",
    year: 2026,
    image_url: "/images/mandlache-karyakarte.jpeg",
    aspect_ratio: "4/3",
    caption_mr: "डांगरवाडा असोदा येथील न्यु प्रताप मित्र मंडळाचे सर्व समर्पित व उत्साही कार्यकर्ते व संघटक — नवरात्रोत्सव २०२६.",
    caption_en: "Dedicated volunteers and committee members of Nyu Pratap Mitra Mandal, Dangarvada Asoda — Navratri 2026.",
    is_featured: true,
  },
  {
    id: "photo-2025-vedimata",
    title_mr: "डांगरवाड्याची आई २०२५ — वेडी माता",
    title_en: "Dangarvadyachi Aai 2025 — Vedi Mata",
    category: "historical",
    category_label_mr: "मागील वर्षे",
    category_label_en: "Past Years",
    year: 2025,
    image_url: "/images/vedi-mata-2025.jpeg",
    aspect_ratio: "1/1",
    caption_mr: "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा — नवरात्रोत्सव २०२५ मधील डांगरवाड्याची आई 'वेडी माता' मूर्ती दर्शन. #वेडीमाता #vedimata",
    caption_en: "Nyu Pratap Mitra Mandal, Dangarvada Asoda — Sacred idol of Dangarvadyachi Aai 'Vedi Mata' during Navratri 2025. #vedimata",
    is_featured: true,
  },
];

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
  ) {
    return DEFAULT_PHOTOS;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return DEFAULT_PHOTOS;
    }

    return data as GalleryPhoto[];
  } catch {
    return DEFAULT_PHOTOS;
  }
}
