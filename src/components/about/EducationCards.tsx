"use client";

import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import { Reveal } from "@/components/ui/Reveal";

export function EducationCards() {
  return (
    <Reveal delay={0.18} className="lg:col-span-4">
      <div className="glass card-hover rounded-3xl p-6">
        <div className="mb-5 flex items-center gap-2 text-text-muted">
          <GraduationCap className="h-4 w-4" />
          <span className="text-sm">Education</span>
        </div>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {education.map((e) => (
            <li
              key={e.institution}
              className="flex flex-col gap-1 border-t border-border pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 first:border-l-0 first:border-t-0 first:pt-0 first:sm:pl-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-text-subtle">
                  {e.start} — {e.end}
                </span>
                {e.inProgress && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    in progress
                  </span>
                )}
              </div>
              <div className="text-base font-semibold leading-snug tracking-tight text-text">
                {e.degree} · {e.field}
              </div>
              {e.institutionUrl ? (
                <a
                  href={e.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-text"
                >
                  {e.institution}
                </a>
              ) : (
                <span className="text-sm text-text-muted">{e.institution}</span>
              )}
              {e.honor && (
                <span className="text-xs text-text-subtle">{e.honor}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
