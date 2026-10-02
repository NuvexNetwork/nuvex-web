import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseLayout } from "@/components/content/CaseLayout";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { contributeCta, contributionAreas, findArea } from "@/data/contribute";

export function generateStaticParams() {
  return contributionAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = findArea(slug);
  if (!area) return { title: "Contribution area not found" };
  return {
    title: `${area.title} · Contribute`,
    description: area.lead,
  };
}

export default async function ContributionAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = findArea(slug);
  if (!area) notFound();

  return (
    <>
      <CaseLayout
        title={area.title}
        lead={area.lead}
        status={area.status}
        meta={area.meta}
        source={area.source}
        sections={area.sections}
      />
      <CtaBanner
        title={contributeCta.title}
        accent={contributeCta.accent}
        action={contributeCta.action}
      />
    </>
  );
}
