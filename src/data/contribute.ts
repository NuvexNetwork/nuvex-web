import { GITHUB_DOCS_URL, GITHUB_PROTOCOL_URL } from "@/lib/constants";

import type { DocSection } from "./content";
import type { CapabilityStatus } from "./protocol";

/**
 * There are no job openings. These are the areas of the open repositories where a
 * pull request is useful, with the checks it has to pass and the decisions it must
 * not invent.
 */
export type ContributionArea = {
  slug: string;
  title: string;
  /** One line, used as the row meta on the list page. */
  scope: string;
  /** The status of what the area covers, not of the area itself. */
  status: CapabilityStatus;
  lead: string;
  meta: { label: string; value: string }[];
  source: { label: string; href: string };
  sections: DocSection[];
};

export const contributeBanner = {
  tag: { strong: "Open source", rest: "— Apache-2.0, four repositories" },
  title: "Contribution areas,",
  accent: "not job openings",
  lead: "Nuvex is built in public and nobody is hiring. These are the parts of the repositories where work is open, what a first pull request looks like in each, and the decisions a pull request must leave alone.",
  primary: { label: "Open the protocol repository", href: GITHUB_PROTOCOL_URL },
  secondary: { label: "Read the decision records", href: GITHUB_DOCS_URL },
};

export const contributeStrip = {
  caption: "The checks a pull request has to pass",
  names: ["make check", "Clippy", "cargo build-sbf", "LiteSVM", "pnpm test", "Apache-2.0"],
};

export const contributePrinciples = {
  title: "What a contribution",
  accent: "has to respect",
  items: [
    {
      icon: "record" as const,
      title: "Decisions first",
      body: "A pull request does not invent an instruction, a fee or a job type. If the decision is not in an ADR, the change does not belong in the programs.",
    },
    {
      icon: "check" as const,
      title: "make check passes",
      body: "One command runs formatting, Clippy, cargo build-sbf for the three programs and the test callback consumer, the Rust tests and the JavaScript SDK tests.",
    },
    {
      icon: "honest" as const,
      title: "Do not invent capabilities",
      body: "The documentation contributing guide asks you not to document an instruction, fee or job the protocol has not implemented. The website follows the same rule.",
    },
    {
      icon: "numbers" as const,
      title: "No invented numbers",
      body: "Fees, rewards and basis points stay unset until ADR 0005 names them. A pull request that fills those in is inventing economics.",
    },
    {
      icon: "keys" as const,
      title: "Keys stay separate",
      body: "Node identity, operator authority, treasury and the security fund stay on separate keys. Development program keypairs stay gitignored.",
    },
    {
      icon: "deploy" as const,
      title: "Nothing deploys itself",
      body: "scripts/deploy-mainnet.sh must keep refusing to run. A change that makes it send a transaction is a defect.",
    },
  ],
};

export const contributeCta = {
  title: "Pick an area and",
  accent: "open a pull request",
  action: { label: "Browse open issues", href: `${GITHUB_PROTOCOL_URL}/issues` },
};

const checksBlock = (items: string[]): DocSection["blocks"] => [
  { kind: "text", text: "Every pull request to the protocol repository has to pass one command:" },
  { kind: "code", language: "bash", code: "make check" },
  {
    kind: "text",
    text: "That runs formatting, Clippy, cargo build-sbf for the three programs and the test callback consumer, the Rust tests and the JavaScript SDK tests. Program tests load target/deploy/*.so, so the Solana CLI and the platform tools have to be installed.",
  },
  { kind: "list", items },
];

