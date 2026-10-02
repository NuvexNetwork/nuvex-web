import { describe, expect, it } from "vitest";

import { publicCluster } from "./cluster";

describe("publicCluster", () => {
  it("does not default to mainnet", () => {
    expect(publicCluster(undefined)).toBe("unconfigured");
    expect(publicCluster("")).toBe("unconfigured");
  });

  it("accepts only named clusters", () => {
    expect(publicCluster("devnet")).toBe("devnet");
    expect(publicCluster("https://api.mainnet-beta.solana.com")).toBe("invalid");
  });
});
