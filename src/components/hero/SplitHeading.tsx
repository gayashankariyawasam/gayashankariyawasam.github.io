"use client";

import { motion, type Variants } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const word: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const char: Variants = {
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
};

type Props = {
  text: string;
  className?: string;
  highlight?: string[];
};

export function SplitHeading({ text, className, highlight = [] }: Props) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <h1 className={className}>
        {words.map((w, i) => (
          <span key={i} className="mr-[0.25em]">
            {highlight.includes(w.replace(/[.,→]/g, "")) ? (
              <span className="text-gradient">{w}</span>
            ) : (
              w
            )}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {words.map((w, wi) => {
        const clean = w.replace(/[.,→]/g, "");
        const isHL = highlight.includes(clean);
        return (
          <motion.span
            key={wi}
            variants={word}
            className="mr-[0.22em] inline-block whitespace-nowrap"
          >
            {Array.from(w).map((c, ci) => (
              <span
                key={ci}
                className="inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  variants={char}
                  className={
                    isHL ? "inline-block text-gradient" : "inline-block"
                  }
                >
                  {c}
                </motion.span>
              </span>
            ))}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
