import type { LucideIcon } from 'lucide-react';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-purple-950/10">
      <div className="mb-5 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
        <Icon className="size-5 text-accent-2" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </article>
  );
}
