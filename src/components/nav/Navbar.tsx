"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";
import { OPEN_PALETTE_EVENT } from "@/components/ui/CommandPalette";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
    setScrolled(y > 24);
  });

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden && !mobileOpen ? -80 : 0, opacity: hidden && !mobileOpen ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed left-0 right-0 top-0 z-50 flex justify-center pt-[max(1rem,env(safe-area-inset-top))]"
      >
        <nav
          className={cn(
            "flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-500",
            scrolled
              ? "glass shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "border border-transparent bg-transparent"
          )}
        >
          <Magnetic strength={0.25}>
            <a
              href="#top"
              className="group flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-bold text-text sm:h-9 sm:w-9"
              aria-label="Go to top"
            >
              <span className="relative inline-block transition-transform duration-300 group-hover:scale-110">
                <span className="text-gradient">GK</span>
              </span>
            </a>
          </Magnetic>

          <div className="hidden items-center gap-1 px-2 sm:flex">
            {links.map((l) => {
              const id = l.href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                    isActive ? "text-text" : "text-text-muted hover:text-text"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/8"
                      transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            aria-label="Open command palette"
            className="ml-1 hidden items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs text-text-muted transition-colors hover:border-border-strong hover:text-text sm:inline-flex"
          >
            <Search className="h-3.5 w-3.5" />
            <kbd className="font-mono tracking-tight">⌘K</kbd>
          </button>

          <Magnetic strength={0.2}>
            <a
              href="#contact"
              className="ml-1 hidden h-9 items-center rounded-full bg-text px-4 text-sm font-medium text-bg transition-colors hover:bg-white sm:inline-flex"
            >
              Let&apos;s talk
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-text hover:text-white sm:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg/95 backdrop-blur-xl sm:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-2">
              <span className="font-mono text-base font-bold">
                <span className="text-gradient">GK</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.05,
                    duration: 0.45,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="py-3 text-4xl font-semibold tracking-tight text-text"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.45 }}
                className="mt-8 inline-flex items-center rounded-full bg-text px-7 py-4 text-base font-medium text-bg"
              >
                Let&apos;s talk
              </motion.a>
            </nav>

            <div className="h-[max(1.5rem,env(safe-area-inset-bottom))]" aria-hidden />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
