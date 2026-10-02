import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  priority = false,
  onClick,
}: {
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      aria-label="Nuvex home"
      onClick={onClick}
      className={cn("flex max-h-[26px] shrink-0 items-center gap-2 self-center", className)}
    >
      <Image
        src="/brand/logo.png"
        alt=""
        width={966}
        height={875}
        priority={priority}
        className="h-[26px] w-auto"
      />
      <Image
        src="/brand/wordmark.png"
        alt=""
        width={259}
        height={31}
        priority={priority}
        className="h-3 w-auto"
      />
    </Link>
  );
}
