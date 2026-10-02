import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Splits text into characters that roll up on hover of the nearest `.roll-trigger`.
 * Screen readers get the plain text.
 */
export function RollText({
  text,
  color,
  reverse = false,
  className,
}: {
  text: string;
  /** Colour of the copy that rolls in. Defaults to the current text colour. */
  color?: string;
  /** Start the stagger from the last character. */
  reverse?: boolean;
  className?: string;
}) {
  const chars = Array.from(text);
  return (
    <span className={cn("relative inline-flex", className)}>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden
        className="roll"
        style={color ? ({ "--roll-color": color } as CSSProperties) : undefined}
      >
        {chars.map((char, index) => (
          <span
            key={index}
            className="roll-char"
            style={{ "--i": reverse ? chars.length - 1 - index : index } as CSSProperties}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
