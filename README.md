# न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा — नवरात्रोत्सव २०२६
> **अधिकृत संकेतस्थळ व प्रोग्रेसिव्ह वेब ॲप्लिकेशन (PWA)**  
> **Official Website & Progressive Web App for Shri Chhinnamasta Mata Navratri Mahotsav 2026**  
> 🔗 **थेट संकेतस्थळ (Live Website):** [https://new-pratap-mitra-mandal-szi1.vercel.app/](https://new-pratap-mitra-mandal-szi1.vercel.app/)

[![Vercel Live](https://img.shields.io/badge/Vercel-Live%20App-000000?style=flat&logo=vercel)](https://new-pratap-mitra-mandal-szi1.vercel.app/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-8B1A2C?style=flat)]()

---

## 🚩 मंडळाविषयी (About the Mandal)
* **मंडळाचे नाव**: न्यु प्रताप मित्र मंडळ
* **स्थापना वर्ष**: १९८० (गेली ४६ वर्षांची अखंड परंपरा)
* **स्थान**: डांगरवाडा, मु. पो. असोदा, ता. जि. जळगाव - ४२५१०१ (महाराष्ट्र)
* **अध्यक्ष**: श्री. मिलिंद शांताराम चौधरी
* **तांत्रिक सहाय्य**: श्री. सुमित चौधरी
* **उत्सव २०२६**: श्री छिन्नमस्ता माता (१० महाविद्यांमधील ६ वी महाविद्या)

---

## ✨ प्रमुख वैशिष्ट्ये (Key Features)

### १. दैनिक महाआरती मानकरी व्यवस्थापन (Maha Aarti Mankari Schedule)
* **स्वयंचलित मानकरी फलक (Home Banner)**: मुख्य पानावर विसर्जन सोहळा टाइमरच्या वर चालू दिवसाच्या संध्याकाळच्या महाआरती मानकऱ्यांचे नाव ठळकपणे दिसते.
* **१० दिवसांचे स्वतंत्र वेळापत्रक**: सकाळ व संध्याकाळच्या आरतीच्या वेळा आणि मानकरी नावे.
* **मराठी ध्वन्यात्मक टायपिंग (Auto-Transliteration)**: प्रशासक नियंत्रण कक्षात इंग्रजीत टाईप केलेले नाव स्पेस किंवा टॅब दाबताच शुद्ध मराठीत (उदा. `pratap` -> `प्रताप`) रूपांतरित होते.

### २. प्रोग्रेसिव्ह वेब ॲप (PWA & Offline Aarti)
* **मोबाईल होम स्क्रीन इन्स्टॉल**: नेटिव्ह ॲपप्रमाणे मोबाईल स्क्रीनवर जोडण्याची सुविधा (`manifest.webmanifest`).
* **ऑफलाइन आरती संग्रह (Offline Mode)**: मंडपातील गर्दीत नेटवर्क नसतानाही आरती संग्रह व वेळापत्रक `sw.js` कॅशमधून विनाअडथळा सुरू राहते.

### ३. भक्तीमय वातावरण संगीत (Ambient Devotional Audio)
* **Web Audio Synthesis**: तंबोरा (Tanpura D# Drone) आणि मंदिरातील घंटा नाद (Temple Bell Resonance).
* **शून्य डेटा वापर**: बाह्य ऑडिओ फाइल्स डाऊनलोड न करता थेट ब्राऊझरमध्ये ध्वनी निर्मिती; १००% ऑफलाइन कार्यरत.

### ४. समाज व भाविक कक्ष (Devotee & Community Hub)
* **कार्यकर्ते व मंडळ छायाचित्रे**: मंडळाच्या कार्यकर्त्यांचे ग्रुप फोटो व मंडप छायाचित्रे.
* **भाविक शुभेच्छा भिंत (Wishes Wall)**: भाविकांना आपल्या सदिच्छा व प्रार्थना नोंदवण्याची सुविधा.
* **थेट दर्शन व लाइव्ह प्रवाह (Live Darshan)**: उत्सव काळात थेट आरती व पूजेचे थेट प्रक्षेपण.
* **मल्टीलिंग्युअल (Bilingual)**: मराठी (प्राथमिक) व इंग्रजी (English) भाषा समर्थन.

---

## 🔐 प्रशासक नियंत्रण कक्ष (Admin Panel)

* **प्रवेश मार्ग (Route)**: `/mr/admin` किंवा `/en/admin`
* **प्रशासक पासवर्ड (Passcode)**:
  ```text
  pratap123
  ```
* **प्रशासक सुविधा**:
  * १० दिवसांचे महाआरती मानकरी नावे व वेळा अद्ययावत करणे.
  * स्क्रोलिंग सूचना (Marquee Announcement) बदलणे.
  * तातडीची सूचना / हवामान अलर्ट (Emergency Alert Banner) सक्रिय करणे.
  * थेट प्रक्षेपणाची YouTube लिंक बदलणे.
  * भाविकांच्या शुभेच्छांचे नियंत्रण.
  * छायाचित्र अपलोड व स्वयंचलित कॉम्प्रेशन (Canvas Image Optimization to max 1600px).

---

## 🛠️ तंत्रज्ञान रचना (Tech Stack)

| घटक (Component) | तंत्रज्ञान (Technology) |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + Vanilla CSS Variables |
| **Typography** | Tiro Devanagari Marathi + Mukta (Google Fonts) |
| **Icons** | Lucide React |
| **PWA & Cache** | Web App Manifest + Service Worker API |
| **Audio** | HTML5 Web Audio API (Sacred 432Hz Drone) |
| **Optimization** | HTML5 Canvas Client-side Image Compression |

---

## 🚀 स्थानिक विकास (Local Development)

### १. रिपॉझिटरी क्लोन व पॅकेज इन्स्टॉल:
```bash
cd "c:\D_drive\New Pratap\new-pratap"
npm install
```

### २. डेव्हलपमेंट सर्व्हर सुरू करा:
```bash
npm run dev
```
ब्राऊझरमध्ये उघडा: [http://localhost:3000/mr](http://localhost:3000/mr)

### ३. प्रॉडक्शन बिल्ड तपासा:
```bash
npm run build
npm run start
```

---

## 🌐 उत्पादन उपयोजन (Production Deployment)

* 🔗 **थेट संकेतस्थळ (Live URL)**: [https://new-pratap-mitra-mandal-szi1.vercel.app/](https://new-pratap-mitra-mandal-szi1.vercel.app/)

### Vercel वर उपयोजन:
1. हे प्रोजेक्ट GitHub वर उपयोजित आहे.
2. आवश्यक पर्यावरण चले (Environment Variables) `.env.example` प्रमाणे Vercel Dashboard वर जोडली आहेत:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. **Live Deployment**: प्रत्येक Git पुशवर Vercel स्वयंचलित बिल्ड व डिप्लॉय करते.

---

© २०२६ **न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा**. सर्व हक्क राखीव.
