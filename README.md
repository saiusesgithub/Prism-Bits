<div align="center">

# ✦ Prism Bits

**Elegant open-source UI bits you can copy, customize, and ship.**

[![CI](https://github.com/saiusesgithub/Prism-Bits/actions/workflows/ci.yml/badge.svg)](https://github.com/saiusesgithub/Prism-Bits/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-8b5cf6.svg)](CONTRIBUTING.md)

</div>

---

Prism Bits is a **copy-first** component library. There's no npm package to install, no versions to chase, no abstraction to fight. You browse a component, watch it run live, copy the source, and it's yours — restyle it, rewrite it, ship it.

Every component is a small, self-contained folder in this repository. The website builds itself from those folders automatically.

## ✨ Why copy-first?

- **You own the code.** Once copied, the component is part of *your* project. No breaking updates, no dependency audits, no lock-in.
- **Readable by design.** Components are written to be understood and edited, not hidden behind props soup.
- **Zero runtime cost.** Nothing ships to your users except the code you actually pasted.
- **Framework-honest.** A React bit is real React; an HTML/CSS bit is real HTML/CSS. What you preview is exactly what you copy.

## 🧩 What's inside

Components are organized into **12 categories** — buttons, cards, navbars, forms, loaders, hero sections, backgrounds, text effects, modals, dashboards, bento grids, and footers — across five framework flavors:

| Framework | Live preview | How it renders |
|---|---|---|
| **React** | ✅ Real component | Imported and rendered through a build-time generated import map — actual hooks, actual events |
| **HTML/CSS/JS** | ✅ Live | Sandboxed iframe (`allow-scripts`, no same-origin access) |
| **CSS-only** | ✅ Live | Same sandboxed iframe |
| **Vue** | 📄 Code view | Live renderer planned |
| **Svelte** | 📄 Code view | Live renderer planned |

## 🚀 Using a component

1. Browse the **/components** page on the site and pick a bit.
2. Check the **live preview** — click it, tab through it, resize it.
3. Hit **Copy code** and paste it into your project. Done.

React bits ship as a single `component.tsx` with a default export. HTML bits ship as `index.html` + `style.css` (+ optional `script.js`) you can drop anywhere.

## 🛠️ Running the site locally

```bash
git clone https://github.com/saiusesgithub/Prism-Bits.git
cd Prism-Bits
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). That's it — the component registry is discovered from the filesystem at startup, and the React preview map is generated automatically before `dev` and `build`.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server (generates the React preview map first) |
| `npm run build` | Production build (also generates the preview map) |
| `npm run lint` | ESLint over the whole codebase |
| `npm run validate:registry` | Validate every component's folder structure + `meta.json` |
| `npm run generate:react-previews` | Regenerate the React preview import map manually |

## ⚙️ How the registry works

```text
src/components/registry/<framework>/<category>/<slug>/
        │
        ├─ discovered automatically (fast-glob over meta.json)
        ├─ validated (folder ↔ meta consistency, required files, unique routes)
        ├─ routed statically → /components/<category>/<slug>
        └─ previewed → React import map · sandboxed iframe · code view
```

- **No central list.** Adding a folder with a valid `meta.json` is all it takes — the site lists, routes, searches, and previews it automatically.
- **React previews are real.** `scripts/generate-react-preview-map.mjs` scans React component folders and emits statically analyzable dynamic imports, so every `component.tsx` renders as a genuine, code-split React component behind an error boundary.
- **Contributor code is contained.** HTML/JS runs origin-isolated in a sandboxed iframe; a crashing React preview is caught by an error boundary without taking down the page.

### Project structure

```text
src/
├── app/                      # Next.js App Router pages
│   ├── components/           # /components, /components/[category], /components/[category]/[slug]
│   ├── docs/  showcase/      # docs + showcase pages
│   └── page.tsx              # landing page
├── components/
│   ├── registry/             # ⭐ THE COMPONENT LIBRARY — contribute here
│   │   ├── react/            #    react/<category>/<slug>/{component.tsx, preview.tsx?, meta.json}
│   │   ├── html-css-js/      #    <category>/<slug>/{index.html, style.css, script.js?, meta.json}
│   │   ├── css-only/  vue/  svelte/
│   ├── component-browser/    # site UI: sidebar, preview panel, code tabs
│   ├── landing/  common/     # site UI: hero, navbar, buttons
│   └── effects/              # site infrastructure (WebGL prism background)
├── data/components-registry.ts   # categories + metadata types
├── lib/registry.ts               # filesystem discovery (server-only)
└── generated/                    # auto-generated React preview map (gitignored)
scripts/
├── validate-registry.mjs         # the validator CI runs
└── generate-react-preview-map.mjs
```

## 🧪 Quality gates

Every PR and push to `main` runs [CI](.github/workflows/ci.yml): clean install → registry validation → lint → production build. The validator enforces folder/metadata consistency, slug format, unique routes, required source files for `available` components, and default exports for React components — with error messages that name the exact folder and problem. Deployment to production happens automatically from `main` via Vercel; CI and deployment are separate.

## 🤝 Contributing

The whole process at a glance:

```text
Claim an issue → get assigned → create your folder → add code + meta.json
       → test locally → run validation → open a PR with a screenshot
```

Full guide with folder templates and rules: **[CONTRIBUTING.md](CONTRIBUTING.md)** · Be kind: **[Code of Conduct](CODE_OF_CONDUCT.md)**

Good first contribution ideas: complete one of the `planned` components already in the registry, or propose a new bit with the **New component** issue template.

## 📄 License

[MIT](LICENSE) — free for personal and commercial use. Copy away.
