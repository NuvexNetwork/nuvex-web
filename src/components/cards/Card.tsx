import type { ElementType, ReactNode } from "react";

import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils";

const surfaces = {
  /** Solid raised surface, the default card. */
  surface: "bg-surface",
  /** Surface fading into the page, for tall feature cards. */
  gradient: "bg-[image:var(--gradient-card)]",
  /** Border only, for cards placed on a busy background. */
  outline: "bg-transparent ring-1 ring-inset ring-line-strong",
} as const;

const radii = {
  m: "rounded-[var(--radius-m)]",
  l: "rounded-[var(--radius-l)]",
  xl: "rounded-[var(--radius-2xl)]",
} as const;

const paddings = {
  none: "",
  sm: "p-5",
  md: "p-6 md:p-[30px]",
  lg: "p-8 md:p-10",
} as const;

export type CardProps = {
  as?: ElementType;
  /** Makes the whole card a link. */
  href?: string;
  surface?: keyof typeof surfaces;
  radius?: keyof typeof radii;
  padding?: keyof typeof paddings;
  /** Hover lift and border glow. Enabled automatically for linked cards. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

export function Card({
  as: Tag = "div",
  href,
  surface = "surface",
  radius = "m",
  padding = "md",
  interactive,
  className,
  children,
  ...aria
}: CardProps) {
  const hoverable = interactive ?? Boolean(href);
  const classes = cn(
    "relative flex flex-col overflow-hidden",
    surfaces[surface],
    radii[radius],
    paddings[padding],
    hoverable &&
      "transition-[transform,box-shadow,background-color] duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] focus-visible:shadow-[var(--shadow-glow)] motion-reduce:hover:translate-y-0",
    className,
  );

  if (href) {
    return (
      <SmartLink href={href} className={classes} {...aria}>
        {children}
      </SmartLink>
    );
  }

  return (
    <Tag className={classes} {...aria}>
      {children}
    </Tag>
  );
}

export function CardEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("t-eyebrow text-muted", className)}>{children}</p>;
}

export function CardTitle({
  as: Heading = "h3",
  size = "md",
  children,
  className,
}: {
  as?: "h2" | "h3" | "h4";
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Heading className={cn(size === "lg" ? "t-card-title-lg" : "t-card-title", className)}>
      {children}
    </Heading>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("t-card-desc", className)}>{children}</p>;
}
