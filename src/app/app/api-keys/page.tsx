import { ConsoleView } from "@/components/layout/ConsoleShell";
import { WalletPanel } from "@/components/WalletPanel";
import { consoleViews } from "@/data/console";

const view = consoleViews["api-keys"];

export const metadata = { title: view.title, description: view.description };

export default function Page() {
  return (
    <ConsoleView view={view}>
      <WalletPanel />
    </ConsoleView>
  );
}
