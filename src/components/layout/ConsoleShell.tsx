import type { ReactNode } from "react";

import { GroupReveal } from "@/components/animations/GroupReveal";
import { TitleReveal } from "@/components/animations/TitleReveal";
import { IllustrationNote, Panel, PanelHeader } from "@/components/protocol/PanelUI";
import { Container } from "@/components/ui/Container";
import { SmartLink } from "@/components/ui/SmartLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ConsoleView } from "@/data/console";
import { consoleNav } from "@/data/navigation";
import type { CapabilityStatus } from "@/data/protocol";
import { ConsoleNavLink } from "./ConsoleNavLink";

/** Sidebar and header shared by every console route. */
export function ConsoleShell({ children }: { children: ReactNode }) {
  return (
    <div className="pt-[var(--section-y-banner)] pb-[var(--section-y)]">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr] md:gap-10">
          <nav
            aria-label="Console"
            className="flex flex-col gap-6 md:sticky md:top-[110px] md:self-start"
          >
            {consoleNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <p className="t-eyebrow text-subtle">{group.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <ConsoleNavLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}

/** Page header plus body for one console route. */
export function ConsolePage({
  title,
  status,
  description,
  source,
  children,
}: {
  title: string;
  status: CapabilityStatus;
  description: string;
  /** Where the real data will come from once it exists. */
  source?: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <>
      <GroupReveal immediate className="flex flex-col items-start gap-4">
        <StatusBadge status={status} />
        <TitleReveal as="h1" immediate text={title} className="t-h3" />
        <p className="max-w-[560px]">{description}</p>
        {source ? (
          <SmartLink
            href={source.href}
            className="text-sm text-fg underline-offset-4 hover:underline"
          >
            {source.label}
          </SmartLink>
        ) : null}
      </GroupReveal>
      {children ? <div className="mt-10 flex flex-col gap-5">{children}</div> : null}
    </>
  );
}

/** One console route: header, the honest empty state, then optional illustrations. */
export function ConsoleView({ view, children }: { view: ConsoleView; children?: ReactNode }) {
  return (
    <ConsolePage
      title={view.title}
      status={view.status}
      description={view.description}
      source={view.source}
    >
      <ConsoleNotes notes={view.notes} />
      {children}
    </ConsolePage>
  );
}

/** The honest empty state: what this view will read, and what it reads today. */
export function ConsoleNotes({ notes }: { notes: { label: string; value: string }[] }) {
  return (
    <Panel className="p-5">
      <PanelHeader title="Status" meta={<IllustrationNote />} />
      <dl className="mt-4 flex flex-col divide-y divide-line">
        {notes.map((note) => (
          <div key={note.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
            <dt className="text-sm text-muted sm:w-[130px] sm:shrink-0">{note.label}</dt>
            <dd className="text-sm text-fg-soft">{note.value}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
