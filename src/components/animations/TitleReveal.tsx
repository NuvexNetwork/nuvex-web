"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";

import { durations, easeOutStrong, viewportOnce } from "./motion";

const word: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: durations.base, ease: easeOutStrong } },
};

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

function Words({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text
        .split(/\s+/)
        .filter(Boolean)
        .map((part, index) => (
          <span
            key={`${part}-${index}`}
            className="inline-flex overflow-hidden pb-[0.08em] align-top"
          >
            <motion.span variants={word} className={className}>
              {part}
            </motion.span>
            {"\u00a0"}
          </span>
        ))}
    </>
  );
}

export type TitleRevealProps = {
  as?: keyof typeof tags;
  text: string;
  /** Trailing words in the muted grey. */
  accent?: string;
  className?: string;
  style?: CSSProperties;
  id?: string;
  /** Start on mount instead of on scroll, for banners and the closing band. */
  immediate?: boolean;
  delay?: number;
};

/** Headings rise word by word out of a mask. */
export function TitleReveal({
  as = "h2",
  text,
  accent,
  className,
  style,
  id,
  immediate = false,
  delay = 0,
}: TitleRevealProps) {
  const Tag = tags[as];
  const trigger = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: viewportOnce };

  return (
    <Tag
      id={id}
      className={className}
      style={style}
      aria-label={accent ? `${text} ${accent}` : text}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay + 0.1 } },
      }}
    >
      <span aria-hidden>
        <Words text={text} />
        {accent ? <Words text={accent} className="gray" /> : null}
      </span>
    </Tag>
  );
}
