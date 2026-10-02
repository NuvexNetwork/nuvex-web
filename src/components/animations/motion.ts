/** Close to GSAP's power3.out, the easing the reference uses for entrances. */
export const easeOutStrong = [0.215, 0.61, 0.355, 1] as const;
/** Close to GSAP's power1.out, used by the counters. */
export const easeOutSoft = [0.25, 0.46, 0.45, 0.94] as const;

export const durations = {
  fast: 0.3,
  base: 0.4,
  slow: 0.8,
} as const;

/** Most reveals start when the element's top reaches 85% of the viewport height. */
export const viewportOnce = { once: true, margin: "0px 0px -15% 0px" } as const;
/** Grid blocks start as soon as they enter the viewport. */
export const viewportEnter = { once: true, margin: "0px" } as const;

export const staggerStep = 0.1;
