export type ComponentStatus = "available" | "planned" | "draft";

export type ComponentDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type ComponentFramework = "react" | "html-css-js" | "vue" | "svelte" | "css-only";

export type ComponentCategory = {
  name: string;
  slug: string;
  description: string;
  targets: string[];
};

export type ComponentMetadata = {
  name: string;
  slug: string;
  category: string;
  framework: ComponentFramework;
  description: string;
  tags: string[];
  difficulty: ComponentDifficulty;
  author: {
    name: string;
    github?: string;
  };
  status: ComponentStatus;
  dependencies?: string[];
  files: {
    preview: string;
    code: string;
    usage: string;
    html?: string;
    css?: string;
    js?: string;
  };
};

export const componentCategories: ComponentCategory[] = [
  {
    name: "Buttons",
    slug: "buttons",
    description: "Clickable UI bits for actions, forms, and landing pages.",
    targets: ["React", "HTML/CSS/JS", "Vue"],
  },
  {
    name: "Cards",
    slug: "cards",
    description: "Composable content containers for products, dashboards, and docs.",
    targets: ["React", "HTML/CSS/JS"],
  },
  {
    name: "Navbars",
    slug: "navbars",
    description: "Navigation patterns for apps, marketing sites, and docs.",
    targets: ["React", "Vue", "Svelte"],
  },
  {
    name: "Forms",
    slug: "forms",
    description: "Inputs, controls, and field groups for conversion-focused flows.",
    targets: ["React", "HTML/CSS/JS"],
  },
  {
    name: "Loaders",
    slug: "loaders",
    description: "Progress and loading states that feel polished without being loud.",
    targets: ["CSS-only", "React"],
  },
  {
    name: "Hero Sections",
    slug: "hero-sections",
    description: "First-screen layouts for products, portfolios, and tools.",
    targets: ["React", "HTML/CSS/JS"],
  },
  {
    name: "Backgrounds",
    slug: "backgrounds",
    description: "Ambient visuals, grids, gradients, and scene-setting effects.",
    targets: ["React", "CSS-only"],
  },
  {
    name: "Text Effects",
    slug: "text-effects",
    description: "Animated and expressive type treatments for interface moments.",
    targets: ["React", "CSS-only"],
  },
  {
    name: "Modals",
    slug: "modals",
    description: "Dialog and overlay patterns for focused user decisions.",
    targets: ["React", "Vue"],
  },
  {
    name: "Dashboards",
    slug: "dashboards",
    description: "Operational UI sections for metrics, tables, and controls.",
    targets: ["React"],
  },
  {
    name: "Bento Grids",
    slug: "bento-grids",
    description: "Responsive feature grids for products and portfolios.",
    targets: ["React", "HTML/CSS/JS"],
  },
  {
    name: "Footers",
    slug: "footers",
    description: "Footer layouts for docs, SaaS, and open-source project sites.",
    targets: ["React", "HTML/CSS/JS"],
  },
];

