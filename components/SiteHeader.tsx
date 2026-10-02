import Link from "next/link";

const links = [
  ["Technology", "/technology"],
  ["Architecture", "/architecture"],
  ["Network", "/network"],
  ["Developers", "/developers"],
  ["Nodes", "/nodes"],
  ["Security", "/security"],
  ["Dashboard", "/app/dashboard"],
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-stone-300 bg-[#f6f4ef]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Nuvex
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm text-stone-700">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
