# Vibe Coding Guide for Component Contributions

This file is for contributors who want to use an AI coding assistant to add a Prism Bits component.

The goal is to give the assistant enough context to contribute safely without changing the core website.

## Scope For AI-Assisted Contributions

The AI should only create or edit one component folder:

```text
registry/<framework>/<category>/<slug>/
```

For normal component PRs, the AI should not edit:

```text
src/
scripts/
.github/
package.json
package-lock.json
README.md
CONTRIBUTING.md
```

Exceptions should happen only when the maintainer specifically asks for documentation or website changes.

## Supported Folder Structure

```text
registry/
  react/
    <category>/
      <slug>/
        component.tsx
        preview.tsx
        meta.json
  html-css-js/
    <category>/
      <slug>/
        index.html
        style.css
        script.js
        meta.json
  css-only/
    <category>/
      <slug>/
        index.html
        style.css
        meta.json
  vue/
    <category>/
      <slug>/
        component.vue
        meta.json
  svelte/
    <category>/
      <slug>/
        component.svelte
        meta.json
```

`script.js` and `preview.tsx` are optional.

## Live Preview Support

| Framework | Live preview today |
|---|---|
| `react` | Yes |
| `html-css-js` | Yes |
| `css-only` | Yes |
| `vue` | No, code view only |
| `svelte` | No, code view only |

## Allowed Categories

Use one category slug from this list:

```text
buttons
cards
navbars
forms
loaders
hero-sections
backgrounds
text-effects
modals
dashboards
bento-grids
footers
```

## Component Rules For The AI

- Create one component only.
- Do not manually register the component anywhere.
- Do not edit a central registry list.
- Do not add npm dependencies.
- Do not use CDN scripts, remote fonts, analytics, trackers, or network requests.
- Do not use `eval`, cookies, `localStorage`, or `sessionStorage`.
- Make the component responsive down to 360 px width.
- Add visible focus states for interactive elements.
- Respect `prefers-reduced-motion` for animations.
- Keep code copy-friendly and self-contained.
- Mark complete components with `"status": "available"`.

## Copy-Paste Prompt For Your AI Coder

Replace the bracketed values before sending this to your AI coding assistant.

```text
You are contributing to Prism Bits, a copy-first open-source UI component library.

Your task is to add exactly one component. Work only inside this folder:

registry/[framework]/[category]/[slug]/

Component details:
- Name: [Component Name]
- Framework: [react | html-css-js | css-only | vue | svelte]
- Category: [buttons | cards | navbars | forms | loaders | hero-sections | backgrounds | text-effects | modals | dashboards | bento-grids | footers]
- Slug: [lowercase-kebab-case-slug]
- Description: [one sentence describing the component]
- Difficulty: [beginner | intermediate | advanced]
- Author name: [Your Name]
- Author GitHub username: [your-github-username]

Rules:
- Do not edit src/, scripts/, .github/, package.json, package-lock.json, README.md, or CONTRIBUTING.md.
- Do not manually register the component anywhere. Prism Bits discovers components from registry/**/meta.json.
- Do not add npm dependencies.
- Do not use external network requests, CDN scripts, remote fonts, trackers, analytics, eval, cookies, localStorage, or sessionStorage.
- Make the component responsive down to 360 px width.
- Add keyboard accessibility and visible focus states where relevant.
- Respect prefers-reduced-motion for animations.
- Keep the source readable, self-contained, and easy for users to copy.

Framework file rules:
- react: create component.tsx and meta.json. Add preview.tsx only if a zero-prop demo wrapper is needed. component.tsx must default-export the reusable component. Add "use client" if using hooks, events, state, animation, or browser APIs.
- html-css-js: create index.html, style.css, meta.json, and script.js only if needed.
- css-only: create index.html, style.css, and meta.json. Do not use JavaScript.
- vue: create component.vue and meta.json. Live preview is not supported yet; code view only.
- svelte: create component.svelte and meta.json. Live preview is not supported yet; code view only.

meta.json must include:
{
  "name": "[Component Name]",
  "slug": "[slug]",
  "category": "[category]",
  "framework": "[framework]",
  "description": "[description]",
  "tags": ["tag-one", "tag-two", "tag-three"],
  "status": "available",
  "difficulty": "[difficulty]",
  "author": {
    "name": "[Your Name]",
    "github": "[your-github-username]"
  }
}

After creating the files, run:
npm run validate:registry
npm run lint
npm run build

Then summarize:
- files created
- route to test: /components/[category]/[slug]
- validation results
- any accessibility or responsive behavior included
```

## Review Checklist Before PR

- The component lives in exactly one `registry/<framework>/<category>/<slug>/` folder.
- `meta.json` values match the folder names.
- The route is `/components/<category>/<slug>`.
- The component has no banned APIs or external assets.
- The component was tested locally.
- `npm run validate:registry`, `npm run lint`, and `npm run build` pass.
- The PR includes a screenshot or GIF.
