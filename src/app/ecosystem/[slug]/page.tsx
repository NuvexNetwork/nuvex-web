import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StackedCard } from "@/components/cards/StackedCard";
import { CaseLayout } from "@/components/content/CaseLayout";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  ecosystemEntries,
  ecosystemPage,
  getEcosystemEntry,
  otherEcosystemEntries,
} from "@/data/ecosystem";

export function generateStaticParams() {
  return ecosystemEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEcosystemEntry(slug);
  if (!entry) return { title: "Example not found" };
  return { title: entry.title, description: entry.lead };
}

export default async function EcosystemEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEcosystemEntry(slug);
  if (!entry) notFound();

  const more = otherEcosystemEntries(entry.slug);

  return (
    <>
      <CaseLayout
        title={entry.title}
        lead={entry.lead}
        status={entry.status}
        meta={entry.meta}
        source={ecosystemPage.source}
        sections={entry.sections}
        image={{ src: entry.image, alt: entry.alt }}
      />
      <Section
        spacing="none"
        className="pb-[var(--section-y)]"
        aria-labelledby="more-examples-title"
      >
        <SectionTitle id="more-examples-title" title="More examples" align="left" />
        <div className="flex flex-col gap-2.5">
          {more.map((other) => (
            <div key={other.slug} className="sticky top-[100px]">
              <StackedCard
                href={`/ecosystem/${other.slug}`}
                label={other.label}
                title={other.title}
                image={other.image}
                alt={other.alt}
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
