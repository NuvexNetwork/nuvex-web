import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { GroupReveal } from "@/components/animations/GroupReveal";
import { TitleReveal } from "@/components/animations/TitleReveal";
import { Button } from "@/components/buttons/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export type BannerTag = {
  /** Leading words, shown in white. */
  strong: string;
  rest?: string;
  href?: string;
  icon?: ReactNode;
};

export type PageBannerProps = {
  tag?: BannerTag;
  title: string;
  /** Trailing words in the muted grey. */
  accent?: string;
  lead?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Banner column width. The reference uses 600 to 864 depending on the page. */
  width?: number;
  titleWidth?: number;
  /** Pull the following section up against the banner. */
  flush?: boolean;
  children?: ReactNode;
};

function Tag({ tag }: { tag: BannerTag }) {
  const inner = (
    <>
      {tag.icon}
      <span className="text-sm text-muted">
        <span className="text-fg">{tag.strong}</span>
        {tag.rest ? ` ${tag.rest}` : null}
      </span>
      {tag.href ? (
        <span className="relative grid size-5 place-items-center overflow-hidden rounded-full bg-primary">
          <ArrowRight
            aria-hidden
            size={12}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-[150%]"
          />
          <ArrowRight
            aria-hidden
            size={12}
            strokeWidth={2.5}
            className="absolute -translate-x-[150%] transition-transform duration-300 group-hover:translate-x-0"
          />
        </span>
      ) : null}
    </>
  );

  const classes =
    "group inline-flex items-center gap-2 rounded-[20px] border border-line p-[5px] pl-2";
  return tag.href ? (
    <Link href={tag.href} className={classes}>
      {inner}
    </Link>
  ) : (
    <span className={classes}>{inner}</span>
  );
}

/**
 * The centred page banner that opens every inner page: optional tag pill, masked
 * heading, lead paragraph and up to two buttons.
 */
export function PageBanner({
  tag,
  title,
  accent,
  lead,
  primary,
  secondary,
  width = 750,
  titleWidth = 650,
  flush = false,
  children,
}: PageBannerProps) {
  return (
    <section className="relative z-[1] pt-[var(--section-y-banner)] pb-[var(--section-y)]">
      <Container>
        <GroupReveal
          immediate
          className={cn(
            "mx-auto flex flex-col items-center gap-3.5 text-center",
            !flush && "pb-[50px]",
          )}
          style={{ maxWidth: width }}
        >
          {tag ? <Tag tag={tag} /> : null}
          <TitleReveal
            as="h1"
            immediate
            delay={0.1}
            text={title}
            accent={accent}
            className="t-hero mx-auto"
            style={{ maxWidth: titleWidth }}
          />
          {lead ? <p className="mx-auto mt-2.5 max-w-[600px]">{lead}</p> : null}
          {primary || secondary ? (
            <div className="mt-4 inline-flex items-center justify-center gap-3">
              {primary ? <Button href={primary.href}>{primary.label}</Button> : null}
              {secondary ? (
                <Button href={secondary.href} variant="text">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </GroupReveal>
        {children}
      </Container>
    </section>
  );
}
