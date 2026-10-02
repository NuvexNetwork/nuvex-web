import { Article } from "@/components/Article";

export const metadata = { title: "Technology" };

export default function Page() {
  return (
    <Article kicker="Nuvex" title="Technology">
      <p>
        On-chain programs create requests, hold protocol state, verify proofs, and execute
        callbacks. They do not call HTTP, databases, or model runtimes.
      </p>
      <p>
        Oracle nodes, the indexer, and the API live off-chain. The API can describe indexed state.
        It cannot finalize a result.
      </p>
    </Article>
  );
}
