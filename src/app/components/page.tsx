import { Container } from "@/components/common/container";
import { Footer } from "@/components/landing/footer";
import { SectionBadge } from "@/components/common/section-badge";
import { CategorySearch } from "@/components/component-browser/category-search";
import { componentCategories, componentsRegistry } from "@/data/components-registry";

export default function ComponentsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background pt-36">
      <Container className="relative pb-24">
        <section className="max-w-3xl">
          <SectionBadge>Components</SectionBadge>
          <h1 className="mt-6 text-4xl font-semibold tracking-normal text-foreground sm:text-6xl">
            Components
          </h1>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
            Browse open-source UI bits by category.
          </p>
        </section>

        <CategorySearch categories={componentCategories} components={componentsRegistry} />
      </Container>
      <Footer />
    </main>
  );
}
