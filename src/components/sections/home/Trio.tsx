import { SlideUp } from "@/components/animations/SlideUp";
import { MiniCard } from "@/components/protocol/visuals";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { trio } from "@/data/home";

export function Trio() {
  return (
    <Section aria-label="How a request is served">
      <SlideUp>
        <CellGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {trio.map((item) => (
            <Cell
              key={item.id}
              className="flex flex-col items-center justify-start gap-3 px-6 pt-2.5 pb-6 text-center md:justify-center"
            >
              <div className="mt-5 mb-2 flex w-full justify-center">
                <MiniCard variant={item.id} />
              </div>
              <h3 className="t-h5">{item.title}</h3>
              <p className="max-w-[320px] text-center">{item.body}</p>
            </Cell>
          ))}
        </CellGrid>
      </SlideUp>
    </Section>
  );
}
