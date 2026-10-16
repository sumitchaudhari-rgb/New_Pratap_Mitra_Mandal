import { createClient } from "@/lib/supabase/client";

export interface SiteSettings {
  mandal_name: string;
  mandal_tagline: string;
  idol_form: string;
  idol_height: string;
  idol_sculptor: string;
  founding_year: string;
  installation_date: string;
  festival_year: string;
  visarjan_date: string;
  darshan_morning_start: string;
  darshan_morning_end: string;
  darshan_evening_start: string;
  darshan_evening_end: string;
  aarti_morning: string;
  aarti_evening: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  mandal_name: "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा",
  mandal_tagline: "श्री छिन्नमस्ता मातेच्या चरणी नमस्कार",
  idol_form: "श्री छिन्नमस्ता माता (सहावी महाविद्या)",
  idol_height: "१० फूट",
  idol_sculptor: "दिपक कानोजे (भुसावळ)",
  founding_year: "१९८०",
  installation_date: "११/१०/२०२६",
  festival_year: "२०२६",
  visarjan_date: "2026-10-21T18:00:00+05:30", // Visarjan 2026
  darshan_morning_start: "०६:०० AM",
  darshan_morning_end: "१२:०० PM",
  darshan_evening_start: "०४:०० PM",
  darshan_evening_end: "११:०० PM",
  aarti_morning: "०७:०० AM",
  aarti_evening: "०७:०० PM",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  // If Supabase is not yet configured or fails, smoothly return defaults
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
  ) {
    return DEFAULT_SITE_SETTINGS;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (error || !data) {
      return DEFAULT_SITE_SETTINGS;
    }

    return {
      ...DEFAULT_SITE_SETTINGS,
      ...data,
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
