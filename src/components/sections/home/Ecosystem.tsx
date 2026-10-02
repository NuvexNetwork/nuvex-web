"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { easeOutStrong } from "@/components/animations/motion";
import { MaskUp } from "@/components/animations/SlideUp";
import { TitleReveal } from "@/components/animations/TitleReveal";
import { Container } from "@/components/ui/Container";
import { ecosystem, type OrbitNode } from "@/data/home";

const backOut = [0.34, 1.56, 0.64, 1] as const;

const HEX = "50,4 94,28 94,76 50,100 6,76 6,28";

function usePointerParallax(disabled: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 40, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 40, damping: 18, mass: 0.6 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { sx, sy, onMove, onLeave };
}

function Rays() {
  const lines = Array.from({ length: 22 }, (_, i) => {
    const t = (i / 21) * 2 - 1;
    const y = 50 + t * 42;
    const flatten = 1 - Math.abs(t) * 0.55;
    return { y, x1: 50 - 48 * flatten, x2: 50 + 48 * flatten, o: 0.045 + (1 - Math.abs(t)) * 0.07 };
  });

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {lines.map((line) => (
        <line
          key={line.y}
          x1={line.x1}
          y1={line.y}
          x2={line.x2}
          y2={line.y}
          stroke="white"
          strokeWidth="0.12"
          opacity={line.o}
        />
      ))}
    </svg>
  );
}

function Links() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {ecosystem.nodes.map((node) => (
        <line
          key={node.name}
          x1={node.x}
          y1={node.y}
          x2="50"
          y2="50"
          stroke="url(#orbit-link)"
          strokeWidth="0.18"
          strokeDasharray="1.1 1.4"
        />
      ))}
      <defs>
        <linearGradient id="orbit-link" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#265ff3" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#265ff3" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HexTile({ node, index }: { node: OrbitNode; index: number }) {
  const reduced = useReducedMotion();
  const logo = Math.round(node.size * 0.38);

  return (
    <motion.a
      href={node.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={node.name}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%`, width: node.size, height: node.size * 1.12 }}
      variants={{
        hidden: { opacity: 0, scale: 0.55, y: 24 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.75, ease: backOut, delay: 0.55 + index * 0.08 },
        },
      }}
    >
      <motion.span
        className="relative block h-full w-full"
        animate={
          reduced
            ? undefined
            : {
                x: [0, index % 2 === 0 ? 10 : -12],
                y: [0, index % 2 === 0 ? -8 : 10],
                rotate: [0, index % 2 === 0 ? 2.4 : -2.4],
              }
        }
        transition={{
          duration: 3.2 + index * 0.28,
          delay: 1.4 + index * 0.12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        whileHover={{ scale: 1.08 }}
      >
        <svg viewBox="0 0 100 112" className="absolute inset-0 h-full w-full drop-shadow-[0_10px_24px_rgb(0_0_0_/_0.45)]" aria-hidden>
          <polygon points={HEX} fill="#141416" stroke="#2c2c30" strokeWidth="1.4" />
          <polygon points={HEX} fill="url(#hex-sheen)" />
          <defs>
            <linearGradient id="hex-sheen" x1="50" y1="0" x2="50" y2="112">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          <img src={node.src} alt="" width={logo} height={logo} className="invert" style={{ width: logo, height: logo }} />
        </span>
      </motion.span>
    </motion.a>
  );
}

function Hub() {
  const reduced = useReducedMotion();
  const rings = [118, 168, 226];

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      variants={{
        hidden: { opacity: 0, scale: 0.82 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: backOut, delay: 0.2 } },
      }}
    >
      <div aria-hidden className="orbit-glow absolute top-1/2 left-1/2 size-[340px] -translate-x-1/2 -translate-y-1/2 sm:size-[420px]" />
      {rings.map((size, i) => (
        <motion.span
          key={size}
          aria-hidden
          className="absolute top-1/2 left-1/2 rounded-full border border-primary/25"
          style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
          animate={reduced ? undefined : { opacity: [0.38, 0.1, 0.38], scale: [1, 1.045, 1] }}
          transition={{ duration: 5 + i * 1.1, ease: "easeInOut", repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
      <Image
        src="/brand/logo.png"
        alt="Nuvex"
        width={966}
        height={875}
        className="relative h-auto w-[72px] drop-shadow-[0_0_28px_rgb(38_95_243_/_0.35)] sm:w-[104px] lg:w-[120px]"
      />
    </motion.div>
  );
}

export function Ecosystem() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() === true;
  const { sx, sy, onMove, onLeave } = usePointerParallax(reduced);

  return (
    <section aria-labelledby="ecosystem-title" className="overflow-hidden py-[var(--section-y)]">
      <Container>
        <div className="mb-[60px] flex flex-col items-center gap-6 text-center">
          <TitleReveal
            id="ecosystem-title"
            text={ecosystem.title}
            accent={ecosystem.accent}
            className="t-section mx-auto max-w-[510px]"
          />
          <MaskUp className="mx-auto max-w-[500px]">
            <p>{ecosystem.body}</p>
          </MaskUp>
        </div>
      </Container>

      <motion.div
        ref={stageRef}
        className="relative mx-auto h-[320px] max-w-[1440px] sm:h-[400px] md:h-[520px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <motion.div
          aria-hidden
          className="orbit-field absolute inset-0"
          variants={{
            hidden: { opacity: 0, scale: 1.06 },
            visible: { opacity: 1, scale: 1, transition: { duration: 1.15, ease: easeOutStrong } },
          }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1.2, delay: 0.15 } },
          }}
        >
          <Rays />
          <Links />
        </motion.div>

        <Hub />

        {ecosystem.nodes.map((node, index) => (
          <motion.div
            key={node.name}
            className="absolute inset-0"
            style={{
              x: reduced ? 0 : sx,
              y: reduced ? 0 : sy,
              translateX: reduced ? 0 : `calc(var(--tw-translate-x, 0px))`,
            }}
            transformTemplate={({ x, y }) => {
              const dx = typeof x === "number" ? x : 0;
              const dy = typeof y === "number" ? y : 0;
              return `translateX(${dx * node.depth}px) translateY(${dy * node.depth}px)`;
            }}
          >
            <HexTile node={node} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
