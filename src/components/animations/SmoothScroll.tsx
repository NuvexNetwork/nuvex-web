"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Inertial page scroll. Skipped when the visitor prefers reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.05, autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
