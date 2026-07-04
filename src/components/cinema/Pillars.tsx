"use client";

import { useEffect, useRef } from "react";
import { SectionVideo } from "./SectionVideo";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const pillars = [
  {
    index: "01",
    title: "The AI Systems Lead",
    body: "Agentic platforms, MCP servers, RAG pipelines, and LLM-powered enterprise workflows.",
    tag: "Agentic / MCP / RAG",
  },
  {
    index: "02",
    title: "The Platform Architect",
    body: "Production-grade integrations, Redis-backed inference caching, GitOps, deployment governance, and observability.",
    tag: "Integrations / Caching / GitOps",
  },
  {
    index: "03",
    title: "The Strategist & Researcher",
    body: "IEEE-published computer vision researcher writing about the shift from AI curiosity to enterprise AI capability.",
    tag: "Research / Writing / Strategy",
  },
];

/**
 * Pinned "Three Pillars" scene over the architect clip. Each pillar owns a
 * third of a 320vh runway: the oversized index numeral and copy crossfade
 * while a progress rail tracks the scene position.
 */
export function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
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
        const panels = section.querySelectorAll<HTMLElement>("[data-pillar]");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            onUpdate: (self) => {
              if (railRef.current) {
                railRef.current.style.transform = `scaleY(${self.progress})`;
              }
            },
          },
        });

        // 3 slots of 10 units each; ~2-unit crossfades between panels.
        panels.forEach((panel, i) => {
          const numeral = panel.querySelector<HTMLElement>("[data-numeral]");
          const copy = panel.querySelectorAll<HTMLElement>("[data-copy]");
          const at = i * 10;

          if (i > 0) {
            tl.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6, ease: "power1.out" }, at);
            tl.fromTo(
              numeral,
              { yPercent: 30 },
              { yPercent: 0, duration: 2.2, ease: "power2.out" },
              at
            );
            tl.fromTo(
              copy,
              { y: 44, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.35, duration: 1.8, ease: "power2.out" },
              at + 0.4
            );
          }
          if (i < panels.length - 1) {
            tl.to(panel, { autoAlpha: 0, y: -30, duration: 1.6, ease: "power1.in" }, at + 8.4);
          }
        });

        tl.to({}, { duration: 0.01 }, 30);
      }, section);
    })();

    return () => {
      cancelled = true;
      ctxGsap?.revert();
    };
  }, [reduced]);

  if (reduced) {
    // Static stacked pillars — no pinning for reduced-motion readers.
    return (
      <section id="about" className="relative px-6 py-28">
        <SectionVideo src="/media/architect-v2.mp4" poster="/media/architect-v2.webp" dim={0.78} />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-16">
          <p className="kicker">
            <b>●</b> SEQ 02 / Three pillars
          </p>
          {pillars.map((p) => (
            <div key={p.index}>
              <div className="display text-6xl text-text/20">{p.index}</div>
              <h2 className="display mt-2 text-4xl text-text">{p.title}</h2>
              <p className="mt-4 max-w-xl text-text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="about" className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <SectionVideo src="/media/architect-v2.mp4" poster="/media/architect-v2.webp" dim={0.72} />

        {/* Scene chrome */}
        <p className="kicker absolute left-6 top-24 z-10 sm:left-10">
          <b>●</b> SEQ 02 / Three pillars
        </p>

        {/* Progress rail */}
        <div className="absolute bottom-16 left-6 top-36 z-10 hidden w-px bg-border sm:left-10 sm:block">
          <div
            ref={railRef}
            className="h-full w-px origin-top bg-accent-2"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 px-6 sm:px-16">
          {pillars.map((p, i) => (
            <div
              key={p.index}
              data-pillar
              className="col-start-1 row-start-1 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:gap-10"
              style={i > 0 ? { opacity: 0, visibility: "hidden" } : undefined}
            >
              <div className="overflow-hidden">
                <div
                  data-numeral
                  className="display leading-[0.8] text-transparent"
                  style={{
                    fontSize: "clamp(7rem, 24vw, 20rem)",
                    WebkitTextStroke: "1.5px rgba(99,199,168,0.4)",
                  }}
                >
                  {p.index}
                </div>
              </div>
              <div className="max-w-xl pb-2 sm:pb-6">
                <p data-copy className="kicker mb-3">
                  {p.tag}
                </p>
                <h2
                  data-copy
                  className="display text-text"
                  style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)" }}
                >
                  {p.title}
                </h2>
                <p data-copy className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
