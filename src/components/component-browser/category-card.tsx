import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentCategory } from "@/data/components-registry";

type CategoryCardProps = {
  category: ComponentCategory;
  count: number;
};

export function CategoryCard({ category, count }: CategoryCardProps) {
  return (
    <Link
      href={`/components/${category.slug}`}
      className="group flex min-h-56 flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold text-foreground">{category.name}</h2>
          <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/58">
            {count} bits
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">{category.description}</p>
      </div>
      <div>
        <div className="mt-6 flex flex-wrap gap-2">
          {category.targets.map((target) => (
            <span key={target} className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-white/55">
              {target}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/72">
          View bits
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
