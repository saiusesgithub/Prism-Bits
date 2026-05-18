import Link from "next/link";
import { Atom } from "lucide-react";
import { Container } from "@/components/common/container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3 text-white">
          <Atom className="size-6" />
          <span className="font-semibold">Prism Bits</span>
        </Link>
        <p className="text-sm text-muted">Elegant open-source UI bits you can copy, customize, and ship.</p>
      </Container>
    </footer>
  );
}
