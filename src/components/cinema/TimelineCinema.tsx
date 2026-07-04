"use client";

import { useEffect, useRef } from "react";
import { experiences } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Career timeline as a film strip: a scroll-drawn emerald rail with each
 * role landing as a numbered scene marker.
 */
export function TimelineCinema() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    let ctxGsap: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("@/lib/gsap");
      if (cancelled) return;
      ctxGsap = gsap.context(() => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.4,
            },
          }
        );
      }, section);
    })();

    return () => {
      cancelled = true;
      ctxGsap?.revert();
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} id="experience" className="relative px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="kicker mb-4">
            <b>●</b> Timeline / Roles
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="display mb-20 text-text"
            style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}
          >
            Six years, four <span className="text-gradient">acts</span>
          </h2>
        </Reveal>

        <div className="relative">
          {/* Scroll-drawn rail */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-border sm:left-1/2" aria-hidden>
            <div
              ref={lineRef}
              className="h-full w-px origin-top bg-gradient-to-b from-accent-2 via-accent to-accent-deep"
              style={{ transform: reduced ? undefined : "scaleY(0)" }}
            />
          </div>

          <ol className="space-y-20">
            {experiences.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <li key={`${e.role}-${e.start}`} className="relative">
                  {/* Scene marker */}
                  <span
                    className="absolute left-0 top-2 z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent-2 bg-bg sm:left-1/2 sm:-translate-x-1/2"
                    aria-hidden
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-accent-2" />
                  </span>

                  <Reveal
                    variant={left ? "left" : "right"}
                    className={
                      "ml-10 sm:ml-0 sm:w-[calc(50%-3rem)] " +
                      (left ? "sm:mr-auto sm:text-right" : "sm:ml-auto")
                    }
                  >
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gold">
                      {e.start} — {e.end}
                    </p>
                    <h3 className="display mt-3 text-2xl text-text sm:text-3xl">
                      {e.role}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">
                      {e.companyUrl ? (
                        <a
                          href={e.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text underline-offset-4 hover:underline"
                        >
                          {e.company}
                        </a>
                      ) : (
                        e.company
                      )}{" "}
                      · {e.location}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-text-muted">
                      {e.summary}
                    </p>
                    <ul
                      className={
                        "mt-4 space-y-2 text-sm text-text-muted/90 " +
                        (left ? "sm:[direction:rtl]" : "")
                      }
                    >
                      {e.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="[direction:ltr]">
                          <span className="mr-2 text-accent-2" aria-hidden>
                            ◆
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
