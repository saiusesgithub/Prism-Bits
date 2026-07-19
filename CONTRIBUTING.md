# Contributing to Prism Bits

Thanks for helping build Prism Bits.

Adding a component is intentionally simple: create one folder, add your source files, add `meta.json`, test it locally, and open a PR. The website discovers components automatically from the filesystem.

No manual registration. No central component list. No changes to the core website for normal component PRs.

## First-Time Contributor Path

1. Find or open a component issue.
2. Wait until a maintainer assigns it to you.
3. Create one folder:

```text
registry/<framework>/<category>/<slug>/
```

4. Add the required files for that framework.
5. Run the local checks.
6. Open a PR with a screenshot or GIF.

One component = one issue = one PR.

## Quick Cheat Sheet

Folder:

```text
registry/<framework>/<category>/<slug>/
```

Example:

```text
registry/html-css-js/buttons/retro-shadow-button/
```

Required files:

| Framework | Required files | Optional files | Live preview today |
|---|---|---|---|
| `react` | `component.tsx`, `meta.json` | `preview.tsx` | Yes |
| `html-css-js` | `index.html`, `style.css`, `meta.json` | `script.js` | Yes |
| `css-only` | `index.html`, `style.css`, `meta.json` | None | Yes |
| `vue` | `component.vue`, `meta.json` | None | No, code view only |
| `svelte` | `component.svelte`, `meta.json` | None | No, code view only |

Before opening your PR:

```bash
npm run validate:registry
npm run lint
npm run build
```

## Copy This `meta.json`

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

## Using AI To Contribute

AI-assisted contributions are welcome, but the PR is still your responsibility. Review the generated code, test the component, and make sure it follows the rules below.

Use [VIBE_CODING.md](VIBE_CODING.md) for a focused AI/vibecoder prompt that tells the assistant to work only inside one component folder.

---

# Detailed Contributor Guide

## Why This Project Has Room To Grow

Prism Bits is not a fixed-scope project with a short checklist and an end date. It is a growing library of reusable UI ideas. A useful component can be tiny, playful, serious, animated, accessible, experimental, practical, or deeply polished.

If you are new to open source, this is a good place to learn because the contribution surface is small and well-defined. If you are experienced, this is a good place to build something with taste and craft that other frontend developers can copy into real projects.

Maintainers will review PRs, help contributors understand the structure, and keep the library consistent.

## Step-by-Step Contribution Flow

1. Claim an issue

Comment on an open issue, or create a new issue using the "New component" template.

2. Wait for assignment

Please wait until a maintainer assigns the issue before you start. This avoids two contributors building the same component.

3. Create your component folder

Use exactly this structure:

```text
registry/<framework>/<category>/<slug>/
```

Examples:

```text
registry/react/buttons/glass-cta/
registry/html-css-js/forms/focus-field/
registry/css-only/loaders/pulse-loader/
registry/vue/modals/soft-modal/
registry/svelte/footers/project-footer/
```

4. Add component files

Use only the file names supported by your framework. Extra files may be ignored by the site.

5. Test locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000/components/<category>/<slug>
```

6. Validate before PR

```bash
npm run validate:registry
npm run lint
npm run build
```

7. Open a PR

Include:

- the linked issue number
- the component route
- a screenshot or GIF
- attribution if any design/code inspiration was used

## Supported Frameworks

### React

Path:

```text
registry/react/<category>/<slug>/
```

Files:

```text
component.tsx
preview.tsx      # optional
meta.json
```

Rules:

- `component.tsx` must default-export the reusable component.
- Add `"use client"` at the top if the component uses hooks, events, browser APIs, animation, or state.
- `preview.tsx` is optional and should be a zero-prop demo wrapper.
- The code tab shows `component.tsx`; `preview.tsx` is only for the live demo.
- React components support live preview today.

Example:

```text
registry/react/buttons/glass-cta/
  component.tsx
  preview.tsx
  meta.json
