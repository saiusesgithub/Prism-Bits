'use client';

import type { ComponentMetadata } from '@/data/components-registry';
import { getFrameworkLabel } from '@/data/components-registry';
import { createIframeDocument } from '@/lib/preview-document';
import { ReactPreviewRenderer } from '@/components/component-browser/react-preview-renderer';

type ComponentCardPreviewProps = {
  component: ComponentMetadata;
};

export function ComponentCardPreview({ component }: ComponentCardPreviewProps) {
  if (component.framework === 'react') {
    return (
      <ReactPreviewRenderer
        category={component.category}
        slug={component.slug}
        name={component.name}
        minHeightClassName="min-h-0"
      />
    );
  }

  if (
    component.framework === 'html-css-js' ||
    component.framework === 'css-only'
  ) {
    return (
      <iframe
        title={`${component.name} preview`}
        srcDoc={createIframeDocument(component)}
        sandbox="allow-scripts"
        tabIndex={-1}
        className="pointer-events-none h-full w-full border-0"
      />
    );
  }

  return (
    <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#080812,#141022)]">
      <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs text-white/55">
        {getFrameworkLabel(component.framework)} · code preview
      </span>
    </div>
  );
}
