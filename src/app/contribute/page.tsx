import { SlideUp } from "@/components/animations/SlideUp";
import { RowLink } from "@/components/cards/RowLink";
import { Ban, BookOpen, KeyRound, ListChecks, ShieldOff, CircleOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureCells } from "@/components/sections/FeatureCells";
import { PageBanner } from "@/components/sections/PageBanner";
import { TechStrip } from "@/components/sections/TechStrip";
import { CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  contributeBanner,
  contributeCta,
  contributePrinciples,
  contributeStrip,
  contributionAreas,
} from "@/data/contribute";

export const metadata = {
  title: "Contribute",
  description:
    "Nuvex has no job openings. These are the contribution areas in the open repositories, the checks a pull request must pass, and the decisions it must not invent.",
};

const principleIcons: Record<(typeof contributePrinciples.items)[number]["icon"], LucideIcon> = {
  record: BookOpen,
  check: ListChecks,
  honest: Ban,
  numbers: CircleOff,
  keys: KeyRound,
  deploy: ShieldOff,
};

export default function ContributePage() {
  return (
    <>
      <PageBanner {...contributeBanner} width={780} titleWidth={700} />
      <TechStrip {...contributeStrip} />

      <Section aria-labelledby="principles-title">
        <SectionTitle
          id="principles-title"
          title={contributePrinciples.title}
          accent={contributePrinciples.accent}
          align="left"
        />
        <FeatureCells
          cols={3}
          items={contributePrinciples.items.map((item) => {
            const Icon = principleIcons[item.icon];
            return {
              icon: <Icon aria-hidden size={24} strokeWidth={1.5} />,
              title: item.title,
              body: item.body,
            };
          })}
        />
      </Section>

      <Section aria-labelledby="areas-title">
        <SectionTitle id="areas-title" title="Open areas," accent="not job openings" align="left" />
        <SlideUp>
          <CellGrid className="grid-cols-1">
            {contributionAreas.map((area) => (
              <RowLink
                key={area.slug}
                href={`/contribute/${area.slug}`}
                title={area.title}
                meta={area.scope}
              />
            ))}
          </CellGrid>
        </SlideUp>
      </Section>

      <CtaBanner
        title={contributeCta.title}
        accent={contributeCta.accent}
        action={contributeCta.action}
      />
    </>
  );
}
