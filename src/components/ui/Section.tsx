import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Container, type ContainerProps } from "./Container";

const spacing = {
  default: "py-[var(--section-y)]",
  /** Page banner, directly under the sticky navbar. */
  banner: "pt-[var(--section-y-banner)] pb-[var(--section-y)]",
  utility: "py-[var(--section-y-utility)]",
  tight: "py-[calc(var(--section-y)/2)]",
  none: "",
} as const;

export type SectionProps = {
  id?: string;
  as?: ElementType;
  spacing?: keyof typeof spacing;
  container?: ContainerProps["size"] | false;
  className?: string;
  containerClassName?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  children: ReactNode;
};

export function Section({
  id,
  as: Tag = "section",
  spacing: space = "default",
  container = "default",
  className,
  containerClassName,
  children,
  ...aria
}: SectionProps) {
  return (
    <Tag id={id} className={cn("relative", spacing[space], className)} {...aria}>
      {container === false ? (
        children
      ) : (
        <Container size={container} className={containerClassName}>
          {children}
        </Container>
      )}
    </Tag>
  );
}
