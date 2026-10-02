"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { easeOutStrong } from "@/components/animations/motion";
import { SlideUp } from "@/components/animations/SlideUp";
import { Cell, CellGrid } from "@/components/ui/Cell";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * One-open accordion. The reference pricing page uses this after the comparison
 * table; height animates the same way as the lifecycle descriptions.
 */
export function Faq({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <SlideUp>
      <CellGrid className="grid-cols-1">
        {items.map((item, index) => {
          const isOpen = index === open;
          return (
            <Cell key={item.question}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left"
              >
                <span className="t-h6 text-fg">{item.question}</span>
                <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-line-strong text-fg">
                  {isOpen ? <Minus aria-hidden size={14} /> : <Plus aria-hidden size={14} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: easeOutStrong }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[690px] px-6 pb-6">{item.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </Cell>
          );
        })}
      </CellGrid>
    </SlideUp>
  );
}
