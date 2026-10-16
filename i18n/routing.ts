import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["mr", "en"],
  defaultLocale: "mr",
  localePrefix: "always",
  localeDetection: false,
});
