import { FileCog, FolderKey, Hammer, KeyRound, ListChecks, TerminalSquare } from "lucide-react";
import type { ReactNode } from "react";

import { SlideUp } from "@/components/animations/SlideUp";
import { CodePanel, MiniCard } from "@/components/protocol/visuals";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureCells } from "@/components/sections/FeatureCells";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { FocusStatement } from "@/components/sections/FocusStatement";
import { PageBanner } from "@/components/sections/PageBanner";
import { TechStrip } from "@/components/sections/TechStrip";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  banner,
  checks,
  cta,
  environment,
  focus,
  snippets,
  stack,
  surfaces,
  type SurfaceId,
} from "@/data/developers";

export const metadata = {
  title: "Developers",
  description:
    "The Nuvex Rust SDK, JavaScript SDK and CLI: PDA derivation, host VRF proving, callback CPI, local checks with make check, and environment-driven configuration.",
};

const visuals: Record<SurfaceId, ReactNode> = {
  rust: <CodePanel variant="rust" />,
  ts: <CodePanel variant="ts" />,
  cli: <CodePanel variant="cli" />,
  cpi: <MiniCard variant="callback" />,
};

const icons: Record<string, ReactNode> = {
  format: <ListChecks aria-hidden size={22} strokeWidth={1.5} />,
  build: <Hammer aria-hidden size={22} strokeWidth={1.5} />,
  test: <TerminalSquare aria-hidden size={22} strokeWidth={1.5} />,
  copy: <FileCog aria-hidden size={22} strokeWidth={1.5} />,
  ids: <KeyRound aria-hidden size={22} strokeWidth={1.5} />,
  keys: <FolderKey aria-hidden size={22} strokeWidth={1.5} />,
};

const withIcon = (items: { id: string; title: string; body: string }[]) =>
  items.map((item) => ({ ...item, icon: icons[item.id] }));

export default function DevelopersPage() {
  return (
    <>
      <PageBanner {...banner} />
      <TechStrip caption={stack.caption} names={stack.names} />
      <Section>
        <SectionTitle
          title={surfaces.title}
          accent={surfaces.accent}
          description={surfaces.description}
          align="left"
        />
        <FeatureSplit
          items={surfaces.items.map((item) => ({ ...item, visual: visuals[item.id] }))}
        />
      </Section>
      <Section>
        <SectionTitle
          title={snippets.title}
          accent={snippets.accent}
          description={snippets.description}
          align="left"
        />
        <SlideUp>
          <CellGrid className="grid-cols-1 md:grid-cols-2">
            {snippets.items.map((snippet) => (
              <Cell key={snippet.id} className="flex flex-col gap-3.5 p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="t-h6 text-fg">{snippet.title}</h3>
                  <span className="t-meta">{snippet.language}</span>
                </div>
                <pre className="overflow-x-auto rounded-[10px] bg-surface p-5 font-mono text-[13px] leading-6 text-fg-soft">
                  <code>{snippet.code}</code>
                </pre>
              </Cell>
            ))}
          </CellGrid>
        </SlideUp>
      </Section>
      <FocusStatement text={focus.text} accent={focus.accent} />
      <Section>
        <SectionTitle
          title={checks.title}
          accent={checks.accent}
          description={checks.description}
          align="left"
        />
        <FeatureCells items={withIcon(checks.items)} cols={3} />
      </Section>
      <Section>
        <SectionTitle title={environment.title} accent={environment.accent} align="left" />
        <FeatureCells items={withIcon(environment.items)} cols={3} />
      </Section>
      <CtaBanner title={cta.title} accent={cta.accent} action={cta.action} />
    </>
  );
}
