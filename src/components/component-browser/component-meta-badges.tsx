import type { ComponentMetadata } from "@/data/components-registry";
import { getFrameworkLabel } from "@/data/components-registry";

type ComponentMetaBadgesProps = {
  component: ComponentMetadata;
};

export function ComponentMetaBadges({ component }: ComponentMetaBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/64">
        {getFrameworkLabel(component.framework)}
      </span>
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs capitalize text-white/64">
        {component.status}
      </span>
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/64">
        {component.difficulty}
      </span>
    </div>
  );
}
