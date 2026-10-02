import { Article } from "@/components/Article";

export const metadata = { title: "Developers" };

export default function Page() {
  return (
    <Article kicker="Nuvex" title="Developers">
      <p>
        Local checks are cargo test, cargo clippy, and pnpm test. Host tests do not produce SBF
        artifacts. anchor build does.
      </p>
      <p>
        Cluster URLs, program ids, and keys come from the environment. The programs do not embed a
        mainnet RPC.
      </p>
    </Article>
  );
}
