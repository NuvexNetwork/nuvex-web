import {
  DOCS_URL,
  DISCORD_URL,
  GITHUB_DOCS_URL,
  GITHUB_PROTOCOL_URL,
  GITHUB_SERVICES_URL,
  GITHUB_WEB_URL,
  X_URL,
} from "@/lib/constants";

import type { CapabilityStatus } from "./protocol";

/** Every claim below is taken from the protocol README, the ADRs or the security documents. */

export const aboutBanner = {
  tag: { strong: "Milestone 3", rest: "— VRF verification is live", href: "/changelog" },
  title: "A verifiable compute protocol",
  accent: "built in the open, one milestone at a time",
  lead: "Nuvex is a Solana-native verifiable compute and oracle protocol. Programs accept a job, an input, constraints and a callback. Randomness is the first job, and the only one with a runtime today.",
  primary: { label: "Read the architecture", href: "/architecture" },
  secondary: { label: "Browse the source", href: GITHUB_PROTOCOL_URL },
};

/** Counters may only carry numbers that exist in the repository. */
export const aboutCounters = [
  { value: 3, label: "Solana programs" },
  { value: 7, label: "Decision records" },
  { value: 80, label: "Byte ECVRF proof" },
  { value: 4, label: "Open repositories" },
];

export type AboutIcon = "layers" | "dice" | "network" | "database" | "cpu" | "brain";

export type AboutCapability = {
  icon: AboutIcon;
  title: string;
  body: string;
  status: CapabilityStatus;
};

export const aboutCapabilities = {
  title: "What the protocol does today,",
  accent: "and what it does not",
  description:
    "One request account carries every job type. Only the randomness path has instructions behind it.",
  items: [
    {
      icon: "layers",
      title: "Job-agnostic requests",
      body: "A request carries a job type, an input, constraints and an optional callback. request_randomness is not a program entrypoint.",
      status: "live",
    },
    {
      icon: "dice",
      title: "Verifiable randomness",
      body: "The verification program checks an RFC 9381 ECVRF proof of 80 bytes and writes the 64-byte output before any callback runs.",
      status: "live",
    },
    {
      icon: "network",
      title: "Registry and stake",
      body: "Nodes register a VRF key, lock the configured minimum stake, heartbeat inside a window, and can be slashed by a configured authority.",
      status: "live",
    },
    {
      icon: "database",
      title: "Price and data jobs",
      body: "The job kinds are reserved in the request account. Median and quorum rules belong to Milestone 5, so no adapter fetches anything.",
      status: "planned",
    },
    {
      icon: "cpu",
      title: "Verifiable compute",
      body: "Deterministic agreement with commit and reveal is Milestone 6. No compute job runs, and no challenge edge is allowed yet.",
      status: "planned",
    },
    {
      icon: "brain",
      title: "AI inference",
      body: "A commitment to a model and an output is not a proof of correct inference. ADR 0004 says so, and there is no inference runtime.",
      status: "research",
    },
  ] satisfies AboutCapability[],
};

export const aboutStrip = {
  caption: "Built with open tools and standards",
  names: ["Solana", "Anchor", "Rust", "TypeScript", "LiteSVM", "RFC 9381", "Ed25519", "Apache-2.0"],
};

export const aboutFocus = {
  text: "Decisions are written down before they are implemented,",
  accent: "and the ones that are not decided stay visibly open.",
};

export type DecisionRecord = {
  /** Row title. The number is part of it, as the files are numbered. */
  title: string;
  /** The record's own status line, shortened to fit a row. */
  status: string;
  href: string;
};

const adrFile = (name: string) => `${GITHUB_DOCS_URL}/blob/main/architecture/adr/${name}.md`;

export const decisions = {
  title: "How decisions are made",
  accent: "— seven numbered records",
  description:
    "Each record states a decision, its consequences and the alternatives it rejected. A decision that is not written down is not settled, and the status line on each record says how far it got.",
  action: { label: "Open the records", href: GITHUB_DOCS_URL },
  items: [
    {
      title: "ADR 0001 · Core architecture",
      status: "Accepted, amended in Milestones 1 and 2",
      href: adrFile("0001-core-architecture"),
    },
    {
      title: "ADR 0002 · Account model",
      status: "Layout specification, amended in Milestone 3",
      href: adrFile("0002-account-model"),
    },
    {
      title: "ADR 0003 · Node selection",
      status: "Amended in Milestone 3, not a weighted lottery",
      href: adrFile("0003-node-selection"),
    },
    {
      title: "ADR 0004 · Verification model",
      status: "Accepted for VRF, no audit report found",
      href: adrFile("0004-verification-model"),
    },
    {
      title: "ADR 0005 · Fee model",
      status: "A split of roles, numeric parameters unset",
      href: adrFile("0005-fee-model"),
    },
    {
      title: "ADR 0006 · Callback model",
      status: "Accepted, empty-account callback only",
      href: adrFile("0006-callback-model"),
    },
    {
      title: "ADR 0007 · Upgrade model",
      status: "Accepted as policy, no program deployed",
      href: adrFile("0007-upgrade-model"),
    },
  ] satisfies DecisionRecord[],
};

