import type { ComponentCategory, ComponentMetadata } from "@/data/components-registry";
import { CategoryCard } from "@/components/component-browser/category-card";

type CategoryGridProps = {
  categories: ComponentCategory[];
  components: ComponentMetadata[];
};

export function CategoryGrid({ categories, components }: CategoryGridProps) {
  return (
    <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => {
        const count = components.filter((component) => component.category === category.slug).length;

        return <CategoryCard key={category.slug} category={category} count={count} />;
      })}
    </section>
  );
}
