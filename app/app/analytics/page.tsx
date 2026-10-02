import { Article } from "@/components/Article";

export const metadata = { title: "Analytics" };

export default function Page() {
  return (
    <Article kicker="Dashboard" title="Analytics">
      <p>Latency and throughput charts are omitted until there is a measurement.</p>
    </Article>
  );
}
