import type { CounterItem } from "@/components/sections/CounterCells";
import type { FeatureItem } from "@/components/sections/FeatureCells";
import type { SplitItem } from "@/components/sections/FeatureSplit";
import { DOCS_URL, GITHUB_PROTOCOL_URL } from "@/lib/constants";

/** Visuals cannot live in data, so a row names its panel and the page maps the key. */
export type PanelSplit<Panel extends string> = Omit<SplitItem, "visual"> & { panel: Panel };

/** Same reason for icons: the key is data, the Lucide component belongs to the page. */
export type IconCell<Icon extends string> = Omit<FeatureItem, "icon"> & { icon: Icon };

export const technologyPage = {
  meta: {
    title: "Verifiable randomness",
    description:
      "A Nuvex randomness request is fulfilled with an 80-byte ECVRF proof that the verification program checks on-chain before the 64-byte output is written. No audit report of the VRF crate was found.",
  },
  banner: {
    tag: { strong: "Live in the programs", rest: "· Milestone 3" },
    title: "Randomness a program",
    accent: "can check for itself",
    lead: "A request carries a job type, an input, constraints and an optional callback. Randomness is the first job type: a node returns an 80-byte ECVRF proof, the verification program checks it on-chain, and the 64-byte output is written before anything else happens.",
    primary: { label: "See the architecture", href: "/architecture" },
    secondary: { label: "Read the docs", href: DOCS_URL },
  },
  strip: {
    caption: "The standards and libraries the proof rests on",
    names: ["RFC 9381", "ECVRF", "Ed25519", "SHA-512", "solana-ecvrf", "Anchor", "LiteSVM"],
  },
  flow: {
    title: "One request,",
    accent: "proved off-chain and checked on-chain",
    items: [
      {
        title: "What a request",
        accent: "carries",
        body: "The request account stores the job type, at most 256 bytes of input, the slot it expires at, a max_fee ceiling that is recorded and never charged, and an optional callback program with at most 128 bytes of data. The default pubkey means no callback; a callback that is set receives the output and no accounts.",
        status: "live",
        panel: "request",
      },
      {
        title: "Verification happens",
        accent: "inside the program",
        body: "The alpha is built by the protocol from the string nuvex-vrf-v1, the request account, the job type and the input, never from instruction data. The verification program checks the proof with solana-ecvrf 0.0.1 and writes the 64-byte output to an account bound to that one request.",
        status: "live",
        panel: "verify",
        reverse: true,
      },
      {
        title: "Proving stays with",
        accent: "the key holder",
        body: "nuvex_sdk::prove_vrf takes the secret, the request, the job type and the input on the host and returns the 80-byte proof and the 64-byte output. The proving feature is not compiled into the programs, and the SDKs still refuse to send a transaction.",
        panel: "rust",
      },
    ] satisfies PanelSplit<"request" | "verify" | "rust">[],
  },
  focus: {
    text: "No audit report of the VRF crate was found.",
    accent:
      "ADR 0004 records that absence as part of the decision, and no audit of the Nuvex programs has been commissioned either.",
  },
  uses: {
    title: "Where an output",
    accent: "like this is useful",
    description:
      "These are uses of a verified 64-byte output, not deployments. Nothing is live on mainnet.",
    items: [
      {
        icon: "dice",
        title: "Draws",
        body: "A raffle, a lottery or a loot roll settles in the callback, and the proof stays on the request so anyone can re-check the roll afterwards.",
      },
      {
        icon: "shuffle",
        title: "Ordering",
        body: "Shuffling a queue, an allowlist or a turn order without a trusted party running the shuffle somewhere nobody can see.",
      },
      {
        icon: "split",
        title: "Allocation",
        body: "Picking winners, traits or slots from a fixed set, where a recipient wants to know why they got what they got.",
      },
    ] satisfies IconCell<"dice" | "shuffle" | "split">[],
  },
  cta: {
    title: "Randomness your program",
    accent: "can verify",
    action: { label: "See the architecture", href: "/architecture" },
  },
};

