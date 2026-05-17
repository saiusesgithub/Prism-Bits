export type ComponentRegistryItem = {
  name: string;
  title: string;
  description: string;
  status: "planned" | "draft" | "ready";
  href: string;
};

export const componentsRegistry: ComponentRegistryItem[] = [
  {
    name: "prism-card",
    title: "Prism Card",
    description: "A planned starter card component for showcasing the Prism Bits registry format.",
    status: "planned",
    href: "/components/prism-card",
  },
];
