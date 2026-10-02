import { Brain, Cpu, Database, Dices, type LucideIcon } from "lucide-react";

import { SlideUp } from "@/components/animations/SlideUp";
import { HeartbeatChart } from "@/components/protocol/visuals";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { capabilities, type Capability } from "@/data/home";

const icons: Record<Capability["icon"], LucideIcon> = {
  dice: Dices,
  database: Database,
  cpu: Cpu,
  brain: Brain,
};

export function Capabilities() {
  return (
    <Section>
      <SectionTitle title={capabilities.title} accent={capabilities.accent} />
      <SlideUp>
        <CellGrid className="grid-cols-1 sm:grid-cols-2">
          <Cell className="p-[30px]">
            <h3 className="t-h4 max-w-[340px]">
              {capabilities.lead} <span className="gray">{capabilities.leadAccent}</span>
            </h3>
          </Cell>
          <Cell className="flex min-h-[300px] items-center justify-center p-[30px] sm:min-h-[400px] md:min-h-[350px] lg:min-h-[388px]">
            <HeartbeatChart />
          </Cell>
          {capabilities.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <Cell key={item.title} className="flex flex-col items-start gap-3.5 p-[30px] pb-5">
                <Icon aria-hidden size={24} strokeWidth={1.5} className="mb-2.5 text-fg" />
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="t-h6 text-fg">{item.title}</h4>
                  <StatusBadge status={item.status} />
                </div>
                <p className="max-w-[320px]">{item.body}</p>
              </Cell>
            );
          })}
        </CellGrid>
      </SlideUp>
    </Section>
  );
}
