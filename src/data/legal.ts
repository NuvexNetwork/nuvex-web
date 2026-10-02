import type { LegalSection } from "@/components/content/LegalPage";
import { DOCS_URL, GITHUB_ORG_URL, GITHUB_PROTOCOL_URL } from "@/lib/constants";

import { mediaList } from "./media";

/**
 * The repository records no calendar dates for its milestones, so these pages are
 * stamped with the milestone they describe instead of an invented date.
 */
export const legalUpdated = "Milestone 3";

export const privacy: { title: string; sections: LegalSection[] } = {
  title: "Privacy",
  sections: [
    {
      paragraphs: [
        "This page describes this website, nuvex-web, and nothing else. It is a statically rendered Next.js site. It has no accounts, no login, no newsletter and no backend that stores what a visitor does, so there is no profile of you to keep, sell or hand over.",
        "Nuvex tracks milestones rather than dates, so the stamp above is the milestone this text was written against rather than a calendar revision.",
      ],
    },
    {
      heading: "What this site collects",
      paragraphs: [
        "Nothing. The pages are rendered ahead of time and served as files. There is no analytics script, no advertising pixel, no tag manager, no session replay and no error-reporting service in the source.",
        "The site sets no cookies, and it writes nothing to local storage or session storage. There is no consent banner because there is nothing to consent to.",
      ],
      list: [
        "One route handler exists, /api/health. It returns a fixed JSON object and reads nothing from the request.",
        "Smooth scrolling and the page animations run entirely in your browser and report nowhere.",
        "The repository configures no host, CDN or log pipeline. Wherever a copy of this site is served from, that host's own request logs are outside this repository and this page cannot speak for them.",
      ],
    },
    {
      heading: "The contact form",
      paragraphs: [
        "The contact page has no mailbox behind it. The form composes a prefilled GitHub issue link in your own browser from the fields you typed, and the button opens that link in a new tab. You post the issue yourself, on GitHub, under your own account.",
        "Because the composing happens locally, nothing you type is transmitted to this site, and nothing is stored if you close the tab instead of submitting. Once you do post an issue, it is public and it is governed by GitHub's terms and privacy policy rather than this page. A suspected vulnerability belongs in the repository's private advisory form instead of a public issue.",
      ],
    },
    {
      heading: "Fonts, images and other requests",
      paragraphs: [
        "The typeface is Inter Tight, loaded through next/font. The font files are fetched at build time and served from this site's own origin, so viewing a page makes no request to a third-party font host.",
        "The photographs are files in this repository, served from the same origin through next/image. No image CDN, no external avatar service and no embedded video or map is used.",
      ],
    },
    {
      heading: "Links that leave this site",
      paragraphs: [
        "Links to GitHub, to the documentation, and to any social account that has been configured for a deployment open in a new tab. Once you follow one, you are on that service and its own privacy policy applies. This site passes no identifier along with the link.",
      ],
      list: [
        `Source repositories: ${GITHUB_ORG_URL}`,
        `Documentation: ${DOCS_URL}`,
        "Social accounts appear in the footer only when their real URLs are configured, and they are absent otherwise.",
      ],
    },
    {
      heading: "The console and wallets",
      paragraphs: [
        "The console pages under /app are illustrations of the protocol surface. They read no chain state and submit no transactions.",
        "The wallet panel lists the wallets your browser has registered through the Wallet Standard. That detection happens in the browser, the list is not sent anywhere, and Nuvex requests no signature and no connection approval in this milestone. A detected wallet is not a protocol account.",
      ],
    },
    {
      heading: "Changes and questions",
      paragraphs: [
        "If a later milestone adds analytics, a mailbox or an account system, this page has to change in the same pull request that adds it. Until then, treat a claim here as checkable against the source.",
        `Questions about this page belong in an issue on ${GITHUB_PROTOCOL_URL}.`,
      ],
    },
  ],
};

