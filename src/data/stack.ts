/**
 * The protocol stack only: programs, SDKs, proofs, and the licence.
 * Website tooling (Next.js, React, Tailwind) is not listed here.
 */
export type StackItem = {
  name: string;
  src?: string;
  href: string;
};

export const stackItems: StackItem[] = [
  { name: "Solana", src: "/logos/solana.svg", href: "https://solana.com" },
  { name: "Anchor", src: "/logos/anchor.svg", href: "https://www.anchor-lang.com" },
  { name: "Rust", src: "/logos/rust.svg", href: "https://www.rust-lang.org" },
  { name: "TypeScript", src: "/logos/typescript.svg", href: "https://www.typescriptlang.org" },
  { name: "LiteSVM", href: "https://github.com/LiteSVM/litesvm" },
  { name: "RFC 9381", href: "https://www.rfc-editor.org/rfc/rfc9381" },
  { name: "Ed25519", href: "https://ed25519.cr.yp.to" },
  { name: "solana-ecvrf", href: "https://crates.io/crates/solana-ecvrf" },
  {
    name: "Apache-2.0",
    src: "/logos/apache.svg",
    href: "https://www.apache.org/licenses/LICENSE-2.0",
  },
];

export const stackCaption = "Built with open tools and standards";
