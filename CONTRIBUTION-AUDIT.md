# Prism Bits — Component Contribution Workflow Audit

Audited: 2026-07-19 · Repo state: commit `06b53df` (main)
Scope: full repository scan — routes, registry code, validation script, all 14 `meta.json` examples, docs pages, config, git history. No files were modified.

---

## 1. Current architecture summary

### How components are stored

Components live as **folders on the filesystem** under `src/components/registry/<framework>/<category>/<slug>/`, each containing a `meta.json` plus (optionally) source files. There is **no central list of components** — but there IS a central list of **categories**.

- `src/lib/registry.ts:130` — discovery: `fg("src/components/registry/**/**/**/meta.json")` (fast-glob). Any `meta.json` at any depth under `src/components/registry/` is picked up. The `**/**/**` pattern is redundant (equivalent to `**`) but harmless.
- `src/data/components-registry.ts:38-111` — the **12 hardcoded categories** (`buttons`, `cards`, `navbars`, `forms`, `loaders`, `hero-sections`, `backgrounds`, `text-effects`, `modals`, `dashboards`, `bento-grids`, `footers`), plus all TypeScript types (`ComponentMetadata`, `ComponentFramework`, etc.).

### How metadata reaches the UI

`src/lib/registry.ts:67-127` (`loadComponentFromMeta`) parses each `meta.json`, **leniently normalizes** it (invalid `difficulty` → `"Beginner"`, invalid `status` → `"draft"`, missing author → `"Prism Bits"`), and reads sibling files **by fixed filename convention** (`registry.ts:89-96`):

| File | Read into |
|---|---|
| `index.html` | `files.html` |
| `style.css` | `files.css` |
| `script.js` | `files.js` |
| `component.tsx` / `component.vue` / `component.svelte` | component source → `files.code` |
| `code.ts` | overrides `files.code` entirely (`registry.ts:98`) |
| `preview.tsx` | `files.preview` — **read but never rendered anywhere (dead field)** |

If `name`, `slug`, `category`, `framework`, or `description` is missing/invalid, the component is **silently skipped** with only a server console warning (`registry.ts:79-82`).

### Routing / static generation

- `src/app/components/page.tsx` — category grid with client-side search (`category-search.tsx`).
- `src/app/components/[category]/page.tsx:12-16` — `generateStaticParams` from the hardcoded category list; renders `ComponentBrowserLayout` (sidebar + first component).
- `src/app/components/[category]/[slug]/page.tsx:13-20` — `generateStaticParams` from the **discovered registry**, so every valid `meta.json` becomes a static route `/components/<category>/<slug>` automatically.
- `src/components/component-browser/component-browser-layout.tsx:17-24` — 404s if the category is unknown or has zero components.

### How previews are rendered (`src/components/component-browser/component-preview-panel.tsx:52-78`)

Three completely different mechanisms, branched on `meta.framework`:

1. **`react`** → `<ComponentPreview slug={...} />` from `src/components/landing/component-preview.tsx:8-48` — a **hardcoded `if (slug === ...)` chain** with handwritten mock JSX for exactly 3 slugs (`glass-cta`, `registry-card`, `floating-nav`) and a generic sparkles placeholder for everything else. **Contributor React code is never imported or executed** — there are no dynamic imports anywhere in `src/` (verified by grep: no `next/dynamic`, no `import(`).
2. **`html-css-js` / `css-only`** → sandboxed `<iframe srcDoc>` (`sandbox="allow-scripts"`, no `allow-same-origin` — panel line 68) assembled by `createIframeDocument` (lines 8-50) from `files.html` + `files.css` + `files.js`. This is real, live, and safely isolated.
3. **`vue` / `svelte`** → no rendering at all; a static `<pre>` of `files.code` labelled "Snippet preview".

### Is contribution automatic or manual?

**Hybrid.** Listing, routing, search, detail page, and code tabs are fully automatic from `meta.json` + files. But:
- A **live React preview requires manually editing** `src/components/landing/component-preview.tsx` (hardcoded slug switch) — de-facto manual registration for React.
- A **new category** requires editing `src/data/components-registry.ts`.

