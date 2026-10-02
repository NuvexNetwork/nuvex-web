# Subpage implementation spec

How to build an inner page so it matches the reference design system (scaleos.webflow.io,
re-implemented in our own code) and stays honest about what Nuvex actually does.

Read this before writing a page. Do not restyle anything; compose the primitives below.

## Ground rules

- Server Components by default. Add `"use client"` only for state, effects or event handlers.
- Every `page.tsx` exports `metadata` with a `title` and a `description`.
- Strict TypeScript, no `any`. Prettier with `printWidth` 100. ESLint flat config must pass.
- No new dependencies. Icons come from `lucide-react` (there is no GitHub brand icon; use
  `GitBranch`).
- Images: `next/image`, real `alt` text, decorative images get `alt=""`. The only photographs in
  the project are `/media/light.jpg`, `/media/fiber.jpg` and `/media/circuit.jpg`; every use needs
  an Unsplash credit line.
- Content lives in `src/data/*`, presentation in components. Do not inline long copy in JSX.
- Do not edit shared primitives, `globals.css`, `src/data/navigation.ts`, `layout.tsx` or any page
  outside your assignment.

## Layout and spacing tokens

| Token                | Value                              |
| -------------------- | ---------------------------------- |
| Container            | `--container` 1070px, gutter 16px  |
| Section padding      | `--section-y` 80px                 |
| Banner top padding   | `--section-y-banner` 100px         |
| Utility page padding | `--section-y-utility` 120px        |
| Title to content gap | 50px (`mb-[50px]`)                 |
| Cell padding         | 30px, 24px on dense grids          |
| Breakpoints          | `sm` 480px, `md` 768px, `lg` 992px |

Reference gap scale, if you need a value: 4, 8, 10, 12, 14, 16, 18, 24, 30, 40, 50, 60, 70, 80,
100px.

Colours: black `#000` background, `#181818` surface and hairlines, `#3a3a3a` strong lines,
`#8f8f8f` body text, `#dfdfdf` soft white, `#fff` headings, `#265ff3` accent. Use the Tailwind
names `bg`, `surface`, `line`, `line-strong`, `muted`, `fg-soft`, `fg`, `primary`.

Typography classes: `t-hero`, `t-section`, `t-h3`, `t-h4`, `t-h5`, `t-h6`, `t-lead`, `t-body`,
`t-small`, `t-meta`, `t-eyebrow`, `t-stat`, and `gray` for an accent clause inside a heading.
Plain `p` is already `#8f8f8f` at 16px. Never set font sizes by hand.

## Primitives

Layout and UI (`@/components/ui/...`):

- `Section({ spacing: "default" | "banner" | "utility" | "tight" | "none", container, children })`
- `Container({ size: "default" | "small" | "wide" })`
- `Cell`, `CellGrid` — the hairline grid with corner dots. `Cell` takes `className`, `style`, `id`.
  Add `cell-hover` to the cell's class list to make its frame turn blue on hover.
- `SectionTitle({ id, title, accent, description, align, width, action })`
- `StatusBadge({ status })` where status is `"live" | "in-development" | "planned" | "research"`
- `SmartLink` — internal links use `next/link`, external get `target="_blank"` and `rel`
- `RollText({ text, color, reverse })` — per-character hover roll. Single line only; never wrap a
  heading that can wrap onto two lines.
- `Logo`

Buttons: `Button({ href | onClick, variant: "primary" | "nav" | "text", icon, fullWidth })`. The
label must be a plain string.

Animation (`@/components/animations/...`): `GroupReveal` (children fade up 75px, staggered),
`SlideUp` (block fades up 50px), `MaskUp` (rises out of a mask), `TitleReveal`
(`{ as, text, accent, immediate, delay }`, words rise out of a mask), `Counter({ value, suffix })`.
Pass `immediate` for anything above the fold. All of these respect reduced motion already.

Page sections (`@/components/sections/...`):

- `PageBanner({ tag, title, accent, lead, primary, secondary, width, titleWidth, flush, children })`
  — the centred opener for every inner page.
- `TechStrip({ caption, names })` — the wrapping/marquee strip of technology names.
- `FeatureSplit({ items })` — alternating copy/visual rows. Item:
  `{ id?, title, accent?, body, status?, link?, visual?, reverse? }`.
