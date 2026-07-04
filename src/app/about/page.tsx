import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { papers } from "@/data/research";
import {
  aboutBreadcrumbJsonLd,
  profilePageJsonLd,
  scholarlyArticlesJsonLd,
} from "@/lib/seo";
import { GithubIcon, LinkedinIcon, ScholarIcon } from "@/components/ui/icons";

const aboutDescription =
  "Gayashan Kariyawasam is an AI & Platform Engineering Tech Lead at CodeGen International in Colombo, Sri Lanka — IEEE-published, MSc Software Architecture (University of Moratuwa). He builds agentic AI, MCP servers and RAG pipelines.";

export const metadata: Metadata = {
  title: { absolute: `About Gayashan Kariyawasam — ${profile.shortRole}` },
  description: aboutDescription,
  alternates: { canonical: `${profile.siteUrl}/about/` },
  openGraph: {
    type: "profile",
    url: `${profile.siteUrl}/about/`,
    title: `About ${profile.name}`,
    description: aboutDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `About ${profile.name} — ${profile.shortRole}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${profile.name}`,
    description: aboutDescription,
    images: ["/og.png"],
  },
};

// Reciprocal identity links (rel="me") from my own entity home.
const elsewhere = [
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedinIcon },
  { label: "GitHub", href: profile.socials.github, icon: GithubIcon },
  { label: "Google Scholar", href: profile.socials.scholar, icon: ScholarIcon },
  { label: "IEEE Xplore (author)", href: profile.socials.ieeeAuthor, icon: null },
  { label: "Newsletter — From Code to AI Strategy", href: profile.socials.newsletter, icon: null },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumbJsonLd()) }}
      />
      {scholarlyArticlesJsonLd().map((article) => (
        <script
          key={article["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
        />
      ))}

      <main className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait.jpg"
            alt="Gayashan Kariyawasam"
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 rounded-2xl object-cover object-top"
          />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              Gayashan Kariyawasam
            </h1>
            <p className="mt-2 text-text-muted">
              {profile.role} · {profile.location}
            </p>
          </div>
        </header>

        <section className="mt-12 space-y-5 text-lg leading-relaxed text-text-muted">
          <p>
            I&apos;m <span className="text-text">Gayashan Kariyawasam</span>, an{" "}
            <span className="text-text">AI &amp; Platform Engineering Tech Lead</span>{" "}
            at{" "}
            <a
              href={profile.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text underline-offset-4 hover:underline"
            >
              {profile.company}
            </a>{" "}
            in {profile.location}. I design, build and ship{" "}
            <span className="text-text">agentic AI</span> systems end-to-end —
            conversational diagnostic platforms, custom{" "}
            <span className="text-text">Model Context Protocol (MCP)</span>{" "}
            servers, <span className="text-text">RAG pipelines</span> and
            LLM-powered enterprise integrations across travel-tech and
            hospitality.
          </p>
          <p>
            I lead a team of six senior engineers, hold an{" "}
            <a
              href={profile.socials.ieeeAuthor}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text underline-offset-4 hover:underline"
            >
              IEEE publication
            </a>{" "}
            in computer vision, and I&apos;m finishing an MSc in Software
            Architecture at the University of Moratuwa. My current focus is
            agentic AI evaluation, LLM inference optimization, and AI security &amp;
            ethical compliance.
          </p>
          <p className="text-base text-text-subtle">
            This is my personal site and entity home. The links below point to my
            verified profiles elsewhere.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-text">
            What I work on
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profile.currentlyExploring.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-surface/60 px-3 py-1 text-sm text-text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-text">
            Experience
          </h2>
          <ul className="mt-5 space-y-6">
            {experiences.map((e, i) => (
              <li key={i}>
                <div className="font-mono text-xs text-text-subtle">
                  {e.start} — {e.end} · {e.location}
                </div>
                <div className="mt-1 text-lg font-medium text-text">
                  {e.role} ·{" "}
                  <span className="font-normal text-text-muted">{e.company}</span>
                </div>
                <p className="mt-1 text-sm text-text-muted">{e.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-text">
            Education
          </h2>
          <ul className="mt-5 space-y-4">
            {education.map((e) => (
              <li key={e.institution}>
                <div className="font-mono text-xs text-text-subtle">
                  {e.start} — {e.end}
                </div>
                <div className="mt-1 text-text">
                  {e.degree} · {e.field}
                </div>
                <div className="text-sm text-text-muted">{e.institution}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-text">
            Research
          </h2>
          <ul className="mt-5 space-y-4">
            {papers.map((p) => (
              <li key={p.title}>
                <div className="text-text">{p.title}</div>
                <div className="text-sm text-text-muted">
                  {p.venue} · {p.year} · {p.citations}+ citations
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-text">
            Find me elsewhere
          </h2>
          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {elsewhere.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-surface/40 px-4 py-3 text-sm text-text-muted transition-colors hover:border-border-strong hover:text-text"
                >
                  <span className="flex items-center gap-2.5">
                    {s.icon ? <s.icon className="h-4 w-4" /> : null}
                    {s.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