### Flow diagram

```
Contributor folder (meta.json + files)
  → fast-glob discovery                 src/lib/registry.ts:130
  → parse + lenient normalize           src/lib/registry.ts:67-127
  → (separate, manual) strict validate  scripts/validate-registry.mjs
  → category/listing pages              src/app/components/**
  → static route per component          [category]/[slug]/page.tsx generateStaticParams
  → preview panel (3 mechanisms)        component-preview-panel.tsx
  → code + usage tabs, copy button      component-code-tabs.tsx
```

---

## 2. Supported contribution types

Framework values enforced by both `src/lib/registry.ts:24` and `scripts/validate-registry.mjs:7`: `react`, `html-css-js`, `vue`, `svelte`, `css-only`.

| Type | Exact directory | Required files (per CONTRIBUTING.md:77-83) | Optional files | Preview mechanism | Current real status |
|---|---|---|---|---|---|
| HTML/CSS/JS | `src/components/registry/html-css-js/<category>/<slug>/` | `index.html`, `style.css`, `meta.json` | `script.js`, `code.ts` | Live sandboxed iframe | ✅ **Fully working** — 3 real examples (`corner-outline-button`, `offset-border-button`, `retro-shadow-button`) |
| CSS-only | `src/components/registry/css-only/<category>/<slug>/` | `index.html`, `style.css`, `meta.json` | `code.ts` | Live sandboxed iframe (same branch as html-css-js) | ⚠️ Pipeline works, but **both existing examples (`pulse-loader`, `ink-highlight`) are meta-only stubs with no source files** |
| React | `src/components/registry/react/<category>/<slug>/` | `component.tsx`, `meta.json` | `preview.tsx` (dead), `code.ts` | **Hardcoded mock per slug** in `component-preview.tsx`; contributor code never runs | ⚠️ **8 meta-only stubs, zero real `component.tsx` files exist.** Live preview requires maintainer code edits |
| Vue | `src/components/registry/vue/<category>/<slug>/` | `component.vue`, `meta.json` | `code.ts` | Static code snippet only | ⚠️ 1 meta-only stub (`soft-modal`); no renderer |
| Svelte | `src/components/registry/svelte/<category>/<slug>/` | `component.svelte`, `meta.json` | `code.ts` | Static code snippet only | ⚠️ 1 meta-only stub (`project-footer`); no renderer |

**Only HTML/CSS/JS (and by extension CSS-only) contributions currently produce a genuine end-to-end result** (folder → listing → live preview → copyable code) without maintainer intervention.

---

## 3. Exact current contribution flow (as the repo works today)

There are no issue templates, PR templates, or CI, so steps 1–2 and 10 are informal.

1. **Issue assignment** — no `.github/` directory exists; no ISSUE_TEMPLATE, no assignment automation. Entirely manual/informal.
2. **Branch** — no documented convention; no branch protection config in repo.
3. **Create folder** — `src/components/registry/<framework>/<category>/<slug>/` (CONTRIBUTING.md:14-52 shows examples).
4. **Add implementation files** — by fixed filename (see §2). Filenames are load-bearing: `src/lib/registry.ts:89-96` reads exactly `index.html`, `style.css`, `script.js`, `component.tsx`, `component.vue`, `component.svelte`, `preview.tsx`, `code.ts`. Any other filename is ignored.
5. **Add `meta.json`** — schema in §5. CONTRIBUTING.md:58-73 has a valid example.
6. **Assets/dependencies** — `dependencies: string[]` in meta (display-only, see §5). No mechanism for images or extra assets exists; `public/` contains only the two brand logos.
7. **Run locally** — `npm run dev` (package.json), open `http://localhost:3000/components/<category>/<slug>`.
8. **Validate registry** — `npm run validate:registry` → `node scripts/validate-registry.mjs`.
9. **Lint + build** — `npm run lint` (`eslint src next.config.ts eslint.config.mjs`) and `npm run build` (`next build`). All three commands are listed in CONTRIBUTING.md:87-93.
10. **Open PR** — checklist in CONTRIBUTING.md:95-100 (correct folder, unique slug, works locally, screenshots). Nothing enforces it.

