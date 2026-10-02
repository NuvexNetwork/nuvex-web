import { DOCS_URL, GITHUB_PROTOCOL_URL } from "@/lib/constants";

import { media } from "./media";
import type { CapabilityStatus } from "./protocol";

export const hero = {
  tag: { strong: "Verifiable compute", rest: "on Solana", href: "/technology" },
  title: "Verifiable compute,",
  accent: "starting with randomness",
  body: "Nuvex checks proofs inside Solana programs and hands the result to your callback. VRF is live in the programs today. Data, compute, and inference jobs are planned.",
  primary: { label: "Explore the network", href: "/network" },
  secondary: { label: "Read the docs", href: DOCS_URL },
};

export type Capability = {
  icon: "dice" | "database" | "cpu" | "brain";
  title: string;
  body: string;
  status: CapabilityStatus;
};

export const capabilities = {
  title: "Everything a program needs",
  accent: "to trust an off-chain result",
  lead: "Verifiable infrastructure",
  leadAccent: "for programs that need proof, not promises",
  items: [
    {
      icon: "dice",
      title: "Verifiable randomness",
      body: "A VRF request is fulfilled with an ECVRF proof that the verification program checks before the output is written.",
      status: "live",
    },
    {
      icon: "database",
      title: "Oracle data",
      body: "Price and external data jobs are reserved in the request account. Aggregation and freshness rules are not designed yet.",
      status: "planned",
    },
    {
      icon: "cpu",
      title: "Verifiable compute",
      body: "Off-chain execution with a committed result is a reserved job type. No compute job runs today.",
      status: "planned",
    },
    {
      icon: "brain",
      title: "AI inference",
      body: "Inference requests share the same request lifecycle. How to verify a model output is an open research question.",
      status: "planned",
    },
  ] satisfies Capability[],
};

export type ExampleStory = {
  label: "Example" | "Concept";
  title: string;
  image: string;
  alt: string;
  href: string;
};

export const examples = {
  title: "What you could build",
  accent: "with verifiable randomness",
  action: { label: "View the technology", href: "/technology" },
  items: [
    {
      label: "Example",
      title: "A loot drop where every player can re-check the roll against the proof",
      image: media.blobs.src,
      alt: media.blobs.alt,
      href: "/ecosystem/verifiable-draw",
    },
    {
      label: "Example",
      title: "A lottery draw that settles in a callback, with the proof kept on the request",
      image: media.cubes.src,
      alt: media.cubes.alt,
      href: "/ecosystem/verifiable-draw",
    },
    {
      label: "Concept",
      title: "Fair allowlist ordering without a trusted party running the shuffle",
      image: media.fade.src,
      alt: media.fade.alt,
      href: "/ecosystem/fair-ordering",
    },
    {
      label: "Concept",
      title: "A program that consumes a price, once a price verifier exists",
      image: media.cosmos.src,
      alt: media.cosmos.alt,
      href: "/ecosystem/price-feed-consumer",
    },
    {
      label: "Concept",
      title: "An agent job whose off-chain work is verified, not merely submitted",
      image: media.void.src,
      alt: media.void.alt,
      href: "/ecosystem/verified-agent-job",
    },
  ] satisfies ExampleStory[],
};

export const lifecycle = {
  title: "One request,",
  accent: "checked end to end",
  action: { label: "See the architecture", href: "/architecture" },
  steps: [
    {
      icon: "dice",
      title: "Open a request",
      body: "A program opens a request with a job type, an input, and an optional callback. max_fee is recorded and not charged.",
    },
    {
      icon: "network",
      title: "An eligible node fulfils",
      body: "Only an active node whose stake meets the minimum, whose heartbeat is inside the window, and that registered before the request may fulfil it.",
    },
    {
      icon: "shield",
      title: "Proof verified, callback runs",
      body: "The verification program checks the 80-byte ECVRF proof. The 64-byte output is written and passed to the callback, which receives no accounts.",
    },
  ],
} as const;

export const surfaces = {
  title: "Protocol surfaces built",
  accent: "for Solana programs",
  action: { label: "Read the docs", href: DOCS_URL },
  items: [
    {
      id: "programs",
      title: "Three programs",
      body: "oracle-core holds requests, oracle-registry holds nodes and stake, and verification checks proofs. Each is an Anchor program.",
      href: "/architecture",
    },
    {
      id: "sdk",
      title: "Account derivation",
      body: "The Rust and TypeScript SDKs derive every program address and can prove a VRF output locally. They do not send transactions yet.",
      href: "/developers",
    },
    {
      id: "node",
      title: "Operator process",
      body: "The node binary exposes health and metrics today. Loading a VRF key and submitting fulfilments is the next milestone.",
      href: "/nodes",
    },
  ],
} as const;

