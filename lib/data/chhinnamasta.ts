export interface ChhinnamastaSection {
  id: string;
  title_mr: string;
  title_en: string;
  subtitle_mr: string;
  subtitle_en: string;
  icon: string;
  image?: string;
  imageAlt_mr?: string;
  imageAlt_en?: string;
  imageCaption_mr?: string;
  imageCaption_en?: string;
  content_mr: string[];
  content_en: string[];
  keyPoints_mr: { label: string; value: string }[];
  keyPoints_en: { label: string; value: string }[];
}

export const CHINNAMASTA_SECTIONS: ChhinnamastaSection[] = [
  {
    id: "swaroop",
    title_mr: "१. दिव्य स्वरूप (स्वरूप व दर्शन)",
    title_en: "1. Divine Swaroop (Form & Iconography)",
    subtitle_mr: "अहंकाराचे छेदन आणि विशुद्ध चैतन्याचे रूप",
    subtitle_en: "Transcendence of Ego and Supreme Consciousness",
    icon: "Sparkles",
    image: "/images/Chinnamasta_Mata_Katha.jpg",
    imageAlt_mr: "श्री छिन्नमस्ता माता — दिव्य स्वरूप",
    imageAlt_en: "Shri Chhinnamasta Mata — Divine Form",
    imageCaption_mr: "॥ श्री छिन्नमस्ता माता — दिव्य स्वरूप व सख्या ॥",
    imageCaption_en: "॥ Shri Chhinnamasta Mata — Divine Form & Companions ॥",
    content_mr: [
      "श्री छिन्नमस्ता माता ही दहा महाविद्यांमधील सहावी अत्यंत विलक्षण व जागृत महाविद्या मानली जाते. देवीचे रूप पाहताक्षणी आश्चर्य आणि भक्तीचा संचार होतो.",
      "देवीच्या डाव्या हातात स्वतःचेच कापलेले शीश असून, उजव्या हातात तीक्ष्ण खड्ग (कात्री किंवा तलवार) आहे. देवीच्या गळ्यातून रक्ताच्या तीन धारा वाहतात — डावी आणि उजवी धारा तिच्या दोन सख्या 'डाकिनी' आणि 'वर्णिनी' प्राशन करतात, तर मधली धारा देवीचे स्वतःचे शीश प्राशन करते.",
      "देवी कामदेव आणि रती यांच्यावर पद्मासनात किंवा नृत्यावस्थेत उभी असते. हे दृश्य काम, वासना आणि भौतिक आकर्षणांवर संपूर्ण आत्मनियंत्रणाचे प्रतीक आहे.",
    ],
    content_en: [
      "Shri Chhinnamasta Mata is the sixth among the Ten Mahavidyas, revered for Her awe-inspiring and intensely awake manifestation.",
      "In Her left hand, She holds Her own severed head, and in Her right hand, a sharp scimitar. From Her neck emanate three streams of divine nectar — the left and right streams nourish Her companions Dakini and Varnini, while the central stream nourishes Her own severed head.",
      "She stands atop Kamadeva and Rati on a blooming lotus, symbolizing complete mastery over sensual desire, worldly attachment, and mortality.",
    ],
    keyPoints_mr: [
      { label: "शीश", value: "डाव्या हातात स्वतःचेच शीश धारण केलेले" },
      { label: "शस्त्र", value: "उजव्या हातात खड्ग (काटार/तलवार)" },
      { label: "सख्या", value: "डाकिनी आणि वर्णिनी (भूकेल्या सख्यांचे पोषण)" },
      { label: "आसन", value: "कामदेव आणि रती यांच्या पाठीवर कमळात विराजमान" },
    ],
    keyPoints_en: [
      { label: "Head", value: "Held reverently in Her left hand" },
      { label: "Weapon", value: "Sharp scimitar in Her right hand" },
      { label: "Companions", value: "Dakini and Varnini nourished by divine streams" },
      { label: "Posture", value: "Seated/standing atop Kamadeva and Rati" },
    ],
  },
  {
    id: "katha",
    title_mr: "२. पौराणिक कथा (अवतरणाची कथा)",
    title_en: "2. Pauranik Katha (Origin Story)",
    subtitle_mr: "मातेचे असीम वात्सल्य आणि त्याग",
    subtitle_en: "The Supreme Mother's Selfless Compassion",
    icon: "BookOpen",
    image: "/images/chhinnamasta-mata-katha.webp",
    imageAlt_mr: "श्री छिन्नमस्ता माता — अवतरणाची पौराणिक कथा",
    imageAlt_en: "Shri Chhinnamasta Mata — Pauranik Origin Story",
    imageCaption_mr: "॥ श्री छिन्नमस्ता माता — अवतरणाची पौराणिक कथा व रजरप्पा मंदिर ॥",
    imageCaption_en: "॥ Shri Chhinnamasta Mata — Pauranik Origin Story & Rajrappa Temple ॥",
    content_mr: [
      "पुराणातील कथेनुसार, एकदा माता पार्वती मंदाकिनी नदीत स्नान करण्यासाठी गेल्या होत्या. त्यांच्यासोबत 'जया' आणि 'विजया' (डाकिनी व वर्णिनी) या दोन दासी होत्या.",
      "स्नान करताना त्या दोघींना तीव्र भूक लागली. त्यांनी मातेकडे भोजनाची याचना केली. मातेने थोडे थांबण्यास सांगितले, परंतु भूकेची तीव्रता इतकी असह्य झाली की त्यांनी पुन्हा व्याकुळ होऊन करुणा भाकली.",
      "आपल्या बालकांचे दुःख न सहन झाल्यामुळे दयाळू जगन्मातेने क्षणाचाही विलंब न करता स्वतःच्याच खड्गाने आपले शीश छेदले. तिच्या कंठातून निघालेल्या अमृतमय रुधिराने तिने आपल्या दोन्ही भुकेल्या सख्यांची भूक शांत केली.",
      "या अभूतपूर्व त्यागामुळे देवीला 'छिन्नमस्ता' (शीश नसलेली / स्वशीश अर्पण करणारी) हे नाव प्राप्त झाले.",
    ],
    content_en: [
      "According to the Puranas, Mother Parvati went to bathe in the sacred Mandakini river accompanied by Her companions Jaya and Vijaya (Dakini and Varnini).",
      "During their bath, the two companions were gripped by agonizing hunger and pleaded with the Mother for nourishment. The Mother asked them to wait, but their thirst and hunger grew unbearable.",
      "Unable to see Her children suffer, the compassionate Mother instantly severed Her own head with Her scimitar. The three fountains of divine essence that surged forth completely satiated Her attendants and Herself.",
      "Through this supreme act of selfless motherhood, She came to be known across the universe as Chhinnamasta.",
    ],
    keyPoints_mr: [
      { label: "पवित्र स्थळ", value: "मंदाकिनी नदी तीर" },
      { label: "सख्यांची नावे", value: "जया आणि विजया (डाकिनी व वर्णिनी)" },
      { label: "संदेश", value: "बालकांच्या रक्षणासाठी मातेचा सर्वोच्च आत्मत्याग" },
    ],
    keyPoints_en: [
      { label: "Sacred Location", value: "Banks of Mandakini River" },
      { label: "Companions", value: "Jaya and Vijaya (Dakini and Varnini)" },
      { label: "Eternal Message", value: "Infinite maternal sacrifice for the welfare of devotees" },
    ],
  },
  {
    id: "significance",
    title_mr: "३. आध्यात्मिक महत्त्व (कुंडलिनी व मोक्ष)",
    title_en: "3. Spiritual Significance (Kundalini & Moksha)",
    subtitle_mr: "अहंकाराचे विसर्जन आणि सहस्त्रार चक्राचा भेद",
    subtitle_en: "Dissolution of Ego and Sahasrara Illumination",
    icon: "Flame",
    image: "/images/Chinnamasta-Dhayan.webp",
    imageAlt_mr: "श्री छिन्नमस्ता माता — ध्यान व कुंडलिनी रहस्य",
    imageAlt_en: "Shri Chhinnamasta Mata — Meditation and Kundalini Mystery",
    imageCaption_mr: "॥ श्री छिन्नमस्ता माता ध्यान व कुंडलिनी योग ॥",
    imageCaption_en: "॥ Shri Chhinnamasta Mata Meditation & Kundalini Yoga ॥",
    content_mr: [
      "गूढ योगशास्त्रानुसार, छिन्नमस्ता मातेचे रूप हे मानवाच्या कुंडलिनी शक्तीच्या जागृतीचे आणि सहस्त्रार चक्राच्या उकलण्याचे दर्शन घडवते.",
      "शीश हे मानवी 'अहंकार' आणि 'बुद्धीच्या मर्यादेचे' प्रतीक आहे. जेव्हा भक्त आपल्या अहंकाराचे शीश देवीच्या चरणी अर्पण करतो, तेव्हाच त्याला अमृततुल्य ब्रह्मानंद आणि मोक्ष प्राप्त होतो.",
      "देवीच्या कंठातून निघणाऱ्या तीन धारा म्हणजे 'इडा', 'पिंगळा' आणि मध्यवर्ती 'सुषुम्ना' नाडीचे द्योतक आहेत. सुषुम्नेतून वाहणारी ऊर्जा थेट मस्तकाचा भेद करून ईश्वरी चेतनेशी एकरूप होते.",
    ],
    content_en: [
      "In esoteric yogic philosophy, Chhinnamasta represents the piercing of the knot of ego and the awakening of the Kundalini energy reaching the Sahasrara (crown) chakra.",
      "The head symbolizes the limited human ego (Ahamkara). By severing identification with the physical mind, the seeker achieves non-dual liberation (Moksha).",
      "The three streams of divine nectar correspond to the three primary subtle energy channels: Ida, Pingala, and the central Sushumna nadi.",
    ],
    keyPoints_mr: [
      { label: "चक्र", value: "सहस्त्रार व आज्ञा चक्राची जागृती" },
      { label: "नाडी प्रतीक", value: "इडा, पिंगळा आणि सुषुम्ना नाडी" },
      { label: "आध्यात्मिक फळ", value: "अहंकारमुक्ती, अभयता आणि आत्मसाक्षात्कार" },
    ],
    keyPoints_en: [
      { label: "Primary Chakra", value: "Awakening of Sahasrara and Ajna Chakras" },
      { label: "Nadi Currents", value: "Ida, Pingala, and central Sushumna" },
      { label: "Spiritual Fruit", value: "Freedom from mortal fear and supreme enlightenment" },
    ],
  },
  {
    id: "sadhana",
    title_mr: "४. जयंती व साधना (उपासना व पूजा विधी)",
    title_en: "4. Jayanti & Sadhana (Worship & Auspicious Days)",
    subtitle_mr: "वैशाख शुद्ध चतुर्दशी आणि नवरात्रीतील विशेष आराधना",
    subtitle_en: "Vaishakha Shukla Chaturdashi & Navratri Veneration",
    icon: "Calendar",
    image: "/images/significance_of_chhinnamasta_jayanti_puja_aarti.jpg",
    imageAlt_mr: "श्री छिन्नमस्ता माता — जयंती पूजा, हवन व साधना",
    imageAlt_en: "Shri Chhinnamasta Mata — Jayanti Puja, Havan and Sadhana",
    imageCaption_mr: "॥ श्री छिन्नमस्ता जयंती, पूजा विधी व महाआरती ॥",
    imageCaption_en: "॥ Shri Chhinnamasta Jayanti, Puja Rituals & Maha Aarti ॥",
    content_mr: [
      "श्री छिन्नमस्ता जयंती ही दरवर्षी 'वैशाख शुद्ध चतुर्दशी' (नृसिंह जयंतीच्या दिवशी) अत्यंत भक्तिभावाने साजरी केली जाते.",
      "नवरात्रोत्सवातही महाविद्यांची उपासना करणाऱ्या भक्तांसाठी छिन्नमस्ता मातेचे दर्शन व जप अत्यंत फलदायी मानले जाते. विशेषतः षष्ठी किंवा अष्टमीच्या दिवशी देवीचा महाभिषेक आणि कुंकुमार्चन केले जाते.",
      "गृहस्थ भक्तांनी देवीच्या सात्विक रूपाचे ध्यान करावे. देवीला जास्वंदाचे लाल फूल, रक्तचंदन, डाळिंब आणि खिरीचा नैवेद्य अर्पण केल्याने घरातून संकटे दूर होतात व रोगमुक्ती लाभते.",
    ],
    content_en: [
      "Shri Chhinnamasta Jayanti is celebrated annually on Vaishakha Shukla Chaturdashi (coinciding with Narasimha Jayanti).",
      "During Navratri, venerating Chhinnamasta dissolves insurmountable obstacles, protects from negative influences, and accelerates spiritual progress.",
      "Householder devotees are encouraged to worship Her in Her protective, compassionate maternal form using red hibiscus flowers, red sandalwood, pomegranates, and sweet kheer.",
    ],
    keyPoints_mr: [
      { label: "मुख्य जयंती", value: "वैशाख शुद्ध चतुर्दशी" },
      { label: "प्रिय पुष्प", value: "लाल जास्वंद व कमळ" },
      { label: "नैवेद्य", value: "दुधाची खीर, डाळिंब व पंचामृत" },
      { label: "शुभ फल", value: "शत्रूभय नाश, कोर्टकचेरीतील यश आणि आरोग्य" },
    ],
    keyPoints_en: [
      { label: "Jayanti Tithi", value: "Vaishakha Shukla Chaturdashi" },
      { label: "Favored Flowers", value: "Red Hibiscus and Lotus" },
      { label: "Prasad / Offering", value: "Milk Kheer, Pomegranate, and Panchamrit" },
      { label: "Blessings", value: "Dissolution of debts, fearlessness, and vitality" },
    ],
  },
  {
    id: "temple",
    title_mr: "५. प्रमुख तीर्थक्षेत्र (रजरप्पा, झारखंड)",
    title_en: "5. Main Pilgrimage (Rajrappa, Jharkhand)",
    subtitle_mr: "दामोदर व भैरवी नद्यांच्या संगमावरील जागृत शक्तिपीठ",
    subtitle_en: "The Awakening Peeth at Confluence of Damodar & Bhairavi",
    icon: "MapPin",
    image: "/images/istockphoto-1456598146-612x612.jpg",
    imageAlt_mr: "रजरप्पा छिन्नमस्ता शक्तिपीठ मंदिर — झारखंड",
    imageAlt_en: "Rajrappa Chhinnamasta Shaktipeeth Temple — Jharkhand",
    imageCaption_mr: "॥ प्रसिद्ध रजरप्पा शक्तिपीठ तीर्थक्षेत्र, झारखंड ॥",
    imageCaption_en: "॥ Famous Rajrappa Shaktipeeth Pilgrimage, Jharkhand ॥",
    content_mr: [
      "छिन्नमस्ता मातेचे जगप्रसिद्ध आणि अत्यंत जागृत मुख्य शक्तिपीठ झारखंड राज्यातील रामगढ जिल्ह्यातील 'रजरप्पा' येथे स्थित आहे.",
      "हे तीर्थक्षेत्र 'दामोदर' आणि 'भैरवी' (भेडा) या दोन पवित्र नद्यांच्या नयनरम्य संगमावर एका उंच खडकावर वसलेले आहे. निसर्गाचे अथांग सौंदर्य आणि देवीची प्रचंड दैवी ऊर्जा येथे एकाच वेळी अनुभवायला मिळते.",
      "मंदिराच्या गर्भगृहात देवीची स्वयंभू शिळा असून त्यात देवीचे मस्तक नसलेले रूप आणि तिच्या सख्या कोरलेल्या आहेत. दरवर्षी देशभरातून लाखो भाविक, साधू आणि तांत्रिक येथे दर्शनासाठी येतात.",
    ],
    content_en: [
      "The world-renowned and foremost pilgrimage of Shri Chhinnamasta Mata is located at Rajrappa in Ramgarh district of Jharkhand, India.",
      "The sacred shrine is dramatically perched atop a rocky hillock at the roaring confluence of two holy rivers: the Damodar and the Bhairavi (Bhera).",
      "Inside the sanctum sanctorum, the self-manifested (Swayambhu) rock idol depicts the decapitated Mother flanked by Her divine attendants Dakini and Varnini.",
    ],
    keyPoints_mr: [
      { label: "स्थान", value: "रजरप्पा, जिल्हा रामगढ, झारखंड" },
      { label: "नदी संगम", value: "दामोदर आणि भैरवी नद्यांचा पवित्र संगम" },
      { label: "महत्त्व", value: "भारतातील प्रमुख ५१ शक्तिपीठांपैकी एक जागृत तंत्रपीठ" },
    ],
    keyPoints_en: [
      { label: "Location", value: "Rajrappa, Ramgarh District, Jharkhand" },
      { label: "River Confluence", value: "Sacred confluence of Damodar and Bhairavi" },
      { label: "Spiritual Status", value: "Renowned as one of India's most vibrant Maha Shaktipeethas" },
    ],
  },
];
