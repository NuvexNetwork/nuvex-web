import { Brain, Cpu, Database, Dices, Layers, Network, type LucideIcon } from "lucide-react";

import { SlideUp } from "@/components/animations/SlideUp";
import { Button } from "@/components/buttons/Button";
import { RowLink } from "@/components/cards/RowLink";
import { CounterCells } from "@/components/sections/CounterCells";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureCells } from "@/components/sections/FeatureCells";
import { FocusStatement } from "@/components/sections/FocusStatement";
import { PageBanner } from "@/components/sections/PageBanner";
import { TechStrip } from "@/components/sections/TechStrip";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SmartLink } from "@/components/ui/SmartLink";
import {
  aboutBanner,
  aboutCapabilities,
  aboutStrip,
  aboutCounters,
  aboutCta,
  aboutFocus,
  decisions,
  openDecisions,
  repositories,
  type AboutIcon,
} from "@/data/company";

export const metadata = {
  title: "About",
  description:
    "Nuvex is a Solana-native verifiable compute and oracle protocol at Milestone 3, run through seven numbered decision records across four open repositories.",
};

const icons: Record<AboutIcon, LucideIcon> = {
  layers: Layers,
  dice: Dices,
  network: Network,
  database: Database,
  cpu: Cpu,
  brain: Brain,
};

export default function AboutPage() {
  return (
    <>
      <PageBanner {...aboutBanner} width={820} titleWidth={760}>
        <CounterCells items={aboutCounters} />
      </PageBanner>
      <TechStrip {...aboutStrip} />

      <Section aria-labelledby="capabilities-title">
        <SectionTitle
          id="capabilities-title"
          title={aboutCapabilities.title}
          accent={aboutCapabilities.accent}
          description={aboutCapabilities.description}
          align="left"
        />
        <FeatureCells
          cols={3}
          items={aboutCapabilities.items.map((item) => {
            const Icon = icons[item.icon];
            return {
              icon: <Icon aria-hidden size={24} strokeWidth={1.5} />,
              title: item.title,
              body: item.body,
              status: item.status,
            };
          })}
        />
      </Section>

      <FocusStatement text={aboutFocus.text} accent={aboutFocus.accent} />

      <Section aria-labelledby="decisions-title">
        <SectionTitle
          id="decisions-title"
          title={decisions.title}
          accent={decisions.accent}
          description={decisions.description}
          align="left"
          action={<Button href={decisions.action.href}>{decisions.action.label}</Button>}
        />
        <SlideUp>
          <CellGrid className="grid-cols-1">
            {decisions.items.map((record) => (
              <RowLink
                key={record.title}
                href={record.href}
                title={record.title}
                meta={record.status}
              />
            ))}
          </CellGrid>
        </SlideUp>
      </Section>

      <Section aria-labelledby="repositories-title">
        <SectionTitle
          id="repositories-title"
          title={repositories.title}
          accent={repositories.accent}
          description={repositories.description}
          align="left"
        />
        <SlideUp>
          <CellGrid className="grid-cols-1 sm:grid-cols-2">
            {repositories.items.map((repo) => (
              <Cell
                key={repo.meta}
                className="cell-hover flex flex-col items-start gap-3.5 p-[30px]"
              >
                <p className="t-meta font-mono">{repo.meta}</p>
                <h3 className="t-h5">
                  <SmartLink href={repo.href} className="underline-offset-4 hover:underline">
                    {repo.title}
                  </SmartLink>
                </h3>
                <p className="max-w-[400px]">{repo.body}</p>
              </Cell>
            ))}
          </CellGrid>
        </SlideUp>
      </Section>

      <Section aria-labelledby="open-title">
        <SectionTitle
          id="open-title"
          title={openDecisions.title}
          accent={openDecisions.accent}
          description={openDecisions.description}
          align="left"
        />
        <FeatureCells cols={3} items={openDecisions.items} />
      </Section>

      <CtaBanner title={aboutCta.title} accent={aboutCta.accent} action={aboutCta.action} />
    </>
  );
}
