"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  MANDAL_HISTORY,
  COMMITTEE_MEMBERS,
  DONATION_INFO,
} from "@/lib/data/community";
import {
  Users,
  History,
  HeartHandshake,
  QrCode,
  Copy,
  Check,
  Phone,
  Flame,
  CheckCircle2,
} from "lucide-react";

interface CommunityViewProps {
  locale: string;
}

export default function CommunityView({ locale }: CommunityViewProps) {
  const isMr = locale === "mr";

  // Active Tab: 'history' | 'committee' | 'donate'
  const [activeTab, setActiveTab] = useState<"history" | "committee" | "donate">("history");

  // Copy UPI state
  const [upiCopied, setUpiCopied] = useState<boolean>(false);

  // Custom donation amount selection for UPI deep link
  const [customAmount, setCustomAmount] = useState<number>(501);

  function handleCopyUPI() {
    navigator.clipboard.writeText(DONATION_INFO.upiId);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2200);
  }

  // UPI deep link
  const upiDeepLink = `upi://pay?pa=${DONATION_INFO.upiId}&pn=${encodeURIComponent(
    DONATION_INFO.accountName
  )}&am=${customAmount}&cu=INR&tn=Navratri2026Seva`;

  return (
    <div className="w-full">
      {/* ── TOP PILL NAVIGATION TABS ──────────────────────── */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center rounded-2xl border border-border/80 bg-background/95 dark:bg-card/95 p-1.5 shadow-sm max-w-full overflow-x-auto no-scrollbar gap-1">
          <button
            onClick={() => setActiveTab("history")}
            type="button"
            className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold transition-all min-h-[44px] whitespace-nowrap ${
              activeTab === "history"
                ? "bg-gradient-to-r from-[#A51C1D] via-[#CC3C1F] to-[#E55D1C] text-white shadow-md"
                : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <History size={16} />
            <span>{isMr ? "मंडळ इतिहास" : "History"}</span>
          </button>

          <button
            onClick={() => setActiveTab("committee")}
            type="button"
            className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold transition-all min-h-[44px] whitespace-nowrap ${
              activeTab === "committee"
                ? "bg-gradient-to-r from-[#A51C1D] via-[#CC3C1F] to-[#E55D1C] text-white shadow-md"
                : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Users size={16} />
            <span>{isMr ? "कार्यकारिणी व संघटक" : "Committee"}</span>
          </button>


          <button
            onClick={() => setActiveTab("donate")}
            type="button"
            className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold transition-all min-h-[44px] whitespace-nowrap ${
              activeTab === "donate"
                ? "bg-gradient-to-r from-[#A51C1D] via-[#CC3C1F] to-[#E55D1C] text-white shadow-md"
                : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <HeartHandshake size={16} />
            <span>{isMr ? "देणगी व वर्गणी (UPI)" : "Donate (UPI)"}</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────── */}
      {/* TAB 1: HISTORY & MILESTONES                         */}
      {/* ─────────────────────────────────────────────────── */}
      {activeTab === "history" && (
        <div className="space-y-8 animate-fade-in-up">
          <div className="rounded-2xl border border-gold/40 bg-card p-5 sm:p-7 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              {isMr ? "४४ वर्षांची गौरवशाली परंपरा" : "44 Years of Sacred Heritage"}
            </span>
            <h2 className="deva-heading text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
              {isMr ? "१९८० पासून अखंड भक्तिमय व सामाजिक कार्य" : "Mandal Journey: 1980 to Present"}
            </h2>
            <p className="deva-body text-xs sm:text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
              {isMr
                ? "डांगरवाडा असोदा येथील तरुणांनी १९८० मध्ये लावलेले हे लहानसे रोपटे आज संपूर्ण पंचक्रोशीत भक्तिभावाने व सामाजिक बांधिलकीने बहरलेले महावृक्ष झाले आहे."
                : "Founded in 1980 by passionate village youth, New Pratap Mitra Mandal continues an unbroken 44-year tradition of festival devotion and community service."}
            </p>
          </div>

          {/* Vertical History Timeline */}
          <div className="relative pl-6 sm:pl-10 border-l-2 border-gold/50 space-y-8 sm:space-y-10 ml-3 sm:ml-5">
            {MANDAL_HISTORY.map((item, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl border p-5 sm:p-7 transition-all ${
                  item.highlight
                    ? "border-2 border-gold/60 bg-gradient-to-r from-gold/10 via-card to-card shadow-md"
                    : "border-border/80 bg-card shadow-sm"
                }`}
              >
                {/* Timeline Node Dot */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-6 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-card bg-gold text-slate-950 font-black text-xs shadow">
                  <Flame size={14} />
                </div>

                {/* Year Pill */}
                <span className="inline-block rounded-full bg-primary/10 border border-primary/30 px-3.5 py-1 text-xs font-extrabold text-primary mb-2">
                  {isMr ? item.yearDisplay_mr : item.yearDisplay_en}
                </span>

                <h3 className="deva-heading text-lg sm:text-xl font-bold text-foreground">
                  {isMr ? item.title_mr : item.title_en}
                </h3>

                <p className="deva-body text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  {isMr ? item.description_mr : item.description_en}
                </p>

                {/* Optional Photo Attachment */}
                {item.image && (
                  <div className="mt-4 relative aspect-[16/9] w-full max-w-md overflow-hidden rounded-2xl border border-border shadow-md">
                    <Image
                      src={item.image}
                      alt={isMr ? item.title_mr : item.title_en}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────── */}
      {/* TAB 2: COMMITTEE & VOLUNTEERS                       */}
      {/* ─────────────────────────────────────────────────── */}
      {activeTab === "committee" && (
        <div className="space-y-8 animate-fade-in-up">
          {/* Volunteer Force Banner Image */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold/40 bg-card shadow-lg">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full">
              <Image
                src="/images/mandlache-karyakarte.jpeg"
                alt="न्यु प्रताप मित्र मंडळाचे सर्व कार्यकर्ते व संघटक"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                <h3
                  style={{ color: "#E5A100" }}
                  className="deva-heading text-sm sm:text-base font-extrabold drop-shadow"
                >
                  {isMr ? "न्यु प्रताप मित्र मंडळाचे कार्यकर्ते व संघटक" : "New Pratap Mitra Mandal Volunteers & Organizers"}
                </h3>
                <p className="deva-body text-xs sm:text-sm text-white/80 mt-0.5 max-w-xl">
                  {isMr
                    ? "दिवस-रात्र निस्वार्थ भावनेने मंडप उभारणी, विद्युत रोषणाई, महाप्रसाद व उत्सव सुरक्षेसाठी झटणारे सर्व निष्ठावंत कार्यकर्ते."
                    : "The dedicated force working tirelessly for pandal construction, security, decoration, and community feast."}
                </p>
              </div>
            </div>
          </div>

          {/* Committee Cards */}
          <div>
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {isMr ? "उत्सव व्यवस्थापन" : "Festival Leadership"}
              </span>
              <h3 className="deva-heading text-xl sm:text-2xl font-extrabold text-foreground mt-0.5">
                {isMr ? "प्रमुख पदाधिकारी व कार्यकारिणी" : "Executive Committee & Office Bearers"}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COMMITTEE_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 hover:border-gold/60 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                        {isMr ? member.role_mr : member.role_en}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        {isMr ? member.yearsOfSeva_mr : "Seva"}
                      </span>
                    </div>

                    <h4 className="deva-heading font-extrabold text-base sm:text-lg text-foreground">
                      {isMr ? member.name_mr : member.name_en}
                    </h4>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {isMr ? "संपर्क कार्यालय:" : "Office:"}
                    </span>
                    <a
                      href={`tel:${member.phone || "02572234567"}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-bold text-primary hover:bg-primary/5 transition-colors"
                    >
                      <Phone size={12} />
                      <span>{DONATION_INFO.phonePeGpayNumber}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* ─────────────────────────────────────────────────── */}
      {/* TAB 4: MOBILE-FIRST UPI DONATION SECTION            */}
      {/* ─────────────────────────────────────────────────── */}
      {activeTab === "donate" && (
        <div className="max-w-xl mx-auto space-y-6 animate-fade-in-up">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs font-bold text-gold uppercase tracking-wider">
              <QrCode size={13} className="text-accent" />
              {isMr ? "डिजिटल देणगी व पावती" : "UPI Digital Donation"}
            </span>
            <h2 className="deva-heading text-2xl sm:text-3xl font-extrabold text-foreground mt-2">
              {isMr ? "उत्सवासाठी सढळ हाताने मदत करा" : "Support Navratri Festival"}
            </h2>
            <p className="deva-body text-xs sm:text-sm text-muted-foreground mt-1">
              {isMr
                ? "महाप्रसाद अन्नदान, मंडप व्यवस्था व विद्युत रोषणाईसाठी थेट UPI द्वारे १-क्लिकमध्ये देणगी द्या."
                : "Contribute securely via UPI for Mahaprasad Annadan, idol decoration, and festival arrangements."}
            </p>
          </div>

          {/* UPI CARD CONTAINER */}
          <div className="rounded-3xl border-2 border-gold/50 bg-gradient-to-b from-card via-card to-background p-6 sm:p-8 shadow-xl text-center">
            {/* Quick Amount Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-foreground mb-2">
                {isMr ? "देणगी रक्कम निवडा (रुपये):" : "Select Contribution Amount:"}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[101, 251, 501, 1001].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setCustomAmount(amt)}
                    type="button"
                    className={`rounded-xl py-2 text-xs font-extrabold transition-all min-h-[42px] ${
                      customAmount === amt
                        ? "gradient-primary text-white shadow-md scale-102"
                        : "border border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    ₹ {amt}
                  </button>
                ))}
              </div>
            </div>

            {/* High-Contrast UPI QR Code Simulator */}
            <div className="relative mx-auto my-4 flex h-52 w-52 sm:h-60 sm:w-60 flex-col items-center justify-center rounded-2xl border-4 border-slate-900 bg-white p-4 shadow-md">
              {/* QR Pattern visual */}
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="grid grid-cols-6 gap-2 w-full h-full p-2 opacity-90">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        (i % 2 === 0 || i % 5 === 0) && i !== 14
                          ? "bg-slate-900"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                {/* Center Badge */}
                <div className="absolute inset-auto flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-white shadow-lg border-2 border-white">
                  <Flame size={20} />
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mt-1">
                Scan with any UPI App
              </span>
            </div>

            {/* 1-Tap Mobile UPI Payment Button */}
            <div className="mt-6 space-y-3">
              <a
                href={upiDeepLink}
                className="w-full flex items-center justify-center gap-2 rounded-2xl gradient-festive py-3.5 text-sm sm:text-base font-extrabold text-slate-950 shadow-lg hover:opacity-95 active:scale-98 transition-all min-h-[50px]"
              >
                <QrCode size={18} />
                <span>
                  {isMr
                    ? `थेट ₹ ${customAmount} PhonePe / GPay ने भरा`
                    : `Pay ₹ ${customAmount} with UPI App`}
                </span>
              </a>

              {/* Copy UPI ID */}
              <div className="flex items-center justify-between rounded-xl border border-border bg-background p-2.5">
                <div className="text-left pl-1">
                  <span className="text-[10px] text-muted-foreground block leading-none">
                    {isMr ? "अधिकृत UPI ID:" : "Official UPI ID:"}
                  </span>
                  <span className="text-xs font-extrabold text-foreground font-mono">
                    {DONATION_INFO.upiId}
                  </span>
                </div>

                <button
                  onClick={handleCopyUPI}
                  type="button"
                  className="flex items-center gap-1 rounded-lg border border-gold/50 bg-gold/15 px-3 py-1.5 text-xs font-bold text-foreground hover:bg-gold/25 active:scale-95 transition-all min-h-[36px]"
                >
                  {upiCopied ? (
                    <>
                      <Check size={14} className="text-emerald-500" />
                      <span className="text-emerald-600">{isMr ? "कॉपी झाले!" : "Copied"}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>{isMr ? "UPI कॉपी करा" : "Copy UPI"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bank Details Dropdown / Card */}
            <div className="mt-6 pt-5 border-t border-border text-left space-y-1.5 text-xs text-foreground/80">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isMr ? "खात्याचे नाव:" : "Account:"}</span>
                <span className="font-bold">{DONATION_INFO.accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isMr ? "बँक:" : "Bank:"}</span>
                <span className="font-bold">{DONATION_INFO.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isMr ? "खाते क्र.:" : "A/C No:"}</span>
                <span className="font-bold font-mono">{DONATION_INFO.accountNumber}</span>
              </div>
            </div>
          </div>

          {/* Receipt WhatsApp Notice */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 p-4 sm:p-5 flex items-start gap-3">
            <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                {isMr ? "अधिकृत पावती मिळवा:" : "Official Donation Receipt:"}
              </span>
              <p className="text-emerald-700 dark:text-emerald-400">
                {isMr
                  ? "देणगी दिल्यानंतर व्यवहाराचा स्क्रीनशॉट मंडळाच्या कार्यालयीन क्रमांकावर ०२५७-२२३४५६७ पाठवावा. देणगीदाराचे नाव वेबसाइटच्या 'देणगीदार यादीत' सन्मानपूर्वक समाविष्ट केले जाईल."
                  : "Please share transaction screenshot to 0257-2234567 for your official receipt and donor wall listing."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
