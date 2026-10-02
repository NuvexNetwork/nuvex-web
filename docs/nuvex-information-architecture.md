# Nuvex information architecture

This maps the reference site's structure (see `reference-analysis.md`) onto Nuvex. The reference
supplies layout and interaction logic. The content comes from what the protocol repository actually
implements.

## Status vocabulary

Every capability shown on the site carries one of these labels. A label must match the protocol
repository's README at the time of writing.

| Label          | Meaning                                                                 |
| -------------- | ----------------------------------------------------------------------- |
| Live           | Enforced by the programs in the protocol repository today.              |
| In development | Code exists, but it is incomplete or does not run end to end.           |
| Planned        | Reserved in the data model or named in a decision record. No logic yet. |
| Research       | An open question. No design has been chosen.                            |

None of these labels means "deployed to mainnet". Nothing is deployed to mainnet.

### Capability status (Milestone 3)

| Capability                                    | Status         | Source of truth                                  |
| --------------------------------------------- | -------------- | ------------------------------------------------ |
| VRF request, ECVRF proof checked on-chain     | Live           | `verification` program, `solana-ecvrf` 0.0.1     |
| Callback with the 64-byte output              | Live           | `oracle-core`, the callback receives no accounts |
| Node registry, stake, heartbeat, slash        | Live           | `oracle-registry`                                |
| Request cancel and expiry                     | Live           | `oracle-core`                                    |
| Rust and TypeScript SDKs                      | In development | Derive accounts and prove locally. Do not send.  |
| CLI                                           | In development | Refuses to send transactions                     |
| Oracle node process                           | In development | Health and metrics only. Does not fulfill.       |
| Indexer, API, dashboard reads                 | In development | Milestone 4, in the services repository          |
| Fees and rewards                              | Planned        | `max_fee` is stored and never charged (ADR 0005) |
| Price and data feeds                          | Planned        | Job type reserved                                |
| General verifiable computation                | Planned        | Job type reserved                                |
| AI inference requests                         | Planned        | Job type reserved                                |
| Weighted node selection, reputation           | Research       | Selection is first-come today                    |
| Challenges and disputes                       | Research       | ADR 0001 forbids every challenge edge            |
| ZK or cryptographic verification of inference | Research       | No design chosen                                 |
| Independent audit                             | Not performed  | No audit report exists for the VRF crate         |

## Sitemap

Routes marked "exists" are built today. The others are built in later phases, and they are not linked
from the navigation until they exist.

| Route             | Reference template             | Purpose                                               | Phase | State                     |
| ----------------- | ------------------------------ | ----------------------------------------------------- | ----- | ------------------------- |
| `/`               | Home                           | The whole story in the reference's section rhythm     | 3     | exists, to be rebuilt     |
| `/protocol`       | Product (AI Marketing)         | The request lifecycle and the four job families       | 4     | new                       |
| `/technology`     | Product (Intelligent Campaign) | Verification, proofs, callbacks                       | 4     | exists, to be rebuilt     |
| `/architecture`   | Marketing                      | Programs, accounts, and the off-chain boundary        | 4     | exists, to be rebuilt     |
| `/network`        | Product                        | The node network: stake, heartbeat, selection, slash  | 4     | exists, to be rebuilt     |
| `/nodes`          | Marketing                      | Operator guide entry                                  | 4     | exists, to be rebuilt     |
| `/security`       | Marketing                      | Threat model, audit status, open decisions            | 4     | exists, to be rebuilt     |
| `/developers`     | Product (Integration)          | SDKs, CLI, API, examples                              | 4     | exists, to be rebuilt     |
| `/docs`           | Marketing                      | Documentation landing that links to the docs site     | 4     | new                       |
| `/ecosystem`      | Collection (Work)              | Use-case categories, each labelled Example or Concept | 5     | exists, to be rebuilt     |
| `/work`           | Collection (Work)              | Example integrations, all labelled Example or Concept | 5     | new                       |
| `/work/[slug]`    | Collection item                | One example, written as a walkthrough                 | 5     | new                       |
| `/blog`           | Collection (Blog)              | Engineering notes with category filters               | 6     | exists, to be rebuilt     |
| `/blog/[slug]`    | Collection item                | One post                                              | 6     | `milestone-0` exists      |
| `/careers`        | Marketing (Career)             | Principles. Roles only if real roles are open         | 7     | new                       |
| `/careers/[slug]` | Collection item                | One role                                              | 7     | new, only with real roles |
| `/about`          | Marketing                      | Why Nuvex exists, principles, milestones              | 8     | new                       |
| `/contact`        | Form                           | Contact form, handled locally until a backend exists  | 8     | new                       |
| `/pricing`        | Pricing                        | Network economics, every number "Coming soon"         | 4     | new                       |
| `/changelog`      | Utility                        | Milestone history                                     | 9     | new                       |
| `/privacy`        | Legal                          | Privacy policy                                        | 9     | new                       |
| `/terms`          | Legal                          | Terms of use                                          | 9     | new                       |
| `/not-found`      | Utility (404)                  | Not-found page                                        | 9     | new                       |
| `/app/*`          | (none)                         | Console shell. Reads are not wired until Milestone 4  | later | exists                    |

