"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { durations, easeOutStrong, viewportOnce } from "./motion";

export type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Starting offset in pixels. */
  distance?: number;
  as?: "div" | "li" | "section" | "article" | "header" | "p";
};

export function FadeUp({ children, className, delay = 0, distance = 40, as = "div" }: FadeUpProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: durations.base, ease: easeOutStrong, delay }}
    >
      {children}
    </Tag>
  );
}
