import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { isExternalHref } from "@/lib/utils";

type SmartLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string };

/** Internal routes use client navigation; external URLs open in a new tab. */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