export const repositories = {
  title: "Four repositories,",
  accent: "one protocol",
  description: "Nothing is shared between them except the decision records and the licence.",
  items: [
    {
      title: "Protocol",
      body: "Three Anchor programs, the shared crates, both SDKs, the CLI, the health-only node, the LiteSVM and integration tests, and the security documents.",
      meta: "nuvex",
      href: GITHUB_PROTOCOL_URL,
    },
    {
      title: "Documentation",
      body: "The documentation site and the seven decision records. Its contributing guide asks you not to document an instruction, fee or job the protocol has not implemented.",
      meta: "nuvex-docs",
      href: GITHUB_DOCS_URL,
    },
    {
      title: "Website",
      body: "This site. It does not read chain state and it does not submit transactions, so every console view here is an illustration.",
      meta: "nuvex-web",
      href: GITHUB_WEB_URL,
    },
    {
      title: "Services",
      body: "The HTTP API, the PostgreSQL schema, the price adapters that reject every call, and the local compose files. It is not a source of protocol truth.",
      meta: "nuvex-services",
      href: GITHUB_SERVICES_URL,
    },
  ],
};

export const openDecisions = {
  title: "Three decisions are blocked",
  accent: "on purpose",
  description:
    "The README lists these so that the next milestone does not invent them in a pull request that only wants the code to compile.",
  items: [
    {
      // No status: an audit that has not been commissioned is not a planned capability.
      title: "The VRF audit",
      body: "The verifier is solana-ecvrf 0.0.1. No audit report was found. ADR 0004 records that absence, and no audit of Nuvex itself has been commissioned.",
    },
    {
      title: "Challenge, reject and fail edges",
      body: "Cancel, expire and VRF fulfilment are the live transitions. ADR 0001 leaves every challenge edge forbidden until it is designed.",
      status: "planned",
    },
    {
      title: "Fee shares and selection weights",
      body: "The four fee roles exist and the basis points do not. max_fee is stored and never charged. Fulfilment is first-come among eligible nodes, with no weighted lottery.",
      status: "planned",
    },
  ] satisfies { title: string; body: string; status?: CapabilityStatus }[],
};

export const aboutCta = {
  title: "Read the code before",
  accent: "you trust the claims",
  action: { label: "Open the repository", href: GITHUB_PROTOCOL_URL },
};

export const contactStrip = {
  caption: "Every conversation stays in a public or private repository channel",
  names: ["GitHub issues", "Private advisory", "Documentation", "No mailbox"],
};

export const contactBanner = {
  tag: { strong: "No mailbox", rest: "— every route is public or private by design" },
  title: "Talk to the project",
  accent: "through its repositories",
  lead: "There is no sales team and no support desk. Maintainers are not named in the repository, so conversations happen where they can be read and answered in the open.",
};

/** A real sentence from the repository, attributed to the file it comes from. */
export const contactQuote = {
  text: "Open a private channel with the upgrade multisig. Do not publish an unfixed exploit.",
  source: "security/INCIDENT_RESPONSE.md, first hour",
  context:
    "That is the one case where a public issue is the wrong route. Everything else belongs in the open.",
};

export type ContactRoute = {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
};

export const contactRoutes: ContactRoute[] = [
  {
    title: "GitHub issues",
    body: "Bugs, questions about an instruction, and anything about the SDKs or the node process.",
    href: `${GITHUB_PROTOCOL_URL}/issues`,
    linkLabel: "Protocol issues",
  },
  {
    title: "Private security advisory",
    body: "A suspected vulnerability goes to the repository's private advisory form, never to a public issue.",
    href: `${GITHUB_PROTOCOL_URL}/security/advisories/new`,
    linkLabel: "Report privately",
  },
  {
    title: "Documentation",
    body: "The written protocol surface, the decision records, and the guides for the SDKs and the CLI.",
    href: DOCS_URL,
    linkLabel: "Read the documentation",
  },
  ...(X_URL
    ? [
        {
          title: "X",
          body: "Milestone notes and release announcements.",
          href: X_URL,
          linkLabel: "Follow on X",
        },
      ]
    : []),
  ...(DISCORD_URL
    ? [
        {
          title: "Discord",
          body: "Questions between contributors, in the open.",
          href: DISCORD_URL,
          linkLabel: "Join the server",
        },
      ]
    : []),
];

export const contactCta = {
  title: "Or just read",
  accent: "the source",
  action: { label: "Open the repository", href: GITHUB_PROTOCOL_URL },
};

export const notFoundPage = {
  tag: { strong: "404" },
  title: "This page does not exist",
  lead: "The link is wrong, or it pointed at a page that was never built. Nothing here is behind a login, so there is nothing to sign in to.",
  primary: { label: "Back to the home page", href: "/" },
  secondary: { label: "Read the documentation", href: DOCS_URL },
};