export const architecturePage = {
  meta: {
    title: "Architecture",
    description:
      "Three Anchor programs, shared types and PDA seeds in crates/, one request lifecycle with three live transitions, and the decision records behind the callback, account and upgrade models.",
  },
  banner: {
    tag: { strong: "Three programs", rest: "· one request account" },
    title: "How the protocol",
    accent: "is put together",
    lead: "oracle-core creates requests and performs callbacks, oracle-registry holds nodes and stake, and verification checks proofs. Nothing else is on-chain, and no job type gets a private instruction set.",
    primary: { label: "See the node network", href: "/network" },
    secondary: { label: "Protocol source", href: GITHUB_PROTOCOL_URL },
  },
  strip: {
    caption: "The on-chain surface and the tools that test it",
    names: ["oracle-core", "oracle-registry", "verification", "Anchor", "LiteSVM", "PDA seeds"],
  },
  programs: {
    title: "The on-chain surface",
    accent: "is three Anchor programs",
    lead: {
      title: "A job-agnostic request,",
      accent: "so a new job means a new verifier and not a new core program",
    },
    items: [
      {
        title: "oracle-core",
        body: "Creates requests, accounts for fees, finalises and performs the callback CPI. request_randomness is not an entrypoint: the job type is a field.",
        status: "live",
      },
      {
        title: "oracle-registry",
        body: "Registers nodes, locks stake, records heartbeats and accepts a slash amount from the configured slash authority.",
        status: "live",
      },
      {
        title: "verification",
        body: "Checks the ECVRF proof against the key stored on the node account. Challenges are reserved for a later milestone.",
        status: "live",
      },
      {
        title: "crates/",
        body: "Shared types, the PDA seeds that tests/fixtures/pda-seeds.json also pins, and the cryptography boundary, so the programs cannot drift apart on a layout.",
      },
    ] satisfies FeatureItem[],
  },
  lifecycle: {
    title: "One lifecycle,",
    accent: "and a transition table that refuses the rest",
    items: [
      {
        title: "The live",
        accent: "transitions",
        body: "A request account is created already in Pending. The requester may cancel while the slot is below expires_slot, any crank may expire it once that slot passes, and fulfill takes a VRF request straight to CallbackExecuted once the proof is accepted.",
        status: "live",
        panel: "request",
      },
      {
        title: "The forbidden",
        accent: "edges",
        body: "ADR 0001 classifies every pair of states. The multi-step assignment path is reserved and no instruction performs it. Every edge into or out of Challenged, Rejected and Failed stays forbidden, because the protocol does not yet know how a challenge returns to finality.",
        panel: "verify",
        reverse: true,
      },
    ] satisfies PanelSplit<"request" | "verify">[],
  },
  focus: {
    text: "Cancel, expire and VRF fulfilment are the only live transitions.",
    accent: "Every challenge, reject and fail edge stays closed until a decision record opens it.",
  },
  decisions: {
    title: "The decisions",
    accent: "are written down before the code",
    items: [
      {
        title: "Account model, ADR 0002",
        body: "Every account is a PDA. A request is seeded by the requester and a 32-byte id, so one user cannot occupy another user's id. No account stores a URL or an unbounded list.",
        status: "live",
      },
      {
        title: "Callback model, ADR 0006",
        body: "The CPI carries the 64-byte output and the stored callback bytes, and passes zero accounts. A fulfiller cannot choose what the callee touches. A failing callback reverts the transaction.",
        status: "live",
      },
      {
        title: "Upgrade model, ADR 0007",
        body: "Upgrade authority is a multisig, never the deploy keypair. Nothing is deployed, and scripts/deploy-mainnet.sh exits before any transaction.",
        status: "planned",
      },
    ] satisfies FeatureItem[],
  },
  cta: {
    title: "Read the records",
    accent: "behind every decision",
    action: { label: "Read the docs", href: DOCS_URL },
  },
};

