import { SlideUp } from "@/components/animations/SlideUp";
import { Button } from "@/components/buttons/Button";
import { StakePanel, VerifyPanel } from "@/components/protocol/visuals";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { reasons } from "@/data/home";

const visuals = {
  proofs: <VerifyPanel />,
  stake: <StakePanel />,
};

export function Reasons() {
  return (
    <Section>
      <SectionTitle title={reasons.title} accent={reasons.accent} align="left" width={420} />
      <SlideUp>
        <CellGrid className="grid-cols-1 sm:grid-cols-2">
          {reasons.items.map((item) => (
            <Cell
              key={item.id}
              className="flex flex-col items-start gap-3 bg-bg p-[30px] pb-0 max-sm:sticky max-sm:top-[100px]"
            >
              <h3 className="t-h5">
                {item.title} <span className="gray">{item.accent}</span>
              </h3>
              <p className="mb-3">{item.body}</p>
              <Button href={item.href}>Learn more</Button>
              <div className="mt-5 w-full pb-[30px]">{visuals[item.id]}</div>
            </Cell>
          ))}
        </CellGrid>
      </SlideUp>
    </Section>
  );
}
