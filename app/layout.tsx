import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nocturne.dev").replace(/\/$/, "");

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NOCTURNE — Systems Engineer Portfolio",
    template: "%s | NOCTURNE",
  },
  description:
    "Senior systems engineer portfolio and landing page services for remote, nearshore, and on-site teams in Cancun, Quintana Roo, and across Mexico.",
  keywords: [
    "senior freelance developer",
    "systems engineer portfolio",
    "landing page developer",
    "nearshore developer mexico",
    "remote software engineer",
    "cancun web developer",
    "quintana roo developer",
    "yucatan peninsula freelancer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "NOCTURNE",
    title: "NOCTURNE — Systems Engineer Portfolio",
    description:
      "Hybrid tech/art portfolio plus landing page services for remote, nearshore, and on-site collaborations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOCTURNE — Systems Engineer Portfolio",
    description:
      "Senior freelance systems engineer in Cancun, Mexico. Landing page services and architecture-focused portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