export const toolkit = {
  title: "A toolkit for every",
  accent: "side of the protocol",
  items: [
    {
      id: "rust",
      title: "Rust SDK",
      body: "PDA helpers for every account and a prove_vrf function that keeps the secret with the caller.",
      href: "/developers",
    },
    {
      id: "ts",
      title: "TypeScript SDK",
      body: "The same derivations for web clients. Submitting a request throws until transactions are wired.",
      href: "/developers",
    },
    {
      id: "cli",
      title: "Command line",
      body: "Node, request, registry, staking, and network commands. Each reports the milestone it is waiting on.",
      href: "/nodes",
    },
  ],
} as const;

export const reasons = {
  title: "Reasons to",
  accent: "verify on-chain",
  items: [
    {
      id: "proofs",
      title: "Proofs",
      accent: "checked in a program",
      body: "The output is written only after the verification program accepts the ECVRF proof for that exact request. A node cannot swap in a different output after the fact.",
      href: "/technology",
    },
    {
      id: "stake",
      title: "Stake before",
      accent: "fulfilment",
      body: "Nodes lock the configured stake and heartbeat inside a window. A node that misbehaves can be slashed. A minimum of zero offers no resistance, and the docs say so.",
      href: "/network",
    },
  ],
} as const;

export const trio = [
  {
    id: "register",
    title: "Register a node",
    body: "A node key joins the registry, locks stake, and starts heartbeating before it can fulfil.",
  },
  {
    id: "verify",
    title: "Verify the proof",
    body: "RFC 9381 ECVRF on Ed25519. 80-byte proof in, 64-byte output out, all inside the program.",
  },
  {
    id: "callback",
    title: "Deliver the output",
    body: "The callback program receives the output and no accounts, so it cannot be handed extra authority.",
  },
] as const;

export type OrbitNode = {
  name: string;
  src: string;
  href: string;
  /** Percent of the stage, 0–100. */
  x: number;
  y: number;
  /** Tile edge in pixels at the desktop size. */
  size: number;
  depth: number;
};

export const ecosystem = {
  title: "Built on open",
  accent: "tools and standards",
  body: "Nuvex is written with the same tools Solana developers already use. These are dependencies and standards, not partners.",
  nodes: [
    {
      name: "Solana",
      src: "/logos/solana.svg",
      href: "https://solana.com",
      x: 8,
      y: 38,
      size: 72,
      depth: 18,
    },
    {
      name: "Anchor",
      src: "/logos/anchor.svg",
      href: "https://www.anchor-lang.com",
      x: 20,
      y: 68,
      size: 64,
      depth: 12,
    },
    {
      name: "Rust",
      src: "/logos/rust.svg",
      href: "https://www.rust-lang.org",
      x: 22,
      y: 18,
      size: 58,
      depth: 22,
    },
    {
      name: "TypeScript",
      src: "/logos/typescript.svg",
      href: "https://www.typescriptlang.org",
      x: 92,
      y: 36,
      size: 72,
      depth: 18,
    },
    {
      name: "Apache-2.0",
      src: "/logos/apache.svg",
      href: "https://www.apache.org/licenses/LICENSE-2.0",
      x: 80,
      y: 68,
      size: 64,
      depth: 12,
    },
    {
      name: "GitHub",
      src: "/logos/github.svg",
      href: "https://github.com/NuvexNetwork",
      x: 78,
      y: 16,
      size: 58,
      depth: 22,
    },
  ] satisfies OrbitNode[],
};

export const designNotes = {
  title: "What the code",
  accent: "says about itself",
  quotes: [
    {
      source: "Protocol README",
      context: "Milestone 3 status",
      text: "A node fulfills only when it is active, its stake meets the configured minimum,",
      accent:
        "its heartbeat is inside the configured window, and the key was registered before the request.",
    },
    {
      source: "Protocol README",
      context: "Callbacks",
      text: "The callback, when set, receives the output",
      accent: "and no accounts.",
    },
    {
      source: "Open decisions",
      context: "ADR 0001",
      text: "Cancel, expire, and VRF fulfillment are the live transitions.",
      accent: "Every challenge edge stays forbidden until it is designed.",
    },
  ],
  side: [
    {
      icon: "github",
      title: "Open source",
      body: "Programs, SDKs, CLI, and node live in one public repository under Apache-2.0.",
      href: GITHUB_PROTOCOL_URL,
    },
    {
      icon: "alert",
      title: "Not audited yet",
      body: "No independent audit has been performed. The VRF crate has no published audit either.",
      href: "/security",
    },
  ],
} as const;

export const facts = {
  items: [
    { value: 3, suffix: "", label: "Solana programs" },
    { value: 80, suffix: "", label: "Byte ECVRF proof" },
    { value: 64, suffix: "", label: "Byte VRF output" },
    { value: 1, suffix: "/4", label: "Job families live" },
  ],
  story: {
    eyebrow: "Building verifiable compute on Solana",
    title:
      "Nuvex accepts a job, checks the proof inside a program, and hands the result to your callback.",
    accent: "Randomness is live in the programs. Data, computation, and inference come next.",
    action: { label: "Read the architecture", href: "/architecture" },
  },
};

export const closing = {
  title: "Verifiable compute",
  accent: "on Solana",
  action: { label: "Start building", href: "/developers" },
};
