import type { Metadata } from "next";
import { Coins, FileText, Package, type LucideIcon } from "lucide-react";

import { CodePanel, OperatorPanel, StakePanel } from "@/components/protocol/visuals";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureCells } from "@/components/sections/FeatureCells";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { FocusStatement } from "@/components/sections/FocusStatement";
import { PageBanner } from "@/components/sections/PageBanner";
import { TechStrip } from "@/components/sections/TechStrip";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { nodesPage as page } from "@/data/product";

export const metadata: Metadata = page.meta;

const panels = {
  operator: <OperatorPanel />,
  stake: <StakePanel />,
  cli: <CodePanel variant="cli" />,
};

const icons: Record<"container" | "file" | "coins", LucideIcon> = {
  container: Package,
  file: FileText,
  coins: Coins,
};

export default function NodesPage() {
  return (
    <>
      <PageBanner {...page.banner} width={720} titleWidth={620} />
      <TechStrip {...page.strip} />
      <Section aria-labelledby="operating-title">
        <SectionTitle
          id="operating-title"
          title={page.operating.title}
          accent={page.operating.accent}
          align="left"
          width={440}
        />
        <FeatureSplit
          items={page.operating.items.map((item) => ({ ...item, visual: panels[item.panel] }))}
        />
      </Section>
      <FocusStatement {...page.focus} />
      <Section aria-labelledby="setup-title">
        <SectionTitle
          id="setup-title"
          title={page.setup.title}
          accent={page.setup.accent}
          description={page.setup.description}
        />
        <FeatureCells
          cols={3}
          items={page.setup.items.map(({ icon, ...item }) => {
            const Icon = icons[icon];
            return { ...item, icon: <Icon aria-hidden size={24} strokeWidth={1.5} /> };
          })}
        />
      </Section>
      <CtaBanner {...page.cta} />
    </>
  );
}
