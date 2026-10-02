import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

const widths = {
  default: "max-w-[var(--container)]",
  small: "max-w-[var(--container-small)]",
  wide: "max-w-[var(--container-wide)]",
} as const;

export type ContainerProps = {
  size?: keyof typeof widths;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({
  size = "default",
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-[var(--gutter)]", widths[size], className)}>
      {children}
    </Tag>
  );
}
