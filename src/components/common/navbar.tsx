import Image from "next/image";
import { GitBranch } from "lucide-react";
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
      <div className="mx-auto flex h-[70px] w-full max-w-[900px] items-center justify-between rounded-[22px] border border-white/[0.1] bg-[linear-gradient(135deg,rgb(255_255_255/0.11),rgb(255_255_255/0.055))] px-3.5 shadow-[0_24px_70px_rgb(0_0_0/0.34)] backdrop-blur-2xl sm:px-5">
        <Link href="/" className="group flex items-center gap-3 text-white">
          <Image
            src="/prism-bits-icon.png?v=2"
            alt="Prism Bits"
            width={48}
            height={48}
            className="size-12 object-contain"
            priority
            unoptimized
          />
          <span className="font-display text-[19px] font-normal leading-none tracking-normal">Prism Bits</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-base font-medium text-white/52 transition duration-200 hover:-translate-y-0.5 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="https://github.com/saiusesgithub/Prism-Bits" size="md" className="!text-zinc-950" aria-label="Prism Bits on GitHub">
          <GitBranch className="size-4" />
          GitHub
        </Button>
      </div>
    </header>
  );
}
