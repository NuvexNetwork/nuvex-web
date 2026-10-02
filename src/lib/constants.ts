function optionalUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export const SITE_NAME = "Nuvex Network";
export const SITE_TITLE = "Nuvex Network";
export const SITE_DESCRIPTION =
  "Nuvex is a Solana-native verifiable compute and oracle protocol. VRF requests are verified on-chain today; data, computation, and inference jobs are planned.";

export const SITE_URL = optionalUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://nuvex.space";

export const GITHUB_ORG_URL = "https://github.com/NuvexNetwork";
export const GITHUB_PROTOCOL_URL = `${GITHUB_ORG_URL}/nuvex`;
export const GITHUB_DOCS_URL = `${GITHUB_ORG_URL}/nuvex-docs`;
export const GITHUB_WEB_URL = `${GITHUB_ORG_URL}/nuvex-web`;
export const GITHUB_SERVICES_URL = `${GITHUB_ORG_URL}/nuvex-services`;

export const DOCS_URL = optionalUrl(process.env.NEXT_PUBLIC_DOCS_URL) ?? "https://docs.nuvex.space";

export const X_URL = optionalUrl(process.env.NEXT_PUBLIC_X_URL) ?? "https://x.com/nuvexnetwork";
export const DISCORD_URL = optionalUrl(process.env.NEXT_PUBLIC_DISCORD_URL);

export const PROTOCOL_MILESTONE = "Milestone 3";
