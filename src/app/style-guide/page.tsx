import type { ReactNode } from "react";

import { Counter } from "@/components/animations/Counter";
import { GroupReveal } from "@/components/animations/GroupReveal";
import { MaskUp, SlideUp } from "@/components/animations/SlideUp";
import { TitleReveal } from "@/components/animations/TitleReveal";
import { Button } from "@/components/buttons/Button";
import { UtilityGrid, UtilityPage } from "@/components/content/UtilityPage";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { RollText } from "@/components/ui/RollText";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  accentSwatches,
  buttonVariants,
  cellNotes,
  headingScale,
  motionNotes,
  neutralSwatches,
  statusStates,
  styleGuidePage,
  textScale,
  type Swatch,
  type TypeRow,
} from "@/data/styleGuide";

export const metadata = {
  title: "Style guide",
  description:
    "The Nuvex design system rendered with its own components: the heading scale, text roles, neutral and accent swatches, button variants, status badges, the hairline cell and the motion primitives.",
};

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-[30px]">
      <h2 className="t-h4 text-fg">{title}</h2>
      {children}
    </section>
  );
}

function TypeRows({ rows }: { rows: TypeRow[] }) {
  return (
    <UtilityGrid>
      {rows.map((row) => (
        <Cell
          key={row.name}
          className="grid grid-cols-1 items-baseline gap-5 p-[30px] md:grid-cols-[1fr_220px]"
        >
          <p className={row.className}>{row.sample}</p>
          <div className="flex flex-col gap-1.5 md:text-right">
            <span className="t-small font-mono text-fg">{row.name}</span>
            <span className="t-small text-subtle">{row.specs}</span>
          </div>
        </Cell>
      ))}
    </UtilityGrid>
  );
}

function Swatches({ items }: { items: Swatch[] }) {
  return (
    <CellGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {items.map((swatch) => (
        <Cell key={swatch.token} className="flex flex-col gap-3 p-6">
          <span
            aria-hidden
            className="h-[70px] w-full rounded-[8px] border border-line-strong"
            style={{ background: swatch.hex }}
          />
          <span className="t-small font-mono text-fg">{swatch.hex}</span>
          <span className="t-small text-fg-soft">{swatch.token}</span>
          <span className="t-small text-subtle">{swatch.use}</span>
        </Cell>
      ))}
    </CellGrid>
  );
}

/** One live demonstration per motion primitive, keyed by the name in the data. */
const demos: Record<string, ReactNode> = {
  TitleReveal: <TitleReveal text="Words rise out" accent="of a mask" className="t-h4" />,
  GroupReveal: (
    <GroupReveal className="flex flex-col gap-2">
      <span className="t-h6 text-fg">First child</span>
      <span className="t-h6 text-fg-soft">Second child</span>
      <span className="t-h6 text-muted">Third child</span>
    </GroupReveal>
  ),
  SlideUp: (
    <SlideUp>
      <span className="t-h4 text-fg">This block slid up</span>
    </SlideUp>
  ),
  MaskUp: (
    <MaskUp>
      <Button href="/style-guide" variant="nav">
        Masked button
      </Button>
    </MaskUp>
  ),
  Counter: <Counter value={80} suffix=" bytes" className="t-stat text-fg" />,
  RollText: (
    <span className="roll-trigger t-h4 cursor-default text-fg">
      <RollText text="Hover this line" />
    </span>
  ),
};

export default function StyleGuidePage() {
  return (
    <UtilityPage
      title={styleGuidePage.title}
      accent={styleGuidePage.accent}
      lead={styleGuidePage.lead}
    >
      <div className="flex flex-col gap-[100px]">
        <Group title="Heading scale">
          <TypeRows rows={headingScale} />
        </Group>

        <Group title="Body, small and metadata">
          <TypeRows rows={textScale} />
        </Group>

        <Group title="Neutral scale">
          <Swatches items={neutralSwatches} />
        </Group>

        <Group title="Accent and status colours">
          <Swatches items={accentSwatches} />
        </Group>

        <Group title="Buttons">
          <CellGrid className="grid-cols-1 sm:grid-cols-3">
            {buttonVariants.map((item) => (
              <Cell key={item.variant} className="flex flex-col items-start gap-5 p-[30px]">
                <Button href="/style-guide" variant={item.variant}>
                  {item.label}
                </Button>
                <p className="t-small text-subtle">{item.note}</p>
              </Cell>
            ))}
          </CellGrid>
        </Group>

        <Group title="Status badges">
          <UtilityGrid>
            {statusStates.map((item) => (
              <Cell
                key={item.status}
                className="flex flex-col items-start gap-3.5 p-[30px] sm:flex-row sm:items-center sm:gap-10"
              >
                <span className="w-[140px] shrink-0">
                  <StatusBadge status={item.status} />
                </span>
                <p className="t-small">{item.use}</p>
              </Cell>
            ))}
          </UtilityGrid>
        </Group>

        <Group title="The hairline cell">
          <CellGrid className="grid-cols-1 sm:grid-cols-3">
            {cellNotes.map((note) => (
              <Cell
                key={note.title}
                className={`flex flex-col items-start gap-3.5 p-[30px] ${
                  note.title === "cell-hover" ? "cell-hover" : ""
                }`}
              >
                <h3 className="t-h6 text-fg">{note.title}</h3>
                <p className="t-small">{note.body}</p>
              </Cell>
            ))}
          </CellGrid>
        </Group>

        <Group title="Motion primitives">
          <CellGrid className="grid-cols-1 sm:grid-cols-2">
            {motionNotes.map((note) => (
              <Cell key={note.name} className="flex flex-col gap-6 p-[30px]">
                <div className="flex min-h-[80px] items-center">{demos[note.name]}</div>
                <div className="flex flex-col gap-1.5">
                  <span className="t-small font-mono text-fg">{note.name}</span>
                  <span className="t-small text-subtle">{note.body}</span>
                </div>
              </Cell>
            ))}
          </CellGrid>
        </Group>
      </div>
    </UtilityPage>
  );
}
