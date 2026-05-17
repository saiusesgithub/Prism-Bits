import { Container } from "@/components/common/container";
import { SectionBadge } from "@/components/common/section-badge";
import { componentsRegistry } from "@/data/components-registry";

export default function ComponentsPage() {
  return (
    <main className="pt-28">
      <Container className="pb-24">
        <SectionBadge>Components</SectionBadge>
        <h1 className="mt-5 text-4xl font-semibold text-foreground sm:text-6xl">Prism Bits gallery</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          A placeholder gallery for the first Prism Bits components. The registry is ready for metadata as the library grows.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {componentsRegistry.map((component) => (
            <article key={component.name} className="rounded-3xl border border-white/10 bg-card/70 p-6">
              <p className="text-sm uppercase tracking-[0.22em] text-accent-2">{component.status}</p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">{component.title}</h2>
              <p className="mt-3 text-muted">{component.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
