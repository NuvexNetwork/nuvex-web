import type { ReactNode } from "react";

import { MaskUp } from "@/components/animations/SlideUp";
import { TitleReveal } from "@/components/animations/TitleReveal";
import { cn } from "@/lib/utils";

export type SectionTitleProps = {
  id?: string;
  title: string;
  /** Trailing words in the muted grey. */
  accent?: string;
  description?: ReactNode;
  align?: "center" | "left";
  /** Max width of the heading in pixels. The reference uses 500 to 600 for left titles. */
  width?: number;
  /** Placed on the right of a left-aligned title, such as a "View all" button. */
  action?: ReactNode;
  className?: string;
};

export function SectionTitle({
  id,
  title,
  accent,
  description,
  align = "center",
  width,
  action,
  className,
}: SectionTitleProps) {
  const left = align === "left" || Boolean(action);
  const heading = (
    <TitleReveal
      id={id}
      text={title}
      accent={accent}
      className={cn("t-section", left ? "text-left" : "mx-auto text-center")}
    />
  );

  return (
    <div
      className={cn(
        "mb-[50px]",
        Boolean(action) &&
          "flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end",
        className,
      )}
    >
      <div
        className={cn(!left && "mx-auto text-center")}
        style={{ maxWidth: width ?? (left ? 600 : 510) }}
      >
        {heading}
        {description ? (
          <MaskUp className={cn("mt-6", !left && "mx-auto max-w-[380px]")}>
            <p className={cn(!left && "text-center")}>{description}</p>
          </MaskUp>
        ) : null}
      </div>
      {action ? <MaskUp className="shrink-0">{action}</MaskUp> : null}
    </div>
  );
}
