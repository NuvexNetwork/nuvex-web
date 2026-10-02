"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Dices, Layers, Network, ShieldCheck, type LucideIcon } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent } from "react";

import { durations, easeOutStrong } from "@/components/animations/motion";
import { RollText } from "@/components/ui/RollText";
import { SmartLink } from "@/components/ui/SmartLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { NavIcon, NavItem } from "@/data/navigation";
import { cn, isActivePath } from "@/lib/utils";

type PanelItem = Extract<NavItem, { kind: "panel" }>;

const icons: Record<NavIcon, LucideIcon> = {
  dice: Dices,
  layers: Layers,
  network: Network,
  shield: ShieldCheck,
};

export type NavPanelProps = {
  item: PanelItem;
  pathname: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

const CLOSE_DELAY_MS = 450;

export function NavPanel({ item, pathname, open, onOpen, onClose, onToggle }: NavPanelProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusFirstOnOpen = useRef(false);
  const lastPointer = useRef("");
  const panelId = `nav-panel-${item.label.toLowerCase()}`;
  const active = item.links.some((link) => isActivePath(pathname, link.href));

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (open && focusFirstOnOpen.current) {
      focusFirstOnOpen.current = false;
      panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    }
  }, [open]);

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusFirstOnOpen.current = true;
      if (open) panelRef.current?.querySelector<HTMLElement>("a")?.focus();
      else onOpen();
    }
  };

  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a") ?? []);
    const index = links.indexOf(document.activeElement as HTMLElement);
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      triggerRef.current?.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      links[(index + 1) % links.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      links[(index - 1 + links.length) % links.length]?.focus();
    }
  };

  return (
    <li
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        onOpen();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        closeTimer.current = setTimeout(onClose, CLOSE_DELAY_MS);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onPointerDown={(event) => {
          lastPointer.current = event.pointerType;
        }}
        onClick={() => {
          // Hover already opened the panel for a mouse; a click should not shut it again.
          if (lastPointer.current === "mouse") onOpen();
          else onToggle();
          lastPointer.current = "";
        }}
        onKeyDown={onTriggerKeyDown}
        className={cn("roll-trigger t-nav flex items-center gap-2", (open || active) && "text-fg")}
      >
        <RollText text={item.label} color="var(--n8)" />
        <ChevronDown
          aria-hidden
          size={12}
          strokeWidth={2.5}
          className={cn("transition-transform duration-300", open && "-rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            className="absolute top-full left-1/2 z-10 w-[384px] -translate-x-1/2 overflow-hidden pt-5"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: durations.base, ease: easeOutStrong }}
          >
            <div
              ref={panelRef}
              id={panelId}
              onKeyDown={onPanelKeyDown}
              className="rounded-[12px] bg-surface py-6 pr-6 pl-5"
            >
              <p className="t-small mb-5 text-muted uppercase">{item.caption}</p>
              <ul className="flex flex-col gap-5">
                {item.links.map((link) => {
                  const Icon = link.icon ? icons[link.icon] : null;
                  const current = isActivePath(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <SmartLink
                        href={link.href}
                        onClick={onClose}
                        aria-current={current ? "page" : undefined}
                        className="group flex items-start gap-4"
                      >
                        {Icon ? (
                          <Icon
                            aria-hidden
                            size={20}
                            strokeWidth={1.5}
                            className="mt-0.5 shrink-0 text-fg-soft transition-colors group-hover:text-fg"
                          />
                        ) : null}
                        <span className="flex min-w-0 flex-1 flex-col gap-1">
                          <span className="flex items-center justify-between gap-3">
                            <span className="font-medium text-fg">{link.label}</span>
                            {link.status ? <StatusBadge status={link.status} /> : null}
                          </span>
                          {link.description ? (
                            <span className="t-small text-muted transition-colors group-hover:text-fg-soft">
                              {link.description}
                            </span>
                          ) : null}
                        </span>
                      </SmartLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
