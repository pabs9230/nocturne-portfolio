import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nocturne.dev").replace(/\/$/, "");
const canonicalUrl = `${siteUrl}/services`;
const whatsappUrl =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ??
  "https://api.whatsapp.com/send?text=Hello%20Nocturne%2C%20I%20want%20a%20quote%20for%20a%20landing%20page%20project.";

export const metadata: Metadata = {
  title: "Landing Page Services | Senior Freelance Developer in Cancun, Mexico | Nocturne",
  description:
    "Senior freelance landing page development packages for remote, nearshore, and on-site teams in Cancun, Quintana Roo, and the Yucatan Peninsula. Accessible, conversion-focused, campaign-ready delivery.",
  keywords: [
    "senior freelance developer",
    "landing page developer",
    "freelance web developer cancun",
    "nearshore software engineer mexico",
    "remote senior developer latin america",
    "accessible landing page development",
    "conversion-focused landing pages",
    "quintana roo developer",
    "yucatan peninsula software engineer",
    "on-site web development cancun",
    "desarrollador freelance senior",
    "desarrollador landing pages cancun",
    "desarrollador web cancun",
    "desarrollador web quintana roo",
    "desarrollo nearshore mexico",
    "desarrollador remoto mexico",
    "servicios de landing page mexico",
    "diseno web accesible cancun",
    "ingeniero de software cancun",
    "ingeniero de software peninsula de yucatan",
    "desarrollo web presencial cancun",
    "freelancer senior mexico",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Landing Page Services | Nocturne",
    description:
      "Senior freelance landing page development services in Cancun, Mexico. Remote, nearshore, and on-site delivery.",
    siteName: "Nocturne",
    locale: "en_US",
    alternateLocale: ["es_MX"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing Page Services | Nocturne",
    description:
      "Senior freelance landing page development for remote, nearshore, and on-site teams in Cancun, Quintana Roo, and the Yucatan Peninsula.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function ServicesPage() {
  return <ServicesContent canonicalUrl={canonicalUrl} whatsappUrl={whatsappUrl} />;
}
