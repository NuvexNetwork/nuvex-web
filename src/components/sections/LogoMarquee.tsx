import { SlideUp } from "@/components/animations/SlideUp";
import { stackCaption, stackItems, type StackItem } from "@/data/stack";

function Mark({ item }: { item: StackItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex shrink-0 items-center gap-3 text-fg/45 transition-colors duration-300 hover:text-fg"
    >
      {item.src ? (
        <img src={item.src} alt="" width={28} height={28} className="size-7 invert" />
      ) : null}
      <span className="text-[18px] leading-none font-medium whitespace-nowrap">{item.name}</span>
    </a>
  );
}

function Rail({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14 pr-14">
      {stackItems.map((item) => (
        <li key={`${hidden ? "b" : "a"}-${item.name}`}>
          <Mark item={item} />
        </li>
      ))}
    </ul>
  );
}

/** Official marks and protocol standards in one right-to-left rail. */
export function LogoMarquee({ caption = stackCaption }: { caption?: string }) {
  return (
    <section className="overflow-hidden pt-10 pb-[var(--section-y)]" aria-label={caption}>
      <SlideUp>
        <p className="mb-10 text-center text-sm text-fg">{caption}</p>
        <div className="logo-rail">
          <div className="logo-flow flex w-max">
            <Rail />
            <Rail hidden />
          </div>
        </div>
      </SlideUp>
    </section>
  );
}
