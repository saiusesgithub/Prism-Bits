import { Code2, Eye, GitBranch, Palette, Search } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionBadge } from "@/components/common/section-badge";

const docsSteps = [
  {
    icon: Search,
    title: "Browse components",
    description: "Find UI bits by category, tag, difficulty, or use case.",
  },
  {
    icon: Eye,
    title: "Preview variants",
    description: "Inspect the component in context before copying it into a project.",
  },
  {
    icon: Code2,
    title: "Copy code",
    description: "Use source-first components designed to be readable and portable.",
  },
  {
    icon: Palette,
    title: "Customize",
    description: "Adjust tokens, props, and styles without fighting a heavy abstraction.",
  },
  {
    icon: GitBranch,
    title: "Contribute",
    description: "Add components through a simple registry structure and clear metadata.",
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen pt-36">
      <Container className="pb-24">
        <section className="max-w-3xl">
          <SectionBadge>Docs</SectionBadge>
          <h1 className="mt-6 text-4xl font-semibold tracking-normal text-foreground sm:text-6xl">
            How Prism Bits will work.
          </h1>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
            Prism Bits is a copy-first component library: discover a bit, preview it, copy the source, then shape it to your product.
          </p>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          {docsSteps.map((step) => (
            <article key={step.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                <step.icon className="size-5 text-accent-2" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-foreground">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}