- `FeatureCells({ items, cols: 2 | 3 | 4 | 6, lead? })` — icon, title, description cells.
- `FocusStatement({ text, accent })` — one 690px statement between dense sections.
- `CounterCells({ items })` — four counters in a hairline row.
- `CtaBanner({ title, accent, action })` — the closing band with the dome glow. Every marketing
  page ends with one.

Cards (`@/components/cards/...`): `BlogCard`, `StackedCard` (sticky case-study card),
`RowLink` (hairline row with a sliding arrow), `PriceCard`, and the generic `Card` family.

Long-form (`@/components/content/...`):

- `ArticleLayout({ title, date, author, category, image, sections })` — blog post template.
- `CaseLayout({ title, lead, status, meta, source, sections })` — ecosystem example template.
- `UtilityPage({ title, accent, lead, children })` + `UtilityGrid({ cols })` — changelog, licences,
  style guide.
- `LegalPage({ title, updated, sections })` — privacy and terms.
- `RichText({ sections })` and `Toc({ items })` are used by the two layouts above; you normally
  only supply `DocSection[]` data.

`DocSection` is `{ id, heading, blocks }` and a block is one of
`{ kind: "text", text }`, `{ kind: "list", items }`, `{ kind: "code", language, code }`,
`{ kind: "quote", text, source }`, `{ kind: "image", src, alt, credit? }`,
`{ kind: "panel", panel }` where panel is one of `request | nodes | verify | programs | heartbeat |
stake | operator`. Panels render our protocol illustrations and are captioned automatically as
illustrations.

Protocol visuals (`@/components/protocol/visuals`): `HeroConsole`, `HeartbeatChart`, `RequestPanel`,
`NodesPanel`, `VerifyPanel`, `ProgramsPanel`, `CodePanel({ variant: "ts" | "rust" | "cli" })`,
`OperatorPanel`, `StakePanel`, `MiniCard({ variant })`. Building blocks are in
`@/components/protocol/PanelUI`: `Panel`, `PanelHeader`, `Chip`, `Mono`, `IllustrationNote`.

## Page composition

Marketing page (product, about, economics, developers):

1. `PageBanner`
2. `TechStrip` (optional, only where it adds something)
3. `SectionTitle` + `FeatureSplit` or `FeatureCells`
4. `FocusStatement`
5. a second `SectionTitle` + `FeatureCells`
6. `CtaBanner`

List page: `PageBanner`, then the grid (`BlogCard` in a `CellGrid` of 2, or `StackedCard` in a
`flex flex-col gap-2.5` where each card is `sticky top-[100px]`), then `CtaBanner`.

Utility page: `UtilityPage` with `UtilityGrid` rows. Legal page: `LegalPage` only.

## Honesty rules

These override any desire for impressive copy. Breaking one is a defect.

- Never claim a capability that is not implemented. Mark status explicitly: **live** only for
  on-chain VRF proof verification and the node registry/stake/heartbeat accounts; **planned** for
  data feeds, price feeds, verifiable compute, fees, rewards, slashing, the indexer, the API and
  dashboard reads; **research** for AI inference, which has no runtime.
- No invented numbers. If economics are unset, write "Coming soon".
- No invented people, customers, partners, logos, testimonials or job openings. Quotes may only be
  real sentences from the protocol repository's README, ADRs or security documents, attributed to
  the file they come from.
- Ecosystem entries are labelled `Example` or `Concept`, never a partnership.
- No fake interactivity. A control either works or does not exist. There is no backend: forms
  compose a prefilled GitHub issue.
- Every console or dashboard visual is an illustration, and says so.
- Blog author is "Nuvex maintainers". Maintainers are not named anywhere in the repository.

## Protocol facts

Status: Milestone 3. Next is Milestone 4 (indexer, PostgreSQL, read API, dashboard reads of chain
state). Nothing is deployed to mainnet; `scripts/deploy-mainnet.sh` exits before any transaction.
Licence Apache-2.0.

- Programs: `oracle-core`, `oracle-registry`, `verification`. `crates/` holds shared types, PDA
  seeds and the cryptography boundary. `tests/` holds LiteSVM, integration and callback-consumer
  tests. `node/` is a health-only oracle node. `env/` holds example environment files. `security/`
  holds the threat model and operational policy. Decision records live in the documentation
  repository under `architecture/adr/`.
