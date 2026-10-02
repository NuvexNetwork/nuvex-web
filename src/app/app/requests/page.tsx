import { ConsoleView } from "@/components/layout/ConsoleShell";
import { RequestPanel } from "@/components/protocol/visuals";
import { consoleViews } from "@/data/console";

const view = consoleViews.requests;

export const metadata = { title: view.title, description: view.description };

export default function Page() {
  return (
    <ConsoleView view={view}>
      <RequestPanel />
    </ConsoleView>
  );
}
