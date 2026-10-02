import { SlideUp } from "@/components/animations/SlideUp";
import { Container } from "@/components/ui/Container";

function Names({ names, hidden = false }: { names: readonly string[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="mx-auto flex max-w-[921px] shrink-0 flex-nowrap items-center justify-center gap-x-[60px] gap-y-[30px] pr-[60px] max-sm:marquee sm:flex-wrap sm:pr-0"
    >
      {names.map((name) => (
        <li
          key={name}
          className="text-[20px] leading-6 font-medium whitespace-nowrap text-fg opacity-40 max-sm:text-[17px]"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

/**
 * The strip under a page banner. Names wrap on desktop and scroll as a marquee on
 * phones, where the second copy keeps the loop seamless.
 */
export function TechStrip({ caption, names }: { caption: string; names: readonly string[] }) {
  return (
    <section className="overflow-hidden pt-10 pb-[var(--section-y)]">
      <Container>
        <SlideUp>
          <p className="text-center text-sm text-fg">{caption}</p>
          <div className="mt-10 flex max-sm:gap-0 sm:block">
            <Names names={names} />
            <div className="sm:hidden">
              <Names names={names} hidden />
            </div>
          </div>
        </SlideUp>
      </Container>
    </section>
  );
}
