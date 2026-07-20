import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <article
      className={cn(
        "group relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-purple-950/10 backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent-2/40 hover:shadow-purple-500/15 dark:bg-white/[0.035]",
        className,
      )}
    >
      <div className="mb-5 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] transition-transform duration-300 group-hover:scale-110 group-hover:border-accent-2/50 group-hover:bg-accent-2/10">
        <Icon className="size-5 text-accent-2 transition-colors duration-300 group-hover:text-white" />
      </div>
      <h3 className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-accent-2">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </article>
  );
}
