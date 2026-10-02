import { Article } from "@/components/Article";
import { WalletPanel } from "@/components/WalletPanel";

export const metadata = { title: "Nodes" };

export default function Page() {
  return (
    <Article kicker="Dashboard" title="Nodes">
      <p>This page does not list registered nodes or their stake. Nothing here is chain state.</p>
      <WalletPanel />
    </Article>
  );
}
