export type ComponentStatus = "available" | "planned" | "draft";

export type ComponentDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type ComponentMetadata = {
  name: string;
  slug: string;
  category:
    | "Buttons"
    | "Cards"
    | "Navbars"
    | "Forms"
    | "Loaders"
    | "Hero Sections"
    | "Dashboards"
    | "Modals"
    | "Text Effects"
    | "Backgrounds";
  description: string;
  tags: string[];
  difficulty: ComponentDifficulty;
  author: string;
  status: ComponentStatus;
};

export const componentsRegistry: ComponentMetadata[] = [
  {
    name: "Prism",
    slug: "prism",
    category: "Backgrounds",
    description: "Animated WebGL prism background for expressive hero sections and feature moments.",
    tags: ["webgl", "ogl", "hero", "background"],
    difficulty: "Advanced",
    author: "React Bits",
    status: "available",
  },
  {
    name: "Glass CTA",
    slug: "glass-cta",
    category: "Buttons",
    description: "A polished primary and secondary call-to-action pair for dark landing pages.",
    tags: ["button", "cta", "glass", "dark"],
    difficulty: "Beginner",
    author: "Prism Bits",
    status: "planned",
  },
  {
    name: "Registry Card",
    slug: "registry-card",
    category: "Cards",
    description: "A compact metadata card for previewing copy-ready UI components.",
    tags: ["card", "registry", "metadata"],
    difficulty: "Beginner",
    author: "Prism Bits",
    status: "planned",
  },
  {
    name: "Floating Nav",
    slug: "floating-nav",
    category: "Navbars",
    description: "A rounded glass navigation bar aligned with the Prism Bits landing page.",
    tags: ["navbar", "glass", "navigation"],
    difficulty: "Intermediate",
    author: "Prism Bits",
    status: "draft",
  },
];
