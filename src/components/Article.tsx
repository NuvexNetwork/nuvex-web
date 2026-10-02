import type { ReactNode } from "react";

import { GroupReveal } from "@/components/animations/GroupReveal";
import { SlideUp } from "@/components/animations/SlideUp";
import { TitleReveal } from "@/components/animations/TitleReveal";

export function Article({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="pt-[var(--section-y-banner)] pb-[var(--section-y)]">
      <GroupReveal
        immediate
        className="mx-auto flex max-w-[750px] flex-col items-center gap-3.5 px-[var(--gutter)] pb-[50px] text-center"
      >
        <span className="inline-flex items-center rounded-[20px] border border-line px-3 py-1.5 text-sm text-muted">
          {kicker}
        </span>
        <TitleReveal as="h1" text={title} immediate className="t-hero mx-auto max-w-[650px]" />
      </GroupReveal>
      <SlideUp className="mx-auto max-w-[760px] px-[var(--gutter)]">
        <div className="page-copy space-y-5 text-lg leading-[1.5] text-muted [&_strong]:text-fg">
          {children}
        </div>
      </SlideUp>
    </article>
  );
}
