"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { SplitHeading } from "./SplitHeading";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

const HeroScene3D = dynamic(() => import("./HeroScene3D"), { ssr: false });

export function Hero() {
  const [show3D, setShow3D] = useState(false);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    // Only render the Three.js scene on tablet+ viewports — gates the dynamic
    // import so mobile users never download Three.js + r3f + drei + postprocessing.
    const mq = window.matchMedia("(min-width: 640px)");
    // On large screens the orb sits to the right of a left-aligned headline;
    // below that the copy centers and the orb floats behind it.
    const mqWide = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      setShow3D(mq.matches);
      setWide(mqWide.matches);
    };
    update();
    mq.addEventListener("change", update);
    mqWide.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      mqWide.removeEventListener("change", update);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-x-clip"
    >
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
      {show3D && (
        <div className="absolute inset-0" aria-hidden>
          <HeroScene3D align={wide ? "split" : "center"} />
        </div>
      )}

      {/* Legibility scrim — darkens the copy side so the headline reads while the
          orb keeps glowing on the right (split) or behind it (centered). */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: wide
            ? "linear-gradient(100deg, rgba(7,7,11,0.92) 0%, rgba(7,7,11,0.6) 38%, rgba(7,7,11,0) 68%)"
            : "radial-gradient(ellipse 60% 50% at 50% 46%, rgba(7,7,11,0.66), transparent 74%)",
        }}
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

      <div
        className={cn(
          "hero-content relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 pt-32 pb-20",
          wide ? "items-start text-left" : "items-center text-center"
        )}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-text-muted backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for AI engineering work
        </motion.p>

        <SplitHeading
          text="From AI curiosity → AI capability → AI strategy."
          highlight={["curiosity", "capability", "strategy"]}
          className="hero-heading text-balance font-sans text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-text sm:text-6xl md:text-7xl lg:max-w-3xl lg:text-[5.5rem]"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-2xl text-balance text-base text-text-muted sm:text-lg"
        >
          I&apos;m <span className="text-text">{profile.name}</span> — leading{" "}
          <span className="text-text">AI &amp; Platform Engineering</span> at{" "}
          <a
            href={profile.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text underline-offset-4 hover:underline"
          >
            {profile.company}
          </a>
          . ~{profile.yearsExperience} years shipping{" "}
          <span className="text-text">agentic AI</span>,{" "}
          <span className="text-text">MCP servers</span> and{" "}
          <span className="text-text">LLM-powered platforms</span> at
          enterprise scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className={cn(
            "mt-10 flex flex-wrap items-center gap-3",
            wide ? "justify-start" : "justify-center"
          )}
        >
          <Magnetic>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-text px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-white"
            >
              View selected work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/40 px-6 py-3 text-sm font-medium text-text backdrop-blur transition-colors hover:border-white/30"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-text-subtle"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
