"use client";

import { useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionVideo } from "./SectionVideo";
import { cn } from "@/lib/utils";

// The six systems that make the cinematic cut, in narrative order.
const FEATURED_TITLES = [
  "IDRP — Intelligent Diagnostic & Resolution Platform",
  "Building MCP Servers",
  "LLM Cancellation-Policy Pipeline",
  "Tritium OPS Tool",
  "H2H Hospitality Integrations",
  "Suspicious Activity Detection in Surveillance Footage",
];

const featured = FEATURED_TITLES.map(
  (t) => projects.find((p) => p.title === t)
).filter((p): p is Project => Boolean(p));

function WorkCard({ p, hero }: { p: Project; hero?: boolean }) {
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <article
      onMouseMove={onMove}
      className={cn(
        "group hud-corners relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg/70 p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 sm:p-9",
        hero && "lg:flex-row lg:items-end lg:gap-12"
      )}
    >
      {/* Emerald spotlight tracks the cursor. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(55,147,123,0.14), transparent 55%)",
        }}
      />

      <div className={cn("relative flex-1", hero && "lg:max-w-2xl")}>
        <div className="mb-5 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-text-subtle">
          <span className="text-accent-2">{p.category}</span>
          <span aria-hidden>—</span>
          <span>{p.year}</span>
        </div>
        <h3
          className="display text-text"
          style={{ fontSize: hero ? "clamp(1.9rem, 3.6vw, 3.2rem)" : "clamp(1.5rem, 2.4vw, 2.1rem)" }}
        >
          {p.title}
        </h3>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-text-muted">
          {p.description}
        </p>
      </div>

      <div className={cn("relative mt-7 flex flex-col gap-5", hero && "lg:w-72 lg:shrink-0")}>
        {p.metric && (
          <div className="serif-note text-xl text-gold">{p.metric}</div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded border border-border bg-surface/60 px-2 py-0.5 font-mono text-[0.65rem] text-text-muted"
            >
              {s}
            </span>
          ))}
        </div>
        {p.links && p.links.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {p.links.map((l) => (
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
        )}
      </div>
    </article>
  );
}

/** Selected systems, staged over the platform-ops clip. */
export function WorkCinema() {
  return (
    <section id="work" className="relative px-6 py-28 sm:py-40">
      <SectionVideo src="/media/platform.mp4" poster="/media/platform.jpg" dim={0.82} />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="kicker mb-4">
            <b>●</b> SEQ 03 / Systems in production
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="display mb-4 text-text"
            style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}
          >
            Shipped, not <span className="text-gradient">demoed</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="serif-note mb-16 max-w-xl text-lg text-text-muted">
            Six systems that carry production traffic — agentic AI, platform
            governance, and the research underneath.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal
              key={p.title}
              delay={(i % 2) * 0.08}
              variant={i === 0 ? "scale" : i % 2 === 0 ? "left" : "right"}
              className={cn(i === 0 && "md:col-span-2")}
            >
              <WorkCard p={p} hero={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
