import { Article } from "@/components/Article";

export const metadata = { title: "Ecosystem" };

export default function Page() {
  return (
    <Article kicker="Nuvex" title="Ecosystem">
      <p>
        Integrators will use a job-agnostic request and a callback into their own program. Client
        libraries hide PDA derivation.
      </p>
      <p>
        No partner integration is live. The TypeScript and Rust SDKs refuse to submit a request.
      </p>
    </Article>
  );
}
