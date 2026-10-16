import { createClient } from "@/lib/supabase/client";

export interface FestivalEvent {
  id: string;
  day_number: number;
  date: string; // YYYY-MM-DD
  day_name_mr: string;
  day_name_en: string;
  start_time: string; // HH:mm
  end_time?: string;
  time_display_mr: string;
  time_display_en: string;
  title_mr: string;
  title_en: string;
  category:
    | "aarti"
    | "cultural"
    | "garba"
    | "bhandara"
    | "kanya_pujan"
    | "religious"
    | "procession";
  category_label_mr: string;
  category_label_en: string;
  location_mr: string;
  location_en: string;
  description_mr: string;
  description_en: string;
  is_highlight?: boolean;
}

export const DEFAULT_EVENTS: FestivalEvent[] = [
  {
    id: "evt-day-1",
    day_number: 1,
    date: "2026-10-11",
    day_name_mr: "रविवार",
    day_name_en: "Sunday",
    start_time: "08:00",
    end_time: "11:30",
    time_display_mr: "सकाळी ०८:०० ते ११:३०",
    time_display_en: "08:00 AM to 11:30 AM",
    title_mr: "घटस्थापना व श्री छिन्नमस्ता माता प्रतिष्ठापना सोहळा",
    title_en: "Ghatasthapana & Shri Chhinnamasta Mata Installation",
    category: "religious",
    category_label_mr: "धार्मिक विधी",
    category_label_en: "Religious Ritual",
    location_mr: "मंडप परिसर, डांगरवाडा असोदा",
    location_en: "Mandal Pandal, Dangarvada Asoda",
    description_mr:
      "वेदोक्त मंत्रघोषात घटस्थापना, कलश पूजन आणि यंदाच्या श्री छिन्नमस्ता मातेच्या मूर्तीची भक्तिभावाने मंगल प्रतिष्ठापना.",
    description_en:
      "Vedic Ghatasthapana, Kalash Puja, and auspicious installation of Shri Chhinnamasta Mata idol amidst conch blows and dhol.",
    is_highlight: true,
  },
  {
    id: "evt-day-2",
    day_number: 2,
    date: "2026-10-12",
    day_name_mr: "सोमवार",
    day_name_en: "Monday",
    start_time: "19:30",
    end_time: "22:00",
    time_display_mr: "संध्याकाळी ०७:३० ते १०:००",
    time_display_en: "07:30 PM to 10:00 PM",
    title_mr: "ब्रह्मचारिणी माता पूजन व स्थानिक भजनी मंडळाची भजन संध्या",
    title_en: "Brahmacharini Puja & Local Bhajan Sandhya",
    category: "cultural",
    category_label_mr: "सांस्कृतिक व भजन",
    category_label_en: "Bhajan & Cultural",
    location_mr: "मंडप परिसर, डांगरवाडा असोदा",
    location_en: "Mandal Pandal, Dangarvada Asoda",
    description_mr:
      "गावच्या ज्येष्ठ व महिला भजनी मंडळाचा सुरेल भक्तिगीते व अभंग गायनाचा कार्यक्रम.",
    description_en:
      "Devotional Abhang and Bhajan performances by local village singing troupes.",
  },
  {
    id: "evt-day-3",
    day_number: 3,
    date: "2026-10-13",
    day_name_mr: "मंगळवार",
    day_name_en: "Tuesday",
    start_time: "20:00",
    end_time: "22:30",
    time_display_mr: "रात्री ०८:०० ते १०:३०",
    time_display_en: "08:00 PM to 10:30 PM",
    title_mr: "चंद्रघंटा माता महाआरती व हरीपाठ कीर्तन",
    title_en: "Chandraghanta Maha Aarti & Kirtan",
    category: "religious",
    category_label_mr: "कीर्तन व महाआरती",
    category_label_en: "Kirtan & Aarti",
    location_mr: "मंडप परिसर, डांगरवाडा असोदा",
    location_en: "Mandal Pandal, Dangarvada Asoda",
    description_mr:
      "वारकरी संप्रदायातील प्रसिद्ध महाराजांचे प्रबोधनात्मक व रसाळ कीर्तन.",
    description_en:
      "Inspiring traditional Warkari discourse and Kirtan by revered Maharaj.",
  },
  {
    id: "evt-day-4",
    day_number: 4,
    date: "2026-10-14",
    day_name_mr: "बुधवार",
    day_name_en: "Wednesday",
    start_time: "18:00",
    end_time: "20:30",
    time_display_mr: "संध्याकाळी ०६:०० ते ०८:३०",
    time_display_en: "06:00 PM to 08:30 PM",
    title_mr: "लहान मुलांची देवी-देवता वेशभूषा स्पर्धा",
    title_en: "Children's Devotional Costume Competition",
    category: "cultural",
    category_label_mr: "बाल स्पर्धा",
    category_label_en: "Children Competition",
    location_mr: "मंडप रंगमंच, डांगरवाडा असोदा",
    location_en: "Pandal Stage, Dangarvada Asoda",
    description_mr:
      "असोदा परिसरातील चिमुकल्या बालकांसाठी पौराणिक पात्रांची सुंदर वेशभूषा स्पर्धा व बक्षीस वितरण.",
    description_en:
      "Costume competition featuring mythological characters for local village children.",
  },
  {
    id: "evt-day-5",
    day_number: 5,
    date: "2026-10-15",
    day_name_mr: "गुरुवार",
    day_name_en: "Thursday",
    start_time: "16:00",
    end_time: "19:00",
    time_display_mr: "दुपारी ०४:०० ते संध्या. ०७:००",
    time_display_en: "04:00 PM to 07:00 PM",
    title_mr: "ललिता पंचमी — भव्य कुंकुमार्चन सोहळा (महिलांसाठी)",
    title_en: "Lalita Panchami — Grand Kumkumarchan Ceremony",
    category: "religious",
    category_label_mr: "कुंकुमार्चन",
    category_label_en: "Kumkumarchan",
    location_mr: "मंडप परिसर, डांगरवाडा असोदा",
    location_en: "Mandal Pandal, Dangarvada Asoda",
    description_mr:
      "पंचक्रोशीतील महिलांसाठी ललिता पंचमीनिमित्त श्री ललिता सहस्रनाम पठण व सामुदायिक कुंकुमार्चन विधी.",
    description_en:
      "Community Lalita Sahasranama chanting and sacred Kumkumarchan ritual for women devotees.",
    is_highlight: true,
  },
  {
    id: "evt-day-6",
    day_number: 6,
    date: "2026-10-16",
    day_name_mr: "शुक्रवार",
    day_name_en: "Friday",
    start_time: "18:30",
    end_time: "21:30",
    time_display_mr: "संध्याकाळी ०६:३० ते रात्री ०९:३०",
    time_display_en: "06:30 PM to 09:30 PM",
    title_mr: "श्री छिन्नमस्ता माता विशेष महापूजन व दीपदान",
    title_en: "Shri Chhinnamasta Mata Special Maha Puja & Deepdaan",
    category: "aarti",
    category_label_mr: "विशेष महापूजा",
    category_label_en: "Special Maha Puja",
    location_mr: "गर्भगृह व मंडप, डांगरवाडा असोदा",
    location_en: "Sanctum & Pandal, Dangarvada Asoda",
    description_mr:
      "षष्ठीच्या दिवशी छिन्नमस्ता मातेचा विशेष पंचामृत अभिषेक, १०८ दिव्यांचे दीपदान आणि महाआरती.",
    description_en:
      "Panchamrit Abhishek of Chhinnamasta Mata, 108 oil lamps lighting ceremony, and resonant Maha Aarti.",
    is_highlight: true,
  },
  {
    id: "evt-day-7",
    day_number: 7,
    date: "2026-10-17",
    day_name_mr: "शनिवार",
    day_name_en: "Saturday",
    start_time: "20:00",
    end_time: "23:45",
    time_display_mr: "रात्री ०८:०० ते ११:४५",
    time_display_en: "08:00 PM to 11:45 PM",
    title_mr: "पारंपरिक दांडिया व गरबा रास संध्या",
    title_en: "Traditional Dandiya & Garba Raas Night",
    category: "garba",
    category_label_mr: "गरबा-दांडिया",
    category_label_en: "Garba & Dandiya",
    location_mr: "मंडप चौक, डांगरवाडा असोदा",
    location_en: "Mandal Ground, Dangarvada Asoda",
    description_mr:
      "सभ्य, सुसंस्कृत व पारंपरिक वेषात संपूर्ण गावासाठी भक्तिमय गरबा-दांडिया महोत्सव.",
    description_en:
      "Community traditional folk dance, Dandiya, and Garba Raas celebration in ethnic attire.",
    is_highlight: true,
  },
  {
    id: "evt-day-8",
    day_number: 8,
    date: "2026-10-18",
    day_name_mr: "रविवार",
    day_name_en: "Sunday",
    start_time: "09:00",
    end_time: "13:30",
    time_display_mr: "सकाळी ०९:०० ते दुपारी ०१:३०",
    time_display_en: "09:00 AM to 01:30 PM",
    title_mr: "दुर्गाष्टमी महायज्ञ, नवचंडी हवन व कन्या पूजन सोहळा",
    title_en: "Durgashtami Mahayajna, Havan & Kanya Pujan",
    category: "kanya_pujan",
    category_label_mr: "हवन व कन्या पूजन",
    category_label_en: "Havan & Kanya Pujan",
    location_mr: "यज्ञमंडप, डांगरवाडा असोदा",
    location_en: "Yajna Mandap, Dangarvada Asoda",
    description_mr:
      "पवित्र नवचंडी होम हवन, पूर्णाहूती आणि ५१ सुवासिनी व कुमारिकांचे पाद्यपूजन, भोजन व भेटवस्तू वाटप.",
    description_en:
      "Sacred Navachandi Havan, Purnahuti, and ceremonial worship and feast for 51 young girls.",
    is_highlight: true,
  },
  {
    id: "evt-day-9",
    day_number: 9,
    date: "2026-10-19",
    day_name_mr: "सोमवार",
    day_name_en: "Monday",
    start_time: "08:00",
    end_time: "12:30",
    time_display_mr: "सकाळी ०८:०० ते दुपारी १२:३०",
    time_display_en: "08:00 AM to 12:30 PM",
    title_mr: "महानवमी — श्री सिद्धिदात्री माता विशेष पूजन व महाआरती",
    title_en: "Mahanavami — Shri Siddhidatri Mata Puja & Maha Aarti",
    category: "religious",
    category_label_mr: "महानवमी पूजन",
    category_label_en: "Mahanavami Puja",
    location_mr: "मंडप परिसर, डांगरवाडा असोदा",
    location_en: "Mandal Pandal, Dangarvada Asoda",
    description_mr:
      "नवरात्रीच्या नवव्या दिवशी श्री सिद्धिदात्री मातेचे विधीवत पूजन, विशेष शृंगार दर्शन, कुमारिका वंदन आणि मंगल महाआरती.",
    description_en:
      "Ritual worship of Goddess Siddhidatri on Mahanavami, special floral decoration darshan, and auspicious Maha Aarti.",
    is_highlight: true,
  },
  {
    id: "evt-day-10-bhandara",
    day_number: 10,
    date: "2026-10-21",
    day_name_mr: "बुधवार",
    day_name_en: "Wednesday",
    start_time: "11:30",
    end_time: "17:00",
    time_display_mr: "दुपारी ११:३० ते संध्या. ०५:००",
    time_display_en: "11:30 AM to 05:00 PM",
    title_mr: "महानवमी भव्य महाप्रसाद भंडारा (सर्व भाविकांसाठी अन्नदान)",
    title_en: "Mahanavami Grand Bhandara & Community Annadan",
    category: "bhandara",
    category_label_mr: "महाप्रसाद",
    category_label_en: "Mahaprasad Bhandara",
    location_mr: "महाप्रसाद मंडप, डांगरवाडा असोदा",
    location_en: "Mahaprasad Mandap, Dangarvada Asoda",
    description_mr:
      "गावातील व परिसरातील सर्व भाविकांसाठी शुद्ध तुपाचा शिरा, पुरी-भाजी व महाप्रसादाचे भव्य अन्नदान.",
    description_en:
      "Grand community feast (Annadan) of pure ghee sheera, puri-bhaji, and prasad for all devotees.",
    is_highlight: true,
  },
  {
    id: "evt-day-10",
    day_number: 10,
    date: "2026-10-21",
    day_name_mr: "बुधवार",
    day_name_en: "Wednesday",
    start_time: "16:00",
    end_time: "22:00",
    time_display_mr: "दुपारी ०४:०० ते रात्री १०:००",
    time_display_en: "04:00 PM to 10:00 PM",
    title_mr: "भव्य विसर्जन मिरवणूक सोहळा",
    title_en: "Grand Visarjan Procession Ceremony",
    category: "procession",
    category_label_mr: "विसर्जन मिरवणूक",
    category_label_en: "Visarjan Procession",
    location_mr: "डांगरवाडा असोदा मुख्य मार्ग",
    location_en: "Main Village Route, Dangarvada Asoda",
    description_mr:
      "पारंपरिक ढोल-ताशांच्या गजरात, गुलाल व फुलांची उधळण करत श्री छिन्नमस्ता मातेची भव्य निरोप व विसर्जन मिरवणूक.",
    description_en:
      "Resonant traditional dhol-tasha beats, flower showers, and grand farewell immersion procession.",
    is_highlight: true,
  },
];

export async function getFestivalEvents(): Promise<FestivalEvent[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
  ) {
    return DEFAULT_EVENTS;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_EVENTS;
    }

    return data as FestivalEvent[];
  } catch {
    return DEFAULT_EVENTS;
  }
}
