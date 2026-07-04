"use client";

import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { SectionVideo } from "./SectionVideo";

/** The closer — walk-toward-camera clip under the final ask. */
export function Finale() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-32"
    >
      <SectionVideo src="/media/closer.mp4" poster="/media/closer.webp" dim={0.68} focus="50% 28%" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <Reveal>
          <p className="kicker mb-8">
            <b>●</b> SEQ 04 / The closer
          </p>
        </Reveal>

        <Reveal delay={0.08} variant="blur">
          <h2
            className="display text-balance text-text"
            style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)" }}
          >
            Need production AI systems that{" "}
            <span className="text-gradient">actually ship?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="serif-note mx-auto mt-8 max-w-2xl text-lg text-text-muted sm:text-xl">
            I design and lead agentic AI platforms, MCP servers, RAG pipelines,
            and enterprise integrations — from architecture to production.
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-text px-7 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-white"
              >
                Connect on LinkedIn
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg/50 px-7 py-3.5 text-sm font-medium text-text backdrop-blur transition-colors hover:border-accent-2/60"
              >
                View GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <a
              href={profile.socials.newsletter}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-2 py-3 text-sm text-gold transition-colors hover:text-text"
            >
              Read <span className="serif-note">From Code to AI Strategy</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-16 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-subtle">
            {profile.location} · {profile.timezone} · Currently @{" "}
            {profile.company}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
