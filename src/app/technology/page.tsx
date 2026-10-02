import type { Metadata } from "next";
import { Dices, ListOrdered, Split, type LucideIcon } from "lucide-react";

import { CodePanel, RequestPanel, VerifyPanel } from "@/components/protocol/visuals";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureCells } from "@/components/sections/FeatureCells";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { FocusStatement } from "@/components/sections/FocusStatement";
import { PageBanner } from "@/components/sections/PageBanner";
import { TechStrip } from "@/components/sections/TechStrip";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { technologyPage as page } from "@/data/product";

export const metadata: Metadata = page.meta;

const panels = {
  request: <RequestPanel />,
  verify: <VerifyPanel />,
  rust: <CodePanel variant="rust" />,
};

const icons: Record<"dice" | "shuffle" | "split", LucideIcon> = {
  dice: Dices,
  shuffle: ListOrdered,
  split: Split,
};

export default function TechnologyPage() {
  return (
    <>
      <PageBanner {...page.banner} />
      <TechStrip {...page.strip} />
      <Section aria-labelledby="flow-title">
        <SectionTitle id="flow-title" title={page.flow.title} accent={page.flow.accent} />
        <FeatureSplit
          items={page.flow.items.map((item) => ({ ...item, visual: panels[item.panel] }))}
        />
      </Section>
      <FocusStatement {...page.focus} />
      <Section aria-labelledby="uses-title">
        <SectionTitle
          id="uses-title"
          title={page.uses.title}
          accent={page.uses.accent}
          description={page.uses.description}
        />
        <FeatureCells
          cols={3}
          items={page.uses.items.map(({ icon, ...item }) => {
            const Icon = icons[icon];
            return { ...item, icon: <Icon aria-hidden size={24} strokeWidth={1.5} /> };
          })}
        />
      </Section>
      <CtaBanner {...page.cta} />
    </>
  );
}
