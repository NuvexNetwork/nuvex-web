import { ConsoleView } from "@/components/layout/ConsoleShell";
import { StakePanel } from "@/components/protocol/visuals";
import { consoleViews } from "@/data/console";

const view = consoleViews.rewards;

export const metadata = { title: view.title, description: view.description };

export default function Page() {
  return (
    <ConsoleView view={view}>
      <StakePanel />
    </ConsoleView>
  );
}
