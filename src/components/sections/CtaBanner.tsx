import { GroupReveal } from "@/components/animations/GroupReveal";
import { TitleReveal } from "@/components/animations/TitleReveal";
import { Button } from "@/components/buttons/Button";
import { Container } from "@/components/ui/Container";

/** Closing band used on every marketing page: dome, title, button. */
export function CtaBanner({
  id = "cta-title",
  title,
  accent,
  action,
}: {
  id?: string;
  title: string;
  accent?: string;
  action: { label: string; href: string };
}) {
  return (
    <section
      aria-labelledby={id}
      className="relative flex h-[400px] items-start justify-center overflow-hidden pt-[88px] sm:h-[500px] sm:pt-[120px] md:h-[560px] md:pt-[150px] lg:h-[712px] lg:pt-[200px]"
    >
      <div aria-hidden className="cta-dome" />
      <Container className="relative z-[1]">
        <GroupReveal
          immediate
          className="flex flex-col items-center justify-center gap-8 text-center"
        >
          <TitleReveal
            id={id}
            immediate
            text={title}
            accent={accent}
            className="t-hero mx-auto max-w-[360px] text-center sm:max-w-[520px] md:max-w-[680px]"
          />
          <Button href={action.href}>{action.label}</Button>
        </GroupReveal>
      </Container>
    </section>
  );
}
