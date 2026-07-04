"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  drawCover,
  fetchManifest,
  loadSequence,
  nearestLoaded,
  paintProceduralFrame,
  type HeroSequence,
} from "./heroSequence";

const LINE_1 = "GAYASHAN";
const LINE_2 = "KARIYAWASAM";

/**
 * Scroll-scrubbed cinematic hero. A 380vh runway pins a full-viewport canvas
 * that plays the Seedance hero-orbit frame sequence under kinetic type:
 * the name tracks in letter-by-letter, then the subtitle and tagline land,
 * and the whole title card hands off to the stats strip as the orbit ends.
 */
export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const exitVeilRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dprCap = coarse ? 1.5 : 2;

    let seq: HeroSequence | null = null;
    let cancelSeq: (() => void) | undefined;
    let progress = reduced ? 0.35 : 0;
    let lastFrame = -1;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastFrame = -1;
      paint(true);
    };

    const paint = (force = false) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      if (seq && seq.loaded.size > 0) {
        const index = Math.min(
          seq.frames - 1,
          Math.round(progress * (seq.frames - 1))
        );
        if (!force && index === lastFrame) return;
        const img = nearestLoaded(seq, index);
        if (img) {
          ctx.clearRect(0, 0, w, h);
          drawCover(ctx, img, w, h);
          lastFrame = index;
          return;
        }
      }
      paintProceduralFrame(ctx, w, h, progress);
      lastFrame = -1;
    };

    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    size();

    fetchManifest().then((m) => {
      if (!m) return;
      const { seq: s, cancel } = loadSequence(
        m,
        canvas.clientWidth,
        Math.min(window.devicePixelRatio || 1, dprCap),
        () => paint(true)
      );
      seq = s;
      cancelSeq = cancel;
    });

    if (reduced) {
      // Static title card — one mid-orbit frame, no pin, no scrub.
      return () => {
        ro.disconnect();
        cancelSeq?.();
      };
    }

    let ctxGsap: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("@/lib/gsap");
      if (cancelled) return;
      setLive(true);

      ctxGsap = gsap.context(() => {
        const letters = section.querySelectorAll<HTMLElement>("[data-letter]");
        const lines = section.querySelectorAll<HTMLElement>("[data-line]");
        const sub = section.querySelectorAll<HTMLElement>("[data-sub]");
        const hud = section.querySelectorAll<HTMLElement>("[data-hud]");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => {
              progress = self.progress;
              paint();
              if (timecodeRef.current) {
                const total = seq?.frames ?? 192;
                const f = Math.round(progress * (total - 1));
                const s = Math.floor(f / 24);
                timecodeRef.current.textContent = `00:00:${String(s).padStart(2, "0")}:${String(f % 24).padStart(2, "0")}`;
              }
            },
          },
        });

        // 0–2.4 — the name tracks in letter-by-letter while each line's
        // letterspacing settles from loose to locked.
        tl.fromTo(
          letters,
          { yPercent: 118, rotate: 3 },
          { yPercent: 0, rotate: 0, stagger: 0.09, duration: 1.9, ease: "power2.out" },
          0.15
        );
        tl.fromTo(
          lines,
          { letterSpacing: "0.13em" },
          { letterSpacing: "0.01em", duration: 2.3, ease: "power2.out" },
          0.15
        );
        tl.fromTo(
          hud,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, stagger: 0.15 },
          0.1
        );

        // 2.4–4.4 — subtitle, then the curiosity → capability → strategy line.
        tl.fromTo(
          sub[0],
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
          2.4
        );
        tl.fromTo(
          sub[1],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
          3.3
        );

        // Long orbit hold — the type breathes while the camera circles.
        tl.to(contentRef.current, { scale: 1.045, duration: 5.6, ease: "none" }, 2.4);
        tl.to(cueRef.current, { opacity: 0, duration: 0.6 }, 1.2);

        // 8.2–10 — title card hands off: content lifts away, veil closes.
        tl.to(
          contentRef.current,
          { opacity: 0, y: -60, duration: 1.6, ease: "power1.in" },
          8.4
        );
        tl.fromTo(
          exitVeilRef.current,
          { opacity: 0 },
          { opacity: 0.92, duration: 1.8 },
          8.2
        );

        // Padding target so the timeline length is exactly 10 units.
        tl.to({}, { duration: 0.01 }, 10);
      }, section);
    })();

    return () => {
      cancelled = true;
      ro.disconnect();
      cancelSeq?.();
      ctxGsap?.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label={`${profile.name} — cinematic introduction`}
      className={reduced ? "relative h-[100svh]" : "relative h-[380vh]"}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Orbit backdrop */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        />
        <div className="vignette pointer-events-none absolute inset-0" aria-hidden />
        <div
          ref={exitVeilRef}
          className="pointer-events-none absolute inset-0 bg-bg opacity-0"
          aria-hidden
        />

        {/* Command-room HUD chrome */}
        <div
          data-hud
          className="pointer-events-none absolute left-5 top-20 hidden font-mono text-[0.65rem] uppercase tracking-[0.25em] text-text-subtle sm:left-8 sm:block"
          style={{ opacity: live ? undefined : 1 }}
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-2 align-middle" />
          GK / Enterprise AI Command
        </div>
        <div
          data-hud
          className="pointer-events-none absolute right-5 top-20 hidden items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-text-subtle sm:right-8 sm:flex"
          style={{ opacity: live ? undefined : 1 }}
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#b3402e]" />
          REC <span ref={timecodeRef}>00:00:00:00</span>
        </div>
        <div
          data-hud
          className="pointer-events-none absolute bottom-6 left-5 hidden font-mono text-[0.65rem] uppercase tracking-[0.25em] text-text-subtle sm:left-8 sm:block"
          style={{ opacity: live ? undefined : 1 }}
        >
          6.9271° N — 79.8612° E · Colombo
        </div>
        <div
          data-hud
          className="pointer-events-none absolute bottom-6 right-5 hidden font-mono text-[0.65rem] uppercase tracking-[0.25em] text-text-subtle sm:right-8 sm:block"
          style={{ opacity: live ? undefined : 1 }}
        >
          SEQ 01 / Orbit
        </div>

        {/* Title card */}
        <div
          ref={contentRef}
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
        >
          <h1
            className="display text-text"
            style={{ fontSize: "clamp(2.6rem, 10.2vw, 9.5rem)" }}
            aria-label={profile.name}
          >
            {[LINE_1, LINE_2].map((line) => (
              <span
                key={line}
                data-line
                className="block overflow-hidden pb-[0.06em]"
                aria-hidden
              >
                {Array.from(line).map((c, i) => (
                  <span
                    key={i}
                    data-letter
                    className="inline-block will-change-transform"
                  >
                    {c}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p
            data-sub
            className="mt-6 max-w-xl text-balance text-sm text-text-muted sm:text-lg"
            style={{ opacity: reduced ? 1 : undefined }}
          >
            AI &amp; Platform Engineering Lead building{" "}
            <span className="text-text">production agentic systems</span>.
          </p>
          <p
            data-sub
            className="serif-note mt-4 text-base text-text-muted sm:text-xl"
            style={{ opacity: reduced ? 1 : undefined }}
          >
            From AI curiosity <span className="text-gold">→</span> AI capability{" "}
            <span className="text-gold">→</span> AI strategy.
          </p>
        </div>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-subtle"
        >
          <span className="mr-3 inline-block animate-bounce">↓</span>
          Scroll to run sequence
        </div>
      </div>
    </section>
  );
}
