import Image from "next/image";
import type { ComponentType } from "react";

import { IllustrationNote } from "@/components/protocol/PanelUI";
import {
  HeartbeatChart,
  NodesPanel,
  OperatorPanel,
  ProgramsPanel,
  RequestPanel,
  StakePanel,
  VerifyPanel,
} from "@/components/protocol/visuals";
import type { Block, DocSection, PanelName } from "@/data/content";

const panels: Record<PanelName, ComponentType> = {
  request: RequestPanel,
  nodes: NodesPanel,
  verify: VerifyPanel,
  programs: ProgramsPanel,
  heartbeat: HeartbeatChart,
  stake: StakePanel,
  operator: OperatorPanel,
};

function Blocks({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => {
    switch (block.kind) {
      case "text":
        return <p key={index}>{block.text}</p>;
      case "list":
        return (
          <ul key={index} className="flex flex-col gap-3 pl-5">
            {block.items.map((item) => (
              <li key={item} className="list-disc text-muted marker:text-subtle">
                {item}
              </li>
            ))}
          </ul>
        );
      case "code":
        return (
          <pre
            key={index}
            className="overflow-x-auto rounded-[10px] bg-surface p-5 text-[13px] leading-6 text-fg-soft"
          >
            <code>{block.code}</code>
          </pre>
        );
      case "quote":
        return (
          <figure key={index} className="flex flex-col gap-3 border-l border-line-strong pl-5">
            <blockquote className="t-h6 text-fg">&ldquo;{block.text}&rdquo;</blockquote>
            <figcaption className="t-small text-subtle">{block.source}</figcaption>
          </figure>
        );
      case "image":
        return (
          <figure key={index} className="flex flex-col gap-2">
            <span className="relative block aspect-[16/9] overflow-hidden rounded-[10px]">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                sizes="(min-width: 1070px) 700px, 100vw"
                className="object-cover"
              />
            </span>
            {block.credit ? (
              <figcaption className="text-xs text-subtle">
                Photo:{" "}
                <a
                  href={block.credit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-fg"
                >
                  {block.credit.label}
                </a>
              </figcaption>
            ) : null}
          </figure>
        );
      case "panel": {
        const Panel = panels[block.panel];
        return (
          <figure
            key={index}
            className="flex flex-col items-center gap-3 rounded-[10px] bg-surface/60 p-5"
          >
            <Panel />
            <figcaption>
              <IllustrationNote />
            </figcaption>
          </figure>
        );
      }
    }
  });
}

/** Renders the shared content blocks with the long-form typography. */
export function RichText({ sections }: { sections: DocSection[] }) {
  return (
    <div className="page-copy flex flex-col gap-[50px] text-lg leading-[1.5] text-muted">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="flex scroll-mt-[120px] flex-col gap-5">
          <h2 className="t-h4 text-fg">{section.heading}</h2>
          <Blocks blocks={section.blocks} />
        </section>
      ))}
    </div>
  );
}
