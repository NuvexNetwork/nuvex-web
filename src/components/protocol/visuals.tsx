import { Check, CircleDot, Minus } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Chip, IllustrationNote, Mono, Panel, PanelHeader } from "./PanelUI";

type NodeRow = {
  name: string;
  stake: number;
  heartbeat: string;
  state: "fulfilled" | "eligible" | "stale";
};

const nodes: NodeRow[] = [
  { name: "Node 01", stake: 92, heartbeat: "in window", state: "fulfilled" },
  { name: "Node 02", stake: 78, heartbeat: "in window", state: "eligible" },
  { name: "Node 03", stake: 64, heartbeat: "in window", state: "eligible" },
  { name: "Node 04", stake: 40, heartbeat: "stale", state: "stale" },
];

const stateChip = {
  fulfilled: <Chip tone="positive">Fulfilled</Chip>,
  eligible: <Chip tone="neutral">Eligible</Chip>,
  stale: <Chip tone="negative">Ineligible</Chip>,
};

/** Request lifecycle line: dashed slots with the path drawn through the states. */
function LifecycleTrace({ active = 3 }: { active?: number }) {
  const states = ["Open", "Assigned", "Proved", "Verified", "Callback"];
  return (
    <div className="relative">
      <div aria-hidden className="absolute inset-0 grid grid-cols-5">
        {states.map((state) => (
          <span key={state} className="border-l border-dashed border-white/10 first:border-l-0" />
        ))}
      </div>
      <svg viewBox="0 0 500 120" className="relative h-auto w-full" aria-hidden>
        <polyline
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          points="0,92 30,84 52,96 78,70 100,80 128,40 150,62 176,34 204,74 228,58 256,66 280,48 304,60 330,52 356,30 380,44 404,26 430,38 456,20 480,30 500,24"
          opacity="0.85"
        />
        <polyline
          fill="none"
          stroke="var(--accent-soft)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          points="304,60 330,52 356,30 380,44 404,26"
        />
      </svg>
      <div className="relative mt-2 grid grid-cols-5 text-center text-[11px] text-muted">
        {states.map((state, index) => (
          <span key={state} className={cn(index === active && "text-fg")}>
            {state}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Hero composition: console sidebar and a request panel over a blurred photograph. */
export function HeroConsole() {
  const groups = [
    {
      title: "Protocol",
      items: ["Overview", "Requests", "Nodes", "Callbacks"],
      active: "Requests",
    },
    { title: "Network", items: ["Stake", "Heartbeat", "Slashing"] },
  ];
  const jobs = [
    { name: "VRF", tone: "bg-[#3ecf8e]", note: "Live" },
    { name: "Price feeds", tone: "bg-[#8f8f8f]", note: "Planned" },
    { name: "Compute", tone: "bg-[#8f8f8f]", note: "Planned" },
  ];

  return (
    <div className="relative flex items-center justify-center gap-3 px-4 py-10 sm:gap-4 sm:px-10 sm:py-14 md:py-[70px]">
      <Panel glass className="hidden w-[170px] shrink-0 self-stretch p-4 md:block">
        <p className="mb-5 text-[13px] text-fg">Nuvex ▾</p>
        {groups.map((group) => (
          <div key={group.title} className="mb-4">
            <p className="mb-2 text-[9px] tracking-[0.12em] text-muted uppercase">{group.title}</p>
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-md px-2 py-1 text-[12px]",
                    item === group.active ? "bg-white/85 text-black" : "text-fg-soft",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="mb-2 text-[9px] tracking-[0.12em] text-muted uppercase">Jobs</p>
        <ul className="flex flex-col gap-1.5">
          {jobs.map((job) => (
            <li key={job.name} className="flex items-center gap-2 px-2 text-[12px] text-fg-soft">
              <span className={cn("size-2.5 rounded-full", job.tone)} />
              {job.name}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel glass className="w-full max-w-[480px] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] text-fg-soft sm:text-[17px]">VRF request</p>
          <IllustrationNote />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-[28px] leading-none text-fg sm:text-[34px]">Verified</span>
          <Chip tone="positive">callback executed</Chip>
        </div>
        <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-md text-center text-[11px] text-fg-soft ring-1 ring-white/15 sm:text-[12px]">
          <span className="py-1.5">job_type = VRF</span>
          <span className="bg-white/10 py-1.5 text-fg">proof 80 B</span>
          <span className="py-1.5">output 64 B</span>
        </div>
        <div className="mt-5">
          <LifecycleTrace />
        </div>
        <ul className="mt-5 flex flex-col gap-2.5">
          {nodes.slice(0, 3).map((node) => (
            <li
              key={node.name}
              className="flex items-center justify-between gap-3 text-[13px] sm:text-[15px]"
            >
              <span className="flex items-center gap-2.5 text-fg">
                <CircleDot aria-hidden size={16} className="text-fg-soft" />
                {node.name}
              </span>
              <span className="text-fg-soft">stake {node.stake}%</span>
              {stateChip[node.state]}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/** Heartbeat window chart for the capability grid. */
export function HeartbeatChart() {
  return (
    <Panel className="w-full max-w-[420px] p-5">
      <PanelHeader title="Node heartbeat" meta="···" />
      <div className="relative mt-5">
        <div aria-hidden className="absolute inset-0 flex flex-col justify-between pb-6">
          {["window", "75%", "50%", "25%", "0"].map((label) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-11 text-[10px] text-muted">{label}</span>
              <span className="h-px flex-1 border-t border-dashed border-white/10" />
            </div>
          ))}
        </div>
        <svg
          viewBox="0 0 320 170"
          className="relative ml-12 h-[170px] w-[calc(100%-3rem)]"
          aria-hidden
        >
          <defs>
            <linearGradient id="hb-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="70" y="60" width="70" height="104" fill="url(#hb-fill)" />
          <rect x="200" y="70" width="70" height="94" fill="url(#hb-fill)" />
          <path
            d="M0 100 C30 40 60 40 70 70 S110 130 140 100 S170 10 200 50 S240 80 270 70 S300 120 320 60"
            fill="none"
            stroke="#8f8f8f"
            strokeWidth="2.5"
          />
          <path d="M70 70 S110 130 140 100" fill="none" stroke="#fff" strokeWidth="3" />
          <path
            d="M200 50 S240 80 270 70"
            fill="none"
            stroke="var(--accent-soft)"
            strokeWidth="3"
          />
          <rect x="66" y="162" width="78" height="3" rx="1.5" fill="#8f8f8f" />
          <rect x="196" y="162" width="78" height="3" rx="1.5" fill="#8f8f8f" />
        </svg>
      </div>
      <IllustrationNote className="mt-3 block" />
    </Panel>
  );
}

export function RequestPanel() {
  const fields = [
    ["job_type", "VRF"],
    ["requester", "your program"],
    ["input", "32-byte seed"],
    ["callback", "consumer program"],
    ["max_fee", "recorded, not charged"],
  ];
  return (
    <Panel className="w-full p-5">
      <PanelHeader title="Open request" meta={<Chip tone="accent">OPEN</Chip>} />
      <dl className="mt-5 flex flex-col">
        {fields.map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-2.5 last:border-b-0"
          >
            <dt>
              <Mono className="text-muted">{key}</Mono>
            </dt>
            <dd>
              <Mono>{value}</Mono>
            </dd>
          </div>
        ))}
      </dl>
      <IllustrationNote className="mt-3 block" />
    </Panel>
  );
}

export function NodesPanel({ compact = false }: { compact?: boolean }) {
  return (
    <Panel className="w-full p-5">
      <PanelHeader title="Eligible nodes" meta="stake · heartbeat" />
      <ul className="mt-5 flex flex-col gap-3">
        {nodes.slice(0, compact ? 3 : 4).map((node) => (
          <li
            key={node.name}
            className="grid grid-cols-[72px_1fr_auto] items-center gap-3 text-[13px]"
          >
            <span className="text-fg">{node.name}</span>
            <span className="flex flex-col gap-1">
              <span className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <span
                  className={cn(
                    "block h-full rounded-full",
                    node.state === "stale" ? "bg-[#ff8a7d]" : "bg-fg",
                  )}
                  style={{ width: `${node.stake}%` }}
                />
              </span>
              <span className="text-[10px] text-muted">heartbeat {node.heartbeat}</span>
            </span>
            {stateChip[node.state]}
          </li>
        ))}
      </ul>
      <IllustrationNote className="mt-4 block" />
    </Panel>
  );
}

export function VerifyPanel() {
  const steps = [
    { label: "COMMITTED", detail: "proof submitted with the output" },
    { label: "VERIFIED", detail: "ECVRF checked by the program" },
    { label: "FINALIZED", detail: "64-byte output written" },
    { label: "EXECUTED", detail: "callback ran, no accounts passed" },
  ];
  return (
    <Panel className="w-full p-5">
      <PanelHeader title="Verification" meta="RFC 9381" />
      <ol className="mt-5 flex flex-col gap-3">
        {steps.map((step) => (
          <li key={step.label} className="flex items-center gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#3ecf8e]/15 text-[#5fe0a5]">
              <Check aria-hidden size={14} strokeWidth={2.5} />
            </span>
            <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3">
              <Mono className="text-fg">{step.label}</Mono>
              <span className="text-[12px] text-muted">{step.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      <IllustrationNote className="mt-4 block" />
    </Panel>
  );
}

export function ProgramsPanel() {
  const programs = [
    ["oracle-core", "requests, callbacks"],
    ["oracle-registry", "nodes, stake, slash"],
    ["verification", "ECVRF proofs"],
  ];
  return (
    <Panel className="w-full p-5">
      <PanelHeader title="Programs" meta="Anchor 1.2" />
      <ul className="mt-5 flex flex-col gap-2.5">
        {programs.map(([name, role]) => (
          <li
            key={name}
            className="flex items-center justify-between gap-3 rounded-md bg-white/[0.04] px-3 py-2.5"
          >
            <span className="flex flex-col">
              <Mono className="text-fg">{name}</Mono>
              <span className="text-[11px] text-muted">{role}</span>
            </span>
            <Chip tone="positive">Live</Chip>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function CodePanel({ variant }: { variant: "ts" | "rust" | "cli" }) {
  const snippets = {
    ts: {
      title: "request.ts",
      lines: [
        ["c", "// TypeScript SDK"],
        ["k", 'import { requestPda } from "@nuvex/sdk";'],
        ["", ""],
        ["k", "const [request] = requestPda("],
        ["", "  coreProgramId, requester, requestId,"],
        ["k", ");"],
      ],
    },
    rust: {
      title: "prove.rs",
      lines: [
        ["c", "// Rust SDK, secret stays local"],
        ["k", "let proof = nuvex_sdk::prove_vrf("],
        ["", "    &secret, &request, JobType::Vrf, &input,"],
        ["k", ")?;"],
        ["", ""],
        ["c", "// proof.proof: [u8; 80], proof.output: [u8; 64]"],
      ],
    },
    cli: {
      title: "terminal",
      lines: [
        ["k", "$ nuvex network"],
        ["e", "network is not implemented (milestone 4)"],
        ["", ""],
        ["k", "$ nuvex --help"],
        ["", "node  request  registry  staking  network"],
      ],
    },
  }[variant];

  return (
    <Panel className="w-full overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-2.5">
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="ml-2 text-[11px] text-muted">{snippets.title}</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-[1.7]">
        {snippets.lines.map(([kind, text], index) => (
          <div
            key={index}
            className={cn(
              kind === "c" && "text-subtle",
              kind === "k" && "text-fg",
              kind === "e" && "text-[#ff8a7d]",
              kind === "" && "text-fg-soft",
            )}
          >
            {text || "\u00a0"}
          </div>
        ))}
      </pre>
    </Panel>
  );
}

export function OperatorPanel() {
  const rows: [string, ReactNode][] = [
    [
      "/health",
      <Chip key="h" tone="positive">
        ok
      </Chip>,
    ],
    [
      "/metrics",
      <Chip key="m" tone="positive">
        exposed
      </Chip>,
    ],
    [
      "VRF key",
      <Chip key="k" tone="neutral">
        not loaded
      </Chip>,
    ],
    [
      "fulfilments",
      <Chip key="f" tone="neutral">
        not submitted
      </Chip>,
    ],
  ];
  return (
    <Panel className="w-full p-5">
      <PanelHeader title="nuvex-oracle-node" meta="Milestone 3" />
      <ul className="mt-5 flex flex-col">
        {rows.map(([label, value]) => (
          <li
            key={label}
            className="flex items-center justify-between border-b border-white/[0.06] py-2.5 last:border-b-0"
          >
            <Mono>{label}</Mono>
            {value}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function StakePanel() {
  return (
    <Panel className="w-full p-5">
      <PanelHeader title="Stake and heartbeat" meta="per node" />
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          ["Minimum stake", "configured"],
          ["Heartbeat window", "configured"],
          ["Registered before request", "required"],
          ["Slash", "available"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md bg-white/[0.04] p-3">
            <p className="text-[11px] text-muted">{label}</p>
            <p className="mt-1 text-[14px] text-fg">{value}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function MiniCard({ variant }: { variant: "register" | "verify" | "callback" }) {
  if (variant === "register") {
    return (
      <Panel className="w-full max-w-[250px] p-4">
        <PanelHeader title="Register" />
        <ul className="mt-4 flex flex-col gap-2 text-[12px]">
          {["Join registry", "Lock stake", "Heartbeat"].map((item) => (
            <li key={item} className="flex items-center justify-between text-fg-soft">
              {item}
              <Check aria-hidden size={14} className="text-[#5fe0a5]" />
            </li>
          ))}
        </ul>
      </Panel>
    );
  }
  if (variant === "verify") {
    return (
      <Panel className="w-full max-w-[250px] p-4">
        <PanelHeader title="Verify" />
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] text-muted">proof</p>
            <p className="text-[26px] leading-none text-fg">80 B</p>
          </div>
          <Minus aria-hidden size={16} className="mb-2 text-muted" />
          <div className="text-right">
            <p className="text-[11px] text-muted">output</p>
            <p className="text-[26px] leading-none text-fg">64 B</p>
          </div>
        </div>
      </Panel>
    );
  }
  return (
    <Panel className="w-full max-w-[250px] p-4">
      <PanelHeader title="Callback" />
      <div className="mt-4 flex items-center justify-between text-[12px]">
        <Mono>accounts passed</Mono>
        <span className="text-[22px] leading-none text-fg">0</span>
      </div>
      <div className="mt-3">
        <Chip tone="positive">EXECUTED</Chip>
      </div>
    </Panel>
  );
}