export const networkPage = {
  meta: {
    title: "Node network",
    description:
      "A node may fulfil a Nuvex request when it is active, its stake meets the configured minimum, its heartbeat is inside the configured window and its VRF key was registered before the request. Fulfilment is first-come.",
  },
  banner: {
    tag: { strong: "Node network", rest: "· stake, heartbeat, first-come" },
    title: "Who may fulfil",
    accent: "a request",
    lead: "Eligibility is a function of public inputs, so an observer can recompute it from the chain. The first eligible proof wins, and the requester never names the fulfiller.",
    primary: { label: "Run a node", href: "/nodes" },
    secondary: { label: "Read the docs", href: DOCS_URL },
  },
  counters: [
    { value: 3, label: "Solana programs" },
    { value: 80, label: "Byte ECVRF proof" },
    { value: 64, label: "Byte VRF output" },
    { value: 7, label: "Decision records" },
  ] satisfies CounterItem[],
  eligibility: {
    title: "The eligibility predicate",
    accent: "is checked inside fulfill",
    items: [
      {
        title: "Four checks,",
        accent: "no invitation list",
        body: "ADR 0003: the node status is Active, its stake is at or above min_stake, its heartbeat is inside the configured window, and its VRF key was registered at a slot earlier than the request. fulfill then writes the node, stake and heartbeat it accepted onto the request.",
        status: "live",
        panel: "nodes",
      },
      {
        title: "A heartbeat",
        accent: "inside the window",
        body: "A node heartbeats with its own authority. The window is a registry field between 1 and 150,000 slots, a safety bound rather than a chosen duration. Outside it, the node is ineligible until it heartbeats again.",
        status: "live",
        panel: "heartbeat",
        reverse: true,
      },
      {
        title: "Stake locked",
        accent: "before fulfilment",
        body: "A deposit that reaches min_stake makes a node Active. Unstaking locks the whole stake until cooldown_end_slot and rejects heartbeat and fulfil meanwhile. The slash authority can still take lamports during that cooldown.",
        status: "live",
        link: { label: "Run a node", href: "/nodes" },
        panel: "stake",
      },
    ] satisfies PanelSplit<"nodes" | "heartbeat" | "stake">[],
  },
  focus: {
    text: "Fulfilment is first-come among eligible nodes.",
    accent:
      "There is no weighted lottery, no assigned set and no private backend picking a fulfiller.",
  },
  quote: {
    source: "Protocol README",
    context: "Milestone 3 status",
    text: "An operator who funds several keys can still choose among those outputs. The cost of each extra key is the configured minimum stake.",
    accent: "A minimum of zero does not resist that.",
  },
  limits: {
    title: "What this",
    accent: "does not resist",
    items: [
      {
        title: "Many keys, one operator",
        body: "There is no on-chain list of nodes, so a program cannot draw a winner from every registered key. An operator who registered several keys before a request can submit whichever of those outputs they prefer.",
      },
      {
        title: "The cost of an identity",
        body: "Each extra key has to lock at least min_stake, a number the registry authority sets. Zero is allowed, and zero does not resist Sybil.",
      },
      {
        title: "What would close it",
        body: "A stake-weighted draw needs an on-chain node index the programs do not have, and a weight would be an economic policy. ADR 0003 leaves it open. Reputation stays a counter, never a weight.",
        status: "planned",
      },
    ] satisfies FeatureItem[],
  },
  cta: {
    title: "Run a node",
    accent: "on this network",
    action: { label: "Node operator guide", href: "/nodes" },
  },
};

export const nodesPage = {
  meta: {
    title: "Node operators",
    description:
      "What a Nuvex node does today: health and metrics, no signer and no transactions. Registration, stake and heartbeats are program instructions; the CLI, rewards and slashing payouts are not live.",
  },
  banner: {
    tag: { strong: "For node operators", rest: "· health and metrics today" },
    title: "Run a node, and know",
    accent: "what it does not do yet",
    lead: "The node process exposes a health endpoint and metrics. It does not open a key file, build a proof or send a transaction. Registration, stake and heartbeats are registry instructions you drive yourself.",
    primary: { label: "Protocol source", href: GITHUB_PROTOCOL_URL },
    secondary: { label: "Read the docs", href: DOCS_URL },
  },
  strip: {
    caption: "What an operator actually runs today",
    names: ["Docker", "Health", "Metrics", "CLI", "Stake", "Heartbeat"],
  },
  operating: {
    title: "What the node",
    accent: "does today",
    items: [
      {
        title: "Health and metrics,",
        accent: "and nothing it could sign",
        body: "nuvex-oracle-node serves health and Prometheus metrics on NUVEX_NODE_HEALTH_BIND with structured logs. Fulfilment submission is the next step for this process, so no VRF key is loaded yet.",
        status: "in-development",
        panel: "operator",
      },
      {
        title: "Register, stake,",
        accent: "heartbeat",
        body: "Registration sets the node authority, a separate operator pubkey, the capability mask and the VRF key, which no later update can replace. A deposit reaching min_stake makes the node Active; unstake starts the cooldown and withdraw returns the accounted stake.",
        status: "live",
        panel: "stake",
        reverse: true,
      },
      {
        title: "The CLI",
        accent: "surface",
        body: "The binary is nuvex, with node, request, registry, staking and network commands. Every one of them reports the milestone it is waiting on, so nothing in the CLI talks to a cluster yet.",
        status: "planned",
        panel: "cli",
      },
    ] satisfies PanelSplit<"operator" | "stake" | "cli">[],
  },
  focus: {
    text: "The node process holds no signer.",
    accent:
      "A lying RPC has nothing to make it sign, because it does not send transactions at all.",
  },
  setup: {
    title: "Getting a node",
    accent: "running locally",
    description: "The image and the environment file both come from the protocol repository.",
    items: [
      {
        icon: "container",
        title: "Container image",
        body: "The image is built from the repository root: docker build -f node/Dockerfile -t nuvex-oracle-node:local .",
      },
      {
        icon: "file",
        title: "Environment file",
        body: "Copy an example before pointing a process at a cluster: cp env/.env.local.example .env.local. RPC URLs, program ids and key paths are variables, never defaults in source, and .env files are never committed.",
      },
      {
        icon: "coins",
        title: "Rewards and slashing",
        body: "No reward is paid: claim_reward is not an instruction and request fees do not move. Slash takes an amount named by the configured authority and sends it to slash_destination; there is no automatic percentage.",
        status: "planned",
      },
    ] satisfies IconCell<"container" | "file" | "coins">[],
  },
  cta: {
    title: "See how eligibility",
    accent: "is decided",
    action: { label: "Explore the network", href: "/network" },
  },
};

