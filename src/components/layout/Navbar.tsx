"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { easeOutStrong } from "@/components/animations/motion";
import { Button } from "@/components/buttons/Button";
import { NavPanel } from "@/components/navigation/NavPanel";
import { Logo } from "@/components/ui/Logo";
import { RollText } from "@/components/ui/RollText";
import { navCta, primaryNav } from "@/data/navigation";
import { cn, isActivePath } from "@/lib/utils";

import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpenPanel(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!openPanel && !mobileOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (barRef.current?.contains(event.target as Node)) return;
      setOpenPanel(null);
      setMobileOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openPanel, mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <motion.header
      className="sticky top-[15px] z-50 px-[var(--gutter)] lg:px-0"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ duration: 0.6, ease: easeOutStrong }}
    >
      <div
        ref={barRef}
        className="relative mx-auto mt-2.5 w-full max-w-[90%] sm:mt-4 lg:max-w-[var(--container)]"
      >
        <nav
          aria-label="Primary"
          className="flex items-center justify-between gap-4 rounded-[30px] bg-white/[0.06] py-2.5 pr-3 pl-3 backdrop-blur-[50px] lg:py-2 lg:pr-1.5"
        >
          <Logo priority onClick={() => setMobileOpen(false)} />

          <ul className="hidden items-center gap-4 lg:flex">
            {primaryNav.map((item) =>
              item.kind === "link" ? (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "roll-trigger t-nav flex",
                      isActivePath(pathname, item.href) && "text-fg",
                    )}
                  >
                    <RollText text={item.label} color="var(--n8)" />
                  </Link>
                </li>
              ) : (
                <NavPanel
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  open={openPanel === item.label}
                  onOpen={() => setOpenPanel(item.label)}
                  onClose={() =>
                    setOpenPanel((current) => (current === item.label ? null : current))
                  }
                  onToggle={() =>
                    setOpenPanel((current) => (current === item.label ? null : item.label))
                  }
                />
              ),
            )}
          </ul>

          <div className="flex items-center gap-2">
            <Button href={navCta.href} variant="nav" className="hidden lg:inline-flex">
              {navCta.label}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
              className="relative flex size-[1.3rem] flex-col items-center justify-center lg:hidden"
            >
              <span
                className={cn(
                  "h-0.5 w-full bg-fg transition-transform duration-400",
                  mobileOpen && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "my-[0.4rem] h-0.5 w-full bg-fg transition-opacity duration-150",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-full bg-fg transition-transform duration-400",
                  mobileOpen && "-translate-y-2 -rotate-45",
                )}
              />
            </button>
          </div>
        </nav>

        <MobileMenu open={mobileOpen} pathname={pathname} onClose={closeMobile} />
      </div>
    </motion.header>
  );
}
