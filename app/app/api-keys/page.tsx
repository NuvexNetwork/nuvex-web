import { Article } from "@/components/Article";
import { WalletPanel } from "@/components/WalletPanel";

export const metadata = { title: "API keys" };

export default function Page() {
  return (
    <Article kicker="Dashboard" title="API keys">
      <p>Nuvex does not issue centralized API credentials. Chain identity is the wallet.</p>
      <WalletPanel />
    </Article>
  );
}