export const contributionAreas: ContributionArea[] = [
  {
    slug: "solana-programs",
    title: "Solana programs",
    scope: "oracle-core, oracle-registry, verification",
    status: "live",
    lead: "The on-chain surface is three Anchor programs. They stay deterministic: no HTTP, no databases, no model runtimes.",
    meta: [
      { label: "Repository", value: "nuvex" },
      { label: "Path", value: "programs/, crates/" },
      { label: "Language", value: "Rust, Anchor 1.2.0" },
      { label: "Toolchain", value: "Solana CLI 4.1.2, Rust 1.89 MSRV" },
    ],
    source: { label: "programs/ on GitHub", href: `${GITHUB_PROTOCOL_URL}/tree/main/programs` },
    sections: [
      {
        id: "what-lives-here",
        heading: "What lives here",
        blocks: [
          {
            kind: "text",
            text: "oracle-core creates requests, accounts for fees, finalises and performs callbacks. oracle-registry registers nodes, locks stake, records heartbeats and accepts slash from a configured authority. verification checks proofs. crates/ holds the shared types, the PDA seeds and the cryptography boundary.",
          },
          { kind: "panel", panel: "programs" },
          {
            kind: "text",
            text: "Every account is a PDA and no account stores a URL or an unbounded list. Seeds are shared between nuvex-common and tests/fixtures/pda-seeds.json, so a new account means a new entry in both.",
          },
        ],
      },
      {
        id: "first-contribution",
        heading: "A first contribution",
        blocks: [
          {
            kind: "list",
            items: [
              "Add a negative test for an instruction that already exists, then make sure it fails for the stated reason rather than by accident.",
              "Tighten an error: a check that returns a generic Anchor error where the protocol has a named one.",
              "Document a seed or a discriminant in crates/ that the fixtures already pin.",
              "Fix an arithmetic path that is not using checked arithmetic on lamports.",
            ],
          },
          {
            kind: "text",
            text: "A change that adds an instruction needs a decision record first. A change that only wants the code to compile is not a reason to open a blocked decision.",
          },
        ],
      },
      {
        id: "checks",
        heading: "Checks that must pass",
        blocks: checksBlock([
          "LiteSVM 0.17 loads the default SBF architecture from that command, because verification calls sol_sha512.",
          "A cluster where SIMD-0512 is inactive cannot run the verifier, so do not assume a local validator without it.",
          "Program ids in Anchor.toml are local ids. Development keypairs live in keys/program/ and are gitignored.",
        ]),
      },
      {
        id: "closed-decisions",
        heading: "Decisions that are closed",
        blocks: [
          {
            kind: "list",
            items: [
              "ADR 0001: cancel, expire and VRF fulfilment are the live transitions. Every challenge, reject and fail edge stays forbidden.",
              "ADR 0002: challenge and reward vault accounts are not allocated.",
              "ADR 0005: max_fee is stored and never charged, and no basis points are set.",
              "ADR 0006: the callback receives the output and zero accounts. Forwarding remaining_accounts was rejected.",
              "ADR 0007: no program is deployed, and scripts/deploy-mainnet.sh exits before any transaction.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "sdks",
    title: "Rust and JavaScript SDKs",
    scope: "PDA helpers that refuse to submit work",
    status: "in-development",
    lead: "Both SDKs derive every program address and can prove a VRF output on the host. Neither sends a transaction, and that is deliberate until the submission path is designed.",
    meta: [
      { label: "Repository", value: "nuvex" },
      { label: "Path", value: "sdk/rust, sdk/js" },
      { label: "Language", value: "Rust, TypeScript 5.9.3" },
      { label: "Package manager", value: "pnpm 10.15.1, Node.js 22" },
    ],
    source: { label: "sdk/ on GitHub", href: `${GITHUB_PROTOCOL_URL}/tree/main/sdk` },
    sections: [
      {
        id: "what-lives-here",
        heading: "What lives here",
        blocks: [
          {
            kind: "text",
            text: "nuvex-sdk exposes prove_vrf(&secret, &request, JobType, &input), which returns an 80-byte proof and a 64-byte output, and node_pda, which derives the node account. The secret stays with the caller.",
          },
          {
            kind: "text",
            text: "@nuvex/sdk exposes requestPda(programId, requester, requestId) and protocolPda, and buildCallbackInstruction, which returns the callback bytes without sending them. submitRequest throws on purpose.",
          },
          {
            kind: "quote",
            text: "The SDK can prove on the host and still refuses to send a transaction.",
            source: "Protocol README, status",
          },
        ],
      },
      {
        id: "first-contribution",
        heading: "A first contribution",
        blocks: [
          {
            kind: "list",
            items: [
              "Add a derivation test that pins a PDA against tests/fixtures/pda-seeds.json, so the two SDKs cannot drift apart.",
              "Cover a rejection path: a proof under the wrong key, a wrong-length input, or an alpha that does not bind the request account.",
              "Improve the error a throwing function raises, so a caller learns which milestone it is waiting on.",
              "Keep the Rust and TypeScript surfaces in step when one of them gains a helper.",
            ],
          },
        ],
      },
      {
        id: "checks",
        heading: "Checks that must pass",
        blocks: checksBlock([
          "The JavaScript SDK tests run from the same make check, so a TypeScript-only change still needs the Rust side to build.",
          "Alpha is built by nuvex-vrf and never read from instruction data: nuvex-vrf-v1, the request account pubkey, the job type, the input length, then the input bytes.",
          "Host proving uses the crate's prove feature and is not compiled into the programs.",
        ]),
      },
      {
        id: "closed-decisions",
        heading: "Decisions that are closed",
        blocks: [
          {
            kind: "list",
            items: [
              "submitRequest throwing is the current contract. Do not wire a transaction sender to make an example run.",
              "ADR 0004: the verifier is solana-ecvrf 0.0.1 with suite byte 0x03. The protocol does not invent a VRF.",
              "ADR 0006: buildCallbackInstruction returns bytes and does not send a transaction.",
              "RPC URLs, program ids and key paths are environment variables, never defaults in source.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "oracle-node",
    title: "The oracle node",
    scope: "Health-only process, no transactions",
    status: "in-development",
    lead: "The node binary exposes health and metrics. It does not submit transactions, which is also the mitigation listed against a lying RPC in the threat model.",
    meta: [
      { label: "Repository", value: "nuvex" },
      { label: "Path", value: "node/, cli/" },
      { label: "Language", value: "Rust" },
      { label: "Image", value: "nuvex-oracle-node:local" },
    ],
    source: { label: "node/ on GitHub", href: `${GITHUB_PROTOCOL_URL}/tree/main/node` },
    sections: [
      {
        id: "what-lives-here",
        heading: "What lives here",
        blocks: [
          {
            kind: "text",
            text: "node/ is the operator process and cli/ is the command entry. The CLI binary is nuvex, with the commands node, request, registry, staking and network. The network command reports that it is not implemented until Milestone 4.",
          },
          { kind: "panel", panel: "operator" },
          {
            kind: "text",
            text: "The node image is built from the protocol repository with docker build -f node/Dockerfile -t nuvex-oracle-node:local . Configuration comes from an environment file copied out of env/.",
          },
          { kind: "code", language: "bash", code: "cp env/.env.local.example .env.local" },
        ],
      },
      {
        id: "first-contribution",
        heading: "A first contribution",
        blocks: [
          {
            kind: "list",
            items: [
              "Add a metric or a health field that an operator actually needs to see, and a test that asserts its shape.",
              "Harden configuration parsing so a missing variable fails loudly instead of defaulting.",
              "Check that no log line can print key bytes, seed phrases or a payload a user marked confidential.",
              "Improve the message a CLI command prints when it is waiting on a later milestone.",
            ],
          },
        ],
      },
      {
        id: "checks",
        heading: "Checks that must pass",
        blocks: checksBlock([
          "Config debug output redacts RPC URLs and key paths. A change that unredacts them will be rejected.",
          "The node does not open a key file yet. NUVEX_NODE_KEY_PATH is a path, and the process receives a path or a handle, never a printed key.",
          "Do not commit a .env file. The example files contain empty secrets.",
        ]),
      },
      {
        id: "closed-decisions",
        heading: "Decisions that are closed",
        blocks: [
          {
            kind: "list",
            items: [
              "The node process does not submit transactions in this milestone. Adding a submitter is a milestone, not a patch.",
              "ADR 0003: fulfilment is first-come among eligible nodes. There is no assignment service to write.",
              "Key management keeps node identity, operator authority, treasury and security-fund authorities, and the upgrade multisig on separate keys.",
              "Pause is a flag on ProtocolConfig and is not implemented yet.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "documentation",
    title: "Documentation and decision records",
    scope: "The docs site and the seven ADRs",
    status: "live",
    lead: "The documentation repository describes the protocol as it is. A record is where a decision gets made; the prose only reports it.",
    meta: [
      { label: "Repository", value: "nuvex-docs" },
      { label: "Path", value: "architecture/adr/, oracle/, sdk/" },
      { label: "Language", value: "Markdown, TypeScript" },
      { label: "Records", value: "ADR 0001 to ADR 0007" },
    ],
    source: { label: "nuvex-docs on GitHub", href: GITHUB_DOCS_URL },
    sections: [
      {
        id: "what-lives-here",
        heading: "What lives here",
        blocks: [
          {
            kind: "text",
            text: "The tree covers introduction, oracle (vrf, data, price, callbacks, ai), architecture, verification, sdk (index, rust, typescript, cli, cpi), nodes (installation, configuration, staking, rewards, slashing), security (index, threat-model), developers (index, quick-start) and api. Decision records sit under architecture/adr/.",
          },
          {
            kind: "quote",
            text: "Do not document an instruction, fee, or job that the protocol repository has not implemented.",
            source: ".github/CONTRIBUTING.md, documentation repository",
          },
          {
            kind: "text",
            text: "Pages about a later milestone exist, and they say which milestone they are waiting on. A page that reads as if the feature shipped is a defect even when the design is right.",
          },
        ],
      },
      {
        id: "first-contribution",
        heading: "A first contribution",
        blocks: [
          {
            kind: "list",
            items: [
              "Correct a page that describes an instruction differently from the program that implements it.",
              "Add the milestone label to a page that promises behaviour the protocol does not have yet.",
              "Write the consequences section of a record that only states a decision.",
              "Record a rejected alternative that a reviewer had to explain twice in a pull request.",
            ],
          },
          {
            kind: "text",
            text: "A new decision record is numbered after ADR 0007 and needs a status line, a context, the decision, its consequences and the alternatives it rejects.",
          },
        ],
      },
      {
        id: "checks",
        heading: "Checks that must pass",
        blocks: [
          { kind: "text", text: "The documentation repository runs its own four commands:" },
          {
            kind: "code",
            language: "bash",
            code: "pnpm install\npnpm format:check\npnpm lint\npnpm typecheck",
          },
          {
            kind: "list",
            items: [
              "Every factual sentence has to be traceable to the protocol repository, not to a plan.",
              "A claim about a status belongs next to the status line of the record it came from.",
              "The development server for the documentation site listens on port 3001, not 3000.",
            ],
          },
        ],
      },
      {
        id: "closed-decisions",
        heading: "Decisions that are closed",
        blocks: [
          {
            kind: "list",
            items: [
              "Maintainers are not named in the repository, and documentation does not name them either.",
              "The read API, the indexer and the dashboard are not sources of protocol truth. Solana account state is authoritative.",
              "No audit has been commissioned. security/AUDIT_SCOPE.md is a scope, not a report.",
              "Nothing is deployed to mainnet, so no page may give a mainnet address.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "tests-and-tooling",
    title: "Tests and tooling",
    scope: "LiteSVM, adversarial checklist, make check",
    status: "live",
    lead: "The test tree is where a closed path is proven to stay closed. Most of the adversarial checklist is still a checklist.",
    meta: [
      { label: "Repository", value: "nuvex" },
      { label: "Path", value: "tests/, scripts/, env/" },
      { label: "Harness", value: "LiteSVM 0.17" },
      { label: "Entry point", value: "make check" },
    ],
    source: { label: "tests/ on GitHub", href: `${GITHUB_PROTOCOL_URL}/tree/main/tests` },
    sections: [
      {
        id: "what-lives-here",
        heading: "What lives here",
        blocks: [
          {
            kind: "text",
            text: "tests/ holds the LiteSVM program tests, the integration tests and the callback-consumer program that proves a callback can be received. tests/fixtures/pda-seeds.json pins the seeds that the programs and both SDKs share. tests/adversarial/README.md is the checklist drawn from the threat model.",
          },
          {
            kind: "quote",
            text: "The tests that exist today only assert that the closed paths stay closed.",
            source: "security/THREAT_MODEL.md",
          },
          {
            kind: "text",
            text: "That sentence is the opening for new work: each threat-model row names an outcome an attacker wants, and most of them have no test behind them yet.",
          },
        ],
      },
      {
        id: "first-contribution",
        heading: "A first contribution",
        blocks: [
          {
            kind: "list",
            items: [
              "Turn a row of the adversarial checklist into a test: a forged proof, a replayed alpha, a second fulfilment, a heartbeat outside the window.",
              "Assert a timing bound exactly: cancel requires slot < expires_slot and expire requires slot >= expires_slot.",
              "Test a callback that always fails, and check that the transaction reverts and the request is not left fulfilled.",
              "Make a flaky or slow test deterministic rather than deleting it.",
            ],
          },
        ],
      },
      {
        id: "checks",
        heading: "Checks that must pass",
        blocks: checksBlock([
          "Program tests load target/deploy/*.so, so run the build before the tests in a clean checkout.",
          "A test that passes because an instruction is missing is not a passing test. Say which absence it asserts.",
          "scripts/deploy-mainnet.sh must keep refusing to run.",
        ]),
      },
      {
        id: "closed-decisions",
        heading: "Decisions that are closed",
        blocks: [
          {
            kind: "list",
            items: [
              "Reward and challenge paths have no instructions, so there is nothing to test there yet.",
              "ADR 0003: the cooldown and the heartbeat window must each be in 1..=150_000, which is the existing request-timeout bound and not a chosen duration.",
              "A test must not relax an assertion to accommodate a new feature that has no decision record.",
              "Fixtures are the shared source for seeds. A test that hardcodes a seed is a regression.",
            ],
          },
        ],
      },
    ],
  },
];

export function findArea(slug: string): ContributionArea | undefined {
  return contributionAreas.find((area) => area.slug === slug);
}
