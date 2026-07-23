import type { ComponentMetadata } from '@/data/components-registry';

export function createIframeDocument(component: ComponentMetadata) {
  const html = component.files.html ?? component.files.usage;
  const css = component.files.css ?? '';
  const js = component.files.js ?? '';

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
    ${js ? `<script>${js}</script>` : ''}
  </body>
</html>`;
}
