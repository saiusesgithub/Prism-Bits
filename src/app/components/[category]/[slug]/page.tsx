import { Container } from "@/components/common/container";
import { ComponentBrowserLayout } from "@/components/component-browser/component-browser-layout";
import { Footer } from "@/components/landing/footer";
import { componentsRegistry } from "@/data/components-registry";

type ComponentPageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return componentsRegistry.map((component) => ({
    category: component.category,
    slug: component.slug,
  }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { category, slug } = await params;

  return (
    <main className="min-h-screen bg-background pt-36">
      <Container className="pb-24">
        <ComponentBrowserLayout categorySlug={category} selectedSlug={slug} />
      </Container>
      <Footer />
    </main>
  );
}
