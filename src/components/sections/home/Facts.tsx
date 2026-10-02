import { Counter } from "@/components/animations/Counter";
import { GroupReveal } from "@/components/animations/GroupReveal";
import { SlideUp } from "@/components/animations/SlideUp";
import { Button } from "@/components/buttons/Button";
import { Cell } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { facts } from "@/data/home";

export function Facts() {
  return (
    <Section aria-label="Protocol facts">
      <SlideUp>
        <div className="relative grid grid-cols-2 border-[0.5px] border-line md:grid-cols-4">
          {facts.items.map((item) => (
            <Cell key={item.label} className="flex flex-col gap-3.5 px-6 py-[30px]">
              <Counter value={item.value} suffix={item.suffix} className="t-stat text-fg" />
              <p className="text-fg-soft">{item.label}</p>
            </Cell>
          ))}
          <Cell className="col-span-2 md:col-span-4">
            <GroupReveal className="mx-auto flex max-w-[930px] flex-col items-center gap-6 px-6 pt-[50px] pb-[30px] text-center sm:px-[50px]">
              <p>{facts.story.eyebrow}</p>
              <h2 className="t-h3 mb-10 text-center">
                {facts.story.title} <span className="gray">{facts.story.accent}</span>
              </h2>
              <Button href={facts.story.action.href}>{facts.story.action.label}</Button>
            </GroupReveal>
          </Cell>
        </div>
      </SlideUp>
    </Section>
  );
}