```

### HTML/CSS/JS

Path:

```text
registry/html-css-js/<category>/<slug>/
```

Files:

```text
index.html
style.css
script.js       # optional
meta.json
```

Rules:

- Use plain HTML in `index.html`.
- Put styles in `style.css`.
- Only add `script.js` when interaction needs JavaScript.
- No external scripts, CDNs, tracking, remote fonts, or network requests.
- HTML/CSS/JS components support live preview today through a sandboxed iframe.

### CSS-only

Path:

```text
registry/css-only/<category>/<slug>/
```

Files:

```text
index.html
style.css
meta.json
```

Rules:

- No JavaScript.
- Put all styling in `style.css`.
- CSS-only components support live preview today through a sandboxed iframe.

### Vue

Path:

```text
registry/vue/<category>/<slug>/
```

Files:

```text
component.vue
meta.json
```

Vue components currently show code view only. Live preview is planned.

### Svelte

Path:

```text
registry/svelte/<category>/<slug>/
```

Files:

```text
component.svelte
meta.json
```

Svelte components currently show code view only. Live preview is planned.

## Supported Categories

Use one of these category slugs:

| Category | Slug |
|---|---|
| Buttons | `buttons` |
| Cards | `cards` |
| Navbars | `navbars` |
| Forms | `forms` |
| Loaders | `loaders` |
| Hero Sections | `hero-sections` |
| Backgrounds | `backgrounds` |
| Text Effects | `text-effects` |
| Modals | `modals` |
| Dashboards | `dashboards` |
| Bento Grids | `bento-grids` |
| Footers | `footers` |

New categories need maintainer approval first.

## Slug Rules

Slugs must be lowercase kebab-case:

Good:

```text
retro-shadow-button
pricing-bento
soft-modal
```

Bad:

```text
RetroShadowButton
retro_shadow_button
retro shadow button
```

The slug becomes the public route:

```text
/components/<category>/<slug>
```

Slugs must be unique per category across all frameworks. For example, React and HTML/CSS/JS components cannot both use `buttons/glass-cta`.

## `meta.json` Field Reference

| Field | Required | Notes |
|---|---|---|
| `name` | Yes | Title Case display name |
| `slug` | Yes | Must match the folder name |
| `category` | Yes | Must match the category folder |
| `framework` | Yes | Must match the framework folder |
| `description` | Yes | One clear sentence |
| `tags` | Yes | 3 to 6 useful lowercase tags |
| `status` | Yes | `available`, `draft`, or `planned` |
| `difficulty` | Optional | `beginner`, `intermediate`, or `advanced` |
| `author.name` | Yes | Contributor display name |
| `author.github` | Optional | GitHub username |
| `dependencies` | Optional | Informational only; new npm dependencies need maintainer approval |

Use `"status": "available"` only when the component is complete. Available components must include all required files.

## Component Quality Rules

Mandatory:

- Original work only, or license-compatible work with attribution in the PR.
- No new npm dependencies unless a maintainer approved them first.
- No external network requests.
- No CDN scripts.
- No remote fonts.
- No trackers or analytics.
- No `eval`.
- No cookies, `localStorage`, or `sessionStorage`.
- No third-party `fetch`.
- One component per PR.
- Normal component PRs should not edit core website files.

Recommended:

- Responsive down to 360 px width.
- Keyboard accessible where interaction exists.
- Visible focus states.
- Respect `prefers-reduced-motion` for animated components.
- Clear tags and honest difficulty.
- Small, readable code that people can copy and customize.

## What CI Checks

Every PR runs:

```text
npm ci -> npm run validate:registry -> npm run lint -> npm run build
```

The registry validator checks:

- exact folder depth
- supported framework
- supported category
- slug format
- folder names matching `meta.json`
- unique component routes
- required source files for available components
- valid tags and author fields
- lowercase difficulty
- React default exports
- generated React preview map entries

## FAQ

**Do I need to edit site code?**

No. For a normal component contribution, only edit files inside your one component folder.

**Do I need to manually register my component?**

No. The site discovers components from `registry/**/meta.json`.

**Which frameworks have live preview right now?**

React, HTML/CSS/JS, and CSS-only. Vue and Svelte currently show code view only.

**Can I submit an unfinished component?**

Usually contributor PRs should submit complete components with `"status": "available"`. Use `draft` or `planned` only when a maintainer asks you to.

**Can I use Tailwind?**

React components can use Tailwind classes because the site compiles them. HTML/CSS/JS and CSS-only components should use plain CSS in `style.css`.

**My React preview is stale. What do I do?**

Run:

```bash
npm run generate:react-previews
```

Then restart the dev server.

**Where do I ask for help?**

Comment on your issue or PR. Follow the [Code of Conduct](CODE_OF_CONDUCT.md).
