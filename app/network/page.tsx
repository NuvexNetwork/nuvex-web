import { Article } from "@/components/Article";

export const metadata = { title: "Network" };

export default function Page() {
  return (
    <Article kicker="Nuvex" title="Network">
      <p>
        Stake and heartbeats live on node accounts. This page does not read them. There is no stake
        pool and no weighted draw.
      </p>
      <p>
        A node can fulfill when it is active, meets the configured minimum, and its heartbeat is
        inside the configured window. A backend must not appoint a node in secret.
      </p>
    </Article>
  );
}
