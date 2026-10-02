import Image from "next/image";
import Link from "next/link";

import { Cell } from "@/components/ui/Cell";
import { RollText } from "@/components/ui/RollText";

export type BlogCardProps = {
  href: string;
  title: string;
  excerpt: string;
  /** Metadata shown beside the byline, such as the milestone. */
  meta: string;
  author: string;
  category?: string;
  image?: { src: string; alt: string };
};

/** One post in the blog grid: optional cover, byline, title, excerpt, roll-text link. */
export function BlogCard({ href, title, excerpt, meta, author, category, image }: BlogCardProps) {
  return (
    <Cell className="flex min-h-[320px] flex-col justify-between gap-[50px] p-[30px]">
      {image ? (
        <Link
          href={href}
          className="relative -mx-[30px] -mt-[30px] block aspect-[16/8] overflow-hidden"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 519px, 100vw"
            className="object-cover"
          />
        </Link>
      ) : null}
      <div className="flex w-full items-center justify-between gap-4">
        <span className="flex items-center gap-2.5">
          <Image
            src="/brand/logo.png"
            alt=""
            width={966}
            height={875}
            className="size-5 object-contain"
          />
          <span className="text-sm text-fg">{author}</span>
        </span>
        <span className="text-sm text-muted">{meta}</span>
      </div>
      <div className="flex flex-col items-start gap-3.5">
        {category ? <p className="t-small text-subtle">{category}</p> : null}
        <h2 className="t-h5">
          <Link href={href} className="transition-colors duration-300 hover:text-fg-soft">
            {title}
          </Link>
        </h2>
        <p>{excerpt}</p>
        <Link href={href} className="roll-trigger mt-2 text-base font-medium text-fg" tabIndex={-1}>
          <RollText text="Read the post" />
        </Link>
      </div>
    </Cell>
  );
}
