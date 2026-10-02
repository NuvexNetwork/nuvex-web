import type { CapabilityStatus } from "./protocol";

/**
 * The real tokens from src/styles/globals.css, written out so the page can be
 * checked against the stylesheet. Every sample on the page is rendered with the
 * class named here, never with a restyled copy.
 */

export type TypeRow = {
  /** The class or element the sample uses. */
  name: string;
  className: string;
  sample: string;
  /** Size, line height, weight, and letter spacing or colour where it is set. */
  specs: string;
};

export const styleGuidePage = {
  title: "Style guide",
  accent: "— the tokens this site actually uses",
  lead: "Headings, type roles, colours, buttons, badges, the hairline cell and the motion primitives, rendered with the same components every page uses. Sizes are the desktop step; the heading scale shrinks at 992px, 768px and 480px.",
};

export const headingScale: TypeRow[] = [
  {
    name: "h1 / .t-hero",
    className: "t-hero",
    sample: "Verifiable compute",
    specs: "72px · 1.15 · 400 · −1.5px",
  },
  {
    name: "h2 / .t-section",
    className: "t-section",
    sample: "Verifiable compute",
    specs: "48px · 1.2 · 400",
  },
  {
    name: "h3 / .t-h3",
    className: "t-h3",
    sample: "Verifiable compute",
    specs: "36px · 1.1 · 500",
  },
  {
    name: "h4 / .t-h4",
    className: "t-h4",
    sample: "Verifiable compute",
    specs: "28px · 1.1 · 400",
  },
  {
    name: "h5 / .t-h5",
    className: "t-h5",
    sample: "Verifiable compute",
    specs: "24px · 1.1 · 400 · #ffffff",
  },
  {
    name: "h6 / .t-h6",
    className: "t-h6",
    sample: "Verifiable compute",
    specs: "20px · 1.2 · 400",
  },
];

export const textScale: TypeRow[] = [
  {
    name: ".t-body-lg",
    className: "t-body-lg",
    sample: "Long-form body copy, as the article and case templates set it.",
    specs: "18px · 1.3 · 400",
  },
  {
    name: "p / .t-body",
    className: "t-body",
    sample: "Default paragraph copy. Plain p is already this size and colour.",
    specs: "16px · 1.3 · 400 · #8f8f8f",
  },
  {
    name: ".t-small",
    className: "t-small",
    sample: "Captions, figure credits and row meta.",
    specs: "14px · 1.3 · 400",
  },
  {
    name: ".t-meta",
    className: "t-meta",
    sample: "Metadata beside a title.",
    specs: "14px · 1.3 · 400 · #8f8f8f",
  },
  {
    name: ".t-eyebrow",
    className: "t-eyebrow",
    sample: "Section eyebrow",
    specs: "14px · 1.3 · uppercase · #8f8f8f",
  },
  {
    name: ".gray",
    className: "gray t-h4",
    sample: "The trailing clause of a heading.",
    specs: "#ffffff80, applied inside a heading",
  },
];

export type Swatch = { token: string; hex: string; use: string };

export const neutralSwatches: Swatch[] = [
  { token: "--n1 / bg", hex: "#000000", use: "Page background" },
  { token: "--n2 / surface, line", hex: "#181818", use: "Surfaces and hairlines" },
  { token: "--n3 / line-strong", hex: "#3a3a3a", use: "Strong lines, nav pill" },
  { token: "--n4 / subtle", hex: "#707070", use: "Captions and markers" },
  { token: "--n5 / muted", hex: "#8f8f8f", use: "Body text" },
  { token: "--n6 / fg-soft", hex: "#dfdfdf", use: "Soft white labels" },
  { token: "--n7", hex: "#efefef", use: "Reserved near-white" },
  { token: "--n8 / fg", hex: "#ffffff", use: "Headings and buttons" },
];

export const accentSwatches: Swatch[] = [
  { token: "--accent / primary", hex: "#265ff3", use: "The single accent" },
  { token: "--accent-soft / primary-soft", hex: "#638efd", use: "Hover and focus ring" },
  { token: "--positive", hex: "#3ecf8e", use: "Live status" },
  { token: "--status-research", hex: "#b9a4ff", use: "Research status" },
  { token: "--gray", hex: "#ffffff80", use: "Heading accent clause" },
];

export const buttonVariants = [
  { variant: "primary", label: "Primary button", note: "White pill, blue halves on hover" },
  { variant: "nav", label: "Nav button", note: "Grey pill used in the navbar" },
  { variant: "text", label: "Text button", note: "Plain white label beside a primary" },
] as const;

export const statusStates: { status: CapabilityStatus; use: string }[] = [
  { status: "live", use: "On-chain VRF verification, the registry, stake and heartbeat accounts" },
  { status: "in-development", use: "Work with code in the tree that does not complete the path" },
  {
    status: "planned",
    use: "Fees, rewards, slashing, data and price feeds, the indexer and the API",
  },
  { status: "research", use: "AI inference, which has no runtime" },
];

export const cellNotes = [
  {
    title: "Hairline frame",
    body: "Every cell carries a 1px #181818 outline and four 11px corner dots that sit over the grid line.",
  },
  {
    title: "Shared borders",
    body: "CellGrid is a zero-gap grid with a 0.5px border, so adjacent cells share one line.",
  },
  {
    title: "cell-hover",
    body: "Adding cell-hover turns the frame blue on hover or focus inside the cell. This cell has it.",
  },
];

export const motionNotes = [
  { name: "TitleReveal", body: "Words rise out of a mask, 0.04s apart." },
  { name: "GroupReveal", body: "Each direct child fades up 75px, staggered." },
  { name: "SlideUp", body: "One block fades up 50px when it enters the viewport." },
  { name: "MaskUp", body: "Content rises out of a mask, used for buttons and short copy." },
  { name: "Counter", body: "Counts from zero once over two seconds, at 85% of the viewport." },
  { name: "RollText", body: "Each character rolls up on hover of the nearest roll-trigger." },
];
