"use client";

import { profile } from "@/data/profile";
import { KonamiTerminal } from "./KonamiTerminal";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="text-sm text-text-muted">
          © {year} {profile.name}. Built with Next.js, GSAP, Motion & Three.js.
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text-subtle">
          <span className="font-mono">↑ ↑ ↓ ↓ ← → ← → B A</span>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text"
          >
            Source on GitHub
          </a>
        </div>
      </div>
      <KonamiTerminal />
    </footer>
  );
}
