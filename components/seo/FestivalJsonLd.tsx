import React from "react";

interface FestivalJsonLdProps {
  locale: string;
}

export default function FestivalJsonLd({ locale }: FestivalJsonLdProps) {
  const isMr = locale === "mr";

  const festivalData = {
    "@context": "https://schema.org",
    "@type": "Festival",
    "name": isMr
      ? "श्री छिन्नमस्ता माता नवरात्रोत्सव २०२६ | न्यु प्रताप मित्र मंडळ"
      : "Shri Chhinnamasta Mata Navratri Festival 2026 | New Pratap Mitra Mandal",
    "alternateName": [
      "न्यु प्रताप मित्र मंडळ नवरात्रोत्सव २०२६",
      "New Pratap Mitra Mandal Navratri 2026",
      "डांगरवाडा असोदा नवरात्रोत्सव"
    ],
    "description": isMr
      ? "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा (स्थापना १९८०) तर्फे आयोजित श्री छिन्नमस्ता माता (६ वी महाविद्या) नवरात्रोत्सव २०२६ चे अधिकृत संकेतस्थळ. दैनिक महाआरती मानकरी वेळापत्रक, थेट दर्शन आणि कार्यक्रम तपशील."
      : "Official website of New Pratap Mitra Mandal, Dangarvada Asoda (Est. 1980) celebrating Shri Chhinnamasta Mata (6th Mahavidya) Navratri Festival 2026. Daily evening Maha Aarti Mankari schedule, live darshan, and festival programmes.",
    "startDate": "2026-10-11T00:00:00+05:30",
    "endDate": "2026-10-21T23:59:59+05:30",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": isMr
        ? "न्यु प्रताप मित्र मंडळ मंडप, डांगरवाडा"
        : "New Pratap Mitra Mandal Mandap, Dangarvada",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "डांगरवाडा (Dangarvada)",
        "addressLocality": "असोदा (Asoda)",
        "addressRegion": "महाराष्ट्र (Maharashtra)",
        "postalCode": "425101",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.0375,
        "longitude": 75.6022
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "न्यु प्रताप मित्र मंडळ (स्थापना १९८०)",
      "url": "https://newpratapmitramandal.org",
      "founder": {
        "@type": "Person",
        "name": "श्री. मिलिंद शांताराम चौधरी"
      }
    },
    "image": [
      "https://newpratapmitramandal.org/images/HomePageImage.jpeg",
      "https://newpratapmitramandal.org/icons/icon-512.svg"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://newpratapmitramandal.org"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(festivalData) }}
    />
  );
}
