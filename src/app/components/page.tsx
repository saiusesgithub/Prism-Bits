import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { SectionBadge } from "@/components/common/section-badge";
import { componentsRegistry } from "@/data/components-registry";

const categories = ["Buttons", "Cards", "Navbars", "Forms", "Loaders", "Hero Sections"];

export default function ComponentsPage() {
  return (
    <main className="min-h-screen pt-36">
      <Container className="pb-24">
        <section className="max-w-3xl">
          <SectionBadge>Components</SectionBadge>
          <h1 className="mt-6 text-4xl font-semibold tracking-normal text-foreground sm:text-6xl">
            Copy-ready UI bits will live here.
          </h1>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
            Browse polished Prism Bits components, preview variants, and copy the source into your own app.
          </p>
        </section>

        <section className="mt-10 grid gap-3 rounded-[2rem] border border-white/10 bg-white/[0.035] p-3 backdrop-blur md:grid-cols-[1fr_auto]">
          <div className="flex min-h-14 items-center gap-3 rounded-[1.35rem] border border-white/[0.08] bg-black/20 px-5 text-muted">
            <Search className="size-5 text-white/55" />
            <span>Search components, tags, or categories</span>
          </div>
          <Button variant="secondary" className="min-h-14">
            <SlidersHorizontal className="size-5" />
            Filters
          </Button>
        </section>

        <section className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/65">
              {category}
            </span>
          ))}
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {componentsRegistry.map((component) => (
            <article key={component.slug} className="min-h-56 rounded-[1.5rem] border border-white/10 bg-card/70 p-6 shadow-2xl shadow-cyan-950/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-accent-2">{component.category}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-foreground">{component.name}</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/60">
                  {component.status}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">{component.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {component.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/[0.055] px-3 py-1 text-xs text-white/55">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}
