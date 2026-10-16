/**
 * High-accuracy English (Roman script) to Marathi (Devanagari) Transliteration Utility
 * Specifically optimized for Marathi personal names, honorifics, surnames, and mandal terms.
 */

// Common vocabulary dictionary for exact words, surnames, first names, and phrases
const COMMON_DICTIONARY: Record<string, string> = {
  // Honorifics
  shri: "श्री.",
  shree: "श्री.",
  "shri.": "श्री.",
  "shree.": "श्री.",
  mr: "श्री.",
  "mr.": "श्री.",
  mrs: "सौ.",
  "mrs.": "सौ.",
  smt: "श्रीमती",
  "smt.": "श्रीमती",
  dr: "डॉ.",
  "dr.": "डॉ.",

  // Connectives & Community terms
  and: "व",
  "&": "व",
  va: "व",
  family: "परिवार",
  parivar: "परिवार",
  parivaar: "परिवार",
  kutumb: "कुटुंब",
  mandal: "मंडळ",
  mandalam: "मंडळ",
  mitra: "मित्र",
  pratap: "प्रताप",
  new: "न्यु",
  nyu: "न्यु",
  dangarvada: "डांगरवाडा",
  dangarwada: "डांगरवाडा",
  asoda: "असोदा",
  jalgaon: "जळगाव",
  bhusawal: "भुसावळ",
  bhusaval: "भुसावळ",
  karyakarta: "कार्यकर्ते",
  karyakarte: "कार्यकर्ते",
  sarv: "सर्व",
  all: "सर्व",
  samast: "समस्त",
  gramastha: "ग्रामस्थ",
  gramstha: "ग्रामस्थ",
  mahila: "महिला",
  bachat: "बचत",
  gat: "गट",
  bhagini: "भगिनी",
  yuva: "युवा",
  shakti: "शक्ती",
  bal: "बाल",
  gopal: "गोपाळ",
  bhavik: "भाविक",
  bhakt: "भक्त",
  bhaktagan: "भक्तगण",
  annadan: "अन्नदान",
  mahaprasad: "महाप्रसाद",
  prasad: "प्रसाद",
  samiti: "समिती",
  aarti: "आरती",
  mahaaarti: "महाआरती",
  yajman: "यजमान",
  mankari: "मानकरी",
  seva: "सेवा",

  // Committee First Names
  milind: "मिलिंद",
  sanket: "संकेत",
  vedant: "वेदांत",
  soham: "सोहम",
  sumit: "सुमित",
  deepak: "दीपक",
  dipak: "दीपक",
  ramesh: "रमेश",
  gajanan: "गजानन",
  sachin: "सचिन",
  kailas: "कैलास",
  kailash: "कैलास",
  prakash: "प्रकाश",
  dnyaneshwar: "ज्ञानेश्वर",
  dnyanesh: "ज्ञानेश",
  rahul: "राहुल",
  amit: "अमित",
  nitin: "नितीन",
  chetan: "चेतन",
  ajay: "अजय",
  vijay: "विजय",
  sanjay: "संजय",
  ganesh: "गणेश",
  mahesh: "महेश",
  rajesh: "राजेश",
  sunil: "सुनील",
  anil: "अनिल",
  santosh: "संतोष",
  vikas: "विकास",
  prashant: "प्रशांत",
  suresh: "सुरेश",
  satish: "सतीश",
  akash: "आकाश",
  prathamesh: "प्रथमेश",
  omkar: "ओमकार",
  rohit: "रोहित",
  mayur: "मयूर",
  tushar: "तुषार",

  // Surnames
  chaudhari: "चौधरी",
  chaudhary: "चौधरी",
  choudhari: "चौधरी",
  choudhary: "चौधरी",
  patil: "पाटील",
  mahajan: "महाजन",
  pawar: "पवार",
  jadhav: "जाधव",
  sonawane: "सोनवणे",
  sonwane: "सोनवणे",
  kanoje: "कानोजे",
  bari: "बारी",
  shinde: "शिंदे",
  deshmukh: "देशमुख",
  kulkarni: "कुलकर्णी",
  joshi: "जोशी",
  more: "मोरे",
  gaikwad: "गायकवाड",
  bhole: "भोळे",
  kolhe: "कोल्हे",
  talele: "तळेले",
  nehete: "नेहते",
  attarde: "अत्तरदे",
  jawale: "जवळे",
  warke: "वारके",
  bhangale: "भांगळे",
  chavan: "चव्हाण",
  salunkhe: "साळुंखे",
};

// Character-level phonetic mappings
const CONSONANT_RULES: Array<[string, string]> = [
  ["dny", "ज्ञ"],
  ["gny", "ज्ञ"],
  ["shh", "ष"],
  ["chh", "छ"],
  ["ch", "च"],
  ["kh", "ख"],
  ["gh", "घ"],
  ["jh", "झ"],
  ["th", "थ"],
  ["dh", "ध"],
  ["ph", "फ"],
  ["bh", "भ"],
  ["sh", "श"],
  ["tr", "त्र"],
  ["kr", "क्र"],
  ["pr", "प्र"],
  ["br", "ब्र"],
  ["gr", "ग्र"],
  ["k", "क"],
  ["g", "ग"],
  ["c", "क"],
  ["j", "ज"],
  ["t", "त"],
  ["d", "द"],
  ["n", "न"],
  ["p", "प"],
  ["b", "ब"],
  ["m", "म"],
  ["y", "य"],
  ["r", "र"],
  ["l", "ल"],
  ["v", "व"],
  ["w", "व"],
  ["s", "स"],
  ["h", "ह"],
  ["z", "झ"],
  ["f", "फ"],
];

