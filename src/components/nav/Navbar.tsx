"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";

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

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4"
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
            className="group flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm font-bold text-text"
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

        <Magnetic strength={0.2}>
          <a
            href="#contact"
            className="ml-1 inline-flex h-9 items-center rounded-full bg-text px-4 text-sm font-medium text-bg transition-colors hover:bg-white"
          >
            Let&apos;s talk
          </a>
        </Magnetic>
      </nav>
    </motion.header>
  );
}
