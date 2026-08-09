import { Container } from '@/components/common/container';
import { ComponentBrowserLayout } from '@/components/component-browser/component-browser-layout';
import { Footer } from '@/components/landing/footer';
import { componentCategories } from '@/data/components-registry';

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return componentCategories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  return (
    <main className="bg-background min-h-screen pt-36">
      <Container className="pb-24">
        <ComponentBrowserLayout categorySlug={category} />
      </Container>
      <Footer />
    </main>
  );
}
