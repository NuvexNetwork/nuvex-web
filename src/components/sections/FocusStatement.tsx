import { TitleReveal } from "@/components/animations/TitleReveal";
import { Container } from "@/components/ui/Container";

/** A single large statement, 690px wide, between two denser sections. */
export function FocusStatement({ text, accent }: { text: string; accent?: string }) {
  return (
    <section className="py-[var(--section-y)]">
      <Container>
        <div className="mx-auto max-w-[690px] overflow-hidden py-2.5">
          <TitleReveal text={text} accent={accent} className="t-section" />
        </div>
      </Container>
    </section>
  );
}
