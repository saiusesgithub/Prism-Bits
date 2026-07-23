'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type {
  ComponentCategory,
  ComponentMetadata,
} from '@/data/components-registry';
import { CategoryGrid } from '@/components/component-browser/category-grid';

type CategorySearchProps = {
  categories: ComponentCategory[];
  components: ComponentMetadata[];
};

export function CategorySearch({
  categories,
  components,
}: CategorySearchProps) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return categories;

    return categories.filter((category) => {
      const categoryComponents = components.filter(
        (component) => component.category === category.slug
      );
      const searchableText = [
        category.name,
        category.slug,
        category.description,
        category.targets.join(' '),
        ...categoryComponents.flatMap((component) => [
          component.name,
          component.slug,
          component.description,
          component.framework,
          component.status,
          component.tags.join(' '),
        ]),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [categories, components, normalizedQuery]);

  return (
    <>
      <section className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-3">
        <label className="flex min-h-14 items-center gap-3 rounded-[1.1rem] border border-white/[0.08] bg-black/25 px-5 text-muted focus-within:border-white/20">
          <Search className="size-5 text-white/45" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search categories or components"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted sm:text-base"
          />
        </label>
      </section>

      {filteredCategories.length ? (
        <CategoryGrid categories={filteredCategories} components={components} />
      ) : (
        <section className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            No categories found
          </h2>
          <p className="mt-2 text-sm text-muted">
            Try searching for a category, framework, tag, or component name.
          </p>
        </section>
      )}
    </>
  );
}
