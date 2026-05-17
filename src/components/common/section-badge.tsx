import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionBadgeProps = React.HTMLAttributes<HTMLDivElement>;

export function SectionBadge({ className, children, ...props }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-accent-2",
        className,
      )}
      {...props}
    >
      <Sparkle className="size-3" />
      {children}
    </div>
  );
}
