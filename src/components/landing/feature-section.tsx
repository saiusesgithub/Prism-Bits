import { Code2, GitBranch, Layers3, Sparkles } from "lucide-react";
import { Container } from "@/components/common/container";
import { ScrollReveal } from "@/components/common/scroll-reveal";
import { SectionBadge } from "@/components/common/section-badge";
import { FeatureCard } from "@/components/landing/feature-card";

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
      <ScrollReveal direction="up" duration={0.7}>
        <section className="overflow-hidden rounded-[2rem] border border-border bg-card/60 p-5 shadow-2xl backdrop-blur-2xl sm:p-8">
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
              {features.map((feature, index) => (
                <ScrollReveal key={feature.title} delay={index * 0.1} direction="up">
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </Container>
  );
}
