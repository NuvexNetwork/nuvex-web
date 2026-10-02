import type { ReactNode } from "react";

import { GroupReveal } from "@/components/animations/GroupReveal";
import { TitleReveal } from "@/components/animations/TitleReveal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * The utility template used by the changelog, licences and style guide: a wide
 * heading block followed by hairline rows.
 */
export function UtilityPage({
  title,
  accent,
  lead,
  children,
}: {
  title: string;
  accent?: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-[var(--section-y-utility)]">
      <Container>
        <GroupReveal immediate className="mb-[100px] flex flex-col items-start gap-[30px]">
          <TitleReveal
            as="h1"
            immediate
            text={title}
            accent={accent}
            className="t-section max-w-[550px]"
          />
          {lead ? <p className="max-w-[550px]">{lead}</p> : null}
        </GroupReveal>
        {children}
      </Container>
    </section>
  );
}

/** Hairline grid for utility rows. */
export function UtilityGrid({
  children,
  cols = 1,
  className,
}: {
  children: ReactNode;
  cols?: 1 | 2;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid border-[0.5px] border-line",
        cols === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
