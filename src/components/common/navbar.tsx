import { Atom } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/common/button";

const navItems = [
  { href: "/docs", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/showcase", label: "Showcase" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-[18px] z-50 px-4">
      <div className="mx-auto flex h-[70px] w-full max-w-[860px] items-center justify-between rounded-[22px] border border-white/[0.09] bg-white/[0.08] px-3.5 shadow-[0_24px_70px_rgb(0_0_0/0.34)] backdrop-blur-2xl sm:px-5">
        <Link href="/" className="flex items-center gap-3 text-white">
          <Atom className="size-8 stroke-[2.4]" />
          <span className="text-[22px] font-semibold leading-none tracking-normal">Prism Bits</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-base font-medium text-white/48 transition hover:text-white/78">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="https://github.com" size="md" className="!text-zinc-950" aria-label="Prism Bits on GitHub">
          GitHub
        </Button>
      </div>
    </header>
  );
}
