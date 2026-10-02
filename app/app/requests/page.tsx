import { Article } from "@/components/Article";

export const metadata = { title: "Requests" };

export default function Page() {
  return (
    <Article kicker="Dashboard" title="Requests">
      <p>
        This page does not read chain state. A VRF request can be fulfilled on-chain by an eligible
        node. Nothing rendered here is that result.
      </p>
    </Article>
  );
}
