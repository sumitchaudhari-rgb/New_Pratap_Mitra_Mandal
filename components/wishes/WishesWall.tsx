"use client";

import { useState, useEffect } from "react";
import {
  MessageSquareHeart,
  Send,
  Sparkles,
  MapPin,
  Heart,
  Share2,
  Check,
  Search,
  Filter,
  Flame,
  X,
  Volume2,
} from "lucide-react";
import { INITIAL_WISHES, DevoteeWish } from "@/lib/data/wishes";

interface WishesWallProps {
  locale: string;
}

// Pure Web Audio API temple bell synthesizer
function playTempleBell() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const freqs = [587.33, 880, 1174.66, 1760];
    const now = ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      const peakGain = 0.15 / (idx + 1);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(peakGain, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.9);
    });
  } catch {
    // Ignore audio errors
  }
}

export default function WishesWall({ locale }: WishesWallProps) {
  const isMr = locale === "mr";

  // State
  const [wishes, setWishes] = useState<DevoteeWish[]>(INITIAL_WISHES);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasSharedId, setHasSharedId] = useState<string | null>(null);
  const [offeredIds, setOfferedIds] = useState<Record<string, boolean>>({});

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    village: "",
    message: "",
    category: "wishes" as DevoteeWish["category"],
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Load user submitted wishes from localStorage on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem("newpratap_devotee_wishes");
      if (saved) {
        const parsed: DevoteeWish[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes((prev) => {
            const existingIds = new Set(prev.map((w) => w.id));
            const fresh = parsed.filter((w) => !existingIds.has(w.id));
            return [...fresh, ...prev];
          });
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Filtered list
  const filteredWishes = wishes.filter((wish) => {
    const matchesCategory =
      activeCategory === "all" || wish.category === activeCategory;
    const matchesSearch =
      wish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wish.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wish.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Flower offering
  const handleOfferFlower = (id: string) => {
    playTempleBell();
    setOfferedIds((prev) => ({ ...prev, [id]: true }));
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, flowersCount: w.flowersCount + 1 } : w))
    );
  };

  // Handle WhatsApp Share
  const handleShareWish = (wish: DevoteeWish) => {
    const text = isMr
      ? `🙏 न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा — नवरात्रोत्सव २०२६\n\n"${wish.message}"\n- ${wish.name} (${wish.village})\n\nश्री छिन्नमस्ता मातेच्या चरणी तुम्हीही आपल्या मनोकामना व्यक्त करा:`
      : `🙏 New Pratap Mitra Mandal, Dangarvada Asoda — Navratri 2026\n\n"${wish.message}"\n- ${wish.name} (${wish.village})\n\nSend your devotional wishes to Shri Chhinnamasta Mata:`;
    const url = typeof window !== "undefined" ? window.location.href : "https://newpratapmandal.org/wishes";

    if (navigator.share) {
      navigator
        .share({ title: isMr ? "शुभेच्छा भिंत" : "Wishes Wall", text, url })
        .catch(() => {});
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${text}\n${url}`
      )}`;
      window.open(whatsappUrl, "_blank");
    }

    setHasSharedId(wish.id);
    setTimeout(() => setHasSharedId(null), 2500);
  };

  // Submit wish
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Honeypot spam check
    if (formData.honeypot) return;

    if (!formData.name.trim() || !formData.message.trim()) {
      setFormError(
        isMr
          ? "कृपया आपले नाव आणि शुभेच्छा संदेश प्रविष्ट करा."
          : "Please enter your name and devotional wish."
      );
      return;
    }

    if (formData.message.length > 200) {
      setFormError(
        isMr
          ? "संदेश कमाल २०० अक्षरांपर्यंत असावा."
          : "Message should not exceed 200 characters."
      );
      return;
    }

    // Rate-limiting check: 20 seconds between submits
    const lastSubmitTime = localStorage.getItem("newpratap_last_wish_time");
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < 20000) {
      setFormError(
        isMr
          ? "कृपया पुढील संदेश पाठवण्यासाठी काही सेकंद प्रतीक्षा करा."
          : "Please wait a few seconds before submitting another wish."
      );
      return;
    }

    setIsSubmitting(true);
    playTempleBell();

    const newWish: DevoteeWish = {
      id: `user-wish-${Date.now()}`,
      name: formData.name.trim(),
      village: formData.village.trim() || (isMr ? "असोदा ग्रामस्थ" : "Devotee"),
      message: formData.message.trim(),
      category: formData.category,
      timestamp: isMr ? "आत्ताच" : "Just now",
      flowersCount: 1,
    };

    // Save to localStorage
    try {
      localStorage.setItem("newpratap_last_wish_time", now.toString());
      const saved = localStorage.getItem("newpratap_devotee_wishes");
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(newWish);
      localStorage.setItem("newpratap_devotee_wishes", JSON.stringify(list));
    } catch {
      // Ignore localStorage errors
    }

    setTimeout(() => {
      setWishes((prev) => [newWish, ...prev]);
      setIsSubmitting(false);
      setFormSuccess(true);
      setFormData({
        name: "",
        village: "",
        message: "",
        category: "wishes",
        honeypot: "",
      });

      setTimeout(() => {
        setFormSuccess(false);
        setIsModalOpen(false);
      }, 2000);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* ── TOP ACTION BAR & STATS ───────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-3xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-gold/10 p-5 sm:p-7 shadow-md">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/50 px-3 py-0.5 text-xs font-bold text-gold uppercase tracking-wider">
            <Sparkles size={14} />
            {isMr ? "भाविकांच्या मनोकामना व प्रार्थना" : "Devotee Blessings & Prayers"}
          </span>
          <h2 className="deva-heading text-xl sm:text-2xl font-extrabold text-foreground mt-1">
            {isMr ? "श्री छिन्नमस्ता मातेच्या चरणी शुभेच्छा भिंत" : "Sacred Digital Wishes Wall"}
          </h2>
          <p className="deva-body text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            {isMr
              ? "आपल्या सुख, आरोग्य, शिक्षण व संकटनाशासाठी मातेच्या चरणी मंगल प्रार्थना अर्पण करा."
              : "Offer your heartfelt prayers, vows, and devotional wishes directly at the lotus feet of Maa Chhinnamasta."}
          </p>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(true);
            setFormSuccess(false);
            setFormError("");
          }}
          type="button"
          className="flex items-center justify-center gap-2 rounded-2xl gradient-primary px-6 py-3.5 text-sm font-extrabold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px] flex-shrink-0"
        >
          <Send size={16} />
          <span>{isMr ? "शुभेच्छा अर्पण करा ✍️" : "Offer Your Wish ✍️"}</span>
        </button>
      </div>

      {/* ── SEARCH & CATEGORY FILTERS ────────────────────── */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "all", label_mr: "सर्व (All)", label_en: "All" },
            { id: "wishes", label_mr: "उत्सव शुभेच्छा", label_en: "Wishes" },
            { id: "prayer", label_mr: "प्रार्थना व आरोग्य", label_en: "Prayers" },
            { id: "navas", label_mr: "नवस पूर्तता", label_en: "Vows" },
            { id: "gratitude", label_mr: "कृतज्ञता भाव", label_en: "Gratitude" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              type="button"
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all min-h-[38px] whitespace-nowrap border ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#A51C1D] via-[#CC3C1F] to-[#E55D1C] text-white border-primary shadow-sm"
                  : "bg-card text-foreground/80 border-border hover:bg-muted/60"
              }`}
            >
              {isMr ? cat.label_mr : cat.label_en}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isMr ? "नाव किंवा गाव शोधा..." : "Search name or village..."}
            className="w-full rounded-2xl border border-border bg-card pl-10 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── WISHES CARDS GRID ────────────────────────────── */}
      {filteredWishes.length === 0 ? (
        <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground">
          <MessageSquareHeart size={36} className="mx-auto text-muted-foreground/50 mb-3" />
          <p className="deva-heading text-lg font-bold">
            {isMr ? "कोणतीही प्रार्थना आढळली नाही" : "No wishes found matching your search"}
          </p>
          <p className="deva-body text-xs sm:text-sm mt-1">
            {isMr ? "तुम्ही पहिली प्रार्थना अर्पण करू शकता!" : "Be the first to offer a prayer!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredWishes.map((wish) => {
            const hasOffered = offeredIds[wish.id];
            const isShared = hasSharedId === wish.id;

            return (
              <div
                key={wish.id}
                className={`relative rounded-3xl border p-5 sm:p-6 transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${
                  wish.isOfficial
                    ? "border-2 border-gold/60 bg-gradient-to-br from-gold/5 via-card to-card"
                    : "border-border/80 bg-card hover:border-gold/40"
                }`}
              >
                {/* Header: Name, Village & Category */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="deva-heading font-extrabold text-base sm:text-lg text-foreground">
                          {wish.name}
                        </h3>
                        {wish.isOfficial && (
                          <span className="rounded-full bg-gold/20 border border-gold/50 px-2 py-0.5 text-[10px] font-extrabold text-gold">
                            {isMr ? "मंडळ पदाधिकारी" : "Official"}
                          </span>
                        )}
                      </div>
                      <p className="deva-body flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin size={12} className="text-primary" />
                        <span>{wish.village}</span>
                        <span className="text-border mx-1">•</span>
                        <span>{wish.timestamp}</span>
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        wish.category === "navas"
                          ? "bg-accent/10 text-accent border border-accent/20"
                          : wish.category === "prayer"
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-gold/10 text-gold border border-gold/20"
                      }`}
                    >
                      {wish.category === "navas"
                        ? isMr
                          ? "नवस पूर्तता"
                          : "Vow"
                        : wish.category === "prayer"
                        ? isMr
                          ? "प्रार्थना"
                          : "Prayer"
                        : wish.category === "gratitude"
                        ? isMr
                          ? "कृतज्ञता"
                          : "Gratitude"
                        : isMr
                        ? "शुभेच्छा"
                        : "Wish"}
                    </span>
                  </div>

                  {/* Devotional Message */}
                  <blockquote className="deva-body text-xs sm:text-sm text-foreground/90 leading-relaxed my-3 italic pl-3 border-l-2 border-primary/40">
                    &ldquo;{wish.message}&rdquo;
                  </blockquote>
                </div>

                {/* Footer Actions: Flower Offer & WhatsApp Share */}
                <div className="pt-3 border-t border-border/70 flex items-center justify-between gap-2 mt-2">
                  {/* Flower offering button */}
                  <button
                    onClick={() => handleOfferFlower(wish.id)}
                    type="button"
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all min-h-[36px] ${
                      hasOffered
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300"
                        : "bg-muted/60 text-foreground/80 hover:bg-gold/20 hover:text-gold border border-border"
                    }`}
                  >
                    <span>🌸</span>
                    <span>
                      {hasOffered
                        ? isMr
                          ? "पुष्प अर्पण केले!"
                          : "Offered!"
                        : isMr
                        ? "पुष्प अर्पण करा"
                        : "Offer Flower"}
                    </span>
                    <span className="rounded-full bg-black/5 dark:bg-white/10 px-1.5 py-0.2 text-[10px]">
                      {wish.flowersCount}
                    </span>
                  </button>

                  {/* Share button */}
                  <button
                    onClick={() => handleShareWish(wish)}
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all min-h-[36px]"
                    title={isMr ? "व्हॉट्सॲपवर शेअर करा" : "Share on WhatsApp"}
                  >
                    {isShared ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span className="text-emerald-600 text-[11px] font-bold">
                          {isMr ? "शेअर झाले!" : "Shared!"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Share2 size={14} />
                        <span className="text-[11px]">{isMr ? "शेअर" : "Share"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── MODAL / BOTTOM SHEET FORM ────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border-2 border-gold/60 bg-card p-6 sm:p-8 shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              type="button"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-muted/80 text-foreground/80 hover:bg-muted hover:text-foreground transition-all"
            >
              <X size={18} />
            </button>

            {/* Modal Title */}
            <div className="pr-8 mb-5">
              <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/40 px-2.5 py-0.5 text-[11px] font-bold text-gold uppercase tracking-wider">
                <Sparkles size={12} />
                {isMr ? "मनोकामना व प्रार्थना" : "Devotional Wish"}
              </span>
              <h3 className="deva-heading text-xl sm:text-2xl font-extrabold text-foreground mt-1">
                {isMr ? "मातेच्या चरणी शुभेच्छा अर्पण करा" : "Offer Your Wish to Mata"}
              </h3>
              <p className="deva-body text-xs text-muted-foreground mt-0.5">
                {isMr
                  ? "आपले नाव, गाव व मंगल संदेश प्रविष्ट करा. संदेश तात्काळ शुभेच्छा भिंतीवर जोडला जाईल."
                  : "Enter your name, village, and blessings. Your wish will immediately appear on the wall."}
              </p>
            </div>

            {/* Success State */}
            {formSuccess ? (
              <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/30 p-6 text-center text-emerald-800 dark:text-emerald-200">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white mb-3 shadow">
                  <Check size={24} />
                </div>
                <h4 className="deva-heading text-lg font-bold">
                  {isMr ? "आपली प्रार्थना मातेच्या चरणी अर्पण झाली! 🙏" : "Your Wish is Offered to Mata! 🙏"}
                </h4>
                <p className="deva-body text-xs mt-1">
                  {isMr
                    ? "श्री छिन्नमस्ता मातेचा आशीर्वाद आपल्या पाठीशी सदैव राहो."
                    : "May the divine blessings of Shri Chhinnamasta Mata always be with you."}
                </p>
              </div>
            ) : (
              /* Submission Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden from humans) */}
                <input
                  type="text"
                  name="user_hp"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Error Banner */}
                {formError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-50 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300">
                    {formError}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="deva-body block text-xs font-bold text-foreground mb-1">
                    {isMr ? "आपले पूर्ण नाव *" : "Your Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isMr ? "उदा. निलेश पाटील / सौ. कविता चौधरी" : "e.g. Nilesh Patil"}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Village / City */}
                <div>
                  <label className="deva-body block text-xs font-bold text-foreground mb-1">
                    {isMr ? "गाव / शहर" : "Village / City"}
                  </label>
                  <input
                    type="text"
                    maxLength={50}
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder={isMr ? "उदा. डांगरवाडा, असोदा / जळगाव / पुणे..." : "e.g. Asoda / Jalgaon / Pune"}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="deva-body block text-xs font-bold text-foreground mb-1">
                    {isMr ? "संदेश प्रकार" : "Wish Category"}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as DevoteeWish["category"],
                      })
                    }
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="wishes">
                      {isMr ? "उत्सव शुभेच्छा (Festive Wishes)" : "Festive Wishes"}
                    </option>
                    <option value="prayer">
                      {isMr ? "प्रार्थना व आरोग्य (Prayer & Health)" : "Prayer & Health"}
                    </option>
                    <option value="navas">
                      {isMr ? "नवस पूर्तता (Vow Fulfillment)" : "Vow Fulfillment"}
                    </option>
                    <option value="gratitude">
                      {isMr ? "कृतज्ञता भाव (Gratitude & Thanksgiving)" : "Gratitude & Thanksgiving"}
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="deva-body block text-xs font-bold text-foreground">
                      {isMr ? "आपला शुभेच्छा संदेश (कमाल २०० अक्षरे) *" : "Your Devotional Message (Max 200 chars) *"}
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        formData.message.length > 180 ? "text-amber-500 font-bold" : "text-muted-foreground"
                      }`}
                    >
                      {formData.message.length}/200
                    </span>
                  </div>
                  <textarea
                    required
                    rows={3}
                    maxLength={200}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isMr
                        ? "उदा. हे आई जगदंबे, आमच्या कुटुंबावर तुझी कृपा सदैव असो. नवरात्रोत्सवाच्या सर्वांना हार्दिक शुभेच्छा!"
                        : "e.g. May Maa Chhinnamasta bless our family and community with peace and health."
                    }
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl gradient-primary py-3.5 text-sm font-extrabold text-white shadow hover:opacity-95 disabled:opacity-50 transition-all min-h-[48px]"
                >
                  <Send size={16} />
                  <span>
                    {isSubmitting
                      ? isMr
                        ? "अर्पण होत आहे..."
                        : "Offering..."
                      : isMr
                      ? "मातेच्या चरणी अर्पण करा 🙏"
                      : "Offer to Mata 🙏"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
