import { SlideUp } from "@/components/animations/SlideUp";
import { RowLink } from "@/components/cards/RowLink";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureCells } from "@/components/sections/FeatureCells";
import { FocusStatement } from "@/components/sections/FocusStatement";
import { PageBanner } from "@/components/sections/PageBanner";
import { CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { banner, cta, docsHref, focus, tree } from "@/data/docs";

export const metadata = {
  title: "Documentation",
  description:
    "The Nuvex documentation tree: introduction, oracle jobs, architecture, verification, SDKs, node operation, security, developer guides and the planned read API.",
};

export default function DocsPage() {
  return (
    <>
      <PageBanner {...banner} />
      <Section>
        <SectionTitle
          title={tree.title}
          accent={tree.accent}
          description={tree.description}
          align="left"
        />
        <div className="flex flex-col gap-[60px]">
          {tree.groups.map((group) => {
            const linked = group.pages.filter((page) => !page.status);
            const planned = group.pages.filter((page) => page.status);
            return (
              <div key={group.id} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2.5">
                  <h2 className="t-h4 text-fg">{group.title}</h2>
                  <p className="max-w-[520px]">{group.description}</p>
                </div>
                {linked.length > 0 ? (
                  <SlideUp>
                    <CellGrid className="grid-cols-1">
                      {linked.map((page) => (
                        <RowLink
                          key={page.path}
                          href={docsHref(page.path)}
                          title={page.title}
                          meta={page.meta}
                        />
                      ))}
                    </CellGrid>
                  </SlideUp>
                ) : null}
                {planned.length > 0 ? (
                  <FeatureCells
                    cols={3}
                    items={planned.map((page) => ({
                      title: page.title,
                      body: page.meta,
                      status: page.status,
                    }))}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </Section>
      <FocusStatement text={focus.text} accent={focus.accent} />
      <CtaBanner title={cta.title} accent={cta.accent} action={cta.action} />
    </>
  );
}
