"use client";

import type { MouseEventHandler } from "react";

type GlassCtaProps = {
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimaryClick?: MouseEventHandler<HTMLButtonElement>;
  onSecondaryClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function GlassCta({ primaryLabel, secondaryLabel, onPrimaryClick, onSecondaryClick }: GlassCtaProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={onPrimaryClick}
        className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-zinc-950 shadow-[0_14px_36px_rgb(0_0_0/0.35)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgb(0_0_0/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:translate-y-0"
      >
        {primaryLabel}
      </button>
      {secondaryLabel ? (
        <button
          type="button"
          onClick={onSecondaryClick}
          className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:translate-y-0"
        >
          {secondaryLabel}
        </button>
      ) : null}
    </div>
  );
}