export const securityPage = {
  meta: {
    title: "Security",
    description:
      "No audit has been commissioned and nothing is deployed to mainnet. What the programs enforce today, what the security documents say, how the four key roles are split, and how to report a vulnerability privately.",
  },
  banner: {
    tag: { strong: "No audit", rest: "has been commissioned" },
    title: "Security, stated",
    accent: "without a claim of safety",
    lead: "Nuvex is not deployed and has not been audited. Do not put value behind these programs. What follows is what the instructions actually enforce, and what is still only policy on paper.",
    primary: { label: "See the architecture", href: "/architecture" },
    secondary: { label: "Protocol source", href: GITHUB_PROTOCOL_URL },
  },
  strip: {
    caption: "Documents that state the limits, not a claim of safety",
    names: ["AUDIT_SCOPE", "THREAT_MODEL", "KEY_MANAGEMENT", "INCIDENT_RESPONSE", "UPGRADE_POLICY"],
  },
  posture: {
    title: "Where the protocol",
    accent: "actually stands",
    items: [
      {
        title: "No audit, and",
        accent: "no report to point at",
        body: "AUDIT_SCOPE.md is a scope, not a report: no audit has been commissioned. The verifier, solana-ecvrf 0.0.1, has no audit report either. Its published compute measurements are not treated as one.",
        panel: "programs",
      },
      {
        title: "What the programs",
        accent: "do enforce",
        body: "A forged proof is rejected. A second fulfil is rejected. The alpha binds the request account, so an old proof cannot be replayed. The callback CPI passes zero accounts and does not include the request.",
        status: "live",
        panel: "verify",
        reverse: true,
      },
    ] satisfies PanelSplit<"programs" | "verify">[],
  },
  documents: {
    title: "The security documents,",
    accent: "and what each one admits",
    items: [
      {
        title: "AUDIT_SCOPE.md",
        body: "The scope a future auditor would be asked to cover: the three programs, the PDA seeds in crates/common, fee and stake arithmetic, callback account binding, and the upgrade and pause authorities.",
      },
      {
        title: "THREAT_MODEL.md",
        body: "A row per threat, naming the mitigation that exists today and the milestone that still owes one. Solana account state is authoritative; the API, indexer and dashboard are not.",
      },
      {
        title: "KEY_MANAGEMENT.md",
        body: "Four roles stay on separate keys. Development program keypairs are gitignored, and a leaked one is treated as burned: generate a new id and do not reuse the address.",
      },
      {
        title: "INCIDENT_RESPONSE.md",
        body: "Severity levels and a first hour that confirms a claim against the account rather than the API. The pause flag the procedure reaches for is not implemented.",
        status: "planned",
      },
      {
        title: "UPGRADE_POLICY.md",
        body: "Everything required before mainnet, none of it done: named multisig members and a threshold, a timelock, a public changelog with the buffer hash, an emergency pause, an independent audit and a devnet rehearsal.",
        status: "planned",
      },
      {
        title: "SECURITY.md",
        body: "Report privately through the repository's security advisory form, never a public issue. Include the program id, the instruction and a transaction that shows the issue on a local validator. There is no bug bounty.",
      },
    ] satisfies FeatureItem[],
  },
  focus: {
    text: "Nothing is deployed to mainnet, and nothing holds value.",
    accent: "scripts/deploy-mainnet.sh exits before any transaction.",
  },
  keys: {
    title: "Four roles,",
    accent: "four separate keys",
    items: [
      {
        title: "Node identity",
        body: "Signs fulfilment. On local and devnet a key path in NUVEX_NODE_KEY_PATH is acceptable; the node does not open the file yet.",
      },
      {
        title: "Operator authority",
        body: "Registers the node and moves stake. It is a separate pubkey and need not be the node authority.",
      },
      {
        title: "Treasury and security fund",
        body: "Would move fees once fees exist. Destinations are set at initialisation and stay empty until then, and the treasury, security fund and reward destinations must not be one key.",
        status: "planned",
      },
      {
        title: "Upgrade authority",
        body: "A multisig, never a hot node key and never the deploy keypair. Hardware or a KMS before mainnet.",
      },
    ] satisfies FeatureItem[],
  },
  cta: {
    title: "Found something?",
    accent: "Report it privately",
    action: {
      label: "Open a private advisory",
      href: `${GITHUB_PROTOCOL_URL}/security/advisories/new`,
    },
  },
};
