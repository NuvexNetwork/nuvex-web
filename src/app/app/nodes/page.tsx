import { ConsoleView } from "@/components/layout/ConsoleShell";
import { NodesPanel } from "@/components/protocol/visuals";
import { WalletPanel } from "@/components/WalletPanel";
import { consoleViews } from "@/data/console";

const view = consoleViews.nodes;

export const metadata = { title: view.title, description: view.description };

export default function Page() {
  return (
    <ConsoleView view={view}>
      <NodesPanel />
      <WalletPanel />
    </ConsoleView>
  );
}
