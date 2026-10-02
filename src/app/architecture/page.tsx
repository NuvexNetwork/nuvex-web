import type { Metadata } from "next";

import { ProgramsPanel, RequestPanel, VerifyPanel } from "@/components/protocol/visuals";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureCells } from "@/components/sections/FeatureCells";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { FocusStatement } from "@/components/sections/FocusStatement";
import { PageBanner } from "@/components/sections/PageBanner";
import { TechStrip } from "@/components/sections/TechStrip";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { architecturePage as page } from "@/data/product";

export const metadata: Metadata = page.meta;

const panels = {
  request: <RequestPanel />,
  verify: <VerifyPanel />,
};

export default function ArchitecturePage() {
  return (
    <>
      <PageBanner {...page.banner} width={800} titleWidth={700} />
      <TechStrip {...page.strip} />
      <Section aria-labelledby="programs-title">
        <SectionTitle
          id="programs-title"
          title={page.programs.title}
          accent={page.programs.accent}
        />
        <FeatureCells
          cols={2}
          lead={{ ...page.programs.lead, visual: <ProgramsPanel /> }}
          items={page.programs.items}
        />
      </Section>
      <Section aria-labelledby="lifecycle-title">
        <SectionTitle
          id="lifecycle-title"
          title={page.lifecycle.title}
          accent={page.lifecycle.accent}
          align="left"
          width={520}
        />
        <FeatureSplit
          items={page.lifecycle.items.map((item) => ({ ...item, visual: panels[item.panel] }))}
        />
      </Section>
      <FocusStatement {...page.focus} />
      <Section aria-labelledby="decisions-title">
        <SectionTitle
          id="decisions-title"
          title={page.decisions.title}
          accent={page.decisions.accent}
        />
        <FeatureCells cols={3} items={page.decisions.items} />
      </Section>
      <CtaBanner {...page.cta} />
    </>
  );
}
