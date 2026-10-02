"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, GitBranch, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { SlideUp } from "@/components/animations/SlideUp";
import { Cell, CellGrid } from "@/components/ui/Cell";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SmartLink } from "@/components/ui/SmartLink";
import { designNotes } from "@/data/home";

const sideIcons = { github: GitBranch, alert: ShieldAlert };

export function DesignNotes() {
  const [index, setIndex] = useState(0);
  const count = designNotes.quotes.length;
  const quote = designNotes.quotes[index] ?? designNotes.quotes[0];
  const go = (step: number) => setIndex((current) => (current + step + count) % count);

  return (
    <Section aria-labelledby="notes-title">
      <SectionTitle id="notes-title" title={designNotes.title} accent={designNotes.accent} />
      <SlideUp>
        <CellGrid className="grid-cols-1 sm:grid-cols-2">
          <Cell className="sm:col-span-2">
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Statements from the protocol repository"
              className="relative"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col gap-[60px] p-[30px]"
                  aria-live="polite"
                >
                  <figcaption>
                    <p className="text-fg">{quote.source}</p>
                    <p>{quote.context}</p>
                  </figcaption>
                  <blockquote className="t-h3 max-w-[833px]">
                    &ldquo;{quote.text} <span className="gray">{quote.accent}</span>&rdquo;
                  </blockquote>
                  <Image
                    src="/brand/wordmark.png"
                    alt=""
                    width={259}
                    height={31}
                    className="mt-[50px] h-5 w-auto self-start opacity-60"
                  />
                </motion.figure>
              </AnimatePresence>
              <div className="absolute right-[30px] bottom-[30px] z-[2] flex gap-1.5">
                <button
                  type="button"
                  aria-label="Previous statement"
                  onClick={() => go(-1)}
                  className="grid size-7 place-items-center rounded-full bg-line-strong text-fg transition-colors duration-300 hover:bg-primary-soft"
                >
                  <ArrowLeft aria-hidden size={14} />
                </button>
                <button
                  type="button"
                  aria-label="Next statement"
                  onClick={() => go(1)}
                  className="grid size-7 place-items-center rounded-full bg-line-strong text-fg transition-colors duration-300 hover:bg-primary-soft"
                >
                  <ArrowRight aria-hidden size={14} />
                </button>
              </div>
            </div>
          </Cell>
          {designNotes.side.map((item) => {
            const Icon = sideIcons[item.icon];
            return (
              <Cell key={item.title} className="flex flex-col items-start gap-3.5 p-[30px]">
                <Icon aria-hidden size={24} strokeWidth={1.5} className="mb-2.5 text-fg" />
                <SmartLink
                  href={item.href}
                  className="t-h6 text-fg underline-offset-4 hover:underline"
                >
                  {item.title}
                </SmartLink>
                <p className="max-w-[320px]">{item.body}</p>
              </Cell>
            );
          })}
        </CellGrid>
      </SlideUp>
    </Section>
  );
}
