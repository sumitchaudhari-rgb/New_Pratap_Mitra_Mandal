"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  Sparkles,
  Image as ImageIcon,
  Calendar,
  Mic2,
  Radio,
  Users,
  MessageSquareHeart,
  Brain,
  HandHelping,
  Phone,
  Heart,
  MessageCircle,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

type NavLink = { key: string; href: string };

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  locale: string;
  navLinks: readonly NavLink[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  home: <Home size={20} />,
  idol: <Sparkles size={20} />,
  deviForms: <Flame size={20} />,
  gallery: <ImageIcon size={20} />,
  programme: <Calendar size={20} />,
  aarti: <Mic2 size={20} />,
  live: <Radio size={20} />,
  community: <Users size={20} />,
  wishes: <MessageSquareHeart size={20} />,
  quiz: <Brain size={20} />,
  volunteer: <HandHelping size={20} />,
  contact: <Phone size={20} />,
  admin: <ShieldCheck size={20} />,
};

export default function MobileMenu({
  open,
  onClose,
  locale,
  navLinks,
}: MobileMenuProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  function localePath(href: string) {
    return `/${locale}${href}`;
  }

  const allLinks = [
    { key: "home", href: "" },
    ...navLinks,
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col bg-card shadow-2xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary shadow">
              <Flame size={18} className="text-white" />
            </div>
            <div>
              <p className="deva-heading text-sm font-semibold leading-tight">
                न्यु प्रताप मित्र मंडळ
              </p>
              <p className="text-[10px] text-muted-foreground">डांगरवाडा असोदा</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center rounded-md p-2 min-h-[44px] min-w-[44px] hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-3"
          aria-label="Mobile navigation"
        >
          {allLinks.map(({ key, href }) => {
            const path = localePath(href);
            const isActive = pathname === path;
            return (
              <Link
                key={key}
                href={path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3.5 mb-1 text-sm font-medium transition-colors min-h-[52px]",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-muted"
                )}
              >
                <span
                  className={cn(
                    "flex-shrink-0 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                  aria-hidden="true"
                >
                  {ICON_MAP[key]}
                </span>
                <span className="deva-body">{t(key as Parameters<typeof t>[0])}</span>
                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTAs */}
        <div className="border-t border-border px-4 py-4 space-y-3">
          {/* Donate */}
          <Link
            href={localePath("/community#donate")}
            onClick={onClose}
            className="flex items-center justify-center gap-2 gradient-primary text-white font-semibold rounded-xl py-3.5 text-sm min-h-[52px] transition-opacity hover:opacity-90 shadow"
          >
            <Heart size={18} />
            {t("donate")}
          </Link>

          {/* WhatsApp */}
          <a
            href="https://wa.me/91XXXXXXXXXX?text=नमस्कार%20—%20उत्सवाबद्दल%20माहिती%20द्यावी"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 border border-border bg-muted text-foreground font-medium rounded-xl py-3.5 text-sm min-h-[52px] transition-colors hover:bg-muted/70"
          >
            <MessageCircle size={18} className="text-green-600" />
            {t("joinWhatsApp")}
          </a>
        </div>
      </div>
    </>
  );
}