The reference's `/401`, `/style-guide`, `/licenses`, and `/instructions` exist to sell a template, and
Nuvex has no equivalent need. A credits page for photography may replace `/licenses` if images that
need attribution are used.

## Navigation

The reference bar has three plain links, two dropdowns (one descriptive "Product" panel and one
"Pages" index), and one CTA. Nuvex keeps that shape.

### Target (after Phase 4)

- **Protocol ▾** (descriptive panel, each item with a status badge)
  - Verifiable randomness · Live
  - Oracle data · Planned
  - Verifiable compute · Planned
  - AI inference · Planned
- **Technology ▾** (descriptive panel)
  - Architecture, Verification, Node network, Security
- **Developers**
- **Network**
- **Resources ▾** (index panel, like the reference's Pages menu)
  - Build: SDK, Documentation, API, Examples, GitHub
  - Learn: Blog, Changelog, FAQ
  - Company: About, Careers, Contact
- **CTA:** Read the docs

### Phase 1 (only routes that exist today)

- **Protocol ▾:** Technology, Architecture, Network, Security
- **Developers**, **Nodes**, **Blog**
- **Resources ▾:** Build (Developers, Node operators, Ecosystem, Documentation, GitHub) and Console
  (Overview, Requests, Nodes, Rewards)
- **CTA:** Read the docs

The mobile menu shows the same tree, with dropdowns as expandable groups.

## Footer

The reference uses a three-column grid of six groups. Nuvex uses the brief's groups and shows a group
only when it has working links.

| Group      | Phase 1 links                                             | Added later               |
| ---------- | --------------------------------------------------------- | ------------------------- |
| Protocol   | Technology, Architecture, Security                        | Protocol, Economics       |
| Network    | Network, Node operators, Ecosystem                        | Explorer, once one exists |
| Developers | Developers, Documentation, Protocol source                | SDK, API, Examples        |
| Resources  | Blog, Console                                             | Changelog, FAQ            |
| Company    | (hidden)                                                  | About, Careers, Contact   |
| Legal      | (hidden)                                                  | Privacy, Terms            |
| Social     | GitHub. X and Discord only when their URLs are configured |                           |

## Reference section mapping

| Reference section         | Nuvex equivalent                                                          | Content rule                                      |
| ------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------- |
| Hero with dashboard image | Hero with a request-lifecycle console visual                              | Visual labelled as an illustration, not live data |
| "Trusted by" logo strip   | "Built with" strip: Solana, Anchor, Rust, TypeScript, RFC 9381            | Technologies used, not partners                   |
| Capability grid (4)       | The four job families with status badges                                  | Randomness Live, the other three Planned          |
| Case-study list           | Example integrations (gaming, lotteries, allocation)                      | Each card labelled Example or Concept             |
| Pinned scroll tabs        | Request lifecycle: open, select, prove, verify, callback                  | Matches the program's actual state machine        |
| Services (3 cards)        | Protocol surfaces: programs, SDKs, node                                   | Statuses from the table above                     |
| Agent toolkit (3 cards)   | Developer toolkit: Rust SDK, TypeScript SDK, CLI                          | In development                                    |
| Bento reasons             | Why verify on-chain: proofs, stake, callbacks, open source                | Only enforced properties                          |
| Assistant feature         | Node operator console visual                                              | Illustration                                      |
| Integrations orbit        | Developer ecosystem around the Nuvex mark                                 | Tools and standards, not partners                 |
| Testimonials              | Omitted until real quotes exist                                           | No invented quotes                                |
| Counters (4)              | Protocol facts: 3 programs, 80-byte proof, 64-byte output, 4 job families | Facts from the code, not traction                 |
| CTA band                  | "Build on verifiable compute" with a large NUVEX word                     | Links to developers and the docs                  |

## Content data model

Content lives in `src/data/`, and components read from it.

- `navigation.ts`: navbar and footer trees, using the types in that file.
- `protocol.ts`: job families, lifecycle steps, capability statuses, and protocol facts.
- `blog.ts`: `{ slug, title, excerpt, date, author, category, image, content }`.
- `work.ts`: examples, each with a required `label: "Example" | "Concept" | "Demo" | "Coming soon"`.
- `ecosystem.ts`: tools and standards, each with an optional `href` to its official site.
- `testimonials.ts`: empty until real, attributable quotes exist.

## Assets

- `public/brand/`: the logo and wordmark already supplied (PNG). SVG versions are pending from the
  brand owner and must not be traced or approximated.
- `public/screenshots/`: Nuvex interface visuals are built as React components, so they stay true to the
  real data model. PNG exports may be added later.
- `public/images/`, `public/textures/`, `public/icons/`, `public/logos/`: created empty for later phases.
- `public/media/`: three Unsplash photographs already credited on the current home page. The brief
  prefers custom visuals for the hero, so these are reserved for blog and about pages.
