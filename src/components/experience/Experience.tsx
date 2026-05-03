"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current || !lineRef.current) return;

    const line = lineRef.current;
    line.style.transformOrigin = "top center";
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 0.5,
        },
      }
    );

    const dots = containerRef.current.querySelectorAll<HTMLElement>("[data-dot]");
    dots.forEach((dot) => {
      gsap.fromTo(
        dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 80%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduced]);

  return (
    <section id="experience" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">
            02 — Experience
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-16 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-text sm:text-5xl">
            From <span className="text-gradient">surveillance research</span> to{" "}
            production AI agents.
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative pl-10 sm:pl-16">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border sm:left-6" />
          <div
            ref={lineRef}
            className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent sm:left-6"
          />

          <ol className="space-y-16">
            {experiences.map((e, i) => (
              <li key={i} className="relative">
                <span
                  data-dot
                  className="absolute -left-[1.95rem] top-2 flex h-3 w-3 sm:-left-[3.45rem]"
                >
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-br from-accent to-accent-2 ring-4 ring-bg" />
                </span>

                <Reveal delay={0.05}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-xs text-text-subtle">
                      {e.start} — {e.end}
                    </span>
                    <span className="text-xs text-text-subtle">·</span>
                    <span className="text-xs text-text-subtle">{e.location}</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                    {e.role}{" "}
                    <span className="font-normal text-text-muted">
                      ·{" "}
                      {e.companyUrl ? (
                        <a
                          href={e.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-text"
                        >
                          {e.company}
                        </a>
                      ) : (
                        e.company
                      )}
                    </span>
                  </h3>
                  <p className="mt-3 max-w-3xl text-text-muted">{e.summary}</p>
                  <ul className="mt-4 max-w-3xl space-y-1.5 text-sm text-text-muted">
                    {e.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-border bg-surface/60 px-2 py-0.5 text-xs text-text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {e.clients && e.clients.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-subtle">
                      <span className="font-mono uppercase tracking-wider">
                        Clients
                      </span>
                      <span className="text-text-subtle">·</span>
                      <span className="text-text-muted">
                        {e.clients.join(" · ")}
                      </span>
                    </div>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
