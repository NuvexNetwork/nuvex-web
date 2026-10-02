import { Article } from "@/components/Article";

export const metadata = { title: "Security" };

export default function Page() {
  return (
    <Article kicker="Nuvex" title="Security">
      <p>
        No independent audit has been performed. The threat model lists attacks the design must
        answer. Mitigations are not claimed for code that does not exist.
      </p>
      <p>
        Development program keypairs are gitignored. The public ids in Anchor.toml are local ids,
        and the mainnet deploy script refuses to run.
      </p>
    </Article>
  );
}