> ⚠️ For React components there is an **undocumented step 4b**: edit `src/components/landing/component-preview.tsx` to add a hardcoded preview for your slug — otherwise the preview shows a generic sparkles placeholder.

---

## 4. Component folder anatomy (derived from actual repo contents)

```
src/components/registry/
├── html-css-js/
│   ├── buttons/
│   │   ├── retro-shadow-button/        ✅ the reference example
│   │   │   ├── index.html
│   │   │   ├── style.css
│   │   │   └── meta.json
│   │   ├── corner-outline-button/      (same shape)
│   │   ├── offset-border-button/       (same shape)
│   │   └── glass-button/               ⚠️ empty (.gitkeep only) yet referenced by docs page
│   └── forms/focus-field/              ⚠️ meta.json only
├── css-only/
│   ├── loaders/pulse-loader/           ⚠️ meta.json only (status "draft")
│   └── text-effects/ink-highlight/     ⚠️ meta.json only, but status "available"
├── react/
│   ├── backgrounds/prism/              ⚠️ meta.json only — real source lives in ../../Prism/
│   ├── buttons/glass-cta/              ⚠️ meta.json + .gitkeep, no component.tsx
│   ├── cards/registry-card/            ⚠️ meta.json only
│   ├── navbars/floating-nav/           ⚠️ meta.json only
│   ├── hero-sections/launch-hero/      ⚠️ meta.json only
│   ├── dashboards/metric-rail/         ⚠️ meta.json only
│   └── bento-grids/feature-bento/      ⚠️ meta.json only
├── vue/
│   ├── buttons/glow-button/            ⚠️ empty (.gitkeep)
│   └── modals/soft-modal/              ⚠️ meta.json only
├── svelte/
│   ├── buttons/pulse-button/           ⚠️ empty (.gitkeep)
│   └── footers/project-footer/         ⚠️ meta.json only
├── Prism/                              ❗ PascalCase, no meta.json — site infrastructure
│   ├── Prism.tsx  (WebGL background used by the landing page itself,
│   │               imported by src/components/landing/gradient-background.tsx)
│   ├── Prism.css
│   └── index.ts
└── buttons/ cards/ forms/ loaders/ navbars/ sections/   ❗ six legacy top-level
    └── .gitkeep                        category dirs, not framework-scoped;
                                        "sections" is not even a valid category slug
```

The **only complete, canonical examples** in the repo are the three `html-css-js/buttons/*` components.

---

## 5. Metadata contract

Two parallel definitions exist: lenient runtime (`src/lib/registry.ts`) and strict validator (`scripts/validate-registry.mjs`). They disagree in places.

