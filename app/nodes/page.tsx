import { Article } from "@/components/Article";

export const metadata = { title: "Node operators" };

export default function Page() {
  return (
    <Article kicker="Nuvex" title="Node operators">
      <p>
        The node process binds a health port and exports metrics at zero. It does not load a VRF
        secret or submit a fulfillment.
      </p>
      <p>
        Signing keys are not loaded. Do not point this process at a funded operator key and expect
        it to vote or fulfill.
      </p>
    </Article>
  );
}
