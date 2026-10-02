import type { ReactNode } from "react";

export function Article({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">{kicker}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h1>
      <div className="mt-8 space-y-4 text-lg leading-8 text-stone-700">{children}</div>
    </article>
  );
}
