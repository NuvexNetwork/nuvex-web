import { Fragment } from "react";

import { SlideUp } from "@/components/animations/SlideUp";
import { PriceCard } from "@/components/cards/PriceCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FocusStatement } from "@/components/sections/FocusStatement";
import { PageBanner } from "@/components/sections/PageBanner";
import { TechStrip } from "@/components/sections/TechStrip";
import { Faq } from "@/components/ui/Faq";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { banner, columns, comparison, cta, faq, focus, strip } from "@/data/economics";

export const metadata = {
  title: "Network economics",
  description:
    "What Nuvex charges today, which is nothing: max_fee is stored and never collected, ADR 0005 names fee roles without basis points, and rewards and slashing are not implemented.",
};

const grid = "grid-cols-1 md:grid-cols-[1.1fr_1.3fr_1.3fr_0.8fr]";

function ValueCell({ label, value }: { label: string; value: string }) {
  return (
    <Cell className="flex flex-col gap-1.5 px-6 py-5">
      <span className="t-meta md:hidden">{label}</span>
      <span className="t-small text-fg-soft">{value}</span>
    </Cell>
  );
}

export default function EconomicsPage() {
  return (
    <>
      <PageBanner {...banner} />
      <TechStrip {...strip} />
      <Section>
        <SectionTitle
          title={columns.title}
          accent={columns.accent}
          description={columns.description}
          align="left"
        />
        <SlideUp>
          <CellGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {columns.cards.map((card) => (
              <PriceCard key={card.audience} {...card} />
            ))}
          </CellGrid>
        </SlideUp>
      </Section>
      <Section>
        <SectionTitle title={comparison.title} accent={comparison.accent} align="left" />
        <SlideUp>
          <p className="mb-10 max-w-[690px]">{comparison.note}</p>
          <CellGrid className={grid}>
            {Object.values(comparison.headers).map((header) => (
              <Cell key={header} className="bg-surface px-6 py-3.5 max-md:hidden">
                <span className="t-meta text-fg">{header}</span>
              </Cell>
            ))}
            {comparison.groups.map((group) => (
              <Fragment key={group.title}>
                <Cell className="bg-surface px-6 py-3.5 md:col-span-4">
                  <h3 className="t-h6 text-fg">{group.title}</h3>
                </Cell>
                {group.rows.map((row) => (
                  <Fragment key={row.capability}>
                    <Cell className="px-6 py-5">
                      <span className="t-small text-fg">{row.capability}</span>
                    </Cell>
                    <ValueCell label={comparison.headers.today} value={row.today} />
                    <ValueCell label={comparison.headers.planned} value={row.planned} />
                    <ValueCell label={comparison.headers.record} value={row.record} />
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </CellGrid>
        </SlideUp>
      </Section>
      <FocusStatement text={focus.text} accent={focus.accent} />
      <Section aria-labelledby="faq-title">
        <SectionTitle id="faq-title" title={faq.title} accent={faq.accent} align="left" />
        <Faq items={faq.items} />
      </Section>
      <CtaBanner title={cta.title} accent={cta.accent} action={cta.action} />
    </>
  );
}
