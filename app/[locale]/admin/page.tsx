import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Home, ChevronRight, ShieldCheck } from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isMr = locale === "mr";

  return {
    title: isMr
      ? "प्रशासक नियंत्रण कक्ष — नवरात्रोत्सव २०२६ | न्यु प्रताप मित्र मंडळ"
      : "Admin Dashboard — Navratri 2026 | New Pratap Mitra Mandal",
    description: isMr
      ? "न्यु प्रताप मित्र मंडळाच्या कार्यकारिणी सदस्यांसाठी सुरक्षित प्रशासक नियंत्रण कक्ष."
      : "Secure administrative dashboard for New Pratap Mitra Mandal committee members.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminPage({ params }: Props) {
  const { locale } = await params;
  const isMr = locale === "mr";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* ── BREADCRUMBS ──────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors min-h-[36px]"
            >
              <Home size={14} />
              <span>{isMr ? "मुख्यपृष्ठ" : "Home"}</span>
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li className="font-semibold text-foreground" aria-current="page">
            {isMr ? "प्रशासक नियंत्रण कक्ष" : "Admin Dashboard"}
          </li>
        </ol>
      </nav>

      {/* ── ADMIN DASHBOARD ──────────────────────────────── */}
      <AdminDashboard locale={locale} />
    </div>
  );
}
