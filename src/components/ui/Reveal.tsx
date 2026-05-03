"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export function Reveal({ children, delay = 0, y, className, as = "div" }: Props) {
  const MotionTag = motion[as] as typeof motion.div;
  const customVariants: Variants =
    y !== undefined
      ? {
          hidden: { ...variants.hidden, y },
          show: variants.show,
        }
      : variants;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      variants={customVariants}
    >
      {children}
    </MotionTag>
  );
}
