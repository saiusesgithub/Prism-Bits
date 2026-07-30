import type { ComponentCategory, ComponentMetadata } from "@/data/components-registry";
import { ComponentCodeTabs } from "@/components/component-browser/component-code-tabs";
import { ComponentMetaBadges } from "@/components/component-browser/component-meta-badges";
import { ComponentPreviewPanel } from "@/components/component-browser/component-preview-panel";

type ComponentDetailPanelProps = {
  category: ComponentCategory;
  component: ComponentMetadata;
};

export function ComponentDetailPanel({ category, component }: ComponentDetailPanelProps) {
  return (
    <section className="min-w-0 space-y-6">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm text-accent-2">{category.name}</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">{component.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{component.description}</p>
          </div>
          <ComponentMetaBadges component={component} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {component.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-white/55">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 text-sm text-white/50">
          Author: <span className="text-white/72">{component.author.name}</span>
          {component.author.github ? <span className="text-white/40"> @{component.author.github}</span> : null}
        </div>
      </div>

      <ComponentPreviewPanel component={component} />
      <ComponentCodeTabs component={component} />

      {component.dependencies?.length ? (
        <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold text-foreground">Dependencies</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {component.dependencies.map((dependency) => (
              <span key={dependency} className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-sm text-white/64">
                {dependency}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
