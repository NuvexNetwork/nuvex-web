import { SlideUp } from "@/components/animations/SlideUp";
import { Button } from "@/components/buttons/Button";
import { CodePanel } from "@/components/protocol/visuals";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { toolkit } from "@/data/home";

export function Toolkit() {
  return (
    <Section>
      <SectionTitle title={toolkit.title} accent={toolkit.accent} align="left" />
      <SlideUp>
        <CellGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {toolkit.items.map((item) => (
            <Cell key={item.id} className="flex flex-col justify-between gap-5 px-6 pt-6">
              <div className="flex flex-col items-start gap-3">
                <h3 className="t-h5">{item.title}</h3>
                <p className="mb-3 text-sm">{item.body}</p>
                <Button href={item.href}>Learn more</Button>
              </div>
              <div className="-mx-2 pb-6">
                <CodePanel variant={item.id} />
              </div>
            </Cell>
          ))}
        </CellGrid>
      </SlideUp>
    </Section>
  );
}
