export interface AartiSession {
  time: string;
  yajman_mr: string;
  yajman_en: string;
  role_mr: string;
  role_en: string;
  prasad_mr: string;
  prasad_en: string;
}

export interface AartiYajmanDay {
  day: number;
  date_mr: string;
  date_en: string;
  devi_mr: string;
  devi_en: string;
  morningAarti: AartiSession;
  eveningAarti: AartiSession;
  specialOccasion_mr?: string;
  specialOccasion_en?: string;
}

export const AARTI_MANKARI_STORAGE_KEY = "pratap_aarti_mankari_schedule";

export const DEFAULT_AARTI_SCHEDULE: AartiYajmanDay[] = [
  {
    day: 1,
    date_mr: "११ ऑक्टोबर २०२६ (रविवार)",
    date_en: "11 October 2026 (Sunday)",
    devi_mr: "श्री शैलपुत्री माता (घटस्थापना)",
    devi_en: "Shri Shailaputri Mata (Ghatasthapana)",
    specialOccasion_mr: "घटस्थापना व नवरात्रारंभ मंगल महाआरती",
    specialOccasion_en: "Ghatasthapana & Festival Commencement",
    morningAarti: {
      time: "सकाळी ०८:३०",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
    eveningAarti: {
      time: "सायंकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
  },
  {
    day: 2,
    date_mr: "१२ ऑक्टोबर २०२६ (सोमवार)",
    date_en: "12 October 2026 (Monday)",
    devi_mr: "श्री ब्रह्मचारिणी माता",
    devi_en: "Shri Brahmacharini Mata",
    morningAarti: {
      time: "सकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
    eveningAarti: {
      time: "सायंकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
  },
  {
    day: 3,
    date_mr: "१३ ऑक्टोबर २०२६ (मंगळवार)",
    date_en: "13 October 2026 (Tuesday)",
    devi_mr: "श्री चंद्रघंटा माता",
    devi_en: "Shri Chandraghanta Mata",
    morningAarti: {
      time: "सकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
    eveningAarti: {
      time: "सायंकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
  },
  {
    day: 4,
    date_mr: "१४ ऑक्टोबर २०२६ (बुधवार)",
    date_en: "14 October 2026 (Wednesday)",
    devi_mr: "श्री कुष्मांडा माता",
    devi_en: "Shri Kushmanda Mata",
    morningAarti: {
      time: "सकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
    eveningAarti: {
      time: "सायंकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
  },
  {
    day: 5,
    date_mr: "१५ ऑक्टोबर २०२६ (गुरुवार)",
    date_en: "15 October 2026 (Thursday)",
    devi_mr: "श्री स्कंदमाता (ललिता पंचमी)",
    devi_en: "Shri Skandamata (Lalita Panchami)",
    specialOccasion_mr: "ललिता पंचमी विशेष महापूजा",
    specialOccasion_en: "Lalita Panchami Special Puja",
    morningAarti: {
      time: "सकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
    eveningAarti: {
      time: "सायंकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
  },
  {
    day: 6,
    date_mr: "१६ ऑक्टोबर २०२६ (शुक्रवार)",
    date_en: "16 October 2026 (Friday)",
    devi_mr: "श्री कात्यायनी माता (६ वी महाविद्या छिन्नमस्ता दिवस)",
    devi_en: "Shri Katyayani Mata (6th Mahavidya Day)",
    specialOccasion_mr: "६ वी महाविद्या श्री छिन्नमस्ता माता विशेष महाआरती सोहळा",
    specialOccasion_en: "Shri Chhinnamasta Mata Special Maha Aarti",
    morningAarti: {
      time: "सकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
    eveningAarti: {
      time: "सायंकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
  },
  {
    day: 7,
    date_mr: "१७ ऑक्टोबर २०२६ (शनिवार)",
    date_en: "17 October 2026 (Saturday)",
    devi_mr: "श्री कालरात्री माता",
    devi_en: "Shri Kalaratri Mata",
    morningAarti: {
      time: "सकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
    eveningAarti: {
      time: "सायंकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
  },
  {
    day: 8,
    date_mr: "१८ ऑक्टोबर २०२६ (रविवार)",
    date_en: "18 October 2026 (Sunday)",
    devi_mr: "श्री महागौरी माता (दुर्गाष्टमी / महाअष्टमी)",
    devi_en: "Shri Mahagauri Mata (Maha Ashtami)",
    specialOccasion_mr: "महाअष्टमी भव्य महायज्ञ, कन्या पूजन व महाआरती",
    specialOccasion_en: "Maha Ashtami Havan & Kanya Pujan",
    morningAarti: {
      time: "सकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
    eveningAarti: {
      time: "सायंकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
  },
  {
    day: 9,
    date_mr: "१९ ऑक्टोबर २०२६ (सोमवार)",
    date_en: "19 October 2026 (Monday)",
    devi_mr: "श्री सिद्धिदात्री माता (महानवमी)",
    devi_en: "Shri Siddhidatri Mata (Mahanavami)",
    specialOccasion_mr: "महानवमी पूर्णाहुती हवन व भव्य महाआरती",
    specialOccasion_en: "Mahanavami Purnahuti & Grand Aarti",
    morningAarti: {
      time: "सकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
    eveningAarti: {
      time: "सायंकाळी ०७:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
  },
  {
    day: 10,
    date_mr: "२०/२१ ऑक्टोबर २०२६ (मंगळवार/बुधवार)",
    date_en: "20/21 October 2026 (Tue/Wed)",
    devi_mr: "विजयादशमी (दसऱ्याचा महाप्रसाद व विसर्जन सोहळा)",
    devi_en: "Vijayadashami (Dussehra & Grand Procession)",
    specialOccasion_mr: "महानवमी भव्य महाप्रसाद अन्नदान भंडारा व सांगता विसर्जन महाआरती",
    specialOccasion_en: "Mega Mahaprasad Bhandara & Visarjan Maha Aarti",
    morningAarti: {
      time: "सकाळी ०८:००",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
    eveningAarti: {
      time: "सायंकाळी ०६:३०",
      yajman_mr: "",
      yajman_en: "",
      role_mr: "",
      role_en: "",
      prasad_mr: "",
      prasad_en: "",
    },
  },
];

// Helper to merge stored override with default schedule
export function getActiveAartiSchedule(): AartiYajmanDay[] {
  if (typeof window === "undefined") return DEFAULT_AARTI_SCHEDULE;
  try {
    const raw = localStorage.getItem(AARTI_MANKARI_STORAGE_KEY);
    if (!raw) return DEFAULT_AARTI_SCHEDULE;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_AARTI_SCHEDULE;

    return DEFAULT_AARTI_SCHEDULE.map((defDay) => {
      const found = parsed.find((p: AartiYajmanDay) => p.day === defDay.day);
      if (!found) return defDay;
      return {
        ...defDay,
        morningAarti: {
          ...defDay.morningAarti,
          ...found.morningAarti,
        },
        eveningAarti: {
          ...defDay.eveningAarti,
          ...found.eveningAarti,
        },
      };
    });
  } catch {
    return DEFAULT_AARTI_SCHEDULE;
  }
}

// Backwards compatibility alias
export const AARTI_YAJMAN_SCHEDULE = DEFAULT_AARTI_SCHEDULE;
