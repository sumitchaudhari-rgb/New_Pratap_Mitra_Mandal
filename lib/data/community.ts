export interface HistoryMilestone {
  year: number;
  yearDisplay_mr: string;
  yearDisplay_en: string;
  title_mr: string;
  title_en: string;
  description_mr: string;
  description_en: string;
  image?: string;
  highlight?: boolean;
}

export interface CommitteeMember {
  id: string;
  name_mr: string;
  name_en: string;
  role_mr: string;
  role_en: string;
  category: "executive" | "advisor" | "karyakarta" | "technical";
  phone?: string;
  photo?: string;
  yearsOfSeva_mr?: string;
}

export const MANDAL_HISTORY: HistoryMilestone[] = [
  {
    year: 1980,
    yearDisplay_mr: "१९८० (स्थापना वर्ष)",
    yearDisplay_en: "1980 (Founding Year)",
    title_mr: "मंडळाची मंगल स्थापना व पहिली घटस्थापना",
    title_en: "Founding of Mandal & First Ghatasthapana",
    description_mr:
      "डांगरवाडा असोदा येथील उत्साही तरुणांनी एकत्र येऊन धार्मिक, सांस्कृतिक व सामाजिक ऐक्यासाठी 'न्यु प्रताप मित्र मंडळा'ची स्थापना केली. पारंपरिक पद्धतीने पहिल्या नवरात्रोत्सवाची मंगल घटस्थापना संपन्न झाली.",
    description_en:
      "Passionate youth of Dangarvada Asoda came together to establish 'New Pratap Mitra Mandal' fostering religious devotion, cultural heritage, and village unity.",
    highlight: true,
  },
  {
    year: 1995,
    yearDisplay_mr: "१९९५ (१५ वे वर्ष)",
    yearDisplay_en: "1995 (15th Year)",
    title_mr: "सामाजिक बांधिलकी व भव्य देखाव्यांची सुरुवात",
    title_en: "Social Commitment & Pandal Themes",
    description_mr:
      "उत्सवासोबतच रक्तदान शिबिरे, गरजू विद्यार्थ्यांना शैक्षणिक मदत आणि गावात आरोग्य शिबिरांचे आयोजन सुरू झाले. मंडळाच्या समाजोपयोगी कार्याची पंचक्रोशीत ओळख निर्माण झाली.",
    description_en:
      "Commenced blood donation drives, educational aid for needy students, and village medical camps alongside grand Navratri celebrations.",
  },
  {
    year: 2005,
    yearDisplay_mr: "२००५ (रौप्य महोत्सव)",
    yearDisplay_en: "2005 (Silver Jubilee)",
    title_mr: "२५ वर्षे पूर्ण — रौप्य महोत्सवी सोहळा",
    title_en: "Silver Jubilee Celebration (25 Years)",
    description_mr:
      "मंडळाने २५ व्या वर्षात पदार्पण करत रौप्य महोत्सव मोठ्या दिमाखात साजरा केला. जुन्या ज्येष्ठ कार्यकर्त्यांचा सन्मान व गावातील गुणवंतांचा गौरव करण्यात आला.",
    description_en:
      "Celebrated 25 years of unbroken devotion with felicitations of veteran founders and community scholars.",
    highlight: true,
  },
  {
    year: 2025,
    yearDisplay_mr: "२०२५ (मागील वर्ष)",
    yearDisplay_en: "2025 (Previous Year)",
    title_mr: "डांगरवाड्याची आई — 'वेडी माता' भव्य देखावा",
    title_en: "Mother of Dangarvada — 'Vedi Mata' Grand Theme",
    description_mr:
      "२०२५ मध्ये डांगरवाड्याची आई 'वेडी माता' यांच्या अलौकिक मातृस्वरूपाची स्थापना करण्यात आली. पंचक्रोशीतील हजारो भाविकांनी दर्शनाचा लाभ घेतला.",
    description_en:
      "Revered installation of 'Vedi Mata' (Mother of Dangarvada) drawing thousands of pilgrims from across the region.",
    image: "/images/gallery/vedi-mata-2025.jpeg",
  },
  {
    year: 2026,
    yearDisplay_mr: "२०२६ (चालू सुवर्णपर्व)",
    yearDisplay_en: "2026 (Present Year)",
    title_mr: "६ वी महाविद्या श्री छिन्नमस्ता माता सुवर्ण प्रतिष्ठापना",
    title_en: "6th Mahavidya Shri Chhinnamasta Mata Installation",
    description_mr:
      "यंदा मंडळाने दशमहाविद्यांपैकी अत्यंत प्रभावी ६ व्या महाविद्या 'श्री छिन्नमस्ता माता' यांची १० फूट भव्य व मनमोहक मूर्ती प्रतिष्ठापित केली आहे. मूर्तिकार दिपक कानोजे (भुसावळ) यांनी ही दिव्य मूर्ती घडवली आहे.",
    description_en:
      "Auspicous installation of 10-feet magnificent idol of 6th Mahavidya Shri Chhinnamasta Mata, sculpted by Dipak Kanoje of Bhusawal.",
    image: "/images/gallery/HomePageImage.jpeg",
    highlight: true,
  },
];

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: "cm-1",
    name_mr: "श्री. मिलिंद चौधरी",
    name_en: "Shree. Milind Chaudhari",
    role_mr: "अध्यक्ष (President)",
    role_en: "President",
    category: "executive",
    phone: "02572234567",
    yearsOfSeva_mr: "मंडळ नेतृत्व",
  },
  {
    id: "cm-2",
    name_mr: "श्री. संकेत चौधरी",
    name_en: "Shree. Sanket Chaudhari",
    role_mr: "उपाध्यक्ष (Vice President)",
    role_en: "Vice President",
    category: "executive",
    phone: "02572234567",
    yearsOfSeva_mr: "उत्सव व्यवस्थापन",
  },
  {
    id: "cm-3",
    name_mr: "श्री. वेदांत चौधरी",
    name_en: "Shree. Vedant Chaudhari",
    role_mr: "सचिव (Secretary)",
    role_en: "Secretary",
    category: "executive",
    phone: "02572234567",
    yearsOfSeva_mr: "प्रशासन व नियोजन",
  },
  {
    id: "cm-4",
    name_mr: "श्री. सोहम चौधरी",
    name_en: "Shree. Soham Chaudhari",
    role_mr: "खजिनदार (Treasurer)",
    role_en: "Treasurer",
    category: "executive",
    phone: "02572234567",
    yearsOfSeva_mr: "हिशोब व वित्त",
  },
  {
    id: "cm-5",
    name_mr: "श्री. सुमित चौधरी",
    name_en: "Shree. Sumit Chaudhari",
    role_mr: "तांत्रिक सहाय्य (Technical Support)",
    role_en: "Technical Support",
    category: "technical",
    phone: "02572234567",
    yearsOfSeva_mr: "वेबसाइट व डिजिटल तंत्रज्ञान",
  },
];


export const DONATION_INFO = {
  mandalName_mr: "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा",
  mandalName_en: "New Pratap Mitra Mandal, Dangarvada Asoda",
  upiId: "newpratapmandal@upi",
  phonePeGpayNumber: "0257-2234567",
  accountName: "New Pratap Mitra Mandal",
  bankName: "State Bank of India (Asoda Branch)",
  accountNumber: "XXXXXXXX4567",
  ifscCode: "SBIN000XXXX",
  receiptContact: "०२५७-२२३४५६७",
  note_mr:
    "देणगी दिल्यानंतर कृपया स्क्रीनशॉट व आपले नाव मंडळाच्या अधिकृत संपर्क क्रमांकावर पाठवावे. मंडळाकडून अधिकृत देणगी पावती तात्काळ दिली जाईल.",
  note_en:
    "After contributing, kindly share transaction screenshot with name for official receipt.",
};
