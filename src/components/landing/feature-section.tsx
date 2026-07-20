import { Code2, GitBranch, Layers3, Sparkles } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionBadge } from "@/components/common/section-badge";

const features = [
  {
    icon: Sparkles,
    title: "Open-source components",
    description: "A growing set of expressive UI bits designed for real product surfaces.",
  },
  {
    icon: Code2,
    title: "Multi-framework snippets",
    description: "A foundation for React now, with room for HTML/CSS/JS and other framework examples.",
  },
  {
    icon: GitBranch,
    title: "Built for contributors",
    description: "Simple registry metadata and category folders make additions easy to review.",
  },
  {
    icon: Layers3,
    title: "Copy, customize, ship",
    description: "Readable source-first components with visual previews and practical tags.",
  },
];

export function FeatureSection() {
  return (
    <Container id="features" className="relative pb-24 scroll-mt-24">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-purple-950/10 backdrop-blur-2xl sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionBadge>Why Prism Bits?</SectionBadge>
            <h2 className="mt-5 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Component previews first, source code always close.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              Prism Bits is organized around browsing, previewing, copying, and contributing UI components without hiding the implementation behind a heavy system.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-[1.35rem] border border-white/10 bg-black/20 p-5">
                <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                  <feature.icon className="size-5 text-accent-2" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
