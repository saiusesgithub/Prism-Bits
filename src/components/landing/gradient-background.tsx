import Prism from "@/components/registry/Prism";

export function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="prism-grid absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,hsl(var(--accent)/0.18),transparent_30rem),radial-gradient(circle_at_78%_24%,hsl(var(--accent-2)/0.16),transparent_32rem),radial-gradient(circle_at_50%_70%,hsl(var(--accent-3)/0.11),transparent_30rem)]" />
      <div className="absolute inset-x-0 top-10 h-[760px] opacity-80">
        <Prism
          animationType="rotate"
          timeScale={0.45}
          height={3.5}
          baseWidth={5.5}
          scale={3.8}
          hueShift={0.18}
          colorFrequency={1.15}
          noise={0.36}
          glow={1.12}
          bloom={1.25}
          suspendWhenOffscreen
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-background/72 to-background" />
    </div>
  );
}
