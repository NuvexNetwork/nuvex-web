import type { Metadata } from "next";

import { SlideUp } from "@/components/animations/SlideUp";
import { HeartbeatChart, NodesPanel, StakePanel } from "@/components/protocol/visuals";
import { CounterCells } from "@/components/sections/CounterCells";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureCells } from "@/components/sections/FeatureCells";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { FocusStatement } from "@/components/sections/FocusStatement";
import { PageBanner } from "@/components/sections/PageBanner";
import { Cell } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { networkPage as page } from "@/data/product";

export const metadata: Metadata = page.meta;

const panels = {
  nodes: <NodesPanel />,
  heartbeat: <HeartbeatChart />,
  stake: <StakePanel />,
};

export default function NetworkPage() {
  return (
    <>
      <PageBanner {...page.banner}>
        <CounterCells items={page.counters} />
      </PageBanner>
      <Section aria-labelledby="eligibility-title">
        <SectionTitle
          id="eligibility-title"
          title={page.eligibility.title}
          accent={page.eligibility.accent}
        />
        <FeatureSplit
          items={page.eligibility.items.map((item) => ({ ...item, visual: panels[item.panel] }))}
        />
      </Section>
      <FocusStatement {...page.focus} />
      <Section spacing="tight" aria-label="Statement from the protocol repository">
        <SlideUp>
          <Cell as="figure" className="flex flex-col gap-10 p-[30px]">
            <figcaption>
              <p className="text-fg">{page.quote.source}</p>
              <p>{page.quote.context}</p>
            </figcaption>
            <blockquote className="t-h3 max-w-[833px]">
              &ldquo;{page.quote.text} <span className="gray">{page.quote.accent}</span>&rdquo;
            </blockquote>
          </Cell>
        </SlideUp>
      </Section>
      <Section aria-labelledby="limits-title">
        <SectionTitle
          id="limits-title"
          title={page.limits.title}
          accent={page.limits.accent}
          align="left"
          width={420}
        />
        <FeatureCells cols={3} items={page.limits.items} />
      </Section>
      <CtaBanner {...page.cta} />
    </>
  );
}
