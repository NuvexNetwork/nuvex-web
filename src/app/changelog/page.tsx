import { SlideUp } from "@/components/animations/SlideUp";
import { UtilityGrid, UtilityPage } from "@/components/content/UtilityPage";
import { Cell } from "@/components/ui/Cell";
import { SmartLink } from "@/components/ui/SmartLink";
import { changelogPage, milestones, type MilestoneState } from "@/data/changelog";

export const metadata = {
  title: "Changelog",
  description:
    "Nuvex milestones from workspace initialisation to the current Milestone 3, with the indexer and read API of Milestone 4 still unstarted. No dates are recorded in the repository.",
};

const stateTone: Record<MilestoneState, string> = {
  Complete: "text-fg-soft",
  Current: "text-[var(--status-live)]",
  "Not started": "text-subtle",
};

export default function ChangelogPage() {
  return (
    <UtilityPage
      title={changelogPage.title}
      accent={changelogPage.accent}
      lead={changelogPage.lead}
    >
      <SlideUp className="mb-10 flex flex-wrap gap-6">
        {changelogPage.links.map((link) => (
          <SmartLink
            key={link.href}
            href={link.href}
            className="text-sm text-fg underline-offset-4 hover:underline"
          >
            {link.label}
          </SmartLink>
        ))}
      </SlideUp>

      <UtilityGrid>
        {milestones.map((milestone) => (
          <Cell
            key={milestone.label}
            className="grid grid-cols-1 gap-6 p-[30px] md:grid-cols-[200px_1fr] md:gap-10"
          >
            <div className="flex flex-col gap-2.5">
              <h2 className="t-h6 text-fg">{milestone.label}</h2>
              <p className={`t-small ${stateTone[milestone.state]}`}>{milestone.state}</p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="t-h6 text-fg">{milestone.title}</p>
              <p className="max-w-[640px]">{milestone.summary}</p>
              <ul className="flex flex-col gap-3 pl-5">
                {milestone.items.map((item) => (
                  <li key={item} className="max-w-[640px] list-disc text-muted marker:text-subtle">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="t-small text-subtle">Written down in: {milestone.sources}</p>
            </div>
          </Cell>
        ))}
      </UtilityGrid>
    </UtilityPage>
  );
}
