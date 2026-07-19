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
    code: string;
    usage: string;
    previewSource?: string;
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

export function getCategoryBySlug(slug: string) {
  return componentCategories.find((category) => category.slug === slug);
}