| Field | Type | Required? | Purpose | Validation (validator / runtime) | Consumed by |
|---|---|---|---|---|---|
| `name` | string | ✅ both | Display name, H1, sort key | validator: presence only / runtime: non-empty or component skipped | detail panel h1, sidebar, cards, `usage` fallback `<NameNoSpaces />` (`registry.ts:117`) |
| `slug` | string | ✅ both | URL segment `/components/<category>/<slug>` | validator: `^[a-z0-9]+(?:-[a-z0-9]+)*$` (`validate-registry.mjs:6,47`) / runtime: non-empty only | routing, `generateStaticParams`, sidebar links, search |
| `category` | string | ✅ both | Which category page lists it | validator: must match a slug regex-scraped from `components-registry.ts` (`validate-registry.mjs:12-18,48`) / runtime: any non-empty string (⚠️ unknown category = component exists but is unreachable) | routing, grouping, category counts |
| `framework` | enum | ✅ both | Preview mechanism + badge | both check against the same 5-value set | preview branching (`component-preview-panel.tsx:53-54`), badges, search |
| `description` | string | ✅ runtime (skip) / ✅ validator (presence) | Card + detail copy | non-empty (runtime) | detail panel, cards, search |
| `tags` | string[] | ✅ validator (`validate-registry.mjs:54-56`) / optional runtime (defaults `[]`) | Chips + search | array of strings | tag chips, search text |
| `status` | `"available" \| "planned" \| "draft"` | ✅ validator presence / runtime defaults `"draft"` | Badge only | enum check both sides | badges in sidebar/cards. **Does NOT hide a component** — `planned`/`draft` components are listed and routable |
| `difficulty` | string | optional | Badge | validator accepts **both** `"beginner"` and `"Beginner"` casings (`validate-registry.mjs:9`); runtime lowercases and normalizes (`registry.ts:27-34`) | difficulty badge |
| `author.name` | string | ✅ validator (`validate-registry.mjs:57-59`) / runtime defaults `"Prism Bits"` | Credit line | string check | detail panel "Author:" line |
| `author.github` | string | optional | Credit handle | none — **not validated, rendered as plain text `@handle`, not a link** (`component-detail-panel.tsx:32`) | detail panel |
| `dependencies` | string[] | optional | Informational chips | none — free-form strings, nothing installs or verifies them | "Dependencies" section (`component-detail-panel.tsx:39-50`) |

### Direct answers

- **Enforced (validator):** presence of `name/slug/category/framework/description/tags/status/author`, slug pattern, category existence, framework/status/difficulty enums, `author.name`, **duplicate `category/slug` route detection** (`validate-registry.mjs:61-65`).
- **Enforced (runtime):** only name/slug/category/framework/description non-empty; everything else silently defaulted.
- **In examples but not validated:** `author.github` (9 of 14 metas), `dependencies` (only `react/backgrounds/prism`).
- **Used by UI:** everything except `files.preview` (dead) — see below.
- **Unused:** `files.preview` / `preview.tsx` (read at `registry.ts:95`, never rendered); `ComponentCategory.targets` is UI-decorative only (category cards).
- **Naming/slug rules:** slug format enforced by validator only. **Folder name ↔ `slug`, folder framework segment ↔ `framework`, folder category segment ↔ `category` are NOT checked anywhere** — a meta in `react/buttons/x/` may claim `"framework": "vue", "category": "modals"` and both tools accept it.
- **Duplicates:** validator catches duplicate `category/slug`. Runtime does not — `getComponentBySlug` silently returns the first match (`registry.ts:144-147`). Note the URL has **no framework segment**, so a React and an HTML version of "glass-cta" in the same category **cannot coexist** under the same slug.
- **Categories restricted:** yes, to the 12 in `components-registry.ts` — but only by the validator, and only via a **regex scrape of TypeScript source** (`validate-registry.mjs:12-16`), which is fragile.
- **Dependencies:** display-only string array. No allow-list, no version pinning, no install step.
- **Author credit:** `author.name` (+ non-linked github handle) on the detail page only.

### Valid example (copied from `src/components/registry/html-css-js/buttons/retro-shadow-button/meta.json`)

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

---

## 6. Preview and rendering system

- **Route → component:** `[category]/[slug]/page.tsx` → `ComponentBrowserLayout` → `getComponentBySlug(category, slug)` (`registry.ts:144-147`) — a linear scan of the full registry re-globbed per call (each helper calls `getComponentsRegistry()` again; no caching, fine at current scale).
- **React:** *not imported at all.* `component-preview.tsx` is a manually-maintained mock gallery keyed by slug. Contributor `.tsx` files are read as **text** for the code tab only. Consequences: zero security risk today, and zero live React previews without maintainer work.
- **HTML/CSS/JS & CSS-only:** assembled into a full `srcDoc` document with a fixed dark backdrop and centering grid (`component-preview-panel.tsx:8-50`). `sandbox="allow-scripts"` **without** `allow-same-origin` — scripts run but are origin-isolated: no cookies, no parent DOM, no site storage. Contributor CSS/JS **cannot leak into the main app**. Missing `allow-same-origin` is the correct choice; keep it.
- **Vue/Svelte:** never rendered; static snippet.
- **Third-party dependencies:** do not work in any preview. The iframe has no network-restricted CSP, so `<script src="https://cdn...">` would actually load — worth noting as an open risk (e.g. crypto-miner or fingerprinting script inside a "component"); a `csp` attribute or review rule is advisable. React deps are moot since code never runs.
- **Can contributor code break the site?** Runtime: no (iframe sandbox + never-imported React). Build: only via invalid JSON, which is skipped with a warning (`registry.ts:123-126`) — so a broken meta silently *disappears* rather than failing the build. That silence is itself a problem: **`next build` passes even when a component was dropped.**
- **Limitations contributors must know:** exact filenames required; no images/assets pipeline; no framework in URL (slug is unique per category across frameworks); iframe is dark-background only (light-theme components look wrong); React/Vue/Svelte have no live preview.

