import { GitBranch, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";

const navItems = [
  { href: "/docs", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/showcase", label: "Showcase" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-lg shadow-purple-950/20">
            <Sparkles className="size-4 text-accent-2" />
          </span>
          <span className="text-sm font-semibold text-foreground sm:text-base">Prism Bits</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="https://github.com" variant="secondary" size="md" aria-label="Prism Bits on GitHub">
          <GitBranch className="size-4" />
          <span className="hidden sm:inline">GitHub</span>
        </Button>
      </Container>
    </header>
  );
}
