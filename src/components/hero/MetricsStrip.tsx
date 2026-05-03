"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import { useEffect, useRef } from "react";
import { heroMetrics } from "@/data/metrics";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const value = useMotionValue(reduced ? to : 0);
  const display = useTransform(value, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(value, to, {
      duration: 1.6,
      ease: [0.2, 0.8, 0.2, 1],
    });
    return () => controls.stop();
  }, [inView, to, reduced, value]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
    </span>
  );
}

export function MetricsStrip() {
  return (
    <section
      aria-label="Career metrics"
      className="relative px-6 pb-2 pt-2"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border/60 sm:grid-cols-4">
        {heroMetrics.map((m) => (
          <div
            key={m.label}
            className="flex flex-col gap-1 bg-bg/80 p-6 backdrop-blur"
            title={m.source}
          >
            <div className="font-mono text-3xl font-semibold leading-none tracking-tight text-text sm:text-4xl">
              <span className="text-gradient">
                <CountUp to={m.value} />
                {m.suffix}
              </span>
            </div>
            <div className="text-xs leading-snug text-text-muted">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
