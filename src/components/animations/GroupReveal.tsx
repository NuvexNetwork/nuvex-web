"use client";

import { motion, type Variants } from "framer-motion";
import { Children, type CSSProperties, type ReactNode } from "react";

import { durations, easeOutStrong, staggerStep, viewportOnce } from "./motion";

const child: Variants = {
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.base, ease: easeOutStrong } },
};

/** Each direct child fades up from 75px, 0.1s apart. */
export function GroupReveal({
  children,
  className,
  style,
  immediate = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  immediate?: boolean;
  delay?: number;
}) {
  const trigger = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: viewportOnce };
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerStep, delayChildren: delay + 0.1 } },
      }}
    >
      {Children.toArray(children).map((node, index) => (
        <motion.div key={index} variants={child}>
          {node}
        </motion.div>
      ))}
    </motion.div>
  );
}
