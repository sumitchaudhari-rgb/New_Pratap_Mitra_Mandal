"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Lock,
  Unlock,
  Radio,
  Bell,
  MessageSquareHeart,
  Image as ImageIcon,
  Calendar,
  CheckCircle2,
  XCircle,
  Trash2,
  Upload,
  Sparkles,
  AlertTriangle,
  Eye,
  LogOut,
  Save,
  Clock,
  Phone,
  Flame,
  ShieldCheck,
  Check,
  RotateCcw,
} from "lucide-react";
import { optimizeImage } from "@/lib/utils/imageOptimizer";
import { INITIAL_WISHES, DevoteeWish } from "@/lib/data/wishes";
import { COMMITTEE_MEMBERS } from "@/lib/data/community";
import {
  DEFAULT_AARTI_SCHEDULE,
  getActiveAartiSchedule,
  AARTI_MANKARI_STORAGE_KEY,
  AartiYajmanDay,
} from "@/lib/data/aartiYajman";
import { translateToMarathi } from "@/lib/utils/marathiTransliterate";

interface AdminDashboardProps {
  locale: string;
}

export default function AdminDashboard({ locale }: AdminDashboardProps) {
  const isMr = locale === "mr";

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Tabs: 'settings' | 'aarti' | 'wishes' | 'photos' | 'programme'
  const [activeTab, setActiveTab] = useState<"settings" | "aarti" | "wishes" | "photos" | "programme">("settings");

  // Aarti Mankari Management State
  const [aartiSchedule, setAartiSchedule] = useState<AartiYajmanDay[]>(DEFAULT_AARTI_SCHEDULE);
  const [selectedAartiDay, setSelectedAartiDay] = useState<number>(1);
  const [aartiSaveSuccess, setAartiSaveSuccess] = useState<boolean>(false);

  // Site Settings & Broadcast State
  const [announcementText, setAnnouncementText] = useState<string>(
    "यंदा श्री छिन्नमस्ता मातेची स्थापना — सर्वांचे हार्दिक स्वागत!"
  );
  const [emergencyAlert, setEmergencyAlert] = useState<{
    enabled: boolean;
    text: string;
  }>({
    enabled: false,
    text: "आज रात्री ०८:०० वाजता विशेष महाआरती व महाप्रसाद वाटप संपन्न होईल.",
  });
  const [liveStreamStatus, setLiveStreamStatus] = useState<{
    isLive: boolean;
    videoUrl: string;
  }>({
    isLive: true,
    videoUrl: "https://www.youtube.com/watch?v=live_stream",
  });
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Wishes Management State
  const [wishesList, setWishesList] = useState<DevoteeWish[]>(INITIAL_WISHES);

  // Photo Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [optimizedPreview, setOptimizedPreview] = useState<string | null>(null);
  const [imageMeta, setImageMeta] = useState<{ originalSize: number; optimizedSize: number; width: number; height: number } | null>(null);
  const [photoTitle, setPhotoTitle] = useState<string>("");
  const [photoCategory, setPhotoCategory] = useState<string>("mandap");
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Check existing session
  useEffect(() => {
    try {
      const savedAuth =
        sessionStorage.getItem("pratap_admin_auth") ||
        localStorage.getItem("pratap_admin_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }

      // Load wishes from localStorage
      const savedWishes = localStorage.getItem("newpratap_devotee_wishes");
      if (savedWishes) {
        const parsed = JSON.parse(savedWishes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishesList((prev) => {
            const existingIds = new Set(prev.map((w) => w.id));
            const fresh = parsed.filter((w) => !existingIds.has(w.id));
            return [...fresh, ...prev];
          });
        }
      }

      // Load custom broadcast
      const savedNotice = localStorage.getItem("newpratap_admin_announcement");
      if (savedNotice) setAnnouncementText(savedNotice);

      const savedEmergency = localStorage.getItem("newpratap_admin_emergency");
      if (savedEmergency) {
        setEmergencyAlert(JSON.parse(savedEmergency));
      }

      // Load active aarti schedule from localStorage
      setAartiSchedule(getActiveAartiSchedule());
    } catch {
      // Ignore sessionStorage/localStorage errors
    }
  }, []);

  // Update a single field in aarti session
  const handleUpdateAartiSession = (
    dayNumber: number,
    session: "morningAarti" | "eveningAarti",
    field: "time" | "yajman_mr" | "yajman_en" | "role_mr" | "role_en" | "prasad_mr" | "prasad_en",
    value: string
  ) => {
    setAartiSchedule((prev) =>
      prev.map((d) => {
        if (d.day !== dayNumber) return d;
        return {
          ...d,
          [session]: {
            ...d[session],
            [field]: value,
          },
        };
      })
    );
  };

  // Mankari input change with automatic space-based transliteration
  const handleMankariInputChange = (
    dayNumber: number,
    session: "morningAarti" | "eveningAarti",
    value: string
  ) => {
    // If admin types a space and preceding text contains English letters, transliterate up to the space
    if (value.endsWith(" ") && /[a-zA-Z]/.test(value)) {
      const converted = translateToMarathi(value);
      handleUpdateAartiSession(dayNumber, session, "yajman_mr", converted);
    } else {
      handleUpdateAartiSession(dayNumber, session, "yajman_mr", value);
    }
  };

  // Mankari input blur with full transliteration of any English text
  const handleMankariBlur = (
    dayNumber: number,
    session: "morningAarti" | "eveningAarti",
    value: string
  ) => {
    if (/[a-zA-Z]/.test(value)) {
      const converted = translateToMarathi(value);
      handleUpdateAartiSession(dayNumber, session, "yajman_mr", converted);
    }
  };

  // Save Aarti schedule to localStorage and notify all components
  const handleSaveAartiSchedule = () => {
    try {
      localStorage.setItem(AARTI_MANKARI_STORAGE_KEY, JSON.stringify(aartiSchedule));
      window.dispatchEvent(new Event("aarti_mankari_updated"));
      setAartiSaveSuccess(true);
      setTimeout(() => setAartiSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save aarti schedule:", err);
    }
  };

  // Clear specific session (morning or evening)
  const handleClearSession = (dayNumber: number, session: "morningAarti" | "eveningAarti") => {
    setAartiSchedule((prev) =>
      prev.map((d) => {
        if (d.day !== dayNumber) return d;
        return {
          ...d,
          [session]: {
            ...d[session],
            yajman_mr: "",
            yajman_en: "",
            role_mr: "",
            role_en: "",
            prasad_mr: "",
            prasad_en: "",
          },
        };
      })
    );
  };

  // Clear both sessions for a day
  const handleClearDayAarti = (dayNumber: number) => {
    setAartiSchedule((prev) =>
      prev.map((d) => {
        if (d.day !== dayNumber) return d;
        return {
          ...d,
          morningAarti: {
            ...d.morningAarti,
            yajman_mr: "",
            yajman_en: "",
            role_mr: "",
            role_en: "",
            prasad_mr: "",
            prasad_en: "",
          },
          eveningAarti: {
            ...d.eveningAarti,
            yajman_mr: "",
            yajman_en: "",
            role_mr: "",
            role_en: "",
            prasad_mr: "",
            prasad_en: "",
          },
        };
      })
    );
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    const validPasscodes = ["pratap123"];
    if (validPasscodes.includes(passcode.trim())) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem("pratap_admin_auth", "true");
        localStorage.setItem("pratap_admin_auth", "true");
      } catch {
        // Ignore
      }
    } else {
      setAuthError(
        isMr
          ? "चुकीचा पासवर्ड! कृपया योग्य पासवर्ड प्रविष्ट करा."
          : "Invalid passcode! Please enter correct passcode."
      );
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode("");
    try {
      sessionStorage.removeItem("pratap_admin_auth");
      localStorage.removeItem("pratap_admin_auth");
    } catch {
      // Ignore
    }
  };

  // Save Settings
  const handleSaveSettings = () => {
    try {
      localStorage.setItem("newpratap_admin_announcement", announcementText);
      localStorage.setItem("newpratap_admin_emergency", JSON.stringify(emergencyAlert));
      localStorage.setItem("newpratap_admin_livestream", JSON.stringify(liveStreamStatus));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch {
      // Ignore
    }
  };

  // Delete wish
  const handleDeleteWish = (id: string) => {
    setWishesList((prev) => {
      const updated = prev.filter((w) => w.id !== id);
      try {
        localStorage.setItem("newpratap_devotee_wishes", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  // Photo file change handler with client-side optimization
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsOptimizing(true);

    try {
      // Auto-resize max 1600px with HTML5 canvas
      const result = await optimizeImage(file, 1600, 0.82);
      setOptimizedPreview(result.dataUrl);
      setImageMeta({
        originalSize: result.originalSize,
        optimizedSize: result.optimizedSize,
        width: result.width,
        height: result.height,
      });
    } catch {
      // Fallback to object URL
      setOptimizedPreview(URL.createObjectURL(file));
    } finally {
      setIsOptimizing(false);
    }
  };

  // Save photo to gallery
  const handleSavePhoto = () => {
    if (!optimizedPreview || !photoTitle.trim()) return;

    setPhotoUploadSuccess(true);
    setTimeout(() => {
      setPhotoUploadSuccess(false);
      setSelectedFile(null);
      setOptimizedPreview(null);
      setImageMeta(null);
      setPhotoTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 2000);
  };

  // Format bytes to KB/MB
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // ── 1. LOGIN SCREEN ─────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 animate-fade-in-up">
        <div className="rounded-3xl border-2 border-gold/40 bg-card p-6 sm:p-8 shadow-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-gold text-white shadow-md mb-4">
            <Lock size={30} />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/40 px-3 py-0.5 text-xs font-bold text-gold uppercase tracking-wider">
            <ShieldCheck size={13} />
            {isMr ? "मंडळ अधिकृत नियंत्रण कक्ष" : "Mandal Authorized Control"}
          </span>

          <h1 className="deva-heading text-2xl font-extrabold text-foreground mt-2">
            {isMr ? "प्रशासक लॉगिन" : "Admin Login"}
          </h1>

          <p className="deva-body text-xs sm:text-sm text-muted-foreground mt-1">
            {isMr
              ? "न्यु प्रताप मित्र मंडळाच्या कार्यकारिणी सदस्यांसाठी राखीव नियंत्रण कक्ष."
              : "Restricted administrative panel for New Pratap Mitra Mandal committee members."}
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
            {authError && (
              <div className="rounded-xl border border-red-500/30 bg-red-50 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300">
                {authError}
              </div>
            )}

            <div>
              <label className="deva-body block text-xs font-bold text-foreground mb-1">
                {isMr ? "प्रशासक पासवर्ड (Admin Passcode):" : "Admin Passcode:"}
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono tracking-widest text-center"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-2xl gradient-primary py-3.5 text-sm font-extrabold text-white shadow hover:opacity-95 transition-all min-h-[48px]"
            >
              <Unlock size={16} />
              <span>{isMr ? "लॉगिन करा" : "Login"}</span>
            </button>
          </form>

          {/* Committee Quick Note */}
          <div className="mt-6 pt-5 border-t border-border text-center text-[11px] text-muted-foreground">
            <p>
              {isMr
                ? "अध्यक्ष: श्री. मिलिंद चौधरी | तांत्रिक सहाय्य: श्री. सुमित चौधरी"
                : "President: Milind Chaudhari | Tech Support: Sumit Chaudhari"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── 2. AUTHENTICATED DASHBOARD ───────────────────────────
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
      {/* ── TOP ADMIN BAR ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-3xl border-2 border-gold/40 bg-gradient-to-r from-primary/10 via-card to-gold/10 p-5 sm:p-6 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary text-white shadow">
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="deva-heading text-lg sm:text-xl font-extrabold text-foreground">
                {isMr ? "प्रशासक नियंत्रण कक्ष" : "Mandal Admin Dashboard"}
              </h1>
              <span className="rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-extrabold border border-emerald-500/40">
                {isMr ? "सक्रिय" : "Active"}
              </span>
            </div>
            <p className="deva-body text-xs text-muted-foreground mt-0.5">
              {isMr
                ? "न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा — नवरात्रोत्सव २०२६"
                : "New Pratap Mitra Mandal, Dangarvada Asoda — Navratri 2026"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-50 dark:bg-red-950/20 px-4 py-2.5 text-xs font-bold text-red-700 dark:text-red-300 hover:bg-red-100 transition-all min-h-[42px]"
        >
          <LogOut size={14} />
          <span>{isMr ? "लॉगआउट" : "Logout"}</span>
        </button>
      </div>

      {/* ── QUICK METRICS ─────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">
            {isMr ? "उत्सव वर्ष" : "Festival Year"}
          </span>
          <div className="text-xl sm:text-2xl font-black text-primary mt-0.5">२०२६</div>
          <span className="text-[10px] text-accent font-semibold">६ वी महाविद्या</span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">
            {isMr ? "एकूण शुभेच्छा" : "Total Wishes"}
          </span>
          <div className="text-xl sm:text-2xl font-black text-foreground mt-0.5">
            {wishesList.length}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">
            {isMr ? "थेट जोडलेल्या" : "Active"}
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">
            {isMr ? "थेट दर्शन स्थिती" : "Live Stream"}
          </span>
          <div className="text-xl sm:text-2xl font-black text-red-500 mt-0.5 flex items-center justify-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
            <span>{liveStreamStatus.isLive ? (isMr ? "सुरु" : "Live") : isMr ? "बंद" : "Off"}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">१०८०p HD</span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">
            {isMr ? "कार्यकारिणी" : "Office Bearers"}
          </span>
          <div className="text-xl sm:text-2xl font-black text-gold mt-0.5">५</div>
          <span className="text-[10px] text-muted-foreground">
            {isMr ? "प्रमुख पदाधिकारी" : "Members"}
          </span>
        </div>
      </div>

      {/* ── DASHBOARD TABS ────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-border">
        {[
          { id: "settings", label_mr: "मुख्य सूचना व थेट दर्शन", label_en: "Site Notices & Live", icon: <Bell size={16} /> },
          { id: "aarti", label_mr: "आरती मानकरी व्यवस्थापन", label_en: "Aarti Mankari", icon: <Flame size={16} /> },
          { id: "wishes", label_mr: `शुभेच्छा व्यवस्थापन (${wishesList.length})`, label_en: `Wishes (${wishesList.length})`, icon: <MessageSquareHeart size={16} /> },
          { id: "photos", label_mr: "फोटो अपलोड (1600px Max)", label_en: "Photo Upload", icon: <ImageIcon size={16} /> },
          { id: "programme", label_mr: "कार्यक्रम व पदाधिकारी", label_en: "Schedule & Contacts", icon: <Calendar size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            type="button"
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all min-h-[44px] whitespace-nowrap border ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#A51C1D] via-[#CC3C1F] to-[#E55D1C] text-white border-primary shadow-sm"
                : "bg-card text-foreground/80 border-border hover:bg-muted"
            }`}
          >
            {tab.icon}
            <span>{isMr ? tab.label_mr : tab.label_en}</span>
          </button>
        ))}
      </div>

      {/* ── TAB 1: SITE SETTINGS & BROADCAST ──────────────── */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {isMr ? "वेबसाइट शीर्ष सूचना पट्टी (Announcement Marquee)" : "Announcement Marquee"}
              </span>
              <p className="deva-body text-xs text-muted-foreground mt-0.5">
                {isMr
                  ? "वेबसाइटच्या सर्वात वर फिरणाऱ्या पिवळ्या/लाल पट्टीवरील सूचना."
                  : "The top announcement banner displayed across all pages."}
              </p>
            </div>

            <div>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {/* Live Preview of Marquee */}
            <div className="rounded-xl border border-gold/40 bg-gold/15 p-3 text-xs font-bold text-slate-900 dark:text-gold flex items-center gap-2">
              <Sparkles size={14} className="text-primary flex-shrink-0" />
              <span className="truncate">
                {isMr ? "थेट पूर्वावलोकन: " : "Live Preview: "}
                {announcementText}
              </span>
            </div>
          </div>

          {/* Emergency Alert Banner Toggle */}
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                  <AlertTriangle size={14} />
                  {isMr ? "महत्त्वाची विशेष सूचना (Emergency Alert)" : "Special Alert Banner"}
                </span>
                <p className="deva-body text-xs text-muted-foreground mt-0.5">
                  {isMr
                    ? "महाप्रसाद, आरती वेळेतील बदल किंवा तातडीची घोषणा दाखवण्यासाठी."
                    : "For urgent updates such as prasad timings or sudden weather notices."}
                </p>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                onClick={() =>
                  setEmergencyAlert({
                    ...emergencyAlert,
                    enabled: !emergencyAlert.enabled,
                  })
                }
                className={`flex h-8 w-14 items-center rounded-full p-1 transition-all ${
                  emergencyAlert.enabled ? "bg-emerald-600 justify-end" : "bg-muted justify-start"
                }`}
              >
                <span className="h-6 w-6 rounded-full bg-white shadow-md" />
              </button>
            </div>

            {emergencyAlert.enabled && (
              <div className="space-y-2 animate-fade-in">
                <textarea
                  rows={2}
                  value={emergencyAlert.text}
                  onChange={(e) =>
                    setEmergencyAlert({ ...emergencyAlert, text: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                <div className="rounded-xl border border-accent/40 bg-accent/10 p-3 text-xs text-accent font-bold">
                  🔔 {emergencyAlert.text}
                </div>
              </div>
            )}
          </div>

          {/* Live Darshan Stream Settings */}
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
                <Radio size={14} />
                {isMr ? "थेट दर्शन व्हिडिओ लिंक (Live Darshan Stream)" : "Live Darshan Stream Link"}
              </span>
              <p className="deva-body text-xs text-muted-foreground mt-0.5">
                {isMr
                  ? "YouTube Live, Facebook Live किंवा RTMP व्हिडिओ लिंक प्रविष्ट करा."
                  : "Update the live stream video link embedded in /live."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={liveStreamStatus.videoUrl}
                onChange={(e) =>
                  setLiveStreamStatus({ ...liveStreamStatus, videoUrl: e.target.value })
                }
                className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-500/40"
              />
              <button
                type="button"
                onClick={() =>
                  setLiveStreamStatus({
                    ...liveStreamStatus,
                    isLive: !liveStreamStatus.isLive,
                  })
                }
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all min-h-[44px] ${
                  liveStreamStatus.isLive
                    ? "bg-red-600 text-white shadow"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {liveStreamStatus.isLive
                  ? isMr
                    ? "🔴 लाइव्ह सुरु आहे"
                    : "🔴 Currently LIVE"
                  : isMr
                  ? "⚪ ऑफलाइन करा"
                  : "⚪ Set Offline"}
              </button>
            </div>
          </div>

          {/* Save Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveSettings}
              type="button"
              className="flex items-center justify-center gap-2 rounded-2xl gradient-primary px-8 py-3.5 text-sm font-extrabold text-white shadow-lg hover:shadow-xl transition-all min-h-[48px]"
            >
              <Save size={16} />
              <span>{isMr ? "बदल जतन करा (Save Settings)" : "Save Settings"}</span>
            </button>

            {saveSuccess && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 animate-fade-in">
                <CheckCircle2 size={16} />
                <span>{isMr ? "सर्व बदल यशस्वीरीत्या सेव्ह झाले!" : "Settings saved successfully!"}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: AARTI MANKARI MANAGEMENT ─────────────────── */}
      {activeTab === "aarti" && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="rounded-3xl border border-gold/40 bg-gradient-to-r from-primary/10 via-card to-gold/10 p-5 sm:p-7 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/50 px-3 py-0.5 text-xs font-bold text-gold uppercase tracking-wider">
                <Flame size={13} className="text-primary" />
                {isMr ? "दैनिक महाआरती मानकरी व्यवस्थापन" : "Daily Aarti Mankari Editor"}
              </span>
              <h3 className="deva-heading text-lg sm:text-2xl font-extrabold text-foreground mt-1">
                {isMr ? "१० दिवसांचे आरती मानकरी नोंदवा व संपादित करा" : "Assign Daily Aarti Hosts (1-10 Days)"}
              </h3>
              <p className="deva-body text-xs sm:text-sm text-muted-foreground mt-0.5">
                {isMr
                  ? "येथे प्रविष्ट केलेले यजमान, मानकरी, पद व प्रसादाचे नाव त्वरित /aarti पृष्ठावर सर्व भाविकांना दिसेल."
                  : "Names and roles entered here will update immediately on the /aarti page for all visitors."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/aarti#aarti-yajman"
                target="_blank"
                className="flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-all min-h-[40px]"
              >
                <Eye size={14} />
                <span>{isMr ? "आरती पृष्ठ पहा" : "View Aarti Page"}</span>
              </Link>
            </div>
          </div>

          {/* Day Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {aartiSchedule.map((dayItem) => {
              const isSelected = dayItem.day === selectedAartiDay;
              const hasMorning = Boolean(dayItem.morningAarti.yajman_mr?.trim());
              const hasEvening = Boolean(dayItem.eveningAarti.yajman_mr?.trim());
              const isComplete = hasMorning && hasEvening;
              const isPartial = (hasMorning || hasEvening) && !isComplete;

              return (
                <button
                  key={dayItem.day}
                  type="button"
                  onClick={() => setSelectedAartiDay(dayItem.day)}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all min-h-[42px] whitespace-nowrap border ${
                    isSelected
                      ? "bg-gradient-to-r from-[#A51C1D] via-[#CC3C1F] to-[#E55D1C] text-white border-primary shadow-sm scale-105"
                      : "bg-card text-foreground/80 border-border hover:bg-muted"
                  }`}
                >
                  <span>{isMr ? `दिवस ${dayItem.day}` : `Day ${dayItem.day}`}</span>
                  {isComplete && <span className="h-2 w-2 rounded-full bg-emerald-400" title="दोन्ही मानकरी निश्चित" />}
                  {isPartial && <span className="h-2 w-2 rounded-full bg-amber-400" title="एक मानकरी निश्चित" />}
                </button>
              );
            })}
          </div>

          {/* Active Day Edit Form */}
          {(() => {
            const currentDay =
              aartiSchedule.find((d) => d.day === selectedAartiDay) || aartiSchedule[0];

            return (
              <div id="aarti-edit-card" className="rounded-3xl border-2 border-gold/40 bg-card p-5 sm:p-7 shadow-sm space-y-6 scroll-mt-20">
                {/* Active Day Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary text-white font-extrabold px-3 py-0.5 text-xs shadow-sm">
                        {isMr ? `दिवस ${currentDay.day}` : `Day ${currentDay.day}`}
                      </span>
                      <span className="deva-heading font-extrabold text-sm sm:text-base text-foreground">
                        {isMr ? currentDay.date_mr : currentDay.date_en}
                      </span>
                    </div>
                    <h4 className="deva-heading text-lg sm:text-xl font-black text-foreground mt-1">
                      {isMr ? currentDay.devi_mr : currentDay.devi_en}
                    </h4>
                    {currentDay.specialOccasion_mr && (
                      <p className="deva-body text-xs font-bold text-accent mt-0.5">
                        ✨ {isMr ? currentDay.specialOccasion_mr : currentDay.specialOccasion_en}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClearDayAarti(currentDay.day)}
                    className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 hover:underline font-semibold"
                  >
                    <RotateCcw size={12} />
                    <span>{isMr ? "या दिवसाची सर्व नावे पुसा" : "Clear Both Sessions"}</span>
                  </button>
                </div>

                {/* 2-Column Morning & Evening Forms */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 1. MORNING AARTI */}
                  <div className="rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🌅</span>
                        <div>
                          <h5 className="deva-heading text-base font-extrabold text-foreground">
                            {isMr ? "सकाळची महाआरती" : "Morning Maha Aarti"}
                          </h5>
                          <span className="text-[11px] text-muted-foreground">
                            {isMr ? "वेळ: सकाळी ०७:०० / ०८:३०" : "Morning Slot"}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleClearSession(currentDay.day, "morningAarti")}
                        className="text-[11px] text-muted-foreground hover:text-red-600 transition-colors"
                      >
                        {isMr ? "रिकामा करा" : "Clear"}
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="deva-body block text-xs font-bold text-foreground">
                          {isMr ? "आरती मानकरी / यजमान नाव *" : "Aarti Mankari / Yajman Name *"}
                        </label>
                        {/[a-zA-Z]/.test(currentDay.morningAarti.yajman_mr) && (
                          <button
                            type="button"
                            onClick={() =>
                              handleMankariBlur(
                                currentDay.day,
                                "morningAarti",
                                currentDay.morningAarti.yajman_mr
                              )
                            }
                            className="inline-flex items-center gap-1 rounded-md bg-gold/20 px-2 py-0.5 text-[11px] font-bold text-gold hover:bg-gold/30 transition-colors"
                          >
                            <Sparkles size={11} className="text-primary" />
                            <span>{isMr ? "मराठीत करा (A -> अ)" : "Translate to Marathi"}</span>
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={currentDay.morningAarti.yajman_mr}
                        onChange={(e) =>
                          handleMankariInputChange(
                            currentDay.day,
                            "morningAarti",
                            e.target.value
                          )
                        }
                        onBlur={(e) =>
                          handleMankariBlur(
                            currentDay.day,
                            "morningAarti",
                            e.target.value
                          )
                        }
                        placeholder={
                          isMr
                            ? "उदा. श्री. मिलिंद चौधरी व परिवार (इंग्रजीत टाईप केल्यास आपोआप मराठी होईल)"
                            : "e.g. Milind Chaudhari & Family (auto-translates to Marathi)"
                        }
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      />
                      <p className="deva-body text-[11px] text-muted-foreground mt-1">
                        {isMr
                          ? "💡 इंग्रजीत टाईप केल्यास (उदा. Milind Chaudhari) स्पेस दिल्यावर किंवा बाहेर क्लिक केल्यावर ते आपोआप मराठी देवनागरीत होईल."
                          : "💡 Typing in English automatically transliterates to Marathi Devanagari script."}
                      </p>
                    </div>

                    <div>
                      <label className="deva-body block text-xs font-bold text-foreground mb-1">
                        {isMr ? "आरती वेळ" : "Aarti Time"}
                      </label>
                      <input
                        type="text"
                        value={currentDay.morningAarti.time}
                        onChange={(e) =>
                          handleUpdateAartiSession(
                            currentDay.day,
                            "morningAarti",
                            "time",
                            e.target.value
                          )
                        }
                        placeholder="सकाळी ०७:००"
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>
                  </div>

                  {/* 2. EVENING AARTI */}
                  <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-primary/20 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🌆</span>
                        <div>
                          <h5 className="deva-heading text-base font-extrabold text-foreground">
                            {isMr ? "सायंकाळची भव्य महाआरती" : "Evening Maha Aarti"}
                          </h5>
                          <span className="text-[11px] text-muted-foreground">
                            {isMr ? "वेळ: सायंकाळी ०७:००" : "Evening Slot"}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleClearSession(currentDay.day, "eveningAarti")}
                        className="text-[11px] text-muted-foreground hover:text-red-600 transition-colors"
                      >
                        {isMr ? "रिकामा करा" : "Clear"}
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="deva-body block text-xs font-bold text-foreground">
                          {isMr ? "आरती मानकरी / यजमान नाव *" : "Aarti Mankari / Yajman Name *"}
                        </label>
                        {/[a-zA-Z]/.test(currentDay.eveningAarti.yajman_mr) && (
                          <button
                            type="button"
                            onClick={() =>
                              handleMankariBlur(
                                currentDay.day,
                                "eveningAarti",
                                currentDay.eveningAarti.yajman_mr
                              )
                            }
                            className="inline-flex items-center gap-1 rounded-md bg-primary/20 px-2 py-0.5 text-[11px] font-bold text-primary hover:bg-primary/30 transition-colors"
                          >
                            <Sparkles size={11} className="text-accent" />
                            <span>{isMr ? "मराठीत करा (A -> अ)" : "Translate to Marathi"}</span>
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={currentDay.eveningAarti.yajman_mr}
                        onChange={(e) =>
                          handleMankariInputChange(
                            currentDay.day,
                            "eveningAarti",
                            e.target.value
                          )
                        }
                        onBlur={(e) =>
                          handleMankariBlur(
                            currentDay.day,
                            "eveningAarti",
                            e.target.value
                          )
                        }
                        placeholder={
                          isMr
                            ? "उदा. श्री. संकेत चौधरी व परिवार (इंग्रजीत टाईप केल्यास आपोआप मराठी होईल)"
                            : "e.g. Sanket Chaudhari & Family (auto-translates to Marathi)"
                        }
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                      <p className="deva-body text-[11px] text-muted-foreground mt-1">
                        {isMr
                          ? "💡 इंग्रजीत टाईप केल्यास (उदा. Sanket Chaudhari) स्पेस दिल्यावर किंवा बाहेर क्लिक केल्यावर ते आपोआप मराठी देवनागरीत होईल."
                          : "💡 Typing in English automatically transliterates to Marathi Devanagari script."}
                      </p>
                    </div>

                    <div>
                      <label className="deva-body block text-xs font-bold text-foreground mb-1">
                        {isMr ? "आरती वेळ" : "Aarti Time"}
                      </label>
                      <input
                        type="text"
                        value={currentDay.eveningAarti.time}
                        onChange={(e) =>
                          handleUpdateAartiSession(
                            currentDay.day,
                            "eveningAarti",
                            "time",
                            e.target.value
                          )
                        }
                        placeholder="सायंकाळी ०७:००"
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Changes Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={handleSaveAartiSchedule}
                    className="flex items-center justify-center gap-2 rounded-2xl gradient-primary px-8 py-3.5 text-sm font-extrabold text-white shadow-lg hover:shadow-xl transition-all min-h-[48px]"
                  >
                    <Save size={16} />
                    <span>{isMr ? "आरती मानकरी बदल सेव्ह करा" : "Save Aarti Mankari"}</span>
                  </button>

                  {aartiSaveSuccess && (
                    <div className="flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 animate-fade-in">
                      <CheckCircle2 size={16} />
                      <span>
                        {isMr
                          ? "माहिती सेव्ह झाली! आरती पृष्ठावर त्वरित अपडेट झाली आहे."
                          : "Saved! Updated live on /aarti page."}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* All 10 Days At-a-Glance Table */}
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-4">
            <h4 className="deva-heading font-extrabold text-base sm:text-lg text-foreground">
              {isMr ? "१० दिवसांची संक्षिप्त मानकरी सूची" : "10-Day Aarti Mankari Overview"}
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="p-2.5 font-bold">{isMr ? "दिवस" : "Day"}</th>
                    <th className="p-2.5 font-bold">{isMr ? "तारीख व देवी स्वरूप" : "Date & Form"}</th>
                    <th className="p-2.5 font-bold">{isMr ? "सकाळ मानकरी (🌅)" : "Morning Host"}</th>
                    <th className="p-2.5 font-bold">{isMr ? "सायंकाळ मानकरी (🌆)" : "Evening Host"}</th>
                    <th className="p-2.5 font-bold text-right">{isMr ? "कृती" : "Action"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {aartiSchedule.map((d) => (
                    <tr
                      key={d.day}
                      className={`hover:bg-muted/20 transition-colors ${
                        d.day === selectedAartiDay ? "bg-primary/5 font-semibold" : ""
                      }`}
                    >
                      <td className="p-2.5 font-bold text-foreground">
                        {isMr ? `दिवस ${d.day}` : `Day ${d.day}`}
                      </td>
                      <td className="p-2.5 text-muted-foreground truncate max-w-[160px]">
                        {isMr ? d.devi_mr : d.devi_en}
                      </td>
                      <td className="p-2.5">
                        {d.morningAarti.yajman_mr ? (
                          <span className="font-bold text-foreground flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>{d.morningAarti.yajman_mr}</span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground italic">
                            {isMr ? "— घोषित नाही —" : "— Unassigned —"}
                          </span>
                        )}
                      </td>
                      <td className="p-2.5">
                        {d.eveningAarti.yajman_mr ? (
                          <span className="font-bold text-foreground flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>{d.eveningAarti.yajman_mr}</span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground italic">
                            {isMr ? "— घोषित नाही —" : "— Unassigned —"}
                          </span>
                        )}
                      </td>
                      <td className="p-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAartiDay(d.day);
                            document
                              .getElementById("aarti-edit-card")
                              ?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="rounded-lg bg-muted px-2.5 py-1 text-[11px] font-bold text-foreground hover:bg-primary hover:text-white transition-all min-h-[30px]"
                        >
                          {isMr ? "संपादित करा" : "Edit"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: WISHES MODERATION ──────────────────────── */}
      {activeTab === "wishes" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-gold/40 bg-card p-4 sm:p-6 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="deva-heading font-extrabold text-base sm:text-lg text-foreground">
                {isMr ? "भाविकांच्या शुभेच्छांचे नियमन" : "Devotee Wishes Moderation"}
              </h3>
              <p className="deva-body text-xs text-muted-foreground">
                {isMr
                  ? "अयोग्य संदेश हटवा किंवा अधिकृत शिक्का द्या."
                  : "Review, approve, or remove submitted wishes."}
              </p>
            </div>
            <span className="rounded-full bg-gold/20 text-gold px-3 py-1 text-xs font-extrabold">
              {wishesList.length} {isMr ? "प्रार्थना" : "Wishes"}
            </span>
          </div>

          <div className="space-y-3">
            {wishesList.map((wish) => (
              <div
                key={wish.id}
                className="rounded-2xl border border-border bg-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:border-gold/40 transition-all"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="deva-heading font-extrabold text-sm text-foreground">
                      {wish.name}
                    </span>
                    <span className="text-xs text-muted-foreground">({wish.village})</span>
                    <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-bold">
                      {wish.timestamp}
                    </span>
                    {wish.isOfficial && (
                      <span className="rounded-full bg-gold/20 text-gold px-2 py-0.2 text-[10px] font-bold">
                        {isMr ? "अधिकृत" : "Official"}
                      </span>
                    )}
                  </div>
                  <p className="deva-body text-xs sm:text-sm text-foreground/90 italic">
                    &ldquo;{wish.message}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleDeleteWish(wish.id)}
                    type="button"
                    className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-50 dark:bg-red-950/20 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition-all"
                    title={isMr ? "हटवा" : "Delete"}
                  >
                    <Trash2 size={13} />
                    <span>{isMr ? "हटवा" : "Delete"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: CLIENT-OPTIMIZED PHOTO UPLOADER ────────── */}
      {activeTab === "photos" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {isMr ? "क्लायंट-साइड इमेज ऑप्टिमायझेशन (कमाल १६००px)" : "Client-Side Image Optimizer (Max 1600px)"}
              </span>
              <p className="deva-body text-xs text-muted-foreground mt-0.5">
                {isMr
                  ? "मोबाईल डेटा वाचवण्यासाठी फोटो आपोआप कॉम्प्रेश व रिसाइज होतो."
                  : "Photos automatically compressed & resized before upload to preserve mobile bandwidth."}
              </p>
            </div>

            {/* Drag & Drop File Picker */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer rounded-2xl border-2 border-dashed border-gold/60 bg-gold/5 hover:bg-gold/10 p-8 text-center transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                className="hidden"
              />
              <Upload size={36} className="mx-auto text-gold mb-2" />
              <p className="deva-heading text-sm font-bold text-foreground">
                {isMr ? "छायाचित्र निवडा किंवा येथे ओढा" : "Select or Drop Photo Here"}
              </p>
              <p className="deva-body text-xs text-muted-foreground mt-1">
                {isMr ? "JPEG, PNG किंवा WebP फॉरमॅट" : "JPEG, PNG or WebP format"}
              </p>
            </div>

            {isOptimizing && (
              <div className="text-center py-4 text-xs font-bold text-accent animate-pulse">
                ⏳ {isMr ? "फोटो ऑप्टिमाइझ होत आहे (HTML5 Canvas)..." : "Optimizing photo via HTML5 Canvas..."}
              </div>
            )}

            {/* Preview & Optimization Stats */}
            {optimizedPreview && imageMeta && (
              <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative aspect-[4/3] w-full sm:w-48 overflow-hidden rounded-xl border border-border shadow">
                    <Image
                      src={optimizedPreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2 flex-1 text-xs">
                    <span className="rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 font-bold">
                      {isMr ? "ऑप्टिमायझेशन पूर्ण ✨" : "Optimized ✨"}
                    </span>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div>
                        <span className="text-muted-foreground">
                          {isMr ? "मूळ साईझ:" : "Original Size:"}
                        </span>{" "}
                        <span className="font-mono font-bold">{formatBytes(imageMeta.originalSize)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          {isMr ? "नवीन साईझ:" : "New Size:"}
                        </span>{" "}
                        <span className="font-mono font-bold text-emerald-600">
                          {formatBytes(imageMeta.optimizedSize)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          {isMr ? "डायमेंशन्स:" : "Dimensions:"}
                        </span>{" "}
                        <span className="font-mono">{imageMeta.width} × {imageMeta.height} px</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          {isMr ? "बचत:" : "Bandwidth Saved:"}
                        </span>{" "}
                        <span className="font-bold text-emerald-600">
                          {Math.round(
                            ((imageMeta.originalSize - imageMeta.optimizedSize) /
                              imageMeta.originalSize) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title & Category Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="deva-body block text-xs font-bold text-foreground mb-1">
                      {isMr ? "छायाचित्राचे शीर्षक *" : "Photo Title *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      placeholder={isMr ? "उदा. महाआरती सोहळा २०२६" : "e.g. Maha Aarti 2026"}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <div>
                    <label className="deva-body block text-xs font-bold text-foreground mb-1">
                      {isMr ? "प्रकार (Category)" : "Category"}
                    </label>
                    <select
                      value={photoCategory}
                      onChange={(e) => setPhotoCategory(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <option value="idol">{isMr ? "मूर्ती दर्शन" : "Idol Darshan"}</option>
                      <option value="mandap">{isMr ? "मंडप व रोषणाई" : "Pandal & Lighting"}</option>
                      <option value="aarti">{isMr ? "महाआरती" : "Maha Aarti"}</option>
                      <option value="karyakarte">{isMr ? "कार्यकर्ते व संघटक" : "Volunteers"}</option>
                      <option value="prasad">{isMr ? "महाप्रसाद अन्नदान" : "Mahaprasad"}</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSavePhoto}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl gradient-primary py-3.5 text-sm font-extrabold text-white shadow hover:opacity-95 transition-all min-h-[48px]"
                >
                  <Upload size={16} />
                  <span>{isMr ? "गॅलरीमध्ये जोडा (Save to Gallery)" : "Save to Gallery"}</span>
                </button>
              </div>
            )}

            {photoUploadSuccess && (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/30 p-4 text-center text-xs font-bold text-emerald-700 dark:text-emerald-200 animate-fade-in">
                ✅ {isMr ? "छायाचित्र यशस्वीरीत्या गॅलरीमध्ये जोडले गेले!" : "Photo added to gallery successfully!"}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB 4: PROGRAMME & CONTACTS ───────────────────── */}
      {activeTab === "programme" && (
        <div className="space-y-6">
          {/* Executive Committee Bearers */}
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {isMr ? "उत्सव कार्यकारिणी पदाधिकारी" : "Executive Committee Directory"}
              </span>
              <h3 className="deva-heading text-lg font-bold text-foreground mt-0.5">
                {isMr ? "प्रमुख संपर्क व जबाबदारी" : "Official Leadership"}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COMMITTEE_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-border/80 bg-background p-4 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-bold">
                      {isMr ? member.role_mr : member.role_en}
                    </span>
                  </div>
                  <h4 className="deva-heading font-extrabold text-sm sm:text-base text-foreground">
                    {isMr ? member.name_mr : member.name_en}
                  </h4>
                  <a
                    href={`tel:${member.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-bold"
                  >
                    <Phone size={12} />
                    <span>{member.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
