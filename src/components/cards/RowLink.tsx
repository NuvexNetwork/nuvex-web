import { ArrowRight } from "lucide-react";

import { Cell } from "@/components/ui/Cell";
import { RollText } from "@/components/ui/RollText";
import { SmartLink } from "@/components/ui/SmartLink";

export type RowLinkProps = {
  href: string;
  title: string;
  meta: string;
};

/** A full-width row inside a hairline list, with an arrow that slides on hover. */
export function RowLink({ href, title, meta }: RowLinkProps) {
  return (
    <Cell className="group">
      <SmartLink
        href={href}
        className="roll-trigger relative z-[2] grid grid-cols-[1fr_0.75fr] items-center gap-6 p-[30px] sm:grid-cols-[1fr_0.75fr_80px] sm:gap-[100px]"
      >
        <span className="text-fg">
          <RollText text={title} />
        </span>
        <span className="text-fg-soft">{meta}</span>
        <span className="relative hidden h-6 justify-self-end overflow-hidden sm:grid sm:w-6 sm:place-items-center">
          <ArrowRight
            aria-hidden
            size={24}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-[150%]"
          />
          <ArrowRight
            aria-hidden
            size={24}
            strokeWidth={1.5}
            className="absolute -translate-x-[150%] transition-transform duration-300 group-hover:translate-x-0"
          />
        </span>
      </SmartLink>
    </Cell>
  );
}
