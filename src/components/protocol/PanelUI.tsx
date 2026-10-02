import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Dark interface card used by every product illustration. */
export function Panel({
  children,
  className,
  glass = false,
}: {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[10px] text-left ring-1",
        glass
          ? "bg-[rgb(20_22_24/0.62)] ring-white/10 backdrop-blur-xl"
          : "bg-[#0b0b0b] ring-white/[0.07]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  title,
  meta,
  className,
}: {
  title: string;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <span className="flex items-center gap-2.5 text-[15px] text-fg">
        <span aria-hidden className="grid grid-cols-2 gap-[3px]">
          <span className="size-[5px] rounded-full bg-fg" />
          <span className="size-[5px] rounded-full bg-fg/60" />
          <span className="size-[5px] rounded-full bg-fg/60" />
          <span className="size-[5px] rounded-full bg-fg" />
        </span>
        {title}
      </span>
      {meta ? <span className="text-[11px] text-muted">{meta}</span> : null}
    </div>
  );
}

const chipTones = {
  positive: "bg-[#3ecf8e]/15 text-[#5fe0a5]",
  accent: "bg-primary/20 text-primary-soft",
  neutral: "bg-white/[0.07] text-fg-soft",
  negative: "bg-[#ff5a4a]/15 text-[#ff8a7d]",
} as const;

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof chipTones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] leading-4 font-medium",
        chipTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-mono text-[12px] text-fg-soft", className)}>{children}</span>;
}

/** States the illustration is not live data. Kept visible on every visual. */
export function IllustrationNote({ className }: { className?: string }) {
  return (
    <span className={cn("text-[10px] tracking-wide text-subtle uppercase", className)}>
      Illustration · not chain data
    </span>
  );
}
