import { Container } from '@/components/common/container';
import { Footer } from '@/components/landing/footer';
import { SectionBadge } from '@/components/common/section-badge';
import { CategorySearch } from '@/components/component-browser/category-search';
import { componentCategories } from '@/data/components-registry';
import { getComponentsRegistry } from '@/lib/registry';

export default async function ComponentsPage() {
  const components = await getComponentsRegistry();

  return (
    <main className="bg-background relative min-h-screen overflow-hidden pt-36">
      <Container className="relative pb-24">
        <section className="max-w-3xl">
          <SectionBadge>Components</SectionBadge>
          <h1 className="text-foreground mt-6 text-4xl font-semibold tracking-normal sm:text-6xl">
            Components
          </h1>
          <p className="text-muted mt-5 text-base leading-7 sm:text-lg">
            Browse open-source UI bits by category.
          </p>
        </section>

        <CategorySearch
          categories={componentCategories}
          components={components}
        />
      </Container>
      <Footer />
    </main>
  );
}
