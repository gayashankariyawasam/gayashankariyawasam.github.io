"use client";

import Link from "next/link";
import { profile } from "@/data/profile";
import { KonamiTerminal } from "./KonamiTerminal";

const socialLinks = [
  { label: "LinkedIn", href: profile.socials.linkedin },
  { label: "GitHub", href: profile.socials.github },
  { label: "Google Scholar", href: profile.socials.scholar },
  { label: "IEEE", href: profile.socials.ieee },
  { label: "Newsletter", href: profile.socials.newsletter },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border px-6 py-12 pb-[max(2.5rem,calc(2.5rem+env(safe-area-inset-bottom)))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <nav
          aria-label="Social links"
          className="flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          {socialLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-accent-2"
            >
              {l.label}
            </a>
          ))}
          {/* Named differently from the navbar's "About" (#about section) — same-name
              links must share a destination for screen-reader users. */}
          <Link
            href="/about/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-accent-2"
          >
            Full profile
          </Link>
        </nav>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <div className="text-sm text-text-muted">
            © {year} {profile.name}. Built with Next.js, GSAP &amp; Lenis.
          </div>
          <div className="flex items-center gap-5 font-mono text-xs text-text-subtle">
            <span>↑ ↑ ↓ ↓ ← → ← → B A</span>
            <span className="serif-note text-text-subtle">
              fin.
            </span>
          </div>
        </div>
      </div>
      <KonamiTerminal />
    </footer>
  );
}
