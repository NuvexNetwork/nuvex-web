import { ConsoleView } from "@/components/layout/ConsoleShell";
import { VerifyPanel } from "@/components/protocol/visuals";
import { consoleViews } from "@/data/console";

const view = consoleViews.models;

export const metadata = { title: view.title, description: view.description };

export default function Page() {
  return (
    <ConsoleView view={view}>
      <VerifyPanel />
    </ConsoleView>
  );
}
