"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Dices, Network, ShieldCheck, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { easeOutStrong } from "@/components/animations/motion";
import { Button } from "@/components/buttons/Button";
import { NodesPanel, RequestPanel, VerifyPanel } from "@/components/protocol/visuals";
import { Cell } from "@/components/ui/Cell";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { lifecycle } from "@/data/home";
import { cn } from "@/lib/utils";

const icons: Record<(typeof lifecycle.steps)[number]["icon"], LucideIcon> = {
  dice: Dices,
  network: Network,
  shield: ShieldCheck,
};

const panels = [RequestPanel, NodesPanel, VerifyPanel];

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
 * The section is three screens tall on wider viewports. Its content sticks to the viewport
 * while scroll progress selects the active step. Clicking a step scrolls to it.
 */
export function Lifecycle() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinned = usePinned();
  const [active, setActive] = useState(0);
  const count = lifecycle.steps.length;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!pinned) return;
    setActive(Math.min(count - 1, Math.max(0, Math.floor(progress * count))));
  });

  const select = (index: number) => {
    const section = sectionRef.current;
    if (!pinned || !section) {
      setActive(index);
      return;
    }
    const travel = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + travel * ((index + 0.5) / count), behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="lifecycle-title"
      className={cn("relative", pinned ? "h-[300vh]" : "py-[var(--section-y)]")}
    >
      <div
        className={cn(
          pinned && "sticky top-0 flex h-screen items-center overflow-hidden py-[var(--section-y)]",
        )}
      >
        <Container>
          <SectionTitle
            id="lifecycle-title"
            title={lifecycle.title}
            accent={lifecycle.accent}
            width={500}
            action={<Button href={lifecycle.action.href}>{lifecycle.action.label}</Button>}
          />
          <div className="grid grid-cols-1 border-[0.5px] border-line md:grid-cols-2">
            <div role="tablist" aria-label="Request lifecycle" aria-orientation="vertical">
              {lifecycle.steps.map((step, index) => {
                const Icon = icons[step.icon];
                const isActive = index === active;
                return (
                  <Cell key={step.title}>
                    <button
                      type="button"
                      role="tab"
                      id={`lifecycle-tab-${index}`}
                      aria-selected={isActive}
                      aria-controls="lifecycle-panel"
                      onClick={() => select(index)}
                      className="relative z-[2] flex w-full flex-col items-start gap-3 p-[30px] pb-1 text-left"
                    >
                      <Icon
                        aria-hidden
                        size={24}
                        strokeWidth={1.5}
                        className={cn(
                          "mb-2.5 transition-colors duration-300",
                          isActive ? "text-fg" : "text-subtle",
                        )}
                      />
                      <h3
                        className={cn(
                          "t-h5 transition-opacity duration-300",
                          !isActive && "opacity-45",
                        )}
                      >
                        {step.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive ? (
                          <motion.p
                            key="description"
                            initial={{ height: 0, opacity: 0, y: 14 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -10 }}
                            transition={{ duration: 0.6, ease: easeOutStrong }}
                            className="max-w-[450px] overflow-hidden"
                          >
                            <span className="block pb-3">{step.body}</span>
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </button>
                  </Cell>
                );
              })}
            </div>
            <Cell className="min-h-[380px] md:min-h-[450px]">
              <div
                id="lifecycle-panel"
                role="tabpanel"
                aria-labelledby={`lifecycle-tab-${active}`}
                className="absolute inset-0 flex items-center p-[30px]"
              >
                {panels.map((Panel, index) => (
                  <motion.div
                    key={index}
                    aria-hidden={index !== active}
                    className="absolute inset-[30px] flex items-center"
                    initial={false}
                    animate={{
                      opacity: index === active ? 1 : 0,
                      x: index === active ? 0 : index < active ? -35 : 45,
                      scale: index === active ? 1 : index < active ? 0.965 : 0.94,
                    }}
                    transition={{ duration: 0.7, ease: easeOutStrong }}
                    style={{ pointerEvents: index === active ? "auto" : "none" }}
                  >
                    <Panel />
                  </motion.div>
                ))}
              </div>
            </Cell>
          </div>
        </Container>
      </div>
    </section>
  );
}
