export interface Mahavidya {
  number: number;
  name_mr: string;
  name_en: string;
  title_mr: string;
  title_en: string;
  mantra: string;
  significance_mr: string;
  significance_en: string;
  attributes_mr: string;
  attributes_en: string;
  isMandaldol?: boolean; // Sixth form — Shri Chhinnamasta Mata
}

export const MAHAVIDYAS: Mahavidya[] = [
  {
    number: 1,
    name_mr: "काली",
    name_en: "Kali",
    title_mr: "काल आणि संहाराची आदिशक्ती",
    title_en: "The Ultimate Primordial Power of Time",
    mantra: "ॐ क्रीं कालिकायै नमः ॥",
    significance_mr:
      "प्रथम महाविद्या. काळावर विजय मिळवून देणारी आणि सर्व अंधकार, भय व अहंकाराचा समूळ नाश करणारी आदिशक्ती.",
    significance_en:
      "First Mahavidya. The ultimate conqueror of time, ignorance, and ego.",
    attributes_mr: "कृष्णवर्ण, मुंडमाला, खड्ग, अभय व वरद मुद्रा",
    attributes_en: "Dark complexioned, garland of heads, scimitar, and protective mudra",
  },
  {
    number: 2,
    name_mr: "तारा",
    name_en: "Tara",
    title_mr: "भवसागरातून तारून नेणारी तारिणी",
    title_en: "The Compassionate Savior Across Samsara",
    mantra: "ॐ ह्रीं स्त्रीं हुं फट् ॥",
    significance_mr:
      "दुसरी महाविद्या. अत्यंत दयाळू स्वरूपाची असून भक्तांना सर्व संकटांमधून व जन्म-मृत्यूच्या फेऱ्यातून तारून नेते.",
    significance_en:
      "Second Mahavidya. The compassionate celestial guide who ferries souls across ocean of suffering.",
    attributes_mr: "नीलवर्ण, कमळ, खड्ग, कर्दळी, कैलासवासिनी",
    attributes_en: "Blue hued, lotus, sword, scissors, seated on corpse/Shiva",
  },
  {
    number: 3,
    name_mr: "त्रिपुरसुंदरी (षोडशी)",
    name_en: "Tripura Sundari (Shodashi)",
    title_mr: "तीन्ही लोकांचे असीम सौंदर्य व श्रीविद्या",
    title_en: "The Supreme Beauty of the Three Worlds",
    mantra: "ॐ ऐं क्लीं सौः त्रिपुरसुन्दर्यै नमः ॥",
    significance_mr:
      "तिसरी महाविद्या. श्रीविद्या चक्राची मूळ अधिष्ठात्री. षोडश कलांनी युक्त, सौंदर्य, चैतन्य आणि आनंदाची पराकाष्ठा.",
    significance_en:
      "Third Mahavidya. The presiding deity of Sri Chakra representing highest divine consciousness and bliss.",
    attributes_mr: "इक्षुकोदंड (उसाचे धनुष्य), पाच पुष्पबाण, पाश, अंकुश",
    attributes_en: "Sugarcane bow, five flower arrows, noose, and goad",
  },
  {
    number: 4,
    name_mr: "भुवनेश्वरी",
    name_en: "Bhuvaneshwari",
    title_mr: "चौदा भुवनांची साम्राज्ञी",
    title_en: "Sovereign Queen of the Cosmic Realms",
    mantra: "ॐ ह्रीं भुवनेश्वर्यै नमः ॥",
    significance_mr:
      "चौथी महाविद्या. संपूर्ण विश्वाचे पोषण करणारी जगन्माता. प्रकृती आणि विश्वाच्या विस्ताराचे मूळ रूप.",
    significance_en:
      "Fourth Mahavidya. Ruler and sustainer of the physical cosmos, embodying infinite space and nourishment.",
    attributes_mr: "अंकुश, पाश, अभय आणि वरद मुद्रा, सूर्यमंडल मुकुट",
    attributes_en: "Goad, noose, abhaya and varada gestures, golden radiant crown",
  },
  {
    number: 5,
    name_mr: "त्रिपुरभैरवी",
    name_en: "Bhairavi",
    title_mr: "ज्वालामुखी समान तेजस्वी व तपस्या रूप",
    title_en: "The Fiery Radiance of Divine Penance",
    mantra: "ॐ ह्सैं ह्सकरीं ह्सैं ॥",
    significance_mr:
      "पाचवी महाविद्या. अग्नीसारखी तेजस्वी, कुंडलिनी शक्ती जागृत करणारी व वासनांचा भस्म करणारी शक्ती.",
    significance_en:
      "Fifth Mahavidya. Embodiment of purifying sacrificial fire, self-discipline, and Kundalini awakening.",
    attributes_mr: "जपमाळ, पुस्तक, अभय आणि वरद मुद्रा, रक्तवस्त्र",
    attributes_en: "Japamala, sacred scriptures, abhaya-varada mudras, crimson attire",
  },
  {
    number: 6,
    name_mr: "छिन्नमस्ता",
    name_en: "Chhinnamasta",
    title_mr: "यंदाच्या न्यु प्रताप मित्र मंडळाची आराध्य देवता (प्रचंड चंडिका)",
    title_en: "This Year's Mandal Deity (Prachanda Chandika)",
    mantra: "ॐ श्रीं ह्रीं क्लीं ऐं वज्र वैरोचनीये हुं हुं फट् स्वाहा ॥",
    significance_mr:
      "सहावी महाविद्या — यंदा डांगरवाडा असोदा येथे प्रतिष्ठापित! स्व-त्याग, अहंकारमुक्ती आणि अमर्याद चैतन्याचे सर्वोच्च प्रतीक. देवीने स्वतःचे शीश छेदून आपल्या डाकिनी आणि वर्णिनी या सख्यांना तृप्त केले. हे रूप कुंडलिनीच्या सहस्त्रार चक्राचा भेद करून सर्वोच्च मोक्ष मिळवून देणारे आहे.",
    significance_en:
      "Sixth Mahavidya — Installed by Nyu Pratap Mitra Mandal this Navratri 2026! The supreme symbol of absolute self-transcendence, sacrifice, and boundless Kundalini illumination.",
    attributes_mr: "स्वशीश हातात धारण केलेले, रुधिर धारा, डाकिनी-वर्णिनी सख्या, कामदेव-रती वरील आसन",
    attributes_en: "Holding severed head, three streams of divine nectar, flanked by Dakini and Varnini, standing on Kamadeva & Rati",
    isMandaldol: true,
  },
  {
    number: 7,
    name_mr: "धूमावती",
    name_en: "Dhumavati",
    title_mr: "ज्येष्ठा देवी, संकटातून मार्ग काढणारी",
    title_en: "The Solitary Sage and Destroyer of Misfortune",
    mantra: "ॐ धूं धूमावत्यै फट् ॥",
    significance_mr:
      "सातवी महाविद्या. विधवा रूपात ध्यानस्थ. सर्व सांसारिक दुःखांच्या पलीकडे जाऊन अंतिम वैराग्य आणि शांतता देणारी शक्ती.",
    significance_en:
      "Seventh Mahavidya. The primordial crone transcending worldly illusions, granting deep detachment and inner peace.",
    attributes_mr: "काकध्वज रथ, सूप, मलीन वस्त्र, करुणापूर्ण दृष्टी",
    attributes_en: "Crow-bannered chariot, winnowing basket, pale attire, serene meditative gaze",
  },
  {
    number: 8,
    name_mr: "बगलामुखी",
    name_en: "Bagalamukhi",
    title_mr: "शत्रूंचे स्तम्भन करणारी पीतांबरा",
    title_en: "Pitambara — The Paralyzer of Negative Forces",
    mantra: "ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा ॥",
    significance_mr:
      "आठवी महाविद्या. पीतांबरा देवी. शत्रूंची बुद्धी, कट आणि वाणी स्तब्ध करणारी आणि कोर्ट-कचेरी व वादात विजय मिळवून देणारी.",
    significance_en:
      "Eighth Mahavidya. The Golden-hued Goddess who silences deceit, immobilizes negative adversaries, and grants decisive victory.",
    attributes_mr: "गदा, शत्रूची जीभ हातात पकडलेली, पिवळे वस्त्र व सुवर्ण आभूषणे",
    attributes_en: "Mace in right hand, holding tongue of ignorance, adorned in golden yellow",
  },
  {
    number: 9,
    name_mr: "मातंगी",
    name_en: "Matangi",
    title_mr: "वाक्शक्ती, संगीत, कला आणि ज्ञानाची अधिष्ठात्री",
    title_en: "The Tantric Saraswati of Arts and Eloquence",
    mantra: "ॐ ह्रीं क्लीं हूं मातंग्यै फट् स्वाहा ॥",
    significance_mr:
      "नववी महाविद्या. तांत्रिक सरस्वती म्हणून प्रसिद्ध. वाणीचे तेज, संगीत, साहित्य, गूढविद्या आणि आत्मज्ञान प्रदान करणारी शक्ती.",
    significance_en:
      "Ninth Mahavidya. The esoteric patron of divine speech, music, higher arts, and intuitive intellect.",
    attributes_mr: "वीणा, पोपट (शुक), खड्ग, खेट, चंद्रमुकुट",
    attributes_en: "Veena, parrot, sword, shield, adorned with crescent moon",
  },
  {
    number: 10,
    name_mr: "कमला",
    name_en: "Kamala",
    title_mr: "कमलारूढ महालक्ष्मी, ऐश्वर्य आणि समृद्धीची दात्री",
    title_en: "The Tantric Mahalakshmi of Splendor and Grace",
    mantra: "ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्मै नमः ॥",
    significance_mr:
      "दहावी महाविद्या. तांत्रिक महालक्ष्मी. भक्तांच्या घरी शांती, समाधान, धन-धान्य, ऐश्वर्य आणि समृद्धीची निरंतर वर्षा करणारी आदिशक्ती.",
    significance_en:
      "Tenth Mahavidya. The lotus-seated Tantric Mahalakshmi bestowing auspiciousness, spiritual wealth, and cosmic beauty.",
    attributes_mr: "चार हत्ती जलाभिषेक करताना, दोन हातात कमळ, अभय व वरद मुद्रा",
    attributes_en: "Four divine elephants anointing Her with water, lotuses, abhaya and varada mudras",
  },
];
