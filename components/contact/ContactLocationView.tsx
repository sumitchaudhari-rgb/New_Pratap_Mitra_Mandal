"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Navigation,
  Car,
  Bus,
  Train,
  ShieldCheck,
  Droplets,
  HeartPulse,
  Info,
  Accessibility,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

interface ContactLocationViewProps {
  locale: string;
}

export default function ContactLocationView({ locale }: ContactLocationViewProps) {
  const isMr = locale === "mr";

  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    topic: "दर्शन विचारणा",
    message: "",
  });

  const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/9m6gUj5wY7hH3dGq7";
  const INSTAGRAM_URL = "https://www.instagram.com/new_pratap_?obrf=MTFsOW56aTJteG52NA==";
  const LANDLINE_NUMBER = "0257-2234567";

  function handleCopyPhone() {
    navigator.clipboard.writeText(LANDLINE_NUMBER);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
  }

  // Facilities Badges
  const FACILITIES = [
    {
      icon: Car,
      title_mr: "विनामूल्य वाहनतळ",
      title_en: "Free Vehicle Parking",
      desc_mr: "दुचाकी व चारचाकी वाहनांसाठी मंडपाजवळ प्रशस्त वाहनतळ व्यवस्था.",
      desc_en: "Dedicated two-wheeler and four-wheeler parking near the pandal.",
    },
    {
      icon: Droplets,
      title_mr: "शुद्ध व थंड पिण्याचे पाणी",
      title_en: "Clean Drinking Water",
      desc_mr: "सर्व भाविकांसाठी फिल्टर केलेले शुद्ध व थंड पाण्याचे स्टॉल्स.",
      desc_en: "Continuous purified and cool drinking water points.",
    },
    {
      icon: HeartPulse,
      title_mr: "प्रथमोपचार व वैद्यकीय कक्ष",
      title_en: "First Aid & Medical Post",
      desc_mr: "आपत्कालीन उपचारांसाठी डॉक्टर व प्रथमोपचार पेटी उपलब्ध.",
      desc_en: "First aid medical support and emergency kits available 24/7.",
    },
    {
      icon: Accessibility,
      title_mr: "ज्येष्ठ व दिव्यांग सुविधा",
      title_en: "Elderly & Divyang Support",
      desc_mr: "ज्येष्ठ नागरिक व दिव्यांगांसाठी थेट व्हीलचेअर व सुलभ दर्शन मार्ग.",
      desc_en: "Wheelchair assistance and priority smooth darshan queue.",
    },
    {
      icon: ShieldCheck,
      title_mr: "पादत्राणे स्टँड (सुरक्षित)",
      title_en: "Free Footwear Stand",
      desc_mr: "मंडप प्रवेशद्वाराजवळ विनामूल्य चप्पल-बूट जमा करण्याची सुरक्षित सोय.",
      desc_en: "Safe tokens-based footwear deposit counter at entrance.",
    },
    {
      icon: Info,
      title_mr: "माहिती व हरवले-सापडले केंद्र",
      title_en: "Information / Lost & Found",
      desc_mr: "ध्वनिक्षेपकावरून घोषणा व मदतीसाठी २४ तास कार्यकर्ते उपस्थित.",
      desc_en: "Public announcement system and volunteer helpline desk.",
    },
  ];

  // Route Guide
  const ROUTES = [
    {
      icon: Train,
      from_mr: "जळगाव रेल्वे स्थानकावरून",
      from_en: "From Jalgaon Railway Station",
      distance_mr: "सुमारे ६.५ किमी (१५ ते २० मिनिटे)",
      distance_en: "Approx 6.5 km (15-20 mins)",
      details_mr: "रेल्वे स्थानकाबाहेरून असोदा गावासाठी थेट ऑटो रिक्षा किंवा असोदा नाका येथून शेअरिंग वाहने सहज मिळतात.",
      details_en: "Direct auto rickshaws or sharing transit available from station outside towards Asoda.",
    },
    {
      icon: Bus,
      from_mr: "जळगाव नवीन बसस्थानकावरून (ST Stand)",
      from_en: "From Jalgaon Central Bus Stand",
      distance_mr: "सुमारे ५.५ किमी (१५ मिनिटे)",
      distance_en: "Approx 5.5 km (15 mins)",
      details_mr: "जळगाव बसस्थानकावरून दर २० मिनिटांनी असोद्यासाठी स्थानिक बस सेवा व सिटी रिक्षा उपलब्ध आहेत.",
      details_en: "Local rural buses and shuttle autos depart every 20 minutes to Asoda village.",
    },
    {
      icon: Car,
      from_mr: "स्वतःच्या वाहनाने (कार / बाईक)",
      from_en: "By Own Vehicle (Car / Bike)",
      distance_mr: "जळगाव-असोदा मुख्य रस्ता",
      distance_en: "Jalgaon-Asoda Main Road",
      details_mr: "जळगाव शहरातून असोदा रोडने थेट डांगरवाडा चौकापर्यंत पक्का डांबरी रस्ता आहे. मंडपाजवळ पार्किंग फलक लावलेले आहेत.",
      details_en: "Smooth paved road leading directly to Dangarvada Chowk with visible directional signboards.",
    },
  ];

  return (
    <div className="w-full space-y-8 sm:space-y-12">
      {/* ── ADDRESS & INTERACTIVE MAP CARD ───────────────── */}
      <div className="rounded-3xl border-2 border-gold/40 bg-card p-5 sm:p-8 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Address Details */}
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs font-bold text-gold uppercase tracking-wider">
              <MapPin size={13} className="text-accent" />
              {isMr ? "मंडपाचा अधिकृत पत्ता" : "Official Mandal Venue"}
            </span>

            <h2 className="deva-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              {isMr ? "न्यु प्रताप मित्र मंडळ" : "New Pratap Mitra Mandal"}
            </h2>

            <div className="space-y-2 text-sm sm:text-base text-foreground/90">
              <p className="font-semibold flex items-start gap-2">
                <span className="text-primary font-bold">📍</span>
                <span>डांगरवाडा, असोदा, ता. जि. जळगाव, महाराष्ट्र — ४२५१०१</span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground pl-6">
                {isMr
                  ? "ग्रामपंचायत असोदा परिसर • डांगरवाडा मुख्य चौक मंडप"
                  : "Grampanchayat Asoda Area • Dangarvada Main Chowk Pandal"}
              </p>
            </div>

            {/* Quick Contact Chips */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              {/* Landline */}
              <a
                href="tel:02572234567"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-xs sm:text-sm font-bold text-foreground hover:border-primary transition-colors min-h-[42px]"
              >
                <Phone size={14} className="text-accent" />
                <span>{LANDLINE_NUMBER} (कार्यालय)</span>
              </a>

              <button
                onClick={handleCopyPhone}
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors min-h-[42px]"
                title="फोन नंबर कॉपी करा"
              >
                {copiedPhone ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copiedPhone ? (isMr ? "कॉपी झाले" : "Copied") : (isMr ? "कॉपी" : "Copy")}</span>
              </button>

              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#E1306C]/40 bg-[#E1306C]/10 px-3.5 py-2 text-xs sm:text-sm font-bold text-[#E1306C] hover:bg-[#E1306C]/20 transition-colors min-h-[42px]"
              >
                <InstagramIcon />
                <span>@new_pratap_ (इंस्टाग्राम)</span>
              </a>
            </div>

            {/* 1-Tap Google Maps Button */}
            <div className="pt-3">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl gradient-primary px-6 py-3.5 text-sm sm:text-base font-extrabold text-white shadow-lg hover:opacity-95 active:scale-98 transition-all min-h-[50px] w-full sm:w-auto"
              >
                <Navigation size={18} />
                <span>{isMr ? "Google Maps वर थेट रस्ता पहा" : "Open in Google Maps"}</span>
              </a>
            </div>
          </div>

          {/* Visual Map Snapshot & Landmark Card */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border-2 border-border/80 bg-gradient-to-br from-muted via-card to-background p-5 text-center shadow-inner">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl gradient-festive text-slate-900 shadow mb-3">
                <MapPin size={24} />
              </div>
              <h3 className="deva-heading text-lg font-bold text-foreground">
                {isMr ? "डांगरवाडा असोदा मंडप" : "Dangarvada Asoda Pandal"}
              </h3>
              <p className="deva-body text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                {isMr
                  ? "जळगाव शहरापासून केवळ ६ किमी अंतरावर असोदा गावातील मध्यवर्ती डांगरवाडा चौक."
                  : "Located centrally at Dangarvada Chowk, Asoda village, just 6 km from Jalgaon city."}
              </p>

              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-center gap-4 text-xs font-bold text-primary">
                <span>🚗 मोफत पार्किंग</span>
                <span>•</span>
                <span>🚰 शुद्ध पाणी</span>
                <span>•</span>
                <span>♿ सुलभ दर्शन</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FACILITIES & AMENITIES BADGES ─────────────────── */}
      <div>
        <div className="text-center max-w-md mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            {isMr ? "भाविकांसाठी सुविधा" : "Devotee Facilities"}
          </span>
          <h2 className="deva-heading text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
            {isMr ? "मंडप परिसरातील विशेष सोयी" : "Pandal Amenities & Facilities"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FACILITIES.map((facility, idx) => {
            const Icon = facility.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 hover:border-gold/60 hover:shadow-md transition-all flex items-start gap-3.5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold font-bold">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="deva-heading font-bold text-sm sm:text-base text-foreground">
                    {isMr ? facility.title_mr : facility.title_en}
                  </h3>
                  <p className="deva-body text-xs text-muted-foreground mt-1 leading-relaxed">
                    {isMr ? facility.desc_mr : facility.desc_en}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── HOW TO REACH (ROUTES GUIDE) ──────────────────── */}
      <div className="rounded-3xl border border-border bg-gradient-to-b from-card to-background p-5 sm:p-8 shadow-sm">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {isMr ? "मार्गदर्शिका" : "How to Reach"}
          </span>
          <h2 className="deva-heading text-xl sm:text-2xl font-extrabold text-foreground mt-1">
            {isMr ? "असोदा मंडपात कसे पोहोचावे?" : "Getting to Dangarvada Asoda"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ROUTES.map((route, idx) => {
            const Icon = route.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border/80 bg-background/90 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 text-primary mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Icon size={16} />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-wide">
                      {isMr ? route.from_mr : route.from_en}
                    </span>
                  </div>

                  <div className="inline-block rounded-md bg-muted px-2 py-0.5 text-[11px] font-bold text-accent mb-2">
                    ⏱️ {isMr ? route.distance_mr : route.distance_en}
                  </div>

                  <p className="deva-body text-xs text-muted-foreground leading-relaxed">
                    {isMr ? route.details_mr : route.details_en}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── DEVOTEE QUERY / MESSAGE FORM ─────────────────── */}
      <div className="rounded-3xl border-2 border-gold/40 bg-card p-5 sm:p-8 shadow-md">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3 py-0.5 text-xs font-bold text-gold uppercase">
              <Sparkles size={12} className="text-accent" />
              {isMr ? "मंडळाशी संपर्क" : "Get In Touch"}
            </span>
            <h2 className="deva-heading text-xl sm:text-2xl font-extrabold text-foreground mt-1">
              {isMr ? "काही प्रश्न किंवा विचारणा आहे का?" : "Have Questions or Inquiries?"}
            </h2>
            <p className="deva-body text-xs sm:text-sm text-muted-foreground mt-1">
              {isMr
                ? "महाआरती, देणगी, महाप्रसाद किंवा दर्शनाबाबत मंडळाच्या कार्यकर्त्यांशी थेट संपर्क साधा."
                : "Send a message to our mandal volunteers regarding Aarti, Annadan, or Darshan."}
            </p>
          </div>

          {formSubmitted ? (
            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 p-6 text-center animate-fade-in-up">
              <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-2" />
              <h3 className="deva-heading text-lg font-bold text-emerald-800 dark:text-emerald-300">
                {isMr ? "आपला संदेश मंडळाकडे प्राप्त झाला आहे!" : "Your Message Has Been Sent!"}
              </h3>
              <p className="deva-body text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 mt-1 max-w-sm mx-auto">
                {isMr
                  ? "न्यु प्रताप मित्र मंडळाचे कार्यकर्ते लवकरच आपल्या दिलेल्या फोन नंबरवर संपर्क साधतील. जय माता दी!"
                  : "Mandal volunteers will get back to you shortly. Jai Mata Di!"}
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: "", phone: "", topic: "दर्शन विचारणा", message: "" });
                }}
                className="mt-4 text-xs font-bold text-primary underline"
              >
                {isMr ? "दुसरा संदेश पाठवा" : "Send Another Message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {isMr ? "आपले पूर्ण नाव *" : "Full Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isMr ? "उदा. राहुल पाटील" : "e.g. Rahul Patil"}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    {isMr ? "मोबाईल नंबर *" : "Mobile Number *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={isMr ? "उदा. ९८XXXXXXXX" : "e.g. 98XXXXXXXX"}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    {isMr ? "विषय" : "Topic"}
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none min-h-[44px]"
                  >
                    <option value="दर्शन विचारणा">{isMr ? "दर्शन व वेळ विचारणा" : "Darshan Inquiries"}</option>
                    <option value="महाआरती">{isMr ? "महाआरती व पूजा" : "Maha Aarti"}</option>
                    <option value="अन्नदान व महाप्रसाद">{isMr ? "अन्नदान व महाप्रसाद" : "Mahaprasad Feast"}</option>
                    <option value="देणगी">{isMr ? "देणगी व पावती" : "Donation Inquiry"}</option>
                    <option value="इतर">{isMr ? "इतर प्रश्न" : "Other"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {isMr ? "संदेश / विचारणा" : "Message / Query"}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isMr ? "आपला संदेश किंवा विचारणा येथे लिहा..." : "Write your message here..."}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl gradient-primary py-3 text-sm font-bold text-white shadow hover:opacity-95 active:scale-98 transition-all min-h-[48px]"
              >
                <Send size={16} />
                <span>{isMr ? "संदेश पाठवा" : "Submit Message"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
