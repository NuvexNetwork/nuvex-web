import { DISCORD_URL, DOCS_URL, GITHUB_ORG_URL, GITHUB_PROTOCOL_URL, X_URL } from "@/lib/constants";

import type { CapabilityStatus } from "./protocol";

export type NavIcon = "dice" | "layers" | "network" | "shield";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  status?: CapabilityStatus;
  icon?: NavIcon;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "panel"; label: string; caption: string; links: NavLink[] };

export const primaryNav: NavItem[] = [
  { kind: "link", label: "Home", href: "/" },
  { kind: "link", label: "About", href: "/about" },
  {
    kind: "panel",
    label: "Protocol",
    caption: "Key features",
    links: [
      {
        label: "Verifiable randomness",
        href: "/technology",
        description: "ECVRF proofs checked on-chain.",
        status: "live",
        icon: "dice",
      },
      {
        label: "Architecture",
        href: "/architecture",
        description: "Programs, accounts, callbacks.",
        icon: "layers",
      },
      {
        label: "Node network",
        href: "/network",
        description: "Stake, heartbeat, fulfil.",
        status: "live",
        icon: "network",
      },
      {
        label: "Security",
        href: "/security",
        description: "Threat model and open decisions.",
        icon: "shield",
      },
    ],
  },
  { kind: "link", label: "Developers", href: "/developers" },
  { kind: "link", label: "Ecosystem", href: "/ecosystem" },
  { kind: "link", label: "Economics", href: "/economics" },
  { kind: "link", label: "Blog", href: "/blog" },
];

export const navCta: NavLink = { label: "Read the docs", href: DOCS_URL };

/** The collapsed menu lists every page, in groups, like the reference's tablet menu. */
export const mobileNavGroups: NavGroup[] = [
  {
    title: "Menu",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Randomness", href: "/technology" },
      { label: "Architecture", href: "/architecture" },
      { label: "Network", href: "/network" },
      { label: "Node operators", href: "/nodes" },
      { label: "Security", href: "/security" },
      { label: "Developers", href: "/developers" },
      { label: "Ecosystem", href: "/ecosystem" },
      { label: "Economics", href: "/economics" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Contribute", href: "/contribute" },
      { label: "Changelog", href: "/changelog" },
      { label: "Style guide", href: "/style-guide" },
      { label: "Console", href: "/app/dashboard" },
      { label: "GitHub", href: GITHUB_ORG_URL },
    ],
  },
];

const socialLinks: NavLink[] = [
  { label: "GitHub", href: GITHUB_ORG_URL },
  ...(X_URL ? [{ label: "X", href: X_URL }] : []),
  ...(DISCORD_URL ? [{ label: "Discord", href: DISCORD_URL }] : []),
];

export const footerGroups: NavGroup[] = [
  {
    title: "Protocol",
    links: [
      { label: "Randomness", href: "/technology" },
      { label: "Architecture", href: "/architecture" },
      { label: "Security", href: "/security" },
      { label: "Economics", href: "/economics" },
    ],
  },
  {
    title: "Network",
    links: [
      { label: "Network", href: "/network" },
      { label: "Node operators", href: "/nodes" },
      { label: "Ecosystem", href: "/ecosystem" },
      { label: "Console", href: "/app/dashboard" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Developers", href: "/developers" },
      { label: "Documentation", href: "/docs" },
      { label: "Contribute", href: "/contribute" },
      { label: "Protocol source", href: GITHUB_PROTOCOL_URL },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Utility",
    links: [
      { label: "Style guide", href: "/style-guide" },
      { label: "Licences", href: "/licenses" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  { title: "Platform", links: socialLinks },
];

/** Sidebar of the console routes under /app. */
export const consoleNav: NavGroup[] = [
  {
    title: "Protocol",
    links: [
      { label: "Overview", href: "/app/dashboard" },
      { label: "Requests", href: "/app/requests" },
      { label: "Nodes", href: "/app/nodes" },
      { label: "Network", href: "/app/network" },
    ],
  },
  {
    title: "Operator",
    links: [
      { label: "Rewards", href: "/app/rewards" },
      { label: "Analytics", href: "/app/analytics" },
    ],
  },
  {
    title: "Access",
    links: [
      { label: "Keys", href: "/app/api-keys" },
      { label: "Models", href: "/app/models" },
    ],
  },
];

export const docsUrl = DOCS_URL;
