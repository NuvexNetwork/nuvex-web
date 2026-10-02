import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The outline and four corner dots that frame every grid cell. */
export function CellFrame() {
  return (
    <span aria-hidden className="cell-frame">
      <span className="cell-dot" />
      <span className="cell-dot" />
      <span className="cell-dot" />
      <span className="cell-dot" />
    </span>
  );
}

export function Cell({
  as: Tag = "div",
  className,
  style,
  children,
  id,
}: {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("cell", className)} style={style}>
      <CellFrame />
      {children}
    </Tag>
  );
}

/** A zero-gap grid whose cells share hairline borders. */
export function CellGrid({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("cell-grid", className)}>{children}</div>;
}
