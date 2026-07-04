"use client";

import { ArrowUpRight } from "lucide-react";
import { papers, newsletterPosts } from "@/data/research";
import { Reveal } from "@/components/ui/Reveal";

/** Research & writing — the paper and the newsletter, staged as two exhibits. */
export function ResearchCinema() {
  const paper = papers[0];
  const newsletter = newsletterPosts[0];

  return (
    <section id="research" className="relative border-y border-border bg-bg-2/60 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="kicker mb-4">
            <b>●</b> Archive / Research &amp; writing
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="display mb-16 text-text"
            style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}
          >
            On the <span className="text-gradient">record</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          <Reveal variant="left" className="lg:col-span-3">
            <article className="hud-corners group relative flex h-full flex-col rounded-xl border border-border bg-bg/60 p-8 backdrop-blur-md transition-colors duration-500 hover:border-accent/60 sm:p-10">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-text-subtle">
                IEEE · ICECTA {paper.year} · Ras Al Khaimah, UAE
              </p>
              <h3 className="display mt-5 text-3xl text-text sm:text-4xl">
                {paper.title}
              </h3>
              <p className="mt-3 text-sm text-text-muted">{paper.authors}</p>
              <div className="mt-8 flex items-end gap-4">
                <span className="display text-7xl leading-none text-gold sm:text-8xl">
                  {paper.citations}+
                </span>
                <span className="pb-2 text-sm text-text-muted">
                  citations
                  <br />
                  on Google Scholar
                </span>
              </div>
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8">
                {paper.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1 text-sm text-text transition-colors hover:text-accent-2"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal variant="right" delay={0.1} className="lg:col-span-2">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-gradient-to-b from-accent-deep/40 to-bg/60 p-8 backdrop-blur-md transition-colors duration-500 hover:border-gold/50 sm:p-10">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-text-subtle">
                Newsletter · LinkedIn
              </p>
              <h3 className="display mt-5 text-3xl text-text sm:text-4xl">
                From Code to AI Strategy
              </h3>
              <p className="serif-note mt-5 text-lg leading-relaxed text-text-muted">
                {newsletter.excerpt}
              </p>
              <a
                href={newsletter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-auto inline-flex items-center gap-2 pt-8 text-sm text-gold transition-colors hover:text-text"
              >
                Read the latest issues
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
