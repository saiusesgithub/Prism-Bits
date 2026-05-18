import type { ComponentMetadata } from "@/data/components-registry";
import { ComponentPreview } from "@/components/landing/component-preview";

type ComponentPreviewPanelProps = {
  component: ComponentMetadata;
};

export function ComponentPreviewPanel({ component }: ComponentPreviewPanelProps) {
  const isReact = component.framework === "react";

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
      <div className="border-b border-white/10 px-4 py-3 text-sm text-white/58">
        {isReact ? "Live preview" : "Snippet preview"}
      </div>
      <div className="h-[360px]">
        {isReact ? (
          <ComponentPreview slug={component.slug} />
        ) : (
          <div className="flex h-full items-center justify-center p-6">
            <pre className="max-h-72 w-full overflow-auto rounded-2xl border border-white/10 bg-black/45 p-5 text-sm leading-6 text-white/72">
              <code>{component.files.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
