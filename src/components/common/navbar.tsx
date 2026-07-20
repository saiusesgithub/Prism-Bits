"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/button";
import { GitHubIcon } from "@/components/common/github-icon";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  sectionId?: string;
};

const navItems: NavItem[] = [
  { href: "/docs", label: "Docs", sectionId: "features" },
  { href: "/components", label: "Components", sectionId: "components" },
  { href: "/showcase", label: "Showcase" },
];

export function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Handle scroll state (transparent initially, glassmorphism after 50px)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section Scroll-Spy for home page
  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionIds = ["hero", "components", "features"];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (pathname === "/" && item.sectionId) {
      const el = document.getElementById(item.sectionId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    }
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 transition-all duration-300">
      <div
        className={cn(
          "prismatic-border mx-auto w-full max-w-[920px] rounded-full transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-[hsl(var(--background)/0.80)] backdrop-blur-2xl shadow-[0_20px_60px_rgb(0_0_0/0.5),0_0_40px_hsl(var(--accent)/0.14)] border-white/10 [--prism-surface:hsl(var(--background)/0.82)]"
            : "bg-transparent backdrop-blur-md shadow-[0_12px_40px_rgb(0_0_0/0.2)] border-white/5 [--prism-surface:hsl(var(--background)/0.45)]",
        )}
      >
        <div className="flex h-16 items-center justify-between pl-5 pr-2.5 sm:pl-6 sm:pr-3">
          <Link
            href="/"
            className="rounded-full font-display text-lg font-normal leading-none tracking-normal text-white transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Prism Bits
          </Link>

          <nav
            aria-label="Main Navigation"
            onMouseLeave={() => setHovered(null)}
            className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
          >
            {navItems.map((item) => {
              const isRouteActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isSectionActive = pathname === "/" && item.sectionId === activeSection;
              const isActive = isSectionActive || (pathname !== "/" && isRouteActive);
              const showPill = hovered ? hovered === item.href : isActive;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  onMouseEnter={() => setHovered(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive || hovered === item.href ? "text-white" : "text-white/55 hover:text-white/85",
                  )}
                >
                  {showPill && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", bounce: 0.22, duration: 0.5 }}
                      className="absolute inset-0 rounded-full bg-white/[0.1] shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] border border-white/10"
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
              className="hidden md:inline-flex focus-visible:ring-2 focus-visible:ring-accent-2"
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
              className="inline-flex size-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 md:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="prismatic-border mx-auto mt-2 w-full max-w-[920px] rounded-3xl p-2.5 backdrop-blur-2xl md:hidden [--prism-surface:hsl(var(--background)/0.85)] shadow-2xl shadow-black/80"
          >
            {navItems.map((item) => {
              const isRouteActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isSectionActive = pathname === "/" && item.sectionId === activeSection;
              const isActive = isSectionActive || (pathname !== "/" && isRouteActive);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2",
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
