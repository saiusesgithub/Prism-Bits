# Contributing to Prism Bits

Thanks for contributing! Prism Bits uses a **file-based component registry** —
you never edit a central list or any shared site code. Add a folder, add
`meta.json`, and the site discovers, routes, and previews your component
automatically.

## The flow

```text
Claim an issue
  → get assigned
  → create your component folder
  → add code + meta.json
  → test locally
  → run validation
  → open a PR with a screenshot
```

### 1. Claim an issue

Pick an open [component issue](https://github.com/saiusesgithub/Prism-Bits/issues)
(or open a new one using the **New component** template) and comment that you'd
like to work on it. Wait until a maintainer assigns it to you before starting —
this prevents two people building the same thing.

**One component = one issue = one PR.**

### 2. Create the component folder

```text
src/components/registry/<framework>/<category>/<slug>/
```

- `framework` — one of `react`, `html-css-js`, `css-only`, `vue`, `svelte`
- `category` — one of the categories in `src/data/components-registry.ts`
  (`buttons`, `cards`, `navbars`, `forms`, `loaders`, `hero-sections`,
  `backgrounds`, `text-effects`, `modals`, `dashboards`, `bento-grids`, `footers`)
- `slug` — lowercase kebab-case, e.g. `retro-shadow-button`

The folder names **must exactly match** the `framework`, `category`, and `slug`
fields in your `meta.json` — the validator enforces this.

### 3. Add your code

| Framework | Required files | Optional |
|---|---|---|
| React | `component.tsx` | `preview.tsx` |
| HTML/CSS/JS | `index.html`, `style.css` | `script.js` |
| CSS-only | `index.html`, `style.css` | — |
| Vue | `component.vue` | — |
| Svelte | `component.svelte` | — |

Filenames are exact — the registry reads these names and ignores everything else.

### 4. Add `meta.json`

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
    "name": "Your Name",
    "github": "your-github-username"
  }
}
```

- `status`: `available` (complete and working), `draft`, or `planned`.
  A component marked `available` **must** include all required files.
- `difficulty`: lowercase — `beginner`, `intermediate`, or `advanced`.
- The `slug` becomes the URL: `/components/buttons/retro-shadow-button`.
  Slugs must be unique per category **across all frameworks**.

### 5. Test locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/components/<category>/<slug>` and check:

- the preview shows your real component (not a placeholder)
- the code tab shows your complete source
- the Copy button gives working code
- it looks right at mobile width (360 px) and on the dark backdrop

### 6. Run validation

```bash
npm run validate:registry
npm run lint
npm run build
```

All three must pass — CI runs exactly these on your PR and merging is blocked
until they're green.

### 7. Open a PR

Use the pull request template, link the issue you were assigned, and attach a
**screenshot** (or a short GIF for animated components). Title format:

```text
feat(component): <framework>/<slug>
```

---

## React components

React components get a **real live preview** — your `component.tsx` is imported
and rendered through a build-time generated import map. You never register your
slug anywhere.

1. `component.tsx` — the reusable component users copy. It **must
   default-export** the React component. Add `"use client"` at the top if it
   uses hooks, events, or browser APIs.
2. `preview.tsx` (optional) — a **zero-prop demo wrapper** that default-exports
   a component. Use it when `component.tsx` needs props, sample data, or layout
   context. If `preview.tsx` exists it is rendered in the preview panel;
   otherwise `component.tsx` is rendered directly.
3. The preview map is generated automatically before `dev` and `build`.
   **If you add a React component while the dev server is already running**,
   run `npm run generate:react-previews` and restart the dev server.

Minimal example:

```text
src/components/registry/react/buttons/example-button/
  component.tsx   ← default-exports ExampleButton (shown in the Code tab)
  preview.tsx     ← optional zero-prop demo
  meta.json
```

Code-tab rules: the Code tab always shows `component.tsx` — `preview.tsx`
never replaces it and appears in a separate "Preview" tab. A `code.ts` file is
only used as a snippet override for components with no source module.

---

## Rules

**Mandatory**

- Original work only, or license-compatible with attribution in the PR
- No external network requests in component code (CDN scripts, fonts, trackers)
- No new npm dependencies without prior maintainer approval
- No `eval`, cookies, storage APIs, or third-party `fetch` in component JS
- One component per PR; don't touch shared site code in a component PR

**Recommended**

- Responsive from 360 px width
- Keyboard-accessible with visible focus states; respect `prefers-reduced-motion`
- 3–6 lowercase tags; one-sentence description
- Fill in `author.github` so you get credit on the component page

## Continuous Integration

Every pull request and push to `main` runs `.github/workflows/ci.yml`:
`npm ci` → `npm run validate:registry` → `npm run lint` → `npm run build`.

The validator enforces folder/meta consistency, slug format, known categories,
unique routes, required files for `available` components, and (for React)
default exports and preview-map entries. Errors name the exact component folder
and what's wrong.

## Questions?

Open an issue or start a discussion — and be excellent to each other per our
[Code of Conduct](CODE_OF_CONDUCT.md).
