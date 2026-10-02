import { GroupReveal } from "@/components/animations/GroupReveal";
import { SlideUp } from "@/components/animations/SlideUp";
import { TitleReveal } from "@/components/animations/TitleReveal";
import { Container } from "@/components/ui/Container";

export type LegalSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

/** The legal template: narrow column, heading, revision date, then plain sections. */
export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <section className="pt-[var(--section-y-banner)] pb-[var(--section-y)]">
      <Container>
        <div className="mx-auto w-full max-w-[686px]">
          <GroupReveal
            immediate
            className="mb-[60px] flex flex-col items-start gap-6 md:mb-[100px]"
          >
            <TitleReveal as="h1" immediate text={title} className="t-section max-w-[660px]" />
            <p className="text-sm">
              <span className="text-muted">Last updated</span>{" "}
              <span className="text-fg">{updated}</span>
            </p>
          </GroupReveal>
          <SlideUp>
            <div className="flex flex-col gap-10">
              {sections.map((section, index) => (
                <div key={section.heading ?? index} className="flex flex-col gap-4">
                  {section.heading ? <h2 className="t-h5">{section.heading}</h2> : null}
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.list ? (
                    <ul className="flex flex-col gap-3 pl-6">
                      {section.list.map((item) => (
                        <li key={item} className="list-disc leading-[1.5] text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </SlideUp>
        </div>
      </Container>
    </section>
  );
}
