import type { Metadata } from "next";
import BlackLionLanding from "./BlackLionLanding";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nocturne.dev").replace(/\/$/, "");
const canonicalUrl = `${siteUrl}/demo/black-lion-muay-thai`;
const contactEmailUrl =
  "mailto:pabs9230@gmail.com?subject=Nocturne%20Quote%20Request%20-%20Black%20Lion%20Demo&body=Hello%20Nocturne%2C%20I%20want%20a%20landing%20page%20like%20the%20Black%20Lion%20Muay%20Thai%20demo.";

export const metadata: Metadata = {
  title: "Black Lion Muay Thai Landing Page Demo | Nocturne",
  description:
    "Professional Landing Pro demo for Black Lion Muay Thai, showcasing conversion-oriented structure, FAQ SEO, fictional interactive map, improved lead form, and bilingual UX.",
  keywords: [
    "landing page demo",
    "mma academy website",
    "muay thai landing page",
    "kickboxing website design",
    "bjj academy marketing page",
    "conversion focused landing page",
    "freelance landing page developer",
    "demo website for gym",
    "landing page profesional para academia mma",
    "demo landing page en español",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Black Lion Muay Thai Landing Page Demo",
    description:
      "A polished conversion-oriented landing page demo with bilingual UX, fictional interactive location map, and enhanced lead form.",
    siteName: "Nocturne",
    locale: "en_US",
    alternateLocale: ["es_MX"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Lion Muay Thai Landing Page Demo",
    description:
      "Landing Pro demo for an MMA academy with bilingual content, SEO structure, and conversion-ready sections.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlackLionDemoPage() {
  return <BlackLionLanding canonicalUrl={canonicalUrl} contactEmailUrl={contactEmailUrl} />;
}
