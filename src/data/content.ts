/** Shared content model for long-form pages: posts, ecosystem examples and guides. */

export type PanelName =
  "request" | "nodes" | "verify" | "programs" | "heartbeat" | "stake" | "operator";

export type Block =
  | { kind: "text"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "code"; language: string; code: string }
  | { kind: "quote"; text: string; source: string }
  | { kind: "image"; src: string; alt: string; credit?: { label: string; href: string } }
  /** One of the protocol illustrations. Always captioned as an illustration. */
  | { kind: "panel"; panel: PanelName };

export type DocSection = {
  /** Anchor id, also used by the table of contents. */
  id: string;
  heading: string;
  blocks: Block[];
};
