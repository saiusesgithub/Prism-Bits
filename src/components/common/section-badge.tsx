import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionBadgeProps = HTMLAttributes<HTMLDivElement>;

export function SectionBadge({ className, ...props }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border border-white/[0.08] bg-black/38 px-2.5 py-1 text-base font-medium tracking-normal text-white/54 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
}
