import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
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

// Distinctive display face for headings — geometric grotesk that reads
// "technical but designed", pairs with Geist for body copy.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
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
