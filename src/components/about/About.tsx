"use client";

import {
  Compass,
  GraduationCap,
  Newspaper,
  Sparkles,
  Sprout,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { profile } from "@/data/profile";
import { papers } from "@/data/research";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/ui/icons";
import { LocationCard } from "./LocationCard";
import { EducationCards } from "./EducationCards";

export function About() {
  const totalCitations = papers.reduce((s, p) => s + p.citations, 0);

  return (
    <section id="about" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">
            01 — About
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-12 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-text sm:text-5xl">
            Engineer who ships,{" "}
            <span className="text-gradient">researcher who writes</span>.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3">
          {/* Bio — large card */}
          <Reveal
            delay={0.1}
            className="glass card-hover sm:col-span-2 lg:col-span-2 lg:row-span-2 rounded-3xl p-8"
          >
            <div className="flex h-full flex-col">
              <p className="mb-4 inline-flex items-center gap-2 text-sm text-text-muted">
                <Sparkles className="h-4 w-4 text-accent" />
                Currently
              </p>
              <p className="text-balance text-xl leading-relaxed text-text sm:text-2xl">
                {profile.longBio}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {profile.currentlyExploring.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Location + clock */}
          <Reveal delay={0.15} className="lg:col-span-1">
            <LocationCard />
          </Reveal>

          {/* IEEE citations */}
          <Reveal delay={0.2} className="lg:col-span-1">
            <a
              href={profile.socials.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="glass card-hover group flex h-full flex-col justify-between rounded-3xl p-6"
            >
              <div className="flex items-center gap-2 text-text-muted">
                <GraduationCap className="h-4 w-4" />
                <span className="text-sm">IEEE Research</span>
              </div>
              <div>
                <div className="font-mono text-5xl font-semibold tracking-tighter text-gradient">
                  {totalCitations}+
                </div>
                <div className="mt-2 text-sm text-text-muted">
                  citations on Google Scholar
                </div>
              </div>
            </a>
          </Reveal>

          {/* GitHub card */}
          <Reveal delay={0.25} className="lg:col-span-1">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass card-hover group flex h-full flex-col justify-between rounded-3xl p-6"
            >
              <div className="flex items-center gap-2 text-text-muted">
                <GithubIcon className="h-4 w-4" />
                <span className="text-sm">Open source</span>
              </div>
              <div>
                <div className="text-xl font-semibold tracking-tight text-text">
                  @gayashankariyawasam
                </div>
                <div className="mt-2 text-sm text-text-muted">
                  Python · TypeScript · Java
                </div>
              </div>
            </a>
          </Reveal>

          {/* Newsletter */}
          <Reveal delay={0.3} className="lg:col-span-1">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass card-hover group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-3xl transition-all group-hover:bg-accent/30" />
              <div className="relative flex items-center gap-2 text-text-muted">
                <Newspaper className="h-4 w-4" />
                <span className="text-sm">Newsletter</span>
              </div>
              <div className="relative">
                <div className="text-lg font-semibold leading-tight tracking-tight text-text">
                  From Code to AI Strategy
                </div>
                <div className="mt-2 text-sm text-text-muted">
                  On LinkedIn
                </div>
              </div>
            </a>
          </Reveal>

          {/* Leadership pillars */}
          <Reveal delay={0.32} className="lg:col-span-2">
            <div className="glass card-hover relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-6">
              <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-accent-2/15 blur-3xl" />
              <div className="relative flex items-center gap-2 text-text-muted">
                <Users className="h-4 w-4" />
                <span className="text-sm">Leadership</span>
              </div>
              <ul className="relative grid grid-cols-2 gap-x-4 gap-y-4">
                {[
                  {
                    icon: Sprout,
                    verb: "Mentor",
                    line: "Growing engineers through code review, system design and agentic development",
                  },
                  {
                    icon: Compass,
                    verb: "Architect",
                    line: "Setting architectural direction and AI engineering standards",
                  },
                  {
                    icon: Target,
                    verb: "Align",
                    line: "Translating business goals into reliable engineering execution",
                  },
                  {
                    icon: TrendingUp,
                    verb: "Influence",
                    line: "Driving org-wide adoption of agentic dev tooling and best practices",
                  },
                ].map(({ icon: Icon, verb, line }) => (
                  <li key={verb} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-bg/40">
                        <Icon className="h-3.5 w-3.5 text-accent-2" />
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-text">
                        {verb}
                      </span>
                    </div>
                    <p className="text-xs leading-snug text-text-muted">
                      {line}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Education — spans full row */}
          <EducationCards />
        </div>
      </div>
    </section>
  );
}
