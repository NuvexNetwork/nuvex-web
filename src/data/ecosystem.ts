import { DOCS_URL } from "@/lib/constants";

import type { DocSection } from "./content";
import { media } from "./media";
import type { CapabilityStatus } from "./protocol";

export type EcosystemEntry = {
  slug: string;
  /** Never a partnership. These are worked examples and concepts only. */
  label: "Example" | "Concept";
  title: string;
  lead: string;
  status: CapabilityStatus;
  image: string;
  alt: string;
  credit: { label: string; href: string };
  /** Rows for the left column of the case template. */
  meta: { label: string; value: string }[];
  sections: DocSection[];
};

export const ecosystemEntries: EcosystemEntry[] = [
  {
    slug: "verifiable-draw",
    label: "Example",
    title: "A draw anyone can re-check against the proof",
    lead: "A raffle, a loot roll or a prize draw that settles on-chain, where a participant can check that the winning number came from an ECVRF proof instead of from whoever ran the draw.",
    status: "live",
    image: media.galaxy.src,
    alt: media.galaxy.alt,
    credit: media.galaxy.credit,
    meta: [
      { label: "Label", value: "Example" },
      { label: "Job type", value: "Vrf" },
      { label: "Nuvex path", value: "On-chain proof verification, live" },
      { label: "Deployments", value: "None. Nobody is running this." },
    ],
    sections: [
      {
        id: "what-the-application-needs",
        heading: "What the application needs",
        blocks: [
          {
            kind: "text",
            text: "A draw has one hard requirement: the number that picked the winner must be checkable afterwards by somebody who does not trust the organiser. Everything else — tickets, entry windows, prize accounting — is ordinary program state.",
          },
          {
            kind: "list",
            items: [
              "One random value per draw, bound to that draw and to nothing else.",
              "Evidence that survives the draw, so a loser can re-check it later.",
              "A number nobody could have known before the draw closed.",
              "A path that does not depend on an operator's honesty for the result to be auditable.",
            ],
          },
        ],
      },
      {
        id: "what-exists-today",
        heading: "What Nuvex provides today",
        blocks: [
          {
            kind: "text",
            text: "This is the one job family that is live in the programs. A request carries the job type, the input, the constraints and an optional callback. Fulfilment verifies an RFC 9381 ECVRF proof — ECVRF-EDWARDS25519-SHA512-TAI, 80-byte proof, 64-byte output — inside the verification program before the output is written.",
          },
          {
            kind: "list",
            items: [
              "The alpha is built from the request account, the job type and the input, so a proof cannot be moved to another draw.",
              "Only an eligible node may fulfil: active, stake at or above the configured minimum, heartbeat inside the configured window, and a VRF key registered before the request.",
              "The result is stored in a VrfResult account owned by the verification program, which is what a participant re-checks against.",
              "A callback, when set, receives the 64-byte output and no accounts.",
            ],
          },
          { kind: "panel", panel: "verify" },
        ],
      },
      {
        id: "what-does-not-exist",
        heading: "What does not exist",
        blocks: [
          {
            kind: "list",
            items: [
              "Nothing in the repository sends the transaction: the node process is health-only, the TypeScript SDK's submitRequest throws on purpose, and the CLI reports the milestone it waits on.",
              "No fee moves. max_fee is stored and never charged, and ADR 0005 sets no basis points.",
              "No program is deployed to mainnet, and scripts/deploy-mainnet.sh exits before any transaction.",
              "No indexer or read API yet, so draw history has to be read straight from accounts until Milestone 4.",
            ],
          },
        ],
      },
      {
        id: "what-a-developer-builds",
        heading: "What a developer would have to build",
        blocks: [
          {
            kind: "text",
            text: "The verifiable part is the part Nuvex covers. The draw itself is the developer's program, and in the current milestone so is every transaction that touches the protocol.",
          },
          {
            kind: "list",
            items: [
              "The draw program: tickets, entry window, mapping a 64-byte output to a winner, prize payout.",
              "The client or crank that actually submits the request, using the SDK's address derivation rather than its submit path.",
              "A callback handler with an empty accounts struct if it wants the notification, plus its own settlement instruction, because a callback cannot write state.",
              "The checker: a page or script that reads the stored output and proof and re-runs the verification off-chain.",
            ],
          },
        ],
      },
      {
        id: "what-to-disclose",
        heading: "What this example would have to disclose",
        blocks: [
          {
            kind: "text",
            text: "One key has one output for one alpha, and a consumer can rely on that uniqueness. A consumer cannot rely on the output being unbiased against an operator who funded several keys before the request, because each of those proofs is valid and the operator picks which one to submit. Each extra key costs the configured minimum stake, and a minimum of zero does not resist it.",
          },
          {
            kind: "quote",
            text: "An operator who funds several keys can still choose among those outputs. The cost of each extra key is the configured minimum stake. A minimum of zero does not resist that.",
            source: "Protocol README, Status",
          },
          {
            kind: "text",
            text: "A draw with real money on it should say that in its own terms, and should not be run by someone who also operates the nodes.",
          },
        ],
      },
    ],
  },
  {
    slug: "fair-ordering",
    label: "Concept",
    title: "Fair ordering and allocation for a prediction market",
    lead: "Deciding which of many equal claims gets filled first — an allocation queue, a tie-break between identical bids, a shuffled allowlist — without a trusted party running the shuffle.",
    status: "planned",
    image: media.stars.src,
    alt: media.stars.alt,
    credit: media.stars.credit,
    meta: [
      { label: "Label", value: "Concept" },
      { label: "Job types", value: "Vrf today, Price and Data planned" },
      { label: "Nuvex path", value: "Partly live, partly undesigned" },
      { label: "Deployments", value: "None. This is a sketch." },
    ],
    sections: [
      {
        id: "what-the-application-needs",
        heading: "What the application needs",
        blocks: [
          {
            kind: "text",
            text: "A prediction market has two separate fairness problems. One is ordering: when several claims are equivalent, something has to break the tie without favouring an insider. The other is settlement: the market has to learn what actually happened.",
          },
          {
            kind: "list",
            items: [
              "A tie-break or shuffle that the market operator cannot steer.",
              "A permutation that can be recomputed by anyone from published values.",
              "A settlement source for the outcome, with a bound on how stale it may be.",
              "Resistance to grinding: nobody should be able to retry until the ordering suits them.",
            ],
          },
        ],
      },
      {
        id: "what-exists-today",
        heading: "What Nuvex provides today",
        blocks: [
          {
            kind: "text",
            text: "The ordering half can lean on the live VRF path: a verified 64-byte output, bound to one request, is enough to seed a permutation that any observer can recompute. The request also records who fulfilled it, with the stake and heartbeat values that were checked, as assigned_node, assigned_stake and assigned_heartbeat.",
          },
          { kind: "panel", panel: "request" },
          {
            kind: "text",
            text: "Fulfilment is first-come among nodes that meet the ADR 0003 predicate. There is no weighted lottery and no assigned set, so nothing about the ordering depends on a private backend choosing a fulfiller.",
          },
        ],
      },
      {
        id: "what-does-not-exist",
        heading: "What does not exist",
        blocks: [
          {
            kind: "list",
            items: [
              "Settlement data. Price and Data are reserved job identifiers with no verifier, no aggregation rule and no freshness policy; ADR 0004 places both at Milestone 5.",
              "Any notion of a sequencer or ordering service inside the protocol. Nuvex returns a value; the ordering is the caller's.",
              "Commit and reveal, which ADR 0004 places at Milestone 6 for deterministic compute.",
              "Fees and rewards, so there is no economic reason for a node to race for this work yet.",
            ],
          },
        ],
      },
      {
        id: "what-a-developer-builds",
        heading: "What a developer would have to build",
        blocks: [
          {
            kind: "list",
            items: [
              "The permutation itself, derived deterministically from the 64-byte output, plus the published method so anyone can repeat it.",
              "A grinding-resistant request policy: who may open the request, when, and with which input.",
              "The whole settlement path, from an outside source to on-chain state, since no data job runs.",
              "Transaction submission, which the SDKs still refuse to do.",
            ],
          },
        ],
      },
      {
        id: "honest-status",
        heading: "Honest status",
        blocks: [
          {
            kind: "text",
            text: "Half of this concept maps onto something implemented and half of it maps onto a reserved job identifier. It is marked planned for that reason: a market built on it today would be using verifiable randomness and its own settlement, not a Nuvex data feed.",
          },
          {
            kind: "quote",
            text: "Job kinds are Vrf, Price, Data, Compute, and AiInference. Only the kind identifier exists today.",
            source: "ADR 0001: Core architecture",
          },
        ],
      },
    ],
  },
  {
    slug: "price-feed-consumer",
    label: "Concept",
    title: "A program that consumes a price feed",
    lead: "A lending market or a perpetuals program wants a fresh price and a bound on staleness. Nuvex reserves the job type and the request shape, and has no price verifier at all.",
    status: "planned",
    image: media.dc.src,
    alt: media.dc.alt,
    credit: media.dc.credit,
    meta: [
      { label: "Label", value: "Concept" },
      { label: "Job type", value: "Price, planned" },
      { label: "Nuvex path", value: "Reserved identifier only" },
      { label: "Deployments", value: "None. No price feed exists." },
    ],
    sections: [
      {
        id: "what-the-application-needs",
        heading: "What the application needs",
        blocks: [
          {
            kind: "text",
            text: "A price consumer cares less about where a number came from than about whether it is recent, whether one source can move it, and what the program should do when the feed goes quiet.",
          },
          {
            kind: "list",
            items: [
              "A price with a timestamp or slot, and a rule for rejecting it when it is too old.",
              "Aggregation across sources, so one lying or broken source cannot set the number.",
              "A confidence or deviation bound the program can act on.",
              "Defined behaviour when the feed is unavailable, rather than an undefined liquidation.",
            ],
          },
        ],
      },
      {
        id: "what-exists-today",
        heading: "What Nuvex provides today",
        blocks: [
          {
            kind: "text",
            text: "The reusable part is the request lifecycle, not the data. Price is one of the five job identifiers, a request can already carry an input, constraints and a callback, and the node registry already enforces a heartbeat window on whoever would fulfil the work.",
          },
          { kind: "panel", panel: "programs" },
          {
            kind: "text",
            text: "The architecture also fixes where the data may not come from: on-chain programs stay deterministic and free of HTTP, databases and model runtimes, and the read API is explicitly not a source of protocol truth.",
          },
        ],
      },
      {
        id: "what-does-not-exist",
        heading: "What does not exist",
        blocks: [
          {
            kind: "text",
            text: "Everything that would make this a feed. There is no price verifier, no median, no quorum, no freshness policy and no adapter that fetches anything.",
          },
          {
            kind: "quote",
            text: "Price, data, compute, and inference verifiers are still absent.",
            source: "ADR 0004: Verification model",
          },
          {
            kind: "text",
            text: "The threat model puts stale data at Milestone 5 and records today's mitigation as the heartbeat window on fulfilment, adding that there are no price feeds. The row for a lying external source records that adapters do not fetch.",
          },
        ],
      },
      {
        id: "what-a-developer-builds",
        heading: "What a developer would have to build",
        blocks: [
          {
            kind: "text",
            text: "In the current milestone, all of it. This entry exists to describe a shape the protocol is heading towards, not a capability to integrate against.",
          },
          {
            kind: "list",
            items: [
              "The observation format, the aggregation rule and the staleness bound, because ADR 0004 names a median of fresh observations as a direction rather than a specification.",
              "The off-chain workers that collect observations, which do not exist in this tree.",
              "A verification route for data, since a majority vote is not a proof and the ADR refuses to treat it as one.",
              "Fallback behaviour in the consuming program for the case where no fresh price exists.",
            ],
          },
        ],
      },
      {
        id: "honest-status",
        heading: "Honest status",
        blocks: [
          {
            kind: "text",
            text: "Planned means a later milestone has to design this. It does not mean the design is finished, and nothing on this page should be read as a feed a program can call today. Milestone 4 is the indexer, PostgreSQL, the read API and dashboard reads of chain state; data and price verification come after that.",
          },
        ],
      },
    ],
  },
  {
    slug: "verified-agent-job",
    label: "Concept",
    title: "An agent job whose off-chain work is verified",
    lead: "An agent or compute job that hands a program a result it can act on. Deterministic computation has a planned verification route. A commitment to a model and an output is not a proof of correct inference, and saying otherwise would be the easiest lie on this site.",
    status: "research",
    image: media.orbit.src,
    alt: media.orbit.alt,
    credit: media.orbit.credit,
    meta: [
      { label: "Label", value: "Concept" },
      { label: "Job types", value: "Compute planned, AiInference research" },
      { label: "Nuvex path", value: "No runtime" },
      { label: "Deployments", value: "None. There is nothing to run." },
    ],
    sections: [
      {
        id: "what-the-application-needs",
        heading: "What the application needs",
        blocks: [
          {
            kind: "text",
            text: "An agent that moves funds on-chain needs its off-chain step to be something more than a claim. The bar is the same as for randomness: a program has to be able to reject a result that was not produced the way it says it was.",
          },
          {
            kind: "list",
            items: [
              "A statement of what was computed, over which input, by which code or model.",
              "Evidence a program can check, rather than a signature saying trust me.",
              "A cost that makes checking worth it on-chain.",
              "A defined failure mode when the work cannot be verified.",
            ],
          },
        ],
      },
      {
        id: "what-exists-today",
        heading: "What Nuvex provides today",
        blocks: [
          {
            kind: "text",
            text: "The job-agnostic request and the callback shape. Compute and AiInference are identifiers in the same enum as Vrf, and they share the request lifecycle, which is why adding a job family means adding a verifier and an off-chain executor rather than a new core program.",
          },
          {
            kind: "text",
            text: "That is also the limit of it. On-chain programs do no GPU work, no HTTP and no model execution by design, and nothing outside the chain in this repository executes a job either.",
          },
          { kind: "panel", panel: "operator" },
        ],
      },
      {
        id: "what-does-not-exist",
        heading: "What does not exist",
        blocks: [
          {
            kind: "list",
            items: [
              "Any compute executor. ADR 0004 names deterministic agreement with commit and reveal at Milestone 6.",
              "Any inference runtime. The threat model's model-poisoning row records exactly that.",
              "Any proof of correct inference. A commitment to a model and an output is not one.",
              "Any measured route to ZK or zkML, which the ADR puts at Milestone 9 and only after cost is measured.",
            ],
          },
          {
            kind: "quote",
            text: "AI: a commitment to model and output. That commitment is not a proof of correct inference.",
            source: "ADR 0004: Verification model",
          },
        ],
      },
      {
        id: "what-a-developer-builds",
        heading: "What a developer would have to build",
        blocks: [
          {
            kind: "text",
            text: "Today, the whole thing, outside Nuvex. The useful question this concept answers is which parts would eventually be protocol work and which would stay the application's.",
          },
          {
            kind: "list",
            items: [
              "The executor, its determinism guarantees, and the commitment format for its output.",
              "The dispute path, since every challenge, reject and fail edge in the request state machine stays forbidden under ADR 0001.",
              "The economics of paying for the work, which are unset while max_fee is stored and never charged.",
              "An honest product surface: ADR 0004 requires the inference milestone to say in the product what a commitment does not prove.",
            ],
          },
        ],
      },
      {
        id: "honest-status",
        heading: "Honest status",
        blocks: [
          {
            kind: "text",
            text: "Research is the weakest label on this site and it is the right one here. There is no runtime, no verifier and no benchmark, so this page is a description of an open problem that the protocol's own records already frame.",
          },
        ],
      },
    ],
  },
];

export function getEcosystemEntry(slug: string): EcosystemEntry | undefined {
  return ecosystemEntries.find((entry) => entry.slug === slug);
}

export function otherEcosystemEntries(slug: string): EcosystemEntry[] {
  return ecosystemEntries.filter((entry) => entry.slug !== slug);
}

export const ecosystemPage = {
  tag: { strong: "Examples", rest: "and concepts, not partners" },
  title: "What you could build,",
  accent: "and what is missing",
  lead: "Nobody is running Nuvex in production. These four pages work through applications that would need verifiable results, and say for each one which pieces exist in the programs today, which are only reserved identifiers, and which a developer would have to build.",
  source: { label: "Protocol documentation", href: DOCS_URL },
  cta: {
    title: "Build on the part",
    accent: "that already verifies",
    action: { label: "Read the developer guide", href: "/developers" },
  },
};
