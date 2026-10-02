import { Article } from "@/components/Article";

export const metadata = { title: "Milestone 0" };

export default function Page() {
  return (
    <Article kicker="2 October 2026" title="Milestone 0: workspace initialization">
      <p>
        The repository now has the program crates, shared libraries, node skeleton, API, indexer
        schema, SDKs, and documentation. Protocol instructions are the next milestone.
      </p>
      <p>
        VRF algorithm selection and the request transition graph are open decisions. They are
        recorded as such, not filled in with a guess.
      </p>
    </Article>
  );
}
