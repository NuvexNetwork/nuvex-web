"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { durations, easeOutStrong } from "@/components/animations/motion";
import { Button } from "@/components/buttons/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { mobileNavGroups, navCta } from "@/data/navigation";
import { cn, isActivePath } from "@/lib/utils";

/** Matches the `lg` breakpoint, where the desktop links take over. */
const DESKTOP_QUERY = "(min-width: 62rem)";

export function MobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (desktop.matches) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          id="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: durations.base, ease: easeOutStrong }}
          className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden lg:hidden"
        >
          <div
            ref={panelRef}
            className="max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-[12px] bg-surface px-6 py-6 md:px-4"
            data-lenis-prevent
          >
            <div className="flex flex-col gap-[3.75rem] sm:grid sm:grid-cols-[1fr_0.75fr] sm:gap-x-[6.5rem] sm:gap-y-10">
              {mobileNavGroups.map((group, index) => (
                <div key={group.title} className="flex w-full flex-col gap-4">
                  <p className="w-full border-b border-line-strong pb-2 text-left text-muted">
                    {group.title}
                  </p>
                  <ul
                    className={cn(
                      "grid gap-4",
                      index === 0 ? "grid-cols-2 gap-x-4" : "grid-cols-1",
                    )}
                  >
                    {group.links.map((link) => {
                      const current = isActivePath(pathname, link.href);
                      return (
                        <li key={`${group.title}-${link.href}`}>
                          <SmartLink
                            href={link.href}
                            onClick={onClose}
                            aria-current={current ? "page" : undefined}
                            className={cn(
                              "block text-muted transition-colors duration-300 hover:text-fg",
                              current && "text-fg",
                            )}
                          >
                            {link.label}
                          </SmartLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button href={navCta.href} onClick={onClose}>
                {navCta.label}
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
