import React from "react";
import Link from "next/link";
import { Home, Flame, Calendar, PhoneCall, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Divine Kalash / Trishul Symbol */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl gradient-primary text-white shadow-xl shadow-primary/20 border-2 border-gold/40">
          <HelpCircle size={48} className="text-gold animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="inline-block rounded-full bg-gold/20 border border-gold/40 px-3 py-1 text-xs font-extrabold text-gold-dark">
            त्रुटी ४०४ • Error 404
          </span>
          <h1 className="deva-heading text-2xl sm:text-3xl font-extrabold text-foreground">
            पृष्ठ सापडले नाही
          </h1>
          <p className="deva-body text-sm text-muted-foreground leading-relaxed">
            आपण शोधत असलेले पान अस्तित्वात नाही किंवा हलवले गेले आहे. खालील दुव्यांवरून आपण मुख्य विभागांमध्ये जाऊ शकता.
          </p>
        </div>

        {/* Primary Action Button */}
        <div>
          <Link
            href="/mr"
            className="inline-flex items-center justify-center gap-2 rounded-2xl gradient-primary px-6 py-3.5 text-sm font-extrabold text-white shadow-lg hover:opacity-95 transition-all min-h-[48px]"
          >
            <Home size={18} />
            <span>मुख्य पृष्ठावर परत जा (Home)</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-6 border-t border-border grid grid-cols-3 gap-2 text-xs">
          <Link
            href="/mr/aarti"
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-card border border-border hover:border-gold/50 transition-all text-muted-foreground hover:text-foreground"
          >
            <Flame size={16} className="text-primary" />
            <span className="deva-body font-bold text-[11px]">दैनिक आरती</span>
          </Link>
          <Link
            href="/mr/programme"
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-card border border-border hover:border-gold/50 transition-all text-muted-foreground hover:text-foreground"
          >
            <Calendar size={16} className="text-gold" />
            <span className="deva-body font-bold text-[11px]">कार्यक्रम</span>
          </Link>
          <Link
            href="/mr/contact"
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-card border border-border hover:border-gold/50 transition-all text-muted-foreground hover:text-foreground"
          >
            <PhoneCall size={16} className="text-primary" />
            <span className="deva-body font-bold text-[11px]">संपर्क</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
