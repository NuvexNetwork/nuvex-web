import Image from "next/image";
import Link from "next/link";

import { RollText } from "@/components/ui/RollText";

export type StackedCardProps = {
  href: string;
  label: string;
  title: string;
  image: string;
  alt: string;
  cta?: string;
};

/**
 * A case-study card. The list stacks these with `sticky`, so each card parks
 * under the navbar while the next one slides over it.
 */
export function StackedCard({
  href,
  label,
  title,
  image,
  alt,
  cta = "Read the story",
}: StackedCardProps) {
  return (
    <Link
      href={href}
      className="group roll-trigger grid grid-cols-1 overflow-hidden rounded-[10px] bg-surface md:grid-cols-2"
    >
      <div className="flex flex-col items-start justify-between gap-[50px] p-[30px]">
        <div className="flex flex-col gap-4">
          <p className="t-h6 text-fg">{label}</p>
          <h2 className="t-h3">{title}</h2>
        </div>
        <span className="inline-flex overflow-hidden rounded-[40px] bg-fg px-4 py-2.5 font-medium text-bg">
          <RollText text={cta} color="var(--n1)" />
        </span>
      </div>
      <div className="relative min-h-[260px] overflow-hidden max-md:max-h-[300px] md:min-h-[420px]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 768px) 519px, 100vw"
          className="object-cover transition-transform duration-400 group-hover:scale-110"
        />
      </div>
    </Link>
  );
}
