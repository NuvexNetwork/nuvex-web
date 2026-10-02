import { SlideUp } from "@/components/animations/SlideUp";
import { Button } from "@/components/buttons/Button";
import { CodePanel, OperatorPanel, ProgramsPanel } from "@/components/protocol/visuals";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { surfaces } from "@/data/home";

const visuals = {
  programs: <ProgramsPanel />,
  sdk: <CodePanel variant="ts" />,
  node: <OperatorPanel />,
};

export function Surfaces() {
  return (
    <Section>
      <SectionTitle
        title={surfaces.title}
        accent={surfaces.accent}
        width={500}
        action={<Button href={surfaces.action.href}>{surfaces.action.label}</Button>}
      />
      <SlideUp>
        <CellGrid className="grid-cols-1 sm:grid-cols-2">
          {surfaces.items.flatMap((item) => [
            <Cell
              key={item.id}
              id={item.id}
              className="flex flex-col items-start gap-3 p-[30px] pb-[30px] sm:pb-1"
            >
              <h3 className="t-h5">{item.title}</h3>
              <p className="mb-3 max-w-[320px]">{item.body}</p>
              <Button href={item.href}>Learn more</Button>
            </Cell>,
            <Cell key={`${item.id}-visual`} className="flex items-center p-[30px]">
              {visuals[item.id]}
            </Cell>,
          ])}
        </CellGrid>
      </SlideUp>
    </Section>
  );
}
