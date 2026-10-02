import type { ReactNode } from "react";

import { SlideUp } from "@/components/animations/SlideUp";
import { Button } from "@/components/buttons/Button";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { CapabilityStatus } from "@/data/protocol";
import { cn } from "@/lib/utils";

export type SplitItem = {
  id?: string;
  title: string;
  /** Trailing words in the muted grey. */
  accent?: string;
  body: string;
  status?: CapabilityStatus;
  link?: { label: string; href: string };
  visual?: ReactNode;
  /** Put the visual on the left of this row. */
  reverse?: boolean;
};

/** Alternating rows of copy and visual, sharing one hairline grid. */
export function FeatureSplit({ items, className }: { items: SplitItem[]; className?: string }) {
  return (
    <SlideUp>
      <CellGrid className={cn("grid-cols-1 sm:grid-cols-2", className)}>
        {items.flatMap((item) => {
          const copy = (
            <Cell
              key={`${item.title}-copy`}
              id={item.id}
              className={cn(
                "flex flex-col items-start gap-3.5 p-[30px]",
                item.reverse && "sm:order-2",
              )}
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="t-h5">
                  {item.title} {item.accent ? <span className="gray">{item.accent}</span> : null}
                </h3>
                {item.status ? <StatusBadge status={item.status} /> : null}
              </div>
              <p className="mb-3 max-w-[400px]">{item.body}</p>
              {item.link ? <Button href={item.link.href}>{item.link.label}</Button> : null}
            </Cell>
          );
          const visual = (
            <Cell
              key={`${item.title}-visual`}
              className={cn(
                "flex min-h-[260px] items-center justify-center p-[30px]",
                item.reverse && "sm:order-1",
              )}
            >
              {item.visual}
            </Cell>
          );
          return [copy, visual];
        })}
      </CellGrid>
    </SlideUp>
  );
}
