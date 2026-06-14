"use client";

import { ArrowUpRight, FileText, Quote } from "lucide-react";
import { papers, newsletterPosts } from "@/data/research";
import { Reveal } from "@/components/ui/Reveal";

export function Research() {
  return (
    <section id="research" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">
            04 — Research & Writing
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-16 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-text sm:text-5xl">
            Published in <span className="text-gradient">IEEE</span>, writing on{" "}
            <span className="text-gradient">LinkedIn</span>.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {papers.map((p) => (
            <Reveal key={p.title} variant="left" className="lg:col-span-2">
              <article className="glass card-hover relative overflow-hidden rounded-3xl p-8">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
                <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-accent-2/15 blur-3xl" />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-2 text-xs text-text-muted">
                      <FileText className="h-3.5 w-3.5" />
                      <span className="font-mono uppercase tracking-wider">
                        Peer-reviewed paper · {p.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold leading-snug tracking-tight text-text sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted">{p.authors}</p>
                    <p className="mt-1 text-sm text-text-muted">{p.venue}</p>
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                      {p.links.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 text-sm text-text hover:text-accent-2"
                        >
                          {l.label}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                    <Quote className="h-4 w-4 text-accent" />
                    <div className="font-mono text-5xl font-semibold tracking-tighter text-gradient">
                      {p.citations}+
                    </div>
                    <div className="text-xs uppercase tracking-wider text-text-subtle">
                      citations
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          {newsletterPosts.map((post) => (
            <Reveal key={post.url} delay={0.1} variant="right">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass card-hover group flex h-full flex-col justify-between rounded-3xl p-8"
              >
                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs text-text-muted">
                    <span className="font-mono uppercase tracking-wider">
                      Newsletter · biweekly
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold leading-snug tracking-tight text-text">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-text-muted">{post.excerpt}</p>
                </div>
                <div className="mt-6 inline-flex items-center gap-1 text-sm text-text group-hover:text-accent-2">
                  Read on LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