const VOWEL_RULES: Array<[string, string, string]> = [
  // [token, standalone vowel, matra]
  ["aau", "औ", "ौ"],
  ["aai", "आई", "ाई"],
  ["ai", "ऐ", "ै"],
  ["au", "औ", "ौ"],
  ["ou", "औ", "ौ"],
  ["oo", "ऊ", "ू"],
  ["ee", "ई", "ी"],
  ["aa", "आ", "ा"],
  ["ii", "ई", "ी"],
  ["uu", "ऊ", "ू"],
  ["a", "अ", "ा"],
  ["i", "इ", "ि"],
  ["u", "उ", "ु"],
  ["e", "ए", "े"],
  ["o", "ओ", "ो"],
];

/**
 * Phonetically transliterates a single English word into Marathi Devanagari.
 */
function transliterateWord(word: string): string {
  const cleanWord = word.trim();
  if (!cleanWord) return "";

  // Check punctuation/honorific prefix
  const lower = cleanWord.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
  if (COMMON_DICTIONARY[lower]) {
    let result = COMMON_DICTIONARY[lower];
    // preserve trailing dot if input had it and result doesn't
    if (cleanWord.endsWith(".") && !result.endsWith(".")) {
      result += ".";
    }
    return result;
  }

  // If already contains Devanagari, return as is
  if (/[\u0900-\u097F]/.test(cleanWord)) {
    return cleanWord;
  }

  // Phonetic rule parser
  let text = cleanWord.toLowerCase();
  let devanagari = "";
  let i = 0;

  while (i < text.length) {
    // Check nasal anusvara (an, am before consonant)
    if (
      (text.substr(i, 2) === "an" || text.substr(i, 2) === "am") &&
      i + 2 < text.length &&
      !/[aeiou]/.test(text[i + 2])
    ) {
      devanagari += "ं";
      i += 2;
      continue;
    }

    // Match consonants
    let matchedConsonant: string | null = null;
    let consLen = 0;

    for (const [latin, deva] of CONSONANT_RULES) {
      if (text.substr(i, latin.length) === latin) {
        matchedConsonant = deva;
        consLen = latin.length;
        break;
      }
    }

    if (matchedConsonant) {
      devanagari += matchedConsonant;
      i += consLen;

      // Look ahead for vowel attached to consonant
      let matchedVowelMatra: string | null = null;
      let vowLen = 0;

      for (const [latin, , matra] of VOWEL_RULES) {
        if (text.substr(i, latin.length) === latin) {
          matchedVowelMatra = matra;
          vowLen = latin.length;
          break;
        }
      }

      if (matchedVowelMatra !== null) {
        // In Marathi, inherent "a" at the end of word is usually silent (Halant implicit)
        // e.g. "Milind" ends with d, but "Vedanta" ends with a.
        // If "a" is matched and it's not the end of the word, we don't necessarily add "ा" unless it was "aa".
        const matchedStr = text.substr(i, vowLen);
        if (matchedStr === "a") {
          // If followed by another letter, or explicit 'a' at end
          if (i + 1 === text.length) {
            devanagari += "ा"; // e.g. Shaila -> शैला
          }
        } else {
          devanagari += matchedVowelMatra;
        }
        i += vowLen;
      }
      continue;
    }

    // Match standalone vowels (at beginning of syllable or word)
    let matchedStandaloneVowel: string | null = null;
    let vowLen = 0;

    for (const [latin, standalone] of VOWEL_RULES) {
      if (text.substr(i, latin.length) === latin) {
        matchedStandaloneVowel = standalone;
        vowLen = latin.length;
        break;
      }
    }

    if (matchedStandaloneVowel) {
      devanagari += matchedStandaloneVowel;
      i += vowLen;
      continue;
    }

    // Fallback: character pass-through (digits, punctuation, spaces)
    devanagari += text[i];
    i++;
  }

  // Capitalize/clean known Marathi phonetic outputs
  return devanagari;
}

/**
 * Main translation/transliteration function for names or sentences.
 * If input contains English characters, converts to Marathi Devanagari.
 */
export function translateToMarathi(input: string): string {
  if (!input || !input.trim()) return "";

  // If no Latin letters are found, it's already in Marathi/Devanagari
  if (!/[a-zA-Z]/.test(input)) {
    return input;
  }

  // Tokenize by spaces while preserving spacing
  const tokens = input.split(/(\s+)/);

  return tokens
    .map((token) => {
      if (/^\s+$/.test(token)) return token;

      // Handle trailing periods or commas
      const match = token.match(/^([^.,!?]+)([.,!?]*)$/);
      if (match) {
        const [, core, punct] = match;
        return transliterateWord(core) + punct;
      }

      return transliterateWord(token);
    })
    .join("");
}
