import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { CommandPalette } from "@/components/ui/CommandPalette";

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

// Massive condensed display caps — the film-title voice of the noir theme.
const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Editorial serif italic for pull-quotes and human asides between the
// machine-voiced display headings.
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const description =
  "AI & Platform Engineering Tech Lead at CodeGen International. IEEE-published, MSc Software Architecture. Building agentic AI, MCP servers, RAG pipelines.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — AI & Platform Engineering Tech Lead`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Gayashan Kariyawasam",
    "AI Engineer",
    "Technical Team Lead",
    "CodeGen International",
    "Agentic AI",
    "Generative AI",
    "MCP Servers",
    "Model Context Protocol",
    "LangChain",
    "LangGraph",
    "LangSmith",
    "RAG Pipelines",
    "Retrieval-Augmented Generation",
    "LLM Architecture",
    "AI Agents",
    "AI Security",
    "Anthropic Claude",
    "Claude Code",
    "Enterprise AI Strategy",
    "Hospitality Tech",
    "Travel Tech",
    "Sri Lanka",
    "University of Moratuwa",
    "SLIIT",
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: { canonical: profile.siteUrl },
  openGraph: {
    type: "profile",
    url: profile.siteUrl,
    title: `${profile.name} — AI & Platform Engineering Tech Lead`,
    description,
    siteName: profile.name,
    locale: "en_US",
    firstName: "Gayashan",
    lastName: "Kariyawasam",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — AI & Platform Engineering Tech Lead`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI & Platform Engineering Tech Lead`,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "_6mGi9_9zuFeP-Vucsw2vMjVCa0ptTHyKxeQCku8SNE",
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
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${instrumentSerif.variable}`}
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
      <body className="bg-bg text-text antialiased" suppressHydrationWarning>
        <SmoothScroll />
        <Cursor />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
