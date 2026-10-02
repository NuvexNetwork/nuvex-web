"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { durations, easeOutStrong, viewportOnce } from "./motion";

/** Image reveal: the frame unclips upward while the content settles from a slight zoom. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const clipped = reduced ? "inset(0% 0% 0% 0% round 12px)" : "inset(12% 0% 0% 0% round 12px)";
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, clipPath: clipped }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 12px)" }}
      viewport={viewportOnce}
      transition={{ duration: durations.slow, ease: easeOutStrong, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: durations.slow + 0.3, ease: easeOutStrong, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Subtle scale-in for centre tiles and illustrations. */
export function ScaleIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: durations.base, ease: easeOutStrong, delay }}
    >
      {children}
    </motion.div>
  );
}
