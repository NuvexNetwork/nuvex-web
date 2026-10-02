import Link from "next/link";

import { Article } from "@/components/Article";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Article kicker="Notes" title="Blog">
      <p>
        <Link href="/blog/milestone-0">Milestone 0: workspace initialization</Link>
      </p>
    </Article>
  );
}
