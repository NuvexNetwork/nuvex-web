import type { PriceCardProps } from "@/components/cards/PriceCard";
import { DOCS_URL } from "@/lib/constants";
import { docsHref } from "./docs";

export const banner = {
  tag: { strong: "Network economics", rest: "nothing is priced yet" },
  title: "No fee moves,",
  accent: "and no number is set",
  lead: "A request records a max_fee that the programs never charge. ADR 0005 names the roles a fee would be split across and stops there. This page says what is true today and what is still a decision.",
  primary: { label: "Read the decision records", href: DOCS_URL },
  secondary: { label: "Run a node", href: "/nodes" },
};

export const columns = {
  title: "Three sides of a",
  accent: "fee that does not exist",
  description:
    "A tick marks something the programs do today. A dash marks something a later milestone has to decide.",
  cards: [
    {
      audience: "Developers",
      amount: "No fee",
      unit: "charged by the programs",
      description:
        "Open a request, receive a verified output. No lamports move for the job itself.",
      action: { label: "Start building", href: "/developers" },
      features: [
        { label: "max_fee is stored on the request and never charged", included: true },
        { label: "The proof is verified on-chain before the output is written", included: true },
        { label: "The callback receives the output and no accounts", included: true },
        { label: "You pay the Solana rent for the request account", included: true },
        { label: "A fee charged when a request is fulfilled", included: false },
        { label: "A quote for that fee before the request is opened", included: false },
        { label: "Priority between competing requests", included: false },
      ],
    },
    {
      audience: "Node operators",
      amount: "Coming soon",
      unit: "no reward is paid",
      description:
        "Stake, heartbeat, fulfil. Fulfilment pays nothing, because nothing is collected.",
      action: { label: "Node operation", href: "/nodes" },
      features: [
        { label: "Stake locks lamports in the node account", included: true },
        { label: "A node turns active at the configured minimum stake", included: true },
        { label: "The registry authority sets the heartbeat window", included: true },
        { label: "Fulfilment is first-come among eligible nodes", included: true },
        { label: "A node share of a request fee", included: false },
        { label: "Reward accounting and payouts", included: false },
        { label: "Automatic slashing with an evidence instruction", included: false },
      ],
    },
    {
      audience: "Protocol and treasury",
      amount: "Coming soon",
      unit: "no basis point is set",
      description: "The roles exist in a decision record. The split between them does not.",
      action: { label: "Read ADR 0005", href: docsHref("architecture") },
      features: [
        { label: "Four roles named: node, verifier, treasury, security fund", included: true },
        { label: "Treasury and security-fund authorities stay on separate keys", included: true },
        { label: "No request transition moves a lamport to the protocol", included: true },
        { label: "Basis points for each role", included: false },
        { label: "A treasury account that receives fees", included: false },
        { label: "A funded security reserve", included: false },
      ],
    },
  ] satisfies PriceCardProps[],
};

export type ComparisonRow = {
  capability: string;
  today: string;
  planned: string;
  record: string;
};

export type ComparisonGroup = { title: string; rows: ComparisonRow[] };

export const comparison = {
  title: "Today, planned,",
  accent: "and where it is decided",
  note: "ADR 0005 is the fee model record. It names four roles a fee would be split across, the node, the verifier, the treasury and a security fund, and it chooses no basis points. Until it does, every cell in the planned column is a decision and not a schedule.",
  headers: {
    capability: "Capability",
    today: "Today",
    planned: "Planned",
    record: "Decision record",
  },
  groups: [
    {
      title: "Requests",
      rows: [
        {
          capability: "Request fee",
          today: "max_fee is stored on the request and never charged",
          planned: "A fee collected when a request is fulfilled",
          record: "ADR 0005",
        },
        {
          capability: "Account rent",
          today: "The requester pays rent for the request account",
          planned: "Unchanged; rent is a chain cost, not a protocol fee",
          record: "ADR 0002",
        },
        {
          capability: "Cancel and expire",
          today: "Both transitions run and move no lamports",
          planned: "Whatever the fee model says about a refund",
          record: "ADR 0001",
        },
      ],
    },
    {
      title: "Nodes",
      rows: [
        {
          capability: "Minimum stake",
          today: "Set by the registry authority, not a constant in the program",
          planned: "A minimum chosen against a real Sybil cost",
          record: "ADR 0003",
        },
        {
          capability: "Fulfilment reward",
          today: "Nothing is paid for a fulfilment",
          planned: "A node share of the request fee",
          record: "ADR 0005",
        },
        {
          capability: "Selection weight",
          today: "First come among nodes that meet the eligibility predicate",
          planned: "Open; there is no weighted lottery",
          record: "ADR 0003",
        },
        {
          capability: "Slashing",
          today: "No automatic percentage and no evidence instruction",
          planned: "Penalties tied to recorded misbehaviour",
          record: "Not recorded yet",
        },
      ],
    },
    {
      title: "Protocol",
      rows: [
        {
          capability: "Fee split",
          today: "Roles are named; no basis point is set",
          planned: "A share for each of the four roles",
          record: "ADR 0005",
        },
        {
          capability: "Treasury balance",
          today: "No lamports reach a treasury account",
          planned: "Collection and distribution",
          record: "ADR 0005",
        },
        {
          capability: "Upgrade authority",
          today: "No program is deployed, so nothing is upgradeable",
          planned: "Multisig upgrades before any deployment",
          record: "ADR 0007",
        },
      ],
    },
  ] satisfies ComparisonGroup[],
};

export const faq = {
  title: "Questions the repository",
  accent: "already answers",
  items: [
    {
      question: "What does a request cost?",
      answer:
        "The programs charge no fee. max_fee is stored on the request and never collected. The requester pays Solana rent for the request account, which is a chain cost and not a protocol price.",
    },
    {
      question: "What does a node earn?",
      answer:
        "Nothing. Fulfilment pays no reward because nothing is collected. claim_reward is not an instruction. The operator card on this page says Coming soon for that reason.",
    },
    {
      question: "Is there a monthly or yearly plan?",
      answer:
        "No. Nuvex is not a hosted product with seats. There is no workspace, no credit pack and no enterprise SKU. A number here would be invented.",
    },
    {
      question: "When will fees and rewards exist?",
      answer:
        "After ADR 0005 names basis points for the four roles it already lists: node, verifier, treasury and security fund. Until then this page will not invent a schedule.",
    },
    {
      question: "Is anything deployed to mainnet?",
      answer:
        "No. scripts/deploy-mainnet.sh exits before any transaction. Nothing on this site is a quote, an offer or a balance you can claim.",
    },
  ],
};

export const strip = {
  caption: "What the fee model rests on today",
  names: ["max_fee", "ADR 0005", "Apache-2.0", "Coming soon"],
};

export const focus = {
  text: "A number written here today would be a guess.",
  accent: "The repository does not have one, so neither does this page.",
};

export const cta = {
  title: "Economics follow",
  accent: "the decision records",
  action: { label: "Read the docs", href: DOCS_URL },
};
