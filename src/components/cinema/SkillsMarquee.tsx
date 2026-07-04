"use client";

import { marqueeSkills } from "@/data/stack";

/** Kinetic skill strip — two counter-scrolling rails of the working stack. */
export function SkillsMarquee() {
  const half = Math.ceil(marqueeSkills.length / 2);
  const rows = [marqueeSkills.slice(0, half), marqueeSkills.slice(half)];

  return (
    <section
      aria-label="Technical stack"
      className="marquee relative overflow-hidden border-y border-border bg-bg py-10"
    >
      {rows.map((row, r) => (
        <div
          key={r}
          className="marquee-track flex w-max items-center whitespace-nowrap"
          style={{
            animationDirection: r === 1 ? "reverse" : undefined,
            animationDuration: r === 1 ? "46s" : undefined,
          }}
        >
          {/* Doubled row so the -50% keyframe loops seamlessly. */}
          {[...row, ...row].map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="display flex items-center text-4xl text-text/70 transition-colors hover:text-text sm:text-5xl"
            >
              <span className="px-5">{s}</span>
              <span className="text-xl text-accent" aria-hidden>
                {i % 4 === 3 ? "◆" : "·"}
              </span>
            </span>
          ))}
        </div>
      ))}
    </section>
  );
}
