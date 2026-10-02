import { DOCS_URL } from "@/lib/constants";

import type { DocSection } from "./content";
import { media } from "./media";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** The milestone the post describes. The repository records no calendar dates. */
  milestone: string;
  author: string;
  category: string;
  image?: { src: string; alt: string; credit?: { label: string; href: string } };
  sections: DocSection[];
};

const photo = {
  weakness: media.nodes,
  fee: media.matrix,
  callback: media.chip,
  eligibility: media.racks,
  vrf: media.aurora,
  milestone: media.earth,
} as const;

const AUTHOR = "Nuvex maintainers";

export const blogPosts: BlogPost[] = [
  {
    slug: "the-multi-key-weakness",
    title: "The multi-key weakness the README admits",
    excerpt:
      "An operator who funds several node keys can choose which of those outputs to submit. The eligibility predicate does not close that, each extra key only costs the configured minimum stake, and a minimum of zero resists nothing. Here is what still holds, and what would have to change.",
    milestone: "Milestone 3",
    author: AUTHOR,
    category: "Security",
    image: photo.weakness,
    sections: [
      {
        id: "the-admission",
        heading: "The admission, in the project's own words",
        blocks: [
          {
            kind: "text",
            text: "The status paragraph of the protocol README carries a limitation rather than hiding it in an issue tracker. It is the first thing a reader of this post should see, unedited.",
          },
          {
            kind: "quote",
            text: "An operator who funds several keys can still choose among those outputs. The cost of each extra key is the configured minimum stake. A minimum of zero does not resist that.",
            source: "Protocol README, Status",
          },
          {
            kind: "text",
            text: "A node registers a VRF public key, and one key produces exactly one output for one alpha. Nothing stops the same operator from registering a second key, a third and a fourth before a request exists, proving the output under each of them, and submitting whichever output it prefers. Every one of those proofs verifies, because every one of them is a correct proof under a registered key.",
          },
        ],
      },
      {
        id: "why-the-program-cannot-draw",
        heading: "Why the program cannot simply draw a winner",
        blocks: [
          {
            kind: "text",
            text: "The obvious fix is to pick the fulfiller rather than let it pick itself. ADR 0003 explains why that instruction does not exist yet: there is no on-chain list of nodes, so a program has nothing to draw from, and a requester-chosen seed could be ground until a preferred key wins.",
          },
          {
            kind: "quote",
            text: "There is no on-chain list of nodes. A program cannot draw a winner from every registered key. A seed chosen by the requester could be ground until a preferred key wins. This milestone does not add that draw.",
            source: "ADR 0003: Node selection",
          },
          {
            kind: "text",
            text: "A weighted draw is also not a neutral piece of engineering. Weighting stake linearly favours capital and weighting reputation favours incumbents, so the ADR records the choice as an economic policy that has not been made. Reputation stays a plain counter and is not a weight.",
          },
          { kind: "panel", panel: "nodes" },
        ],
      },
      {
        id: "the-price-of-an-identity",
        heading: "The price of another identity",
        blocks: [
          {
            kind: "text",
            text: "The only cost of an extra key is the deposit that key has to lock. The registry authority sets that minimum, and zero is an allowed value, which means the configuration can switch the defence off entirely. The threat model says so in the row for a Sybil cluster.",
          },
          {
            kind: "quote",
            text: "Each identity must lock min_stake. A minimum of zero does not stop the choice. See ADR 0003.",
            source: "security/THREAT_MODEL.md, Sybil cluster",
          },
          { kind: "panel", panel: "stake" },
        ],
      },
      {
        id: "what-still-holds",
        heading: "What still holds",
        blocks: [
          {
            kind: "text",
            text: "The weakness is a bias on which eligible output reaches the chain first. It is not a licence to invent an output, and the checks around it are implemented and tested.",
          },
          {
            kind: "list",
            items: [
              "A proof is bound to one request: the alpha is built from the request account, the job type and the input, and is never read from instruction data.",
              "A node account must have been created at a slot strictly earlier than the request, so a key cannot be added after seeing one.",
              "The VRF public key is set at registration and update_node cannot replace it.",
              "The capability mask must include the VRF bit.",
              "A forged proof is rejected by the verifier, and the tests cover a late key, a missing capability bit and a forged proof.",
            ],
          },
          {
            kind: "text",
            text: "The verification ADR draws the line in one sentence: uniqueness is something a consumer may rely on, and unbiasedness against a multi-key operator is not.",
          },
          {
            kind: "quote",
            text: "A consumer cannot rely on the output being unbiased against an operator who registered many keys before the request.",
            source: "ADR 0004: Verification model",
          },
        ],
      },
      {
        id: "what-would-close-it",
        heading: "What would close it",
        blocks: [
          {
            kind: "text",
            text: "Closing the gap needs an on-chain index of nodes to draw from, a weight that someone has to justify, and a seed that a requester cannot grind. None of those three exist in this tree, so the honest position is to publish the limitation next to the capability instead of describing the randomness as unbiased.",
          },
          {
            kind: "text",
            text: "Nothing is deployed to mainnet while that stands: scripts/deploy-mainnet.sh exits before any transaction, and no independent audit has been commissioned. Milestone 4 is the indexer, PostgreSQL, the read API and dashboard reads of chain state, which make the assigned node, stake and heartbeat on each request easy to inspect from outside the chain.",
          },
        ],
      },
    ],
  },
  {
    slug: "max-fee-is-a-ceiling",
    title: "What max_fee does, and what it does not do",
    excerpt:
      "Every request carries a max_fee. In Milestone 3 that number is written to the request account and nothing is ever taken from the requester. ADR 0005 splits the fee into four roles and deliberately leaves every basis point unset.",
    milestone: "Milestone 3",
    author: AUTHOR,
    category: "Economics",
    image: photo.fee,
    sections: [
      {
        id: "stored-never-charged",
        heading: "Stored, never charged",
        blocks: [
          {
            kind: "quote",
            text: "max_fee is stored and never charged.",
            source: "Protocol README, Status",
          },
          {
            kind: "text",
            text: "A request account records the job type, the input, the constraints, the optional callback and the fee ceiling the requester was willing to accept. Fulfilment verifies a proof, writes the output and performs the callback. No lamports move for the work, because no instruction transfers a request fee.",
          },
          { kind: "panel", panel: "request" },
        ],
      },
      {
        id: "a-ceiling-not-a-price",
        heading: "A ceiling, not a price",
        blocks: [
          {
            kind: "text",
            text: "The field is a limit the requester sets, not a quote the protocol returns. Once fees are configured, a request whose ceiling sits below the configured fee fails at creation rather than being charged the difference.",
          },
          {
            kind: "quote",
            text: "max_fee is a requester-supplied ceiling. If the configured fee is above the ceiling, request creation fails. The requester is not charged the ceiling automatically.",
            source: "ADR 0005: Fee model",
          },
        ],
      },
      {
        id: "four-roles-no-numbers",
        heading: "Four roles, no numbers",
        blocks: [
          {
            kind: "text",
            text: "ADR 0005 is accepted as a split of roles. The actual fee, when one is charged, divides between four destinations:",
          },
          {
            kind: "list",
            items: ["node reward", "verifier reward", "protocol treasury", "security fund"],
          },
          {
            kind: "text",
            text: "The shares live on ProtocolConfig and JobConfig as basis points rather than as constants in program source, and the on-chain check requires them to sum to 10,000 when they are written. Milestone 3 does not pick those basis points, does not transfer request fees, and has no claim_reward instruction. Arithmetic on lamports is checked.",
          },
        ],
      },
      {
        id: "stake-is-not-a-fee",
        heading: "Stake is not a fee",
        blocks: [
          {
            kind: "text",
            text: "The lamports a node locks are a separate mechanism from anything a requester pays. Stake sits on the node account, has to meet the registry minimum before the node can fulfil, waits out a cooldown on the way out, and can be slashed by the configured authority. None of that is funded by max_fee.",
          },
          { kind: "panel", panel: "stake" },
        ],
      },
      {
        id: "separate-authorities",
        heading: "Separate authorities for separate money",
        blocks: [
          {
            kind: "text",
            text: "The treasury, the security fund and the reward destinations are distinct authorities, set at initialization and empty until then. The key management policy keeps node identity, operator authority, treasury and security-fund authorities on separate keys, so one compromised key cannot drain every role.",
          },
        ],
      },
      {
        id: "why-not-pick-numbers",
        heading: "Why we do not publish a split yet",
        blocks: [
          {
            kind: "text",
            text: "Writing a plausible-looking split into the source would freeze an economic policy into a binary and make the website quote a number nobody has decided. The ADR rejects exactly that.",
          },
          {
            kind: "quote",
            text: "Rejected: a fixed 70/20/5/5 split in source. The specification lists the roles and does not list the shares.",
            source: "ADR 0005: Fee model",
          },
          {
            kind: "text",
            text: "Until a record names basis points, every fee figure on this site reads coming soon. Fees stay unset through Milestone 4.",
          },
        ],
      },
    ],
  },
  {
    slug: "callback-no-accounts",
    title: "The callback that receives no accounts",
    excerpt:
      "When a request sets a callback, oracle core performs one CPI into that program with the 64-byte output and zero accounts. ADR 0006 chose the empty account list on purpose, because a fulfiller that can pass accounts chooses what the callee touches.",
    milestone: "Milestone 2",
    author: AUTHOR,
    category: "Callbacks",
    image: photo.callback,
    sections: [
      {
        id: "what-the-request-stores",
        heading: "What the request stores",
        blocks: [
          {
            kind: "text",
            text: "A request holds a callback_program and at most 128 bytes of callback_data. The default pubkey means there is no callback, and fulfilment simply writes the output. Because Milestone 2 passes zero accounts, there is no account list to hash and store on the request.",
          },
          {
            kind: "quote",
            text: "A fulfiller cannot choose the callee's accounts.",
            source: "ADR 0006: Callback model",
          },
        ],
      },
      {
        id: "the-cpi",
        heading: "The CPI, byte for byte",
        blocks: [
          {
            kind: "text",
            text: "On fulfilment, oracle core writes the CallbackExecuted status and then performs one cross-program invocation. The instruction is named callback, and its data is fully determined by the request and the verified output.",
          },
          {
            kind: "code",
            language: "text",
            code: `callback instruction data
  [0..8)    Anchor discriminator of "callback"
  [8..72)   VRF output, 64 bytes
  [72..76)  callback_data length, u32 little endian
  [76..)    the stored callback_data bytes

accounts: none. The request account is not included.`,
          },
          {
            kind: "text",
            text: "The TypeScript SDK can build those bytes with buildCallbackInstruction, which returns the byte array and does not send a transaction. On the receiving side the Anchor handler takes the output and the data, and its accounts struct is empty:",
          },
          {
            kind: "code",
            language: "rust",
            code: `pub fn callback(_ctx: Context<Callback>, output: [u8; 64], data: Vec<u8>) -> Result<()> {
    msg!("nuvex-callback {}", output[0]);
    Ok(())
}

#[derive(Accounts)]
pub struct Callback {}`,
          },
          {
            kind: "text",
            text: "That is the test consumer in tests/callback-consumer, which exists so the layout is asserted against the shared writer rather than described in prose. It is not a protocol program.",
          },
        ],
      },
      {
        id: "why-zero-accounts",
        heading: "Why the account list is empty",
        blocks: [
          {
            kind: "text",
            text: "The rejected alternative explains the decision better than the decision does. If the fulfiller could forward its own remaining accounts, it would be choosing which accounts the callee program sees, which turns a callback into an instruction the fulfiller controls.",
          },
          {
            kind: "quote",
            text: "Rejected: forwarding remaining_accounts from the fulfiller. The fulfiller would choose the callee's accounts.",
            source: "ADR 0006: Callback model",
          },
          {
            kind: "text",
            text: "Oracle accounts are not writable by the callee either, so a callback cannot reach back into protocol state. Account-bearing callbacks are out of scope and would need their own record.",
          },
        ],
      },
      {
        id: "failure-reverts",
        heading: "Failure is a revert, not a status",
        blocks: [
          {
            kind: "text",
            text: "If the callback returns an error, the whole transaction reverts, so the request is not left marked fulfilled with nothing delivered. There is no callback-failed status and no retry instruction, and the ADR names the reason: a retry path lets a fulfiller burn transactions on a callee that always fails.",
          },
          { kind: "panel", panel: "verify" },
        ],
      },
      {
        id: "building-against-it",
        heading: "Building against an empty account list",
        blocks: [
          {
            kind: "text",
            text: "A handler with no accounts cannot write state, so the callback is a notification, not a place to settle. The output is on-chain regardless of whether a callback is set, which is where a consumer reads it.",
          },
          {
            kind: "list",
            items: [
              "Keep the callback handler cheap and total: a failure reverts the fulfiller's transaction.",
              "Use the 128 bytes of callback_data to carry the identifier your program needs to recognise the request.",
              'Read the VrfResult account under seeds ["verification", request] for the stored output, proof and VRF public key. The request account itself keeps the status and the assigned node, not the output.',
              "Settle in your own instruction, signed by whoever is allowed to settle, rather than inside the callback.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "node-eligibility",
    title: "Why a node is eligible, and why that is not a lottery",
    excerpt:
      "ADR 0003 replaced the idea of an assignment with a predicate: active status, stake at or above the minimum, a heartbeat inside the window, and a key registered before the request. Whoever meets it first wins the race, and nothing in this repository submits that transaction yet.",
    milestone: "Milestone 3",
    author: AUTHOR,
    category: "Network",
    image: photo.eligibility,
    sections: [
      {
        id: "the-predicate",
        heading: "The predicate, check by check",
        blocks: [
          {
            kind: "text",
            text: "Selection has to be a function of public inputs, because a private backend that picks a fulfiller cannot be audited from the chain. In Milestone 3 that function is an eligibility test inside fulfill, and every condition is read from accounts.",
          },
          {
            kind: "list",
            items: [
              "The requester did not name the fulfiller, and the node authority signs.",
              "The node account was created at a slot strictly earlier than the request.",
              "The VRF public key was set at registration, is not all zeros, and update_node cannot replace it.",
              "The capability mask includes the VRF bit, and the proof verifies under the stored key.",
              "Node status is Active, and stake is at or above min_stake.",
              "last_heartbeat is non-zero and the current slot is inside last_heartbeat plus heartbeat_timeout_slots.",
              "The registry's unstake_cooldown_slots and heartbeat_timeout_slots are both non-zero.",
            ],
          },
          { kind: "panel", panel: "heartbeat" },
        ],
      },
      {
        id: "first-come",
        heading: "First come, not weighted",
        blocks: [
          {
            kind: "text",
            text: "There is no assignment step and no draw. Among the nodes that satisfy the predicate, the first transaction to land wins, and a second fulfilment of the same request is rejected.",
          },
          {
            kind: "quote",
            text: "VRF fulfillment is first-come among nodes that meet the ADR 0003 predicate. There is no weighted lottery.",
            source: "Protocol README, Open decisions",
          },
          {
            kind: "text",
            text: "Reputation exists as a counter, not as a weight. It increases by one through note_fulfillment, which only the oracle-core protocol PDA may call, and a slash sets it to zero.",
          },
        ],
      },
      {
        id: "what-fulfil-writes",
        heading: "What fulfilment records",
        blocks: [
          {
            kind: "text",
            text: "The values the predicate checked are written onto the request as assigned_node, assigned_stake and assigned_heartbeat. They are the numbers at the moment of the check rather than a balance someone can read later, which is what makes the decision recomputable by an outside observer.",
          },
          { kind: "panel", panel: "request" },
        ],
      },
      {
        id: "statuses-and-cooldown",
        heading: "Three statuses and one cooldown",
        blocks: [
          {
            kind: "list",
            items: [
              "Registered: the stake may sit below the minimum, and the node can neither fulfil nor heartbeat.",
              "Active: a deposit reached min_stake.",
              "Unstaking: the whole stake stays locked until the cooldown ends, and heartbeat and fulfil are rejected.",
            ],
          },
          {
            kind: "text",
            text: "Withdraw returns the accounted stake after the cooldown and sets the node back to Registered. A node cannot deposit while unstaking. The cooldown and the heartbeat window are registry fields that must each sit between 1 and 150,000 slots, which is the existing request-timeout safety bound rather than a chosen economic duration. Slash takes an amount named by the slash authority, during the cooldown if need be, and there is no automatic percentage.",
          },
        ],
      },
      {
        id: "nothing-submits-yet",
        heading: "Nothing in this tree submits a fulfilment",
        blocks: [
          {
            kind: "text",
            text: "The predicate is implemented on-chain, and the off-chain half that would race for it is not. The node process runs a health and metrics server on /health, /live, /ready and /metrics. It does not load signing keys, connect to an RPC or fulfil jobs.",
          },
          {
            kind: "quote",
            text: "A node process in this repository still does not submit transactions.",
            source: "ADR 0003: Node selection, Consequences",
          },
          {
            kind: "text",
            text: "The same holds one layer up: the Rust SDK can prove a VRF output on the host, the TypeScript SDK's submitRequest throws on purpose, and the CLI reports the milestone each command is waiting on. The threat model counts that as the current mitigation for a node that trusts a lying RPC, which is an accurate description of a gap, not a feature.",
          },
          { kind: "panel", panel: "operator" },
        ],
      },
      {
        id: "the-part-this-does-not-fix",
        heading: "The part a predicate cannot fix",
        blocks: [
          {
            kind: "text",
            text: "Eligibility says who may submit. It does not say whose output gets chosen when one operator controls several eligible keys, because every proof under every one of those keys is valid.",
          },
          {
            kind: "quote",
            text: "An operator who funds several keys can still submit the output they prefer.",
            source: "ADR 0003: Node selection",
          },
          {
            kind: "text",
            text: "The cost of another identity is another deposit of at least min_stake, the registry authority sets that number, and zero is allowed. Stake-weighted assignment would need an on-chain node index that does not exist and a weight that nobody has justified, so the limitation is published rather than closed.",
          },
        ],
      },
    ],
  },
  {
    slug: "verifying-vrf-on-chain",
    title: "How a VRF proof is verified on-chain",
    excerpt:
      "Milestone 3 verifies randomness with solana-ecvrf 0.0.1: RFC 9381 ECVRF-EDWARDS25519-SHA512-TAI, an 80-byte proof and a 64-byte output, checked inside the verification program. No audit report of that crate was found, and ADR 0004 records the absence.",
    milestone: "Milestone 3",
    author: AUTHOR,
    category: "Verification",
    image: photo.vrf,
    sections: [
      {
        id: "the-verifier",
        heading: "The verifier",
        blocks: [
          {
            kind: "text",
            text: "VRF is the first job type that needs a proof, and the protocol does not invent one. Verification is the solana-ecvrf crate at version 0.0.1, with the suite named by RFC 9381.",
          },
          {
            kind: "list",
            items: [
              "Algorithm: ECVRF-EDWARDS25519-SHA512-TAI, RFC 9381, suite byte 0x03.",
              "Public key: a 32-byte compressed Ed25519 point.",
              "Proof: 80 bytes, laid out as Gamma (32) || c (16) || s (32).",
              "Output: the 64-byte beta_string.",
            ],
          },
          {
            kind: "text",
            text: "On-chain hashing uses the sol_sha512 syscall from SIMD-0512, so a cluster where that feature is inactive cannot run the verifier at all. Host proving comes from the crate's prove feature and is not compiled into the programs.",
          },
          { kind: "panel", panel: "verify" },
        ],
      },
      {
        id: "binding-the-alpha",
        heading: "Binding the proof to one request",
        blocks: [
          {
            kind: "text",
            text: "A proof is only meaningful if it is tied to the question that was asked. The alpha string is built by the nuvex-vrf crate from account state and the request's own fields, and is never taken from instruction data.",
          },
          {
            kind: "code",
            language: "text",
            code: `alpha = "nuvex-vrf-v1"
      || request account pubkey   (32 bytes)
      || job type                 (u8)
      || input length             (u16, little endian)
      || input bytes`,
          },
          {
            kind: "text",
            text: "Because the request account's address is inside the alpha, a proof produced for one request cannot be replayed into another, and the status leaving Pending stops the same request being fulfilled twice.",
          },
        ],
      },
      {
        id: "where-the-result-lives",
        heading: "Where the result lives",
        blocks: [
          {
            kind: "text",
            text: 'The verification program owns a VrfResult account under the seeds ["verification", request], holding the request, the node, the VRF public key, the output and the proof. Oracle core creates it by CPI and the protocol PDA is the required signer, which is what prevents a user from submitting an alpha that is not bound to a real request. A forged proof is not a protocol result, and the tests keep rejecting one.',
          },
          { kind: "panel", panel: "programs" },
        ],
      },
      {
        id: "the-missing-audit",
        heading: "The missing audit",
        blocks: [
          {
            kind: "text",
            text: "The crate documents the RFC Appendix B.3 test vectors and its own Mollusk measurements of roughly 10,000 compute units. Measurements are not an audit, and this repository does not present them as one.",
          },
          {
            kind: "quote",
            text: "The verifier is solana-ecvrf 0.0.1. No audit report was found. ADR 0004 records that absence.",
            source: "Protocol README, Open decisions",
          },
          {
            kind: "text",
            text: "Nothing has been audited at the protocol level either. security/AUDIT_SCOPE.md is the scope a future auditor would be asked to cover, and it says plainly that no audit has been commissioned and that the file is not a report.",
          },
        ],
      },
      {
        id: "what-you-can-rely-on",
        heading: "What a consumer can and cannot rely on",
        blocks: [
          {
            kind: "text",
            text: "One key has one output for one alpha, and a consumer can build on that uniqueness. The property a consumer does not get is independence from an operator who registered several keys before the request existed, which is the limitation recorded in ADR 0003.",
          },
          {
            kind: "quote",
            text: "Rejected: a hand-rolled hash of a node signature presented as a VRF. It is not a VRF.",
            source: "ADR 0004: Verification model",
          },
          {
            kind: "text",
            text: "Price, data, compute and inference verifiers do not exist. The verification ADR sketches what each would need, and each sketch belongs to a later milestone.",
          },
        ],
      },
      {
        id: "proving-on-the-host",
        heading: "Proving on the host",
        blocks: [
          {
            kind: "text",
            text: "The Rust SDK can produce a proof locally, which is how the tests exercise the verifier. The secret stays with the caller, and the function returns the public key, the output and the proof together.",
          },
          {
            kind: "code",
            language: "rust",
            code: `use nuvex_job_types::JobType;
use nuvex_sdk::prove_vrf;

let proof = prove_vrf(&secret, &request, JobType::Vrf, &input)?;
assert_eq!(proof.proof.len(), 80);
assert_eq!(proof.output.len(), 64);`,
          },
          {
            kind: "text",
            text: "Proving is not submitting. The SDKs derive addresses and build bytes, and they still refuse to send a transaction.",
          },
        ],
      },
    ],
  },
  {
    slug: "milestone-0",
    title: "Milestone 0: workspace initialization",
    excerpt:
      "The first milestone produced a workspace rather than a protocol: program crates, shared libraries, a health-only node, SDK skeletons and documentation. VRF algorithm selection and the request transition graph were recorded as open decisions instead of being guessed.",
    milestone: "Milestone 0",
    author: AUTHOR,
    category: "Milestones",
    image: photo.milestone,
    sections: [
      {
        id: "what-landed",
        heading: "What landed",
        blocks: [
          {
            kind: "text",
            text: "Milestone 0 set up the tree every later milestone fills in: the program crates, the shared libraries, the node skeleton, the API and indexer schema, both SDKs and the documentation. Since then the website, the documentation and the off-chain services have moved into repositories of their own, and this one is the protocol.",
          },
          {
            kind: "list",
            items: [
              "programs/ — oracle-core, oracle-registry and verification, as three Anchor programs.",
              "crates/ — shared types, PDA seeds and the cryptography boundary.",
              "sdk/rust and sdk/js — PDA helpers, with no instruction submission.",
              "cli/ — the nuvex binary with node, request, registry, staking and network commands.",
              "node/ — a health-only oracle node process.",
              "tests/ — LiteSVM, integration and the callback consumer.",
              "env/ and security/ — example environment files, the threat model and the operational policy.",
            ],
          },
          { kind: "panel", panel: "programs" },
        ],
      },
      {
        id: "a-job-agnostic-request",
        heading: "A job-agnostic request",
        blocks: [
          {
            kind: "text",
            text: "The shape of the protocol was fixed before any handler existed. A request carries a job type, an input, constraints and a callback, so a new job family means a new verifier and an off-chain executor rather than a new core program. There is no request_randomness entrypoint.",
          },
          {
            kind: "quote",
            text: "Job kinds are Vrf, Price, Data, Compute, and AiInference. Only the kind identifier exists today.",
            source: "ADR 0001: Core architecture",
          },
        ],
      },
      {
        id: "what-did-not-land",
        heading: "What did not land",
        blocks: [
          {
            kind: "text",
            text: "At Milestone 0 there were no instruction handlers at all. The audit scope document is blunt about what reviewing that revision would have achieved.",
          },
          {
            kind: "quote",
            text: "Milestone 0 has no instruction handlers. An audit of this revision would only confirm that absence.",
            source: "security/AUDIT_SCOPE.md",
          },
          {
            kind: "text",
            text: "The same file asks for the audit to be scheduled after VRF verification and callbacks exist, and again before mainnet. The deployment script for mainnet exits before any transaction.",
          },
        ],
      },
      {
        id: "open-decisions",
        heading: "Decisions left open on purpose",
        blocks: [
          {
            kind: "text",
            text: "Two questions were left unanswered rather than filled in with something plausible: which VRF construction to verify, and which request transitions should exist. Both became decision records, and both were answered later by evidence rather than by convenience.",
          },
          {
            kind: "quote",
            text: "These are blocked on purpose. The next milestone must not invent them in a pull request that only wants the code to compile.",
            source: "Protocol README, Open decisions",
          },
          {
            kind: "text",
            text: "The transition graph that followed allows cancel and expire, and later the single VRF fulfilment edge. Every challenge, reject and fail edge stays forbidden until a record designs it.",
          },
        ],
      },
      {
        id: "checking-the-tree",
        heading: "Checking the tree yourself",
        blocks: [
          {
            kind: "text",
            text: "One command runs formatting, Clippy, cargo build-sbf for the three programs and the test callback consumer, the Rust tests and the JavaScript SDK tests. The program tests load the built objects from target/deploy, because verification calls sol_sha512.",
          },
          {
            kind: "code",
            language: "bash",
            code: `make check

# the node image is built from the same tree
docker build -f node/Dockerfile -t nuvex-oracle-node:local .

# RPC URLs, program ids and key paths are variables, never defaults in source
cp env/.env.local.example .env.local`,
          },
        ],
      },
    ],
  },
];

export const featuredPost = blogPosts[0];
export const remainingPosts = blogPosts.slice(1);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function otherBlogPosts(slug: string, limit = 2): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== slug).slice(0, limit);
}

export const blogPage = {
  tag: { strong: "Notes", rest: "from the repository" },
  title: "What we built,",
  accent: "and what we left undecided",
  lead: "Posts about the code that exists in the protocol repository and the decisions recorded next to it. Every claim here points at a README, an ADR or a security document.",
  cta: {
    title: "Read the records",
    accent: "behind these posts",
    action: { label: "Read the docs", href: DOCS_URL },
  },
};
