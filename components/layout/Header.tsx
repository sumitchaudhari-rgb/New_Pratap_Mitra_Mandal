"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Globe, Heart, Flame, ShieldCheck } from "lucide-react";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "idol", href: "/idol" },
  { key: "deviForms", href: "/devi-forms" },
  { key: "gallery", href: "/gallery" },
  { key: "programme", href: "/programme" },
  { key: "aarti", href: "/aarti" },
  { key: "live", href: "/live" },
  { key: "community", href: "/community" },
  { key: "wishes", href: "/wishes" },
  { key: "quiz", href: "/quiz" },
  { key: "contact", href: "/contact" },
  { key: "admin", href: "/admin" },
] as const;

function useLocale() {
  const pathname = usePathname();
  return pathname.startsWith("/en") ? "en" : "mr";
}

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleLocale() {
    const newLocale = locale === "mr" ? "en" : "mr";
    // Replace the locale segment in the pathname
    const newPath = pathname.replace(/^\/(mr|en)/, `/${newLocale}`);
    router.push(newPath);
  }

  function localePath(href: string) {
    return `/${locale}${href}`;
  }

  return (
    <>
      <header
        className="header-blur sticky top-0 z-40 w-full"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-6">
          {/* Brand / Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 min-h-[44px]"
            aria-label="Homepage"
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary shadow-sm"
              aria-hidden="true"
            >
              <Flame size={18} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="deva-heading text-sm font-semibold leading-tight">
                न्यु प्रताप मित्र मंडळ
              </p>
              <p className="text-[10px] text-muted-foreground leading-none">
                डांगरवाडा असोदा
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={localePath(href)}
                className={cn(
                  "deva-body px-3 py-1.5 rounded-md text-sm transition-colors hover:text-primary min-h-[44px] flex items-center",
                  pathname === localePath(href)
                    ? "text-primary font-semibold"
                    : "text-foreground/75"
                )}
              >
                {t(key as keyof typeof t)}
              </Link>
            ))}
          </nav>

          {/* Right: Language + Donate + Hamburger */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted min-h-[44px]"
              aria-label={locale === "mr" ? "Switch to English" : "मराठीत बदला"}
            >
              <Globe size={14} aria-hidden="true" />
              <span>{locale === "mr" ? "EN" : "मरा"}</span>
            </button>

            {/* Donate button — desktop only */}
            <Link
              href={localePath("/community#donate")}
              className="hidden sm:flex items-center gap-1.5 gradient-primary text-white text-sm font-semibold rounded-full px-4 py-2 min-h-[44px] transition-opacity hover:opacity-90 shadow-sm"
            >
              <Heart size={14} aria-hidden="true" />
              {t("donate")}
            </Link>

            {/* Admin button — always visible */}
            <Link
              href={localePath("/admin")}
              className="flex items-center gap-1 rounded-full border border-gold/50 bg-gold/15 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-gold hover:bg-gold/25 transition-colors min-h-[44px]"
              title={locale === "mr" ? "प्रशासक नियंत्रण कक्ष" : "Admin Panel"}
            >
              <ShieldCheck size={15} className="text-primary" />
              <span>{locale === "mr" ? "प्रशासक" : "Admin"}</span>
            </Link>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex lg:hidden items-center justify-center rounded-md p-2 min-h-[44px] min-w-[44px] hover:bg-muted transition-colors"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sheet Menu */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
        navLinks={NAV_LINKS}
      />
    </>
  );
}
