import { Code2, Eye, GitBranch, Palette, Search } from "lucide-react";
import { Container } from "@/components/common/container";
import { Footer } from "@/components/landing/footer";
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

const contributionSteps = [
  "Pick a framework and category folder under src/components/registry.",
  "Create a slug folder for your bit, like react/buttons/glass-cta.",
  "Add the component source, preview file when supported, code snippet, and meta.json.",
  "Register the component in src/data/components-registry.ts.",
  "Run npm run validate:registry, npm run lint, and npm run build before opening a pull request.",
];

const folderExamples = [
  "react/buttons/glass-cta/component.tsx",
  "html-css-js/buttons/glass-button/index.html",
  "css-only/loaders/pulse-loader/style.css",
  "vue/cards/profile-card/component.vue",
  "svelte/cards/profile-card/component.svelte",
];

export default function DocsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background pt-36">
      <Container className="relative pb-24">
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
            <article key={step.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-purple-950/10 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-white/[0.065]">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                <step.icon className="size-5 text-accent-2" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-foreground">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-purple-950/10 backdrop-blur-2xl sm:p-8">
          <SectionBadge>Contributor guide</SectionBadge>
          <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
                Add a component without guessing the structure.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                Prism Bits keeps component contributions close to their framework and category. Every bit needs source files, a small metadata file, and a registry entry so the site can route, search, and display it.
              </p>
              <ol className="mt-6 space-y-3">
                {contributionSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-white/68">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/25 text-xs text-white/72">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-4">
              <div className="rounded-[1.25rem] border border-white/10 bg-black/25 p-5">
                <h3 className="text-lg font-semibold text-foreground">Folder examples</h3>
                <div className="mt-4 space-y-2 font-mono text-xs text-white/58">
                  {folderExamples.map((example) => (
                    <p key={example}>src/components/registry/{example}</p>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/25 p-5">
                <h3 className="text-lg font-semibold text-foreground">meta.json minimum</h3>
                <pre className="mt-4 overflow-auto rounded-2xl bg-black/45 p-4 text-xs leading-5 text-white/68">
{`{
  "name": "Glass CTA",
  "slug": "glass-cta",
  "category": "buttons",
  "framework": "react",
  "description": "A polished call-to-action button pair.",
  "tags": ["button", "cta", "glass"],
  "status": "available",
  "author": {
    "name": "Contributor Name",
    "github": "github-username"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </Container>
      <Footer />
    </main>
  );
}
