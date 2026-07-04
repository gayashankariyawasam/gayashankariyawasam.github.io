"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

type Stat = {
  /** Numeric stats count up on scroll; text stats land as-is. */
  value?: number;
  prefix?: string;
  suffix?: string;
  text?: string;
  label: string;
  wide?: boolean;
  /** Spans the whole final ledger row so the hairline grid stays gapless. */
  full?: boolean;
};

const stats: Stat[] = [
  { value: 6, suffix: "+", label: "Years shipping production AI & platform systems" },
  { text: "Lead", label: "AI & Platform Engineering @ CodeGen International" },
  { value: 40, suffix: "%+", prefix: "−", label: "Support escalations, via the IDRP agentic platform", wide: true },
  { value: 60, suffix: "%", prefix: "−", label: "Redundant API calls in the LLM cancellation-policy pipeline" },
  { value: 30, suffix: "%", prefix: "−", label: "p95 search latency after inference caching" },
  { value: 53, suffix: "+", label: "Citations on IEEE-published computer vision research" },
  { text: "MSc", label: "Software Architecture · University of Moratuwa · in progress", full: true },
];

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  /** Must start at the real value: crawlers and link previews read the static HTML. */
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reducedMotion, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Ledger of shipped outcomes — gold numerals on hairline rules. */
export function StatsStrip() {
  return (
    <section aria-label="Career metrics" className="relative border-y border-border bg-bg px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="kicker mb-12">
            <b>●</b> Field report / Measured outcomes
          </p>
        </Reveal>

        {/* role="list" restores list semantics that list-style:none strips in Safari/VoiceOver */}
        <ul
          role="list"
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((s, i) => (
            <li
              key={s.label}
              className={
                "group relative bg-bg p-7 transition-colors duration-500 hover:bg-surface " +
                (s.wide ? "sm:col-span-2 lg:col-span-1 " : "") +
                (s.full ? "lg:col-span-3" : "")
              }
            >
              <Reveal delay={(i % 3) * 0.08}>
                <div className="display text-5xl text-gold sm:text-6xl">
                  {s.value !== undefined ? (
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  ) : (
                    <span>{s.text}</span>
                  )}
                </div>
                <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-text-muted">
                  {s.label}
                </p>
                <span className="pointer-events-none absolute right-6 top-6 font-mono text-[0.6rem] tracking-[0.25em] text-text-subtle opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  M{String(i + 1).padStart(2, "0")}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
