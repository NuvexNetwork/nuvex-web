import Image from "next/image";

import { GroupReveal } from "@/components/animations/GroupReveal";
import { SlideUp } from "@/components/animations/SlideUp";
import { TitleReveal } from "@/components/animations/TitleReveal";
import { RichText } from "@/components/content/RichText";
import { Toc } from "@/components/content/Toc";
import { Container } from "@/components/ui/Container";
import { SmartLink } from "@/components/ui/SmartLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { DocSection } from "@/data/content";
import type { CapabilityStatus } from "@/data/protocol";

export type CaseLayoutProps = {
  title: string;
  lead: string;
  status: CapabilityStatus;
  /** Left column rows: "Category", "Uses", and so on. */
  meta: { label: string; value: string }[];
  source?: { label: string; href: string };
  image?: { src: string; alt: string };
  sections: DocSection[];
};

/** The example template: centred hero, then meta, body and index in three columns. */
export function CaseLayout({
  title,
  lead,
  status,
  meta,
  source,
  image,
  sections,
}: CaseLayoutProps) {
  return (
    <article>
      <section className="pt-[var(--section-y-banner)]">
        <Container>
          <GroupReveal
            immediate
            className="mx-auto flex max-w-[690px] flex-col items-center gap-6 pb-[60px] text-center"
          >
            <StatusBadge status={status} />
            <TitleReveal as="h1" immediate delay={0.1} text={title} className="t-section" />
            <p>{lead}</p>
          </GroupReveal>
          {image ? (
            <SlideUp>
              <span className="relative block aspect-[16/7] overflow-hidden rounded-[10px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1070px) 1038px, 100vw"
                  className="object-cover"
                />
              </span>
            </SlideUp>
          ) : null}
        </Container>
      </section>

      <section className="pt-[60px] pb-[var(--section-y)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[155px_1fr_220px] md:gap-4">
            <div className="flex flex-col gap-6">
              {source ? (
                <SmartLink
                  href={source.href}
                  className="text-sm text-fg underline-offset-4 hover:underline"
                >
                  {source.label}
                </SmartLink>
              ) : null}
              {meta.map((row) => (
                <div key={row.label} className="flex flex-col gap-2">
                  <p className="text-sm text-muted">{row.label}</p>
                  <p className="text-sm text-fg">{row.value}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto w-full max-w-[898px]">
              <RichText sections={sections} />
            </div>

            <div className="flex flex-col gap-3.5 md:sticky md:top-[110px] md:self-start">
              <p className="text-sm text-fg">On this page</p>
              <Toc
                items={sections.map((section) => ({ id: section.id, label: section.heading }))}
              />
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
