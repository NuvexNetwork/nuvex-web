import { Article } from "@/components/Article";

export default function HomePage() {
  return (
    <Article kicker="Verifiable compute" title="A job-agnostic oracle for Solana">
      <p>
        Nuvex is a protocol for requesting randomness, external data, and later verifiable
        computation. The on-chain surface is one request abstraction, not a randomness-only
        instruction.
      </p>
      <p>
        A VRF request can be opened, cancelled, expired, or fulfilled on-chain by a node that locks
        stake and sends a heartbeat. This site does not read chain state or charge a fee. No result
        on this site is an oracle output.
      </p>
    </Article>
  );
}
