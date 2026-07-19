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

## Continuous Integration

Every pull request and push to `main` runs the GitHub Actions workflow in
`.github/workflows/ci.yml`. It executes, in order:

1. `npm ci` — dependencies must install cleanly
2. `npm run validate:registry` — component metadata and folder structure must be valid
3. `npm run lint` — ESLint must pass
4. `npm run build` — the Next.js production build must succeed

A pull request cannot be merged until all checks pass. Run the same three
commands locally (see above) to catch failures before pushing.

The registry validator also enforces:

- the folder path must be exactly `src/components/registry/<framework>/<category>/<slug>/`
- folder names must match the `framework`, `category`, and `slug` in `meta.json`
- `difficulty` must be lowercase: `beginner`, `intermediate`, or `advanced`
- a component with `"status": "available"` must include all required source files
  for its framework (incomplete work must use `draft` or `planned`)
- `category`/`slug` routes must be unique across all frameworks

## Pull Request Checklist

- Component folder is under the correct framework and category.
- `meta.json` is valid and has a unique slug.
- The component page works locally.
- The PR includes screenshots or a short screen recording for visual components.
