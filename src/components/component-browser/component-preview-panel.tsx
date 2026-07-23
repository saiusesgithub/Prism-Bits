import type { ComponentMetadata } from '@/data/components-registry';
import { createIframeDocument } from '@/lib/preview-document';
import { ReactPreviewRenderer } from '@/components/component-browser/react-preview-renderer';

type ComponentPreviewPanelProps = {
  component: ComponentMetadata;
};

export function ComponentPreviewPanel({
  component,
}: ComponentPreviewPanelProps) {
  const isReact = component.framework === 'react';
  const isIframePreview =
    component.framework === 'html-css-js' || component.framework === 'css-only';

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
      <div className="border-b border-white/10 px-4 py-3 text-sm text-white/58">
        {isReact
          ? 'Live React preview'
          : isIframePreview
            ? 'Live iframe preview'
            : 'Snippet preview'}
      </div>
      <div className="h-[360px]">
        {isReact ? (
          <ReactPreviewRenderer
            category={component.category}
            slug={component.slug}
            name={component.name}
          />
        ) : isIframePreview ? (
          <iframe
            title={`${component.name} preview`}
            srcDoc={createIframeDocument(component)}
            sandbox="allow-scripts"
            className="h-full w-full border-0"
          />
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