- A request carries a job type, an input, constraints and an optional callback. Randomness is the
  first job type.
- VRF verification uses `solana-ecvrf` 0.0.1: RFC 9381 ECVRF-EDWARDS25519-SHA512-TAI, 80-byte
  proof, 64-byte output. No audit report of that crate was found, and ADR 0004 records that
  absence.
- Node eligibility (ADR 0003): the node is active, its stake meets the configured minimum, its
  heartbeat is inside the configured window, and its VRF key was registered before the request.
  Fulfilment is first-come among eligible nodes. There is no weighted lottery.
- Live transitions are cancel, expire and VRF fulfilment. ADR 0001 forbids every challenge,
  reject and fail edge.
- The callback, when set, receives the output and no accounts (ADR 0006). Account-bearing
  callbacks are out of scope.
- `max_fee` is stored and never charged. ADR 0005 is a split of roles; no basis points are set.
- Known weakness, stated in the README: an operator who funds several keys can choose among those
  outputs. Each extra key costs the configured minimum stake, and a minimum of zero does not
  resist that.
- The node process does not submit transactions. It exposes health and metrics only.
- Rust SDK `nuvex-sdk`: `prove_vrf(&secret, &request, JobType, &input)` returns an 80-byte proof
  and a 64-byte output; `node_pda` derives the node account.
- JS SDK `@nuvex/sdk`: `requestPda(programId, requester, requestId)` and `protocolPda`.
  `submitRequest` throws, on purpose.
- CLI binary `nuvex`, commands `node`, `request`, `registry`, `staking`, `network`. `network`
  reports "network is not implemented (milestone 4)".
- `make check` runs formatting, Clippy, `cargo build-sbf` for the three programs and the test
  callback consumer, Rust tests and the JavaScript SDK tests. LiteSVM 0.17 loads the programs from
  `target/deploy/*.so`.
- Node image: `docker build -f node/Dockerfile -t nuvex-oracle-node:local .`
- Environment: `cp env/.env.local.example .env.local`. RPC URLs, program ids and key paths are
  variables, never defaults in source. Development program keypairs live in `keys/program/` and
  are gitignored; the ids in `Anchor.toml` are local ids.
- Toolchain: Anchor 1.2.0, Solana CLI 4.1.2, Solana crates 3.x, Rust 1.89 MSRV, Node.js 22,
  TypeScript 5.9.3, pnpm 10.15.1.
- Security documents: `AUDIT_SCOPE.md` (no audit commissioned), `THREAT_MODEL.md`,
  `KEY_MANAGEMENT.md` (node identity, operator authority, treasury and security-fund authorities
  stay on separate keys), `INCIDENT_RESPONSE.md` (no production deployment; the pause flag is not
  implemented), `UPGRADE_POLICY.md` (ADR 0007, no program is deployed).
- Documentation tree in the docs repository: `introduction`, `oracle/{vrf,data,price,callbacks,ai}`,
  `architecture`, `verification`, `sdk/{index,rust,typescript,cli,cpi}`,
  `nodes/{installation,configuration,staking,rewards,slashing}`, `security/{index,threat-model}`,
  `developers/{index,quick-start}`, `api`.

## Routes

| Route                | Template                       |
| -------------------- | ------------------------------ |
| `/`                  | home (done)                    |
| `/about`             | marketing + counters           |
| `/technology`        | marketing (randomness)         |
| `/architecture`      | marketing                      |
| `/network`           | marketing                      |
| `/nodes`             | marketing (operators)          |
| `/security`          | marketing                      |
| `/developers`        | marketing                      |
| `/docs`              | documentation landing          |
| `/economics`         | pricing-style grid + table     |
| `/ecosystem`         | stacked case list              |
| `/ecosystem/[slug]`  | `CaseLayout`                   |
| `/blog`              | blog grid                      |
| `/blog/[slug]`       | `ArticleLayout`                |
| `/contribute`        | row list                       |
| `/contribute/[slug]` | long-form area page            |
| `/contact`           | form + quote block             |
| `/changelog`         | `UtilityPage`                  |
| `/style-guide`       | `UtilityPage`                  |
| `/licenses`          | `UtilityPage`                  |
| `/privacy`, `/terms` | `LegalPage`                    |
| `/app/*`             | `ConsolePage` inside the shell |
