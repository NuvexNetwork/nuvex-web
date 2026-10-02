"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { durations, easeOutStrong, staggerStep, viewportOnce } from "./motion";

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.base, ease: easeOutStrong } },
};

export function Stagger({
  children,
  className,
  step = staggerStep,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
