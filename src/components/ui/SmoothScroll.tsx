"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // Skip Lenis on touch devices — native momentum scroll feels better and
    // avoids fighting iOS Safari's rubber-band behavior. ScrollTrigger still
    // drives the scrubbed sections off native scroll there.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    // Lazy-load Lenis only on desktop, after first paint, so the chunk is
    // never in the initial bundle for mobile users.
    (async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap"),
      ]);
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      // Drive Lenis from GSAP's ticker so scrubbed ScrollTriggers and the
      // smooth scroll share one clock — no double-raf drift on pinned scenes.
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced]);

  return null;
}
