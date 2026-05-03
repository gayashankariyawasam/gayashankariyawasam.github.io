"use client";

import { stack } from "@/data/stack";
import { Reveal } from "@/components/ui/Reveal";

export function StackMarquee() {
  return (
    <section id="stack" className="relative overflow-hidden py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">
            05 — Stack
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-16 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-text sm:text-5xl">
            Tools I reach for, <span className="text-gradient">categorized</span>.
          </h2>
        </Reveal>
      </div>

      <div className="relative space-y-6">
        {stack.map((row, ri) => {
          const items = [...row.items, ...row.items];
          const direction = ri % 2 === 0 ? "" : "[animation-direction:reverse]";
          return (
            <div key={row.category} className="marquee group/marq">
              <div className="mx-auto mb-2 max-w-6xl px-6">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">
                  {row.category}
                </div>
              </div>
              <div className="relative w-full overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg to-transparent" />
                <div className={`marquee-track flex w-max gap-3 ${direction}`}>
                  {items.map((item, i) => (
                    <span
                      key={`${row.category}-${item}-${i}`}
                      className="shrink-0 rounded-2xl border border-border bg-surface/50 px-5 py-3 text-sm text-text-muted backdrop-blur transition-colors hover:border-border-strong hover:text-text"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
