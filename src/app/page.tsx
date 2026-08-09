import { Container } from '@/components/common/container';
import { ComponentCard } from '@/components/landing/component-card';
import { FeatureSection } from '@/components/landing/feature-section';
import { Footer } from '@/components/landing/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { SearchFilters } from '@/components/landing/search-filters';
import { getComponentsRegistry } from '@/lib/registry';

export default async function Home() {
  const componentsRegistry = await getComponentsRegistry();
  const featuredComponents = componentsRegistry.slice(0, 4);

  return (
    <main className="relative overflow-hidden">
      <HeroSection componentCount={componentsRegistry.length} />

      <Container className="relative pb-20">
        <SearchFilters />
      </Container>

      <Container className="relative pb-24">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-accent-2 text-sm font-medium tracking-[0.18em] uppercase">
              Featured components
            </p>
            <h2 className="text-foreground mt-3 max-w-2xl text-3xl font-semibold tracking-normal sm:text-5xl">
              Preview the bit before you copy it.
            </h2>
          </div>
          <p className="text-muted max-w-md text-sm leading-6">
            Visual tiles make it clear what each component does, how polished it
            feels, and where it fits in a product.
          </p>
        </div>
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredComponents.map((component) => (
            <ComponentCard key={component.slug} component={component} />
          ))}
        </section>
      </Container>

      <FeatureSection />
      <Footer />
    </main>
  );
}
