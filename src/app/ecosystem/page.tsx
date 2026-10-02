import type { Metadata } from "next";

import { StackedCard } from "@/components/cards/StackedCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageBanner } from "@/components/sections/PageBanner";
import { Section } from "@/components/ui/Section";
import { ecosystemEntries, ecosystemPage } from "@/data/ecosystem";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "Worked examples and concepts for Nuvex, never partnerships. Each page says which pieces of the protocol exist today, which are reserved identifiers, and what a developer would have to build.",
};

export default function EcosystemIndexPage() {
  return (
    <>
      <PageBanner
        tag={ecosystemPage.tag}
        title={ecosystemPage.title}
        accent={ecosystemPage.accent}
        lead={ecosystemPage.lead}
        titleWidth={700}
      />
      <Section spacing="none" className="pb-[var(--section-y)]" aria-label="Examples and concepts">
        <div className="flex flex-col gap-2.5">
          {ecosystemEntries.map((entry) => (
            <div key={entry.slug} className="sticky top-[100px]">
              <StackedCard
                href={`/ecosystem/${entry.slug}`}
                label={entry.label}
                title={entry.title}
                image={entry.image}
                alt={entry.alt}
                cta="See what exists"
              />
            </div>
          ))}
        </div>
      </Section>
      <CtaBanner
        title={ecosystemPage.cta.title}
        accent={ecosystemPage.cta.accent}
        action={ecosystemPage.cta.action}
      />
    </>
  );
}
