"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/buttons/Button";
import { RollText } from "@/components/ui/RollText";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { examples } from "@/data/home";
import { cn } from "@/lib/utils";

function usePinned() {
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return pinned;
}

/**
 * Example stories. On a wide viewport the section is tall and sticky: scrolling
 * the page (wheel up or down) slides the cards. Arrows jump to the matching
 * scroll position. On small screens, or when motion is reduced, the arrows and
 * a wheel over the track step one card at a time.
 */
export function Examples() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const pinned = usePinned();
  const count = examples.items.length;
  const gap = 10;
  const travel = Math.max(0, count - 1) * (width + gap);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    const sync = () => setWidth(node.clientWidth);
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    sync();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (pinned) return;
    const node = trackRef.current;
    if (!node) return;
    let locked = false;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8 && Math.abs(event.deltaX) < 8) return;
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      const direction = delta > 0 ? 1 : -1;
      const next = index + direction;
      if (next < 0 || next > count - 1) return;
      event.preventDefault();
      if (locked) return;
      locked = true;
      setIndex(next);
      window.setTimeout(() => {
        locked = false;
      }, 500);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [pinned, index, count]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const xPinned = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!pinned) return;
    setIndex(Math.min(count - 1, Math.max(0, Math.round(progress * (count - 1)))));
  });

  const go = (step: number) => {
    const next = Math.min(count - 1, Math.max(0, index + step));
    const section = sectionRef.current;
    if (!pinned || !section) {
      setIndex(next);
      return;
    }
    const span = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + span * (next / Math.max(1, count - 1)), behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="examples-title"
      className={cn("relative", pinned ? "h-[220vh]" : "py-[var(--section-y)]")}
    >
      <div
        className={cn(
          pinned && "sticky top-0 flex h-screen items-center overflow-hidden py-[var(--section-y)]",
        )}
      >
        <Container>
          <SectionTitle
            id="examples-title"
            title={examples.title}
            accent={examples.accent}
            action={<Button href={examples.action.href}>{examples.action.label}</Button>}
          />
          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Example applications"
            className="overflow-hidden"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") go(-1);
              if (event.key === "ArrowRight") go(1);
            }}
          >
            <motion.ul
              className="flex"
              style={pinned ? { x: xPinned } : undefined}
              animate={pinned ? undefined : { x: -index * (width + gap) }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {examples.items.map((item, itemIndex) => (
                <li
                  key={item.title}
                  aria-roledescription="slide"
                  aria-label={`${itemIndex + 1} of ${count}`}
                  aria-hidden={itemIndex !== index}
                  className="min-w-full shrink-0 pr-2.5"
                  style={width ? { width, minWidth: width } : undefined}
                >
                  <Link
                    href={item.href}
                    tabIndex={itemIndex === index ? undefined : -1}
                    className="group roll-trigger grid grid-cols-1 overflow-hidden rounded-[10px] bg-surface md:grid-cols-2"
                  >
                    <div className="flex flex-col items-start justify-between gap-[50px] p-[30px]">
                      <div className="flex flex-col gap-4">
                        <p className="t-h6 text-fg">{item.label}</p>
                        <h3>{item.title}</h3>
                      </div>
                      <span className="inline-flex overflow-hidden rounded-[40px] bg-fg px-4 py-2.5 font-medium text-bg">
                        <RollText text="See how it works" color="var(--n1)" />
                      </span>
                    </div>
                    <div className="relative min-h-[260px] overflow-hidden max-md:max-h-[300px] md:min-h-[420px]">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 768px) 519px, 100vw"
                        className="object-cover transition-transform duration-400 group-hover:scale-110"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>
          <div className="mt-3 flex gap-1.5">
            <button
              type="button"
              aria-label="Previous example"
              disabled={index === 0}
              onClick={() => go(-1)}
              className="grid size-7 place-items-center rounded-full bg-line-strong text-fg transition-colors duration-300 hover:bg-fg hover:text-bg disabled:opacity-30"
            >
              <ChevronLeft aria-hidden size={16} />
            </button>
            <button
              type="button"
              aria-label="Next example"
              disabled={index === count - 1}
              onClick={() => go(1)}
              className="grid size-7 place-items-center rounded-full bg-line-strong text-fg transition-colors duration-300 hover:bg-fg hover:text-bg disabled:opacity-30"
            >
              <ChevronRight aria-hidden size={16} />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
