import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionBadgeProps = HTMLAttributes<HTMLDivElement>;

export function SectionBadge({ className, ...props }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "prismatic-border inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-1 text-base font-medium tracking-normal text-white/72 shadow-[0_10px_30px_rgb(0_0_0/0.3)] backdrop-blur-md [--prism-surface:hsl(var(--background)/0.62)]",
        className,
      )}
      {...props}
    />
  );
}
