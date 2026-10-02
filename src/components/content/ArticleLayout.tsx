import Image from "next/image";

import { GroupReveal } from "@/components/animations/GroupReveal";
import { SlideUp } from "@/components/animations/SlideUp";
import { TitleReveal } from "@/components/animations/TitleReveal";
import { RichText } from "@/components/content/RichText";
import { Toc } from "@/components/content/Toc";
import { Container } from "@/components/ui/Container";
import type { DocSection } from "@/data/content";

export type ArticleLayoutProps = {
  title: string;
  /** Metadata shown beside the byline, such as the milestone. */
  meta: string;
  author: string;
  category?: string;
  image?: { src: string; alt: string; credit?: { label: string; href: string } };
  sections: DocSection[];
};

/** The post template: byline, lead image, then a sticky index beside the body. */
export function ArticleLayout({
  title,
  meta,
  author,
  category,
  image,
  sections,
}: ArticleLayoutProps) {
  return (
    <article className="pt-[var(--section-y-banner)] pb-[var(--section-y)]">
      <Container>
        <GroupReveal immediate className="flex flex-col items-start gap-6">
          <p className="text-sm text-muted">
            {meta}
            {category ? ` · ${category}` : null}
          </p>
          <TitleReveal
            as="h1"
            immediate
            delay={0.1}
            text={title}
            className="t-section max-w-[900px]"
          />
          <span className="flex items-center gap-2.5">
            <Image
              src="/brand/logo.png"
              alt=""
              width={966}
              height={875}
              className="size-5 object-contain"
            />
            <span className="text-sm text-fg">{author}</span>
          </span>
        </GroupReveal>

        {image ? (
          <SlideUp className="mt-10">
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

        <div className="grid grid-cols-1 gap-[50px] pt-[60px] md:grid-cols-[minmax(240px,280px)_1fr] md:gap-[100px] md:pt-20">
          <Toc
            items={sections.map((section) => ({ id: section.id, label: section.heading }))}
            className="top-[110px] self-start md:sticky"
          />
          <RichText sections={sections} />
        </div>
      </Container>
    </article>
  );
}
