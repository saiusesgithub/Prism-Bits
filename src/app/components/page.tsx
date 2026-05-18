import { Container } from "@/components/common/container";
import { ComponentCard } from "@/components/landing/component-card";
import { Footer } from "@/components/landing/footer";
import { SearchFilters } from "@/components/landing/search-filters";
import { SectionBadge } from "@/components/common/section-badge";
import { componentsRegistry } from "@/data/components-registry";

export default function ComponentsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background pt-36">
      <Container className="relative pb-24">
        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
          <SectionBadge>Components</SectionBadge>
          <h1 className="mt-6 text-4xl font-semibold tracking-normal text-foreground sm:text-6xl">
            Browse, preview, copy, and ship.
          </h1>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
            A growing library of polished Prism Bits components with live-feeling previews, tags, status, and source links.
          </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-cyan-950/10 backdrop-blur-2xl">
            <p className="text-sm font-medium text-accent-2">Library status</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-2xl font-semibold text-white">{componentsRegistry.length}</p>
                <p className="mt-1 text-xs text-muted">Samples</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-2xl font-semibold text-white">10</p>
                <p className="mt-1 text-xs text-muted">Categories</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-2xl font-semibold text-white">5</p>
                <p className="mt-1 text-xs text-muted">Targets</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10">
          <SearchFilters />
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {componentsRegistry.map((component) => (
            <ComponentCard key={component.slug} component={component} />
          ))}
        </section>
      </Container>
      <Footer />
    </main>
  );
}
