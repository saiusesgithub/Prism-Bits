<div align="center">

# Prism Bits

**Copy-first UI components for frontend developers.**

[![CI](https://github.com/saiusesgithub/Prism-Bits/actions/workflows/ci.yml/badge.svg)](https://github.com/saiusesgithub/Prism-Bits/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-8b5cf6.svg)](CONTRIBUTING.md)

</div>

Prism Bits is an open-source collection of reusable UI components. There is no package to install and no component API to learn: browse a component, preview it, copy the source, and make it yours.

Unlike many open-source projects with a fixed scope, Prism Bits is designed to keep growing. Buttons, cards, loaders, backgrounds, dashboards, effects, layouts, forms, and entirely new ideas can all live here. Creativity is the main limit.

Whether this is your first open-source PR or you already contribute regularly, there is room to build something useful and unique. The goal is simple: build a component library the frontend community can use for years.

## Quick Start

```bash
git clone https://github.com/saiusesgithub/Prism-Bits.git
cd Prism-Bits
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## New Contributors

Want to add a component? You only need one folder:

```text
registry/<framework>/<category>/<slug>/
```

Example:

```text
registry/react/buttons/glass-cta/
```

Then add your component files and `meta.json`. The website discovers it automatically. You do not manually register components anywhere.

Full contributor guide: [CONTRIBUTING.md](CONTRIBUTING.md)

Using an AI/vibecoder to contribute? Use [VIBE_CODING.md](VIBE_CODING.md). It contains the repo rules and a copy-paste prompt for component-only contributions.

Contributing through Elite Coders Summer of Code? Start with the program section in [CONTRIBUTING.md](CONTRIBUTING.md#elite-coders-summer-of-code): claim an issue, wait for assignment, keep the PR focused, and include a screenshot.

## What You Can Build

Supported categories:

`buttons`, `cards`, `navbars`, `forms`, `loaders`, `hero-sections`, `backgrounds`, `text-effects`, `modals`, `dashboards`, `bento-grids`, `footers`

Supported frameworks:

| Framework | Source files | Live preview today |
|---|---|---|
| `react` | `component.tsx`, optional `preview.tsx` | Yes, real React render |
| `html-css-js` | `index.html`, `style.css`, optional `script.js` | Yes, sandboxed iframe |
| `css-only` | `index.html`, `style.css` | Yes, sandboxed iframe |
| `vue` | `component.vue` | No, code view only |
| `svelte` | `component.svelte` | No, code view only |

## Before Opening a PR

```bash
npm run validate:registry
npm run lint
npm run build
```

Every PR should include a screenshot or GIF of the component.

---

# Detailed Docs

## How Prism Bits Works

Every component is stored as a self-contained folder under `registry/`.

```text
registry/
  react/
    buttons/
      glass-cta/
        component.tsx
        preview.tsx
        meta.json
  html-css-js/
    buttons/
      retro-shadow-button/
        index.html
        style.css
        meta.json
  css-only/
    loaders/
      pulse-loader/
        index.html
        style.css
        meta.json
```

The site scans `registry/**/meta.json`, validates each folder, and creates component pages at:

```text
/components/<category>/<slug>
```

There is no central list to edit. If the folder and metadata are valid, the component appears automatically.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local Next.js dev server |
| `npm run build` | Creates a production build |
| `npm run lint` | Runs ESLint |
| `npm run validate:registry` | Validates every component folder and `meta.json` |
| `npm run generate:react-previews` | Regenerates the React preview import map |

`npm run dev` and `npm run build` automatically regenerate React previews first.

## Registry Rules

- Folder path must be exactly `registry/<framework>/<category>/<slug>/`.
- Folder names must match `framework`, `category`, and `slug` in `meta.json`.
- Slugs must be lowercase kebab-case, such as `retro-shadow-button`.
- Slugs must be unique per category across all frameworks.
- Components marked `"status": "available"` must include all required source files.
- React components must default-export the reusable component from `component.tsx`.
- React preview wrappers, when used, must default-export a zero-prop component from `preview.tsx`.

## Project Structure

```text
registry/                  # Component source contributed by the community
scripts/                   # Registry validation and React preview generation
src/app/                   # Next.js App Router pages
src/components/            # Website UI, preview panels, landing sections
src/data/                  # Category and metadata types
src/lib/                   # Registry discovery and preview helpers
src/generated/             # Auto-generated React preview map, gitignored
```

Most contributors should only touch files inside one `registry/<framework>/<category>/<slug>/` folder.

## Quality Gates

CI runs on pull requests and pushes to `main`:

```text
npm ci -> npm run validate:registry -> npm run lint -> npm run build
```

The validator checks folder depth, metadata consistency, slug format, supported categories, unique routes, required files, React default exports, and generated React preview entries.

## Contributing

Start here: [CONTRIBUTING.md](CONTRIBUTING.md)

AI-assisted component workflow: [VIBE_CODING.md](VIBE_CODING.md)

Code of Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## License

[MIT](LICENSE). Free for personal and commercial use.
