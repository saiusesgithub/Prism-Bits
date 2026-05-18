# Contributing to Prism Bits

Prism Bits uses a file-based component registry. Contributors do not need to edit one central registry list.

## Add a Component

1. Pick a framework and category.
2. Create a folder under `src/components/registry/`.
3. Add the component files.
4. Add `meta.json`.
5. Run the project locally and open the component page.
6. Open a pull request.

## Folder Examples

```txt
src/components/registry/
  react/
    buttons/
      glass-cta/
        component.tsx
        preview.tsx
        code.ts
        meta.json

  html-css-js/
    buttons/
      retro-shadow-button/
        index.html
        style.css
        script.js
        meta.json

  css-only/
    loaders/
      pulse-loader/
        index.html
        style.css
        meta.json

  vue/
    cards/
      profile-card/
        component.vue
        meta.json

  svelte/
    cards/
      profile-card/
        component.svelte
        meta.json
```

## meta.json

Every component needs a `meta.json` file:

```json
{
  "name": "Retro Shadow Button",
  "slug": "retro-shadow-button",
  "category": "buttons",
  "framework": "html-css-js",
  "description": "A rounded retro-style button with a chunky pressed shadow effect.",
  "tags": ["button", "retro", "shadow"],
  "status": "available",
  "difficulty": "beginner",
  "author": {
    "name": "Sai Srujan",
    "github": "saiusesgithub"
  }
}
```

The `slug` becomes the URL, for example `/components/buttons/retro-shadow-button`.

## Framework Files

- React: add `component.tsx`, optionally `preview.tsx` and `code.ts`.
- HTML/CSS/JS: add `index.html`, `style.css`, and optional `script.js`.
- CSS-only: add `index.html` and `style.css`.
- Vue: add `component.vue`.
- Svelte: add `component.svelte`.

## Validate Locally

Run these before opening a pull request:

```bash
npm run validate:registry
npm run lint
npm run build
```

## Pull Request Checklist

- Component folder is under the correct framework and category.
- `meta.json` is valid and has a unique slug.
- The component page works locally.
- The PR includes screenshots or a short screen recording for visual components.
