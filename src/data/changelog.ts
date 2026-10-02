import { GITHUB_DOCS_URL, GITHUB_PROTOCOL_URL } from "@/lib/constants";

/**
 * Milestones, not releases. The repository records no dates for them, so each row
 * carries the milestone number and nothing that would have to be invented.
 */
export type MilestoneState = "Complete" | "Current" | "Not started";

export type Milestone = {
  label: string;
  title: string;
  state: MilestoneState;
  summary: string;
  items: string[];
  /** Where the claim above is written down. */
  sources: string;
};

export const changelogPage = {
  title: "Changelog",
  accent: "by milestone",
  lead: "Nuvex is tracked in milestones, and the repository does not record a date for any of them. Each entry below is taken from the protocol README and the status line of the decision records it amended, so a row says what was implemented rather than when.",
  links: [
    { label: "Protocol README", href: GITHUB_PROTOCOL_URL },
    { label: "Decision records", href: `${GITHUB_DOCS_URL}/tree/main/architecture/adr` },
  ],
};

export const milestones: Milestone[] = [
  {
    label: "Milestone 0",
    title: "Workspace initialisation",
    state: "Complete",
    summary:
      "The repository, the toolchain and the specifications, with no instruction handlers behind them.",
    items: [
      "ADR 0001 accepted: the protocol is job-agnostic, and three programs own the on-chain surface.",
      "ADR 0002 accepted as a layout specification. Every account is a PDA and no account stores a URL or an unbounded list.",
      "Toolchain pinned: Anchor 1.2.0, Solana CLI 4.1.2, Solana crates 3.x, Rust 1.89 MSRV, Node.js 22, TypeScript 5.9.3, pnpm 10.15.1.",
      "Security documents written: audit scope, threat model, key management, incident response and upgrade policy.",
      "No instruction handlers, no token mint, and none of the four key roles loaded.",
    ],
    sources: "ADR 0001, ADR 0002, security/AUDIT_SCOPE.md, security/KEY_MANAGEMENT.md",
  },
  {
    label: "Milestone 1",
    title: "Accounts and the transition graph",
    state: "Complete",
    summary: "The request and registry accounts exist, and the legal state changes are classified.",
    items: [
      "ADR 0001 amended with the transition graph. transition in nuvex-protocol-types classifies every pair of states.",
      "Implemented edges: Pending to Cancelled by the requester while slot is below expires_slot, and Pending to Expired by any crank once slot has reached it.",
      "ADR 0002 amended for the request and registry accounts. ProtocolConfig, NodeRegistry and Node are initialised once by the deployer.",
      "A request copies expires_slot at creation, so a later job-config edit does not rewrite it.",
      "Instructions that exist check their PDA seeds.",
    ],
    sources: "ADR 0001, ADR 0002, security/THREAT_MODEL.md",
  },
  {
    label: "Milestone 2",
    title: "VRF fulfilment, verification and the empty-account callback",
    state: "Complete",
    summary:
      "A proof is checked inside a program, and the output reaches a callback that holds no accounts.",
    items: [
      "ADR 0004 accepted for VRF: solana-ecvrf 0.0.1, ECVRF-EDWARDS25519-SHA512-TAI from RFC 9381, suite byte 0x03, 80-byte proof, 64-byte output. No audit report of that crate was found.",
      "Alpha is built by nuvex-vrf and never taken from instruction data, so a user cannot submit an unbound alpha.",
      "VrfResult is created by oracle core through CPI, with the protocol PDA as the required signer.",
      "ADR 0006 implemented for the empty-account callback: the CPI passes zero accounts, does not include the request, and a failing callback reverts the transaction.",
      "A second fulfilment is rejected, and no reward is paid because no fee moves.",
    ],
    sources: "ADR 0001, ADR 0004, ADR 0006, Protocol README",
  },
  {
    label: "Milestone 3",
    title: "Stake configuration, the eligibility predicate and the assignment snapshot",
    state: "Current",
    summary:
      "Fulfilment now requires stake, an active status and a fresh heartbeat, and the request keeps the values that were checked.",
    items: [
      "ADR 0003 amended: the selection function is the eligibility predicate, and it is not a weighted lottery.",
      "A fulfiller must be Active, hold stake at or above min_stake, have a heartbeat inside the configured window, and have registered its VRF key before the request.",
      "fulfill writes assigned_node, assigned_stake and assigned_heartbeat, so an observer sees the values that were checked rather than a later balance.",
      "Node statuses are Registered, Active and Unstaking. The unstake cooldown and the heartbeat window are registry fields bounded to 1..=150_000.",
      "Still open at this milestone: max_fee is stored and never charged, the node process does not submit transactions, and an operator who funds several keys can choose among those outputs.",
    ],
    sources: "ADR 0002, ADR 0003, Protocol README status",
  },
  {
    label: "Milestone 4",
    title: "Indexer, PostgreSQL, read API and dashboard reads",
    state: "Not started",
    summary:
      "The next milestone. Nothing below is implemented, and the services repository says so.",
    items: [
      "Chain indexing is not implemented. The services repository holds a PostgreSQL schema and no indexer.",
      "The read API does not sign or authorise chain state, and it is not a source of protocol truth.",
      "Dashboard views on this site read nothing from a cluster, which is why every console visual here is labelled an illustration.",
      "The CLI network command reports that the network is not implemented until this milestone.",
      "Fees stay unset until ADR 0005 names basis points, and there is no mainnet deployment.",
    ],
    sources: "Protocol README next milestone, nuvex-services README, ADR 0005",
  },
];
