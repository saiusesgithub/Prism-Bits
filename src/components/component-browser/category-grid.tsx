import type { ComponentCategory } from "@/data/components-registry";
import { CategoryCard } from "@/components/component-browser/category-card";

type CategoryGridProps = {
  categories: ComponentCategory[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </section>
  );
}
