"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // Skip Lenis on touch devices — native momentum scroll feels better and
    // avoids fighting iOS Safari's rubber-band behavior.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    // Lazy-load Lenis only on desktop, after first paint, so the chunk is
    // never in the initial bundle for mobile users.
    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      const tick = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, [reduced]);

  return null;
}
