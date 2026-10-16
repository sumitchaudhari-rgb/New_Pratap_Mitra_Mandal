import React from "react";
import Link from "next/link";
import { Home, HelpCircle } from "lucide-react";

export default function RootNotFound() {
  return (
    <html lang="mr">
      <body className="min-h-screen flex items-center justify-center bg-[#FFF8F0] text-[#2D060C] p-4 font-sans">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#8B1A2C] to-[#5B0E1B] text-white shadow-xl">
            <HelpCircle size={40} className="text-[#F5B800]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black">४०४ - पृष्ठ सापडले नाही</h1>
            <p className="text-sm text-gray-700">
              Page Not Found. आपण शोधत असलेले पृष्ठ उपलब्ध नाही.
            </p>
          </div>

          <Link
            href="/mr"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8B1A2C] to-[#E05A1B] px-6 py-3.5 text-sm font-bold text-white shadow hover:opacity-95 transition-all"
          >
            <Home size={18} />
            <span>मुख्य पृष्ठावर जा (Go to Home)</span>
          </Link>
        </div>
      </body>
    </html>
  );
}
