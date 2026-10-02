import { ArrowUpRight } from "lucide-react";

import { SlideUp } from "@/components/animations/SlideUp";
import { ContactForm } from "@/components/forms/ContactForm";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageBanner } from "@/components/sections/PageBanner";
import { TechStrip } from "@/components/sections/TechStrip";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SmartLink } from "@/components/ui/SmartLink";
import {
  contactBanner,
  contactCta,
  contactQuote,
  contactRoutes,
  contactStrip,
} from "@/data/company";

export const metadata = {
  title: "Contact",
  description:
    "Reach the Nuvex project through its repositories: a prefilled GitHub issue, the private security advisory form, or the documentation. There is no mailbox behind this page.",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner {...contactBanner} width={760} titleWidth={620} />
      <TechStrip {...contactStrip} />

      <Section spacing="none" className="pb-[var(--section-y)]">
        <SlideUp>
          <CellGrid className="grid-cols-1 md:grid-cols-2">
            <Cell className="p-[30px] sm:p-10">
              <ContactForm />
            </Cell>
            <Cell className="flex flex-col gap-10 p-[30px] sm:p-10">
              <figure className="flex flex-col gap-3.5">
                <blockquote className="t-h4 text-fg">&ldquo;{contactQuote.text}&rdquo;</blockquote>
                <figcaption className="t-small text-subtle">{contactQuote.source}</figcaption>
              </figure>
              <p className="max-w-[420px]">{contactQuote.context}</p>
              <ul className="flex flex-col">
                {contactRoutes.map((route) => (
                  <li
                    key={route.title}
                    className="flex flex-col gap-2 border-t border-line py-5 first:border-t-0 first:pt-0"
                  >
                    <h2 className="t-h6 text-fg">{route.title}</h2>
                    <p className="max-w-[420px] text-sm">{route.body}</p>
                    <SmartLink
                      href={route.href}
                      className="inline-flex items-center gap-1.5 text-sm text-fg underline-offset-4 hover:underline"
                    >
                      {route.linkLabel}
                      <ArrowUpRight aria-hidden size={14} strokeWidth={2} />
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </Cell>
          </CellGrid>
        </SlideUp>
      </Section>

      <CtaBanner title={contactCta.title} accent={contactCta.accent} action={contactCta.action} />
    </>
  );
}
