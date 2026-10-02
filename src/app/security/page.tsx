import type { Metadata } from "next";

import { ProgramsPanel, VerifyPanel } from "@/components/protocol/visuals";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureCells } from "@/components/sections/FeatureCells";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { FocusStatement } from "@/components/sections/FocusStatement";
import { PageBanner } from "@/components/sections/PageBanner";
import { TechStrip } from "@/components/sections/TechStrip";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { securityPage as page } from "@/data/product";

export const metadata: Metadata = page.meta;

const panels = {
  programs: <ProgramsPanel />,
  verify: <VerifyPanel />,
};

export default function SecurityPage() {
  return (
    <>
      <PageBanner {...page.banner} />
      <TechStrip {...page.strip} />
      <Section aria-labelledby="posture-title">
        <SectionTitle
          id="posture-title"
          title={page.posture.title}
          accent={page.posture.accent}
          align="left"
          width={420}
        />
        <FeatureSplit
          items={page.posture.items.map((item) => ({ ...item, visual: panels[item.panel] }))}
        />
      </Section>
      <Section aria-labelledby="documents-title">
        <SectionTitle
          id="documents-title"
          title={page.documents.title}
          accent={page.documents.accent}
          width={560}
        />
        <FeatureCells cols={3} items={page.documents.items} />
      </Section>
      <FocusStatement {...page.focus} />
      <Section aria-labelledby="keys-title">
        <SectionTitle id="keys-title" title={page.keys.title} accent={page.keys.accent} />
        <FeatureCells cols={4} items={page.keys.items} />
      </Section>
      <CtaBanner {...page.cta} />
    </>
  );
}
