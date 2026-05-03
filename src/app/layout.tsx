import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Gayashan Kariyawasam — Tech Lead & AI Engineer at Codegen International. LLM architecture, AI agent design, evaluation, security, and enterprise AI strategy. Based in Colombo, Sri Lanka. IEEE-published researcher.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — AI Engineer & Tech Lead`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Gayashan Kariyawasam",
    "AI Engineer",
    "Tech Lead",
    "Codegen International",
    "LLM Architecture",
    "AI Agents",
    "AI Security",
    "Enterprise AI Strategy",
    "Sri Lanka",
    "University of Moratuwa",
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: { canonical: profile.siteUrl },
  openGraph: {
    type: "profile",
    url: profile.siteUrl,
    title: `${profile.name} — AI Engineer & Tech Lead`,
    description,
    siteName: profile.name,
    locale: "en_US",
    firstName: "Gayashan",
    lastName: "Kariyawasam",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.name} — AI Engineer & Tech Lead`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI Engineer & Tech Lead`,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#07070b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body className="bg-bg text-text antialiased">
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
