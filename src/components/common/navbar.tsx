"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/button";
import { GitHubIcon } from "@/components/common/github-icon";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/docs", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/showcase", label: "Showcase" },
];

export function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div
        className={cn(
          "prismatic-border mx-auto w-full max-w-[920px] rounded-full backdrop-blur-2xl transition-shadow duration-300",
          scrolled
            ? "shadow-[0_20px_60px_rgb(0_0_0/0.5),0_0_40px_hsl(var(--accent)/0.14)] [--prism-surface:hsl(var(--background)/0.82)]"
            : "shadow-[0_24px_70px_rgb(0_0_0/0.34)] [--prism-surface:hsl(var(--background)/0.55)]",
        )}
      >
        <div className="flex h-16 items-center justify-between pl-3 pr-2.5 sm:pl-4 sm:pr-3">
          <Link href="/" className="group flex items-center gap-2.5 text-white">
            <span className="relative">
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.55),transparent_70%)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
              <Image
                src="/prism-bits-icon.png?v=2"
                alt="Prism Bits"
                width={44}
                height={44}
                className="relative size-11 object-contain transition-transform duration-300 group-hover:rotate-[-10deg] group-hover:scale-110"
                priority
                unoptimized
              />
            </span>
            <span className="font-display text-lg font-normal leading-none tracking-normal">Prism Bits</span>
          </Link>

          <nav
            onMouseLeave={() => setHovered(null)}
            className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const showPill = hovered ? hovered === item.href : isActive;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHovered(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200",
                    isActive || hovered === item.href ? "text-white" : "text-white/55",
                  )}
                >
                  {showPill && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", bounce: 0.22, duration: 0.5 }}
                      className="absolute inset-0 rounded-full bg-white/[0.1] shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href="https://github.com/saiusesgithub/Prism-Bits"
              target="_blank"
              rel="noreferrer"
              size="sm"
              className="hidden md:inline-flex"
              aria-label="Prism Bits on GitHub"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white md:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="prismatic-border mx-auto mt-2 w-full max-w-[920px] rounded-3xl p-2.5 backdrop-blur-2xl md:hidden [--prism-surface:hsl(var(--background)/0.85)]"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                    isActive ? "bg-white/[0.1] text-white" : "text-white/60 hover:bg-white/[0.06] hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button
              href="https://github.com/saiusesgithub/Prism-Bits"
              target="_blank"
              rel="noreferrer"
              size="md"
              className="mt-2 w-full"
              aria-label="Prism Bits on GitHub"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
