"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees on each axis. */
  max?: number;
};

/**
 * Pointer-reactive card. Drives two effects from a single mousemove:
 *  - `--mx` / `--my` (0–100%) for a cursor-following spotlight in children
 *  - `--rx` / `--ry` for a subtle 3D tilt toward the cursor
 * Tilt is skipped under reduced-motion; the spotlight still tracks.
 */
export function TiltCard({ children, className, max = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
    if (!reduced) {
      el.style.setProperty("--rx", `${((0.5 - py) * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * max * 2).toFixed(2)}deg`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="h-full [perspective:1200px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(
          "h-full transition-transform duration-300 ease-out [transform-style:preserve-3d]",
          "[transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translateY(var(--lift,0px))]",
          "hover:[--lift:-6px]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