export const terms: { title: string; sections: LegalSection[] } = {
  title: "Terms",
  sections: [
    {
      paragraphs: [
        "These terms cover this website and the Nuvex source code it describes. They are written to be accurate about an unfinished protocol rather than to be reassuring.",
      ],
    },
    {
      heading: "The software is Apache-2.0",
      paragraphs: [
        "The protocol repository is licensed under the Apache License, Version 2.0. You may use, modify and redistribute it under that licence, including commercially, provided you keep the licence and attribution notices and state your changes.",
        "The licence grants no trademark rights. Apache-2.0 also disclaims warranties and limits liability, and nothing on this site overrides those sections. The licence text in the repository is the operative version; the summary here is not.",
      ],
    },
    {
      heading: "Nothing is deployed",
      paragraphs: [
        "No Nuvex program is deployed to Solana mainnet. The deployment script in the repository exits before it sends a transaction, and the program ids in Anchor.toml are local development ids.",
        "There is no mainnet address, no token, no sale and no staking programme that a visitor can join from this site. Anyone presenting one as official is not doing so on the project's behalf.",
      ],
    },
    {
      heading: "Not advice and not an offer",
      paragraphs: [
        "Nothing on this site is financial, investment, legal or tax advice, and nothing here is an offer or solicitation to buy or sell anything. Fee roles exist in the design and no basis points are set, so any number you see about economics is a role, not a rate.",
      ],
    },
    {
      heading: "The protocol is unaudited",
      paragraphs: [
        "No independent audit of Nuvex has been commissioned. The audit scope document in the repository is a scope a future auditor would be asked to cover; it is not a report.",
        "The VRF verifier is solana-ecvrf 0.0.1, and no audit report of that crate was found either. ADR 0004 records that absence as part of the decision.",
      ],
      list: [
        "A known weakness is stated in the README: an operator who funds several keys can choose among those outputs. Each extra key costs the configured minimum stake, and a minimum of zero does not resist that.",
        "Challenge, reject and fail transitions are forbidden by ADR 0001 until they are designed.",
        "If you run this code, you do so at your own risk, and you should read the security documents first.",
      ],
    },
    {
      heading: "Illustrations are not chain data",
      paragraphs: [
        "Every console view, panel, chart and request feed on this site is a drawing of the protocol surface. The site reads no cluster and holds no indexer, and each illustration says so where it appears.",
        "Do not treat a figure on this site as the state of an account. Solana account state is authoritative, and the API, indexer and dashboard are explicitly not sources of protocol truth.",
      ],
    },
    {
      heading: "Links and third parties",
      paragraphs: [
        "Links to GitHub, the documentation and any configured social account are provided for convenience. Those services set their own terms, and the project does not control what they publish or how they behave.",
      ],
    },
  ],
};

export type DependencyLicence = {
  name: string;
  version: string;
  licence: string;
  note: string;
};

export const licences = {
  title: "Licences",
  accent: "and credits",
  lead: "The protocol is Apache-2.0. This website is built from a short list of open-source packages, one typeface and a set of photographs. The versions and licence fields below were read from the installed package metadata in node_modules rather than from memory.",
  protocol: {
    heading: "The protocol",
    body: "Nuvex is licensed under the Apache License, Version 2.0, January 2004. The licence file sits at the root of the protocol repository and covers the programs, the shared crates, both SDKs, the CLI and the node.",
    link: { label: "Apache-2.0 licence text", href: `${GITHUB_PROTOCOL_URL}/blob/main/LICENSE` },
  },
  runtime: {
    heading: "Website runtime dependencies",
    body: "These are the packages this site ships or renders with, exactly as package.json lists them.",
    items: [
      {
        name: "next",
        version: "16.3.8",
        licence: "MIT",
        note: "The App Router framework, the image component and next/font.",
      },
      {
        name: "react",
        version: "19.3.0",
        licence: "MIT",
        note: "The component model every page is written against.",
      },
      {
        name: "react-dom",
        version: "19.3.0",
        licence: "MIT",
        note: "The renderer that pairs with React on the client.",
      },
      {
        name: "framer-motion",
        version: "14.0.0",
        licence: "MIT",
        note: "The reveal, mask and counter animations, all of which respect reduced motion.",
      },
      {
        name: "lenis",
        version: "1.3.26",
        licence: "MIT",
        note: "Smooth scrolling, including its stylesheet.",
      },
      {
        name: "lucide-react",
        version: "1.50.0",
        licence: "ISC",
        note: "Every icon on the site. There is no GitHub brand icon, so GitBranch stands in for it.",
      },
      {
        name: "@wallet-standard/react",
        version: "1.0.3",
        licence: "Apache-2.0",
        note: "Wallet detection in the console panel. No signature is requested.",
      },
      {
        name: "tailwindcss",
        version: "4.3.3",
        licence: "MIT",
        note: "A build-time dependency. It compiles the design tokens into the stylesheet and ships no runtime.",
      },
    ] satisfies DependencyLicence[],
  },
  font: {
    heading: "Typeface",
    body: "Inter Tight, under the SIL Open Font License 1.1, which is the licence Google Fonts publishes it under. It is loaded through next/font, which fetches the files at build time and serves them from this site's own origin, so no request reaches a third-party font host.",
    link: { label: "SIL Open Font License 1.1", href: "https://openfontlicense.org/" },
  },
  photos: {
    heading: "Photographs",
    body: "These photographs are used on the site, all from Unsplash and all stored in this repository. Credits live on this page.",
    items: mediaList.map((photo) => ({
      file: photo.src,
      alt: photo.alt,
      credit: photo.credit,
    })),
  },
  assets: {
    heading: "Design and brand assets",
    body: "The layout of this site is a re-implementation of a reference design in our own code. No logo, image, font file, icon or other asset from the reference site is used here. The only brand assets in this repository are the Nuvex mark and wordmark, which belong to the project, and the Apache-2.0 licence grants no trademark rights in them.",
  },
  standards: {
    heading: "Standards and specifications",
    body: "RFC 9381 defines the ECVRF construction the verification program checks, and SIMD-0512 defines the sol_sha512 syscall it depends on. Both are referenced by ADR 0004 and neither is a dependency of this website.",
  },
};
