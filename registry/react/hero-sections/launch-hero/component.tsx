"use client";

type LaunchHeroProps = {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

export default function LaunchHero({
  badge = "Now in beta",
  title = "Launch products people remember",
  subtitle = "A focused landing hero with a badge, a strong claim, and two clear paths forward.",
  primaryLabel = "Start free",
  secondaryLabel = "See the demo",
  onPrimaryClick,
  onSecondaryClick,
}: LaunchHeroProps) {
  return (
    <section className="w-full max-w-2xl text-center">
      <span className="inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200/80">
        {badge}
      </span>
      <h1 className="mt-6 text-balance text-4xl font-bold leading-tight text-white sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-7 text-white/60">{subtitle}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onPrimaryClick}
          className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-zinc-950 shadow-[0_14px_36px_rgb(0_0_0/0.35)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          {primaryLabel}
        </button>
        <button
          type="button"
          onClick={onSecondaryClick}
          className="rounded-2xl border border-white/15 bg-white/[0.07] px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          {secondaryLabel}
        </button>
      </div>
    </section>
  );
}
