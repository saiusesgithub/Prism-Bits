"use client";

import { Component, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { reactPreviewMap } from "@/generated/react-preview-map";

type ReactPreviewRendererProps = {
  category: string;
  slug: string;
  name: string;
  /** Overrides the default min-height (used by compact surfaces like landing cards). */
  minHeightClassName?: string;
};

type PreviewErrorBoundaryProps = {
  name: string;
  children: ReactNode;
};

type PreviewErrorBoundaryState = {
  error: Error | null;
};

class PreviewErrorBoundary extends Component<PreviewErrorBoundaryProps, PreviewErrorBoundaryState> {
  state: PreviewErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): PreviewErrorBoundaryState {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-2 p-6 text-center">
          <p className="text-sm font-semibold text-white/80">{this.props.name} preview crashed</p>
          <p className="max-w-md break-words text-xs leading-5 text-white/45">{this.state.error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ReactPreviewRenderer({ category, slug, name, minHeightClassName = "min-h-[360px]" }: ReactPreviewRendererProps) {
  const PreviewComponent = reactPreviewMap[`${category}/${slug}`];

  if (!PreviewComponent) {
    return (
      <div className={cn("flex h-full flex-col items-center justify-center gap-2 p-6 text-center", minHeightClassName)}>
        <p className="text-sm font-semibold text-white/70">No live preview available yet</p>
        <p className="max-w-md text-xs leading-5 text-white/45">
          This component has no component.tsx source, or the preview map is stale. Contributors: add
          component.tsx and run <code className="text-white/60">npm run generate:react-previews</code>{" "}
          (or restart the dev server).
        </p>
      </div>
    );
  }

  return (
    <PreviewErrorBoundary name={name}>
      <div
        className={cn(
          "grid h-full w-full place-items-center overflow-auto bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.16),transparent_18rem),radial-gradient(circle_at_80%_40%,hsl(var(--accent-2)/0.12),transparent_18rem)] p-8",
          minHeightClassName,
        )}
      >
        <PreviewComponent />
      </div>
    </PreviewErrorBoundary>
  );
}
