import { Article } from "@/components/Article";
import { WalletPanel } from "@/components/WalletPanel";

export const metadata = { title: "Overview" };

export default function Page() {
  return (
    <Article kicker="Dashboard" title="Overview">
      <p>No chain data is loaded. Indexed views arrive with the indexer in Milestone 4.</p>
      <WalletPanel />
    </Article>
  );
}
