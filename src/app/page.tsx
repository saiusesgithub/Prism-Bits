import { ArrowRight, Boxes, Code2, GitBranch, Layers3, Sparkles } from "lucide-react";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { SectionBadge } from "@/components/common/section-badge";
import { FeatureCard } from "@/components/landing/feature-card";

const features = [
  {
    icon: Sparkles,
    title: "Polished by default",
    description: "Premium dark UI bits with thoughtful spacing, subtle motion, and prism-accented details.",
  },
  {
    icon: Code2,
    title: "Copy-first source",
    description: "Every component is designed to be readable, portable, and simple to customize in your app.",
  },
  {
    icon: Layers3,
    title: "Built for growth",
    description: "A registry-ready structure keeps future community contributions organized from day one.",
  },
];

const stats = [
  { label: "App Router", value: "Next.js" },
  { label: "Design system", value: "shadcn-ready" },
  { label: "Motion", value: "Framer" },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="prism-grid pointer-events-none absolute inset-x-0 top-0 h-[720px]" />
      <Container className="relative pt-28 pb-20 sm:pt-36 lg:pt-44">
        <section className="mx-auto max-w-5xl text-center">
          <SectionBadge>Open-source UI component library</SectionBadge>
          <h1 className="mt-8 text-balance text-5xl font-semibold tracking-normal text-foreground sm:text-7xl lg:text-8xl">
            Prism Bits
          </h1>
          <p className="prism-text mx-auto mt-5 max-w-4xl text-balance text-2xl font-medium sm:text-4xl">
            Beautiful open-source UI bits you can copy, customize, and ship.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg">
            A contributor-friendly component library starter with a premium dark interface, reusable primitives, and a registry path ready for future UI bits.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/components" size="lg">
              Browse components
              <ArrowRight className="size-4" />
            </Button>
            <Button href="https://github.com" variant="secondary" size="lg">
              <GitBranch className="size-4" />
              GitHub
            </Button>
          </div>
        </section>

        <section className="mt-20 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-3 shadow-2xl shadow-purple-950/20 backdrop-blur md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/[0.08] bg-black/20 px-6 py-5 text-left">
              <p className="text-sm text-muted">{stat.label}</p>
              <p className="mt-2 text-xl font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </section>
      </Container>

      <Container className="relative pb-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionBadge>Why Prism Bits</SectionBadge>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              A clean base for shipping reusable interface pieces.
            </h2>
          </div>
          <Button href="/docs" variant="ghost">
            Read docs
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>

      <Container className="pb-28">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/70 p-8 shadow-2xl shadow-cyan-950/10 sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--accent-2)/0.16),transparent_24rem)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionBadge>Registry starter</SectionBadge>
              <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-5xl">
                Add bits without losing the shape of the project.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted">
                Prism Bits starts with a simple registry placeholder, dedicated component folders, and shared UI primitives so contributors have obvious places to work.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/35 p-4 font-mono text-sm text-muted">
              <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3 text-xs text-muted">
                <Boxes className="size-4 text-accent-2" />
                src/components/registry
              </div>
              <pre className="overflow-x-auto leading-7">
{`export const componentsRegistry = [
  {
    name: "prism-card",
    status: "planned",
  },
];`}
              </pre>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
