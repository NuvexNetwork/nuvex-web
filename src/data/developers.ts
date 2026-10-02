import { DOCS_URL, GITHUB_PROTOCOL_URL } from "@/lib/constants";
import { docsHref } from "./docs";

import type { CapabilityStatus } from "./protocol";

export const banner = {
  tag: { strong: "Developers", rest: "Milestone 3" },
  title: "Derive every address,",
  accent: "prove on the host",
  lead: "The Rust SDK, the JavaScript SDK and the nuvex CLI ship today. They derive protocol addresses and prove a VRF output locally. None of them submits a transaction yet.",
  primary: { label: "Read the docs", href: DOCS_URL },
  secondary: { label: "Protocol source", href: GITHUB_PROTOCOL_URL },
};

export const stack = {
  caption: "What you need on your machine",
  names: ["Rust", "TypeScript", "Anchor", "Solana CLI", "LiteSVM", "Cargo", "pnpm"],
};

export type SurfaceId = "rust" | "ts" | "cli" | "cpi";

export type Surface = {
  id: SurfaceId;
  title: string;
  accent?: string;
  body: string;
  status?: CapabilityStatus;
  link: { label: string; href: string };
  reverse?: boolean;
};

export const surfaces = {
  title: "Four ways to work",
  accent: "against the programs",
  description:
    "Each surface does the part that can be done without a cluster, and says so where it stops.",
  items: [
    {
      id: "rust",
      title: "Rust SDK",
      accent: "nuvex-sdk",
      body: "prove_vrf(&secret, &request, JobType, &input) builds the alpha binding and returns an 80-byte proof with a 64-byte output. node_pda derives a node account. The secret stays with the caller, and submit_request returns NotImplemented.",
      status: "in-development",
      link: { label: "Rust reference", href: docsHref("sdk/rust") },
    },
    {
      id: "ts",
      title: "JavaScript SDK",
      accent: "@nuvex/sdk",
      body: "requestPda(programId, requester, requestId) and protocolPda derive the same addresses from the shared seed list. submitRequest throws on purpose, because building a transaction for an instruction this client cannot send would be a stub.",
      status: "in-development",
      link: { label: "TypeScript reference", href: docsHref("sdk/typescript") },
      reverse: true,
    },
    {
      id: "cli",
      title: "Command line",
      accent: "nuvex",
      body: "Five commands: node, request, registry, staking and network. Every operational command exits with the milestone that will implement it, so network reports that it is not implemented.",
      status: "in-development",
      link: { label: "CLI reference", href: docsHref("sdk/cli") },
    },
    {
      id: "cpi",
      title: "CPI from your",
      accent: "consumer program",
      body: "Oracle core calls verify_vrf on the verification program, then invokes the callback you named. Your program implements an Anchor instruction called callback that takes the 64-byte output and a byte vector, with no accounts.",
      link: { label: "CPI reference", href: docsHref("sdk/cpi") },
      reverse: true,
    },
  ] satisfies Surface[],
};

export type Snippet = { id: string; title: string; language: string; code: string };

export const snippets = {
  title: "The calls that exist",
  accent: "today",
  description: "Every line below runs against the published API. Nothing here reaches a cluster.",
  items: [
    {
      id: "rust",
      title: "prove.rs",
      language: "rust",
      code: `use nuvex_job_types::JobType;
use nuvex_sdk::{node_pda, prove_vrf};

let (node, _bump) = node_pda(&registry_program_id, &node_authority);

// The secret never leaves the caller.
let proved = prove_vrf(&secret, &request, JobType::Vrf, &input)?;
// proved.proof is [u8; 80], proved.output is [u8; 64]`,
    },
    {
      id: "ts",
      title: "request.ts",
      language: "typescript",
      code: `import { protocolPda, requestPda, submitRequest } from "@nuvex/sdk";

const [protocol] = protocolPda(coreProgramId);
const [request] = requestPda(coreProgramId, requester, requestId);

// submitRequest throws. It does not build a transaction.
submitRequest({ jobType: "vrf", maxFeeLamports: 0n });`,
    },
    {
      id: "cli",
      title: "terminal",
      language: "bash",
      code: `nuvex --help
# node  request  registry  staking  network

nuvex network
# network is not implemented (milestone 4)`,
    },
    {
      id: "cpi",
      title: "consumer.rs",
      language: "rust",
      code: `#[program]
pub mod consumer {
    use super::*;

    pub fn callback(_ctx: Context<Callback>, output: [u8; 64], data: Vec<u8>) -> Result<()> {
        msg!("nuvex-callback {}", output[0]);
        let _ = data.len();
        Ok(())
    }
}

// The callback receives no accounts.
#[derive(Accounts)]
pub struct Callback {}`,
    },
  ] satisfies Snippet[],
};

export const focus = {
  text: "The SDKs derive addresses and prove on the host.",
  accent: "Neither of them sends a transaction yet.",
};

export type CheckItem = { id: string; title: string; body: string };

export const checks = {
  title: "One command",
  accent: "checks the tree",
  description: "make check is the gate. It runs on a laptop and never deploys anything.",
  items: [
    {
      id: "format",
      title: "Formatting and Clippy",
      body: "Rust and JavaScript formatting are checked, and Clippy runs across the workspace with warnings denied.",
    },
    {
      id: "build",
      title: "cargo build-sbf",
      body: "The three programs and the test callback consumer are built as SBF binaries before any program test runs.",
    },
    {
      id: "test",
      title: "Rust and SDK tests",
      body: "The Rust workspace tests and the JavaScript SDK tests both run. LiteSVM 0.17 loads the programs from target/deploy/*.so.",
    },
  ] satisfies CheckItem[],
};

export const environment = {
  title: "Configuration is",
  accent: "a variable, never a default",
  items: [
    {
      id: "copy",
      title: "Copy the example file",
      body: "cp env/.env.local.example .env.local before you point any process at a cluster. Leave the secrets empty.",
    },
    {
      id: "ids",
      title: "Program ids come from the environment",
      body: "The JavaScript SDK reads the three program ids from NUVEX_ORACLE_CORE_PROGRAM_ID and its siblings. A missing variable stays undefined, and nothing substitutes the ids from Anchor.toml.",
    },
    {
      id: "keys",
      title: "Keys stay out of the tree",
      body: "RPC URLs and key paths are variables too. Development program keypairs live in keys/program/ and are gitignored.",
    },
  ] satisfies CheckItem[],
};

export const cta = {
  title: "Build against",
  accent: "a proof, not a promise",
  action: { label: "Read the docs", href: DOCS_URL },
};
