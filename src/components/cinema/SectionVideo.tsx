"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  /** /media/*.mp4 — generated Seedance clip for this scene. */
  src: string;
  poster?: string;
  className?: string;
  /** 0–1 black wash over the clip so foreground copy stays legible. */
  dim?: number;
  focus?: string;
};

/**
 * Full-bleed cinematic backdrop. Plays only while on screen, respects
 * reduced motion (poster instead), and if the clip isn't generated yet it
 * falls back to a code-driven emerald-noir gradient so the section still
 * reads as a lit room rather than a hole.
 */
export function SectionVideo({
  src,
  poster,
  className,
  dim = 0.62,
  focus = "50% 35%",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || failed) return;
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced, failed]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {failed || reduced ? (
        poster && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: focus }}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 28% 30%, rgba(13,64,52,0.55), transparent 60%)," +
                "radial-gradient(ellipse 55% 45% at 78% 68%, rgba(55,147,123,0.18), transparent 60%)," +
                "linear-gradient(180deg, #050706 0%, #090e0c 55%, #050706 100%)",
            }}
          />
        )
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          // "metadata" still pulls ~300KB per clip up front; the poster covers
          // the frame until the on-view play() starts buffering.
          preload="none"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          style={{ objectPosition: focus }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(5, 7, 6, ${dim})` }}
      />
      <div className="vignette absolute inset-0" />
    </div>
  );
}
