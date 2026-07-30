"use client";

import { useState } from "react";

type FloatingNavProps = {
  brand?: string;
  links?: string[];
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export default function FloatingNav({
  brand = "Prism",
  links = ["Home", "Components", "Docs"],
  ctaLabel = "Get started",
  onCtaClick,
}: FloatingNavProps) {
  const [active, setActive] = useState(links[0]);

  return (
    <nav className="flex w-full max-w-xl items-center justify-between gap-3 rounded-2xl border border-white/12 bg-white/[0.07] py-2 pl-5 pr-2 shadow-2xl shadow-black/40 backdrop-blur">
      <span className="text-sm font-bold tracking-wide text-white">{brand}</span>
      <div className="hidden items-center gap-1 sm:flex">
        {links.map((link) => (
          <button
            key={link}
            type="button"
            onClick={() => setActive(link)}
            aria-current={active === link ? "page" : undefined}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
              active === link ? "bg-white/[0.12] text-white" : "text-white/55 hover:text-white"
            }`}
          >
            {link}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onCtaClick}
        className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        {ctaLabel}
      </button>
    </nav>
  );
}
