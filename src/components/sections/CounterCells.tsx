import { Counter } from "@/components/animations/Counter";
import { SlideUp } from "@/components/animations/SlideUp";
import { Cell } from "@/components/ui/Cell";

export type CounterItem = { value: number; suffix?: string; label: string };

/** Four counters in one hairline row, two per row on tablets. */
export function CounterCells({ items }: { items: CounterItem[] }) {
  return (
    <SlideUp>
      <div className="relative grid grid-cols-2 border-[0.5px] border-line md:grid-cols-4">
        {items.map((item) => (
          <Cell key={item.label} className="flex flex-col gap-3.5 px-6 py-[30px]">
            <Counter value={item.value} suffix={item.suffix} className="t-stat text-fg" />
            <p className="text-fg-soft">{item.label}</p>
          </Cell>
        ))}
      </div>
    </SlideUp>
  );
}
