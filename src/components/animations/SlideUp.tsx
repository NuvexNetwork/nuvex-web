"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { durations, easeOutStrong, viewportEnter, viewportOnce } from "./motion";

/** Whole blocks rise 50px as they enter the viewport. */
export function SlideUp({
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: viewportEnter })}
      transition={{ duration: durations.base, ease: easeOutStrong, delay: delay + 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/** Content rises out of a mask, as the reference does with buttons and short copy. */
export function MaskUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={viewportOnce}
        transition={{ duration: durations.slow, ease: easeOutStrong, delay: delay + 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
