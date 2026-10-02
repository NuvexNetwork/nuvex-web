import { Article } from "@/components/Article";

export const metadata = { title: "Architecture" };

export default function Page() {
  return (
    <Article kicker="Nuvex" title="Architecture">
      <p>
        Three programs split the surface: oracle core, the node registry, and verification. Shared
        PDA seeds live in nuvex-common.
      </p>
      <p>
        Account layouts and the request transition graph are documented as decisions, not encoded as
        instructions yet. The transition graph is deliberately open. See the architecture decision
        records.
      </p>
    </Article>
  );
}
