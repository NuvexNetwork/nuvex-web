import { DOCS_URL, GITHUB_PROTOCOL_URL } from "@/lib/constants";

import type { CapabilityStatus } from "./protocol";

export type ConsoleView = {
  title: string;
  status: CapabilityStatus;
  description: string;
  source?: { label: string; href: string };
  /** Rows of the honest empty state: what would appear here, and what blocks it. */
  notes: { label: string; value: string }[];
};

const indexerNote = {
  label: "Blocked on",
  value: "Milestone 4: indexer, PostgreSQL and the read API.",
};

export const consoleViews = {
  dashboard: {
    title: "Overview",
    status: "planned",
    description:
      "The console reads no chain state. Indexed views arrive with the indexer in Milestone 4, and until then this page shows what it will read rather than a number it cannot source.",
    source: { label: "Protocol source", href: GITHUB_PROTOCOL_URL },
    notes: [
      { label: "Will read", value: "Protocol config, request accounts, node accounts." },
      { label: "Reads today", value: "Nothing. No RPC call is made from this page." },
      indexerNote,
    ],
  },
  requests: {
    title: "Requests",
    status: "planned",
    description:
      "A VRF request is created on-chain and can be fulfilled by an eligible node. This page does not list those accounts, so nothing shown here is a result.",
    source: { label: "Request lifecycle", href: "/architecture" },
    notes: [
      { label: "Will read", value: "Request status, assigned node, and the VrfResult account." },
      { label: "Finality", value: "Only the account is final. An API answer is not." },
      indexerNote,
    ],
  },
  nodes: {
    title: "Nodes",
    status: "planned",
    description:
      "Registered nodes, their stake and their last heartbeat live in registry accounts. This page does not read them, and a backend must never appoint a node in private.",
    source: { label: "Eligibility rules", href: "/network" },
    notes: [
      { label: "Will read", value: "Node identity, stake, heartbeat slot, registered VRF key." },
      { label: "Eligibility", value: "Active, stake at the minimum, heartbeat in window." },
      indexerNote,
    ],
  },
  network: {
    title: "Network",
    status: "planned",
    description:
      "Network-wide counts and latencies are not collected anywhere yet. The CLI says so too: its network command reports that the network view waits on Milestone 4.",
    notes: [
      { label: "Will read", value: "Request throughput, fulfilment latency, active node count." },
      { label: "Measured today", value: "Nothing. No metric is aggregated." },
      indexerNote,
    ],
  },
  rewards: {
    title: "Rewards",
    status: "planned",
    description:
      "Reward accounting is not implemented. max_fee is stored on the request and never charged, and ADR 0005 sets no basis points, so no balance on this page would be a claim.",
    source: { label: "Economics", href: "/economics" },
    notes: [
      { label: "Will read", value: "Operator balance, claimable amount, payout history." },
      { label: "Charged today", value: "No fee. max_fee is a stored ceiling." },
      { label: "Blocked on", value: "ADR 0005 naming fee shares and basis points." },
    ],
  },
  analytics: {
    title: "Analytics",
    status: "planned",
    description:
      "Latency and throughput charts are omitted until there is a measurement to chart. The site collects no analytics of its own either.",
    notes: [
      { label: "Will read", value: "Fulfilment latency, proof verification cost, node uptime." },
      { label: "Measured today", value: "The node exposes health and metrics endpoints only." },
      indexerNote,
    ],
  },
  "api-keys": {
    title: "Keys",
    status: "planned",
    description:
      "Nuvex issues no centralised API credentials. On-chain identity is a keypair, and the four operator roles stay on separate keys.",
    source: { label: "Key management", href: "/security" },
    notes: [
      { label: "Roles", value: "Node identity, operator authority, treasury, security fund." },
      { label: "Issued here", value: "Nothing. There is no account system on this site." },
      { label: "Read API keys", value: "Waiting on the read API in Milestone 4." },
    ],
  },
  models: {
    title: "Models",
    status: "research",
    description:
      "Verifiable inference has no runtime in this tree. There is no model registry, no published model, and no verifier for an inference result.",
    source: { label: "Documentation", href: DOCS_URL },
    notes: [
      { label: "Exists", value: "A decision record sketch of what a verifier would need." },
      { label: "Does not exist", value: "Registry, runtime, proof format, verifier." },
      { label: "Blocked on", value: "A verification model for inference." },
    ],
  },
} satisfies Record<string, ConsoleView>;

export type ConsoleViewKey = keyof typeof consoleViews;
