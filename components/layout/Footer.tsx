import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PhoneCall, MapPin, Flame, Lock } from "lucide-react";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const quickLinks = [
    { key: "idol", href: "/idol" },
    { key: "deviForms", href: "/devi-forms" },
    { key: "gallery", href: "/gallery" },
    { key: "programme", href: "/programme" },
    { key: "aarti", href: "/aarti" },
    { key: "community", href: "/community" },
    { key: "wishes", href: "/wishes" },
    { key: "quiz", href: "/quiz" },
    { key: "contact", href: "/contact" },
  ] as const;

  return (
    <footer className="border-t border-border bg-card" aria-label="Site footer">
      {/* Festive divider */}
      <div className="ornament-divider px-4 pt-8">
        <Flame size={16} />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full gradient-primary shadow">
                <Flame size={20} className="text-white" />
              </div>
              <div>
                <p className="deva-heading text-base font-bold leading-tight">
                  न्यु प्रताप मित्र मंडळ
                </p>
                <p className="text-xs text-muted-foreground">डांगरवाडा असोदा</p>
              </div>
            </div>
            <p className="deva-body text-sm text-muted-foreground leading-relaxed">
              {t("tagline")}
            </p>
            {/* Instagram Follow */}
            <div className="pt-1">
              <a
                href="https://www.instagram.com/new_pratap_?obrf=MTFsOW56aTJteG52NA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-pink-500/30 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 px-3.5 py-2 transition-all hover:border-pink-500/60 hover:shadow-xs group min-h-[44px]"
                aria-label="Instagram @new_pratap_"
              >
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                  <InstagramIcon />
                </div>
                <span className="deva-body text-xs sm:text-sm font-semibold text-foreground group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {t("instagramFollowText")}
                </span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer quick links">
            <h3 className="deva-heading mb-4 text-sm font-semibold uppercase tracking-wide text-foreground/70">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="deva-body text-sm text-muted-foreground transition-colors hover:text-primary min-h-[36px] flex items-center"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="deva-heading mb-4 text-sm font-semibold uppercase tracking-wide text-foreground/70">
              {t("contact")}
            </h3>
            <address className="not-italic space-y-3">
              <a
                href="https://maps.app.goo.gl/ht7fwcWaAjjyT5Ka6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-primary min-h-[44px] group"
                aria-label="Google Maps Location"
              >
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="deva-body hover:underline">
                  {t("address")}
                </span>
              </a>
              <a
                href="tel:02572234567"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary min-h-[44px]"
              >
                <PhoneCall size={16} className="flex-shrink-0 text-primary" aria-hidden="true" />
                <span className="deva-body">{t("landline")}</span>
              </a>
            </address>
          </div>

          {/* Donate column */}
          <div>
            <h3 className="deva-heading mb-4 text-sm font-semibold uppercase tracking-wide text-foreground/70">
              {nav("donate")}
            </h3>
            <Link
              href="/community#donate"
              className="inline-flex items-center gap-2 gradient-primary text-white text-sm font-semibold rounded-xl px-5 py-3 min-h-[48px] transition-opacity hover:opacity-90 shadow"
            >
              {nav("donate")}
            </Link>
            <p className="mt-3 text-xs text-muted-foreground deva-body leading-relaxed">
              देणगी देण्यापूर्वी कृपया मंडळाशी संपर्क करा.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs text-muted-foreground deva-body">
          <p>{t("copyright")}</p>
          <Link
            href="/admin"
            className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity min-h-[32px] px-2 py-1 rounded"
          >
            <Lock size={12} />
            <span>प्रशासक कक्ष</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
