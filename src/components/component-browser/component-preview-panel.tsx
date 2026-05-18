import type { ComponentMetadata } from "@/data/components-registry";
import { ComponentPreview } from "@/components/landing/component-preview";

type ComponentPreviewPanelProps = {
  component: ComponentMetadata;
};

function createIframeDocument(component: ComponentMetadata) {
  const html = component.files.html ?? component.files.usage;
  const css = component.files.css ?? "";
  const js = component.files.js ?? "";

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * {
        box-sizing: border-box;
      }

      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
      }

      body {
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 32px;
        background:
          radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.18), transparent 260px),
          radial-gradient(circle at 80% 40%, rgba(34, 211, 238, 0.14), transparent 260px),
          #070910;
        color: white;
      }

      ${css}
    </style>
  </head>
  <body>
    ${html}
    ${js ? `<script>${js}</script>` : ""}
  </body>
</html>`;
}

export function ComponentPreviewPanel({ component }: ComponentPreviewPanelProps) {
  const isReact = component.framework === "react";
  const isIframePreview = component.framework === "html-css-js" || component.framework === "css-only";

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
      <div className="border-b border-white/10 px-4 py-3 text-sm text-white/58">
        {isReact ? "Live React preview" : isIframePreview ? "Live iframe preview" : "Snippet preview"}
      </div>
      <div className="h-[360px]">
        {isReact ? (
          <ComponentPreview slug={component.slug} />
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
