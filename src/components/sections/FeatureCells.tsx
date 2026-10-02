import type { ReactNode } from "react";

import { SlideUp } from "@/components/animations/SlideUp";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { CapabilityStatus } from "@/data/protocol";
import { cn } from "@/lib/utils";

export type FeatureItem = {
  icon?: ReactNode;
  title: string;
  body: string;
  status?: CapabilityStatus;
};

const columns = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
  6: "grid-cols-1 sm:grid-cols-3 md:grid-cols-6",
} as const;

/**
 * The repeated icon-title-description cell grid. An optional lead cell carries a
 * larger statement and a visual, as the reference does on its capability grids.
 */
export function FeatureCells({
  items,
  cols = 2,
  lead,
  className,
}: {
  items: FeatureItem[];
  cols?: keyof typeof columns;
  lead?: { title: string; accent?: string; visual?: ReactNode; span?: number };
  className?: string;
}) {
  return (
    <SlideUp>
      <CellGrid className={cn(columns[cols], className)}>
        {lead ? (
          <Cell
            className="flex flex-col justify-between gap-10 p-[30px] sm:col-span-2"
            style={{ gridColumn: lead.span ? `span ${lead.span} / span ${lead.span}` : undefined }}
          >
            <h3 className="t-h4 max-w-[420px]">
              {lead.title} {lead.accent ? <span className="gray">{lead.accent}</span> : null}
            </h3>
            {lead.visual}
          </Cell>
        ) : null}
        {items.map((item) => (
          <Cell key={item.title} className="flex flex-col items-start gap-3.5 p-[30px] pb-5">
            {item.icon ? <span className="mb-2.5 text-fg">{item.icon}</span> : null}
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="t-h6 text-fg">{item.title}</h4>
              {item.status ? <StatusBadge status={item.status} /> : null}
            </div>
            <p className="max-w-[320px]">{item.body}</p>
          </Cell>
        ))}
      </CellGrid>
    </SlideUp>
  );
}
