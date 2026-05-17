import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <article className="group rounded-3xl border border-white/10 bg-card/70 p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]">
      <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-accent-2">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-7 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </article>
  );
}
