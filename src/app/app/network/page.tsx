import { ConsoleView } from "@/components/layout/ConsoleShell";
import { HeartbeatChart } from "@/components/protocol/visuals";
import { consoleViews } from "@/data/console";

const view = consoleViews.network;

export const metadata = { title: view.title, description: view.description };

export default function Page() {
  return (
    <ConsoleView view={view}>
      <HeartbeatChart />
    </ConsoleView>
  );
}
