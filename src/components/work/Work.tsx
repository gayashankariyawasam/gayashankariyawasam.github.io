"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const accentForCategory: Record<string, string> = {
  AI: "from-violet-500/20 to-cyan-500/20",
  Backend: "from-amber-500/20 to-orange-500/20",
  Research: "from-pink-500/20 to-violet-500/20",
  Web: "from-cyan-500/20 to-emerald-500/20",
};

export function Work() {
  return (
    <section id="work" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">
            03 — Selected Work
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-16 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-text sm:text-5xl">
            Systems I&apos;ve shipped, <span className="text-gradient">papers I&apos;ve published</span>.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((p, i) => {
            const grad = accentForCategory[p.category] ?? "from-violet-500/20 to-cyan-500/20";
            const isWide = p.featured && i % 3 === 0;
            return (
              <Reveal
                key={p.title}
                delay={(i % 4) * 0.06}
                className={cn(isWide && "md:col-span-2")}
              >
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-sm sm:p-8"
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      grad
                    )}
                  />
                  <div
                    className="pointer-events-none absolute inset-px rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(600px circle at var(--mx, 50%) var(--my, 0%), rgba(255,255,255,0.05), transparent 40%)",
                    }}
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="mb-4 flex items-center gap-3 text-xs">
                      <span className="rounded-full border border-border bg-bg/40 px-2.5 py-1 font-mono uppercase tracking-wider text-text-muted">
                        {p.category}
                      </span>
                      <span className="font-mono text-text-subtle">{p.year}</span>
                    </div>

                    <h3 className="text-2xl font-semibold leading-tight tracking-tight text-text sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-text-muted">{p.blurb}</p>
                    <p className="mt-4 max-w-prose text-sm text-text-muted/80">
                      {p.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-border bg-bg/40 px-2 py-0.5 text-xs text-text-muted"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      {p.links && p.links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                          {p.links.map((l) => (
                            <a
                              key={l.url}
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link inline-flex items-center gap-1 text-sm text-text hover:text-accent-2"
                            >
                              {l.label}
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
