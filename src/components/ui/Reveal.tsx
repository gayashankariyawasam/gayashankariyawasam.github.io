"use client";

import { motion, type Variant, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "blur";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
  /** Choreography preset — vary across sections so reveals don't feel uniform. */
  variant?: RevealVariant;
};

const ease = [0.2, 0.8, 0.2, 1] as const;

const hiddenByVariant = {
  up: { opacity: 0, y: 24, filter: "blur(8px)" },
  left: { opacity: 0, x: -40, filter: "blur(6px)" },
  right: { opacity: 0, x: 40, filter: "blur(6px)" },
  scale: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  blur: { opacity: 0, filter: "blur(14px)" },
} satisfies Record<RevealVariant, Variant>;

export function Reveal({
  children,
  delay = 0,
  y,
  className,
  as = "div",
  variant = "up",
}: Props) {
  const MotionTag = motion[as] as typeof motion.div;

  const hidden =
    y !== undefined && variant === "up"
      ? { ...hiddenByVariant.up, y }
      : hiddenByVariant[variant];

  const variants: Variants = {
    hidden,
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
