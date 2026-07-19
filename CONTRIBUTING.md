# Contributing to Prism Bits

Thanks for being here! Adding a component is genuinely simple — **you create one folder, and the site does the rest.** No central list to edit, no shared code to touch, no manual registration anywhere.

## ⚡ The whole process at a glance

| | Step | What you do |
|---|---|---|
| 1️⃣ | **Claim** | Comment on an [open issue](https://github.com/saiusesgithub/Prism-Bits/issues) (or open one with the *New component* template) |
| 2️⃣ | **Get assigned** | Wait for a maintainer to assign it to you — then it's yours |
| 3️⃣ | **Create your folder** | `src/components/registry/<framework>/<category>/<slug>/` |
| 4️⃣ | **Add code + meta.json** | Your component files + one small metadata file |
| 5️⃣ | **Test locally** | `npm run dev` → open `/components/<category>/<slug>` |
| 6️⃣ | **Validate** | `npm run validate:registry && npm run lint && npm run build` |
| 7️⃣ | **Open a PR** | With a **screenshot** (or GIF if animated) |

**One component = one issue = one PR.** That's the entire process.

## 📁 Cheat sheet

**Folder:** `src/components/registry/<framework>/<category>/<slug>/`

**Files by framework** (exact names — anything else is ignored):

| Framework | Required | Optional |
|---|---|---|
| `react` | `component.tsx` + `meta.json` | `preview.tsx` |
| `html-css-js` | `index.html` + `style.css` + `meta.json` | `script.js` |
| `css-only` | `index.html` + `style.css` + `meta.json` | — |
| `vue` | `component.vue` + `meta.json` | — |
| `svelte` | `component.svelte` + `meta.json` | — |

**meta.json** (copy this and edit):

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

**Commands before your PR:**

```bash
npm run validate:registry   # folder structure + metadata
npm run lint                # code style
npm run build               # production build
```

All three must pass — CI runs exactly these and blocks merging until green.

---

# The details

Everything below is reference material — come back to it when you need it.

## Choosing framework, category, and slug

- **framework** — `react`, `html-css-js`, `css-only`, `vue`, or `svelte`.
  Note: React and HTML/CSS components get live previews today; Vue and Svelte
  currently show a code view (renderers are planned).
- **category** — one of: `buttons`, `cards`, `navbars`, `forms`, `loaders`,
  `hero-sections`, `backgrounds`, `text-effects`, `modals`, `dashboards`,
  `bento-grids`, `footers`. New categories need a maintainer-approved issue first.
- **slug** — lowercase kebab-case (`neon-toggle`, not `NeonToggle`). It becomes
  the URL: `/components/<category>/<slug>`. Slugs must be **unique per category
  across all frameworks** — a React and an HTML version of the same idea need
  different slugs.
- The three folder names **must exactly match** the `framework`, `category`,
  and `slug` fields in `meta.json`. The validator enforces this and tells you
  precisely what mismatches.

## meta.json field reference

| Field | Required | Notes |
|---|---|---|
| `name` | ✅ | Title Case display name — shows as the page heading |
| `slug` | ✅ | Lowercase kebab-case, equals the folder name |
| `category` | ✅ | Must be a known category, equals the folder name |
| `framework` | ✅ | Must be a supported framework, equals the folder name |
| `description` | ✅ | One sentence; shows on cards and the component page |
| `tags` | ✅ | 3–6 lowercase words; powers search |
| `status` | ✅ | `available` = complete and working · `draft` / `planned` = work in progress (exempt from file checks, but publicly visible) |
| `difficulty` | optional | Lowercase: `beginner`, `intermediate`, `advanced` |
| `author.name` | ✅ | You! Shown on the component page |
| `author.github` | optional | Your GitHub username — fill it in, you deserve the credit |
| `dependencies` | optional | Array of strings, informational only; needs maintainer approval |

Rule of thumb: mark your component `available` only when it's finished. A
component marked `available` with missing source files **fails validation**.

## React components (live previews)

Your `component.tsx` is imported and rendered for real — hooks, events, state,
all of it — through a build-time generated import map. You never register your
slug anywhere.

- **`component.tsx`** — the reusable component users copy. It **must
  default-export** the component. Add `"use client"` at the top if it uses
  hooks, events, or browser APIs.
- **`preview.tsx`** (optional) — a **zero-prop demo wrapper** with a default
  export. Use it when `component.tsx` needs props, sample data, or layout
  context. If `preview.tsx` exists, the preview panel renders it; otherwise it
  renders `component.tsx` directly.
- **Code tab:** always shows `component.tsx`. When `preview.tsx` exists it
  appears in its own "Preview" tab — it never replaces your component source.

```text
src/components/registry/react/buttons/example-button/
  component.tsx   ← default-exports ExampleButton
  preview.tsx     ← optional zero-prop demo
  meta.json
```

⚠️ **Dev-server note:** the preview map is generated when `dev`/`build` starts.
If you add a React component while the dev server is already running, run
`npm run generate:react-previews` and restart the server.

## Testing your component locally

Open `http://localhost:3000/components/<category>/<slug>` and check:

- ✅ the preview shows your **real component**, not a placeholder
- ✅ interactions work (click, hover, keyboard focus)
- ✅ the code tab shows your complete source and **Copy code** yields working code
- ✅ it holds up at **360 px width** and looks right on the dark preview backdrop

## Rules

**Mandatory** — PRs violating these will be declined:

- Original work only, or license-compatible with attribution stated in the PR
- No external network requests in component code — no CDN scripts, remote fonts, trackers, or analytics
- No new npm dependencies without prior maintainer approval
- No `eval`, cookies, storage APIs, or third-party `fetch` in component JS
- One component per PR; no changes to shared site code in a component PR

**Recommended** — reviewers will look for these:

- Responsive from 360 px; keyboard-accessible with visible focus states
- Respect `prefers-reduced-motion` for animated components
- Honest `difficulty`, tight description, useful tags

## What CI checks

Every PR runs `.github/workflows/ci.yml`:

```text
npm ci → npm run validate:registry → npm run lint → npm run build
```

The validator checks: exact `framework/category/slug` folder depth, folder ↔
meta consistency, slug format, known categories, unique routes, tags/author
shape, lowercase difficulty, required files for `available` components, and —
for React — default exports (parsed with the TypeScript compiler, not regex)
and a generated preview-map entry. Every error names the exact folder and the
exact problem.

## FAQ

**Do I need to edit any site code?** No. If your PR touches anything outside
your component folder, something's wrong.

**Can I submit a component that isn't finished?** Yes — set `status` to
`draft` or `planned`. It will be listed but exempt from required-file checks.

**My React preview doesn't show up in dev.** Run
`npm run generate:react-previews` and restart the dev server (see the note above).

**Can I use Tailwind classes?** Yes for React components — the site's Tailwind
pipeline picks them up. HTML/CSS components should use plain CSS in `style.css`.

**Who do I ask for help?** Comment on your issue, or open a discussion. Be
excellent to each other per the [Code of Conduct](CODE_OF_CONDUCT.md).