export const componentsRegistry: ComponentMetadata[] = [
  {
    name: "Glass CTA",
    slug: "glass-cta",
    category: "buttons",
    framework: "react",
    description: "A polished call-to-action button pair for dark landing pages.",
    tags: ["button", "cta", "glass"],
    difficulty: "Beginner",
    author: { name: "Prism Bits", github: "saiusesgithub" },
    status: "available",
    files: {
      preview: "React live preview",
      code: `export function GlassCTA() {
  return (
    <div className="flex gap-3">
      <button className="rounded-2xl bg-white px-5 py-3 font-bold text-black">
        Get started
      </button>
      <button className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 font-bold text-white">
        Preview
      </button>
    </div>
  );
}`,
      usage: `<GlassCTA />`,
    },
  },
  {
    name: "Registry Card",
    slug: "registry-card",
    category: "cards",
    framework: "react",
    description: "A compact metadata card for previewing copy-ready UI components.",
    tags: ["card", "registry", "metadata"],
    difficulty: "Beginner",
    author: { name: "Prism Bits", github: "saiusesgithub" },
    status: "planned",
    files: {
      preview: "React live preview",
      code: `export function RegistryCard() {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
      <p className="text-sm text-cyan-200">Cards</p>
      <h3 className="mt-2 text-xl font-semibold text-white">Registry Card</h3>
      <p className="mt-3 text-sm text-white/60">Copy-ready component metadata.</p>
    </article>
  );
}`,
      usage: `<RegistryCard />`,
    },
  },
  {
    name: "Floating Nav",
    slug: "floating-nav",
    category: "navbars",
    framework: "react",
    description: "A rounded glass navigation bar aligned with the Prism Bits landing page.",
    tags: ["navbar", "glass", "navigation"],
    difficulty: "Intermediate",
    author: { name: "Prism Bits", github: "saiusesgithub" },
    status: "draft",
    files: {
      preview: "React live preview",
      code: `export function FloatingNav() {
  return (
    <nav className="rounded-3xl border border-white/10 bg-white/[0.08] px-5 py-4 backdrop-blur">
      <a href="/">Prism Bits</a>
    </nav>
  );
}`,
      usage: `<FloatingNav />`,
    },
  },
  {
    name: "Prism",
    slug: "prism",
    category: "backgrounds",
    framework: "react",
    description: "Animated WebGL prism background for expressive hero sections and feature moments.",
    tags: ["webgl", "ogl", "hero", "background"],
    difficulty: "Advanced",
    author: { name: "Prism Bits", github: "saiusesgithub" },
    status: "available",
    dependencies: ["ogl"],
    files: {
      preview: "React live preview",
      code: `import Prism from "@/components/registry/Prism";

export function HeroBackground() {
  return <Prism animationType="rotate" timeScale={0.5} />;
}`,
      usage: `<Prism animationType="rotate" timeScale={0.5} />`,
    },
  },
  {
    name: "Focus Field",
    slug: "focus-field",
    category: "forms",
    framework: "html-css-js",
    description: "A minimal input field with a soft active border and helper copy.",
    tags: ["input", "form", "focus"],
    difficulty: "Beginner",
    author: { name: "Prism Bits" },
    status: "planned",
    files: {
      preview: "Code snippet preview",
      code: `<label class="field">
  <span>Email</span>
  <input placeholder="you@example.com" />
</label>`,
      html: `<label class="field">
  <span>Email</span>
  <input placeholder="you@example.com" />
  <small>We only use this for product updates.</small>
</label>`,
      css: `.field {
  display: grid;
  gap: 0.6rem;
  width: min(100%, 340px);
  color: rgba(255, 255, 255, 0.78);
  font: 500 14px system-ui, sans-serif;
}

.field input {
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  padding: 0 16px;
  outline: none;
}

.field input:focus {
  border-color: rgba(125, 229, 255, 0.7);
  box-shadow: 0 0 0 4px rgba(125, 229, 255, 0.12);
}

.field small {
  color: rgba(255, 255, 255, 0.46);
}`,
      js: `document.querySelector("input")?.addEventListener("input", (event) => {
  event.currentTarget.dataset.filled = String(Boolean(event.currentTarget.value));
});`,
      usage: `Copy the HTML and pair it with your form handler.`,
    },
  },
  {
    name: "Pulse Loader",
    slug: "pulse-loader",
    category: "loaders",
    framework: "css-only",
    description: "A small CSS-only loading indicator for compact interface states.",
    tags: ["loader", "css", "motion"],
    difficulty: "Beginner",
    author: { name: "Prism Bits" },
    status: "draft",
    files: {
      preview: "CSS-only preview",
      code: `.loader {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  animation: pulse 1s infinite;
}`,
      html: `<span class="loader" aria-label="Loading"></span>`,
      css: `.loader {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  display: inline-block;
  background: #9be7ff;
  box-shadow: 0 0 0 0 rgba(155, 231, 255, 0.7);
  animation: pulse 1.25s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(155, 231, 255, 0.65);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 22px rgba(155, 231, 255, 0);
  }
  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(155, 231, 255, 0);
  }
}`,
      usage: `<span class="loader" aria-label="Loading"></span>`,
    },
  },
  {
    name: "Launch Hero",
    slug: "launch-hero",
    category: "hero-sections",
    framework: "react",
    description: "A centered product hero with a restrained badge, headline, and CTAs.",
    tags: ["hero", "landing", "cta"],
    difficulty: "Intermediate",
    author: { name: "Prism Bits" },
    status: "planned",
    files: {
      preview: "React live preview",
      code: `export function LaunchHero() {
  return <section className="text-center">Beautiful UI bits for faster builds.</section>;
}`,
      usage: `<LaunchHero />`,
    },
  },
  {
    name: "Ink Highlight",
    slug: "ink-highlight",
    category: "text-effects",
    framework: "css-only",
    description: "A hand-drawn underline treatment for emphasized inline words.",
    tags: ["text", "underline", "highlight"],
    difficulty: "Beginner",
    author: { name: "Prism Bits" },
    status: "available",
    files: {
      preview: "CSS-only preview",
      code: `.highlight {
  text-decoration: underline;
  text-decoration-color: #f0a3c7;
  text-decoration-thickness: 0.2em;
}`,
      html: `<p class="headline">Build with <span class="highlight">Elegant</span> UI bits.</p>`,
      css: `.headline {
  margin: 0;
  color: white;
  font: 600 36px/1.15 system-ui, sans-serif;
  letter-spacing: -0.02em;
}

.highlight {
  position: relative;
  display: inline-block;
  font-family: Georgia, serif;
  font-style: italic;
}

.highlight::after {
  content: "";
  position: absolute;
  left: 0;
  right: -0.1em;
  bottom: -0.08em;
  height: 0.22em;
  border-radius: 999px;
  background: linear-gradient(90deg, #67e8f9, #c4b5fd, #f0a3c7);
  opacity: 0.72;
  z-index: -1;
}`,
      usage: `<span class="highlight">Elegant</span>`,
    },
  },
  {
    name: "Soft Modal",
    slug: "soft-modal",
    category: "modals",
    framework: "vue",
    description: "A calm modal shell for confirmations and upgrade prompts.",
    tags: ["modal", "overlay", "dialog"],
    difficulty: "Intermediate",
    author: { name: "Prism Bits" },
    status: "planned",
    files: {
      preview: "Vue code snippet",
      code: `<template>
  <dialog class="modal"><slot /></dialog>
</template>`,
      usage: `<SoftModal>Confirm action</SoftModal>`,
    },
  },
  {
    name: "Metric Rail",
    slug: "metric-rail",
    category: "dashboards",
    framework: "react",
    description: "A compact metric strip for dashboard summaries and reports.",
    tags: ["dashboard", "metrics", "data"],
    difficulty: "Intermediate",
    author: { name: "Prism Bits" },
    status: "draft",
    files: {
      preview: "React live preview",
      code: `export function MetricRail() {
  return <div className="grid grid-cols-3 gap-3">...</div>;
}`,
      usage: `<MetricRail />`,
    },
  },
  {
    name: "Feature Bento",
    slug: "feature-bento",
    category: "bento-grids",
    framework: "react",
    description: "A responsive bento section for product features and capability highlights.",
    tags: ["bento", "features", "grid"],
    difficulty: "Intermediate",
    author: { name: "Prism Bits" },
    status: "planned",
    files: {
      preview: "React live preview",
      code: `export function FeatureBento() {
  return <section className="grid gap-4 md:grid-cols-3">...</section>;
}`,
      usage: `<FeatureBento />`,
    },
  },
  {
    name: "Project Footer",
    slug: "project-footer",
    category: "footers",
    framework: "svelte",
    description: "A simple footer for docs and open-source project pages.",
    tags: ["footer", "links", "docs"],
    difficulty: "Beginner",
    author: { name: "Prism Bits" },
    status: "draft",
    files: {
      preview: "Svelte code snippet",
      code: `<footer>
  <a href="/">Prism Bits</a>
</footer>`,
      usage: `<ProjectFooter />`,
    },
  },
];

export function getCategoryBySlug(slug: string) {
  return componentCategories.find((category) => category.slug === slug);
}

export function getComponentsByCategory(categorySlug: string) {
  return componentsRegistry.filter((component) => component.category === categorySlug);
}

export function getComponentBySlug(categorySlug: string, slug: string) {
  return getComponentsByCategory(categorySlug).find((component) => component.slug === slug);
}

export function getFirstComponentForCategory(categorySlug: string) {
  return getComponentsByCategory(categorySlug)[0];
}

export function getCategoryComponentCount(categorySlug: string) {
  return getComponentsByCategory(categorySlug).length;
}

export function getFrameworkLabel(framework: ComponentFramework) {
  const labels: Record<ComponentFramework, string> = {
    react: "React",
    "html-css-js": "HTML/CSS/JS",
    vue: "Vue",
    svelte: "Svelte",
    "css-only": "CSS-only",
  };

  return labels[framework];
}
