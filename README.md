# Prism Bits

[![CI](https://github.com/saiusesgithub/Prism-Bits/actions/workflows/ci.yml/badge.svg)](https://github.com/saiusesgithub/Prism-Bits/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg)](LICENSE)

Elegant open-source UI bits you can copy, customize, and ship.

Prism Bits is a copy-first component library: browse a component, preview it live, copy the source into your project, and shape it however you want. No package to install, no abstraction to fight.

## How it works

- **Browse** components by category at `/components`
- **Preview** them live — React components render for real, HTML/CSS/JS components run in a sandboxed iframe
- **Copy** the source from the code tab and paste it into your project

## Supported frameworks

| Framework | Live preview |
|---|---|
| React | ✅ real component render |
| HTML/CSS/JS | ✅ sandboxed iframe |
| CSS-only | ✅ sandboxed iframe |
| Vue | code snippet (renderer planned) |
| Svelte | code snippet (renderer planned) |

## Running locally

```bash
git clone https://github.com/saiusesgithub/Prism-Bits.git
cd Prism-Bits
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Built with Next.js (App Router), Tailwind CSS, and Framer Motion. Components are discovered automatically from the filesystem — see `src/components/registry/`.

## Contributing

New components are very welcome! The flow is simple:

**Claim an issue → get assigned → create your component folder → add code + `meta.json` → test locally → run validation → open a PR with a screenshot.**

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide, and please follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) — use the components anywhere, including commercial projects.
