"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * With reducedMotion="user", visitors who ask for reduced motion keep opacity fades
 * but lose transform and layout animation across every motion component.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
