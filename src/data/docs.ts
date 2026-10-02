import { DOCS_URL } from "@/lib/constants";

import type { CapabilityStatus } from "./protocol";

export function docsHref(path: string): string {
  return `${DOCS_URL.replace(/\/$/, "")}/${path}`;
}

export const banner = {
  tag: { strong: "Documentation", rest: "docs.nuvex.space" },
  title: "Every page the protocol",
  accent: "actually has",
  lead: "The documentation site is a separate repository. Each entry below opens that page. Pages that describe planned work are marked as such.",
  primary: { label: "Open the documentation", href: DOCS_URL },
  secondary: { label: "Developer tools", href: "/developers" },
};

export type DocsPage = {
  title: string;
  meta: string;
  path: string;
  /** Set when the page records work that is not built. Those rows are not links. */
  status?: CapabilityStatus;
};

export type DocsGroup = {
  id: string;
  title: string;
  description: string;
  pages: DocsPage[];
};

export const tree = {
  title: "The documentation tree,",
  accent: "group by group",
  description:
    "Nine groups, mirroring the tree in the documentation repository. A page that says a feature is absent has no hidden code path behind it.",
  groups: [
    {
      id: "introduction",
      title: "Introduction",
      description: "What a caller submits, and what the chain refuses to do.",
      pages: [
        {
          title: "Introduction",
          meta: "Request, fulfil, verify",
          path: "introduction",
        },
      ],
    },
    {
      id: "oracle",
      title: "Oracle",
      description: "One job family is implemented. The rest of the group records what is not.",
      pages: [
        { title: "VRF", meta: "80-byte proof, 64-byte output", path: "oracle/vrf" },
        { title: "Callbacks", meta: "128 bytes of data, no accounts", path: "oracle/callbacks" },
        {
          title: "Data",
          meta: "No source adapter performs HTTP",
          path: "oracle/data",
          status: "planned",
        },
        {
          title: "Price",
          meta: "Aggregation is a median, once built",
          path: "oracle/price",
          status: "planned",
        },
        {
          title: "AI",
          meta: "No model, no runtime, no proof",
          path: "oracle/ai",
          status: "research",
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      description: "The program split and the decision records that bound it.",
      pages: [
        {
          title: "Architecture",
          meta: "Three programs, seven decision records",
          path: "architecture",
        },
      ],
    },
    {
      id: "verification",
      title: "Verification",
      description: "How a proof becomes a stored result, and what is deferred.",
      pages: [
        { title: "Verification", meta: "verify_vrf, called by oracle core", path: "verification" },
      ],
    },
    {
      id: "sdk",
      title: "SDK",
      description: "Both clients, the CLI, and the callback interface a consumer implements.",
      pages: [
        { title: "Overview", meta: "What the clients derive and refuse", path: "sdk" },
        { title: "Rust", meta: "nuvex-sdk, prove_vrf and the PDA helpers", path: "sdk/rust" },
        {
          title: "TypeScript",
          meta: "@nuvex/sdk, protocolPda and requestPda",
          path: "sdk/typescript",
        },
        { title: "CLI", meta: "The nuvex binary and its five commands", path: "sdk/cli" },
        { title: "CPI", meta: "The callback instruction, with no accounts", path: "sdk/cpi" },
      ],
    },
    {
      id: "nodes",
      title: "Nodes",
      description: "Running the process, and the registry accounts behind it.",
      pages: [
        { title: "Installation", meta: "The health-only node binary", path: "nodes/installation" },
        {
          title: "Configuration",
          meta: "Environment variables, no default cluster",
          path: "nodes/configuration",
        },
        {
          title: "Staking",
          meta: "configure_stake, cooldown, heartbeat window",
          path: "nodes/staking",
        },
        {
          title: "Rewards",
          meta: "Basis points are not chosen",
          path: "nodes/rewards",
          status: "planned",
        },
        {
          title: "Slashing",
          meta: "No evidence instruction, no percentage",
          path: "nodes/slashing",
          status: "planned",
        },
      ],
    },
    {
      id: "security",
      title: "Security",
      description: "The threat model, and the absence of an audit report.",
      pages: [
        { title: "Overview", meta: "No audit exists; the scope is a scope", path: "security" },
        {
          title: "Threat model",
          meta: "Chain state is the authority",
          path: "security/threat-model",
        },
      ],
    },
    {
      id: "developers",
      title: "Developers",
      description: "Where to start, and the toolchain the repository expects.",
      pages: [
        { title: "Overview", meta: "Clients derive PDAs and refuse to submit", path: "developers" },
        {
          title: "Quick start",
          meta: "Toolchain versions and make check",
          path: "developers/quick-start",
        },
      ],
    },
    {
      id: "api",
      title: "API",
      description: "A read model for Milestone 4, written down before it exists.",
      pages: [
        {
          title: "API",
          meta: "Collection routes under /v1 return 501",
          path: "api",
          status: "planned",
        },
      ],
    },
  ] satisfies DocsGroup[],
};

export const focus = {
  text: "If a page says a feature is absent,",
  accent: "there is no hidden code path that implements it.",
};

export const cta = {
  title: "Read the protocol",
  accent: "in its own words",
  action: { label: "Open the documentation", href: DOCS_URL },
};
