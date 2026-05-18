import Link from "next/link";
import type { ComponentCategory, ComponentMetadata } from "@/data/components-registry";
import { getFrameworkLabel } from "@/data/components-registry";

type ComponentSidebarProps = {
  category: ComponentCategory;
  components: ComponentMetadata[];
  selectedSlug: string;
};

export function ComponentSidebar({ category, components, selectedSlug }: ComponentSidebarProps) {
  return (
    <aside className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 lg:sticky lg:top-28 lg:self-start">
      <div>
        <p className="text-sm text-accent-2">{category.name}</p>
        <h2 className="mt-1 text-2xl font-semibold text-foreground">Bits</h2>
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-muted">
        Search component names
      </div>
      <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {components.map((component) => {
          const active = component.slug === selectedSlug;

          return (
            <Link
              key={component.slug}
              href={`/components/${category.slug}/${component.slug}`}
              className={`min-w-64 rounded-2xl border px-4 py-3 transition lg:min-w-0 ${
                active
                  ? "border-white/20 bg-white/[0.08] text-white"
                  : "border-white/10 bg-black/20 text-white/62 hover:border-white/18 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{component.name}</span>
                <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] capitalize text-white/55">
                  {component.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-white/45">{getFrameworkLabel(component.framework)}</p>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
