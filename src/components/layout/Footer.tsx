import Image from "next/image";
import Link from "next/link";

import { GroupReveal } from "@/components/animations/GroupReveal";
import { SlideUp } from "@/components/animations/SlideUp";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { RollText } from "@/components/ui/RollText";
import { SmartLink } from "@/components/ui/SmartLink";
import { footerGroups } from "@/data/navigation";

export function Footer() {
  const groups = footerGroups.filter((group) => group.links.length > 0);

  return (
    <footer className="overflow-hidden pt-[var(--section-y)]">
      <Container>
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <SlideUp immediate className="w-full max-w-[160px]">
            <Logo className="max-h-none self-start [&>img:first-child]:h-8 [&>img:last-child]:h-3.5" />
          </SlideUp>

          <nav aria-label="Footer" className="w-full max-w-[690px]">
            <GroupReveal
              immediate
              className="grid grid-cols-2 gap-x-10 gap-y-[70px] sm:grid-cols-3 md:gap-x-[70px]"
            >
              {groups.map((group) => (
                <div key={group.title}>
                  <h2 className="mb-4 text-sm font-normal text-fg">{group.title}</h2>
                  <ul className="flex flex-col items-start gap-1">
                    {group.links.map((link) => (
                      <li key={`${group.title}-${link.href}`}>
                        <SmartLink
                          href={link.href}
                          className="roll-trigger flex text-sm text-muted"
                        >
                          <RollText text={link.label} color="var(--n8)" />
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </GroupReveal>
          </nav>
        </div>

        <SlideUp className="mt-[50px] mb-5">
          <Link href="/" aria-label="Nuvex home" className="block">
            <Image
              src="/brand/wordmark.png"
              alt=""
              width={259}
              height={31}
              sizes="(min-width: 1070px) 1038px, 100vw"
              className="h-auto w-full opacity-[0.09]"
            />
          </Link>
        </SlideUp>

        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <p className="text-muted">
            © {new Date().getFullYear()} Nuvex. Website code under the Apache-2.0 licence.
          </p>
          <a href="#top" className="roll-trigger flex text-fg">
            <RollText text="Scroll to Top" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