**Maintainability risk (critical):** the hardcoded React preview file guarantees that either every React PR touches shared site code (`component-preview.tsx`) — merge conflicts, review load — or React previews are permanently fake.

---

## 7. Validation and quality checks

| Command | Purpose | Required before PR? (per CONTRIBUTING.md:87-93) | Current limitations |
|---|---|---|---|
| `npm run validate:registry` | meta.json schema, slug pattern, category existence, enum values, duplicate routes | Yes (documented) | No folder↔meta consistency; no file-existence check (meta-only stubs pass); category list scraped by regex; accepts both difficulty casings |
| `npm run lint` | ESLint (`eslint-config-next` core-web-vitals + TS) over `src`, configs | Yes (documented) | Does not lint contributor HTML/CSS/JS payloads (they're data, not modules) |
| `npm run build` | `next build` — type-checks site code, prerenders all component routes | Yes (documented) | Invalid meta is skipped with a console warning, so build **passes** while silently dropping components |
| `npm run dev` | Manual visual check | Implied ("component page works locally") | Nothing records that it was done; no screenshot requirement enforcement |

**CI: none.** There is no `.github/` directory at all — no workflows, no PR/issue templates, no CODEOWNERS. **Every check currently depends on contributors or maintainers remembering to run it locally.** There are also no tests of any kind and no git hooks (no husky, no `prepare` script in `package.json`).

---

## 8. Problems and ambiguities

### Critical

1. **React preview is manual & fake.** `src/components/landing/component-preview.tsx:8-48` hardcodes 3 slugs. Every real React contribution either edits shared site code or gets a placeholder. This is the single biggest blocker to scaling contributions.
2. **No CI.** No `.github/workflows/`. `validate:registry`/`lint`/`build` are honor-system. A broken `meta.json` can merge and silently vanish from the site (`registry.ts:123-126`).
3. **Docs page contradicts CONTRIBUTING.md.** `src/app/docs/page.tsx:38` tells contributors to *"Register the component in src/data/components-registry.ts"* — false; `CONTRIBUTING.md:3` correctly says no central registration. First-time contributors will follow the website.
4. **11 of 14 registry entries are meta-only stubs** (all react, vue, svelte, css-only, plus `html-css-js/forms/focus-field`). Two are even marked `"status": "available"` (`glass-cta`, `ink-highlight`) with no source — the site shows "Live iframe preview"/"Live React preview" over placeholder content, and the code tab shows *"… source coming soon."* Contributors copying any of these as a template will produce empty components that pass validation.

### Important

5. **No folder↔meta consistency checks.** Folder path segments (framework/category/slug) are never compared to meta fields; the glob would even accept `meta.json` directly under `registry/`. (`src/lib/registry.ts:130`, `scripts/validate-registry.mjs:19-21`)
6. **Slug uniqueness is per category across frameworks** — URL is `/components/<category>/<slug>` with no framework segment, so "the same button in React and HTML" needs two different slugs. Nothing documents this; the validator error ("Duplicate component route") is the only hint.
7. **Six legacy top-level category folders** (`registry/buttons`, `cards`, `forms`, `loaders`, `navbars`, `sections` — `.gitkeep` only) predate the framework-first layout (git `b08f8a6` → `f4a62d0`) and invite putting components in the wrong place. `sections` isn't even a category slug.
8. **`registry/Prism/` (PascalCase) is site infrastructure inside the contributor namespace** — imported by `src/components/landing/gradient-background.tsx:1`. Meanwhile `react/backgrounds/prism/meta.json` describes it but contains no source, so its code tab is empty. Confusing precedent for where React source belongs.
9. **`preview.tsx` and `files.preview` are dead** (`registry.ts:95,115` — never rendered). CONTRIBUTING.md:79 still tells React contributors to add `preview.tsx`.
10. **Silent skip on invalid meta at runtime** — a component can pass review visually, later break its JSON in a rebase, and disappear without failing anything.
11. **Docs page folder example references a non-existent file** — `html-css-js/buttons/glass-button/index.html` (`docs/page.tsx:44`); that folder is empty.

### Minor

12. Difficulty casing inconsistent across examples (`"beginner"` in retro-shadow vs `"Beginner"` elsewhere); validator accepts both (`validate-registry.mjs:9`).
13. Homepage `SearchFilters` (`src/components/landing/search-filters.tsx`) is non-functional decoration — static chips, a Filters button that does nothing.
14. `author.github` rendered as plain text, not a link (`component-detail-panel.tsx:32`).
15. `ComponentCategory.targets` duplicates framework info by hand and can drift from reality (e.g. Cards lists "HTML/CSS/JS" but no such component exists).
16. Iframe previews allow external network loads (no CSP) — low risk today, worth a rule + review check.
17. Redundant glob `**/**/**` in both `registry.ts:130` and `validate-registry.mjs:19`.
18. No README.md at repo root; CONTRIBUTING.md is the only doc, and the `/docs` page duplicates (and contradicts) it.
19. `tsconfig.tsbuildinfo` is committed (build artifact, should be ignored).
20. `status` doesn't gate visibility — `draft` components are public. Either document this or filter them.

---

## 9. Recommended canonical contribution flow

Keep the existing architecture (filesystem registry + meta.json + static routes) — it is fundamentally sound. Fix the edges.

### What contributors do

1. **Claim an issue first** (one component = one issue = one PR). Comment to get assigned; maintainer applies labels (`component`, `ecsoc`, framework label).
2. Branch: `component/<framework>/<slug>` (e.g. `component/html-css-js/neon-toggle`).
3. Scaffold `src/components/registry/<framework>/<category>/<slug>/` where **folder names must equal `meta.framework`, `meta.category`, `meta.slug`** (make the validator enforce this — see below).
4. Add required files for the framework (§2 table) + `meta.json`. Copy `html-css-js/buttons/retro-shadow-button/` as the golden template.
5. `npm run dev` → verify `/components/<category>/<slug>` renders, preview works, code tab is complete, copy button copies working code.
6. `npm run validate:registry && npm run lint && npm run build` — all green.
7. Open PR using the PR template, with a screenshot (and a GIF/video if animated). PR title: `feat(component): <framework>/<slug>`.

### What should happen automatically (to build)

- **CI workflow** (`.github/workflows/validate.yml`) running `validate:registry`, `lint`, `build` on every PR — this repo's three commands already exist; wiring them up is ~20 lines of YAML.
- **Validator upgrades** (all in `scripts/validate-registry.mjs`, no app changes):
  - folder segments must equal `framework`/`category`/`slug`;
  - required source files must exist per framework (kills meta-only stubs);
  - `status: "available"` requires source files;
  - single difficulty casing;
  - reject unknown files in the component folder (allow-list).
- **React preview automation** (the one real code change): replace the hardcoded slug switch with a generated import map (e.g. a small script that emits `preview-map.ts` from `component.tsx` files, or `next/dynamic` with a known path pattern `@/components/registry/react/<category>/<slug>/component`). Until built, **pause React contributions or explicitly document that React previews are code-only.**

### What Project Admins verify

Review = quality + originality + safety (checklist in §12). Admins should *not* need to check schema mechanics — CI does that.

### What gets rejected / needs prior approval

- **Reject:** unclaimed drive-by component PRs when an assignment policy is active; meta-only stubs; components copied from other libraries without license/attribution; PRs touching shared site code (`src/app`, `src/components/{common,landing,component-browser}`, `src/lib`) mixed into a component PR; external `<script src>`/trackers in iframe components; duplicate of an existing component with trivial differences.
- **Prior approval required:** new categories (edit to `src/data/components-registry.ts`), new frameworks, any dependency beyond what the site already ships (`react`, `framer-motion`, `lucide-react`, `ogl` — from `package.json`), changes to registry/validator code.

---

## 10. Recommended official rules

| Rule | Level |
|---|---|
| Component `name` is unique, descriptive Title Case; `slug` is its kebab-case form | **Mandatory** |
| Folder path segments exactly match `meta.framework`/`meta.category`/`meta.slug` | **Mandatory** |
| Category must be one of the 12 in `src/data/components-registry.ts`; new categories via separate approved issue | **Mandatory** |
| One slug = one component; check the category page and open PRs for duplicates before starting | **Mandatory** |
| Framework must be one of the 5 supported values; put source in that framework's tree only | **Mandatory** |
| All required source files present; `status: "available"` only with working source + preview | **Mandatory** |
| `meta.json` passes `npm run validate:registry` | **Mandatory** |
| Original work or license-compatible with attribution in the PR description | **Mandatory** |
| No external network requests (CDN scripts, fonts, trackers, analytics) inside component code | **Mandatory** |
| No new npm dependencies without prior maintainer approval | **Mandatory** |
| JS must not use `document.cookie`, storage APIs, `fetch` to third parties, or `eval` | **Mandatory** |
| One component per PR; no changes to shared site code in a component PR | **Mandatory** |
| Screenshot (or GIF for animated components) attached to the PR | **Mandatory** |
| Responsive: usable from 360 px width; no fixed pixel layouts that overflow | **Recommended** (Mandatory for section-scale components: heroes, navbars, footers, bento) |
| Accessibility: focus-visible states, `aria-*` where interactive, 4.5:1 text contrast, `prefers-reduced-motion` respected for animation | **Recommended** |
| Looks correct on the dark preview backdrop (current iframe is dark-only); document light-mode behavior if any | **Recommended** |
| Modern evergreen browser support; no vendor-prefix-only features | **Recommended** |
| `tags`: 3–6 lowercase single words; `description`: one sentence, ≤ 140 chars | **Recommended** |
| `author.github` filled in so credit is visible | **Recommended** |
| `difficulty` set honestly (`beginner`/`intermediate`/`advanced`, pick one canonical casing) | **Recommended** |
| `code.ts` override for a hand-polished copyable snippet | **Optional** |
| Extra usage notes in PR description | **Optional** |

---

## 11. Contributor checklist (for CONTRIBUTING.md / PR template)

```markdown
- [ ] I was assigned the issue for this component before opening the PR
- [ ] One component only; no changes outside `src/components/registry/<framework>/<category>/<slug>/`
- [ ] Folder names match `framework`, `category`, and `slug` in `meta.json` exactly
- [ ] All required files for my framework are present (see CONTRIBUTING.md table)
- [ ] `meta.json` is valid — `npm run validate:registry` passes
- [ ] The component page renders locally at `/components/<category>/<slug>` (`npm run dev`)
- [ ] The preview shows the real component (not a placeholder) and the Copy button yields working code
- [ ] The component is responsive and keyboard-accessible
- [ ] No external scripts, fonts, network calls, or new npm dependencies
- [ ] This is my original work (or attribution + compatible license is stated below)
- [ ] `npm run lint` passes
- [ ] `npm run build` passes with no `[registry] Skipping` warnings
- [ ] Screenshot / GIF attached
```

## 12. Maintainer review checklist

```markdown
- [ ] PR links to an assigned issue; ECSoC label applied if applicable
- [ ] Not a duplicate of an existing component or an open PR (check category page + PR list)
- [ ] Diff touches only `src/components/registry/<framework>/<category>/<slug>/`
- [ ] CI green: validate:registry, lint, build (until CI exists: ran all three locally)
- [ ] Folder ↔ meta.json consistency (framework, category, slug)
- [ ] `status` value honest (`available` only if fully working)
- [ ] Preview verified locally — real render, correct on mobile width
- [ ] Code tab content is complete and copy-paste works in a scratch file
- [ ] Visual quality meets bar (spacing, states, dark-backdrop legibility)
- [ ] Accessibility spot-check: tab focus, contrast, reduced-motion
- [ ] JS reviewed: no network calls, storage, cookies, eval, obfuscated code
- [ ] No new dependencies; `dependencies` array in meta matches reality
- [ ] Originality: not lifted from another library without attribution
- [ ] Author credit present in meta.json
- [ ] Squash-merge with `feat(component): <framework>/<slug>` title
```

---

## 13. Final recommendation

**Verdict: the flow needs small-to-moderate corrections before inviting contributors — but no structural redesign.** The filesystem registry, meta contract, validator, and iframe preview are a solid foundation; the HTML/CSS/JS path works end-to-end today. The blockers are the fake React preview path, the absence of CI, contradictory docs, and a registry full of stub examples that will be copied as templates.

### 1. Must fix before opening contributions

1. Fix `src/app/docs/page.tsx:38` — remove "Register the component in src/data/components-registry.ts" (contradicts reality) and the dead `glass-button` example at line 44.
2. Decide React strategy: build the dynamic preview map, **or** restrict the first contribution wave to `html-css-js`/`css-only` and say so. Do not accept React PRs into the hardcoded-preview system.
3. Add CI: one workflow running `npm run validate:registry && npm run lint && npm run build` on PRs.
4. Strengthen `scripts/validate-registry.mjs`: folder↔meta consistency, required-files-per-framework existence, `available` ⇒ source present.
5. Delete or complete the meta-only stubs (at minimum flip `glass-cta` and `ink-highlight` off `available`); delete the six legacy top-level category folders and the empty `glass-button`, `glow-button`, `pulse-button` folders.
6. Move `registry/Prism/` out of the contributor namespace (e.g. `src/components/effects/Prism/`) and update the import in `gradient-background.tsx` — or make it the first real `react/backgrounds/prism` component with actual source in place.
7. Add `.github/` PR template + component issue template embedding the §11 checklist.

### 2. Should fix during the first week

8. Update CONTRIBUTING.md with: folder↔meta rule, slug-unique-per-category (across frameworks!) rule, exact filename table, dark-backdrop note, dependency policy, one-component-per-PR rule.
9. Make runtime skip-warnings fatal in CI builds (e.g. env flag that turns `[registry] Skipping` into an error).
10. Remove dead `preview.tsx`/`files.preview` plumbing from `registry.ts` and CONTRIBUTING.md, or implement it.
11. Standardize difficulty casing (pick lowercase; normalize the validator and all 14 metas).
12. Add a README.md pointing to CONTRIBUTING.md.
13. Link `author.github` to the profile in `component-detail-panel.tsx`.

### 3. Can improve later

14. Vue/Svelte live previews (Sandpack/WebContainer or precompiled iframes) — until then label them "code-only".
15. Replace regex category-scrape in the validator with a JSON source of truth imported by both TS and the script.
16. Wire up the decorative homepage `SearchFilters` or remove it.
17. CSP on the preview iframe to block external loads.
18. Light-mode preview toggle; screenshot automation; `targets` derived from actual registry contents instead of hand-written.
19. Ignore `tsconfig.tsbuildinfo`; consider a `component/new` scaffold script (`npm run new:component`) that generates a valid folder from prompts.

---

*Every claim above cites the file it was derived from; line numbers refer to the current working tree at commit `06b53df`.*
