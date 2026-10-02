import { ArrowRight, Cpu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GroupReveal } from "@/components/animations/GroupReveal";
import { SlideUp } from "@/components/animations/SlideUp";
import { TitleReveal } from "@/components/animations/TitleReveal";
import { Button } from "@/components/buttons/Button";
import { HeroConsole } from "@/components/protocol/visuals";
import { Container } from "@/components/ui/Container";
import { hero } from "@/data/home";
import { media } from "@/data/media";

export function Hero() {
  return (
    <section className="relative z-[1] pt-[var(--section-y-banner)] pb-[var(--section-y)]">
      <Container>
        <GroupReveal
          immediate
          className="mx-auto flex max-w-[750px] flex-col items-center gap-3.5 pb-[50px] text-center"
        >
          <Link
            href={hero.tag.href}
            className="group inline-flex items-center gap-2 rounded-[20px] border border-line p-[5px] pl-2"
          >
            <Cpu aria-hidden size={16} strokeWidth={1.75} className="text-fg-soft" />
            <span className="text-sm text-muted">
              <span className="text-fg">{hero.tag.strong}</span> {hero.tag.rest}
            </span>
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
          </Link>
          <TitleReveal
            as="h1"
            immediate
            delay={0.1}
            text={hero.title}
            accent={hero.accent}
            className="t-hero mx-auto max-w-[400px] md:max-w-[650px]"
          />
          <p className="mx-auto mt-2.5 mb-4 max-w-[484px]">{hero.body}</p>
          <div className="inline-flex items-center justify-center gap-3">
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="text">
              {hero.secondary.label}
            </Button>
          </div>
        </GroupReveal>

        <SlideUp delay={0.3}>
          <div className="relative isolate overflow-hidden rounded-[12px]">
            <Image
              src={media.nebula.src}
              alt=""
              fill
              priority
              sizes="(min-width: 1070px) 1038px, 100vw"
              className="-z-20 scale-110 object-cover blur-[6px] saturate-[0.85]"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/25 to-black/55"
            />
            <div aria-hidden className="grain absolute inset-0 -z-10 opacity-40" />
            <HeroConsole />
          </div>
        </SlideUp>
      </Container>
    </section>
  );
}
