import { Atom, Copy, Navigation, Sparkles } from "lucide-react";

type ComponentPreviewProps = {
  slug: string;
};

export function ComponentPreview({ slug }: ComponentPreviewProps) {
  if (slug === "glass-cta") {
    return (
      <div className="flex h-full items-center justify-center gap-3 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.28),transparent_16rem),linear-gradient(135deg,#080812,#111827)]">
        <button className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black shadow-xl">Get started</button>
        <button className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur">Preview</button>
      </div>
    );
  }

  if (slug === "registry-card") {
    return (
      <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#080812,#141022)] p-6">
        <div className="w-full max-w-56 rounded-2xl border border-white/12 bg-white/[0.06] p-4 shadow-2xl shadow-purple-950/20">
          <div className="flex items-center justify-between">
            <div className="h-8 w-8 rounded-xl bg-cyan-300/20" />
            <Copy className="size-4 text-white/55" />
          </div>
          <div className="mt-8 h-3 w-24 rounded-full bg-white/70" />
          <div className="mt-3 h-2 w-32 rounded-full bg-white/20" />
          <div className="mt-5 flex gap-2">
            <span className="h-6 w-14 rounded-full bg-violet-300/20" />
            <span className="h-6 w-16 rounded-full bg-cyan-300/20" />
          </div>
        </div>
      </div>
    );
  }

  if (slug === "floating-nav") {
    return (
      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_70%_20%,hsl(var(--accent-2)/0.25),transparent_16rem),linear-gradient(135deg,#080812,#101827)] p-6">
        <div className="flex h-14 w-full max-w-72 items-center justify-between rounded-2xl border border-white/12 bg-white/[0.08] px-4 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-2">
            <Atom className="size-5 text-white" />
            <span className="h-2.5 w-14 rounded-full bg-white/70" />
          </div>
          <Navigation className="size-4 text-cyan-200/70" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-[radial-gradient(circle_at_25%_32%,#9f5cff,transparent_28%),radial-gradient(circle_at_72%_42%,#41d9ff,transparent_34%),radial-gradient(circle_at_50%_80%,#ff4fb8,transparent_24%),linear-gradient(135deg,#050611,#111827)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="relative flex h-full items-center justify-center">
        <Sparkles className="size-16 text-white drop-shadow-[0_0_32px_rgb(103_232_249/0.65)]" />
      </div>
    </div>
  );
}
